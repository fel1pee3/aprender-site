import Image from "next/image";
import Link from "next/link";
import { solutions } from "@/data/solutions";
import { articles } from "@/data/editorial";
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
              Materiais didáticos, formação de educadores e acompanhamento
              pedagógico para fazer a educação acontecer.
            </p>
            <div className={s.heroActions}>
              <Button href="/solucoes">Conhecer nossas soluções</Button>
              <Link href="/contato">
                Conversar com a Aprender <Icon name="arrow-up" size={17} />
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
                src="/images/hero.webp"
                alt="Educadoras compartilhando uma atividade durante formação registrada no catálogo da Aprender"
                width={1200}
                height={1400}
                priority
                sizes="(max-width: 767px) 90vw, 45vw"
              />
              <div className={s.photoLabel}>
                <span>Educar é construir possibilidades.</span>
                <Icon name="arrow-up" size={23} />
              </div>
            </div>
            <div className={s.since}>
              <span>desde</span>
              <strong>2005</strong>
              <span>aprendendo juntos</span>
            </div>
            <span className={s.verticalText}>
              ENCONTROS QUE TRANSFORMAM · ACERVO APRENDER
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
            <a href="/a-editora#trajetoria">
              Dados divulgados pela editora · 2025{" "}
              <Icon name="arrow-up" size={12} />
            </a>
          </div>
          <div>
            <strong>+ de 2 milhões</strong>
            <span>de estudantes utilizaram os materiais</span>
          </div>
          <div>
            <strong>+ de 100 mil</strong>
            <span>educadores e coordenadores nas formações</span>
          </div>
          <div>
            <strong>+ de 300</strong>
            <span>municípios atendidos em todo o Brasil</span>
          </div>
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
            description="Uma proposta que conecta materiais, pessoas e práticas. Porque ensinar e aprender são caminhos que se constroem juntos."
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
            description="Encontre propostas que conversam com o momento e as necessidades dos seus estudantes."
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
                <Icon name="arrow-up" size={22} />
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
              Conheça nossa forma de caminhar junto
            </TextLink>
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
