import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { contact } from "@/data/editorial";
import { socialLinks } from "@/data/archive";
import s from "../inner.module.css";
export const metadata = pageMetadata({
  title: "Vamos conversar",
  description:
    "Converse com a Aprender Editora sobre materiais, formação e acompanhamento para sua rede. Prepare sua mensagem ou use os canais institucionais.",
  path: "/contato",
});
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Vamos conversar"
        breadcrumb="Contato"
        title={
          <>
            Toda parceria começa
            <br />
            com uma boa conversa.
          </>
        }
        description="Informe sua instituição e os materiais ou a formação de que sua rede precisa. Prepare uma mensagem ou use os canais públicos da editora."
      />
      <section className={s.section}>
        <div className={`container ${s.contactGrid}`}>
          <aside className={s.contactAside}>
            <h2>Estamos por aqui.</h2>
            <div className={s.contactDetail}>
              <Icon name="phone" />
              <div>
                <h3>Telefone</h3>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </div>
            </div>
            <div className={s.contactDetail}>
              <Icon name="mail" />
              <div>
                <h3>E-mail</h3>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>
            <div className={s.contactDetail}>
              <Icon name="pin" />
              <div>
                <h3>Fortaleza, Ceará</h3>
                <p>
                  {contact.address}
                  <br />
                  {contact.city} · CEP {contact.postalCode}
                </p>
              </div>
            </div>
            <div className={s.contactDetail}>
              <Icon name="external" />
              <div>
                <h3>Outros canais</h3>
                {socialLinks.map((social) => (
                  <p key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.name} da Aprender (nova aba)
                    </a>
                  </p>
                ))}
              </div>
            </div>
            <p>
              Endereço informado na edição institucional de 2025.
            </p>
          </aside>
          <Suspense fallback={<p role="status">Preparando o formulário…</p>}>
            <ContactForm email={contact.email} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
