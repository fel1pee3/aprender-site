import { pageMetadata } from "@/lib/metadata";
import { connection } from "next/server";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { ContactCTA, PageIntro, TextLink } from "@/components/ui";
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
              As coleções reúnem apresentações pedagógicas e composições por público.
              Cada edição mantém suas características; confirme com a editora
              os materiais adequados à sua rede.
            </p>
            <TextLink href="/recursos#catalogo-2025-20-anos">
              Amostras e catálogo completo
            </TextLink>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
