import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import {
  ContactCTA,
  PageIntro,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import {
  testimonials,
  testimonialContext,
  formationGallery,
  galleryContext,
  videos,
  videoContext,
} from "@/data/archive";
import { articles } from "@/data/editorial";
import s from "@/components/content.module.css";

export const metadata = pageMetadata({
  title: "Acervo de formações, depoimentos e vídeos",
  description:
    "Nove relatos de educadores e gestores, nove fotografias de formação em sete municípios e os três vídeos históricos publicados pela Aprender Editora.",
  path: "/acervo",
  image: "/images/formacao-professores.webp",
});

export default function ArchivePage() {
  return (
    <>
      <PageIntro
        eyebrow="Memória institucional"
        breadcrumb="Acervo"
        title="Educadores, práticas e histórias."
        description="Relatos, fotografias e materiais audiovisuais que documentam a atuação da Aprender. Um acervo com autoria, origem e contexto preservados."
      />
      <div className="container">
        <nav aria-label="Seções do acervo" className={s.index}>
          <a href="#depoimentos">9 depoimentos</a>
          <a href="#formacoes">9 fotografias de formação</a>
          <a href="#videos">3 vídeos de acervo</a>
          <a href="#memoria-editorial">Memória editorial</a>
        </nav>
      </div>

      <section
        id="depoimentos"
        className={s.section}
        aria-labelledby="testimonials-title"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Vozes da educação"
            title={
              <span id="testimonials-title">Experiências compartilhadas.</span>
            }
            description="Professores e gestores contam como os materiais e as formações participaram do trabalho de suas redes."
          />
          <p className={s.notice}>{testimonialContext}</p>
          <div className={s.twoColumns}>
            {testimonials.map((item) => (
              <article
                id={item.id}
                className={s.testimonial}
                key={item.id}
                style={{ scrollMarginTop: 120 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    marginBottom: 18,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`Retrato de ${item.name} no registro original`}
                    width={72}
                    height={80}
                    style={{
                      width: 72,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 4,
                      flexShrink: 0,
                    }}
                    sizes="72px"
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <span className={s.editionBadge}>{item.location}</span>
                  </div>
                </div>
                <p>
                  <strong>{item.role}</strong>
                  <br />
                  {item.period}.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85 }}>
                  {item.paragraphs[0]}
                </p>
                {item.paragraphs.length > 1 && (
                  <details className={s.accordion}>
                    <summary>Continuar a leitura do relato</summary>
                    <div>
                      {item.paragraphs.slice(1).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                )}
                <p className={s.source}>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ler o depoimento original integral{" "}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">
                      {" "}
                      (imagem do acervo oficial, abre em nova aba)
                    </span>
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="formacoes"
        className={`${s.section} ${s.white}`}
        aria-labelledby="gallery-title"
      >
        <div className="container">
          <SectionHeading
            eyebrow="O trabalho em diferentes territórios"
            title={
              <span id="gallery-title">Nove registros. Sete municípios.</span>
            }
            description={galleryContext}
          >
            <TextLink href="/formacao">
              Conhecer a proposta de formação
            </TextLink>
          </SectionHeading>
          <div className={s.threeColumns}>
            {formationGallery.map((photo) => (
              <figure
                className={s.photo}
                key={photo.id}
                id={photo.id}
                style={{ scrollMarginTop: 120 }}
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 600px) 80vw, 316px"
                  style={{ height: "auto", maxWidth: photo.width }}
                />
                <figcaption>
                  <strong>{photo.location}</strong>
                  {photo.caption}.<br />
                  <span>{photo.date}.</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className={s.source}>
            Origem das fotografias e legendas:{" "}
            <a
              href={formationGallery[0].sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              galeria oficial Aprender em Ação (abre em nova aba)
            </a>
            .
          </p>
        </div>
      </section>

      <section id="videos" className={s.section} aria-labelledby="videos-title">
        <div className="container">
          <SectionHeading
            eyebrow="Acervo audiovisual"
            title={
              <span id="videos-title">As vinhetas do site institucional.</span>
            }
            description="Três recursos publicados pela editora, preservados com sua identificação e seu conteúdo real."
          />
          <p className={s.notice}>{videoContext}</p>
          <div className={s.twoColumns}>
            {videos.map((video) => (
              <article
                className={s.video}
                id={video.id}
                key={video.id}
                style={{ scrollMarginTop: 120 }}
              >
                <video
                  controls
                  preload="none"
                  poster={video.poster}
                  width={video.width}
                  height={video.height}
                  aria-label={video.title}
                  aria-describedby={`${video.id}-description`}
                >
                  <source src={video.src} type="video/mp4" />
                  <track
                    kind="descriptions"
                    src={video.descriptionTrack}
                    srcLang="pt-BR"
                    label="Descrição visual em português"
                  />
                  Seu navegador não reproduz este vídeo.{" "}
                  <a href={video.src}>Abrir arquivo MP4</a>.
                </video>
                <h3>{video.title}</h3>
                <span className={s.editionBadge}>
                  {video.duration} · sem áudio
                </span>
                <p id={`${video.id}-description`}>{video.description}</p>
                <details className={s.accordion}>
                  <summary>Ler a descrição visual completa</summary>
                  <div>
                    <p>{video.transcript}</p>
                    <p className={s.note}>{video.notes}</p>
                  </div>
                </details>
                <p className={s.source}>
                  <a
                    href={video.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Página original (nova aba)
                  </a>{" "}
                  ·{" "}
                  <a
                    href={video.originalSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MP4 original (nova aba)
                  </a>{" "}
                  · <a href={video.descriptionTrack}>Descrição em WebVTT</a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="memoria-editorial"
        className={`${s.section} ${s.soft}`}
        aria-labelledby="editorial-title"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Leituras do acervo"
            title={
              <span id="editorial-title">Memória e síntese documental.</span>
            }
            description="Os registros de 2010, 2011 e 2025 continuam disponíveis com suas fontes e sua classificação editorial."
          />
          <div className={s.threeColumns}>
            {articles.map((article) => (
              <Link
                href={`/em-acao/${article.slug}`}
                key={article.slug}
                className={s.linkCard}
              >
                <span className={s.editionBadge}>{article.dateLabel}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span>
                  Ler registro <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
          <div
            id="registros-catalogo"
            className={s.threeColumns}
            style={{ marginTop: 40 }}
          >
            {[
              {
                src: "/images/hero.webp",
                alt: "Educadores organizam cartões e planejam uma atividade de alfabetização",
                caption: "Atividade de formação · catálogo de 2025, p. 60.",
              },
              {
                src: "/images/formacao-professores.webp",
                alt: "Educadoras estudam os livros e planejam atividades em grupo",
                caption: "Estudo dos materiais · catálogo de 2025, p. 61.",
              },
              {
                src: "/images/formacao-encontro.webp",
                alt: "Grupo de educadores reunido ao final de uma atividade de formação",
                caption:
                  "Registro coletivo de formação · catálogo de 2025, p. 61.",
              },
            ].map((photo) => (
              <figure className={s.photo} key={photo.src}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={700}
                  sizes="(max-width:600px) 90vw, 350px"
                  style={{ height: 300, objectFit: "contain" }}
                />
                <figcaption>
                  {photo.caption} Local e data do encontro não informados na
                  publicação.
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
