import { getTranslator } from "@/i18n/server";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CollectionContent, CollectionMaterials } from "@/components/CollectionContent";
import type { CSSProperties } from "react";
import Image from "@/components/AssetImage";
import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/data/solutions";
import { Breadcrumb, Button, ContactCTA, Eyebrow, ProductCard, SectionHeading, TextLink, } from "@/components/ui";
import { Icon } from "@/components/Icon";
import s from "../../inner.module.css";
type Props = {
    params: Promise<{
        slug: string;
    }>;
};
export function generateStaticParams() {
    return solutions.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslator();
    const solution = getSolution((await params).slug);
    if (!solution)
        return { title: t("Solução não encontrada") };
    return pageMetadata({
        title: t(solution.name),
        description: t(solution.description),
        path: `/solucoes/${solution.slug}`
    }, t.locale);
}
export default async function SolutionPage({ params }: Props) {
    const t = await getTranslator();
    const solution = getSolution((await params).slug);
    if (!solution)
        notFound();
    const related = solutions
        .filter((x) => x.slug !== solution.slug &&
        x.stageIds.some((id) => solution.stageIds.includes(id)))
        .slice(0, 3);
    return (<>
      <section className={s.solutionHero}>
        <div className="container">
          <Breadcrumb items={t.data([
        { label: "Soluções", href: "/solucoes" },
        { label: solution.name },
    ])}/>
          <div className={s.solutionGrid}>
            <div className={s.solutionArtwork} style={{ "--accent": solution.accent } as CSSProperties}>
              {solution.image ? (<Image src={solution.image} alt={t("Material da coleção {0}", [solution.name])} width={600} height={500} priority sizes="(max-width:767px) 90vw, 42vw"/>) : (<div>
                  <Icon name="book" size={60}/>
                  <p>{t(solution.name)}</p>
                </div>)}
              <span className={s.edition}>
                {t(solution.sourceLabel || "Coleção Aprender · Catálogo 2025")}
              </span>
            </div>
            <div className={s.solutionCopy}>
              <Eyebrow>{t(solution.stage)}</Eyebrow>
              <h1>{t(solution.name)}</h1>
              <p>{t(solution.description)}</p>
              <div className={s.audience}>
                <strong>{t("Para quem")}</strong>
                <p>{t(solution.audience)}</p>
              </div>
              <div className={s.actions}>
                <Button href={t.href(`/contato?solucao=${solution.slug}`)}>{t("Tenho interesse nesta solu\u00E7\u00E3o ")}</Button>
                <TextLink href={t.href(solution.slug === "ingles" ? "#edicoes" : "#galeria")}>{t("Ver materiais da cole\u00E7\u00E3o")}</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CollectionMaterials slug={solution.slug}/>
      <section className={s.whiteSection}>
        <div className={`container ${s.solutionInfo}`}>
          <div>
            <Eyebrow>
              {t(solution.goals.length
            ? "Intencionalidade pedagógica"
            : "Apresentação documentada")}
            </Eyebrow>
            <h2>
              {t(solution.goals.length
            ? "O que a proposta desenvolve"
            : "Materiais de Inglês para estudantes e professores")}
            </h2>
            {!solution.goals.length && (<p>{t("A tabela de 2027 relaciona os t\u00EDtulos, n\u00EDveis, destinat\u00E1rios e pre\u00E7os. Consulte as variantes abaixo e converse com a editora para conhecer a proposta pedag\u00F3gica. ")}</p>)}
            <ol className={s.detailList}>
              {solution.goals.map((goal, i) => (<li key={goal}>
                  <span>{t("0")}{t(i + 1)}</span>
                  {t(goal)}
                </li>))}
            </ol>
          </div>
          <div>
            <Eyebrow>{t("Dentro da cole\u00E7\u00E3o")}</Eyebrow>
            <h2>{t("Materiais que d\u00E3o forma \u00E0s ideias")}</h2>
            <ul className={s.detailList}>
              {solution.components.map((item) => (<li key={item}>
                  <Icon name="book" size={21}/>
                  {t(item)}
                </li>))}
            </ul>
          </div>
        </div>
      </section>
      <CollectionContent slug={solution.slug}/>
      {solution.support.length > 0 && (<section className={s.softSection}>
          <div className={`container ${s.supportGrid}`}>
            <div>
              <Eyebrow>{t("Ao lado dos educadores")}</Eyebrow>
              <h2>{t("Materiais e apoio \u00E0 pr\u00E1tica docente.")}</h2>
              <p>{t("Conhe\u00E7a os apoios associados \u00E0 apresenta\u00E7\u00E3o desta cole\u00E7\u00E3o. A equipe da Aprender pode orientar a organiza\u00E7\u00E3o da proposta para sua rede. ")}</p>
              <TextLink href={t.href("/formacao")}>{t("Entenda a forma\u00E7\u00E3o e o acompanhamento ")}</TextLink>
            </div>
            <div>
              <ul className={s.checkList}>
                {solution.support.map((item) => (<li key={item}>
                    <Icon name="check" size={18}/>
                    {t(item)}
                  </li>))}
              </ul>
              <p className={s.sourceNote}>{t("Fonte:")}{t(" ")}
                {solution.sourceLabel ? t(solution.sourceLabel) : t("catálogo institucional de 2025, p. {0}", [solution.sourcePages.join(", ")])}{t(". Componentes e condi\u00E7\u00F5es de atendimento devem ser confirmados com a editora. ")}</p>
            </div>
          </div>
        </section>)}
      {related.length > 0 && (<section className={s.section}>
          <div className="container">
            <SectionHeading eyebrow={t("Continue explorando")} title={t("Outras soluções para sua rede.")}>
              <TextLink href={t.href("/solucoes")}>{t("Ver todas as solu\u00E7\u00F5es")}</TextLink>
            </SectionHeading>
            <div className={s.products}>
              {related.map((item) => (<ProductCard solution={t.data(item)} key={item.slug}/>))}
            </div>
          </div>
        </section>)}
      <ContactCTA />
    </>);
}
