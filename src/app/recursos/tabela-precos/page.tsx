import { connection } from "next/server";
import { pageMetadata } from "@/lib/metadata";
import { PriceExplorer } from "@/components/PriceExplorer";
import { PageIntro, TextLink } from "@/components/ui";
import { priceSource } from "@/data/prices";
import s from "@/components/content.module.css";
export const metadata = pageMetadata({
  title: "Tabela de preços publicada · 2027",
  description:
    "Consulte materiais, destinatários, anos e preços de capa da tabela 2027 publicada pela Aprender Editora, com acesso à referência original.",
  path: "/recursos/tabela-precos",
});
export default async function Prices() {
  await connection();
  return (
    <>
      <PageIntro
        eyebrow="Recursos · edição 2027"
        breadcrumb="Tabela de preços"
        title="Materiais e preços de capa."
        description="Uma consulta à tabela publicada pela editora, organizada por coleção, ano e destinatário."
      />
      <section className={s.section}>
        <div className="container">
          <div className={s.notice}>
            {priceSource.notes}{" "}
            <a href="/contato">Consultar condições com a Aprender.</a>
          </div>
          <PriceExplorer />
          <p className={s.source}>
            Fonte: tabela de preços identificada como 2027, consultada em
            14/10/2026. Valores transcritos em reais, sem arredondamento.
          </p>
          <div className={s.index}>
            <TextLink href={priceSource.image}>
              Ver imagem original da tabela (JPG)
            </TextLink>
            <TextLink href={priceSource.pageUrl}>
              Consultar publicação no site oficial
            </TextLink>
            <TextLink href="/recursos">Todos os recursos</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
