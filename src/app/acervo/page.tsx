import { getTranslator } from "@/i18n/server";
import Image from "@/components/AssetImage";
import Link from "@/i18n/Link";
import { ImageDialog } from "@/components/ImageDialog";
import { pageMetadata } from "@/lib/metadata";
import { ContactCTA, PageIntro, SectionHeading, TextLink, } from "@/components/ui";
import { testimonials, testimonialContext, formationGallery, galleryContext, videos, videoContext, } from "@/data/archive";
import { articles } from "@/data/editorial";
import s from "@/components/content.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("Acervo de formações, depoimentos e vídeos"),
        description: t("Relatos de educadores e gestores, registros de formação e vídeos históricos da Aprender Editora, com contexto de cada período."),
        path: "/acervo",
        image: "/images/formacao-professores.webp"
    }, t.locale);
}
export default async function ArchivePage() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("Memória institucional")} breadcrumb={t("Acervo")} title={t("Educadores, práticas e histórias.")} description={t("Educadores e gestores compartilham experiências com os materiais e as formações. Fotografias e vinhetas registram momentos da história da Aprender.")}/>
      <div className="container">
        <nav aria-label={t("Seções do acervo")} className={s.index}>
          <a href={t.href("#depoimentos")}>{t("Depoimentos")}</a>
          <a href={t.href("#formacoes")}>{t("Fotografias de forma\u00E7\u00E3o")}</a>
          <a href={t.href("#videos")}>{t("V\u00EDdeos de acervo")}</a>
          <a href={t.href("#memoria-editorial")}>{t("Mem\u00F3ria editorial")}</a>
        </nav>
      </div>

      <section id="depoimentos" className={s.section} aria-labelledby="testimonials-title">
        <div className="container">
          <SectionHeading eyebrow={t("Vozes da educação")} title={<span id="testimonials-title">{t("Experi\u00EAncias compartilhadas.")}</span>} description={t("Professores e gestores contam como os materiais e as formações participaram do trabalho de suas redes.")}/>
          <p className={s.notice}>{t(testimonialContext)}</p>
          <div className={s.twoColumns}>
            {testimonials.map((item) => (<article id={item.id} className={s.testimonial} key={item.id} style={{ scrollMarginTop: 120 }}>
                <div style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 18,
            }}>
                  <Image src={item.image} alt={t("Retrato de {0} no registro original", [item.name])} width={72} height={80} style={{
                width: 72,
                height: 80,
                objectFit: "cover",
                borderRadius: 4,
                flexShrink: 0,
            }} sizes="72px"/>
                  <div>
                    <h3>{t(item.name)}</h3>
                    <span className={s.editionBadge}>{t(item.location)}</span>
                  </div>
                </div>
                <p>
                  <strong>{t(item.role)}</strong>
                  <br />
                  {t(item.period)}{t(". ")}</p>
                <p style={{ fontSize: 16, lineHeight: 1.85 }}>
                  {t(item.paragraphs[0])}
                </p>
                {item.paragraphs.length > 1 && (<details className={s.accordion}>
                    <summary>{t("Continuar a leitura do relato")}</summary>
                    <div>
                      {item.paragraphs.slice(1).map((paragraph) => (<p key={paragraph}>{t(paragraph)}</p>))}
                    </div>
                  </details>)}
                {t.locale !== "pt" && <p className={s.note}>{t("Tradução da síntese do depoimento; o registro original está em português.")}</p>}
                <ImageDialog src={item.originalImage} alt={t("Registro integral do depoimento de {0}, com retrato e texto. A síntese do relato está disponível nesta página.", [item.name])} caption={`${item.name} · ${t(item.location)}. ${t(item.period)}.`} buttonLabel={t("Ver registro integral de {0}", [item.name])}/>
              </article>))}
          </div>
        </div>
      </section>

      <section id="formacoes" className={`${s.section} ${s.white}`} aria-labelledby="gallery-title">
        <div className="container">
          <SectionHeading eyebrow={t("O trabalho em diferentes territórios")} title={<span id="gallery-title">{t("Estudo e pr\u00E1tica em diferentes munic\u00EDpios.")}</span>} description={t(galleryContext)}>
            <TextLink href={t.href("/formacao")}>{t("Conhecer a proposta de forma\u00E7\u00E3o ")}</TextLink>
          </SectionHeading>
          <div className={s.threeColumns}>
            {formationGallery.map((photo) => (<figure className={s.photo} key={photo.id} id={photo.id} style={{ scrollMarginTop: 120 }}>
                <Image src={photo.image} alt={t(photo.alt)} width={photo.width} height={photo.height} sizes="(max-width: 600px) 80vw, 316px" style={{ height: "auto", maxWidth: photo.width }}/>
                <figcaption>
                  <strong>{t(photo.location)}</strong>
                  {t(photo.caption)}{t(".")}<br />
                  <span>{t(photo.date)}{t(".")}</span>
                </figcaption>
              </figure>))}
          </div>
        </div>
      </section>

      <section id="videos" className={s.section} aria-labelledby="videos-title">
        <div className="container">
          <SectionHeading eyebrow={t("Acervo audiovisual")} title={<span id="videos-title">{t("Vinhetas da mem\u00F3ria institucional.")}</span>} description={t("Animações curtas da marca e um registro visual de leitura, publicados no acervo institucional.")}/>
          <p className={s.notice}>{t(videoContext)}</p>
          <div className={s.twoColumns}>
            {videos.map((video) => (<article className={s.video} id={video.id} key={video.id} style={{ scrollMarginTop: 120 }}>
                <video controls preload="none" poster={video.poster} width={video.width} height={video.height} aria-label={t(video.title)} aria-describedby={`${video.id}-description`}>
                  <source src={video.src} type="video/mp4"/>
                  <track kind="descriptions" src={video.descriptionTrack} srcLang="pt-BR" label={t("Descrição visual em português")}/>{t("Seu navegador n\u00E3o reproduz este v\u00EDdeo.")}{t(" ")}
                  <a href={t.href(video.src)}>{t("Abrir arquivo MP4")}</a>{t(". ")}</video>
                <h3>{t(video.title)}</h3>
                <span className={s.editionBadge}>
                  {t(video.duration)}{t(" \u00B7 sem \u00E1udio ")}</span>
                <p id={`${video.id}-description`}>{t(video.description)}</p>
                <details className={s.accordion}>
                  <summary>{t("Ler a descri\u00E7\u00E3o visual completa")}</summary>
                  <div>
                    <p>{t(video.transcript)}</p>
                    <p className={s.note}>{t(video.notes)}</p>
                  </div>
                </details>
                <p className={s.source}>
                  <a href={t.href(video.descriptionTrack)} download>{t("Baixar descri\u00E7\u00E3o visual em WebVTT ")}</a>{t(" · Arquivo original em português")}
                </p>
              </article>))}
          </div>
        </div>
      </section>

      <section id="memoria-editorial" className={`${s.section} ${s.soft}`} aria-labelledby="editorial-title">
        <div className="container">
          <SectionHeading eyebrow={t("Leituras do acervo")} title={<span id="editorial-title">{t("Mem\u00F3ria de sala de aula.")}</span>} description={t("Atividades pedagógicas de 2010 e 2011 e a celebração dos vinte anos da editora em 2025.")}/>
          <div className={s.threeColumns}>
            {articles.map((article) => (<Link href={t.href(`/em-acao/${article.slug}`)} key={article.slug} className={s.linkCard}>
                <span className={s.editionBadge}>{t(article.dateLabel)}</span>
                <h3>{t(article.title)}</h3>
                <p>{t(article.excerpt)}</p>
                <span>{t("Ler registro ")}<span aria-hidden="true">{t("\u2192")}</span>
                </span>
              </Link>))}
          </div>
          <div id="registros-catalogo" className={s.threeColumns} style={{ marginTop: 40 }}>
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
                caption: "Registro coletivo de formação · catálogo de 2025, p. 61.",
            },
        ].map((photo) => (<figure className={s.photo} key={photo.src}>
                <Image src={photo.src} alt={t(photo.alt)} width={600} height={700} sizes="(max-width:600px) 90vw, 350px" style={{ height: 300, objectFit: "contain" }}/>
                <figcaption>
                  {t(photo.caption)}{t(" Local e data do encontro n\u00E3o informados na publica\u00E7\u00E3o. ")}</figcaption>
              </figure>))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>);
}
