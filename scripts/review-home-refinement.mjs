import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const output = [];
const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:3200/";
mkdirSync(".qa/refinement", { recursive: true });
try {
  for (const viewport of [
    { width: 360, height: 640 },
    { width: 390, height: 844 },
    { width: 768, height: 640 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    const page = await browser.newPage({ viewport });
    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `.qa/refinement/home-${viewport.width}.png` });
    const metrics = await page.evaluate(() => {
      const rect = (selector) => {
        const r = document.querySelector(selector).getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, width: r.width, height: r.height };
      };
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: rect("h1"),
        actions: [...document.querySelectorAll("h1~div a")].slice(0, 2).map((x) => ({ text: x.innerText, top: x.getBoundingClientRect().top, height: x.getBoundingClientRect().height })),
        header: rect("header"),
      };
    });
    const result = { viewport, ...metrics };
    assert.equal(metrics.overflow, false, `Horizontal overflow at ${viewport.width}px`);
    assert.ok(metrics.actions.every((action) => action.height >= 44));
    await page.evaluate(() => scrollTo(0, 500));
    await page.waitForTimeout(350);
    result.scrolledHeader = await page.locator("header").evaluate((el) => ({ scrolled: el.dataset.scrolled, height: el.getBoundingClientRect().height, background: getComputedStyle(el).backgroundColor }));
    assert.equal(result.header.height, result.scrolledHeader.height);
    assert.equal(result.scrolledHeader.scrolled, "true");
    if (viewport.width < 1280) {
      const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
      await trigger.click();
      await page.waitForTimeout(350);
      result.menuOpen = await page.getByRole("dialog").isVisible();
      const menuControls = page.getByRole("dialog").locator("a[href],button");
      await menuControls.first().focus();
      await page.keyboard.press("Shift+Tab");
      result.focusTrapBackward = await menuControls.last().evaluate((el) => el === document.activeElement);
      await page.keyboard.press("Tab");
      result.focusTrapForward = await menuControls.first().evaluate((el) => el === document.activeElement);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(350);
      result.focusReturned = await trigger.evaluate((el) => el === document.activeElement);
      assert.ok(result.menuOpen && result.focusTrapBackward && result.focusTrapForward && result.focusReturned);
    }
    output.push(result);
    await page.close();
  }
  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await reduced.goto(baseUrl, { waitUntil: "networkidle" });
  await reduced.evaluate(() => scrollTo(0, 1000));
  const reducedMotion = await reduced.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    headerTransition: getComputedStyle(document.querySelector("header")).transitionDuration,
    groups: [...document.querySelectorAll("[data-reveal]")].map((el) => ({ animation: getComputedStyle(el).animationName, opacity: getComputedStyle(el).opacity, transform: getComputedStyle(el).transform })),
  }));
  assert.equal(reducedMotion.scrollBehavior, "auto");
  assert.equal(reducedMotion.headerTransition, "0s");
  assert.ok(reducedMotion.groups.every((group) => group.animation === "none" && group.opacity === "1" && group.transform === "none"));
  output.push({ reducedMotion });
  await reduced.close();
  const noJs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await noJs.goto(baseUrl, { waitUntil: "networkidle" });
  const contentWithoutJavaScript = await noJs.evaluate(() => ({
    heading: document.querySelector("h1").innerText,
    groups: [...document.querySelectorAll("[data-reveal]")].map((el) => ({ opacity: getComputedStyle(el).opacity, visibility: getComputedStyle(el).visibility })),
  }));
  assert.ok(contentWithoutJavaScript.heading.includes("Materiais e formação"));
  assert.ok(contentWithoutJavaScript.groups.every((group) => group.opacity === "1" && group.visibility === "visible"));
  output.push({ contentWithoutJavaScript });
  await noJs.close();
} finally {
  await browser.close();
}
writeFileSync(".qa/refinement/home-metrics.json", JSON.stringify(output, null, 2));
console.log(JSON.stringify(output, null, 2));
