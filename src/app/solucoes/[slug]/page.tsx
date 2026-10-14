import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/data/solutions";
import { catalogueUrl } from "@/data/editorial";
import {
  Breadcrumb,
  Button,
  ContactCTA,
  Eyebrow,
  ProductCard,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import { Icon } from "@/components/Icon";
import s from "../../inner.module.css";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return { title: "Solução não encontrada" };
  return {
    title: solution.name,
    description: solution.description,
    openGraph: {
      title: solution.name,
      description: solution.description,
      images: [solution.image],
    },
  };
}
export default async function SolutionPage({ params }: Props) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();
  const related = solutions
    .filter(
      (x) =>
        x.slug !== solution.slug &&
        x.stageIds.some((id) => solution.stageIds.includes(id)),
    )
    .slice(0, 3);
  return (
    <>
      <section className={s.solutionHero}>
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Soluções", href: "/solucoes" },
              { label: solution.name },
            ]}
          />
          <div className={s.solutionGrid}>
            <div
              className={s.solutionArtwork}
              style={{ "--accent": solution.accent } as CSSProperties}
            >
              <Image
                src={solution.image}
                alt={`Material da coleção ${solution.name}`}
                width={600}
                height={500}
                priority
                sizes="(max-width:767px) 90vw, 42vw"
              />
              <span className={s.edition}>
                Coleção Aprender · Catálogo 2025
              </span>
            </div>
            <div className={s.solutionCopy}>
              <Eyebrow>{solution.stage}</Eyebrow>
              <h1>{solution.name}</h1>
              <p>{solution.description}</p>
              <div className={s.audience}>
                <strong>Para quem</strong>
                <p>{solution.audience}</p>
              </div>
              <div className={s.actions}>
                <Button href={`/contato?solucao=${solution.slug}`}>
                  Tenho interesse nesta solução
                </Button>
                <TextLink
                  href={`${catalogueUrl}#page=${solution.sourcePages[0]}`}
                >
                  Ver no catálogo (PDF)
                </TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={s.whiteSection}>
        <div className={`container ${s.solutionInfo}`}>
          <div>
            <Eyebrow>Intencionalidade pedagógica</Eyebrow>
            <h2>O que a proposta desenvolve</h2>
            <ol className={s.detailList}>
              {solution.goals.map((goal, i) => (
                <li key={goal}>
                  <span>0{i + 1}</span>
                  {goal}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Eyebrow>Dentro da coleção</Eyebrow>
            <h2>Materiais que dão forma às ideias</h2>
            <ul className={s.detailList}>
              {solution.components.map((item) => (
                <li key={item}>
                  <Icon name="book" size={21} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={s.softSection}>
        <div className={`container ${s.supportGrid}`}>
          <div>
            <Eyebrow>Ao lado dos educadores</Eyebrow>
            <h2>O material é parte de uma caminhada.</h2>
            <p>
              Conheça os apoios associados a esta coleção no catálogo de 2025. A
              equipe da Aprender pode orientar a organização da proposta para
              sua rede.
            </p>
            <TextLink href="/formacao">
              Entenda a formação e o acompanhamento
            </TextLink>
          </div>
          <div>
            <ul className={s.checkList}>
              {solution.support.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <p className={s.sourceNote}>
              Fonte: catálogo institucional de 2025, p.{" "}
              {solution.sourcePages.join(", ")}. Componentes e condições de
              atendimento devem ser confirmados com a editora.
            </p>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className={s.section}>
          <div className="container">
            <SectionHeading
              eyebrow="Continue explorando"
              title="Outros caminhos para aprender."
            >
              <TextLink href="/solucoes">Ver todas as soluções</TextLink>
            </SectionHeading>
            <div className={s.products}>
              {related.map((item) => (
                <ProductCard solution={item} key={item.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
      <ContactCTA />
    </>
  );
}
