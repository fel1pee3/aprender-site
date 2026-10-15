import { getTranslator } from "@/i18n/server";
import Image from "@/components/AssetImage";
import imageDimensions from "@/data/image-dimensions.json";
import { pageMetadata } from "@/lib/metadata";
import { paic } from "@/data/institutional";
import { documentResources } from "@/data/resources";
import { PageIntro } from "@/components/ui";
import { ReadingNav } from "@/components/ReadingNav";
import { ResourceLinks } from "@/components/ResourceLinks";
import { ImageDialog } from "@/components/ImageDialog";
import s from "@/components/content.module.css";
export async function generateMetadata() {
    const t = await getTranslator();
    return pageMetadata({
        title: t("PAIC e resultados"),
        description: t("Participação da Aprender no PAIC, atendimentos de 2008 a 2018, mapas SPAECE-Alfa e séries históricas de IDEB e IOEB contextualizadas."),
        path: "/a-editora/paic",
        image: "/images/archive/mapas-paic-2007-2018.webp"
    }, t.locale);
}
const dimensions = imageDimensions as Record<string, {
    width: number;
    height: number;
}>;
async function AttendanceTable({ rows, caption, }: {
    rows: typeof paic.statistics;
    caption: string;
}) {
    const t = await getTranslator();
    return (<div className={s.tableScroll} tabIndex={0} role="region" aria-label={caption}>
      <table className={s.table}>
        <caption>{t(caption)}</caption>
        <thead>
          <tr>
            <th scope="col">{t("Ano")}</th>
            <th scope="col">{t("Munic\u00EDpios")}</th>
            <th scope="col">{t("Estudantes")}</th>
            <th scope="col">{t("Educadores")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (<tr key={row.year}>
              <th scope="row">{t(row.year)}</th>
              <td>{t.number(row.municipalities)}</td>
              <td>{t.number(row.students)}</td>
              <td>{t.number(row.teachers)}</td>
            </tr>))}
        </tbody>
      </table>
    </div>);
}
export default async function PaicPage() {
    const t = await getTranslator();
    return (<>
      <PageIntro eyebrow={t("PAIC e resultados")} title={t("Uma política pública. Muitas contribuições.")} description={t("Documentos, mapas e indicadores ajudam a compreender a experiência cearense de alfabetização e a participação da Aprender nesse trabalho coletivo.")}/>
      <div className="container">
        <ReadingNav current="/a-editora/paic"/>
        <nav className={s.index} aria-label={t("Nesta página")}>
          {[
            ["participacao", "Participação"],
            ["atendimentos", "Atendimentos"],
            ["mapas", "Mapas"],
            ["ideb", "IDEB"],
            ["ioeb", "IOEB"],
            ["documentos", "Documentos"],
        ].map(([id, label]) => (<a key={id} href={t.href(`#${id}`)}>
              {t(label)}
            </a>))}
        </nav>
      </div>
      <section id="participacao" className={s.section}>
        <div className="container">
          <div className={s.prose}>
            <h2 className={s.heading}>{t("Materiais, forma\u00E7\u00E3o e acompanhamento.")}</h2>
            {paic.paragraphs.map((p) => (<p key={p}>{t(p)}</p>))}
            <p>{t("Entre 2008 e 2013, a Aprender participou do eixo de alfabetiza\u00E7\u00E3o do PAIC com o Projeto Lendo Voc\u00EA Fica Sabendo. O cat\u00E1logo de 2025 informa alcance superior a 60% dos estudantes e professores de 2\u00BA ano dos munic\u00EDpios cearenses nesse contexto. ")}</p>
            <p className={s.notice}>{t(paic.notes[2])}</p>
          </div>
        </div>
      </section>
      <section id="atendimentos" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>{t("Atendimentos registrados pela editora.")}</h2>
          <AttendanceTable rows={paic.statistics} caption={t("Atendimentos da Aprender · série histórica de 2008 a 2018")}/>
          <p className={s.note}>{t(paic.notes[0])}</p>
          <p className={s.notice}>{t(paic.notes[1])}</p>
          <details id="atendimentos-catalogo" className={s.accordion}>
            <summary>{t("Consultar a s\u00E9rie do cat\u00E1logo de 2025 \u00B7 2008\u20132013")}</summary>
            <div>
              <AttendanceTable rows={paic.catalogueStatistics} caption={t("Catálogo 2025, página 7 · versão com 5.325 educadores em 2012")}/>
            </div>
          </details>
        </div>
      </section>
      <section id="mapas" className={s.section}>
        <div className="container">
          <h2 className={s.heading}>{t("Mapas de profici\u00EAncia em alfabetiza\u00E7\u00E3o.")}</h2>
          <div className={s.prose}>
            <p>{t(paic.notes[4])}</p>
            <p>{t("Os mapas s\u00E3o registros estaduais do SPAECE-Alfa. As cores representam n\u00EDveis de profici\u00EAncia, e n\u00E3o a presen\u00E7a da editora em cada munic\u00EDpio. Abra a imagem para consultar o detalhe dispon\u00EDvel. ")}</p>
          </div>
          <div className={s.figures}>
            {paic.figures
            .filter((f) => f.id !== "ioeb-original-2019")
            .map((fig) => (<figure id={fig.id} key={fig.id}>
                  <Image src={fig.image} alt={t(fig.alt)} width={dimensions[fig.image].width} height={dimensions[fig.image].height} sizes="(max-width:767px) 90vw, 1100px"/>
                  <figcaption>
                    {t(fig.caption)}{t(" ")}
                    <ImageDialog src={fig.image} alt={t(fig.alt)} caption={t(fig.caption)} buttonLabel={t("Ampliar imagem")}/>
                  </figcaption>
                </figure>))}
          </div>
          <p className={s.note}>{t(paic.historicalHighlights[3])}</p>
        </div>
      </section>
      <section id="indicadores" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <div id="ideb">
            <h2 className={s.heading}>{t("IDEB do Cear\u00E1 \u00B7 2005\u20132023.")}</h2>
            <p className={s.note}>{t(paic.notes[3])}</p>
            <div className={s.tableScroll} tabIndex={0} role="region" aria-label={t("Série de IDEB")}>
              <table className={s.table}>
                <caption>{t("Resultados estaduais publicados no cat\u00E1logo de 2025, p\u00E1gina 9. N\u00E3o representam resultados exclusivos dos materiais da Aprender. ")}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t("Ano")}</th>
                    <th scope="col">{t("Anos iniciais")}</th>
                    <th scope="col">{t("Anos finais")}</th>
                  </tr>
                </thead>
                <tbody>
                  {paic.ideb.map((row) => (<tr key={row.year}>
                      <th scope="row">{t(row.year)}</th>
                      <td>{t.number(row.earlyYears, { minimumFractionDigits: 1 })}</td>
                      <td>{t.number(row.finalYears, { minimumFractionDigits: 1 })}</td>
                    </tr>))}
                </tbody>
              </table>
            </div>
            <div className={s.prose}>
              {paic.historicalHighlights.slice(0, 2).map((p) => (<p key={p}>{t(p)}</p>))}
            </div>
            <details id="ranking-2017" className={s.accordion}>
              <summary>{t("Cinco primeiros munic\u00EDpios no quadro hist\u00F3rico de 2017 ")}</summary>
              <div>
                <div className={s.tableScroll} tabIndex={0} role="region" aria-label={t("Ranking histórico de IDEB 2017")}>
                  <table className={s.table}>
                    <caption>{t("IDEB dos anos iniciais \u00B7 quadro hist\u00F3rico de 2017 ")}</caption>
                    <thead>
                      <tr>
                        <th scope="col">{t("Posi\u00E7\u00E3o")}</th>
                        <th scope="col">{t("Munic\u00EDpio")}</th>
                        <th scope="col">{t("IDEB")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paic.ranking2017.map((row) => (<tr key={row.position}>
                          <th scope="row">{t("{0}ª", [t.number(row.position)])}</th>
                          <td>{t(row.municipality)}</td>
                          <td>{t.number(row.value, { minimumFractionDigits: 1 })}</td>
                        </tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>
      <section id="ioeb" className={s.section}>
        <div className="container">
          <h2 className={s.heading}>{t("Oportunidades educacionais \u00B7 IOEB 2019.")}</h2>
          <p className={s.paragraph}>{t(paic.historicalHighlights[2])}</p>
          <p className={s.paragraph}>{t(paic.ioebContext)}</p>
          <div className={s.tableScroll} tabIndex={0} role="region" aria-label={t("Municípios cearenses no IOEB 2019")}>
            <table className={s.table}>
              <caption>{t("Dezenove munic\u00EDpios cearenses apresentados no quadro hist\u00F3rico da editora. Valores de 2019. ")}</caption>
              <thead>
                <tr>
                  <th scope="col">{t("Munic\u00EDpio")}</th>
                  <th scope="col">{t("IOEB")}</th>
                </tr>
              </thead>
              <tbody>
                {paic.ioeb2019.map((row) => (<tr key={row.municipality}>
                    <th scope="row">{t(row.municipality)}</th>
                    <td>{t.number(row.value, { minimumFractionDigits: 1 })}</td>
                  </tr>))}
              </tbody>
            </table>
          </div>
          <div className={s.source}>
            <div id="ioeb-original-2019">
              <ImageDialog src={paic.figures[1].image} alt={t(paic.figures[1].alt)} caption={t(paic.figures[1].caption)} buttonLabel={t("Ampliar quadro do IOEB 2019")}/>
            </div>
          </div>
        </div>
      </section>
      <section id="documentos" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>{t("Documentos e refer\u00EAncias.")}</h2>
          <ResourceLinks items={t.data(documentResources.filter((item) => item.kind === "institutional"))}/>
          <div className={s.prose}>
            <ul>
              {paic.references.map((ref) => (<li key={ref.url}>
                  <p>
                    <a href={t.href(ref.url)} target="_blank" rel="noopener noreferrer">
                      {t(ref.title)}<span className="sr-only">{t(" (abre em nova aba)")}</span></a>
                  </p>
                </li>))}
            </ul>
          </div>
        </div>
      </section>
    </>);
}
