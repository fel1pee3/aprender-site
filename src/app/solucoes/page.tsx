import { getTranslator } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { connection } from "next/server";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { ContactCTA, PageIntro, TextLink } from "@/components/ui";
import s from "../inner.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Soluções educacionais"),
        description: t("Explore as coleções da Aprender por etapa de ensino e objetivo pedagógico. Educação Infantil, Ensino Fundamental, leitura, cidadania e formação."),
        path: "/solucoes"
    }, t.locale);
}
export default async function Solutions() {
    const t = await getTranslator();
    await connection();
    return (<>
      <PageIntro eyebrow={t("Soluções educacionais")} breadcrumb={t("Soluções")} title={<>{t("Cada descoberta merece ")}<br />{t("um bom come\u00E7o. ")}</>} description={t("Consulte as coleções por etapa e objetivo, conheça os livros de estudantes e educadores e explore as amostras disponíveis.")}/>
      <section className={s.section}>
        <div className="container">
          <CatalogExplorer />
          <div className={s.catalogueNote}>
            <p>{t("As cole\u00E7\u00F5es re\u00FAnem apresenta\u00E7\u00F5es pedag\u00F3gicas e composi\u00E7\u00F5es por p\u00FAblico. Cada edi\u00E7\u00E3o mant\u00E9m suas caracter\u00EDsticas; confirme com a editora os materiais adequados \u00E0 sua rede. ")}</p>
            <TextLink href={t.href("/recursos#catalogo-2025-20-anos")}>{t("Amostras e cat\u00E1logo completo ")}</TextLink>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>);
}
