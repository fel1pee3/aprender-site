import { expect, test, type Locator, type Page } from "@playwright/test";
import { defaultPreferences, preferenceCookie } from "../src/lib/reading-preferences";
import { openTools, toolsName } from "./helpers/compact-tools";

const readingName = /^(Preferências de leitura|Reading preferences|Preferencias de lectura)$/;

async function inViewport(page: Page, target: Locator) {
  const box = await target.boundingBox();
  const viewport = page.viewportSize()!;
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height + 1);
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 360, height: 640 }]) {
  test(`cabeçalho compacto e ferramentas fora da navegação em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const header = page.locator("header");
    await page.evaluate(() => document.fonts.ready);
    const bounds = await header.boundingBox();
    expect(bounds!.height).toBeLessThan(viewport.width < 768 ? 85 : 100);
    await expect(header.getByRole("button", { name: readingName })).toHaveCount(0);
    await expect(header.getByLabel("Idioma", { exact: true })).toHaveCount(0);
    await expect(header.getByRole("button", { name: "Libras", exact: true })).toHaveCount(0);
    const launcher = page.getByRole("button", { name: toolsName });
    await expect(launcher).toBeVisible();
    await expect(launcher).toHaveAttribute("aria-expanded", "false");
    await inViewport(page, launcher);
    const { panel } = await openTools(page);
    await expect(panel.getByRole("button", { name: readingName })).toBeVisible();
    await expect(panel.getByLabel("Idioma", { exact: true })).toBeVisible();
    await expect(panel.getByRole("button", { name: "Libras", exact: true })).toBeVisible();
    await inViewport(page, panel);
    expect(await header.boundingBox()).toEqual(bounds);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
  });
}

test("launcher e painel funcionam por teclado, Escape e clique fora sem prender o foco", async ({ page }) => {
  await page.goto("/");
  const launcher = page.getByRole("button", { name: toolsName });
  await launcher.focus();
  await page.keyboard.press("Enter");
  const panel = page.getByRole("region", { name: toolsName });
  await expect(panel).toBeVisible();
  const reading = panel.getByRole("button", { name: readingName });
  await expect(reading).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(panel).not.toBeVisible();
  await expect(launcher).toBeFocused();
  await page.keyboard.press("Space");
  await expect(panel).toBeVisible();
  await page.getByRole("heading", { level: 1 }).click();
  await expect(panel).not.toBeVisible();
  await expect(launcher).toHaveAttribute("aria-expanded", "false");
  await openTools(page);
  await reading.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: readingName });
  await expect(dialog).toBeVisible();
  await expect(panel).not.toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(launcher).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await openTools(page);
  const controls = panel.locator('button:not([disabled]),a[href],select');
  await controls.last().focus();
  await page.keyboard.press("Tab");
  expect(await panel.evaluate(element => element.contains(document.activeElement))).toBe(false);
});

test("espanhol, escuro e texto 200% mantêm painel rolável e controles em 360px", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 560 });
  await page.context().addCookies([{
    name: preferenceCookie,
    value: encodeURIComponent(JSON.stringify({ ...defaultPreferences, theme: "dark", contrast: "more", textSize: "200", spacing: "comfortable", motion: "reduce" })),
    url: new URL(test.info().project.use.baseURL as string).origin,
  }]);
  await page.goto("/es/contato?solucao=ingles");
  await expect(page.locator("html")).toHaveAttribute("data-text-size", "200");
  const { panel, trigger } = await openTools(page);
  await inViewport(page, panel);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  const language = panel.getByLabel("Idioma", { exact: true });
  await language.scrollIntoViewIfNeeded();
  await inViewport(page, language);
  await expect(language).toHaveValue("es");
  const libras = panel.getByRole("link", { name: "Libras: versión en portugués", exact: true });
  await libras.scrollIntoViewIfNeeded();
  await inViewport(page, libras);
  await page.keyboard.press("Escape");
  await expect(panel).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await inViewport(page, trigger);
});

test("acesso flutuante não encobre controles do rodapé no celular", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator("footer")).toBeInViewport();
  const launcher = page.getByRole("button", { name: toolsName });
  await inViewport(page, launcher);
  const overlaps = await launcher.evaluate(button => {
    const tool = button.getBoundingClientRect();
    return [...document.querySelectorAll<HTMLElement>('footer a[href], footer button, footer select')].flatMap(control => {
      const box = control.getBoundingClientRect();
      const visible = box.bottom > 0 && box.top < innerHeight && box.width && box.height;
      const overlaps = box.left < tool.right && box.right > tool.left && box.top < tool.bottom && box.bottom > tool.top;
      return visible && overlaps ? [control.textContent?.trim() || control.getAttribute("aria-label")] : [];
    });
  });
  expect(overlaps).toEqual([]);
});
