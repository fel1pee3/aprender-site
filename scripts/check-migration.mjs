/** Source-inventory and served-HTML audit. Run after a production server is available. */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
import { inventories, itemDestination, loadData, normalize, officialDestinations, publicRoutes, readJson, resourceKey } from './migration-data.mjs';

const base = process.env.QA_BASE_URL || 'http://localhost:3100';
const staticOnly = process.argv.includes('--static');
const report = { checkedAt: new Date().toISOString(), base, mode: staticOnly ? 'static' : 'production-html', checks: [], pages: [], destinations: [], limitations: [] };
const check = (id, pass, detail = '') => { report.checks.push({ id, pass: Boolean(pass), detail }); };
const data = loadData();
const manifest = readJson('docs/migration/official-manifest.json');
const resourcesAudit = readJson('docs/migration/resources.json');
const pricesAudit = readJson('docs/migration/prices.json');
const resources = data.resources.documentResources || [];
const archive = data.archive;
const institution = data.institutional;
const solutions = data.solutions.solutions || [];
const details = data['collection-details'].collectionDetails || {};
const allItems = inventories().flatMap(group => group.items);
const sourceLinks = manifest.pages.flatMap(page => page.links || []);
check('independent-source-page-inventory', manifest.pages.length === 31 && manifest.pages.filter(page => page.status === 200).length === 30, 'Thirty official pages responded; /index is the additional legacy alias whose source returned a 303 loop.');
check('legacy-map-source-coverage', manifest.pages.every(page => page.path in officialDestinations && (page.path === '/' || page.path in data['legacy-routes'].legacyRoutes)), 'The independently crawled source paths must all have a specific preserved destination.');
const originalPdfs = new Set(sourceLinks.filter(link => /\.pdf(?:$|[?#])/i.test(link.url)).map(link => resourceKey(link.url)));
const preservedPdfs = new Set(resources.filter(row => row.kind !== 'catalog').map(row => resourceKey(row.url)));
check('source-pdf-set', originalPdfs.size === 28 && [...originalPdfs].every(url => preservedPdfs.has(url)) && preservedPdfs.size === 28, 'Independent crawl: 27 samples + PAIC; exact URL set compared after www/encoding normalization.');
const expectedCounts = { 'brincando-e-aprendendo': 4, 'lendo-e-escrevendo': 3, 'novo-lendo-voce-fica-sabendo': 2, 'escrever-comunicar-e-ser': 5, 'acerta-brasil': 2, 'projeto-tema': 3, 'vida-e-linguagem': 4, 'vida-e-matematica': 4 };
for (const [slug, count] of Object.entries(expectedCounts)) check(`samples-${slug}`, resources.filter(row => row.kind === 'sample' && row.collectionSlug === slug).length === count);
for (const row of resourcesAudit.items) check(`pdf-validation-${row.id}`, row.validation?.signature?.startsWith('%PDF-') && row.validation?.pageCount > 0 && row.validation?.sizeBytes > 0, 'Recorded binary signature and parser validation; this run does not redownload large PDFs.');
const binaryRecords = existsSync('.tools/samples/inspection.json') ? readJson('.tools/samples/inspection.json') : [];
if (!binaryRecords.length) report.limitations.push('Os PDFs brutos baixados estão ausentes nesta cópia. Esta execução confere apenas a evidência de assinatura e parser em resources.json; não compara os arquivos pelo SHA-256.');
for (const row of binaryRecords) {
  const filename = `.tools/samples/${row.id}.pdf`;
  const bytes = existsSync(filename) ? readFileSync(filename) : null;
  const hash = bytes ? createHash('sha256').update(bytes).digest('hex') : '';
  check(`pdf-local-binary-${row.id}`, bytes?.subarray(0, 5).toString() === '%PDF-' && bytes.length === row.sizeBytes && hash === row.sha256, `Local bytes, signature, size and SHA-256 compared with the downloaded source record; ${row.url}`);
}
check('resource-data-match-audit', JSON.stringify(resources) === JSON.stringify(resourcesAudit.resources), 'Presentation data matches reviewed resource inventory.');
check('price-data-match-audit', JSON.stringify(data.prices.priceRows) === JSON.stringify(pricesAudit.rows), 'Every row, integer-cent value, recipient, year and kit matches the visually reviewed transcription.');
check('price-source-row-sequence', pricesAudit.rows.length === 152 && pricesAudit.rows.every((row, i) => row.sourceRow === i + 1));
check('prices-no-floating-cents', pricesAudit.rows.every(row => Number.isInteger(row.priceCents) && row.priceCents > 0));
check('english-eight-variants', pricesAudit.rows.filter(row => row.collectionSlug === 'ingles').length === 8);
check('avancando-sixteen-variants', pricesAudit.rows.filter(row => row.collectionSlug === 'avancando-juntos').length === 16);
check('solutions-preserved-and-added', solutions.length >= 23 && ['lendo-e-escrevendo', 'acerta-brasil', 'ingles'].every(slug => solutions.some(row => row.slug === slug)));
check('all-collections-have-details', solutions.every(row => details[row.slug]?.editions?.length), solutions.filter(row => !details[row.slug]?.editions?.length).map(row => row.slug).join(', '));
check('mission-two-versions', institution.missionVersions.length === 2);
check('seven-values', institution.institutionalValues.length === 7 && ['Ética', 'Inovação', 'Qualidade', 'Integração', 'Humanização', 'Responsabilidade Social', 'Responsabilidade Profissional'].every(title => institution.institutionalValues.some(row => normalize(row.title) === normalize(title))));
check('formation-five-axes', institution.formationAxes.length === 5);
check('formation-sixteen-actions', institution.formationPlan.flatMap(group => group.items).length === 16);
check('formation-nine-photos-seven-municipalities', archive.formationGallery.length === 9 && new Set(archive.formationGallery.map(row => row.location)).size === 7);
const originalTestimonials = new Set(manifest.pages.find(row => row.path === '/').images.filter(row => /\/frase-\d+\.jpg$/.test(row.url)).map(row => row.url));
check('source-testimonial-set', originalTestimonials.size === 9 && archive.testimonials.length === 9 && archive.testimonials.every(row => originalTestimonials.has(row.sourceUrl)), 'The nine source images, not only application record counts, determine coverage.');
const originalVideos = new Set(manifest.pages.flatMap(page => page.media || []).map(row => row.url).filter(url => /comp-[123]\.mp4$/.test(url)));
check('source-video-set', originalVideos.size === 3 && archive.videos.length === 3 && archive.videos.every(row => originalVideos.has(row.originalSrc)));
check('source-social-links', archive.socialLinks.length === 4 && archive.socialLinks.every(row => sourceLinks.some(link => link.url === row.url)));
check('indicators-four-2025', institution.institutionalIndicators.filter(row => row.edition.startsWith('Catálogo 2025')).length === 4);
check('historical-indicators-retained', institution.institutionalIndicators.filter(row => row.id.endsWith('-site')).length === 4);
check('paic-discrepancy-retained', institution.paic.statistics.find(row => row.year === 2012)?.teachers === 5326 && institution.paic.catalogueStatistics.find(row => row.year === 2012)?.teachers === 5325);
check('inventory-identifiers-unique', new Set(allItems.map(row => row.id)).size === allItems.length);
check('collections-inventory-present', !inventories().find(group => group.name === 'collections')?.missing, 'Accepts the combined file or both independently authored collection inventory parts.');

const localAssets = new Set();
const walkAssets = value => {
  if (Array.isArray(value)) value.forEach(walkAssets);
  else if (value && typeof value === 'object') Object.values(value).forEach(walkAssets);
  else if (typeof value === 'string' && /^\/(images|media)\//.test(value)) localAssets.add(value);
};
walkAssets(data);
for (const asset of localAssets) check(`asset-${asset}`, existsSync(path.join('public', asset)) && statSync(path.join('public', asset)).size > 0);

if (!staticOnly) {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const routeResults = new Map();
  try {
    for (const route of publicRoutes(data)) {
      try {
        const response = await fetch(base + route, { signal: AbortSignal.timeout(45000) });
        const html = await response.text();
        const snapshot = await page.evaluate(html => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          doc.querySelectorAll('script, style, noscript').forEach(node => node.remove());
          const main = doc.querySelector('main') || doc.body;
          const walker = doc.createTreeWalker(main, NodeFilter.SHOW_TEXT); let node; const fragments = [];
          while ((node = walker.nextNode())) fragments.push(node.textContent);
          return {
            title: doc.title, text: fragments.join(' ').replace(/\s+/g, ' '),
            ids: [...doc.querySelectorAll('[id]')].map(node => node.id),
            sections: Object.fromEntries([...main.querySelectorAll('[id]')].map(node => [node.id, node.textContent.replace(/\s+/g, ' ').trim()])),
            links: [...doc.querySelectorAll('a[href]')].map(node => node.getAttribute('href')),
            images: [...doc.querySelectorAll('img')].map(node => ({ src: node.getAttribute('src'), alt: node.getAttribute('alt') })),
            metadata: Object.fromEntries([...doc.querySelectorAll('meta[property],meta[name]')].map(node => [node.getAttribute('property') || node.getAttribute('name'), node.getAttribute('content')])),
            canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),
            tableRowsInMain: main.querySelectorAll('tbody tr').length,
            // React can emit a completed Suspense boundary outside main as a streamed S:n fragment.
            // Its table is still real server-rendered HTML in this HTTP response, not JSON or client-created markup.
            tableRows: [...doc.querySelectorAll('tbody tr')].map(row => [...row.querySelectorAll('td,th')].map(cell => cell.textContent.replace(/\s+/g, ' ').trim())),
            sectionTables: Object.fromEntries(['atendimentos', 'atendimentos-catalogo', 'ideb', 'ranking-2017', 'ioeb'].map(id => [id, [...(doc.getElementById(id)?.querySelector('table')?.querySelectorAll('tbody tr') || [])].map(row => [...row.querySelectorAll('td,th')].map(cell => cell.textContent.replace(/\s+/g, ' ').trim()))])),
            videos: [...doc.querySelectorAll('video')].map(node => ({ controls: node.hasAttribute('controls'), autoplay: node.hasAttribute('autoplay'), preload: node.getAttribute('preload'), poster: node.getAttribute('poster'), sources: [...node.querySelectorAll('source')].map(source => source.getAttribute('src')) })),
          };
        }, html);
        snapshot.status = response.status;
        routeResults.set(route, snapshot);
        check(`route-${route}`, response.status === 200);
        const meta = snapshot.metadata;
        const expectedCanonical = new URL('https://aprender-site.vercel.app' + route).href;
        const canonical = snapshot.canonical ? new URL(snapshot.canonical).href : '';
        const ogUrl = meta['og:url'] ? new URL(meta['og:url']).href : '';
        check(`metadata-${route}`, canonical === expectedCanonical && ogUrl === canonical && /^https:\/\/aprender-site\.vercel\.app\//.test(meta['og:image']) && /^https:\/\/aprender-site\.vercel\.app\//.test(meta['twitter:image']) && /noindex/.test(meta.robots) && !Object.values(meta).some(value => /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(value)), JSON.stringify({ canonical: snapshot.canonical, og: meta['og:image'], twitter: meta['twitter:image'], robots: meta.robots }));
        check(`unique-ids-${route}`, new Set(snapshot.ids).size === snapshot.ids.length);
        report.pages.push({ route, status: response.status, title: snapshot.title, canonical: snapshot.canonical, openGraph: meta['og:image'], twitter: meta['twitter:image'], ids: snapshot.ids, links: snapshot.links });
      } catch (error) { check(`route-${route}`, false, String(error)); }
    }
    const textAt = (route, text, id) => check(id, routeResults.get(route)?.text && normalize(routeResults.get(route).text).includes(normalize(text)), String(text).slice(0, 160));
    const linkAt = (route, url, id) => check(id, routeResults.get(route)?.links.includes(url), url);
    const sectionTextAt = (route, section, text, id) => check(id, normalize(routeResults.get(route)?.sections[section]).includes(normalize(text)) && Boolean(routeResults.get(route)?.sections[section]), `${section}: ${String(text).slice(0, 140)}`);
    for (const row of institution.missionVersions) textAt('/a-editora', row.text, `rendered-mission-${row.id}`);
    for (const row of institution.institutionalValues) for (const key of ['title', 'description', 'historicalDescription']) textAt('/a-editora', row[key], `rendered-value-${row.id}-${key}`);
    for (const text of [institution.team.intro, ...institution.team.approach, ...institution.team.specializations]) textAt('/a-editora', text, `rendered-team-${normalize(text).slice(0, 35)}`);
    for (const row of institution.timeline) for (const [i, text] of row.paragraphs.entries()) textAt('/a-editora/trajetoria', text, `rendered-history-${row.id}-${i}`);
    for (const [i, text] of institution.edgar.paragraphs.entries()) textAt('/a-editora/edgar-linhares', text, `rendered-edgar-${i}`);
    for (const row of institution.formationAxes) textAt('/formacao', row.description, `rendered-formation-${row.id}`);
    for (const [i, text] of (institution.formationFoundation?.paragraphs || []).entries()) sectionTextAt('/formacao', 'fundamentacao-projeto', text, `rendered-formation-foundation-${i}`);
    for (const group of institution.formationPlan) for (const [i, text] of group.items.entries()) textAt('/formacao', text, `rendered-action-${group.id}-${i}`);
    for (const row of archive.testimonials) {
      for (const key of ['name', 'role', 'location', 'period']) textAt('/acervo', row[key], `rendered-testimonial-${row.id}-${key}`);
      for (const [i, text] of row.paragraphs.entries()) textAt('/acervo', text, `rendered-testimonial-${row.id}-${i}`);
      linkAt('/acervo', row.sourceUrl, `testimonial-original-${row.id}`);
    }
    for (const row of archive.formationGallery) textAt('/acervo', row.location, `rendered-photo-location-${row.id}`);
    for (const row of archive.formationGallery) {
      textAt('/acervo', row.caption, `rendered-photo-caption-${row.id}`);
      textAt('/acervo', row.date, `rendered-photo-period-${row.id}`);
    }
    for (const row of archive.videos) {
      textAt('/acervo', row.transcript, `rendered-video-description-${row.id}`);
      linkAt('/acervo', row.originalSrc, `video-original-${row.id}`);
      check(`video-control-${row.id}`, routeResults.get('/acervo')?.videos.some(video => video.sources.includes(row.src) && video.controls && !video.autoplay && video.preload === 'none' && video.poster === row.poster));
    }
    for (const row of archive.socialLinks) for (const route of ['/', '/contato']) linkAt(route, row.url, `rendered-social-${row.id}-${route}`);
    for (const item of inventories().find(group => group.name === 'editorial').items.filter(item => item.id.startsWith('memoria-fotografia-catalogo-'))) {
      sectionTextAt('/acervo', 'registros-catalogo', item.content, `rendered-${item.id}-caption`);
      check(`rendered-${item.id}-image`, routeResults.get('/acervo')?.images.some(image => {
        const url = new URL(image.src, base);
        return (url.searchParams.get('url') || url.pathname) === item.image && Boolean(image.alt);
      }), item.image);
    }
    for (const [key, value] of Object.entries(data.editorial.contact)) if (['email', 'phone', 'address', 'city', 'postalCode'].includes(key)) textAt('/contato', value, `rendered-contact-${key}`);
    linkAt('/contato', data.editorial.contact.phoneHref, 'rendered-contact-telephone-link');
    linkAt('/contato', `mailto:${data.editorial.contact.email}`, 'rendered-contact-email-link');
    for (const row of data.editorial.platforms) {
      for (const [i, text] of [row.description, ...row.features].entries()) textAt('/plataformas', text, `rendered-platform-${normalize(row.name)}-${i}`);
      linkAt('/plataformas', row.url, `rendered-platform-access-${normalize(row.name)}`);
    }
    for (const [i, text] of institution.paic.paragraphs.entries()) textAt('/a-editora/paic', text, `rendered-paic-paragraph-${i}`);
    for (const [i, text] of institution.paic.notes.entries()) textAt('/a-editora/paic', text, `rendered-paic-note-${i}`);
    for (const [i, text] of institution.paic.historicalHighlights.entries()) textAt('/a-editora/paic', text, `rendered-paic-historical-highlight-${i}`);
    if (institution.paic.ioebContext) sectionTextAt('/a-editora/paic', 'ioeb', institution.paic.ioebContext, 'rendered-ioeb-context-authorship');
    for (const row of institution.institutionalIndicators.filter(row => row.edition.startsWith('Catálogo 2025'))) {
      textAt('/', row.value, `rendered-home-indicator-${row.id}-value`);
      textAt('/', row.label, `rendered-home-indicator-${row.id}-label`);
    }
    const number = value => value.toLocaleString('pt-BR');
    const decimal = value => value.toLocaleString('pt-BR', { minimumFractionDigits: 1 });
    for (const [section, rows, values] of [
      ['atendimentos', institution.paic.statistics, row => [String(row.year), number(row.municipalities), number(row.students), number(row.teachers)]],
      ['atendimentos-catalogo', institution.paic.catalogueStatistics, row => [String(row.year), number(row.municipalities), number(row.students), number(row.teachers)]],
      ['ideb', institution.paic.ideb, row => [String(row.year), decimal(row.earlyYears), decimal(row.finalYears)]],
      ['ranking-2017', institution.paic.ranking2017, row => [`${row.position}ª`, row.municipality, decimal(row.value)]],
      ['ioeb', institution.paic.ioeb2019, row => [row.municipality, decimal(row.value)]],
    ]) {
      const actualRows = routeResults.get('/a-editora/paic')?.sectionTables[section] || [];
      check(`rendered-paic-table-${section}-count`, actualRows.length === rows.length);
      for (const [i, row] of rows.entries()) check(`rendered-paic-table-${section}-${i}`, JSON.stringify(actualRows[i]) === JSON.stringify(values(row)), `${JSON.stringify(values(row))}; actual: ${JSON.stringify(actualRows[i])}`);
    }
    for (const row of resources) {
      const route = row.collectionSlug ? `/solucoes/${row.collectionSlug}` : '/recursos';
      linkAt(route, row.url, `rendered-resource-${row.id}`);
      textAt(route, row.title, `resource-label-${row.id}`);
    }
    for (const detail of Object.values(details)) {
      const route = '/solucoes/' + detail.slug;
      for (const [i, text] of detail.intro.entries()) textAt(route, text, `collection-intro-${detail.slug}-${i}`);
      for (const edition of detail.editions) {
        sectionTextAt(route, edition.id, edition.audience, `edition-audience-${detail.slug}-${edition.id}`);
        if (edition.context) sectionTextAt(route, edition.id, edition.context, `edition-context-${detail.slug}-${edition.id}`);
        for (const [i, text] of edition.foundation.entries()) textAt(route, text, `foundation-${edition.id}-${i}`);
        for (const [i, text] of edition.support.entries()) textAt(route, text, `support-${edition.id}-${i}`);
        for (const book of edition.books) {
          const fields = [book.title, book.description, book.audience, book.schoolYear, book.ageRange, book.pages ? `${book.pages} páginas.` : '', book.quantity ? `${book.quantity} unidades.` : '', ...book.components].filter(Boolean);
          for (const [i, text] of fields.entries()) sectionTextAt(route, book.id, text, `book-${detail.slug}-${edition.id}-${book.id}-${i}`);
        }
      }
    }
    let table = routeResults.get('/recursos/tabela-precos')?.tableRows || [];
    const pricePage = report.pages.find(row => row.route === '/recursos/tabela-precos');
    pricePage.tableRowsInitiallyServed = table.length;
    pricePage.tableRowsInitiallyInMain = routeResults.get('/recursos/tabela-precos')?.tableRowsInMain || 0;
    pricePage.tableRenderMode = pricePage.tableRowsInitiallyInMain === table.length ? 'initial-server-html' : 'server-streamed-html';
    pricePage.tableRows = table.length;
    check('served-price-row-count', table.length === 152, `HTTP response contains ${table.length} semantic HTML rows, checked without executing JavaScript. Main rows: ${pricePage.tableRowsInitiallyInMain}; mode: ${pricePage.tableRenderMode}.`);
    if (!table.length) {
      await page.goto(base + '/recursos/tabela-precos', { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.querySelectorAll('main tbody tr').length === 152, undefined, { timeout: 15000 });
      table = await page.locator('main tbody tr').evaluateAll(rows => rows.map(row => [...row.querySelectorAll('td,th')].map(cell => cell.textContent.replace(/\s+/g, ' ').trim())));
      report.limitations.push('A tabela interativa de preços é renderizada em HTML semântico após a hidratação do JavaScript (useSearchParams/Suspense). As 152 linhas e seus valores foram conferidos no DOM do navegador; estão ausentes do elemento main estático da resposta HTML inicial.');
      pricePage.tableRenderMode = 'hydrated-browser-dom';
      pricePage.tableRows = table.length;
    }
    check('rendered-price-row-count', table.length === 152, `Rendered rows: ${table.length}`);
    for (const [i, row] of pricesAudit.rows.entries()) {
      const cells = table[i] || [];
      const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.priceCents / 100);
      check(`rendered-${row.id}`, cells.length === 5 && normalize(cells[0]).includes(normalize(row.material)) && [row.audience, row.schoolYear, row.kit, currency].every((value, j) => normalize(value) === normalize(cells[j + 1])), `Source row ${row.sourceRow}`);
    }
    for (const item of allItems) {
      const destination = itemDestination(item);
      const [route, anchor] = (destination || '').split('#');
      const found = routeResults.get(route || '/');
      const pass = Boolean(found?.status === 200 && (!anchor || found.ids.includes(anchor)));
      report.destinations.push({ id: item.id, destination, pass });
      check(`destination-${item.id}`, pass, destination);
    }
    for (const [route, snapshot] of routeResults) for (const href of new Set(snapshot.links.filter(href => href?.startsWith('/') || href?.startsWith('#')))) {
      const url = new URL(href, base + route);
      if (/\.[a-z0-9]+$/i.test(url.pathname)) continue;
      const target = routeResults.get(url.pathname);
      const pass = Boolean(target?.status === 200 && (!url.hash || target.ids.includes(decodeURIComponent(url.hash.slice(1)))));
      check(`internal-link-${route}-${href}`, pass, href);
    }
    for (const [source, destination] of Object.entries(officialDestinations)) {
      if (source === '/' || source === '/educacao-financeira') { /* still checked below */ }
      const response = await fetch(base + source, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
      const target = response.headers.get('location') || '';
      const expected = new URL(destination, base);
      const actual = new URL(target, base);
      check(`legacy-route-${source}`, source === '/' ? response.status === 200 : [301, 302, 307, 308].includes(response.status) && actual.origin === expected.origin && actual.pathname === expected.pathname, `${response.status} ${target}`);
    }
    const robots = await (await fetch(base + '/robots.txt')).text();
    check('robots-noindex-policy', /Disallow:\s*\//i.test(robots));
    const sitemapResponse = await fetch(base + '/sitemap.xml');
    const sitemap = await sitemapResponse.text();
    check('sitemap-public-origin', sitemapResponse.status === 200 && !/localhost|127\.0\.0\.1/.test(sitemap) && publicRoutes(data).every(route => sitemap.includes(`<loc>https://aprender-site.vercel.app${route}</loc>`)));
  } finally { await browser.close(); }
}
report.summary = { total: report.checks.length, passed: report.checks.filter(row => row.pass).length, failed: report.checks.filter(row => !row.pass).length, assets: localAssets.size, pages: report.pages.length, sourcePages: manifest.pages.length };
mkdirSync('docs/migration', { recursive: true });
writeFileSync(`docs/migration/check-${staticOnly ? 'static' : 'production'}.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report.summary));
for (const row of report.checks.filter(row => !row.pass)) console.error(`${row.id}: ${row.detail}`);
if (report.summary.failed) process.exitCode = 1;
