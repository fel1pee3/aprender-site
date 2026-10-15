import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { edgar } from "@/data/institutional";
import { PageIntro, TextLink } from "@/components/ui";
import { ReadingNav } from "@/components/ReadingNav";
import s from "@/components/content.module.css";
export const metadata = pageMetadata({
  title: "Professor Edgar Linhares",
  description:
    "A trajetória de Edgar Linhares Lima, sua contribuição à alfabetização em Sobral e referências sobre a experiência educacional.",
  path: "/a-editora/edgar-linhares",
  image: edgar.image,
});
export default function EdgarPage() {
  return (
    <>
      <PageIntro
        eyebrow="Memória institucional"
        title={edgar.title}
        description="Educador, especialista em leitura e participante da construção de políticas públicas de alfabetização no Ceará."
      />
      <div className="container">
        <ReadingNav current="/a-editora/edgar-linhares" />
      </div>
      <section className={s.section}>
        <div className={`container ${s.twoColumns}`}>
          <div className={s.prose}>
            <h2 className={s.heading}>Uma vida dedicada à educação.</h2>
            {edgar.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <figure className={s.photo}>
            <Image
              src={edgar.image}
              width={275}
              height={370}
              alt="Retrato do professor Edgar Linhares Lima no acervo institucional da Aprender"
              style={{ height: "auto", maxWidth: 275, objectFit: "contain" }}
            />
            <figcaption>
              Retrato da apresentação institucional de Edgar Linhares.
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="referencias" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>Referências e leituras.</h2>
          <div className={s.prose}>
            <ul>
              {edgar.references.map((ref) => (
                <li key={ref.url}>
                  <p>
                    <a href={ref.url}>{ref.title}</a>
                  </p>
                </li>
              ))}
            </ul>
            <TextLink href="/a-editora/trajetoria">
              A trajetória da Aprender
            </TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
