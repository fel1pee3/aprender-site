import { expect, test } from "@playwright/test";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { solutions } from "../src/data/solutions";
import { articles } from "../src/data/editorial";
import { localizedPath, htmlLanguages, numberLocales, type Locale } from "../src/i18n/shared";
import { openTools } from "./helpers/compact-tools";

const routes = ["/", "/a-editora", "/a-editora/trajetoria", "/a-editora/edgar-linhares", "/a-editora/paic", "/solucoes", "/formacao", "/plataformas", "/em-acao", "/contato", "/acervo", "/recursos", "/recursos/tabela-precos", "/acessibilidade", ...solutions.map(item => `/solucoes/${item.slug}`), ...articles.map(item => `/em-acao/${item.slug}`)];
const locales: Locale[] = ["pt", "en", "es"];
const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

test("a URL define o idioma e aliases preservam prefixo, consulta e âncora", async ({ request }) => {
  const response = await request.get("/contato", { headers: { "x-aprender-locale": "es", "x-aprender-path": "/es/contato" } });
  expect((await response.text()).match(/<html[^>]*>/)?.[0]).toContain('lang="pt-BR"');
  for (const locale of ["en", "es"] as const) {
    const alias = await request.get(`/${locale}/quem-somos?q=preservado`, { maxRedirects: 0 });
    expect(alias.status()).toBe(308);
    const target = new URL(alias.headers().location, test.info().project.use.baseURL as string);
    expect(target.pathname).toBe(`/${locale}/a-editora`);
    expect(target.searchParams.get("q")).toBe("preservado");
    for (const suffix of ["/nao-existe", "/solucoes/nao-existe"]) {
      const missing = await request.get(`/${locale}${suffix}`);
      expect(missing.status()).toBe(404);
      expect((await missing.text()).match(/<html[^>]*>/)?.[0]).toContain(`lang="${locale}"`);
    }
  }
});

test("120 URLs servidas: idioma, canonical, metadados, conteúdo e auditoria de texto", async ({ request, page }) => {
  test.setTimeout(600000);
  expect(routes).toHaveLength(40);
  const dictionaries = Object.fromEntries(["en", "es"].map(locale => [locale, Object.assign({}, ...readdirSync("src/i18n/messages").filter(file => file.endsWith(`.${locale}.json`)).map(file => JSON.parse(readFileSync(path.join("src/i18n/messages", file), "utf8"))))])) as Record<string, Record<string, string>>;
  const translatedSources = Object.fromEntries(["en", "es"].map(locale => [locale, Object.entries(dictionaries[locale]).filter(([source, translated]) => source !== translated && source.length >= 40 && source.split(/\s+/).length >= 6 && /[.!?]$/.test(source) && !/\{\d+\}/.test(source)).map(([source]) => normalize(source))]));
  const records: Array<Record<string, unknown>> = [];
  const issues: string[] = [];
  const leaks: Array<{ route: string; locale: string; source: string }> = [];
  // Parse fetched local HTML in a blank browser document, without executing page scripts.
  for (const route of routes) {
    let portuguese = "";
    for (const locale of locales) {
      const url = localizedPath(route, locale);
      const response = await request.get(url);
      const html = await response.text();
      const parsed = await page.evaluate(markup => {
        const doc = new DOMParser().parseFromString(markup, "text/html");
        doc.querySelectorAll("script,style,noscript").forEach(node => node.remove());
        const main = doc.querySelector("main");
        const text = main?.textContent?.replace(/\s+/g, " ").trim() || "";
        const dependencies = [...doc.querySelectorAll("[href],[src],[srcset]")].flatMap(node => [node.getAttribute("href"), node.getAttribute("src"), node.getAttribute("srcset")]).filter((value): value is string => !!value && !value.startsWith("mailto:") && /https?:\/\/(?:www\.)?aprendereditora\.com\.br(?:\/|$)/i.test(value));
        return { lang: doc.documentElement.lang, h1: [...doc.querySelectorAll("h1")].map(node => node.textContent?.trim()), title: doc.title, description: doc.querySelector('meta[name="description"]')?.getAttribute("content"), canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href"), robots: doc.querySelector('meta[name="robots"]')?.getAttribute("content"), alternates: [...doc.querySelectorAll('link[rel="alternate"][hreflang]')].map(node => ({ language: node.getAttribute("hreflang"), href: node.getAttribute("href") })), text, dependencies };
      }, html);
      if (response.status() !== 200) issues.push(`${url}: HTTP ${response.status()}`);
      if (parsed.lang !== htmlLanguages[locale]) issues.push(`${url}: lang=${parsed.lang}`);
      if (parsed.h1.length !== 1 || !parsed.h1[0]) issues.push(`${url}: H1 inválido`);
      if (!parsed.description || !parsed.title) issues.push(`${url}: título/descrição ausente`);
      if (!/noindex/.test(parsed.robots || "")) issues.push(`${url}: noindex ausente`);
      if (!parsed.canonical || new URL(parsed.canonical).pathname !== url) issues.push(`${url}: canonical=${parsed.canonical}`);
      for (const alternate of locales) if (!parsed.alternates.some(item => item.language === htmlLanguages[alternate] && item.href && new URL(item.href).pathname === localizedPath(route, alternate))) issues.push(`${url}: alternate ${alternate} ausente`);
      if (parsed.dependencies.length) issues.push(`${url}: dependência do servidor anterior`);
      if (/\{\d+\}/.test(parsed.text)) issues.push(`${url}: placeholder cru em HTML`);
      if (locale === "pt") portuguese = parsed.text;
      else {
        if (parsed.text === portuguese) issues.push(`${url}: conteúdo idêntico à versão PT`);
        for (const source of translatedSources[locale]) if (parsed.text.includes(source) && portuguese.includes(source)) leaks.push({ route: url, locale, source });
      }
      const { text, ...metadata } = parsed;
      records.push({ route: url, locale, status: response.status(), ...metadata, htmlBytes: Buffer.byteLength(html), contentCharacters: text.length });
    }
  }
  mkdirSync("docs/accessibility", { recursive: true });
  writeFileSync("docs/accessibility/served-i18n.json", JSON.stringify({ generatedAt: new Date().toISOString(), environment: test.info().project.use.baseURL, method: "120 local HTTP requests; inert DOMParser extraction without page scripts; HTML language, metadata and canonical checks; Portuguese sentence comparison against controlled dictionaries (at least 40 characters and 6 words, sentence-ending punctuation), excluding intentionally preserved titles. This does not constitute specialist human linguistic review.", routes: routes.length, requested: records.length, issues, possiblePortugueseSentenceLeaks: leaks, pages: records }, null, 2) + "\n", "utf8");
  expect(issues, "Erros de SSR/metadados; consulte served-i18n.json").toEqual([]);
  expect(leaks, "Trechos PT possivelmente esquecidos; consulte served-i18n.json").toEqual([]);
});

for (const locale of locales) {
  test(`${locale}: busca, filtros canônicos, preços em reais e contato localizado`, async ({ page }) => {
    test.setTimeout(120000);
    const consoleErrors: string[] = [];
    page.on("pageerror", error => consoleErrors.push(error.message));
    await page.goto(localizedPath("/solucoes", locale));
    await page.locator("#catalog-search").fill("emocoes");
    await expect(page).toHaveURL(/q=emocoes/);
    await expect(page.locator("#catalog-search")).toHaveValue("emocoes");
    await expect(page.locator('a[href*="/solucoes/"] h3')).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "Fluir das Emoções", exact: true })).toBeVisible();
    await page.locator("#catalog-search").fill(locale === "pt" ? "inglês" : locale === "en" ? "English" : "inglés");
    await expect(page.locator("#catalog-search")).toHaveValue(locale === "pt" ? "inglês" : locale === "en" ? "English" : "inglés");
    await expect(page.locator('a[href$="/solucoes/ingles"]')).toBeVisible();
    await page.locator("#catalog-search").fill("");
    await page.locator("#catalog-stage").selectOption("anos-iniciais");
    await page.locator("#catalog-objective").selectOption("matematica");
    await expect(page.getByRole("heading", { name: "AMMA", exact: true })).toBeVisible();
    await expect(page).toHaveURL(/etapa=anos-iniciais&objetivo=matematica/);

    await page.goto(localizedPath("/recursos/tabela-precos?colecao=ingles", locale));
    await page.locator("#price-audience").selectOption("Professor");
    await expect(page.locator("#price-audience")).toHaveValue("Professor");
    await expect(page.locator("tbody tr")).toHaveCount(4);
    await page.reload();
    await expect(page.locator("#price-audience")).toHaveValue("Professor");
    await expect(page.locator("tbody tr")).toHaveCount(4);
    await page.locator("#price-search").fill(locale === "pt" ? "6º ano" : locale === "en" ? "Year 6" : "6.º año");
    await expect(page).toHaveURL(/[?&]q=/);
    await expect(page.locator("tbody tr")).toHaveCount(1);
    const currency = await page.locator("tbody tr td:last-child").innerText();
    expect(currency).toBe(new Intl.NumberFormat(numberLocales[locale], { style: "currency", currency: "BRL" }).format(30300 / 100));
    await page.locator("#price-search").fill("");
    await page.locator("#price-collection").selectOption("Avançando Juntos");
    await expect(page.locator("#price-collection")).toHaveValue("Avançando Juntos");
    await expect(page.locator("tbody tr")).toHaveCount(8);

    const posts: string[] = [];
    page.on("request", request => { if (request.method() === "POST" && !request.url().includes("_next")) posts.push(request.url()); });
    await page.goto(localizedPath("/contato?solucao=brincando-e-aprendendo", locale));
    await expect(page.locator("#contact-solution")).toHaveValue("brincando-e-aprendendo");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("#contact-name")).toBeFocused();
    await expect(page.locator("#contact-name-error")).toHaveText(locale === "pt" ? "Informe seu nome para que a equipe saiba com quem conversar." : locale === "en" ? "Enter your name so the team knows who to contact." : "Indique su nombre para que el equipo sepa con quién ponerse en contacto.");
    await page.locator("#contact-name").fill("Pessoa sintética QA");
    await page.locator("#contact-email").fill("qa@example.invalid");
    await page.locator("#contact-message").fill("Mensagem sintética QA: não enviar. Keep this content literal.");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("#prepared-message")).toBeVisible();
    const prepared = await page.locator("#prepared-message").inputValue();
    expect(prepared).toContain("Mensagem sintética QA: não enviar. Keep this content literal.");
    const mailto = await page.locator('a[href^="mailto:"][href*="subject="]').getAttribute("href");
    const params = new URL(mailto!).searchParams;
    expect(params.get("subject")).toBe(locale === "pt" ? "Interesse em Brincando e Aprendendo — contato pelo site" : locale === "en" ? "Interest in Brincando e Aprendendo — website enquiry" : "Interés en Brincando e Aprendendo — consulta desde el sitio web");
    expect(params.get("body")).toContain(locale === "pt" ? "Olá, equipe Aprender Editora!" : locale === "en" ? "Hello, Aprender Editora team!" : "¡Hola, equipo de Aprender Editora!");
    expect(params.get("body")).toContain("qa@example.invalid");
    expect(posts).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
}

test("seletor mantém destino equivalente, filtros e fragmento após navegação completa", async ({ page }) => {
  await page.goto("/recursos/tabela-precos?colecao=ingles&publico=Professor#consulta");
  for (const locale of ["en", "es", "pt"] as Locale[]) {
    await openTools(page);
    await page.getByLabel(/^(Idioma|Language)$/).selectOption(locale);
    await expect(page).toHaveURL(new RegExp(`/${locale === "pt" ? "" : `${locale}/`}recursos/tabela-precos\\?colecao=ingles&publico=Professor#consulta$`));
    await expect(page.locator("html")).toHaveAttribute("lang", htmlLanguages[locale]);
    await expect(page.locator("#price-audience")).toHaveValue("Professor");
    await expect(page.locator("tbody tr")).toHaveCount(4);
  }
});

test("PDFs conservam caminho nativo, idioma original e aviso de nova aba apenas acessível", async ({ page, request }) => {
  for (const locale of locales) {
    await page.goto(localizedPath("/solucoes/brincando-e-aprendendo#amostras", locale));
    const pdf = page.locator('a[href^="/documents/"][href$=".pdf"]').first();
    await expect(pdf).toBeVisible();
    const href = await pdf.getAttribute("href");
    expect(href).toMatch(/^\/documents\/[a-z0-9-]+\.pdf$/);
    await expect(pdf).toContainText(locale === "pt" ? "Arquivo original em português" : locale === "en" ? "Original file in Portuguese" : "Archivo original en portugués");
    const visibleText = await pdf.evaluate(element => {
      const clone = element.cloneNode(true) as HTMLElement;
      clone.querySelectorAll(".sr-only").forEach(node => node.remove());
      return clone.textContent || "";
    });
    expect(visibleText).not.toMatch(/nova aba|new tab|pestaña nueva/i);
    await expect(pdf).toHaveAccessibleName(/Abre em nova aba|Opens in a new tab|Se abre en una pestaña nueva/);
    await expect(pdf).toHaveAttribute("target", "_blank");
    expect(await pdf.getAttribute("rel")).toContain("noopener");
    const response = await request.head(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/application\/pdf/);
    expect(Number(response.headers()["content-length"])).toBeGreaterThan(1000);
  }
});
