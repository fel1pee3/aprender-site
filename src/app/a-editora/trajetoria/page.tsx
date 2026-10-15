import { getTranslator } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { timeline, institutionalIndicators, indicatorContext, } from "@/data/institutional";
import { PageIntro, ContactCTA, TextLink } from "@/components/ui";
import { ReadingNav } from "@/components/ReadingNav";
import s from "@/components/content.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Trajetória e indicadores"),
        description: t("Da experiência de alfabetização em Sobral à Aprender Editora: história, participação no PAIC e indicadores com suas fontes e períodos."),
        path: "/a-editora/trajetoria",
        image: "/images/history.webp"
    }, t.locale);
}
export default async function Trajectory() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("Nossa trajetória")} title={t("Uma história construída com a educação pública.")} description={t("A experiência municipal de Sobral antecede a fundação da Aprender. Conheça os marcos dessa trajetória e os contextos de cada período.")}/>
      <div className="container">
        <ReadingNav current="/a-editora/trajetoria"/>
      </div>
      <section className={s.section}>
        <div className="container">
          <div className={s.prose}>
            {timeline.map((item) => (<article id={item.id} key={item.id} className={s.historyItem}>
                <span>{t(item.period)}</span>
                <h2>{t(item.title)}</h2>
                {item.paragraphs.map((p) => (<p key={p}>{t(p)}</p>))}
              </article>))}
          </div>
          <TextLink href={t.href("/a-editora/paic")}>{t("Participa\u00E7\u00E3o no PAIC e resultados das redes ")}</TextLink>
        </div>
      </section>
      <section id="indicadores" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>{t("A trajet\u00F3ria em n\u00FAmeros.")}</h2>
          <p className={s.note}>{t("Acumulados divulgados pela editora no cat\u00E1logo comemorativo de 2025, p\u00E1gina 5. ")}</p>
          <div className={s.metricGrid}>
            {institutionalIndicators.slice(0, 4).map((item) => (<article id={item.id} key={item.id} className={s.metric}>
                <strong>{t(item.value)}</strong>
                <p>{t(item.label)}</p>
                <span className={s.source}>
                  {t(item.edition)}
                </span>
              </article>))}
          </div>
          <p className={s.notice}>{t(indicatorContext)}</p>
          <details id="indicadores-historicos" className={s.accordion} open>
            <summary>{t("Outros per\u00EDodos e defini\u00E7\u00F5es")}</summary>
            <div className={s.twoColumns}>
              {institutionalIndicators.slice(4).map((item) => (<article key={item.id} id={item.id} className={s.metric}>
                  <strong>{t(item.value)}</strong>
                  <p>{t(item.label)}</p>
                  <span className={s.source}>
                    {t(item.edition)}
                  </span>
                </article>))}
            </div>
          </details>
        </div>
      </section>
      <ContactCTA />
    </>);
}
