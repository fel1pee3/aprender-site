import type { MetadataRoute } from 'next';
import { solutions } from '@/data/solutions';
import { articles } from '@/data/editorial';
import { absoluteUrl } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/a-editora', '/a-editora/trajetoria', '/a-editora/edgar-linhares', '/a-editora/paic', '/solucoes', '/formacao', '/em-acao', '/acervo', '/recursos', '/recursos/tabela-precos', '/plataformas', '/contato', ...solutions.map(s=>`/solucoes/${s.slug}`), ...articles.map(a=>`/em-acao/${a.slug}`)].map(path=>({url:absoluteUrl(path)}));
}
