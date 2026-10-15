import { getTranslator } from "@/i18n/server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "@/components/AssetImage";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/editorial";
import { Breadcrumb, ContactCTA, Eyebrow, TextLink } from "@/components/ui";
import s from "../../inner.module.css";
type Props = {
    params: Promise<{
        slug: string;
    }>;
};
export function generateStaticParams() {
    return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslator();
    const article = getArticle((await params).slug);
    return article
        ? pageMetadata({
            title: t(article.title),
            description: t(article.excerpt),
            path: `/em-acao/${article.slug}`,
            image: article.image,
            type: "article"
        }, t.locale)
        : { title: t("Registro não encontrado") };
}
export default async function ArticlePage({ params }: Props) {
    const t = await getTranslator();
    const article = getArticle((await params).slug);
    if (!article)
        notFound();
    return (<>
      <header className={s.articleHeader}>
        <div className="container">
          <Breadcrumb items={t.data([
        { label: "Em ação", href: "/em-acao" },
        { label: "Histórias da Aprender" },
    ])}/>
          <Eyebrow>{t(article.type)}</Eyebrow>
          <h1>{t(article.title)}</h1>
          <p>{t(article.excerpt)}</p>
          <time dateTime={article.date}>{t(article.dateLabel)}</time>
        </div>
      </header>
      <div className="container">
        <article className={s.articleBody}>
          <figure>
            <Image src={article.image} alt={t(article.imageAlt)} width={1200} height={900} priority sizes="(max-width:767px) 90vw, 800px"/>
            <figcaption>{t(article.imageCaption)}</figcaption>
          </figure>
          {article.paragraphs.map((paragraph) => (<p key={paragraph}>{t(paragraph)}</p>))}
          <aside className={s.articleSource}>
            <strong>{t("Fontes deste registro")}</strong>
            {article.sourceUrl ? (<a href={t.href(article.sourceUrl)} target="_blank" rel="noopener noreferrer">
                {t(article.sourceLabel)}<span className="sr-only">{t(" (abre em nova aba)")}</span></a>) : (<span>{t(article.sourceLabel)}</span>)}
          </aside>
          <TextLink href={t.href("/em-acao")}>{t("Explorar outros registros")}</TextLink>
        </article>
      </div>
      <ContactCTA />
    </>);
}
