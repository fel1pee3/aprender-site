import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { solutions } from "@/data/solutions";
import { catalogueUrl } from "@/data/editorial";
import {
  formationAxes,
  formationPlan,
  formationFoundation,
} from "@/data/institutional";
import {
  ContactCTA,
  Eyebrow,
  PageIntro,
  ProductCard,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import s from "../inner.module.css";
import content from "@/components/content.module.css";
export const metadata = pageMetadata({
  title: "Formação e acompanhamento",
  description:
    "Formação contínua, encontros entre educadores e acompanhamento pedagógico conectados aos materiais didáticos da Aprender Editora.",
  path: "/formacao",
});
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
        description="Formação contínua, planejamento, avaliação e acompanhamento em sala: apoio ao professor para transformar os materiais em práticas de aprendizagem."
      />
      <div className="container">
        <nav className={content.index} aria-label="Seções de formação">
          <a href="#proposta">A proposta</a>
          <a href="#eixos">Cinco eixos</a>
          <a href="#plano-de-acao">Plano de ação</a>
          <a href="/acervo#formacoes">Galeria de formações</a>
          <a href="#solucoes">Materiais e formação</a>
        </nav>
      </div>
      <section id="proposta" className={s.section}>
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
              O estudo ganha sentido
              <br />
              na prática pedagógica.
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
      <section id="eixos" className={s.softSection}>
        <div className="container">
          <SectionHeading
            eyebrow="A estrutura da formação"
            title="Cinco eixos que se complementam."
            description="A proposta articula conhecimentos científicos, experiências em sala e leitura crítica dos resultados. Os eixos orientam o estudo e o desenvolvimento da prática docente."
          />
          <div className={content.threeColumns}>
            {formationAxes.map((item, i) => (
              <article key={item.id} className={content.testimonial}>
                <span className={content.editionBadge}>Eixo 0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <p className={content.source}>
            Estrutura documentada na{" "}
            <a href="https://www.aprendereditora.com.br/trajetorias-lendo-voce-fica-sabendo">
              apresentação do Projeto Lendo Você Fica Sabendo
            </a>{" "}
            e no{" "}
            <a href="https://www.aprendereditora.com.br/aprender-em-acao">
              plano institucional de formação
            </a>
            .
          </p>
          <details id="fundamentacao-projeto" className={content.accordion}>
            <summary>
              A relação entre formação e materiais semiestruturados
            </summary>
            <div className={content.prose}>
              {formationFoundation.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className={content.source}>
                {formationFoundation.edition} ·{" "}
                <a href={formationFoundation.sourceUrl}>
                  Consultar apresentação original
                </a>
                .
              </p>
            </div>
          </details>
        </div>
      </section>
      <section id="plano-de-acao" className={content.section}>
        <div className="container">
          <SectionHeading
            eyebrow="Da formação ao acompanhamento"
            title="Um plano de ação junto à escola."
            description="O plano institucional organiza o atendimento em três frentes complementares. Conheça as atividades documentadas pela Aprender."
          />
          <div className={content.prose}>
            {formationPlan.map((group, index) => (
              <section
                className={content.edition}
                key={group.id}
                aria-labelledby={`plan-${group.id}`}
              >
                <span className={content.editionBadge}>
                  Frente 0{index + 1}
                </span>
                <h3 id={`plan-${group.id}`}>{group.title}</h3>
                <p className={content.paragraph}>{group.description}</p>
                <ul className={content.paragraph} style={{ paddingLeft: 22 }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ marginBottom: 12 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
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
          <TextLink href="/acervo#formacoes">
            Ver nove fotografias de formação em sete municípios
          </TextLink>
        </div>
      </section>
      <section id="solucoes" className={s.section}>
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
