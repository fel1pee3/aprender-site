import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();
await mkdir(".qa", { recursive: true });
for (const width of [320, 375, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const [label, path] of [
    ["home", "/"],
    ["solution", "/solucoes/brincando-e-aprendendo"],
  ]) {
    await page.goto(`http://127.0.0.1:3000${path}`);
    await page.evaluate(() => document.fonts.ready);
    console.log(
      JSON.stringify({
        width,
        path,
        overflow: await page.evaluate(() =>
          [...document.querySelectorAll("body *")]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return (
                r.width > 0 &&
                (r.right > innerWidth + 1 || r.left < -1) &&
                getComputedStyle(el).position !== "fixed"
              );
            })
            .map((el) => ({
              tag: el.tagName,
              class: el.className,
              text: el.textContent.slice(0, 80),
              x: el.getBoundingClientRect().x,
              width: el.getBoundingClientRect().width,
            }))
            .slice(0, 20),
        ),
      }),
    );
    await page
      .locator("img")
      .evaluateAll((images) => images.forEach((im) => (im.loading = "eager")));
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      await Promise.all(
        [...document.images].map((im) => im.decode().catch(() => {})),
      );
      scrollTo({ top: 0, behavior: "instant" });
    });
    await page.screenshot({
      path: `.qa/${label}-${width}-viewport.png`,
      fullPage: false,
    });
    await page.screenshot({
      path: `.qa/${label}-${width}.png`,
      fullPage: true,
    });
  }
}
await browser.close();
