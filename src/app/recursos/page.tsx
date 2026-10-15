import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro, SectionHeading, TextLink } from "@/components/ui";
import { ResourceLinks } from "@/components/ResourceLinks";
import { documentResources } from "@/data/resources";
import { solutions } from "@/data/solutions";
import { Icon } from "@/components/Icon";
import s from "@/components/content.module.css";
export const metadata = pageMetadata({
  title: "Recursos, amostras e documentos",
  description:
    "Amostras dos livros, catálogo 2025, documento histórico do PAIC e tabela de preços 2027 da Aprender Editora.",
  path: "/recursos",
});
export default function Resources() {
  return (
    <>
      <PageIntro
        eyebrow="Biblioteca de consulta"
        breadcrumb="Recursos"
        title="Conheça os materiais por dentro."
        description="Explore amostras de livros e documentos institucionais. Cada referência conserva a apresentação e o período em que foi publicada."
      />
      <section className={s.section}>
        <div className="container">
          <div className={s.twoColumns}>
            <Link href="/recursos/tabela-precos" className={s.linkCard}>
              <h2>Tabela de preços 2027</h2>
              <p>
                Materiais de estudantes e professores, kits e anos de ensino.
              </p>
              <span>
                Consultar tabela <Icon name="arrow" size={18} />
              </span>
            </Link>
            <Link href="/a-editora/paic" className={s.linkCard}>
              <h2>PAIC e resultados</h2>
              <p>
                Contexto histórico, mapas, indicadores e documento
                institucional.
              </p>
              <span>
                Conhecer a participação <Icon name="arrow" size={18} />
              </span>
            </Link>
          </div>
          <nav className={s.index} aria-label="Amostras por coleção">
            {solutions
              .filter((solution) =>
                documentResources.some(
                  (doc) => doc.collectionSlug === solution.slug,
                ),
              )
              .map((solution) => (
                <a href={`#${solution.slug}`} key={solution.slug}>
                  {solution.name}
                </a>
              ))}
            <a href="#institucionais">Documentos institucionais</a>
          </nav>
          <SectionHeading
            eyebrow="Folheie as propostas"
            title="Amostras de materiais"
            description="Os PDFs vinculados são amostras do acervo oficial. O ano escolar e o volume não indicam, por si, o ano da edição."
          />
          {solutions.map((solution) => {
            const docs = documentResources.filter(
              (doc) => doc.collectionSlug === solution.slug,
            );
            if (!docs.length) return null;
            return (
              <section
                id={solution.slug}
                className={s.edition}
                key={solution.slug}
              >
                <h3>{solution.name}</h3>
                <ResourceLinks items={docs} />
                <TextLink href={`/solucoes/${solution.slug}`}>
                  Apresentação da coleção
                </TextLink>
              </section>
            );
          })}
          <section id="institucionais" className={s.edition}>
            <h3>Documentos institucionais</h3>
            <p className={s.note}>O documento completo do PAIC e o catálogo de 20 anos são opções para consulta integral ou uso offline. O catálogo tem 70,3 MB.</p>
            <ResourceLinks
              items={documentResources.filter((doc) => !doc.collectionSlug)}
            />
          </section>
        </div>
      </section>
    </>
  );
}
