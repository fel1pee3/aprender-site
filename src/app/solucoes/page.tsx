import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { ContactCTA, PageIntro, TextLink } from "@/components/ui";
import { catalogueUrl } from "@/data/editorial";
import s from "../inner.module.css";
export const metadata: Metadata = {
  title: "Soluções educacionais",
  description:
    "Explore as coleções da Aprender por etapa de ensino e objetivo pedagógico. Educação Infantil, Ensino Fundamental, leitura, cidadania e formação.",
};
export default function Solutions() {
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
        description="Materiais que acolhem diferentes etapas e necessidades. Explore as coleções e encontre caminhos para a sua rede de ensino."
      />
      <section className={s.section}>
        <div className="container">
          <Suspense fallback={<p role="status">Preparando as soluções…</p>}>
            <CatalogExplorer />
          </Suspense>
          <div className={s.catalogueNote}>
            <p>
              Conheça também a edição comemorativa de 2025. Os materiais
              apresentados aqui foram conferidos nessa publicação; converse com
              a equipe sobre a oferta para sua rede.
            </p>
            <TextLink href={catalogueUrl}>
              Consultar catálogo 2025 (PDF)
            </TextLink>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
