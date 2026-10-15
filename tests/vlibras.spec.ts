import { expect, test } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { openTools, toolsName } from "./helpers/compact-tools";

for (const resource of ["bootstrap", "application"]) {
  test(`VLibras: falha de ${resource} é anunciada e mantém o conteúdo disponível`, async ({ page }) => {
    let releaseFailure!: () => void;
    const failureGate = new Promise<void>(resolve => { releaseFailure = resolve; });
    await page.route(resource === "bootstrap" ? "**/vlibras-plugin.js" : "**/vlibras-plugin-app.js*", async route => {
      await failureGate;
      await route.abort("failed");
    });
    await page.goto("/");
    expect(await page.locator("#aprender-vlibras-script").count()).toBe(0);
    await openTools(page);
    await page.getByRole("button", { name: "Libras", exact: true }).click();
    try {
      await expect(page.getByRole("region", { name: toolsName })).not.toBeVisible();
      await expect(page.getByRole("status")).toContainText(resource === "bootstrap" ? "Carregando o acesso ao VLibras." : "Abrindo o VLibras.");
    } finally {
      releaseFailure();
    }
    await expect(page.getByRole("status")).toContainText("Não foi possível carregar o VLibras.", { timeout: 35000 });
    await expect(page.getByRole("button", { name: "Recarregar para tentar novamente" })).toBeFocused();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#aprender-vlibras-script")).toHaveCount(1);
    expect(await page.locator("#vlibras-app-root").count()).toBeLessThanOrEqual(1);
  });
}

test("VLibras real: sobrepõe o conteúdo e abre e fecha sem alterar o layout", async ({ page }, testInfo) => {
  test.skip(process.env.TEST_VLIBRAS_LIVE !== "1", "Requer acesso ao serviço oficial e download do avatar; habilite TEST_VLIBRAS_LIVE=1.");
  test.setTimeout(300000);
  page.setDefaultTimeout(15000);
  const translations: { text: string | null; status: number; gloss: string }[] = [];
  const requests: string[] = [];
  page.on("request", request => { if (/vlibras|lavid/.test(request.url())) requests.push(request.url()); });
  page.on("response", async response => {
    if (/traducao.*\/translate/.test(response.url())) translations.push({ text: response.request().postData(), status: response.status(), gloss: await response.text() });
  });
  await page.goto("/");
  expect(requests).toEqual([]);
  await openTools(page);
  await page.getByRole("button", { name: "Libras", exact: true }).click();
  await expect(page.locator("[data-vlibras-status]")).toHaveAttribute("data-vlibras-status", "ready", { timeout: 45000 });
  const app = page.locator("#vlibras-app-root");
  await expect(app).toHaveAttribute("data-status", /playing|idle|paused/, { timeout: 90000 });
  // Player status can precede the official resource-loading splash. Wait for
  // that visible UI to finish instead of clicking a greeting control beneath it.
  await expect(app.getByText("VLibras Widget", { exact: true })).not.toBeVisible({ timeout: 60000 });
  async function translateHeading() {
    const response = page.waitForResponse(response => /traducao.*\/translate/.test(response.url()), { timeout: 30000 });
    await page.getByRole("heading", { level: 1 }).click();
    expect((await response).status()).toBe(200);
    await expect(app).toHaveAttribute("data-status", "playing", { timeout: 20000 });
  }
  await translateHeading();
  await app.getByRole("button", { name: "Fechar", exact: true }).click();
  await expect(page.getByRole("button", { name: toolsName })).toBeFocused();
  await openTools(page);
  const official = page.getByRole("button", { name: "Traduzir conteúdo em Libras", exact: true });
  await expect(official).toBeVisible();
  await page.locator('a[href="/solucoes/lendo-e-escrevendo"]').first().click();
  await expect(page).toHaveURL(/\/solucoes\/lendo-e-escrevendo$/);
  await openTools(page);
  await official.click();
  await translateHeading();
  await expect(app).toHaveCount(1);
  await expect(page.locator("#aprender-vlibras-script")).toHaveCount(1);
  await expect(page.locator('script[src*="vlibras-plugin-app.js"]')).toHaveCount(1);
  const bounds: unknown[] = [];
  const geometry = () => page.evaluate(() => {
    const rect = (selector: string) => {
      const box = document.querySelector(selector)!.getBoundingClientRect();
      // Compare layout dimensions, independently of the current scroll position.
      return { width: box.width, height: box.height };
    };
    return {
      body: rect("body"), main: rect("main"), header: rect("header"),
      document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
    };
  });
  async function closeAvatar() {
    await app.getByRole("button", { name: "Fechar", exact: true }).click();
    await expect(page.getByRole("button", { name: toolsName })).toBeFocused();
    await expect(page.locator("#libras-avatar")).toBeHidden();
    await expect.poll(() => page.locator("html").evaluate(html => html.hasAttribute("data-libras-open"))).toBe(false);
  }
  async function openAvatar() {
    await openTools(page);
    await official.click();
    await expect(app).toHaveAttribute("data-active", "true");
    await expect(page.locator("html")).toHaveAttribute("data-libras-open", "");
    // The provider slides the overlay in after its open state changes.
    await expect.poll(() => app.evaluate(host => {
      const box = host.shadowRoot!.getElementById("vlibras-app")!.getBoundingClientRect();
      return box.left >= 0 && box.right <= innerWidth + 1 && box.top >= 0 && box.bottom <= innerHeight + 1;
    })).toBe(true);
  }
  for (const viewport of [{ width: 360, height: 560 }, { width: 390, height: 844 }, { width: 1440, height: 1000 }]) {
    console.log(`VLibras: checking overlay, close/reopen and gallery at ${viewport.width}px`);
    await closeAvatar();
    await page.setViewportSize(viewport);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const baseline = await geometry();
    await openAvatar();
    const metrics = await app.evaluate(host => {
      const panel = host.shadowRoot!.getElementById("vlibras-app")!.getBoundingClientRect();
      const dock = document.getElementById("libras-avatar")!.getBoundingClientRect();
      return { viewport: innerWidth, content: document.documentElement.scrollWidth, panel: panel.toJSON(), dock: dock.toJSON() };
    });
    expect(metrics.content).toBeLessThanOrEqual(viewport.width);
    expect(metrics.panel.left).toBeGreaterThanOrEqual(-1);
    expect(metrics.panel.right).toBeLessThanOrEqual(viewport.width + 1);
    expect(metrics.panel.top).toBeGreaterThanOrEqual(-1);
    expect(metrics.panel.bottom).toBeLessThanOrEqual(viewport.height + 1);
    await expect.poll(geometry).toEqual(baseline);
    await closeAvatar();
    await expect.poll(geometry).toEqual(baseline);
    await openAvatar();
    await expect.poll(geometry).toEqual(baseline);
    const gallery = page.getByRole("button", { name: /^Ampliar imagem:/ }).first();
    // An overlay intentionally covers some page controls. Click a genuinely
    // exposed part of the gallery, without forcing through the third-party UI.
    await gallery.evaluate(element => {
      element.scrollIntoView({ block: "start", behavior: "instant" });
      window.scrollBy({ top: -104, behavior: "instant" });
    });
    const exposed = await gallery.evaluate(element => {
      const box = element.getBoundingClientRect();
      for (const offsetY of [4, 12, box.height / 4, box.height / 2, box.height - 12, box.height - 4]) {
        for (const offsetX of [4, 12, box.width / 4, box.width / 2, box.width - 12, box.width - 4]) {
          const x = box.left + offsetX;
          const y = box.top + offsetY;
          if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
          const hit = document.elementFromPoint(x, y);
          if (hit && (hit === element || element.contains(hit))) return { x, y };
        }
      }
      return null;
    });
    expect(exposed, "A visible portion of the gallery must remain reachable beside the overlay").not.toBeNull();
    await page.mouse.click(exposed!.x, exposed!.y);
    // Official selection mode offers Interagir before activating a control.
    await app.getByRole("button", { name: "Interagir", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Ampliar imagem", exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(gallery).toBeFocused();
    const afterGallery = await geometry();
    await closeAvatar();
    await expect.poll(geometry).toEqual(afterGallery);
    const afterClose = await geometry();
    await openAvatar();
    await expect.poll(geometry).toEqual(afterGallery);
    bounds.push({ size: viewport, ...metrics, baseline, afterClose, unchangedThroughCloseAndReopen: true });
    await page.screenshot({ path: `.qa/accessibility/vlibras-final-${viewport.width}.png` });
  }
  await closeAvatar();
  await openTools(page);
  await page.getByLabel("Idioma", { exact: true }).selectOption("en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(app).toHaveCount(0);
  await expect(page.locator("#aprender-vlibras-script")).toHaveCount(0);
  await openTools(page);
  await page.getByRole("link", { name: "Libras: Portuguese version" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("[data-vlibras-status]")).toHaveAttribute("data-vlibras-status", "idle");
  await expect(page.locator("#aprender-vlibras-script")).toHaveCount(0);
  expect(translations.length).toBeGreaterThanOrEqual(2);
  await page.evaluate(() => localStorage.setItem("@vlibras-widget", JSON.stringify({ state: { isOpen: true }, version: 0 })));
  await page.route("**/vlibras-plugin-app.js*", async route => {
    await new Promise(resolve => setTimeout(resolve, 400));
    await route.continue();
  });
  await openTools(page);
  await page.getByRole("button", { name: "Libras", exact: true }).click();
  await expect(page.locator("[data-vlibras-status]")).toHaveAttribute("data-vlibras-status", "ready", { timeout: 45000 });
  await expect(page.locator('script[src*="vlibras-plugin-app.js"]')).toHaveCount(1);
  await expect(page.locator("#vlibras-app-root")).toHaveCount(1);
  const record = { checkedAt: new Date().toISOString(), environment: test.info().project.use.baseURL, translations, bounds, requests: requests.length, duplicateBootstrapOrApplication: false, retainedOpenStateTested: true, linguisticHumanReview: false };
  writeFileSync("docs/accessibility/vlibras-live.json", JSON.stringify(record, null, 2) + "\n");
  await testInfo.attach("vlibras-real", { body: Buffer.from(JSON.stringify(record, null, 2)), contentType: "application/json" });
});
