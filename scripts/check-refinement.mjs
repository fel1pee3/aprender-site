/** Independent preservation and same-origin audit. No document body is downloaded.
 * node scripts/check-refinement.mjs --write-baseline  (immutable HEAD data)
 * node scripts/check-refinement.mjs --static
 * BASE_URL=http://localhost:3100 node scripts/check-refinement.mjs
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { chromium } from '@playwright/test';
import { loadData, normalize, publicOrigin, publicRoutes } from './migration-data.mjs';

const base = (process.env.BASE_URL || process.env.QA_BASE_URL || 'http://localhost:3100').replace(/\/$/, '');
const staticOnly = process.argv.includes('--static');
const baselinePath = 'docs/refinement/preservation-baseline.json';
const forbiddenHosts = new Set(['aprendereditora.com.br', 'www.aprendereditora.com.br']);
const ownedOrigins = new Set([new URL(base).origin, publicOrigin]);
const isPreviousServer = (url, owned = ownedOrigins) => forbiddenHosts.has(url.hostname.toLowerCase()) && !owned.has(url.origin);
const report = { checkedAt: new Date().toISOString(), base, mode: staticOnly ? 'static' : 'browser-and-http', checks: [], pages: [], requests: [], editorialChanges: [], limitations: [] };
const check = (id, pass, detail = '') => report.checks.push({ id, pass: Boolean(pass), detail });
check('origin-distinguishes-old-server', isPreviousServer(new URL('https://www.aprendereditora.com.br/quem-somos'), new Set(['https://aprender-site.vercel.app'])));
check('origin-allows-future-owned-host', !isPreviousServer(new URL('https://www.aprendereditora.com.br/a-editora'), new Set(['https://www.aprendereditora.com.br'])));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const json = filename => JSON.parse(readFileSync(filename, 'utf8'));
const pick = (object, fields) => Object.fromEntries(fields.filter(key => object[key] !== undefined).map(key => [key, object[key]]));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const normalizedSet = values => [...new Set(values.map(normalize))].sort();

function snapshot(data) {
  const institution = data.institutional;
  return {
    solutions: data.solutions.solutions.map(row => pick(row, ['slug', 'name', 'description', 'stageIds', 'audience', 'components', 'goals', 'support'])),
    collections: Object.fromEntries(Object.entries(data['collection-details'].collectionDetails).map(([slug, row]) => [slug, {
      intro: row.intro,
      editions: row.editions.map(edition => ({ ...pick(edition, ['id', 'label', 'context', 'audience', 'foundation', 'support']), books: edition.books.map(book => pick(book, ['id', 'title', 'audience', 'schoolYear', 'ageRange', 'description', 'components', 'pages', 'quantity'])) })),
      gallery: row.gallery.map(image => pick(image, ['src', 'alt', 'caption', 'editionId'])),
    }])),
    resources: data.resources.documentResources.map(row => pick(row, ['id', 'kind', 'collectionSlug', 'title', 'sizeBytes', 'pageCount', 'volume', 'schoolYear', 'year'])),
    prices: data.prices.priceRows.map(row => pick(row, ['id', 'collectionSlug', 'relatedCollectionSlugs', 'collection', 'material', 'audience', 'schoolYear', 'kit', 'priceCents', 'segment', 'edition', 'sourceRow'])),
    institutional: {
      missions: institution.missionVersions.map(row => pick(row, ['id', 'text'])),
      values: institution.institutionalValues.map(row => pick(row, ['id', 'title', 'description', 'historicalDescription'])),
      timeline: institution.timeline.map(row => pick(row, ['id', 'period', 'title', 'paragraphs'])),
      edgar: institution.edgar.paragraphs,
      axes: institution.formationAxes.map(row => pick(row, ['id', 'title', 'description'])),
      plan: institution.formationPlan.map(row => pick(row, ['id', 'title', 'description', 'items'])),
      paic: pick(institution.paic, ['statistics', 'catalogueStatistics', 'ideb', 'ranking2017', 'ioeb2019', 'historicalHighlights', 'paragraphs']),
      indicators: institution.institutionalIndicators.map(row => pick(row, ['id', 'value', 'label', 'edition'])),
    },
    testimonials: data.archive.testimonials.map(row => pick(row, ['id', 'name', 'role', 'location', 'period', 'paragraphs'])),
    photos: data.archive.formationGallery.map(row => pick(row, ['id', 'image', 'alt', 'caption', 'location', 'date', 'width', 'height'])),
    videos: data.archive.videos.map(row => pick(row, ['id', 'title', 'src', 'poster', 'durationSeconds', 'width', 'height', 'transcript', 'descriptionTrack', 'sizeBytes'])),
  };
}

function createBaseline() {
  if (existsSync(baselinePath)) throw new Error('Baseline already exists. Do not replace independent HEAD evidence.');
  const git = args => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  // A sandbox may allow Git in the command runner but deny nested child_process.
  // An explicit JSON export of git show HEAD is equivalent read-only evidence.
  const exportArgument = process.argv.find(value => value.startsWith('--head-sources='));
  const exported = exportArgument ? json(exportArgument.slice('--head-sources='.length)) : null;
  const files = exported ? Object.keys(exported.files).filter(name => name.endsWith('.ts')) : git(['ls-tree', '-r', '--name-only', 'HEAD', 'src/data']).split(/\r?\n/).filter(name => name.endsWith('.ts'));
  const output = path.resolve('.qa/refinement-head-data');
  mkdirSync(output, { recursive: true });
  const sourceFiles = {};
  for (const filename of files) {
    const source = exported ? exported.files[filename] : git(['show', `HEAD:${filename}`]);
    sourceFiles[filename] = hash(Buffer.from(source));
    writeFileSync(path.join(output, path.basename(filename).replace(/\.ts$/, '.js')), ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText);
  }
  const require = createRequire(import.meta.url);
  const data = Object.fromEntries(['solutions', 'editorial', 'institutional', 'archive', 'resources', 'prices', 'collection-details'].map(name => [name, require(path.join(output, `${name}.js`))]));
  mkdirSync(path.dirname(baselinePath), { recursive: true });
  writeFileSync(baselinePath, JSON.stringify({ schemaVersion: 1, createdAt: new Date().toISOString(), gitCommit: exported ? exported.commit : git(['rev-parse', 'HEAD']).trim(), method: 'git show HEAD:src/data/*.ts; TypeScript transpile; source hashes; provenance and operational notes omitted from public-content snapshot', sourceHashScope: exported ? 'SHA-256 of UTF-8 source text compiled from the explicit Git export; the PowerShell export normalizes line endings and omits the terminal newline.' : 'SHA-256 of UTF-8 git show stdout.', sourceFiles, content: snapshot(data) }, null, 2) + '\n');
  console.log(`Independent baseline written: ${baselinePath}`);
}

if (process.argv.includes('--write-baseline')) { createBaseline(); process.exit(0); }

let data;
try { data = loadData(); }
catch (error) { console.error('Cannot load current data:', error); process.exit(1); }
if (data['collection-details'].__loadError) { console.error(data['collection-details'].__loadError); process.exit(1); }
const current = snapshot(data);
const baseline = json(baselinePath);
const before = baseline.content;
const routes = publicRoutes(data);
report.baselineCommit = baseline.gitCommit;
check('public-route-count', routes.length === 40 && routes.includes('/acessibilidade'), routes.join(', '));
const counts = {
  solutions: current.solutions.length, prices: current.prices.length,
  samples: current.resources.filter(row => row.kind === 'sample').length,
  institutionalDocuments: current.resources.filter(row => row.kind === 'institutional').length,
  catalogues: current.resources.filter(row => row.kind === 'catalog').length,
  documents: current.resources.length, testimonials: current.testimonials.length,
  photos: current.photos.length, videos: current.videos.length,
  values: current.institutional.values.length, formationAxes: current.institutional.axes.length,
  formationActions: current.institutional.plan.flatMap(row => row.items).length,
  catalogueIndicators: current.institutional.indicators.filter(row => row.id.endsWith('-2025') && row.id !== 'parceiros-publieditorial-2025').length,
};
report.contentCounts = counts;
for (const [key, count] of Object.entries({ solutions: 23, prices: 152, samples: 27, institutionalDocuments: 1, catalogues: 1, documents: 29, testimonials: 9, photos: 9, videos: 3, values: 7, formationAxes: 5, formationActions: 16, catalogueIndicators: 4 })) check(`preserved-count-${key}`, counts[key] === count, `${counts[key]} expected ${count}`);

function compareText(id, original, present) {
  check(`content-present-${id}`, typeof present === 'string' && present.trim().length > 0);
  if (normalize(original) !== normalize(present)) report.editorialChanges.push({ id, before: original, after: present, review: 'Editorial rewrite; automated checks do not prove semantic equivalence.' });
}
for (const solution of before.solutions) {
  const present = current.solutions.find(row => row.slug === solution.slug);
  check(`solution-identity-${solution.slug}`, present?.name === solution.name);
  check(`solution-components-${solution.slug}`, present && same(normalizedSet(solution.components), normalizedSet(present.components)));
  if (present) compareText(`solution-description-${solution.slug}`, solution.description, present.description);
}
for (const [slug, collection] of Object.entries(before.collections)) {
  const present = current.collections[slug];
  check(`collection-editions-${slug}`, present && collection.editions.every(edition => present.editions.some(row => row.id === edition.id)));
  for (const edition of collection.editions) {
    const actual = present?.editions.find(row => row.id === edition.id);
    check(`edition-book-set-${slug}-${edition.id}`, actual && same(normalizedSet(edition.books.map(book => book.id)), normalizedSet(actual.books.map(book => book.id))));
    for (const book of edition.books) {
      const next = actual?.books.find(row => row.id === book.id);
      const identity = ['id', 'title', 'audience', 'schoolYear', 'pages', 'quantity'];
      check(`book-identity-${slug}-${edition.id}-${book.id}`, next && same(pick(book, identity), pick(next, identity)));
      check(`book-components-${slug}-${edition.id}-${book.id}`, next && same(normalizedSet(book.components), normalizedSet(next.components)));
      if (next) compareText(`book-description-${slug}-${edition.id}-${book.id}`, book.description, next.description);
    }
    for (const field of ['foundation', 'support']) {
      check(`edition-${field}-count-${slug}-${edition.id}`, actual && actual[field].length >= edition[field].length);
      for (const [index, text] of edition[field].entries()) if (actual?.[field][index]) compareText(`${slug}-${edition.id}-${field}-${index}`, text, actual[field][index]);
    }
  }
}
for (const key of ['prices', 'resources', 'testimonials', 'photos', 'videos']) check(`preserved-${key}-records`, same(before[key], current[key]), 'Compared substantive records with the preceding committed version; source URLs and operational notes are not part of this comparison.');
for (const key of ['missions', 'axes', 'plan']) check(`preserved-institution-${key}`, same(before.institutional[key], current.institutional[key]));
for (const value of before.institutional.values) {
  const present = current.institutional.values.find(row => row.id === value.id);
  check(`preserved-value-${value.id}`, present && same(pick(value, ['id', 'title', 'description']), pick(present, ['id', 'title', 'description'])));
  if (present) compareText(`value-historical-${value.id}`, value.historicalDescription, present.historicalDescription);
}
for (const key of ['statistics', 'catalogueStatistics', 'ideb', 'ranking2017', 'ioeb2019']) check(`preserved-paic-${key}`, same(before.institutional.paic[key], current.institutional.paic[key]));
check('preserved-indicator-definitions', before.institutional.indicators.every(row => {
  const present = current.institutional.indicators.find(item => item.id === row.id);
  if (present) compareText(`indicator-edition-${row.id}`, row.edition, present.edition);
  return present && same(pick(row, ['id', 'value', 'label']), pick(present, ['id', 'value', 'label'])) && same(row.edition.match(/\d+/g), present.edition.match(/\d+/g));
}));
check('separate-social-and-professional-values', ['responsabilidade-social', 'responsabilidade-profissional'].every(id => current.institutional.values.some(row => row.id === id)));
check('separate-avancando-scopes', current.collections['avancando-juntos'].editions.some(row => row.id.includes('2025')) && current.prices.filter(row => row.collectionSlug === 'avancando-juntos').length === 16);
check('english-student-and-teacher', current.prices.filter(row => row.collectionSlug === 'ingles').length === 8 && current.prices.some(row => row.collectionSlug === 'ingles' && normalize(row.audience).includes('professor')));
const expectedSamples = { 'brincando-e-aprendendo': 4, 'lendo-e-escrevendo': 3, 'novo-lendo-voce-fica-sabendo': 2, 'escrever-comunicar-e-ser': 5, 'acerta-brasil': 2, 'projeto-tema': 3, 'vida-e-linguagem': 4, 'vida-e-matematica': 4 };
for (const [slug, count] of Object.entries(expectedSamples)) check(`sample-set-${slug}`, current.resources.filter(row => row.collectionSlug === slug).length === count);

const documents = json('docs/refinement/document-migration.json');
for (const resource of data.resources.documentResources) {
  const evidence = documents.documents.find(row => row.id === resource.id);
  const filename = path.join('public', resource.url);
  const bytes = existsSync(filename) ? readFileSync(filename) : Buffer.alloc(0);
  check(`local-pdf-${resource.id}`, resource.url.startsWith('/documents/') && bytes.subarray(0, 5).toString() === '%PDF-' && bytes.subarray(-2048).includes(Buffer.from('%%EOF')) && bytes.length === resource.sizeBytes && bytes.length === evidence?.validation.sizeBytes && hash(bytes) === evidence?.validation.sha256 && resource.pageCount === evidence?.validation.pageCount, 'Local signature, trailer, bytes, source SHA-256 and parser page-count evidence; no PDF fetched over HTTP.');
}
for (const original of documents.testimonials) {
  const filename = path.join('public', original.localUrl);
  check(`local-testimonial-original-${original.id}`, existsSync(filename) && hash(readFileSync(filename)) === original.sha256);
}

// Recursively inspect optimizer URLs and nested redirect/query parameters.
function oldDependencies(input, context = '', depth = 0) {
  if (depth > 7 || typeof input !== 'string') return [];
  const value = input.trim().replace(/&amp;/g, '&').replace(/\\\//g, '/');
  if (!value || /^(mailto:|tel:|data:|blob:|#)/i.test(value)) return [];
  const found = [];
  let decoded = value;
  try { decoded = decodeURIComponent(value); } catch { /* Not URI encoded. */ }
  const urls = new Set([value, ...decoded.matchAll(/(?:https?:)?\/\/[^\s"'<>\\)]+/g)].map(row => typeof row === 'string' ? row : row[0]));
  for (const candidate of urls) {
    try {
      const parsed = new URL(candidate, base);
      if (isPreviousServer(parsed)) found.push({ context, url: candidate, host: parsed.hostname });
      for (const [key, nested] of parsed.searchParams) if (/url|src|href|target|redirect|image/i.test(key) || /https?[%:]|^\//i.test(nested)) found.push(...oldDependencies(nested, `${context} query:${key}`, depth + 1));
    } catch { /* CSS fragments and non-URL text are handled by extracted URLs. */ }
  }
  return found;
}

for (const [id, value, shouldFind] of [
  ['old-https', 'https://www.aprendereditora.com.br/material.pdf', true],
  ['protocol-relative-css', 'body{background:url(//aprendereditora.com.br/photo.jpg)}', true],
  ['optimizer-encoded', '/_next/image?url=https%3A%2F%2Fwww.aprendereditora.com.br%2Fphoto.jpg&w=640&q=75', true],
  ['optimizer-double-encoded', '/_next/image?url=https%253A%252F%252Faprendereditora.com.br%252Fphoto.jpg', true],
  ['legitimate-email', 'mailto:aprendereditora@aprendereditora.com.br', false],
  ['same-origin-document', '/documents/paic.pdf', false],
]) check(`dependency-scanner-${id}`, Boolean(oldDependencies(value).length) === shouldFind);

const runtimeAssets = new Set();
const assetKeys = new Set(['image', 'src', 'poster', 'originalSrc', 'originalImage', 'descriptionTrack', 'preview', 'url']);
function auditData(value, trail = '') {
  if (Array.isArray(value)) value.forEach((item, index) => auditData(item, `${trail}[${index}]`));
  else if (value && typeof value === 'object') for (const [key, item] of Object.entries(value)) {
    if (typeof item === 'string' && assetKeys.has(key)) {
      const bad = oldDependencies(item, `${trail}.${key}`);
      check(`data-dependency-${trail}.${key}`, bad.length === 0, bad.map(row => row.url).join(', '));
      if (/^\/(images|media|documents)\//.test(item)) runtimeAssets.add(item.split(/[?#]/)[0]);
    }
    if (!['sourceUrl', 'sourcePage', 'source', 'references', 'originalRecord'].includes(key)) auditData(item, `${trail}.${key}`);
  }
}
auditData(data);
for (const asset of runtimeAssets) check(`static-asset-${asset}`, existsSync(path.join('public', asset)) && statSync(path.join('public', asset)).size > 0);
const nextConfig = ['next.config.ts', 'next.config.mjs', 'next.config.js'].filter(existsSync).map(file => readFileSync(file, 'utf8')).join('\n');
check('optimizer-no-old-remote-allowlist', !/aprendereditora\.com\.br/.test(nextConfig), 'Local image sources plus config inspected; server-side optimizer targets are also decoded from rendered URLs.');
const sourceWalk = folder => readdirSync(folder, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? sourceWalk(path.join(folder, entry.name)) : [path.join(folder, entry.name)]);
for (const filename of sourceWalk('src').filter(name => /\.css$/.test(name))) {
  const css = readFileSync(filename, 'utf8');
  check(`css-source-${filename}`, oldDependencies(css, filename).length === 0);
}
for (const [source, destination] of Object.entries(data['legacy-routes'].legacyRoutes)) check(`redirect-config-${source}`, oldDependencies(destination, source).length === 0);

if (!staticOnly) {
  let browser;
  try {
    const health = await fetch(base, { signal: AbortSignal.timeout(10000) });
    if (!health.ok) throw new Error(`Server returned ${health.status}`);
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    let routeName = '';
    const requests = [];
    await context.route('**/*', async route => {
      const url = route.request().url();
      const bad = oldDependencies(url, `request ${routeName}`);
      requests.push({ route: routeName, url, type: route.request().resourceType(), blockedOldHost: bad.length > 0 });
      if (bad.length) await route.abort(); else await route.continue();
    });
    const cssInspected = new Set();
    const routeIds = new Map();
    const internalTargets = new Map();
    for (const route of routes) {
      routeName = route;
      const startRequest = requests.length;
      try {
        const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
        check(`http-route-${route}`, response?.status() === 200);
        const mainText = await page.locator('main').innerText();
        const snapshot = await page.evaluate(() => {
          const attributes = ['href', 'src', 'srcset', 'poster', 'data', 'action', 'formaction'];
          const resources = [...document.querySelectorAll('*')].flatMap(node => attributes.filter(attribute => node.hasAttribute(attribute)).map(attribute => ({ tag: node.tagName, attribute, value: node.getAttribute(attribute) })));
          const styleUrls = [...document.querySelectorAll('[style]')].map(node => node.getAttribute('style'));
          const metadata = [...document.querySelectorAll('meta[content]')].map(node => ({ key: node.getAttribute('property') || node.getAttribute('name'), value: node.content }));
          const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(node => node.textContent);
          return { resources, styleUrls, metadata, ld, ids: [...document.querySelectorAll('[id]')].map(node => node.id), links: [...document.querySelectorAll('a[href]')].map(node => ({ href: node.getAttribute('href'), text: node.textContent.trim(), download: node.hasAttribute('download'), target: node.target })), css: [...document.querySelectorAll('link[rel="stylesheet"]')].map(node => node.href), videos: [...document.querySelectorAll('video')].map(node => ({ preload: node.preload, autoplay: node.autoplay })), title: document.title, finalUrl: location.href };
        });
        const candidates = [...snapshot.resources.map(row => ({ context: `${row.tag}[${row.attribute}]`, value: row.value })), ...snapshot.styleUrls.map(value => ({ context: 'inline CSS', value })), ...snapshot.metadata.map(row => ({ context: `meta ${row.key}`, value: row.value })), ...snapshot.ld.map(value => ({ context: 'JSON-LD', value }))];
        const bad = candidates.flatMap(row => oldDependencies(row.value, row.context));
        check(`rendered-autonomy-${route}`, bad.length === 0, JSON.stringify(bad));
        check(`final-origin-${route}`, new URL(snapshot.finalUrl).origin === new URL(base).origin);
        check(`unique-ids-${route}`, new Set(snapshot.ids).size === snapshot.ids.length);
        routeIds.set(route, snapshot.ids);
        for (const link of snapshot.links) {
          if (/^(mailto:|tel:|javascript:|data:)/i.test(link.href || '')) continue;
          try {
            const target = new URL(link.href, base + route);
            if (target.origin === new URL(base).origin) {
              const key = target.pathname + target.search;
              const record = internalTargets.get(key) || { url: key, anchors: new Set(), from: new Set() };
              if (target.hash) record.anchors.add(decodeURIComponent(target.hash.slice(1)));
              record.from.add(route);
              internalTargets.set(key, record);
            }
          } catch { check(`valid-href-${route}-${link.href}`, false, link.text); }
        }
        check(`public-copy-no-old-http-${route}`, oldDependencies(mainText, 'visible text').length === 0);
        check(`video-on-demand-${route}`, snapshot.videos.every(video => video.preload === 'none' && !video.autoplay));
        const pdfLinks = snapshot.links.filter(link => /\.pdf(?:$|[?#])/i.test(link.href));
        for (const [index, link] of pdfLinks.entries()) {
          check(`pdf-label-${route}-${index}`, /PDF/i.test(link.text), link.text);
          if (/baixar/i.test(link.text)) check(`true-download-${route}-${index}`, link.download && new URL(link.href, base).origin === new URL(base).origin, link.href);
        }
        for (const stylesheet of snapshot.css) if (!cssInspected.has(stylesheet)) {
          cssInspected.add(stylesheet);
          const cssResponse = await fetch(stylesheet, { signal: AbortSignal.timeout(15000) });
          const css = await cssResponse.text();
          check(`served-css-${cssInspected.size}`, cssResponse.ok && oldDependencies(css, stylesheet).length === 0, stylesheet);
        }
        // Expand existing semantic details and select every edition to inspect
        // resources and content that are intentionally outside the initial view.
        await page.locator('details').evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
        const contentViews = [await page.locator('main').textContent()];
        const editionSelects = page.locator('select').filter({ has: page.locator('option') });
        for (let index = 0; index < await editionSelects.count(); index++) {
          const select = editionSelects.nth(index);
          const label = await select.getAttribute('aria-label') || await select.getAttribute('id') || '';
          if (!/edi[cç]|apresenta[cç]/i.test(label)) continue;
          for (const option of await select.locator('option').evaluateAll(nodes => nodes.map(node => node.value))) {
            await select.selectOption(option);
            await page.locator('details').evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
            contentViews.push(await page.locator('main').textContent());
            const dependencies = await page.locator('[href],[src],[srcset],[poster]').evaluateAll(nodes => nodes.flatMap(node => ['href', 'src', 'srcset', 'poster'].map(attribute => node.getAttribute(attribute)).filter(Boolean)));
            check(`edition-autonomy-${route}-${option}`, dependencies.every(value => oldDependencies(value).length === 0));
          }
        }
        for (const tab of await page.locator('main [role="tab"]').all()) if (await tab.isVisible()) {
          await tab.click();
          await page.locator('details').evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
          contentViews.push(await page.locator('main').textContent());
          const dependencies = await page.locator('[href],[src],[srcset],[poster]').evaluateAll(nodes => nodes.flatMap(node => ['href', 'src', 'srcset', 'poster'].map(attribute => node.getAttribute(attribute)).filter(Boolean)));
          check(`tab-autonomy-${route}-${await tab.getAttribute('id')}`, dependencies.every(value => oldDependencies(value).length === 0));
        }
        const expandedText = contentViews.join(' ');
        const slug = route.startsWith('/solucoes/') ? route.slice('/solucoes/'.length) : '';
        if (current.collections[slug]) for (const edition of current.collections[slug].editions) for (const book of edition.books) check(`rendered-book-${slug}-${edition.id}-${book.id}`, normalize(expandedText).includes(normalize(book.title)));
        const routeRequests = requests.slice(startRequest);
        check(`network-autonomy-${route}`, routeRequests.every(row => !row.blockedOldHost), JSON.stringify(routeRequests.filter(row => row.blockedOldHost)));
        check(`no-auto-heavy-download-${route}`, routeRequests.every(row => !/\.(pdf|mp4)(?:$|[?#])/i.test(new URL(row.url).pathname)), 'Normal page load and content expansion must not fetch PDFs or MP4 bodies.');
        report.pages.push({ route, status: response?.status(), title: snapshot.title, finalUrl: snapshot.finalUrl, links: snapshot.links, resources: snapshot.resources, ids: snapshot.ids, networkRequests: routeRequests.length });
      } catch (error) { check(`browser-route-${route}`, false, String(error)); }
    }
    for (const target of internalTargets.values()) {
      const response = await fetch(base + target.url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(20000) });
      const location = response.headers.get('location') || '';
      check(`internal-target-${target.url}`, response.status >= 200 && response.status < 400 && oldDependencies(location).length === 0, `${response.status} ${location}; from ${[...target.from].join(', ')}`);
      const route = new URL(target.url, base).pathname;
      if (routeIds.has(route)) for (const anchor of target.anchors) check(`internal-anchor-${target.url}#${anchor}`, routeIds.get(route).includes(anchor), `Linked from ${[...target.from].join(', ')}`);
    }
    // HEAD confirms availability, MIME and exact size without downloading the
    // 371 MB archive again. Local hashes above prove the binary itself.
    for (const resource of data.resources.documentResources) {
      const response = await fetch(base + resource.url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(20000) });
      check(`served-document-${resource.id}`, response.status === 200 && /application\/pdf/i.test(response.headers.get('content-type') || '') && Number(response.headers.get('content-length')) === resource.sizeBytes, `${response.status} ${response.headers.get('content-type')} ${response.headers.get('content-length')}`);
    }
    // Follow legacy redirects manually so an old-host redirect is reported
    // before any connection to that host can occur.
    for (const source of Object.keys(data['legacy-routes'].legacyRoutes)) {
      let next = base + source;
      const chain = [];
      for (let hop = 0; hop < 6; hop++) {
        const response = await fetch(next, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(20000) });
        const location = response.headers.get('location');
        chain.push({ url: next, status: response.status, location });
        if (!location) break;
        next = new URL(location, next).href;
        if (oldDependencies(next).length || new URL(next).origin !== new URL(base).origin) break;
      }
      check(`served-redirect-autonomy-${source}`, chain.every(row => oldDependencies(row.location || '').length === 0) && chain.length < 6, JSON.stringify(chain));
    }
    report.requests = requests;
    await context.close();
  } catch (error) {
    report.limitations.push(`Browser/HTTP audit was not completed: ${error}`);
    check('browser-server-available', false, String(error));
  } finally { if (browser) await browser.close(); }
} else report.limitations.push('Static mode: no browser, server responses, redirects or network requests were inspected. Run again without --static against a production server.');

if (report.editorialChanges.length) report.limitations.push(`${report.editorialChanges.length} substantive text fields changed. Their before/after text is included for editorial review; semantic equivalence is not asserted by the script.`);
report.summary = { total: report.checks.length, passed: report.checks.filter(row => row.pass).length, failed: report.checks.filter(row => !row.pass).length, pages: report.pages.length, expectedPages: routes.length, localAssets: runtimeAssets.size, requests: report.requests.length, editorialChanges: report.editorialChanges.length };
mkdirSync('docs/refinement', { recursive: true });
const reportPath = `docs/refinement/${staticOnly ? 'autonomy-check-static' : 'autonomy-check'}.json`;
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report.summary, report: reportPath }));
for (const row of report.checks.filter(row => !row.pass)) console.error(`${row.id}: ${row.detail}`);
if (report.summary.failed) process.exitCode = 1;
