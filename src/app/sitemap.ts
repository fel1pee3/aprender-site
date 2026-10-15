import type { MetadataRoute } from 'next';
import { solutions } from '@/data/solutions';
import { articles } from '@/data/editorial';
import { absoluteUrl } from '@/lib/metadata';
import { localizedPath, locales } from '@/i18n/shared';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/a-editora', '/a-editora/trajetoria', '/a-editora/edgar-linhares', '/a-editora/paic', '/solucoes', '/formacao', '/em-acao', '/acervo', '/recursos', '/recursos/tabela-precos', '/plataformas', '/contato', '/acessibilidade', ...solutions.map(s=>`/solucoes/${s.slug}`), ...articles.map(a=>`/em-acao/${a.slug}`)].flatMap(path=>locales.map(locale=>({url:absoluteUrl(localizedPath(path,locale)),alternates:{languages:{'pt-BR':absoluteUrl(localizedPath(path,'pt')),en:absoluteUrl(localizedPath(path,'en')),es:absoluteUrl(localizedPath(path,'es'))}}})));
}
