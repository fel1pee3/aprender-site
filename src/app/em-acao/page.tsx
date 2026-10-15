import { getTranslator } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import Image from "@/components/AssetImage";
import Link from "@/i18n/Link";
import { articles } from "@/data/editorial";
import { ContactCTA, PageIntro } from "@/components/ui";
import { Icon } from "@/components/Icon";
import s from "../inner.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Aprender em ação"),
        description: t("Histórias, registros e memórias documentadas da trajetória da Aprender Editora na formação de educadores e na aprendizagem."),
        path: "/em-acao"
    }, t.locale);
}
export default async function Journal() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("Aprender em ação")} breadcrumb={t("Em ação")} title={<>{t("Materiais e forma\u00E7\u00E3o ")}<br />{t("na pr\u00E1tica. ")}</>} description={t("Atividades de leitura, acompanhamento pedagógico e histórias da editora. Conheça os registros de sala de aula do acervo da Aprender.")}/>
      <section className={s.section}>
        <div className="container">
          <div className={s.articleList}>
            {articles.map((article) => (<Link href={t.href(`/em-acao/${article.slug}`)} className={s.articleCard} key={article.slug}>
                <Image src={article.image} alt={t(article.imageAlt)} width={600} height={430} sizes="(max-width:767px) 90vw, 30vw"/>
                <div className={s.articleMeta}>
                  <span>{t(article.type)}</span>
                  <time dateTime={article.date}>{t(article.dateLabel)}</time>
                </div>
                <h2>{t(article.title)}</h2>
                <p>{t(article.excerpt)}</p>
                <span className={s.readMore}>{t("Ler a hist\u00F3ria ")}<Icon name="arrow" size={17}/>
                </span>
              </Link>))}
          </div>
          <p className={s.sourceNote}>{t("Registros de 2010 e 2011 publicados no cat\u00E1logo comemorativo de 2025, ao lado da celebra\u00E7\u00E3o dos vinte anos da editora. ")}</p>
        </div>
      </section>
      <ContactCTA />
    </>);
}
