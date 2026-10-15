import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import {
  missionVersions,
  institutionalValues,
  team,
} from "@/data/institutional";
import { ContactCTA, PageIntro, TextLink } from "@/components/ui";
import { ReadingNav } from "@/components/ReadingNav";
import s from "@/components/content.module.css";

export const metadata = pageMetadata({
  title: "A editora",
  description:
    "Missão, sete valores e equipe da Aprender Editora. Materiais, formação e acompanhamento da aprendizagem desde 2005.",
  path: "/a-editora",
});
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="A editora"
        title={
          <>
            Compromisso com a aprendizagem.
            <br />
            Desde 2005.
          </>
        }
        description="Materiais didáticos, formação de educadores e acompanhamento pedagógico, com raízes na experiência de alfabetização do Ceará."
      />
      <div className="container">
        <ReadingNav current="/a-editora" />
      </div>
      <section id="equipe" className={s.section}>
        <div className={`container ${s.twoColumns}`}>
          <div className={s.prose}>
            <h2 className={s.heading}>
              Uma equipe dedicada a ensinar e aprender.
            </h2>
            <p>{team.intro}</p>
            <p>Especializações: {team.specializations.join(", ")}.</p>
            {team.approach.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className={s.source}>
              <a href={team.sourceUrl}>Apresentação institucional da equipe</a>
            </p>
          </div>
          <figure className={s.photo}>
            <Image
              src="/images/formation.webp"
              alt="Educadores participam de uma atividade coletiva de formação"
              width={1589}
              height={1016}
              sizes="(max-width:600px) 90vw, 45vw"
              style={{ height: "auto" }}
            />
            <figcaption>
              Formação de educadores · acervo do catálogo institucional de 2025,
              p. 61. Data do encontro não informada.
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="missao" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <div className={s.prose}>
            <h2 className={s.heading}>Nossa missão</h2>
            <span className={s.editionBadge}>{missionVersions[0].edition}</span>
            <p>{missionVersions[0].text}</p>
            <p className={s.source}>
              <a href={missionVersions[0].sourceUrl}>Consultar publicação</a>
            </p>
            <details id={missionVersions[1].id} className={s.accordion}>
              <summary>{missionVersions[1].title}</summary>
              <div>
                <p>{missionVersions[1].text}</p>
                <p>{missionVersions[1].note}</p>
                <a href={missionVersions[1].sourceUrl}>
                  Versão do site institucional
                </a>
              </div>
            </details>
          </div>
        </div>
      </section>
      <section id="valores" className={s.section}>
        <div className="container">
          <h2 className={s.heading}>
            Sete valores que orientam nosso trabalho.
          </h2>
          <p className={s.note}>
            Declarações do catálogo de 2025. A apresentação anterior do site
            permanece disponível em cada valor.
          </p>
          <div className={s.twoColumns}>
            {institutionalValues.map((value) => (
              <article id={value.id} key={value.id} className={s.prose}>
                <h3 className={s.subheading}>{value.title}</h3>
                <p>{value.description}</p>
                <details className={s.accordion}>
                  <summary>Contexto da versão anterior</summary>
                  <div>
                    <p>{value.historicalDescription}</p>
                    <a href={value.historicalSourceUrl}>
                      Apresentação institucional sem data de edição
                    </a>
                  </div>
                </details>
              </article>
            ))}
          </div>
          <p className={s.source}>
            <a href={institutionalValues[0].sourceUrl}>
              Fonte: catálogo de 2025, página 1
            </a>
          </p>
        </div>
      </section>
      <section id="trajetoria" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>Conheça nossa história.</h2>
          <div className={s.threeColumns}>
            <article className={s.linkCard}>
              <h3>De Sobral à Aprender</h3>
              <p>
                O diagnóstico de leitura, a equipe de educadoras e a origem da
                editora em Fortaleza.
              </p>
              <TextLink href="/a-editora/trajetoria">Ler a trajetória</TextLink>
            </article>
            <article className={s.linkCard}>
              <h3>Edgar Linhares</h3>
              <p>
                A contribuição do educador às políticas de alfabetização e à
                formação de professores.
              </p>
              <TextLink href="/a-editora/edgar-linhares">
                Conhecer o educador
              </TextLink>
            </article>
            <article className={s.linkCard}>
              <h3>PAIC e resultados</h3>
              <p>
                Participação da editora, mapas, séries históricas e resultados
                das redes públicas.
              </p>
              <TextLink href="/a-editora/paic">Consultar o acervo</TextLink>
            </article>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
