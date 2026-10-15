/** Record contact, platform and editorial-memory information with its actual provenance. */
import { writeFileSync } from 'node:fs';
import { loadData } from './migration-data.mjs';
const { editorial } = loadData();
const official = 'https://www.aprendereditora.com.br/';
const catalogue = editorial.catalogueUrl;
const contactSample = 'https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Lendo%20e%20escrevendo/Educacao%20Infantil%20-%20Verde%20-%20Vol%2002.pdf';
const items = [];
const add = (id, category, content, sourcePage, sourceResource, edition, destination, notes = '', status = 'preservado') => items.push({ id, category, content, sourcePage, sourceResource, edition, consultedAt: '2026-10-14', destination, status, notes });
add('contato-telefone', 'Canal institucional', editorial.contact.phone, official, official, 'Site sem data; catálogo 2025 p.64', '/contato', 'Número conferido no cabeçalho do HTML oficial e no catálogo. Não foi realizada ligação.');
add('contato-email', 'Canal institucional', editorial.contact.email, official + 'lendo-e-escrevendo', contactSample, 'Amostra histórica sem data editorial identificada', '/contato', 'E-mail conferido na página 1 digital da amostra Verde, volume II. A operação da caixa postal não foi testada por envio. O documento contém um endereço físico antigo, distinto do catálogo de 2025.', 'disponível em versão histórica');
for (const key of ['address', 'city', 'postalCode']) add(`contato-${key}`, 'Endereço institucional', editorial.contact[key], catalogue + '#page=64', catalogue + '#page=64', 'Catálogo 2025, p.64', '/contato', 'Endereço de Papicu preservado como declaração do catálogo de 2025. Não representa uma verificação presencial de ocupação.');
add('contato-oficial-formulario', 'Acesso externo', 'Formulário institucional da editora', official + 'fale-conosco', editorial.contact.contactUrl, 'Site sem data, acessado em 14/10/2026', '/contato', 'O formulário da proposta prepara um e-mail e informa que não houve envio; o formulário original permanece acessível.');
for (const [i, platform] of editorial.platforms.entries()) {
  const slug = i === 0 ? 'aprender-formar' : 'aprencer-avaliar';
  const id = i === 0 ? 'formar' : 'avaliar';
  add(`plataforma-${id}-apresentacao`, 'Plataforma digital', `${platform.name}: ${platform.description}`, official + slug, catalogue + '#page=62', 'Catálogo 2025 p.62; acesso no site sem data', '/plataformas');
  for (const [index, feature] of platform.features.entries()) add(`plataforma-${id}-funcao-${index + 1}`, 'Recurso de plataforma', feature, official + slug, catalogue + '#page=62', 'Catálogo 2025 p.62', '/plataformas', 'Funcionalidade descrita na fonte; não houve avaliação interna do sistema autenticado.');
  add(`plataforma-${id}-acesso`, 'Acesso externo', `${platform.name}: ${platform.url}`, official + slug, platform.url, 'Vínculo do site sem data', '/plataformas', 'Destino externo preservado; o redesign não replica os sistemas autenticados.');
}
for (const article of editorial.articles) {
  add(`memoria-${article.slug}-registro`, 'Registro editorial', `${article.title} — ${article.dateLabel}`, article.sourceUrl, article.sourceUrl, article.dateLabel, `/em-acao/${article.slug}`, 'Classificação e data preservadas; os registros históricos não receberam dia ou mês inventados.', 'disponível em versão histórica');
  for (const [index, paragraph] of article.paragraphs.entries()) add(`memoria-${article.slug}-texto-${index + 1}`, 'Informação de memória', paragraph, article.sourceUrl, article.sourceUrl, article.dateLabel, `/em-acao/${article.slug}`, 'Síntese editorial em redação própria das fontes identificadas.', 'disponível em versão histórica');
  const photoPage = Number(article.imageCaption.match(/p\.\s*(\d+)/)?.[1]) || article.sourcePages?.[0] || 61;
  add(`memoria-${article.slug}-fotografia`, 'Fotografia e legenda', article.imageCaption, article.sourceUrl, catalogue + '#page=' + photoPage, `Catálogo 2025; registro: ${article.dateLabel}`, `/em-acao/${article.slug}`, 'Fotografia real extraída do catálogo. A data do registro é diferente da data de republicação no catálogo.', 'disponível em versão histórica');
}
for (const photo of [
  { id: 'atividade', image: '/images/hero.webp', page: 60, caption: 'Atividade de formação · catálogo de 2025, p. 60.' },
  { id: 'estudo', image: '/images/formacao-professores.webp', page: 61, caption: 'Estudo dos materiais · catálogo de 2025, p. 61.' },
  { id: 'encontro', image: '/images/formacao-encontro.webp', page: 61, caption: 'Registro coletivo de formação · catálogo de 2025, p. 61.' },
]) {
  add(`memoria-fotografia-catalogo-${photo.id}`, 'Fotografia de formação no catálogo', photo.caption, catalogue + '#page=' + photo.page, catalogue + '#page=' + photo.page, 'Catálogo 2025; data do encontro não informada', '/acervo#registros-catalogo', 'Registro real do catálogo. A fotografia usada anteriormente na home permanece no acervo; não foi apresentada como encontro atual.', 'disponível em versão histórica');
  items.at(-1).image = photo.image;
}
writeFileSync('docs/migration/editorial.json', JSON.stringify({ checkedAt: '2026-10-14', items }, null, 2) + '\n');
console.log(`${items.length} editorial, contact and platform information entries.`);
