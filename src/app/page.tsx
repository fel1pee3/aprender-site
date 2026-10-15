import { getTranslator } from "@/i18n/server";
import Image from "@/components/AssetImage";
import Link from "@/i18n/Link";
import { solutions } from "@/data/solutions";
import { articles } from "@/data/editorial";
import { institutionalIndicators } from "@/data/institutional";
import { testimonials } from "@/data/archive";
import content from "@/components/content.module.css";
import { Icon } from "@/components/Icon";
import { SectionMotion } from "@/components/SectionMotion";
import { Button, ContactCTA, Eyebrow, ProductCard, SectionHeading, TextLink, } from "@/components/ui";
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
export default async function Home() {
    const t = await getTranslator();
    const featured = solutions.filter((x) => x.featured).slice(0, 4);
    return (<>
      <SectionMotion />
      <section className={s.hero} aria-labelledby="home-title">
        <div className={`container ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <Eyebrow>{t("Alfabetiza\u00E7\u00E3o e educa\u00E7\u00E3o b\u00E1sica")}</Eyebrow>
            <h1 id="home-title">{t("Materiais e forma\u00E7\u00E3o para ")}<em>{t("aprender.")}</em>
            </h1>
            <p className={s.heroDescription}>{t("Livros para alfabetizar e ensinar. Forma\u00E7\u00E3o de educadores e acompanhamento pedag\u00F3gico das redes, da Educa\u00E7\u00E3o Infantil ao Ensino Fundamental. ")}</p>
            <div className={s.heroActions}>
              <Button href={t.href("/solucoes")}>{t("Explorar solu\u00E7\u00F5es")}</Button>
              <Button href={t.href("/formacao")} secondary>{t("Conhecer a forma\u00E7\u00E3o")}</Button>
            </div>
            <div className={s.heroNote}>
              <span className={s.noteLine}/>
              <span>{t("Ao lado de quem ensina. Desde 2005.")}</span>
            </div>
          </div>
          <div className={s.heroVisual}>
            <figure className={s.photoFrame}>
              <Image src="/images/formacao-professores.webp" alt={t("Educadoras estudam os livros e planejam atividades durante formação registrada no catálogo de 2025")} width={1279} height={1340} preload sizes="(max-width: 767px) 90vw, (max-width: 1100px) 44vw, 515px"/>
              <figcaption className={s.photoLabel}>
                <span>{t("Forma\u00E7\u00E3o de educadores \u00B7 acervo 2025")}</span>
              </figcaption>
            </figure>
            <Link href={t.href("/solucoes/lendo-e-escrevendo")} className={s.materialNote}>
              <Image src="/images/materials/primary-lendo-kit-3.webp" alt={t("Livros da criança, do professor e da família da coleção Lendo e Escrevendo")} width={695} height={610} sizes="(max-width:767px) 140px, 180px"/>
              <span className={s.materialCopy}>
                <span>{t("Educa\u00E7\u00E3o Infantil")}</span>
                <strong>{t("Lendo e Escrevendo")}</strong>
                <span className={s.materialAction}>{t("Conhecer os materiais ")}<Icon name="arrow" size={17}/></span>
              </span>
            </Link>
            <div className={s.heroDecoration} aria-hidden="true"/>
          </div>
        </div>
      </section>
      <section className={s.evidence} aria-label={t("Trajetória em números")}>
        <div className={`container ${s.evidenceGrid}`}>
          <div className={s.evidenceTitle}>
            <span>{t("Uma hist\u00F3ria constru\u00EDda")}</span>
            <strong>{t("com muitas pessoas.")}</strong>
            <a href={t.href("/a-editora/trajetoria#indicadores")}>{t("Indicadores acumulados \u00B7 cat\u00E1logo 2025")}{t(" ")}
              <Icon name="arrow" size={12}/>
            </a>
          </div>
          {institutionalIndicators.slice(0, 4).map((item) => (<div key={item.id}>
              <strong>{t(item.value)}</strong>
              <span>{t(item.label)}</span>
            </div>))}
        </div>
      </section>
      <section className={s.approach} data-reveal>
        <div className="container">
          <SectionHeading eyebrow={t("Educação se faz em conjunto")} title={<>{t("Muito al\u00E9m do livro. ")}<br />{t("Ao lado da aprendizagem. ")}</>} description={t("Livros para organizar o ensino, formação para desenvolver a prática e acompanhamento para identificar as necessidades de cada turma.")}>
            <TextLink href={t.href("/a-editora")}>{t("Conhe\u00E7a a Aprender")}</TextLink>
          </SectionHeading>
          <div className={s.pillars}>
            {pillars.map((p, i) => (<article key={p.name}>
                <div className={s.pillarTop}>
                  <Icon name={p.icon} size={29}/>
                  <span>{t("0")}{t(i + 1)}</span>
                </div>
                <h3>{t(p.name)}</h3>
                <p>{t(p.text)}</p>
              </article>))}
          </div>
        </div>
      </section>
      <section className={s.solutions}>
        <div className="container">
          <SectionHeading eyebrow={t("Soluções educacionais")} title={<>{t("Para cada etapa, ")}<br />{t("novas descobertas. ")}</>} description={t("Consulte livros, públicos, materiais de apoio e amostras de cada coleção.")}>
            <TextLink href={t.href("/solucoes")}>{t("Explorar todas as solu\u00E7\u00F5es")}</TextLink>
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
        ].map((stage, i) => (<Link key={stage.id} href={t.href(`/solucoes?etapa=${stage.id}`)}>
                <span className={s.stageNumber}>{t("0")}{t(i + 1)}</span>
                <div>
                  <strong>{t(stage.name)}</strong>
                  <span>{t(stage.sub)}</span>
                </div>
                <Icon name="arrow" size={22}/>
              </Link>))}
          </div>
          <div className={s.collectionsHeading}>
            <h3>{t("Cole\u00E7\u00F5es para conhecer")}</h3>
            <span>{t("Ideias que ganham vida na sala de aula")}</span>
          </div>
          <div className={s.productGrid}>
            {featured.map((solution) => (<ProductCard solution={t.data(solution)} key={solution.slug}/>))}
          </div>
        </div>
      </section>
      <section className={s.formation} data-reveal>
        <div className={`container ${s.formationGrid}`}>
          <figure>
            <Image src="/images/formation.webp" alt={t("Encontro de formação de educadores com atividades coletivas em um espaço escolar")} width={1589} height={1016} sizes="(max-width:767px) 90vw, 46vw"/>
            <figcaption>{t("Aprender tamb\u00E9m \u00E9 compartilhar. Registro do acervo institucional. ")}</figcaption>
            <div className={s.imageCorner} aria-hidden="true">
              <Icon name="people" size={34}/>
            </div>
          </figure>
          <div>
            <Eyebrow>{t("Quem ensina tamb\u00E9m aprende")}</Eyebrow>
            <h2>{t("O cuidado com a educa\u00E7\u00E3o come\u00E7a com ")}<em>{t("quem educa.")}</em>
            </h2>
            <p>{t("Uma cole\u00E7\u00E3o ganha novos sentidos nas m\u00E3os de um professor. Por isso, a forma\u00E7\u00E3o cont\u00EDnua e o acompanhamento pedag\u00F3gico fazem parte da proposta da Aprender. ")}</p>
            <ul>
              <li>
                <Icon name="check" size={17}/>{t("Di\u00E1logo entre teoria e pr\u00E1tica ")}</li>
              <li>
                <Icon name="check" size={17}/>{t("Troca de experi\u00EAncias entre educadores ")}</li>
              <li>
                <Icon name="check" size={17}/>{t("Acompanhamento do cotidiano escolar ")}</li>
            </ul>
            <TextLink href={t.href("/formacao")}>{t("Conhe\u00E7a o plano de forma\u00E7\u00E3o e acompanhamento ")}</TextLink>
          </div>
        </div>
      </section>
      <section className={`${content.section} ${content.soft}`}>
        <div className="container">
          <SectionHeading eyebrow={t("Quem participa dessa história")} title={t("Vozes das redes de ensino.")} description={t("Relatos preservados no acervo institucional. Cargos e experiências correspondem ao período de cada registro.")}>
            <TextLink href={t.href("/acervo#depoimentos")}>{t("Consultar os nove depoimentos ")}</TextLink>
          </SectionHeading>
          <div className={content.threeColumns}>
            {[testimonials[0], testimonials[2], testimonials[7]].map((item) => (<article key={item.id} className={content.testimonial}>
                <h3>{t(item.name)}</h3>
                <p>
                  {t(item.location)}{t(" \u00B7 ")}{t(item.role)}
                </p>
                <p>{t(item.paragraphs[0])}</p>
                <TextLink href={t.href(`/acervo#${item.id}`)}>{t("Ler depoimento completo ")}</TextLink>
              </article>))}
          </div>
        </div>
      </section>
      <section className={s.journal} data-reveal>
        <div className="container">
          <SectionHeading eyebrow={t("Aprender em ação")} title={t("Histórias que nos movem.")}>
            <TextLink href={t.href("/em-acao")}>{t("Ver hist\u00F3rias e registros")}</TextLink>
          </SectionHeading>
          <div className={s.articleGrid}>
            {articles.slice(0, 3).map((article) => (<Link key={article.slug} href={t.href(`/em-acao/${article.slug}`)} className={s.articleCard}>
                <div className={s.articleImage}>
                  <Image src={article.image} alt={t("")} width={600} height={400} sizes="(max-width:767px) 90vw, 30vw"/>
                </div>
                <div className={s.articleMeta}>
                  <span>{t(article.type)}</span>
                  <span>{t(article.dateLabel)}</span>
                </div>
                <h3>{t(article.title)}</h3>
                <span className={s.readArticle}>{t("Ler a hist\u00F3ria ")}<Icon name="arrow" size={17}/>
                </span>
              </Link>))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>);
}
