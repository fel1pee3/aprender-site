import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3100";
const output = process.env.PERFORMANCE_OUTPUT || "docs/migration/performance.json";
const locales = (process.env.PERFORMANCE_LOCALES || "pt").split(",").filter(locale => ["pt", "en", "es"].includes(locale));
const browser = await chromium.launch({ channel: "msedge", headless: true });
const measurements = [];
try {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 1000 },
  ]) {
    for (const baseRoute of [
      "/",
      "/solucoes",
      "/solucoes/lendo-e-escrevendo",
      "/recursos/tabela-precos",
      "/acervo",
    ]) {
     for (const locale of locales) {
      const route = locale === "pt" ? baseRoute : `/${locale}${baseRoute === "/" ? "" : baseRoute}`;
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      await session.send("Network.enable");
      await session.send("Network.setCacheDisabled", { cacheDisabled: true });
      await session.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 1_600_000 / 8,
        uploadThroughput: 750_000 / 8,
      });
      await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      const downloads = [];
      page.on("request", (request) => downloads.push(request.url()));
      await page.addInitScript(() => {
        window.__performanceReview = { lcp: 0, cls: 0 };
        new PerformanceObserver((list) => {
          for (const item of list.getEntries())
            window.__performanceReview.lcp = item.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const item of list.getEntries())
            if (!item.hadRecentInput)
              window.__performanceReview.cls += item.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto(base + route, {
        waitUntil: "networkidle",
        timeout: 60000,
      });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500);
      const result = await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        const paints = performance.getEntriesByType("paint");
        return {
          ...window.__performanceReview,
          fcp:
            paints.find((item) => item.name === "first-contentful-paint")
              ?.startTime || null,
          ttfb: navigation.responseStart,
          domContentLoaded: navigation.domContentLoadedEventEnd,
          load: navigation.loadEventEnd,
          transferBytes:
            navigation.transferSize +
            resources.reduce((sum, item) => sum + item.transferSize, 0),
          requests: resources.length + 1,
        };
      });
      const entry = {
        route,
        locale,
        viewport,
        ...result,
        pdfOrVideoAutomaticallyRequested: downloads.filter((url) =>
          /\.pdf(?:$|[?#])|\/media\/.*\.mp4/.test(url),
        ),
        originalPriceImageAutomaticallyRequested: downloads.some((url) =>
          url.includes("/images/resources/tabela-precos-2027.jpg"),
        ),
        vlibrasAutomaticallyRequested: downloads.some(url => /vlibras|traducao2/.test(url)),
      };
      measurements.push(entry);
      console.log(JSON.stringify(entry));
      await context.close();
     }
    }
  }
} finally {
  await browser.close();
}
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(
  output,
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      method:
        "Microsoft Edge headless, fresh context, browser cache disabled, local production server, 150 ms simulated latency, 1.6 Mbps download, 0.75 Mbps upload and 4× CPU slowdown. One navigation per route and viewport; lab snapshot, not Lighthouse or field data. LCP observed until 1.5 seconds after network idle.",
      measurements,
    },
    null,
    2,
  ) + "\n",
);
