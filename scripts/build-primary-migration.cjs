// Converts the visually checked collection records into the migration inventory.
// Sources remain explicit for every book, component, methodology and image.
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const input = fs.readFileSync("src/data/collection-details-primary.ts", "utf8");
const compiled = ts.transpileModule(input, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const scope = { exports: {} };
vm.runInNewContext(compiled, scope);
const details = scope.exports.primaryCollectionDetails;
const manifest = JSON.parse(fs.readFileSync("docs/migration/official-manifest.json", "utf8"));
const checkedAt = "2026-10-14";
const items = [];

function sourceFor(detail, edition, book) {
  if (edition.id === "catalogo-2025") return `${edition.sourceUrl}#page=${edition.sourcePages[0]}`;
  const page = manifest.pages.find((page) => page.url === edition.sourceUrl);
  const images = page ? page.images.filter((image) => image.url.includes("/midia/kcfinder/")) : [];
  if (images.length === 0) return edition.sourceUrl;
  if (images.length === 1 || !book) return images[0].url;
  const id = book.id;
  let suffix;
  if (detail.slug === "brincando-e-aprendendo" && edition.id === "oficial-historico") suffix = ["05", "09", "13", "17"][Number(id.at(-1)) - 1];
  if (detail.slug === "lendo-e-escrevendo") suffix = id.endsWith("1") ? "05" : id.endsWith("2") ? "09" : "13";
  if (detail.slug === "novo-lendo-voce-fica-sabendo") suffix = id.endsWith("1") ? "05" : "09";
  if (detail.slug === "projeto-tema") suffix = ["05", "09", "13"][Number(id.at(-1)) - 1];
  if (detail.slug === "escrever-comunicar-e-ser") suffix = id.includes("professor") ? "13" : "01";
  if (detail.slug === "acerta-brasil") suffix = id.includes("matematica") ? "09" : id.endsWith("aluno") ? "01" : "05";
  return images.find((image) => suffix && image.url.endsWith(`_${suffix}.jpg`))?.url ?? images[0].url;
}

function add(detail, edition, id, category, content, sourceResource, notes = "") {
  const historical = edition.id === "oficial-historico";
  items.push({
    id: `${detail.slug}:${edition.id}:${id}`,
    sourcePage: edition.sourceUrl,
    sourceResource: sourceResource ?? sourceFor(detail, edition),
    category,
    content,
    edition: edition.label,
    consultedAt: checkedAt,
    destination: `/solucoes/${detail.slug}#${edition.id}`,
    status: historical ? "disponível em versão histórica" : "recuperado",
    notes,
  });
}

for (const detail of Object.values(details)) {
  for (const edition of detail.editions) {
    add(detail, edition, "publico", "público e escopo", edition.audience, undefined, edition.context ?? "");
    if (edition.context) add(detail, edition, "contexto", "edição e divergência", edition.context);
    edition.foundation.forEach((text, index) => add(detail, edition, `fundamento-${index + 1}`, "fundamentação e metodologia", text));
    edition.support.forEach((text, index) => add(detail, edition, `suporte-${index + 1}`, "formação e acompanhamento", text));
    for (const book of edition.books) {
      const source = sourceFor(detail, edition, book);
      add(detail, edition, book.id, "livro, recurso ou kit", `${book.title}. ${book.description}`, source, [book.audience, book.schoolYear, book.ageRange].filter(Boolean).join(" · "));
      book.components.forEach((component, index) => add(detail, edition, `${book.id}:componente-${index + 1}`, "componente de material", component, source));
      if (book.pages !== undefined) add(detail, edition, `${book.id}:paginas`, "extensão editorial", `${book.title}: ${book.pages} páginas`, source, "Número publicado na arte desta apresentação; não extrapolado para outras edições.");
      if (book.quantity !== undefined) add(detail, edition, `${book.id}:quantidade`, "quantidade", `${book.title}: ${book.quantity} unidades`, source, "Quantidade publicada na arte desta apresentação; não extrapolada para outras edições.");
    }
  }
  detail.gallery.forEach((image, index) => {
    const edition = detail.editions.find((edition) => edition.id === image.editionId);
    if (!fs.existsSync(`public${image.src}`)) throw new Error(`Missing ${image.src}`);
    add(detail, edition, `imagem-${index + 1}`, "imagem de material", image.alt, sourceFor(detail, edition), `${image.src} — ${image.caption} Recorte de recurso genuíno, sem geração de capa.`);
  });
}
fs.writeFileSync("docs/migration/collections-primary.json", JSON.stringify({ checkedAt, sourceMethod: "Conferência visual das apresentações oficiais e das páginas 14–15, 24–25, 28–30 e 50 do PDF institucional; preservação das variantes e das divergências editoriais.", details, items }, null, 2) + "\n", "utf8");
console.log(`${Object.keys(details).length} coleções; ${items.length} informações; ${Object.values(details).reduce((sum, detail) => sum + detail.gallery.length, 0)} imagens.`);
