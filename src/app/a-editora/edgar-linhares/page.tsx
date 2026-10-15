import { getTranslator } from "@/i18n/server";
import Image from "@/components/AssetImage";
import { pageMetadata } from "@/lib/metadata";
import { edgar } from "@/data/institutional";
import { PageIntro, TextLink } from "@/components/ui";
import { ReadingNav } from "@/components/ReadingNav";
import s from "@/components/content.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Professor Edgar Linhares"),
        description: t("A trajetória de Edgar Linhares Lima, sua contribuição à alfabetização em Sobral e referências sobre a experiência educacional."),
        path: "/a-editora/edgar-linhares",
        image: edgar.image
    }, t.locale);
}
export default async function EdgarPage() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("Memória institucional")} title={t(edgar.title)} description={t("Educador, especialista em leitura e participante da construção de políticas públicas de alfabetização no Ceará.")}/>
      <div className="container">
        <ReadingNav current="/a-editora/edgar-linhares"/>
      </div>
      <section className={s.section}>
        <div className={`container ${s.twoColumns}`}>
          <div className={s.prose}>
            <h2 className={s.heading}>{t("Uma vida dedicada \u00E0 educa\u00E7\u00E3o.")}</h2>
            {edgar.paragraphs.map((p) => (<p key={p}>{t(p)}</p>))}
          </div>
          <figure className={s.photo}>
            <Image src={edgar.image} width={275} height={370} alt={t("Retrato do professor Edgar Linhares Lima no acervo institucional da Aprender")} style={{ height: "auto", maxWidth: 275, objectFit: "contain" }}/>
            <figcaption>{t("Retrato da apresenta\u00E7\u00E3o institucional de Edgar Linhares. ")}</figcaption>
          </figure>
        </div>
      </section>
      <section id="referencias" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>{t("Refer\u00EAncias e leituras.")}</h2>
          <div className={s.prose}>
            <ul>
              {edgar.references.map((ref) => (<li key={ref.url}>
                  <p>
                    <a href={t.href(ref.url)} target="_blank" rel="noopener noreferrer">
                      {t(ref.title)}<span className="sr-only">{t(" (abre em nova aba)")}</span></a>
                  </p>
                </li>))}
            </ul>
            <TextLink href={t.href("/a-editora/trajetoria")}>{t("A trajet\u00F3ria da Aprender ")}</TextLink>
          </div>
        </div>
      </section>
    </>);
}
