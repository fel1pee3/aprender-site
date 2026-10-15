import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/editorial";
import { ContactCTA, PageIntro } from "@/components/ui";
import { Icon } from "@/components/Icon";
import s from "../inner.module.css";
export const metadata = pageMetadata({
  title: "Aprender em ação",
  description:
    "Histórias, registros e memórias documentadas da trajetória da Aprender Editora na formação de educadores e na aprendizagem.",
  path: "/em-acao",
});
export default function Journal() {
  return (
    <>
      <PageIntro
        eyebrow="Aprender em ação"
        breadcrumb="Em ação"
        title={
          <>
            A educação acontece
            <br />
            no encontro.
          </>
        }
        description="Memórias de sala de aula, histórias da editora e registros de uma caminhada compartilhada. Um olhar para o acervo da Aprender."
      />
      <section className={s.section}>
        <div className="container">
          <div className={s.articleList}>
            {articles.map((article) => (
              <Link
                href={`/em-acao/${article.slug}`}
                className={s.articleCard}
                key={article.slug}
              >
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  width={600}
                  height={430}
                  sizes="(max-width:767px) 90vw, 30vw"
                />
                <div className={s.articleMeta}>
                  <span>{article.type}</span>
                  <time dateTime={article.date}>{article.dateLabel}</time>
                </div>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <span className={s.readMore}>
                  Ler a história <Icon name="arrow" size={17} />
                </span>
              </Link>
            ))}
          </div>
          <p className={s.sourceNote}>
            Seleção editorial a partir do catálogo comemorativo de 2025 e de
            fontes institucionais. As datas dos registros históricos são
            preservadas conforme documentadas.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
