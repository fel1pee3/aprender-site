import { getTranslator } from "@/i18n/server";
import Image from "@/components/AssetImage";
import { pageMetadata } from "@/lib/metadata";
import { missionVersions, institutionalValues, team, } from "@/data/institutional";
import { ContactCTA, PageIntro, TextLink } from "@/components/ui";
import { ReadingNav } from "@/components/ReadingNav";
import s from "@/components/content.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("A editora"),
        description: t("Missão, sete valores e equipe da Aprender Editora. Materiais, formação e acompanhamento da aprendizagem desde 2005."),
        path: "/a-editora"
    }, t.locale);
}
export default async function About() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("A editora")} title={<>{t("Compromisso com a aprendizagem. ")}<br />{t("Desde 2005. ")}</>} description={t("Materiais didáticos, formação de educadores e acompanhamento pedagógico, com raízes na experiência de alfabetização do Ceará.")}/>
      <div className="container">
        <ReadingNav current="/a-editora"/>
      </div>
      <section id="equipe" className={s.section}>
        <div className={`container ${s.twoColumns}`}>
          <div className={s.prose}>
            <h2 className={s.heading}>{t("Uma equipe dedicada a ensinar e aprender. ")}</h2>
            <p>{t(team.intro)}</p>
            <p>{t("Especializa\u00E7\u00F5es: ")}{team.specializations.map((item) => t(item)).join(", ")}{t(".")}</p>
            {team.approach.map((p) => (<p key={p}>{t(p)}</p>))}
          </div>
          <figure className={s.photo}>
            <Image src="/images/formation.webp" alt={t("Educadores participam de uma atividade coletiva de formação")} width={1589} height={1016} sizes="(max-width:600px) 90vw, 45vw" style={{ height: "auto" }}/>
            <figcaption>{t("Forma\u00E7\u00E3o de educadores \u00B7 acervo do cat\u00E1logo institucional de 2025, p. 61. Data do encontro n\u00E3o informada. ")}</figcaption>
          </figure>
        </div>
      </section>
      <section id="missao" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <div className={s.prose}>
            <h2 className={s.heading}>{t("Nossa miss\u00E3o")}</h2>
            <span className={s.editionBadge}>{t(missionVersions[0].edition)}</span>
            <p>{t(missionVersions[0].text)}</p>
            <details id={missionVersions[1].id} className={s.accordion}>
              <summary>{t(missionVersions[1].title)}</summary>
              <div>
                <p>{t(missionVersions[1].text)}</p>
                <p>{t(missionVersions[1].note)}</p>
              </div>
            </details>
          </div>
        </div>
      </section>
      <section id="valores" className={s.section}>
        <div className="container">
          <h2 className={s.heading}>{t("Sete valores que orientam nosso trabalho. ")}</h2>
          <p className={s.note}>{t("Declara\u00E7\u00F5es do cat\u00E1logo institucional de 2025. Cada valor tamb\u00E9m re\u00FAne a abordagem da apresenta\u00E7\u00E3o hist\u00F3rica da editora. ")}</p>
          <div className={s.twoColumns}>
            {institutionalValues.map((value) => (<article id={value.id} key={value.id} className={s.prose}>
                <h3 className={s.subheading}>{t(value.title)}</h3>
                <p>{t(value.description)}</p>
                <details className={s.accordion}>
                  <summary>{t("Apresenta\u00E7\u00E3o hist\u00F3rica deste valor")}</summary>
                  <div>
                    <p>{t(value.historicalDescription)}</p>
                    <p className={s.note}>{t("Registro institucional sem data de edi\u00E7\u00E3o.")}</p>
                  </div>
                </details>
              </article>))}
          </div>
        </div>
      </section>
      <section id="trajetoria" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>{t("Conhe\u00E7a nossa hist\u00F3ria.")}</h2>
          <div className={s.threeColumns}>
            <article className={s.linkCard}>
              <h3>{t("De Sobral \u00E0 Aprender")}</h3>
              <p>{t("O diagn\u00F3stico de leitura, a equipe de educadoras e a origem da editora em Fortaleza. ")}</p>
              <TextLink href={t.href("/a-editora/trajetoria")}>{t("Ler a trajet\u00F3ria")}</TextLink>
            </article>
            <article className={s.linkCard}>
              <h3>{t("Edgar Linhares")}</h3>
              <p>{t("A contribui\u00E7\u00E3o do educador \u00E0s pol\u00EDticas de alfabetiza\u00E7\u00E3o e \u00E0 forma\u00E7\u00E3o de professores. ")}</p>
              <TextLink href={t.href("/a-editora/edgar-linhares")}>{t("Conhecer o educador ")}</TextLink>
            </article>
            <article className={s.linkCard}>
              <h3>{t("PAIC e resultados")}</h3>
              <p>{t("Participa\u00E7\u00E3o da editora, mapas, s\u00E9ries hist\u00F3ricas e resultados das redes p\u00FAblicas. ")}</p>
              <TextLink href={t.href("/a-editora/paic")}>{t("Consultar o acervo")}</TextLink>
            </article>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>);
}
