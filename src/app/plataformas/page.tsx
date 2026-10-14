import type { Metadata } from "next";
import { platforms } from "@/data/editorial";
import { Button, ContactCTA, PageIntro } from "@/components/ui";
import { Icon } from "@/components/Icon";
import s from "../inner.module.css";
export const metadata: Metadata = {
  title: "Plataformas digitais",
  description:
    "Conheça Aprender Formar e Aprender Avaliar: recursos digitais de apoio à formação dos educadores e à análise da aprendizagem.",
};
export default function Platforms() {
  return (
    <>
      <PageIntro
        eyebrow="Plataformas digitais"
        breadcrumb="Plataformas"
        title={
          <>
            Tecnologia que aproxima
            <br />o olhar da aprendizagem.
          </>
        }
        description="Ambientes de apoio aos projetos da Aprender, conectando educadores, materiais de formação e informações sobre a aprendizagem."
      />
      <section className={s.section}>
        <div className="container">
          {platforms.map((platform, i) => (
            <article className={s.platform} key={platform.name}>
              <div className={s.platformIcon}>
                <Icon name={i === 0 ? "people" : "chart"} size={37} />
              </div>
              <div>
                <h2>{platform.name}</h2>
                <p>{platform.description}</p>
              </div>
              <div>
                <ul className={s.checkList}>
                  {platform.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" size={18} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button href={platform.url} external>
                  Acessar {platform.name}
                </Button>
                <p className={s.notice}>
                  Você será direcionado ao ambiente externo da plataforma. O
                  acesso requer as credenciais fornecidas aos participantes.
                </p>
              </div>
            </article>
          ))}
          <div className={s.callout}>
            <h3>Precisa de orientação para acessar?</h3>
            <p>
              Converse com a equipe da Aprender sobre sua participação e as
              orientações de acesso. <a href="/contato">Ir para contato</a>.
            </p>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
