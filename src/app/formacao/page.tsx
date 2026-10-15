import { getTranslator } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import Image from "@/components/AssetImage";
import { solutions } from "@/data/solutions";
import { formationAxes, formationPlan, formationFoundation, } from "@/data/institutional";
import { ContactCTA, Eyebrow, PageIntro, ProductCard, SectionHeading, TextLink, } from "@/components/ui";
import s from "../inner.module.css";
import content from "@/components/content.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Formação e acompanhamento"),
        description: t("Formação contínua, encontros entre educadores e acompanhamento pedagógico conectados aos materiais didáticos da Aprender Editora."),
        path: "/formacao"
    }, t.locale);
}
export default async function Formation() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("Formação e acompanhamento")} breadcrumb={t("Formação")} title={<>{t("Quem ensina tamb\u00E9m precisa ")}<br />{t("de espa\u00E7o para aprender. ")}</>} description={t("Formação contínua, planejamento, avaliação e acompanhamento em sala: apoio ao professor para transformar os materiais em práticas de aprendizagem.")}/>
      <div className="container">
        <nav className={content.index} aria-label={t("Seções de formação")}>
          <a href={t.href("#proposta")}>{t("A proposta")}</a>
          <a href={t.href("#eixos")}>{t("Cinco eixos")}</a>
          <a href={t.href("#plano-de-acao")}>{t("Plano de a\u00E7\u00E3o")}</a>
          <a href={t.href("/acervo#formacoes")}>{t("Galeria de forma\u00E7\u00F5es")}</a>
          <a href={t.href("#solucoes")}>{t("Materiais e forma\u00E7\u00E3o")}</a>
        </nav>
      </div>
      <section id="proposta" className={s.section}>
        <div className={`container ${s.split}`}>
          <figure className={s.figure}>
            <Image src="/images/formation.webp" alt={t("Educadores participam de uma atividade coletiva de formação")} width={1589} height={1016} priority sizes="(max-width:767px) 90vw, 45vw"/>
            <figcaption>{t("Registro de forma\u00E7\u00E3o do acervo da Aprender. Cat\u00E1logo de 2025, p. 61. ")}</figcaption>
          </figure>
          <div>
            <Eyebrow>{t("Conhecimento compartilhado")}</Eyebrow>
            <h2 className={s.editorialTitle}>{t("O estudo ganha sentido ")}<br />{t("na pr\u00E1tica pedag\u00F3gica. ")}</h2>
            <div className={s.copy}>
              <p>{t("Os materiais da Aprender s\u00E3o acompanhados por propostas de forma\u00E7\u00E3o que valorizam o professor e a intencionalidade de suas escolhas. Os encontros abordam pr\u00E1tica pedag\u00F3gica, fundamentos te\u00F3ricos, planejamento, gest\u00E3o da sala de aula e avalia\u00E7\u00E3o. ")}</p>
              <p>{t("As modalidades e cargas hor\u00E1rias variam conforme a cole\u00E7\u00E3o. As p\u00E1ginas das solu\u00E7\u00F5es apresentam as atividades e os apoios de cada proposta, para orientar o planejamento com sua equipe. ")}</p>
            </div>
            <TextLink href={t.href("/contato")}>{t("Converse sobre a forma\u00E7\u00E3o para sua rede ")}</TextLink>
          </div>
        </div>
      </section>
      <section id="eixos" className={s.softSection}>
        <div className="container">
          <SectionHeading eyebrow={t("A estrutura da formação")} title={t("Cinco eixos que se complementam.")} description={t("A proposta articula conhecimentos científicos, experiências em sala e leitura crítica dos resultados. Os eixos orientam o estudo e o desenvolvimento da prática docente.")}/>
          <div className={content.threeColumns}>
            {formationAxes.map((item, i) => (<article key={item.id} className={content.testimonial}>
                <span className={content.editionBadge}>{t("Eixo 0")}{t(i + 1)}</span>
                <h3>{t(item.title)}</h3>
                <p>{t(item.description)}</p>
              </article>))}
          </div>
          <details id="fundamentacao-projeto" className={content.accordion}>
            <summary>{t("A rela\u00E7\u00E3o entre forma\u00E7\u00E3o e materiais semiestruturados ")}</summary>
            <div className={content.prose}>
              {formationFoundation.paragraphs.map((paragraph) => (<p key={paragraph}>{t(paragraph)}</p>))}
              <p className={content.source}>
                {t(formationFoundation.edition)}{t(". ")}</p>
              <TextLink href={t.href("/solucoes/novo-lendo-voce-fica-sabendo")}>{t("Conhecer os materiais do projeto ")}</TextLink>
            </div>
          </details>
        </div>
      </section>
      <section id="plano-de-acao" className={content.section}>
        <div className="container">
          <SectionHeading eyebrow={t("Da formação ao acompanhamento")} title={t("Um plano de ação junto à escola.")} description={t("Professores, coordenadores e gestores participam de três frentes complementares de estudo, acompanhamento e avaliação.")}/>
          <div className={content.prose}>
            {formationPlan.map((group, index) => (<section className={content.edition} key={group.id} aria-labelledby={`plan-${group.id}`}>
                <span className={content.editionBadge}>{t("Frente 0")}{t(index + 1)}
                </span>
                <h3 id={`plan-${group.id}`}>{t(group.title)}</h3>
                <p className={content.paragraph}>{t(group.description)}</p>
                <ul className={content.paragraph} style={{ paddingLeft: 22 }}>
                  {group.items.map((item) => (<li key={item} style={{ marginBottom: 12 }}>
                      {t(item)}
                    </li>))}
                </ul>
              </section>))}
          </div>
          <p className={s.sourceNote}>{t("Proposta de forma\u00E7\u00E3o da Aprender, apresentada tamb\u00E9m no cat\u00E1logo de 2025. O planejamento de atendimento \u00E9 definido com a editora. ")}</p>
          <TextLink href={t.href("/acervo#formacoes")}>{t("Ver registros de forma\u00E7\u00E3o nos munic\u00EDpios ")}</TextLink>
        </div>
      </section>
      <section id="solucoes" className={s.section}>
        <div className="container">
          <SectionHeading eyebrow={t("Conexões que continuam")} title={t("Da formação à prática pedagógica.")}>
            <TextLink href={t.href("/plataformas")}>{t("Conhe\u00E7a os recursos digitais ")}</TextLink>
          </SectionHeading>
          <div className={s.products}>
            {[
            "brincando-e-aprendendo",
            "novo-lendo-voce-fica-sabendo",
            "fluir-das-emocoes",
        ]
            .map((slug) => solutions.find((item) => item.slug === slug)!)
            .map((solution) => (<ProductCard key={solution.slug} solution={t.data(solution)}/>))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>);
}
