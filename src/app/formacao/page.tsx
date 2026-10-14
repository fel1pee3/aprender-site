import type { Metadata } from "next";
import Image from "next/image";
import { solutions } from "@/data/solutions";
import { catalogueUrl } from "@/data/editorial";
import {
  ContactCTA,
  Eyebrow,
  PageIntro,
  ProductCard,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import s from "../inner.module.css";
export const metadata: Metadata = {
  title: "Formação e acompanhamento",
  description:
    "Formação contínua, encontros entre educadores e acompanhamento pedagógico conectados aos materiais didáticos da Aprender Editora.",
};
export default function Formation() {
  return (
    <>
      <PageIntro
        eyebrow="Formação e acompanhamento"
        breadcrumb="Formação"
        title={
          <>
            Quem ensina também precisa
            <br />
            de espaço para aprender.
          </>
        }
        description="Escuta, estudo e troca de experiências para aproximar os materiais das práticas e dos desafios reais da escola."
      />
      <section className={s.section}>
        <div className={`container ${s.split}`}>
          <figure className={s.figure}>
            <Image
              src="/images/formation.webp"
              alt="Educadores participam de uma atividade coletiva de formação"
              width={1589}
              height={1016}
              priority
              sizes="(max-width:767px) 90vw, 45vw"
            />
            <figcaption>
              Registro de formação do acervo da Aprender. Catálogo de 2025, p.
              61.
            </figcaption>
          </figure>
          <div>
            <Eyebrow>Conhecimento compartilhado</Eyebrow>
            <h2 className={s.editorialTitle}>
              Teoria e prática,
              <br />
              na mesma conversa.
            </h2>
            <div className={s.copy}>
              <p>
                Os materiais da Aprender são acompanhados por propostas de
                formação que valorizam o professor e a intencionalidade de suas
                escolhas. Os encontros abordam prática pedagógica, fundamentos
                teóricos, planejamento, gestão da sala de aula e avaliação.
              </p>
              <p>
                As modalidades e cargas horárias variam conforme a coleção. As
                páginas das soluções apresentam o que está documentado no
                catálogo, para ajudar sua equipe a iniciar essa conversa.
              </p>
            </div>
            <TextLink href="/contato">
              Converse sobre a formação para sua rede
            </TextLink>
          </div>
        </div>
      </section>
      <section className={s.softSection}>
        <div className="container">
          <SectionHeading
            eyebrow="Um trabalho em continuidade"
            title="Estudar, experimentar, acompanhar."
          />
          <div className={s.process}>
            {[
              {
                title: "Formação de educadores",
                text: "Encontros de estudo e troca sobre o uso dos materiais, o planejamento e as práticas em sala. Há propostas presenciais, remotas e híbridas, conforme a coleção.",
              },
              {
                title: "Acompanhamento pedagógico",
                text: "Diálogo com gestores e educadores, visitas e observação da prática em sala por amostragem, nos projetos que incluem esses apoios.",
              },
              {
                title: "Avaliação para orientar",
                text: "Instrumentos de acompanhamento ajudam a compreender o que os estudantes já aprenderam e a planejar intervenções nos projetos que preveem avaliação.",
              },
            ].map((item, i) => (
              <article key={item.title}>
                <span className={s.processNumber}>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className={s.sourceNote}>
            Referências:{" "}
            <a href="https://www.aprendereditora.com.br/aprender-em-acao">
              Aprender em Ação, apresentação institucional
            </a>
            , e{" "}
            <a href={`${catalogueUrl}#page=60`}>catálogo de 2025, p. 60–61</a>.
            O planejamento de atendimento é definido com a editora.
          </p>
        </div>
      </section>
      <section className={s.section}>
        <div className="container">
          <SectionHeading
            eyebrow="Conexões que continuam"
            title="Da formação à prática pedagógica."
          >
            <TextLink href="/plataformas">
              Conheça os recursos digitais
            </TextLink>
          </SectionHeading>
          <div className={s.products}>
            {[
              "brincando-e-aprendendo",
              "novo-lendo-voce-fica-sabendo",
              "fluir-das-emocoes",
            ]
              .map((slug) => solutions.find((item) => item.slug === slug)!)
              .map((solution) => (
                <ProductCard key={solution.slug} solution={solution} />
              ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
