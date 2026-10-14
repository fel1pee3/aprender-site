import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { contact } from "@/data/editorial";
import s from "../inner.module.css";
export const metadata: Metadata = {
  title: "Vamos conversar",
  description:
    "Converse com a Aprender Editora sobre materiais, formação e acompanhamento para sua rede. Prepare sua mensagem ou use os canais institucionais.",
};
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
        description="Conte sobre sua escola, seu município e os desafios de aprendizagem. Vamos encontrar juntos os próximos caminhos."
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
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram da Aprender (nova aba)
                </a>
                <br />
                <a
                  href={contact.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contato no site institucional (nova aba)
                </a>
              </div>
            </div>
            <p>
              Esta é uma proposta independente de redesign. Os links de telefone
              e e-mail direcionam aos canais públicos da editora.
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
