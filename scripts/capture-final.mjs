import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const output = process.env.QA_CAPTURE_DIR || ".qa/final";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();
mkdirSync(output, { recursive: true });
try {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/solucoes",
      "/solucoes/lendo-e-escrevendo",
      "/solucoes/brincando-e-aprendendo",
      "/solucoes/a-cor-da-gente",
      "/a-editora",
      "/a-editora/edgar-linhares",
      "/a-editora/paic",
      "/formacao",
      "/acervo",
      "/recursos/tabela-precos",
    ]) {
      await page.goto(base + route);
      await page.evaluate(() => document.fonts.ready);
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.forEach((image) => (image.loading = "eager")),
        );
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].map((image) => image.decode().catch(() => {})),
        );
      });
      const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({
        path: `${output}/${slug}-${width}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `${output}/${slug}-${width}-viewport.png`,
      });
      console.log(`${route} @ ${width}`);
    }
  }
} finally {
  await browser.close();
}
