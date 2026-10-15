/** Regenerate the item-level migration inventory from the verified presentation data. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const temp = path.join(root, '.tools/institutional/compiled');
fs.mkdirSync(temp, { recursive: true });
for (const name of ['editorial', 'institutional', 'archive']) {
  const source = fs.readFileSync(path.join(root, 'src/data', name + '.ts'), 'utf8');
  const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  fs.writeFileSync(path.join(temp, name + '.js'), result.outputText);
}
const data = require(path.join(temp, 'institutional.js'));
const archive = require(path.join(temp, 'archive.js'));
const catalogue = require(path.join(temp, 'editorial.js')).catalogueUrl;
const official = 'https://www.aprendereditora.com.br/';
const checkedAt = '2026-10-14';
const historical = 'disponível em versão histórica';
const institution = [];
const resources = [];
function add(target, id, category, content, sourceUrl, edition, destination, notes = '', status = 'recuperado', extra = {}) {
  target.push({ id, category, content, sourceUrl, edition, checkedAt, destination, status, notes, ...extra });
}

for (const value of data.missionVersions) add(institution, value.id, 'missão', value.text, value.sourceUrl, value.edition, '/a-editora#missao', value.note, value.id.endsWith('site') ? historical : 'recuperado');
for (const value of data.institutionalValues) {
  add(institution, `valor-2025-${value.id}`, 'valor institucional', value.description, catalogue, value.edition, '/a-editora#valores', 'Redação completa do catálogo fornecido.');
  add(institution, `valor-site-${value.id}`, 'versão de valor institucional', value.historicalDescription, value.historicalSourceUrl, 'Site sem data', '/a-editora#valores', 'Diferenças da apresentação do site preservadas em contexto de versões.', historical);
}
add(institution, 'equipe-apresentacao', 'equipe', data.team.intro, data.team.sourceUrl, 'Site sem data; catálogo 2025', '/a-editora#equipe');
for (const [index, text] of data.team.approach.entries()) add(institution, `equipe-integracao-${index + 1}`, 'metodologia institucional', text, catalogue, 'Catálogo 2025, páginas 1 e 10', '/a-editora#equipe');
for (const row of data.timeline) add(institution, row.id, 'trajetória', `${row.title}: ${row.paragraphs.join(' ')}`, row.sourceUrl, row.period, '/a-editora/trajetoria', 'Ações anteriores a 2005 distinguidas da atuação da editora.');
for (const [index, text] of data.edgar.paragraphs.entries()) add(institution, `edgar-biografia-${index + 1}`, 'biografia', text, data.edgar.references[index === 0 ? 0 : index === 4 ? 2 : 1].url, index === 0 ? 'Site sem data' : index === 4 ? '2019' : '2018', '/a-editora/edgar-linhares');
for (const [index, ref] of data.edgar.references.entries()) add(institution, `edgar-referencia-${index + 1}`, 'referência documental', ref.title, ref.url, ref.title.includes('2005') ? '2005' : 'Conforme a referência', '/a-editora/edgar-linhares');
for (const item of data.formationAxes) add(institution, `formacao-eixo-${item.id}`, 'eixo de formação', `${item.title}: ${item.description}`, item.sourceUrl, 'Site sem data', '/formacao#eixos');
for (const [index, text] of data.formationFoundation.paragraphs.entries()) add(institution, `formacao-fundamentacao-${index + 1}`, 'fundamentação do projeto de formação', text, data.formationFoundation.sourceUrl, data.formationFoundation.edition, '/formacao#fundamentacao-projeto');
for (const group of data.formationPlan) for (const [index, item] of group.items.entries()) add(institution, `formacao-plano-${group.id}-${index + 1}`, 'ação de formação', `${group.title}: ${item}`, group.sourceUrl, 'Site sem data', '/formacao#plano-de-acao');
for (const row of data.paic.statistics) add(institution, `paic-atendimento-site-${row.year}`, 'série de atendimentos', `${row.municipalities} municípios; ${row.students} estudantes; ${row.teachers} educadores`, official + 'paic', String(row.year), '/a-editora/paic#atendimentos', row.year === 2012 ? 'Site: 5.326 educadores; catálogo 2025: 5.325. Divergência preservada.' : row.year >= 2014 ? 'Aquisição municipal com recursos próprios segundo a fonte.' : 'Atendimento declarado pela editora; não total estadual.', historical, { values: row });
for (const row of data.paic.catalogueStatistics) add(institution, `paic-atendimento-catalogo-${row.year}`, 'série de atendimentos', `${row.municipalities} municípios; ${row.students} estudantes; ${row.teachers} educadores`, catalogue, `Catálogo 2025, página 7; ano ${row.year}`, '/a-editora/paic#atendimentos', row.year === 2012 ? 'Catálogo: 5.325 educadores; site: 5.326. Sem resolução arbitrária.' : '', historical, { values: row });
for (let year = 2007; year <= 2018; year++) add(institution, `paic-mapa-${year}`, 'mapa de proficiência', `Mapa estadual SPAECE-Alfa ${year}`, official + 'paic', String(year), '/a-editora/paic#mapas', 'Mapa preservado em figura histórica; legenda e alternativa textual. Sem inferência municipal de valores ilegíveis.', historical, { image: '/images/archive/mapas-paic-2007-2018.webp' });
for (const figure of data.paic.figures) add(institution, `figura-${figure.id}`, 'figura institucional', figure.caption, figure.sourceUrl, 'Conforme legenda', figure.id === 'ioeb-original-2019' ? '/a-editora/paic#ioeb' : '/a-editora/paic#mapas', figure.alt, historical, { image: figure.image });
for (const row of data.paic.ideb) add(institution, `ideb-ceara-${row.year}`, 'indicador estadual', `Anos iniciais ${row.earlyYears}; anos finais ${row.finalYears}`, catalogue, `Catálogo 2025, página 9; ano ${row.year}`, '/a-editora/paic#indicadores', 'Resultado do Ceará, não índice da editora. Série inicial até 2017 também publicada no site.', historical, { values: row });
for (const row of data.paic.ranking2017) add(institution, `ranking-ideb-2017-${row.position}`, 'ranking histórico', `${row.position}º ${row.municipality}: ${row.value}`, official + 'paic', '2017', '/a-editora/paic#indicadores', 'Classificação publicada no acervo da editora; não ranking atual.', historical);
for (const [index, row] of data.paic.ioeb2019.entries()) add(institution, `ioeb-2019-${index + 1}`, 'indicador municipal histórico', `${row.municipality}: ${row.value}`, official + 'paic', '2019', '/a-editora/paic#ioeb', 'Transcrito visualmente do quadro original.', historical);
if (data.paic.ioebContext) add(institution, 'ioeb-contexto-autoria', 'autoria e escopo de indicador', data.paic.ioebContext, official + 'paic', 'Quadro histórico IOEB 2019', '/a-editora/paic#ioeb', 'Autoria do índice preservada; não confunde oportunidade educacional com impacto exclusivo de uma editora.', historical);
for (const [index, text] of data.paic.historicalHighlights.entries()) add(institution, `paic-contexto-historico-${index + 1}`, 'contexto histórico de indicadores', text, index === 3 ? official + 'v2/midia/banner/banner-top2.jpg' : official + 'paic', index === 0 || index === 1 ? '2017' : index === 2 ? '2019' : '2007 e 2018', index === 2 ? '/a-editora/paic#ioeb' : index === 3 ? '/a-editora/paic#mapas' : '/a-editora/paic#indicadores', '', historical);
for (const [index, text] of data.paic.notes.entries()) add(institution, `paic-nota-${index + 1}`, 'nota de leitura e divergência', text, index === 3 || index === 4 ? catalogue : official + 'paic', 'Períodos indicados no texto', '/a-editora/paic');
for (const row of data.institutionalIndicators) add(institution, `indicador-${row.id}`, 'indicador institucional', `${row.value} ${row.label}`, row.sourceUrl, row.edition, '/a-editora/trajetoria#indicadores', 'Declaração da editora; definições e períodos não intercambiáveis.', row.id.endsWith('site') ? historical : 'recuperado');

for (const row of archive.testimonials) {
  add(resources, `depoimento-${row.id}`, 'depoimento', `${row.name}; ${row.role}; ${row.location}. ${row.paragraphs.join(' ')}`, row.sourceUrl, row.period, `/acervo#${row.id}`, 'Síntese própria sem aspas, com link para o texto integral original. Cargo preservado como histórico.', historical, { image: row.image });
}
for (const row of archive.formationGallery) add(resources, `fotografia-${row.id}`, 'fotografia de formação', `${row.caption} — ${row.location}`, row.sourceUrl, row.date, `/acervo#formacoes`, 'Recorte de fotografia do conjunto oficial; nenhuma data atribuída por inferência.', historical, { image: row.image });
for (const row of archive.videos) {
  add(resources, row.id, 'vídeo', row.title, row.sourceUrl, 'Sem data editorial; recurso acessado em 2026-10-14', `/acervo#${row.id}`, row.notes, historical, { originalSrc: row.originalSrc, local: row.src, poster: row.poster, durationSeconds: row.durationSeconds, originalSizeBytes: row.originalSizeBytes, sizeBytes: row.sizeBytes, codec: 'H.264 / yuv420p', resolution: '960×540', audioStreams: 0 });
  add(resources, `${row.id}-alternativa`, 'alternativa textual de vídeo', row.transcript, row.originalSrc, 'Descrição produzida em 2026-10-14', `/acervo#${row.id}`, 'Quadros conferidos em intervalos de um segundo; ausência de áudio confirmada por metadados. Texto visual fiel; não é transcrição de fala.', 'recuperado', { descriptionTrack: row.descriptionTrack });
  const visualText = row.transcript.replaceAll('“', '').replaceAll('”', '');
  fs.writeFileSync(path.join(root, 'public', row.descriptionTrack), `WEBVTT\n\n00:00:00.000 --> 00:00:08.040\n${visualText}\n`);
}
for (const row of archive.socialLinks) add(resources, `canal-${row.id}`, 'canal externo', row.name, official, 'Vínculo na página consultada em 2026-10-14', 'Rodapé e /contato', `${row.status}. ${row.note}`, 'preservado', { url: row.url, httpStatus: 200 });

fs.mkdirSync(path.join(root, 'docs/migration'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs/migration/institutional.json'), JSON.stringify(institution, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'docs/migration/archive.json'), JSON.stringify(resources, null, 2) + '\n');
const ids = [...institution, ...resources].map((row) => row.id);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate migration identifiers.');
for (const item of [...archive.formationGallery, ...archive.testimonials]) if (!fs.existsSync(path.join(root, 'public', item.image))) throw new Error('Missing image: ' + item.image);
for (const item of archive.videos) for (const asset of [item.src, item.poster, item.descriptionTrack]) if (!fs.existsSync(path.join(root, 'public', asset))) throw new Error('Missing video asset: ' + asset);
console.log(`${institution.length} institutional entries; ${resources.length} archive entries. All referenced local archive assets exist.`);
