import { expect, test, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { defaultPreferences, languageCookie, preferenceCookie, type ReadingPreferences } from "../src/lib/reading-preferences";
import { openTools } from "./helpers/compact-tools";

const readingName = /^(Preferências de leitura|Reading preferences|Preferencias de lectura)$/;
const restoreName = /^(Restaurar preferências de leitura|Reset reading preferences|Restore reading preferences|Restablecer preferencias de lectura|Restaurar preferencias de lectura)$/;

test("espaçamentos WCAG do usuário preservam reflow e controles em 320 e 1440 px", async ({ page }) => {
  test.setTimeout(90000);
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 780 });
    for (const path of ["/", "/es/solucoes/brincando-e-aprendendo", "/en/recursos/tabela-precos", "/es/contato"]) {
      await page.goto(path);
      await page.addStyleTag({ content: `body * { line-height:1.5 !important; letter-spacing:.12em !important; word-spacing:.16em !important; } p { margin-bottom:2em !important; }` });
      await noHorizontalOverflow(page);
      const { dialog, trigger } = await openReading(page);
      await expect(dialog.getByRole("radio", { name: "200%", exact: true })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
    }
  }
});

async function openReading(page: Page) {
  const { trigger, panel } = await openTools(page);
  await panel.getByRole("button", { name: readingName }).click();
  const dialog = page.getByRole("dialog", { name: readingName });
  await expect(dialog).toBeVisible();
  return { trigger, dialog };
}

async function setCookie(page: Page, overrides: Partial<ReadingPreferences> = {}) {
  await page.context().addCookies([{
    name: preferenceCookie,
    value: encodeURIComponent(JSON.stringify({ ...defaultPreferences, ...overrides })),
    url: new URL(test.info().project.use.baseURL as string).origin,
  }]);
}

async function noHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    viewport: innerWidth,
    content: document.documentElement.scrollWidth,
    overflowing: [...document.querySelectorAll("main *,header *,footer *")]
      .filter(element => {
        const box = element.getBoundingClientRect();
        return box.width && (box.right > innerWidth + 1 || box.left < -1) &&
          !element.closest("dialog:not([open])") &&
          !element.closest('[class*="tableScroll"],[class*="thumbs"],[class*="viewport"]') &&
          !element.matches(".sr-only,.skip-link");
      }).slice(0, 8).map(element => ({ tag: element.tagName, text: element.textContent?.slice(0, 90), className: element.className })),
  }));
  expect(metrics.content, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.viewport + 1);
}

test("preferências persistem entre rotas e já chegam no HTML servido, sem erro de hidratação", async ({ page }) => {
  const hydrationErrors: string[] = [];
  page.on("pageerror", error => hydrationErrors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error" && /hydrat|did not match|server rendered/i.test(message.text())) hydrationErrors.push(message.text());
  });
  await page.goto("/");
  const { dialog } = await openReading(page);
  await dialog.getByRole("radio", { name: "Escuro", exact: true }).check();
  await dialog.getByRole("radio", { name: "Reforçado", exact: true }).check();
  await dialog.getByRole("radio", { name: "125%", exact: true }).check();
  await dialog.getByRole("radio", { name: "Confortável", exact: true }).check();
  await dialog.getByRole("radio", { name: "Reduzido", exact: true }).check();
  await page.keyboard.press("Escape");
  const cookies = await page.context().cookies();
  const saved = JSON.parse(decodeURIComponent(cookies.find(cookie => cookie.name === preferenceCookie)!.value));
  expect(saved).toEqual({ theme: "dark", contrast: "more", textSize: "125", spacing: "comfortable", motion: "reduce" });
  const response = await page.goto("/formacao");
  const html = (await response!.text()).match(/<html\b[^>]*>/)?.[0] || "";
  for (const [attribute, value] of Object.entries({ "data-theme": "dark", "data-contrast": "more", "data-text-size": "125", "data-spacing": "comfortable", "data-motion": "reduce" })) {
    expect(html).toContain(`${attribute}="${value}"`);
    await expect(page.locator("html")).toHaveAttribute(attribute, value);
  }
  await page.reload();
  const reopened = await openReading(page);
  await expect(reopened.dialog.getByRole("radio", { name: "Escuro", exact: true })).toBeChecked();
  await page.keyboard.press("Escape");
  expect(hydrationErrors).toEqual([]);
});

test("Sistema acompanha o dispositivo, escolha explícita vence e movimento reduzido mantém os estados", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
  await expect.poll(() => page.locator("html").evaluate(element => getComputedStyle(element).colorScheme)).toBe("dark");
  const { dialog } = await openReading(page);
  await dialog.getByRole("radio", { name: "Claro", exact: true }).check();
  await page.keyboard.press("Escape");
  await expect.poll(() => page.locator("html").evaluate(element => getComputedStyle(element).colorScheme)).toBe("light");
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect.poll(() => page.locator("html").evaluate(element => getComputedStyle(element).colorScheme)).toBe("light");
  const reopened = await openReading(page);
  await reopened.dialog.locator('input[name$="-theme"][value="system"]').check();
  await reopened.dialog.getByRole("radio", { name: "Reduzido", exact: true }).check();
  await page.keyboard.press("Escape");
  await expect.poll(() => page.locator("html").evaluate(element => getComputedStyle(element).colorScheme)).toBe("dark");
  const motion = await page.locator("header").evaluate(element => ({ duration: getComputedStyle(element).transitionDuration, scroll: getComputedStyle(document.documentElement).scrollBehavior }));
  expect(motion).toEqual({ duration: "0s", scroll: "auto" });
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  const reduced = await openReading(page);
  await reduced.dialog.locator('input[name$="-motion"][value="system"]').check();
  await page.keyboard.press("Escape");
  expect(await page.locator("header").evaluate(element => getComputedStyle(element).transitionDuration)).toBe("0s");
});

test("restaurar leitura preserva idioma, filtros e conteúdo preenchido no contato", async ({ page }) => {
  await page.goto("/solucoes?q=escrever&etapa=anos-iniciais");
  await openTools(page);
  await page.getByLabel("Idioma", { exact: true }).selectOption("es");
  await expect(page).toHaveURL(/\/es\/solucoes\?q=escrever&etapa=anos-iniciais$/);
  let panel = await openReading(page);
  await panel.dialog.locator('input[name$="-theme"][value="dark"]').check();
  await panel.dialog.getByRole("button", { name: restoreName }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator("#catalog-search")).toHaveValue("escrever");
  await expect(page.locator("#catalog-stage")).toHaveValue("anos-iniciais");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  expect((await page.context().cookies()).find(cookie => cookie.name === languageCookie)?.value).toBe("es");
  await page.goto("/es/contato?solucao=lendo-e-escrevendo");
  await page.locator("#contact-name").fill("Persona de prueba");
  await page.locator("#contact-email").fill("qa@example.invalid");
  await page.locator("#contact-message").fill("Consulta sintética. No enviar a la editorial.");
  panel = await openReading(page);
  await panel.dialog.locator('input[name$="-textSize"][value="150"]').check();
  await panel.dialog.getByRole("button", { name: restoreName }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator("#contact-name")).toHaveValue("Persona de prueba");
  await expect(page.locator("#contact-email")).toHaveValue("qa@example.invalid");
  await expect(page.locator("#contact-message")).toHaveValue("Consulta sintética. No enviar a la editorial.");
  await expect(page.locator("#contact-solution")).toHaveValue("lendo-e-escrevendo");
  await expect(page).toHaveURL(/\/es\/contato\?solucao=lendo-e-escrevendo$/);
});

test("armazenamento indisponível e cookie inválido não impedem navegação nem ajustes atuais", async ({ page }) => {
  await page.context().addCookies([{ name: preferenceCookie, value: "%7Binvalid", url: new URL(test.info().project.use.baseURL as string).origin }]);
  await page.addInitScript(() => {
    for (const key of ["localStorage", "sessionStorage"]) Object.defineProperty(window, key, { configurable: true, get() { throw new DOMException("Blocked for test", "SecurityError"); } });
    Object.defineProperty(Document.prototype, "cookie", { configurable: true, get() { throw new DOMException("Blocked for test", "SecurityError"); }, set() { throw new DOMException("Blocked for test", "SecurityError"); } });
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
  const panel = await openReading(page);
  await panel.dialog.getByRole("radio", { name: "Escuro", exact: true }).check();
  await panel.dialog.getByRole("radio", { name: "150%", exact: true }).check();
  await page.keyboard.press("Escape");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-text-size", "150");
  const menu = page.getByRole("button", { name: "Abrir menu de navegação" });
  await menu.click();
  await page.getByRole("dialog", { name: "Explore a Aprender" }).getByRole("link", { name: "Soluções", exact: true }).click();
  await expect(page).toHaveURL(/\/solucoes$/);
  await expect(page.locator("#catalog-search")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-text-size", "150");
});

test("texto 200%, escuro reforçado e diálogo mantêm teclado, foco e rolagem em celular", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await setCookie(page, { theme: "dark", contrast: "more", textSize: "200", spacing: "comfortable", motion: "reduce" });
  await page.goto("/es/contato?solucao=acerta-brasil");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  expect(await page.locator("header").evaluate(element => getComputedStyle(element).position)).toBe("static");
  await noHorizontalOverflow(page);
  const panel = await openReading(page);
  const box = await panel.dialog.boundingBox();
  expect(box!.width).toBeLessThanOrEqual(360);
  expect(box!.height).toBeLessThanOrEqual(640);
  for (let index = 0; index < 22; index++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest("dialog[open]")))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(panel.dialog).not.toBeVisible();
  await expect(panel.trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  const menu = page.getByRole("button", { name: "Abrir el menú de navegación", exact: true });
  await menu.click();
  const navigation = page.getByRole("dialog", { name: "Explore Aprender", exact: true });
  await expect(navigation).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
});

test("reflow de 320 a 1440 px suporta espanhol, texto 200% e tabelas confinadas", async ({ page }) => {
  test.setTimeout(150_000);
  await setCookie(page, { theme: "dark", contrast: "more", textSize: "200", spacing: "comfortable", motion: "reduce" });
  const cases = [
    { width: 320, height: 640, route: "/es" },
    { width: 360, height: 640, route: "/es/solucoes" },
    { width: 390, height: 844, route: "/es/solucoes/brincando-e-aprendendo" },
    { width: 768, height: 640, route: "/es/acervo" },
    { width: 1024, height: 768, route: "/es/recursos/tabela-precos" },
    { width: 1440, height: 900, route: "/es/contato?solucao=ingles" },
  ];
  for (const item of cases) {
    await page.setViewportSize({ width: item.width, height: item.height });
    await page.goto(item.route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("html")).toHaveAttribute("data-text-size", "200");
    await page.evaluate(() => document.fonts.ready);
    await noHorizontalOverflow(page);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await noHorizontalOverflow(page);
  }
});

async function geometry(locator: Locator) {
  return locator.evaluate(element => [element, ...element.querySelectorAll("svg,img,span")].map(node => {
    const box = node.getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height, transform: getComputedStyle(node).transform };
  }));
}

async function stableInteraction(page: Page, target: Locator) {
  await target.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await page.waitForTimeout(350);
  const before = await geometry(target);
  await target.hover();
  await page.waitForTimeout(220);
  const hover = await geometry(target);
  await page.mouse.down();
  const active = await geometry(target);
  await page.mouse.move(1, 1);
  await page.mouse.up();
  for (const [name, state] of Object.entries({ hover, active })) {
    expect(state.length).toBe(before.length);
    for (let index = 0; index < before.length; index++) {
      expect(state[index].transform, `${name}, descendant ${index}`).toBe(before[index].transform);
      for (const key of ["x", "y", "width", "height"] as const) expect(Math.abs(state[index][key] - before[index][key]), `${name}, descendant ${index}, ${key}`).toBeLessThanOrEqual(0.5);
    }
  }
}

test("famílias de controles, cards, capas e setas mantêm geometria no hover e pressionamento", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/");
  await stableInteraction(page, page.getByRole("link", { name: "Explorar soluções", exact: true }));
  await stableInteraction(page, page.getByRole("link", { name: "Conhecer a formação", exact: true }));
  await stableInteraction(page, page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name: "Soluções", exact: true }));
  await page.goto("/solucoes");
  await stableInteraction(page, page.locator('main a[href="/solucoes/brincando-e-aprendendo"]'));
  await page.goto("/recursos");
  await stableInteraction(page, page.locator('main a[href$=".pdf"]').first());
  await page.goto("/solucoes/brincando-e-aprendendo");
  await stableInteraction(page, page.getByRole("button", { name: "Próxima imagem", exact: true }));
  await page.goto("/contato");
  await stableInteraction(page, page.getByRole("button", { name: "Preparar mensagem", exact: true }));
});

test("links conservam descrições acessíveis sem sufixos visíveis de nova aba", async ({ page }) => {
  test.setTimeout(90_000);
  for (const route of ["/", "/en/plataformas", "/es/recursos", "/acervo"]) {
    await page.goto(route);
    const visibleSuffixes = await page.locator("a,button").evaluateAll(elements => elements.flatMap(element => {
      const clone = element.cloneNode(true) as HTMLElement;
      clone.querySelectorAll(".sr-only,svg,[hidden],[aria-hidden=true]").forEach(node => node.remove());
      const text = clone.textContent || "";
      return /\((?:[^)]*nova aba|[^)]*new tab|[^)]*pestaña nueva)[^)]*\)/i.test(text) ? [text.trim()] : [];
    }));
    expect(visibleSuffixes, route).toEqual([]);
    const external = page.locator('a[target="_blank"]').first();
    if (await external.count()) {
      await expect(external).toHaveAttribute("rel", /noopener/);
      expect((await external.getAttribute("aria-describedby")) || await external.locator(".sr-only").count()).toBeTruthy();
    }
  }
});

test("contato em inglês e espanhol associa erros aos campos e apenas prepara o e-mail", async ({ page }) => {
  for (const item of [
    { locale: "en", prepare: "Prepare message", required: "Enter your name so the team knows who to contact.", invalid: "Check the email address. Use a format such as name@school.com.br.", ready: "Your message is ready.", notSent: /(?:The|Your) message has not been sent yet\./ },
    { locale: "es", prepare: "Preparar mensaje", required: "Indique su nombre para que el equipo sepa con quién ponerse en contacto.", invalid: "Revise el correo electrónico. Use un formato como nombre@escuela.com.br.", ready: "Su mensaje está listo.", notSent: /El mensaje (?:todavía|aún) no se ha enviado\./ },
  ]) {
    await page.goto(`/${item.locale}/contato?solucao=ingles`);
    await expect(page.locator("html")).toHaveAttribute("lang", item.locale);
    await expect(page.locator("#contact-solution")).toHaveValue("ingles");
    await page.getByRole("button", { name: item.prepare, exact: true }).click();
    await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#contact-name")).toHaveAttribute("aria-describedby", "contact-name-error");
    await expect(page.locator("#contact-name-error")).toHaveText(item.required);
    await expect(page.locator("#contact-name")).toBeFocused();
    await page.locator("#contact-name").fill("QA synthetic contact");
    await page.locator("#contact-email").fill("invalid-address");
    await page.locator("#contact-message").fill("Synthetic test only. Do not send this message.");
    await page.getByRole("button", { name: item.prepare, exact: true }).click();
    await expect(page.locator("#contact-email-error")).toHaveText(item.invalid);
    await page.locator("#contact-email").fill("qa@example.invalid");
    await page.getByRole("button", { name: item.prepare, exact: true }).click();
    await expect(page.getByRole("heading", { name: item.ready, exact: true })).toBeVisible();
    await expect(page.getByText(item.notSent)).toBeVisible();
    await expect(page.locator('a[href^="mailto:"][href*="subject="]')).toHaveAttribute("href", /qa%40example.invalid|qa@example.invalid/);
  }
});

const axeSamples: { name: string; route: string; theme: ReadingPreferences["theme"]; contrast: ReadingPreferences["contrast"]; invalidForm?: boolean }[] = [
  { name: "home clara", route: "/", theme: "light", contrast: "normal" },
  { name: "home clara com contraste reforçado", route: "/", theme: "light", contrast: "more" },
  { name: "home escura", route: "/", theme: "dark", contrast: "normal" },
  { name: "home escura com contraste reforçado", route: "/", theme: "dark", contrast: "more" },
  { name: "acessibilidade EN escura reforçada", route: "/en/acessibilidade", theme: "dark", contrast: "more" },
  { name: "acessibilidade ES clara reforçada", route: "/es/acessibilidade", theme: "light", contrast: "more" },
  { name: "coleção extensa EN escura", route: "/en/solucoes/brincando-e-aprendendo", theme: "dark", contrast: "normal" },
  { name: "contato ES escuro reforçado com erros", route: "/es/contato?solucao=ingles", theme: "dark", contrast: "more", invalidForm: true },
];

for (const sample of axeSamples) {
  test(`axe WCAG 2.2 AA: ${sample.name}`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await setCookie(page, { theme: sample.theme, contrast: sample.contrast, motion: "reduce" });
    await page.goto(sample.route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    if (sample.invalidForm) await page.getByRole("button", { name: "Preparar mensaje", exact: true }).click();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    await testInfo.attach("axe-results", { body: Buffer.from(JSON.stringify({ sample, violations: results.violations, incomplete: results.incomplete }, null, 2)), contentType: "application/json" });
    expect(results.violations.map(violation => ({
      id: violation.id, impact: violation.impact, description: violation.description,
      nodes: violation.nodes.slice(0, 5).map(node => ({ target: node.target, summary: node.failureSummary })),
    }))).toEqual([]);
  });
}

test("cores forçadas mantêm foco funcional e controles do painel operáveis", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ forcedColors: "active" });
  await setCookie(page, { theme: "dark", contrast: "more", motion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => matchMedia("(forced-colors: active)").matches)).toBe(true);
  expect(await page.locator("body").evaluate(element => getComputedStyle(element).forcedColorAdjust)).toBe("auto");
  const tools = await openTools(page);
  const trigger = page.getByRole("button", { name: "Preferências de leitura", exact: true });
  await trigger.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(trigger).toBeFocused();
  const focus = await trigger.evaluate(element => ({
    visible: element.matches(":focus-visible"),
    width: Number.parseFloat(getComputedStyle(element).outlineWidth),
    style: getComputedStyle(element).outlineStyle,
    color: getComputedStyle(element).outlineColor,
  }));
  expect(focus.visible).toBe(true);
  expect(focus.width).toBeGreaterThanOrEqual(2);
  expect(focus.style).not.toBe("none");
  expect(focus.color).not.toBe("rgba(0, 0, 0, 0)");
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Preferências de leitura", exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("radio", { name: "Claro", exact: true }).check();
  await expect(dialog.getByRole("radio", { name: "Claro", exact: true })).toBeChecked();
  await page.keyboard.press("Escape");
  await expect(tools.trigger).toBeFocused();
});
