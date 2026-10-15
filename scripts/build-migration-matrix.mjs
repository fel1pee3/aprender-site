/** Build the human-readable item ledger and the independent official-resource ledger. */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { inventories, itemDestination, loadData, officialDestinations, readJson, resourceKey } from './migration-data.mjs';

const data = loadData();
const groups = inventories();
const manifest = readJson('docs/migration/official-manifest.json');
const production = existsSync('docs/migration/check-production.json') ? readJson('docs/migration/check-production.json') : null;
const checks = new Map((production?.checks || []).map(row => [row.id, row]));
const destinations = new Map((production?.destinations || []).map(row => [row.id, row]));
const escaped = value => String(value ?? 'Não informado').replaceAll('|', '\\|').replace(/\r?\n/g, '<br>');
const external = (label, url) => url ? `[${escaped(label)}](${url.replaceAll(' ', '%20')})` : escaped(label);
const sourceOf = item => item.sourceResource || item.originalSrc || item.sourceUrl || item.source || '';
const pageOf = item => {
  if (item.sourcePage) return item.sourcePage;
  if (item.originalSrc && item.sourceUrl) return item.sourceUrl;
  const source = sourceOf(item);
  const origin = sourceRows.get(sourceKey(source));
  return origin?.pages[0] ? 'https://www.aprendereditora.com.br' + origin.pages[0] : source;
};
const items = groups.flatMap(group => group.items.map(item => ({ ...item, inventory: group.name })));
const allLinks = new Set((production?.pages || []).flatMap(page => page.links || []));
const sourceKey = url => { try { return resourceKey(url); } catch { return String(url); } };
const sourceRows = new Map();
for (const page of manifest.pages) {
  for (const entry of [...(page.images || []).map(row => ({ ...row, category: 'Imagem-fonte' })), ...(page.media || []).map(row => ({ ...row, category: 'Vídeo' })), ...(page.links || []).filter(row => /\.pdf(?:$|[?#])/i.test(row.url)).map(row => ({ ...row, category: 'PDF' }))]) {
    const key = sourceKey(entry.url);
    if (!sourceRows.has(key)) sourceRows.set(key, { ...entry, pages: [] });
    if (!sourceRows.get(key).pages.includes(page.path)) sourceRows.get(key).pages.push(page.path);
  }
}
const images = new Map((manifest.images || []).map(row => [sourceKey(row.url), row]));
const unavailableBanners = existsSync('docs/migration/unavailable-banners.json') ? readJson('docs/migration/unavailable-banners.json') : null;
const unavailableBannerKeys = new Set((unavailableBanners?.results || []).filter(row => row.status === 200 && /text\/html/i.test(row.contentType || '') && row.jpegSignature === false).map(row => sourceKey(row.url)));
const counts = Object.fromEntries(groups.map(group => [group.name, group.items.length]));
const priceData = new Map((data.prices.priceRows || []).map(row => [row.id, row]));
const contentOf = item => {
  const price = priceData.get(item.id);
  if (!price) return item.content;
  const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price.priceCents / 100);
  return `${price.material}; destinatário: ${price.audience}; ano/público: ${price.schoolYear}; apresentação: ${price.kit}; preço de capa: ${currency}; linha ${price.sourceRow}`;
};
const statusCounts = {};
for (const item of items) {
  const destination = destinations.get(item.id);
  const status = destination && !destination.pass ? 'pendente' : item.status || 'pendente';
  statusCounts[status] = (statusCounts[status] || 0) + 1;
}
const lines = [
  '# Matriz de migração de conteúdo — Aprender Editora', '',
  'Consulta das fontes: **14/10/2026**. Esta documentação é interna à proposta independente de redesign.', '',
  'A unidade desta matriz é cada informação ou recurso. O inventário do oficial foi coletado antes da conferência do HTML do redesign; seus caminhos, PDFs, imagens e vídeos constituem uma referência independente dos registros da aplicação. O catálogo de 2025 e a imagem de preços identificada como 2027 permanecem como fontes de escopos distintos.', '',
  `**Registros por inventário:** ${Object.entries(counts).map(([name, count]) => `${name}: ${count}`).join('; ')}. **Total:** ${items.length}.`, '',
  `**Situações registradas:** ${Object.entries(statusCounts).map(([name, count]) => `${name}: ${count}`).join('; ')}.`, '',
  production ? `**Conferência em produção local:** ${production.checkedAt}; ${production.summary.passed}/${production.summary.total} verificações passaram, ${production.summary.failed} falharam, em ${production.summary.pages} páginas. Resultado completo: [check-production.json](migration/check-production.json).` : '**Conferência em produção local:** ainda não executada. Os destinos abaixo são propostos; a matriz não declara conclusão de navegação, renderização ou metadados.', '',
  ...(production?.pages?.find(page => page.route === '/recursos/tabela-precos')?.tableRenderMode === 'server-streamed-html' ? ['**Tabela de preços:** as 152 linhas foram conferidas como HTML semântico na própria resposta HTTP, sem executar JavaScript. O React entrega esse conteúdo por um fragmento de streaming da seção Suspense; seus scripts de apresentação o inserem no elemento principal durante o carregamento.', ''] : []),
  ...(production?.pages?.find(page => page.route === '/recursos/tabela-precos')?.tableRenderMode === 'initial-server-html' ? ['**Tabela de preços:** as 152 linhas e seus valores estão diretamente dentro do elemento main na resposta HTML inicial. A conferência desse conteúdo não executou JavaScript nem precisou reconstruir um fragmento de streaming.', ''] : []),
  'Os testes de renderização confirmam que as informações estruturadas chegam ao HTML, inclusive conteúdo em expansões. Essa conferência complementa a leitura visual das fontes; ela não deduz fidelidade editorial apenas pela contagem de objetos ou pelas páginas responderem HTTP 200. Os relatos em redação própria preservam acesso às imagens dos depoimentos originais integrais. Imagens históricas não foram substituídas por imagens geradas.', '',
  ...(production?.limitations?.length ? ['**Modo de renderização e limites desta execução:**', '', ...production.limitations.map(note => `- ${escaped(note)}`), ''] : []),
  '## Caminhos do inventário oficial', '',
  '| Origem | Resposta na fonte | Destino do conteúdo | Imagens na página | PDFs | Vídeos | Verificação do legado |',
  '| --- | --- | --- | ---: | ---: | ---: | --- |',
];
for (const page of manifest.pages) {
  const routeCheck = checks.get(`legacy-route-${page.path}`);
  const legacy = routeCheck ? routeCheck.pass ? 'Conferido' : `Pendente: ${routeCheck.detail}` : 'Aguardando HTML';
  const pdfCount = new Set((page.links || []).filter(row => /\.pdf(?:$|[?#])/i.test(row.url)).map(row => sourceKey(row.url))).size;
  lines.push(`| ${external(page.path, page.url)} | ${escaped(page.status || page.error)} | ${escaped(officialDestinations[page.path])} | ${(page.images || []).length} | ${pdfCount} | ${(page.media || []).length} | ${escaped(legacy)} |`);
}
lines.push('', '## Informações e recursos identificados', '', 'Cada linha mantém seu identificador, origem, versão e destino. “Pendente” significa que a conferência do destino falhou ou que o inventário registrou uma ausência; “não executada” não é aprovação automática. Os textos originais em imagens e os PDFs continuam acessíveis pelas fontes indicadas.', '');
for (const group of groups) {
  lines.push(`### ${group.name}`, '');
  if (group.missing) lines.push('**Inventário incompleto:** uma parte deste grupo ainda não foi produzida.', '');
  lines.push('| ID | Categoria e informação | Página e recurso de origem | Edição/período · consulta | Destino | Situação | Conferência | Observações |', '| --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const item of group.items) {
    const destination = itemDestination(item);
    const verification = destinations.get(item.id);
    const effectiveStatus = verification && !verification.pass ? 'pendente' : item.status || 'pendente';
    const page = pageOf(item); const source = sourceOf(item);
    const sources = page === source ? external('Fonte', source) : `${external('Página', page)}<br>${external('Recurso', source)}`;
    const period = `${item.edition || item.period || 'Edição não informada'} · ${item.consultedAt || item.checkedAt || '14/10/2026'}`;
    const checked = verification ? verification.pass ? 'HTML e âncora conferidos' : 'Destino pendente' : 'Não executada';
    const note = [item.notes, item.destination !== destination ? `Destino refinado de ${item.destination} para a seção que contém o recurso.` : '', item.validation ? `Arquivo: ${item.validation.signature || ''}; ${item.validation.pageCount || '?'} páginas; ${item.validation.sizeBytes || '?'} bytes; ${item.validation.parse || ''}.` : ''].filter(Boolean).join(' ');
    lines.push(`| ${escaped(item.id)} | ${escaped(item.category)}: ${escaped(contentOf(item))} | ${sources} | ${escaped(period)} | ${escaped(destination)} | ${escaped(effectiveStatus)} | ${checked} | ${escaped(note)} |`);
  }
  lines.push('');
}
lines.push('## Recursos extraídos diretamente das páginas oficiais', '', 'Este segundo registro lista os URLs efetivamente presentes no inventário, inclusive imagens com texto, recursos de navegação e elementos indisponíveis. A presença de um recurso de origem nesta lista não significa que toda informação de sua imagem foi automaticamente reconhecida. A migração textual foi conferida visualmente nos inventários institucionais e de coleções. Elementos decorativos de navegação podem ter apresentação equivalente no redesign.', '', '| Recurso | Categoria | Páginas de origem | Situação da fonte | IDs com origem explícita | Acesso direto no HTML |', '| --- | --- | --- | --- | --- | --- |');
for (const [key, row] of sourceRows) {
  const asset = images.get(key);
  const matching = items.filter(item => [item.sourceUrl, item.sourceResource, item.originalSrc, item.url].filter(Boolean).some(url => sourceKey(url) === key)).map(item => item.id);
  const available = unavailableBannerKeys.has(key) ? 'HTTP 200 nos dois domínios oficiais, mas Content-Type text/html e nenhuma assinatura JPEG; conteúdo gráfico indisponível' : asset ? asset.status === 200 ? `HTTP 200 · ${asset.width}×${asset.height} · ${asset.sizeBytes} bytes` : asset.error || `HTTP ${asset.status}` : row.category === 'PDF' ? 'Assinatura PDF e parser registrados no inventário de recursos' : row.category === 'Vídeo' ? 'Aberto e inspecionado; vinheta sem áudio' : 'Conforme inventário';
  const linked = production ? [...allLinks].some(url => /^https?:/.test(url) && sourceKey(url) === key) ? 'Sim' : 'Via página de fonte ou informação transposta' : 'Ainda não verificado';
  lines.push(`| ${external(row.url.split('/').at(-1), row.url)} | ${row.category} | ${escaped(row.pages.join(', '))} | ${escaped(available)} | ${escaped(matching.join(', ') || 'Consultar itens da página de origem')} | ${linked} |`);
}
lines.push('', '## Divergências, disponibilidade e limites', '',
  '- Avançando Juntos: o catálogo de 2025 descreve o 9º ano; a tabela de 2027 amplia os materiais para o 6º ao 9º ano. Nenhuma versão foi apagada para aparentar uma oferta única.',
  '- Inglês: My Learning Companion e My Teaching Companion, do 6º ao 9º ano, provêm da tabela de 2027. Não foram inventadas capas, sinopses, amostras ou fundamentos que a fonte não oferece.',
  '- PAIC: o site informa 5.326 educadores em 2012; o catálogo informa 5.325. Ambas as séries são mantidas e explicadas. Resultados estaduais, rankings de 2017 e IOEB de 2019 são históricos e coletivos.',
  '- Vídeos: os três arquivos de origem são vinhetas de aproximadamente oito segundos sem áudio. Não contêm as entrevistas ou formações sugeridas pelos títulos das páginas. As cópias locais mantêm seu conteúdo e oferecem descrição visual.',
  '- Depoimentos e formações: a fonte não fornece datas de publicação para os nove relatos ou para as nove fotografias. Menções a períodos dentro dos depoimentos não foram convertidas em datas editoriais.',
  '- Catálogo: o arquivo de 70.269.887 bytes foi validado no documento fornecido; o URL público foi conferido por resposta parcial, assinatura e tamanho. A leitura completa depende da abertura voluntária do link.',
  unavailableBannerKeys.size ? '- Os dois banners laterais antigos do contato (`bnnr-lat_03.jpg` e `bnnr-lat_05.jpg`) foram reconferidos nos domínios oficiais com e sem www. Os quatro acessos retornaram HTTP 200, com Content-Type text/html e sem assinatura JPEG: a resposta bem-sucedida não contém a imagem esperada. Evidência: [unavailable-banners.json](migration/unavailable-banners.json). São recursos distintos dos três vídeos verificados; seu conteúdo gráfico indisponível não foi inventado. A alias /index apresentou redirecionamento 303 na origem.' : '- Dois banners laterais antigos do contato estavam indisponíveis no inventário oficial. A alias /index apresentou redirecionamento 303 na origem. Essas limitações de origem não foram preenchidas com conteúdo inventado.',
  '- Respostas HTTP de redes sociais não comprovam atividade recente, cargos atuais ou disponibilidade sem autenticação.',
  '- A contagem de itens não prova preservação de conteúdo ausente dos inventários. As evidências de leitura visual estão em institutional-review.md, recursos-e-precos.md e nos inventários de coleções; os resultados do HTML e as verificações responsivas são relatados separadamente.', '',
  '## Reprodução', '',
  '1. Executar `node scripts/check-migration.mjs --static` para validar os dados e arquivos locais.',
  '2. Com o servidor de produção local em execução, executar `node scripts/check-migration.mjs` (ou definir `QA_BASE_URL`).',
  '3. Executar `node scripts/build-migration-matrix.mjs` para atualizar este documento com os resultados.', '',
);
mkdirSync('docs', { recursive: true });
writeFileSync('docs/matriz-migracao-conteudo.md', lines.join('\n'));
writeFileSync('docs/migration/source-resource-ledger.json', JSON.stringify({ checkedAt: manifest.consultedAt, sourcePages: manifest.pages.length, resourceCount: sourceRows.size, resources: [...sourceRows.values()] }, null, 2) + '\n');
console.log(JSON.stringify({ groups: counts, items: items.length, sourcePages: manifest.pages.length, sourceResources: sourceRows.size, productionChecks: production?.summary || null }));
