import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/editorial";
import { Breadcrumb, ContactCTA, Eyebrow, TextLink } from "@/components/ui";
import s from "../../inner.module.css";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article
    ? pageMetadata({
        title: article.title,
        description: article.excerpt,
        path: `/em-acao/${article.slug}`,
        image: article.image,
        type: "article",
      })
    : { title: "Registro não encontrado" };
}
export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return (
    <>
      <header className={s.articleHeader}>
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Em ação", href: "/em-acao" },
              { label: "Histórias da Aprender" },
            ]}
          />
          <Eyebrow>{article.type}</Eyebrow>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <time dateTime={article.date}>{article.dateLabel}</time>
        </div>
      </header>
      <div className="container">
        <article className={s.articleBody}>
          <figure>
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={1200}
              height={900}
              priority
              sizes="(max-width:767px) 90vw, 800px"
            />
            <figcaption>{article.imageCaption}</figcaption>
          </figure>
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <aside className={s.articleSource}>
            <strong>Fontes deste registro</strong>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.sourceLabel} (abre em nova aba)
            </a>
          </aside>
          <TextLink href="/em-acao">Explorar outros registros</TextLink>
        </article>
      </div>
      <ContactCTA />
    </>
  );
}
