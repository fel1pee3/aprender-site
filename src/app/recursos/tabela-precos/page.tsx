import { getTranslator } from "@/i18n/server";
import { connection } from "next/server";
import { pageMetadata } from "@/lib/metadata";
import { PriceExplorer } from "@/components/PriceExplorer";
import { PageIntro, TextLink } from "@/components/ui";
import { ImageDialog } from "@/components/ImageDialog";
import { priceSource } from "@/data/prices";
import s from "@/components/content.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Tabela de preços publicada · 2027"),
        description: t("Consulte materiais, destinatários, anos e preços de capa da tabela 2027 publicada pela Aprender Editora, com filtros por coleção, ano e destinatário."),
        path: "/recursos/tabela-precos"
    }, t.locale);
}
export default async function Prices() {
    const t = await getTranslator();
    await connection();
    return (<>
      <PageIntro eyebrow={t("Recursos · edição 2027")} breadcrumb={t("Tabela de preços")} title={t("Materiais e preços de capa.")} description={t("Uma consulta à tabela publicada pela editora, organizada por coleção, ano e destinatário.")}/>
      <section className={s.section}>
        <div className="container">
          <div className={s.notice}>
            {t(priceSource.notes)}{t(" ")}
            <a href={t.href("/contato")}>{t("Consultar condi\u00E7\u00F5es com a Aprender.")}</a>
          </div>
          <PriceExplorer />
          <p className={s.source}>{t("Fonte: tabela de pre\u00E7os identificada como 2027, consultada em 14/10/2026. Valores de capa em reais. ")}</p>
          <div className={s.index}>
            <ImageDialog src={priceSource.image} alt={t("Tabela de preços de capa publicada pela Aprender Editora, identificada como 2027")} caption={t("Tabela 2027. Os 152 materiais e preços estão disponíveis em texto nesta página.")} buttonLabel={t("Ampliar tabela publicada · 2027")}/>
            <TextLink href={t.href("/recursos")}>{t("Todos os recursos")}</TextLink>
          </div>
        </div>
      </section>
    </>);
}
