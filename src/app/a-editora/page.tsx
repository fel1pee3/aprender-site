import type { Metadata } from "next";
import Image from "next/image";
import { milestones, principles, catalogueUrl } from "@/data/editorial";
import {
  ContactCTA,
  Eyebrow,
  PageIntro,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import s from "../inner.module.css";
export const metadata: Metadata = {
  title: "A editora",
  description:
    "Conheça a Aprender Editora: sua origem em Fortaleza, a trajetória na alfabetização, os valores e o compromisso com a aprendizagem desde 2005.",
};
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="A editora"
        title={
          <>
            Uma história de encontros.
            <br />
            Um compromisso com o futuro.
          </>
        }
        description="Nascemos em Fortaleza, em 2005, com uma convicção: o trabalho de quem educa merece apoio, conhecimento e companhia."
      />
      <section className={s.section}>
        <div className={`container ${s.split}`}>
          <div>
            <Eyebrow>Prazer, somos a Aprender</Eyebrow>
            <h2 className={s.editorialTitle}>
              A aprendizagem está no centro de tudo.
            </h2>
            <div className={s.copy}>
              <p>
                A Aprender Editora produz materiais didáticos semiestruturados
                para a Educação Infantil e o Ensino Fundamental. São propostas
                que articulam livros, formação contínua, acompanhamento
                pedagógico e avaliação.
              </p>
              <p>
                Esse trabalho se constrói com os educadores e as redes de
                ensino, valorizando a prática em sala de aula e as
                possibilidades de desenvolvimento de cada estudante.
              </p>
            </div>
            <p className={s.quote}>Compromisso com a Aprendizagem.</p>
          </div>
          <figure className={s.figure}>
            <Image
              src="/images/history.webp"
              alt="Educadora acompanha a atividade de um estudante em sala de aula"
              width={1366}
              height={1816}
              sizes="(max-width:767px) 90vw, 43vw"
            />
            <figcaption>
              Acompanhamento em Palhano (CE), 2010. Catálogo institucional de
              2025, p. 2.
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="trajetoria" className={s.softSection}>
        <div className="container">
          <SectionHeading
            eyebrow="Nossa trajetória"
            title="Raízes no Ceará. Olhar para o amanhã."
          />
          <div className={s.timeline}>
            {milestones.map((item) => (
              <article className={s.milestone} key={item.year}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <p className={s.sourceNote}>
            Marcos documentados no{" "}
            <a href={`${catalogueUrl}#page=4`}>
              catálogo institucional de 2025, p. 4–7
            </a>
            . Os indicadores da página inicial são acumulados divulgados nessa
            edição: mais de 2 milhões de estudantes que utilizaram os materiais,
            mais de 100 mil educadores e coordenadores nas formações e mais de
            300 municípios atendidos. São registros históricos da editora.
          </p>
        </div>
      </section>
      <section className={s.section}>
        <div className={`container ${s.split}`}>
          <div>
            <Eyebrow>Educação é uma construção coletiva</Eyebrow>
            <h2 className={s.editorialTitle}>
              Uma contribuição à história da alfabetização.
            </h2>
            <div className={s.copy}>
              <p>
                A trajetória que antecede a editora se relaciona ao trabalho da
                equipe do professor Edgar Linhares na rede de Sobral. Formação
                de professores, atividades de leitura e escrita e acompanhamento
                da aprendizagem integraram essa experiência.
              </p>
              <p>
                Entre 2008 e 2013, a Aprender participou do eixo de
                alfabetização do Programa Alfabetização na Idade Certa, o PAIC,
                com o projeto Lendo Você Fica Sabendo.
              </p>
            </div>
          </div>
          <div className={s.callout}>
            <h3>Uma política pública, muitas contribuições</h3>
            <p>
              O PAIC é um programa do Governo do Estado do Ceará. A participação
              da Aprender envolveu materiais, formação contínua, acompanhamento
              em sala e avaliações. Os resultados da educação cearense integram
              um esforço de redes, gestores, professores, estudantes e
              diferentes instituições.
            </p>
          </div>
        </div>
      </section>
      <section className={s.whiteSection}>
        <div className="container">
          <SectionHeading
            eyebrow="O que orienta nosso trabalho"
            title="Valores que se tornam prática."
          />
          <div className={s.values}>
            {principles.map((value) => (
              <article className={s.value} key={value.name}>
                <h3>{value.name}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
          <TextLink href="/solucoes">Conheça as soluções da Aprender</TextLink>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
