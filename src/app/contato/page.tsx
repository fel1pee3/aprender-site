import { getTranslator } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { contact } from "@/data/editorial";
import { socialLinks } from "@/data/archive";
import s from "../inner.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Vamos conversar"),
        description: t("Converse com a Aprender Editora sobre materiais, formação e acompanhamento para sua rede. Prepare sua mensagem ou use os canais institucionais."),
        path: "/contato"
    }, t.locale);
}
export default async function Contact() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("Vamos conversar")} breadcrumb={t("Contato")} title={<>{t("Toda parceria come\u00E7a ")}<br />{t("com uma boa conversa. ")}</>} description={t("Informe sua instituição e os materiais ou a formação de que sua rede precisa. Prepare uma mensagem ou use os canais públicos da editora.")}/>
      <section className={s.section}>
        <div className={`container ${s.contactGrid}`}>
          <aside className={s.contactAside}>
            <h2>{t("Estamos por aqui.")}</h2>
            <div className={s.contactDetail}>
              <Icon name="phone"/>
              <div>
                <h3>{t("Telefone")}</h3>
                <a href={t.href(contact.phoneHref)}>{t(contact.phone)}</a>
              </div>
            </div>
            <div className={s.contactDetail}>
              <Icon name="mail"/>
              <div>
                <h3>{t("E-mail")}</h3>
                <a href={t.href(`mailto:${contact.email}`)}>{t(contact.email)}</a>
              </div>
            </div>
            <div className={s.contactDetail}>
              <Icon name="pin"/>
              <div>
                <h3>{t("Fortaleza, Cear\u00E1")}</h3>
                <p>
                  {t(contact.address)}
                  <br />
                  {t(contact.city)}{t(" \u00B7 CEP ")}{t(contact.postalCode)}
                </p>
              </div>
            </div>
            <div className={s.contactDetail}>
              <Icon name="external"/>
              <div>
                <h3>{t("Outros canais")}</h3>
                {socialLinks.map((social) => (<p key={social.id}>
                    <a href={t.href(social.url)} target="_blank" rel="noopener noreferrer">
                      {t(social.name)}{t(" da Aprender")}<span className="sr-only">{t(" (abre em nova aba)")}</span></a>
                  </p>))}
              </div>
            </div>
            <p>{t("Endere\u00E7o informado na edi\u00E7\u00E3o institucional de 2025. ")}</p>
          </aside>
          <Suspense fallback={<p role="status">{t("Preparando o formul\u00E1rio\u2026")}</p>}>
            <ContactForm email={contact.email}/>
          </Suspense>
        </div>
      </section>
    </>);
}
