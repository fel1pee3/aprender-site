import { getTranslator } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { platforms } from "@/data/editorial";
import { Button, ContactCTA, PageIntro } from "@/components/ui";
import { Icon } from "@/components/Icon";
import s from "../inner.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Plataformas digitais"),
        description: t("Conheça Aprender Formar e Aprender Avaliar: recursos digitais de apoio à formação dos educadores e à análise da aprendizagem."),
        path: "/plataformas"
    }, t.locale);
}
export default async function Platforms() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("Plataformas digitais")} breadcrumb={t("Plataformas")} title={<>{t("Tecnologia que aproxima ")}<br />{t("o olhar da aprendizagem. ")}</>} description={t("Ambientes de apoio aos projetos da Aprender, conectando educadores, materiais de formação e informações sobre a aprendizagem.")}/>
      <section className={s.section}>
        <div className="container">
          {platforms.map((platform, i) => (<article className={s.platform} key={platform.name}>
              <div className={s.platformIcon}>
                <Icon name={i === 0 ? "people" : "chart"} size={37}/>
              </div>
              <div>
                <h2>{t(platform.name)}</h2>
                <p>{t(platform.description)}</p>
              </div>
              <div>
                <ul className={s.checkList}>
                  {platform.features.map((feature) => (<li key={feature}>
                      <Icon name="check" size={18}/>
                      {t(feature)}
                    </li>))}
                </ul>
                <Button href={t.href(platform.url)} external>{t("Acessar ")}{t(platform.name)}
                </Button>
                <p className={s.notice}>{t("O acesso requer as credenciais fornecidas aos participantes.")}</p>
              </div>
            </article>))}
          <div className={s.callout}>
            <h3>{t("Precisa de orienta\u00E7\u00E3o para acessar?")}</h3>
            <p>{t("Converse com a equipe da Aprender sobre sua participa\u00E7\u00E3o e as orienta\u00E7\u00F5es de acesso. ")}<a href={t.href("/contato")}>{t("Ir para contato")}</a>{t(". ")}</p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>);
}
