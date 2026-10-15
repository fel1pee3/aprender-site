import { pageMetadata } from "@/lib/metadata";
import {
  timeline,
  institutionalIndicators,
  indicatorContext,
} from "@/data/institutional";
import { PageIntro, ContactCTA, TextLink } from "@/components/ui";
import { ReadingNav } from "@/components/ReadingNav";
import s from "@/components/content.module.css";
export const metadata = pageMetadata({
  title: "Trajetória e indicadores",
  description:
    "Da experiência de alfabetização em Sobral à Aprender Editora: história, participação no PAIC e indicadores com suas fontes e períodos.",
  path: "/a-editora/trajetoria",
  image: "/images/history.webp",
});
export default function Trajectory() {
  return (
    <>
      <PageIntro
        eyebrow="Nossa trajetória"
        title="Uma história construída com a educação pública."
        description="A experiência municipal de Sobral antecede a fundação da Aprender. Conheça os marcos dessa trajetória e os contextos de cada período."
      />
      <div className="container">
        <ReadingNav current="/a-editora/trajetoria" />
      </div>
      <section className={s.section}>
        <div className="container">
          <div className={s.prose}>
            {timeline.map((item) => (
              <article id={item.id} key={item.id} className={s.historyItem}>
                <span>{item.period}</span>
                <h2>{item.title}</h2>
                {item.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className={s.source}>
                  <a href={item.sourceUrl}>Fonte deste marco</a>
                </p>
              </article>
            ))}
          </div>
          <TextLink href="/a-editora/paic">
            Participação no PAIC e resultados das redes
          </TextLink>
        </div>
      </section>
      <section id="indicadores" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>A trajetória em números.</h2>
          <p className={s.note}>
            Acumulados divulgados pela editora no catálogo comemorativo de 2025,
            página 5.
          </p>
          <div className={s.metricGrid}>
            {institutionalIndicators.slice(0, 4).map((item) => (
              <article id={item.id} key={item.id} className={s.metric}>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
                <a className={s.source} href={item.sourceUrl}>
                  {item.edition}
                </a>
              </article>
            ))}
          </div>
          <p className={s.notice}>{indicatorContext}</p>
          <details id="indicadores-historicos" className={s.accordion} open>
            <summary>Outros períodos e definições</summary>
            <div className={s.twoColumns}>
              {institutionalIndicators.slice(4).map((item) => (
                <article key={item.id} id={item.id} className={s.metric}>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                  <a className={s.source} href={item.sourceUrl}>
                    {item.edition}
                  </a>
                </article>
              ))}
            </div>
          </details>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
