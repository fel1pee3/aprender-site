/** Verify deep links reveal book content inside native closed details elements. */
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { loadData } from './migration-data.mjs';
const base = process.env.QA_BASE_URL || 'http://localhost:3100';
const data = loadData();
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const slug of ['a-cor-da-gente', 'brincando-e-aprendendo']) {
    const book = data['collection-details'].collectionDetails[slug].editions[0].books[0];
    const route = `/solucoes/${slug}#${encodeURIComponent(book.id)}`;
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForFunction(id => Boolean(document.getElementById(id)?.getBoundingClientRect().height), book.id, { timeout: 10000 });
    const state = await page.evaluate(id => {
      const target = document.getElementById(id);
      const ancestors = []; let parent = target.parentElement;
      while (parent) { if (parent.tagName === 'DETAILS') ancestors.push(parent.open); parent = parent.parentElement; }
      const rect = target.getBoundingClientRect();
      return { hash: decodeURIComponent(location.hash.slice(1)), ancestorsOpen: ancestors, targetTop: rect.top, targetHeight: rect.height, title: target.querySelector('h4')?.textContent };
    }, book.id);
    results.push({ route, book: book.title, ...state, pass: state.hash === book.id && state.ancestorsOpen.length > 0 && state.ancestorsOpen.every(Boolean) && state.targetHeight > 0 && state.targetTop >= 0 && state.targetTop < 844 && state.title === book.title });
  }
} finally { await browser.close(); }
mkdirSync('docs/migration', { recursive: true });
writeFileSync('docs/migration/fragment-navigation.json', JSON.stringify({ checkedAt: new Date().toISOString(), base, viewport: '390×844', browser: 'Microsoft Edge headless', results }, null, 2) + '\n');
console.log(JSON.stringify(results));
if (results.some(row => !row.pass)) process.exitCode = 1;
