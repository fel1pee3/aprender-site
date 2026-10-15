import Image from "next/image";
import imageDimensions from "@/data/image-dimensions.json";
import { pageMetadata } from "@/lib/metadata";
import { paic } from "@/data/institutional";
import { documentResources } from "@/data/resources";
import { PageIntro } from "@/components/ui";
import { ReadingNav } from "@/components/ReadingNav";
import { ResourceLinks } from "@/components/ResourceLinks";
import s from "@/components/content.module.css";
export const metadata = pageMetadata({
  title: "PAIC e resultados",
  description:
    "Participação da Aprender no PAIC, atendimentos de 2008 a 2018, mapas SPAECE-Alfa e séries históricas de IDEB e IOEB contextualizadas.",
  path: "/a-editora/paic",
  image: "/images/archive/mapas-paic-2007-2018.webp",
});
const number = (n: number) => n.toLocaleString("pt-BR");
const dimensions = imageDimensions as Record<
  string,
  { width: number; height: number }
>;
const decimal = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 1 });
function AttendanceTable({
  rows,
  caption,
}: {
  rows: typeof paic.statistics;
  caption: string;
}) {
  return (
    <div
      className={s.tableScroll}
      tabIndex={0}
      role="region"
      aria-label={caption}
    >
      <table className={s.table}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Ano</th>
            <th scope="col">Municípios</th>
            <th scope="col">Estudantes</th>
            <th scope="col">Educadores</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.year}>
              <th scope="row">{row.year}</th>
              <td>{number(row.municipalities)}</td>
              <td>{number(row.students)}</td>
              <td>{number(row.teachers)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function PaicPage() {
  return (
    <>
      <PageIntro
        eyebrow="PAIC e resultados"
        title="Uma política pública. Muitas contribuições."
        description="Documentos, mapas e indicadores ajudam a compreender a experiência cearense de alfabetização e a participação da Aprender nesse trabalho coletivo."
      />
      <div className="container">
        <ReadingNav current="/a-editora/paic" />
        <nav className={s.index} aria-label="Nesta página">
          {[
            ["participacao", "Participação"],
            ["atendimentos", "Atendimentos"],
            ["mapas", "Mapas"],
            ["ideb", "IDEB"],
            ["ioeb", "IOEB"],
            ["documentos", "Documentos"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      <section id="participacao" className={s.section}>
        <div className="container">
          <div className={s.prose}>
            <h2 className={s.heading}>Materiais, formação e acompanhamento.</h2>
            {paic.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              Entre 2008 e 2013, a Aprender participou do eixo de alfabetização
              do PAIC com o Projeto Lendo Você Fica Sabendo. O catálogo de 2025
              informa alcance superior a 60% dos estudantes e professores de 2º
              ano dos municípios cearenses nesse contexto.
            </p>
            <p className={s.notice}>{paic.notes[2]}</p>
          </div>
        </div>
      </section>
      <section id="atendimentos" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>Atendimentos registrados pela editora.</h2>
          <AttendanceTable
            rows={paic.statistics}
            caption="Série publicada no site institucional · 2008–2018 · atendimentos da Aprender"
          />
          <p className={s.note}>{paic.notes[0]}</p>
          <p className={s.notice}>{paic.notes[1]}</p>
          <details id="atendimentos-catalogo" className={s.accordion}>
            <summary>Consultar a série do catálogo de 2025 · 2008–2013</summary>
            <div>
              <AttendanceTable
                rows={paic.catalogueStatistics}
                caption="Catálogo 2025, página 7 · versão com 5.325 educadores em 2012"
              />
            </div>
          </details>
        </div>
      </section>
      <section id="mapas" className={s.section}>
        <div className="container">
          <h2 className={s.heading}>Mapas de proficiência em alfabetização.</h2>
          <div className={s.prose}>
            <p>{paic.notes[4]}</p>
            <p>
              Os mapas são registros estaduais do SPAECE-Alfa. As cores
              representam níveis de proficiência, e não a presença da editora em
              cada município. Abra a imagem para consultar o detalhe disponível.
            </p>
          </div>
          <div className={s.figures}>
            {paic.figures
              .filter((f) => f.id !== "ioeb-original-2019")
              .map((fig) => (
                <figure id={fig.id} key={fig.id}>
                  <a href={fig.image}>
                    <Image
                      src={fig.image}
                      alt={fig.alt}
                      width={dimensions[fig.image].width}
                      height={dimensions[fig.image].height}
                      sizes="(max-width:767px) 90vw, 1100px"
                    />
                  </a>
                  <figcaption>
                    {fig.caption}{" "}
                    <a href={fig.sourceUrl}>Fonte institucional</a>
                  </figcaption>
                </figure>
              ))}
          </div>
          <p className={s.note}>{paic.historicalHighlights[3]}</p>
        </div>
      </section>
      <section id="indicadores" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <div id="ideb">
            <h2 className={s.heading}>IDEB do Ceará · 2005–2023.</h2>
            <p className={s.note}>{paic.notes[3]}</p>
            <div
              className={s.tableScroll}
              tabIndex={0}
              role="region"
              aria-label="Série de IDEB"
            >
              <table className={s.table}>
                <caption>
                  Resultados estaduais publicados no catálogo de 2025, página 9.
                  Não representam resultados exclusivos dos materiais da
                  Aprender.
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Ano</th>
                    <th scope="col">Anos iniciais</th>
                    <th scope="col">Anos finais</th>
                  </tr>
                </thead>
                <tbody>
                  {paic.ideb.map((row) => (
                    <tr key={row.year}>
                      <th scope="row">{row.year}</th>
                      <td>{decimal(row.earlyYears)}</td>
                      <td>{decimal(row.finalYears)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={s.prose}>
              {paic.historicalHighlights.slice(0, 2).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <details id="ranking-2017" className={s.accordion}>
              <summary>
                Cinco primeiros municípios no quadro histórico de 2017
              </summary>
              <div>
                <div
                  className={s.tableScroll}
                  tabIndex={0}
                  role="region"
                  aria-label="Ranking histórico de IDEB 2017"
                >
                  <table className={s.table}>
                    <caption>
                      IDEB dos anos iniciais · quadro preservado no site
                      institucional
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Posição</th>
                        <th scope="col">Município</th>
                        <th scope="col">IDEB</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paic.ranking2017.map((row) => (
                        <tr key={row.position}>
                          <th scope="row">{row.position}ª</th>
                          <td>{row.municipality}</td>
                          <td>{decimal(row.value)}</td>
                        </tr>
                      ))}
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
          <h2 className={s.heading}>Oportunidades educacionais · IOEB 2019.</h2>
          <p className={s.paragraph}>{paic.historicalHighlights[2]}</p>
          <p className={s.paragraph}>{paic.ioebContext}</p>
          <div
            className={s.tableScroll}
            tabIndex={0}
            role="region"
            aria-label="Municípios cearenses no IOEB 2019"
          >
            <table className={s.table}>
              <caption>
                Dezenove municípios cearenses apresentados no quadro histórico
                da editora. Valores de 2019.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Município</th>
                  <th scope="col">IOEB</th>
                </tr>
              </thead>
              <tbody>
                {paic.ioeb2019.map((row) => (
                  <tr key={row.municipality}>
                    <th scope="row">{row.municipality}</th>
                    <td>{decimal(row.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={s.source}>
            <a id="ioeb-original-2019" href={paic.figures[1].image}>
              Abrir o quadro original do IOEB 2019
            </a>
          </p>
        </div>
      </section>
      <section id="documentos" className={`${s.section} ${s.soft}`}>
        <div className="container">
          <h2 className={s.heading}>Documentos e referências.</h2>
          <ResourceLinks
            items={documentResources.filter(
              (item) => item.kind === "institutional",
            )}
          />
          <div className={s.prose}>
            <ul>
              {paic.references.map((ref) => (
                <li key={ref.url}>
                  <p>
                    <a href={ref.url}>{ref.title}</a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
