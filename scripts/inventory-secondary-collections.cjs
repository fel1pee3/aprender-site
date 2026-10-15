const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

function loadModule(relativePath) {
  const file = path.join(root, relativePath);
  const source = fs.readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  const customRequire = (request) => request === './collection-secondary-gallery' ? loadModule('src/data/collection-secondary-gallery.ts') : require(request);
  new Function('exports', 'require', compiled)(exports, customRequire);
  return exports;
}

const { secondaryCollectionDetails } = loadModule('src/data/collection-details-secondary.ts');
const catalog = 'https://www.opovo.com.br/_midias/pdf/2025/11/07/revista_aprender_editora_2025___20_anos-37805690.pdf';
const items = [];
function add(id, edition, category, content, destination, notes = '') {
  items.push({ id, sourcePage: edition.sourceUrl, sourceResource: edition.sourcePages?.length ? `${edition.sourceUrl}#page=${edition.sourcePages[0]}` : edition.sourceUrl, category, content, edition: edition.label, consultedAt: '2026-10-14', destination, status: edition.id === 'site-sem-data' ? 'disponível em versão histórica' : 'recuperado', notes });
}
for (const detail of Object.values(secondaryCollectionDetails)) {
  const destination = `/solucoes/${detail.slug}`;
  for (const edition of detail.editions) {
    const prefix = `${detail.slug}-${edition.id}`;
    add(`${prefix}-publico`, edition, 'público', edition.audience, `${destination}#edicoes`, edition.context || '');
    edition.foundation.forEach((paragraph, index) => add(`${prefix}-fundamentacao-${index + 1}`, edition, 'fundamentação', paragraph, `${destination}#edicoes`));
    if (edition.context) add(`${prefix}-contexto`, edition, 'contexto de edição', edition.context, `${destination}#edicoes`);
    edition.support.forEach((item, index) => add(`${prefix}-apoio-${index + 1}`, edition, 'formação e acompanhamento', item, `${destination}#edicoes`));
    for (const book of edition.books) {
      const bookDestination = `${destination}#${book.id}`;
      add(`${prefix}-${book.id}`, edition, 'livro ou material', `${book.title} — ${book.description}`, bookDestination, [book.audience, book.schoolYear, book.ageRange].filter(Boolean).join(' · '));
      book.components.forEach((component, index) => add(`${prefix}-${book.id}-componente-${index + 1}`, edition, 'componente ou conteúdo', component, bookDestination));
    }
  }
  detail.gallery.forEach((material, index) => {
    const edition = detail.editions.find(item => item.id === material.editionId);
    if (!edition) throw new Error(`Gallery edition missing: ${detail.slug}`);
    add(`${detail.slug}-galeria-${index + 1}`, { ...edition, sourceUrl: catalog }, 'imagem de material', material.caption, `${destination}#galeria`, `Imagem real extraída do catálogo fornecido: ${material.src}`);
    if (!fs.existsSync(path.join(root, 'public', material.src))) throw new Error(`Asset missing: ${material.src}`);
  });
}
fs.writeFileSync(path.join(root, 'docs/migration/collections-secondary.json'), JSON.stringify({ consultedAt: '2026-10-14', collectionCount: Object.keys(secondaryCollectionDetails).length, items }, null, 2) + '\n', 'utf8');
console.log(`${Object.keys(secondaryCollectionDetails).length} collections, ${items.length} independently sourced information/resource entries`);
