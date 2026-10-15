import Image from "next/image";
import Link from "next/link";
import { solutions } from "@/data/solutions";
import { articles } from "@/data/editorial";
import { institutionalIndicators } from "@/data/institutional";
import { testimonials } from "@/data/archive";
import content from "@/components/content.module.css";
import { Icon } from "@/components/Icon";
import {
  Button,
  ContactCTA,
  Eyebrow,
  ProductCard,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import s from "./home.module.css";

const pillars = [
  {
    icon: "book",
    name: "Materiais que inspiram",
    text: "Coleções semiestruturadas que abrem espaço para a prática e para a realidade de cada sala de aula.",
  },
  {
    icon: "people",
    name: "Formação que aproxima",
    text: "Conhecimento e troca de experiências para fortalecer o trabalho de professores e coordenadores.",
  },
  {
    icon: "leaf",
    name: "Presença que apoia",
    text: "Acompanhamento pedagógico para conectar o planejamento ao cotidiano da aprendizagem.",
  },
  {
    icon: "chart",
    name: "Avaliação que orienta",
    text: "Um olhar atento para o que os estudantes aprendem e para os próximos passos do ensino.",
  },
];
export default function Home() {
  const featured = solutions.filter((x) => x.featured).slice(0, 4);
  return (
    <>
      <section className={s.hero}>
        <div className={`container ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <Eyebrow>Compromisso com a Aprendizagem</Eyebrow>
            <h1>
              Aprendizagens
              <br />
              que transformam
              <br />
              <em>vidas.</em>
            </h1>
            <p>
              Ao lado de quem ensina.
              <br />
              Presente na vida de quem aprende.
            </p>
            <p className={s.heroDescription}>
              Alfabetização, materiais didáticos semiestruturados e formação
              contínua, com acompanhamento pedagógico para as redes de ensino.
            </p>
            <div className={s.heroActions}>
              <Button href="/solucoes">Conhecer nossas soluções</Button>
              <Link href="/contato">
                Conversar com a Aprender <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className={s.heroNote}>
              <span className={s.noteLine} />
              <span>Da Educação Infantil ao Ensino Fundamental.</span>
            </div>
          </div>
          <div className={s.heroVisual}>
            <div className={s.photoFrame}>
              <Image
                src="/images/formacao-professores.webp"
                alt="Educadoras estudam os livros e planejam atividades durante formação registrada no catálogo de 2025"
                width={1279}
                height={1340}
                priority
                sizes="(max-width: 767px) 90vw, 45vw"
              />
              <div className={s.photoLabel}>
                <span>Formação de educadores · acervo 2025</span>
              </div>
            </div>
            <div className={s.since}>
              <span>desde</span>
              <strong>2005</strong>
              <span>aprendendo juntos</span>
            </div>
            <span className={s.verticalText}>
              FORMAÇÃO DE EDUCADORES · CATÁLOGO 2025
            </span>
            <div className={s.heroDecoration} aria-hidden="true" />
          </div>
        </div>
      </section>
      <section className={s.evidence} aria-label="Trajetória em números">
        <div className={`container ${s.evidenceGrid}`}>
          <div className={s.evidenceTitle}>
            <span>Uma história construída</span>
            <strong>com muitas pessoas.</strong>
            <a href="/a-editora/trajetoria#indicadores">
              Dados divulgados pela editora · 2025{" "}
              <Icon name="arrow" size={12} />
            </a>
          </div>
          {institutionalIndicators.slice(0, 4).map((item) => (
            <div key={item.id}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className={s.approach}>
        <div className="container">
          <SectionHeading
            eyebrow="Educação se faz em conjunto"
            title={
              <>
                Muito além do livro.
                <br />
                Ao lado da aprendizagem.
              </>
            }
            description="Livros para organizar o ensino, formação para desenvolver a prática e acompanhamento para identificar as necessidades de cada turma."
          >
            <TextLink href="/a-editora">Conheça a Aprender</TextLink>
          </SectionHeading>
          <div className={s.pillars}>
            {pillars.map((p, i) => (
              <article key={p.name}>
                <div className={s.pillarTop}>
                  <Icon name={p.icon} size={29} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={s.solutions}>
        <div className="container">
          <SectionHeading
            eyebrow="Soluções educacionais"
            title={
              <>
                Para cada etapa,
                <br />
                novas descobertas.
              </>
            }
            description="Consulte livros, públicos, materiais de apoio e amostras de cada coleção."
          >
            <TextLink href="/solucoes">Explorar todas as soluções</TextLink>
          </SectionHeading>
          <div className={s.stageLinks}>
            {[
              {
                id: "infantil",
                name: "Educação Infantil",
                sub: "Brincar, conviver e descobrir",
              },
              {
                id: "anos-iniciais",
                name: "Anos iniciais",
                sub: "Ler, criar e ampliar o mundo",
              },
              {
                id: "anos-finais",
                name: "Anos finais",
                sub: "Aprofundar saberes e conexões",
              },
            ].map((stage, i) => (
              <Link key={stage.id} href={`/solucoes?etapa=${stage.id}`}>
                <span className={s.stageNumber}>0{i + 1}</span>
                <div>
                  <strong>{stage.name}</strong>
                  <span>{stage.sub}</span>
                </div>
                <Icon name="arrow" size={22} />
              </Link>
            ))}
          </div>
          <div className={s.collectionsHeading}>
            <h3>Coleções para conhecer</h3>
            <span>Ideias que ganham vida na sala de aula</span>
          </div>
          <div className={s.productGrid}>
            {featured.map((solution) => (
              <ProductCard solution={solution} key={solution.slug} />
            ))}
          </div>
        </div>
      </section>
      <section className={s.formation}>
        <div className={`container ${s.formationGrid}`}>
          <figure>
            <Image
              src="/images/formation.webp"
              alt="Encontro de formação de educadores com atividades coletivas em um espaço escolar"
              width={1589}
              height={1016}
              sizes="(max-width:767px) 90vw, 46vw"
            />
            <figcaption>
              Aprender também é compartilhar. Registro do acervo institucional.
            </figcaption>
            <div className={s.imageCorner} aria-hidden="true">
              <Icon name="people" size={34} />
            </div>
          </figure>
          <div>
            <Eyebrow>Quem ensina também aprende</Eyebrow>
            <h2>
              O cuidado com a educação começa com <em>quem educa.</em>
            </h2>
            <p>
              Uma coleção ganha novos sentidos nas mãos de um professor. Por
              isso, a formação contínua e o acompanhamento pedagógico fazem
              parte da proposta da Aprender.
            </p>
            <ul>
              <li>
                <Icon name="check" size={17} />
                Diálogo entre teoria e prática
              </li>
              <li>
                <Icon name="check" size={17} />
                Troca de experiências entre educadores
              </li>
              <li>
                <Icon name="check" size={17} />
                Acompanhamento do cotidiano escolar
              </li>
            </ul>
            <TextLink href="/formacao">
              Conheça o plano de formação e acompanhamento
            </TextLink>
          </div>
        </div>
      </section>
      <section className={`${content.section} ${content.soft}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Quem participa dessa história"
            title="Vozes das redes de ensino."
            description="Relatos preservados no acervo institucional. Cargos e experiências correspondem ao período de cada registro."
          >
            <TextLink href="/acervo#depoimentos">
              Consultar os nove depoimentos
            </TextLink>
          </SectionHeading>
          <div className={content.threeColumns}>
            {[testimonials[0], testimonials[2], testimonials[7]].map((item) => (
              <article key={item.id} className={content.testimonial}>
                <h3>{item.name}</h3>
                <p>
                  {item.location} · {item.role}
                </p>
                <p>{item.paragraphs[0]}</p>
                <TextLink href={`/acervo#${item.id}`}>
                  Ler relato e consultar original
                </TextLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={s.journal}>
        <div className="container">
          <SectionHeading
            eyebrow="Aprender em ação"
            title="Histórias que nos movem."
          >
            <TextLink href="/em-acao">Ver histórias e registros</TextLink>
          </SectionHeading>
          <div className={s.articleGrid}>
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/em-acao/${article.slug}`}
                className={s.articleCard}
              >
                <div className={s.articleImage}>
                  <Image
                    src={article.image}
                    alt=""
                    width={600}
                    height={400}
                    sizes="(max-width:767px) 90vw, 30vw"
                  />
                </div>
                <div className={s.articleMeta}>
                  <span>{article.type}</span>
                  <span>{article.dateLabel}</span>
                </div>
                <h3>{article.title}</h3>
                <span className={s.readArticle}>
                  Ler a história <Icon name="arrow" size={17} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
