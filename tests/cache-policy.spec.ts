import { expect, test, type APIRequestContext } from "@playwright/test";
import { createHash } from "node:crypto";
import { htmlLanguages, localizedPath, type Locale } from "../src/i18n/shared";
import { languageCookie, preferenceCookie } from "../src/lib/reading-preferences";

const locales: Locale[] = ["pt", "en", "es"];
const varyFields = ["rsc", "next-router-state-tree", "next-router-prefetch", "next-router-segment-prefetch"];
const defaultAttributes = { theme: "system", contrast: "normal", textSize: "100", spacing: "standard", motion: "system" };
const largeAttributes = { theme: "dark", contrast: "more", textSize: "200", spacing: "comfortable", motion: "reduce" };
const lightAttributes = { ...defaultAttributes, theme: "light" };
type Headers = Record<string, string>;

function directives(value = "") {
  return value.toLowerCase().split(",").map(item => item.trim());
}

function expectPrivate(headers: Headers, description: string) {
  const policy = directives(headers["cache-control"]);
  expect(policy, description).toContain("private");
  expect(policy, description).toContain("no-store");
  expect(policy, description).not.toContain("public");
  expect(policy, description).not.toContain("immutable");
  expect(policy.some(value => value.startsWith("s-maxage=")), description).toBe(false);
  const vary = directives(headers.vary);
  for (const field of varyFields) expect(vary, `${description}: Vary ${field}`).toContain(field);
  // The responses are private; a blanket Vary: Cookie would create needless variants.
  expect(vary, `${description}: no blanket cookie variation`).not.toContain("cookie");
}

function expectImmutable(headers: Headers, description: string) {
  const policy = directives(headers["cache-control"]);
  expect(policy, description).toContain("public");
  expect(policy, description).toContain("max-age=31536000");
  expect(policy, description).toContain("immutable");
  expect(policy, description).not.toContain("no-store");
}

function expectRevalidated(headers: Headers, description: string) {
  const policy = directives(headers["cache-control"]);
  expect(policy, description).toContain("public");
  expect(policy, description).toContain("max-age=0");
  expect(policy, description).not.toContain("immutable");
  expect(headers.etag, `${description}: validator`).toBeTruthy();
  expect(headers["last-modified"], `${description}: modification date`).toBeTruthy();
  expect(Number.isNaN(Date.parse(headers["last-modified"])), description).toBe(false);
}

function cookie(value?: typeof defaultAttributes, language?: Locale) {
  return [
    value ? `${preferenceCookie}=${encodeURIComponent(JSON.stringify(value))}` : "",
    language ? `${languageCookie}=${language}` : "",
  ].filter(Boolean).join("; ");
}

async function assertNotModified(request: APIRequestContext, url: string, etag: string) {
  const response = await request.get(url, { headers: { "If-None-Match": etag } });
  expect(response.status(), `${url}: conditional ETag request`).toBe(304);
  expect((await response.body()).byteLength, `${url}: 304 has no body`).toBe(0);
}

for (const locale of locales) {
  for (const route of ["/", "/solucoes/lendo-e-escrevendo", "/recursos/tabela-precos?colecao=ingles&publico=Professor"]) {
    test(`${locale} ${route}: HTML privado mantém as variantes de leitura separadas`, async ({ request, page }) => {
      const url = localizedPath(route, locale);
      // Warm the same URL with conflicting preferences, then return without cookies.
      const variants = [largeAttributes, undefined, lightAttributes, undefined];
      for (const preferences of variants) {
        const expected = preferences || defaultAttributes;
        const response = await request.get(url, { headers: {
          Cookie: cookie(preferences, preferences ? (locale === "es" ? "en" : "es") : undefined),
          "x-aprender-locale": locale === "es" ? "pt" : "es",
          "x-aprender-path": "/not-the-requested-page",
        } });
        expect(response.status(), url).toBe(200);
        expect(response.headers()["content-type"], url).toMatch(/^text\/html\b/);
        expectPrivate(response.headers(), url);
        expect(response.headers()["content-language"], url).toBe(htmlLanguages[locale]);
        // Inspect the HTTP HTML without running hydration or preference scripts.
        const rendered = await page.evaluate(markup => {
          const doc = new DOMParser().parseFromString(markup, "text/html");
          return {
            lang: doc.documentElement.lang,
            theme: doc.documentElement.getAttribute("data-theme"),
            contrast: doc.documentElement.getAttribute("data-contrast"),
            textSize: doc.documentElement.getAttribute("data-text-size"),
            spacing: doc.documentElement.getAttribute("data-spacing"),
            motion: doc.documentElement.getAttribute("data-motion"),
            canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
            h1: doc.querySelector("main h1")?.textContent?.trim(),
          };
        }, await response.text());
        expect(rendered, url).toMatchObject({ lang: htmlLanguages[locale], ...expected });
        expect(rendered.h1, url).toBeTruthy();
        expect(new URL(rendered.canonical!).pathname, url).toBe(new URL(url, "http://test.invalid").pathname);
      }
    });
  }

  test(`${locale}: payload RSC privado preserva o protocolo e os cookies`, async ({ request }) => {
    const path = localizedPath("/solucoes/lendo-e-escrevendo", locale);
    const headers = { RSC: "1", Cookie: cookie(largeAttributes, locale === "pt" ? "es" : "pt") };
    // Ask Next for its own cache-busting URL; never fabricate the _rsc key.
    const redirect = await request.get(path, { headers, maxRedirects: 0 });
    expect(redirect.status(), `${path}: Next generates the RSC variant URL`).toBe(307);
    expect(redirect.headers().location, path).toBeTruthy();
    const target = new URL(redirect.headers().location, redirect.url());
    expect(target.origin).toBe(new URL(redirect.url()).origin);
    expect(target.pathname).toBe(path);
    expect(target.searchParams.has("_rsc"), "Next-generated RSC cache discriminator").toBe(true);
    // Cookie is deliberately absent from the RSC URL key; private responses must
    // still render fresh request preferences when this exact URL is reused.
    for (const preferences of [largeAttributes, undefined]) {
      const expected = preferences || defaultAttributes;
      const response = await request.get(target.href, { headers: { RSC: "1", Cookie: cookie(preferences) } });
      expect(response.status(), path).toBe(200);
      expect(response.headers()["content-type"], path).toMatch(/^text\/x-component\b/);
      expectPrivate(response.headers(), path);
      expect(response.headers()["content-language"], path).toBe(htmlLanguages[locale]);
      const flight = await response.text();
      expect(flight, path).toContain(`"lang":"${htmlLanguages[locale]}"`);
      expect(flight, path).toContain(`"data-theme":"${expected.theme}"`);
      expect(flight, path).toContain(`"data-text-size":"${expected.textSize}"`);
      expect(flight, path).not.toMatch(/<!DOCTYPE html>/i);
    }
  });
}

test("JS, CSS e fontes com hash mantêm cache imutável e revalidação condicional", async ({ request, page }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const emitted = await page.evaluate(markup => {
    const doc = new DOMParser().parseFromString(markup, "text/html");
    return {
      scripts: [...doc.querySelectorAll("script[src]")].map(node => node.getAttribute("src")!),
      styles: [...doc.querySelectorAll('link[rel="stylesheet"][href]')].map(node => node.getAttribute("href")!),
      fonts: [...doc.querySelectorAll('link[rel="preload"][as="font"][href]')].map(node => node.getAttribute("href")!),
    };
  }, await response.text());
  const script = emitted.scripts.find(url => new URL(url, response.url()).pathname.startsWith("/_next/static/") && /\.js(?:\?|$)/.test(url));
  const style = emitted.styles.find(url => new URL(url, response.url()).pathname.startsWith("/_next/static/") && /\.css(?:\?|$)/.test(url));
  expect(script, "hashed JavaScript emitted by Next").toBeTruthy();
  expect(style, "hashed stylesheet emitted by Next").toBeTruthy();
  const stylesheets = await Promise.all(emitted.styles.map(async url => {
    const result = await request.get(url);
    expect(result.status(), url).toBe(200);
    return { url: result.url(), css: await result.text() };
  }));
  const fonts = new Set(emitted.fonts.map(url => new URL(url, response.url()).href));
  for (const sheet of stylesheets) {
    for (const match of sheet.css.matchAll(/url\(\s*["']?([^\s)"']+)["']?\s*\)/g)) {
      const url = new URL(match[1], sheet.url);
      if (url.pathname.startsWith("/_next/static/media/") && /\.(woff2?|ttf|otf)$/i.test(url.pathname)) fonts.add(url.href);
    }
  }
  expect(fonts.size, "font URL emitted by next/font or the compiled CSS").toBeGreaterThan(0);
  for (const asset of [script!, style!, ...fonts]) {
    const url = new URL(asset, response.url());
    expect(url.pathname.split("/").at(-1), "versioned filename emitted by Next").toMatch(/[a-z\d_-]{8,}/i);
    const result = await request.get(url.href);
    expect(result.status(), url.href).toBe(200);
    expectImmutable(result.headers(), url.pathname);
    expect(result.headers().etag, url.pathname).toBeTruthy();
    if (/\.js$/.test(url.pathname)) expect(result.headers()["content-type"]).toMatch(/(?:java|ecma)script/);
    if (/\.css$/.test(url.pathname)) expect(result.headers()["content-type"]).toMatch(/^text\/css\b/);
    if (/\.(woff2?|ttf|otf)$/.test(url.pathname)) expect(result.headers()["content-type"]).toMatch(/^(?:font\/|application\/(?:font|x-font|octet-stream))/);
    await assertNotModified(request, url.href, result.headers().etag);
  }
});

test("PDF e imagem em endereço fixo revalidam por ETag/data e preservam byte ranges", async ({ request, page }) => {
  const resources = await request.get("/recursos");
  expect(resources.status()).toBe(200);
  const pdf = await page.evaluate(markup => {
    const doc = new DOMParser().parseFromString(markup, "text/html");
    return [...doc.querySelectorAll("a[href]")].map(node => node.getAttribute("href")!).find(href => /^\/documents\/[^?#]+\.pdf$/.test(href));
  }, await resources.text());
  const home = await request.get("/");
  const image = await page.evaluate(markup => {
    const doc = new DOMParser().parseFromString(markup, "text/html");
    const social = doc.querySelector('meta[property="og:image"]')?.getAttribute("content");
    return social ? new URL(social).pathname : undefined;
  }, await home.text());
  expect(pdf, "local PDF linked by the site").toBeTruthy();
  expect(image, "local social image linked by the site").toMatch(/^\/images\//);
  for (const url of [pdf!, image!]) {
    const head = await request.head(url);
    expect(head.status(), url).toBe(200);
    expectRevalidated(head.headers(), url);
    expect(head.headers()["accept-ranges"], url).toBe("bytes");
    const size = Number(head.headers()["content-length"]);
    expect(size, url).toBeGreaterThan(16);
    await assertNotModified(request, url, head.headers().etag);
    const unchanged = await request.get(url, { headers: { "If-Modified-Since": head.headers()["last-modified"] } });
    expect(unchanged.status(), `${url}: modification-date validator`).toBe(304);
    expect((await unchanged.body()).byteLength).toBe(0);
    const partial = await request.get(url, { headers: { Range: "bytes=0-15" } });
    expect(partial.status(), `${url}: range request`).toBe(206);
    expect(partial.headers()["content-range"], url).toBe(`bytes 0-15/${size}`);
    expect(partial.headers()["content-length"], url).toBe("16");
    expect(partial.headers().etag, url).toBe(head.headers().etag);
    const bytes = await partial.body();
    expect(bytes.byteLength, url).toBe(16);
    if (url.endsWith(".pdf")) {
      expect(partial.headers()["content-type"]).toMatch(/^application\/pdf\b/);
      expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    } else expect(partial.headers()["content-type"]).toMatch(/^image\//);
  }
});

test("imagens otimizadas e metadados sociais incluem uma versão derivada dos bytes", async ({ request, page }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const urls = await page.evaluate(markup => {
    const doc = new DOMParser().parseFromString(markup, "text/html");
    return {
      images: [...doc.querySelectorAll("img[src]")].map(node => node.getAttribute("src")!),
      openGraph: doc.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      twitter: doc.querySelector('meta[name="twitter:image"]')?.getAttribute("content"),
    };
  }, await response.text());
  const optimized = urls.images.map(value => new URL(value, response.url())).filter(url => url.pathname === "/_next/image");
  expect(optimized.length, "optimized images actually emitted in SSR HTML").toBeGreaterThan(0);
  const sources = optimized.map(url => new URL(url.searchParams.get("url")!, response.url()));
  for (const source of sources) {
    expect(source.pathname).toMatch(/^\/images\//);
    expect(source.searchParams.get("v"), source.pathname).toMatch(/^[a-f\d]{16,64}$/);
  }
  expect(urls.openGraph, "Open Graph image").toBeTruthy();
  expect(urls.twitter, "Twitter image").toBeTruthy();
  const social = [new URL(urls.openGraph!), new URL(urls.twitter!)];
  for (const source of social) expect(source.searchParams.get("v"), source.href).toMatch(/^[a-f\d]{16,64}$/);
  expect(social[0].href).toBe(social[1].href);
  // Compare an emitted optimized source and the shared social source with real HTTP bytes.
  for (const source of [sources[0], social[0]]) {
    const version = source.searchParams.get("v")!;
    const original = await request.get(source.pathname + source.search);
    expect(original.status(), source.href).toBe(200);
    expectRevalidated(original.headers(), source.pathname);
    const digest = createHash("sha256").update(await original.body()).digest("hex");
    expect(digest.startsWith(version), `${source.pathname}: SHA-256 content identity`).toBe(true);
  }
  const transformed = await request.get(optimized[0].pathname + optimized[0].search);
  expect(transformed.status(), "versioned optimizer URL remains valid").toBe(200);
  expect(transformed.headers()["content-type"]).toMatch(/^image\//);
});
