import { pageMetadata } from "@/lib/metadata";
import { connection } from "next/server";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { ContactCTA, PageIntro, TextLink } from "@/components/ui";
import { catalogueUrl } from "@/data/editorial";
import s from "../inner.module.css";
export const metadata = pageMetadata({
  title: "Soluções educacionais",
  description:
    "Explore as coleções da Aprender por etapa de ensino e objetivo pedagógico. Educação Infantil, Ensino Fundamental, leitura, cidadania e formação.",
  path: "/solucoes",
});
export default async function Solutions() {
  await connection();
  return (
    <>
      <PageIntro
        eyebrow="Soluções educacionais"
        breadcrumb="Soluções"
        title={
          <>
            Cada descoberta merece
            <br />
            um bom começo.
          </>
        }
        description="Consulte as coleções por etapa e objetivo, conheça os livros de estudantes e educadores e explore as amostras disponíveis."
      />
      <section className={s.section}>
        <div className="container">
          <CatalogExplorer />
          <div className={s.catalogueNote}>
            <p>
              As páginas identificam as apresentações do acervo oficial, do
              catálogo de 2025 e da tabela de 2027. Consulte a fonte de cada
              edição e confirme a oferta para sua rede com a editora.
            </p>
            <TextLink href={catalogueUrl}>
              Consultar catálogo 2025 (PDF · 70,3 MB)
            </TextLink>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
