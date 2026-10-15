import { getTranslator } from "@/i18n/server";
import Link from "@/i18n/Link";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro, SectionHeading, TextLink } from "@/components/ui";
import { ResourceLinks } from "@/components/ResourceLinks";
import { documentResources } from "@/data/resources";
import { solutions } from "@/data/solutions";
import { Icon } from "@/components/Icon";
import s from "@/components/content.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Recursos, amostras e documentos"),
        description: t("Amostras dos livros, catálogo 2025, documento histórico do PAIC e tabela de preços 2027 da Aprender Editora."),
        path: "/recursos"
    }, t.locale);
}
export default async function Resources() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("Biblioteca de consulta")} breadcrumb={t("Recursos")} title={t("Conheça os materiais por dentro.")} description={t("Explore amostras de livros e documentos institucionais. Cada referência conserva a apresentação e o período em que foi publicada.")}/>
      <section className={s.section}>
        <div className="container">
          <div className={s.twoColumns}>
            <Link href={t.href("/recursos/tabela-precos")} className={s.linkCard}>
              <h2>{t("Tabela de pre\u00E7os 2027")}</h2>
              <p>{t("Materiais de estudantes e professores, kits e anos de ensino. ")}</p>
              <span>{t("Consultar tabela ")}<Icon name="arrow" size={18}/>
              </span>
            </Link>
            <Link href={t.href("/a-editora/paic")} className={s.linkCard}>
              <h2>{t("PAIC e resultados")}</h2>
              <p>{t("Contexto hist\u00F3rico, mapas, indicadores e documento institucional. ")}</p>
              <span>{t("Conhecer a participa\u00E7\u00E3o ")}<Icon name="arrow" size={18}/>
              </span>
            </Link>
          </div>
          <nav className={s.index} aria-label={t("Amostras por coleção")}>
            {solutions
            .filter((solution) => documentResources.some((doc) => doc.collectionSlug === solution.slug))
            .map((solution) => (<a href={t.href(`#${solution.slug}`)} key={solution.slug}>
                  {t(solution.name)}
                </a>))}
            <a href={t.href("#institucionais")}>{t("Documentos institucionais")}</a>
          </nav>
          <SectionHeading eyebrow={t("Folheie as propostas")} title={t("Amostras de materiais")} description={t("Os PDFs vinculados são amostras do acervo oficial. O ano escolar e o volume não indicam, por si, o ano da edição.")}/>
          {solutions.map((solution) => {
            const docs = documentResources.filter((doc) => doc.collectionSlug === solution.slug);
            if (!docs.length)
                return null;
            return (<section id={solution.slug} className={s.edition} key={solution.slug}>
                <h3>{t(solution.name)}</h3>
                <ResourceLinks items={t.data(docs)}/>
                <TextLink href={t.href(`/solucoes/${solution.slug}`)}>{t("Apresenta\u00E7\u00E3o da cole\u00E7\u00E3o ")}</TextLink>
              </section>);
        })}
          <section id="institucionais" className={s.edition}>
            <h3>{t("Documentos institucionais")}</h3>
            <p className={s.note}>{t("O documento completo do PAIC e o cat\u00E1logo de 20 anos s\u00E3o op\u00E7\u00F5es para consulta integral ou uso offline. O cat\u00E1logo tem 70,3 MB.")}</p>
            <ResourceLinks items={t.data(documentResources.filter((doc) => !doc.collectionSlug))}/>
          </section>
        </div>
      </section>
    </>);
}
