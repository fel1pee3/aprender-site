import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

export const root = process.cwd();
export const readJson = name => JSON.parse(readFileSync(path.join(root, name), 'utf8'));
export const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
export const resourceKey = value => {
  const url = new URL(value);
  return `${url.hostname.replace(/^www\./, '')}${decodeURIComponent(url.pathname)}`;
};
export function loadData() {
  const output = path.join(root, '.qa/migration-data');
  mkdirSync(output, { recursive: true });
  for (const name of readdirSync(path.join(root, 'src/data')).filter(name => name.endsWith('.ts'))) {
    const source = readFileSync(path.join(root, 'src/data', name), 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
    writeFileSync(path.join(output, name.replace(/\.ts$/, '.js')), compiled.outputText);
  }
  const require = createRequire(import.meta.url);
  return Object.fromEntries(['solutions', 'editorial', 'institutional', 'archive', 'resources', 'prices', 'collection-details', 'legacy-routes'].map(name => {
    const filename = path.join(output, name + '.js');
    if (!existsSync(filename)) return [name, {}];
    try { return [name, require(filename)]; }
    catch (error) {
      if (name === 'collection-details' && error.code === 'MODULE_NOT_FOUND') return [name, { __loadError: error.message }];
      throw error;
    }
  }));
}

export const officialDestinations = {
  '/': '/', '/index': '/', '/quem-somos': '/a-editora#equipe',
  '/missao-principios-e-valores': '/a-editora#missao', '/trajetoria': '/a-editora/trajetoria',
  '/trajetorias-prof-edgar': '/a-editora/edgar-linhares', '/trajetorias-lendo-voce-fica-sabendo': '/formacao',
  '/paic': '/a-editora/paic', '/produtos': '/solucoes',
  '/brincando-e-aprendendo': '/solucoes/brincando-e-aprendendo', '/brincando-e-aprendendo-novo': '/solucoes/brincando-e-aprendendo',
  '/lendo-e-escrevendo': '/solucoes/lendo-e-escrevendo', '/novo-lendo-voce-fica-sabendo': '/solucoes/novo-lendo-voce-fica-sabendo',
  '/escrever-comunicar-e-ser': '/solucoes/escrever-comunicar-e-ser', '/colecao-acerta-brasil': '/solucoes/acerta-brasil',
  '/colecao-a-cor-da-gente': '/solucoes/a-cor-da-gente', '/colecao-vida-e-linguagem': '/solucoes/vida-e-linguagem',
  '/colecao-vida-e-matematica': '/solucoes/vida-e-matematica', '/projeto-tema': '/solucoes/projeto-tema',
  '/projeto-transito-legal': '/solucoes/transito-legal', '/educacao-financeira': '/solucoes/educacao-financeira',
  '/colecao-fluir-das-emocoes': '/solucoes/fluir-das-emocoes', '/sou-da-paz': '/solucoes/sou-da-paz',
  '/aprender-em-acao': '/acervo#formacoes', '/tabela-precos': '/recursos/tabela-precos',
  '/aprender-formar': 'https://aprenderformar.com.br/', '/aprencer-avaliar': 'https://aprenderavaliar.com.br/', '/fale-conosco': '/contato',
  '/video-1': '/acervo#video-1', '/video-2': '/acervo#video-2', '/video-3': '/acervo#video-3',
};

export function inventories() {
  return ['institutional', 'archive', 'resources', 'prices', 'collections', 'editorial'].map(name => {
    const filename = `docs/migration/${name}.json`;
    if (name === 'collections' && !existsSync(filename)) {
      const parts = ['collections-primary', 'collections-secondary'].map(part => `docs/migration/${part}.json`);
      const present = parts.filter(existsSync);
      return { name, files: present, missing: present.length !== parts.length, items: present.flatMap(file => {
        const data = readJson(file);
        return Array.isArray(data) ? data : data.items || data.entries || [];
      }) };
    }
    if (!existsSync(filename)) return { name, items: [], missing: true };
    const data = readJson(filename);
    return { name, items: Array.isArray(data) ? data : data.items || data.entries || [] };
  });
}

// Correct only documentation destinations when equivalent material lives in a more precise section.
export function itemDestination(item) {
  if (item.destination === 'Rodapé e /contato') return '/contato';
  if (item.id.startsWith('indicador-') && (item.id.endsWith('-site') || item.id.includes('parceiros-publieditorial'))) return '/a-editora/trajetoria#indicadores';
  if (item.id === 'figura-ioeb-original-2019' || item.id.startsWith('ioeb-2019-')) return '/a-editora/paic#ioeb';
  return item.destination;
}

export function publicRoutes(data) {
  const routes = new Set();
  const visit = folder => {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      if (entry.isDirectory() && !entry.name.startsWith('[')) visit(path.join(folder, entry.name));
      if (entry.name === 'page.tsx') routes.add('/' + path.relative('src/app', folder).split(path.sep).filter(Boolean).join('/'));
    }
  };
  visit('src/app');
  for (const row of data.solutions.solutions || []) routes.add('/solucoes/' + row.slug);
  for (const row of data.editorial.articles || []) routes.add('/em-acao/' + row.slug);
  return [...routes].sort();
}
