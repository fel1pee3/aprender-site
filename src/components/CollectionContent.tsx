import { getCollectionDetail } from "@/data/collection-details";
import { getCollectionResources } from "@/data/resources";
import { priceRows } from "@/data/prices";
import { MaterialGallery, type GalleryItem } from "./MaterialGallery";
import { ResourceLinks } from "./ResourceLinks";
import { TextLink } from "./ui";
import s from "./content.module.css";
export function CollectionContent({ slug }: { slug: string }) {
  const detail = getCollectionDetail(slug);
  const prices = priceRows.filter(
    (row) =>
      row.collectionSlug === slug || row.relatedCollectionSlugs?.includes(slug),
  );
  return (
    <section className={s.section}>
      <div className="container">
        {detail && (
          <div id="edicoes">
            <h2 className={s.heading}>Composição e proposta pedagógica.</h2>
            <div className={s.prose}>
              {detail.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {detail.editions.length > 1 && <nav className={s.index} aria-label="Apresentações da coleção">
              {[...detail.editions].sort((a, b) => Number(b.id === "catalogo-2025") - Number(a.id === "catalogo-2025")).map(edition => <a key={edition.id} href={`#${edition.id}`}>{edition.label}</a>)}
            </nav>}
            {[...detail.editions].sort((a, b) => Number(b.id === "catalogo-2025") - Number(a.id === "catalogo-2025")).map((edition, editionIndex) => (
              <section key={edition.id} id={edition.id} className={s.edition}>
                <span className={s.editionBadge}>{edition.label}</span>
                <h3>{edition.audience}</h3>
                {edition.context && (
                  <p className={s.notice}>{edition.context}</p>
                )}
                {edition.foundation.length > 0 && (
                  <details className={s.accordion}>
                    <summary>Fundamentação e organização pedagógica</summary>
                    <div className={s.prose}>
                      {edition.foundation.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </details>
                )}
                <details className={s.accordion} open={editionIndex === 0}>
                  <summary>
                    Livros, volumes e destinatários · {edition.books.length}{" "}
                    itens
                  </summary>
                  <div>
                    {edition.books.map((book) => (
                      <article key={book.id} id={book.id} className={s.book}>
                        {book.image && (
                          <img
                            src={book.image}
                            alt={`Material ${book.title}`}
                            loading="lazy"
                            width={140}
                            height={180}
                            className={s.bookImage}
                          />
                        )}
                        <h4>{book.title}</h4>
                        <p className={s.bookInfo}>
                          {[book.audience, book.schoolYear, book.ageRange]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        <p>{book.description}</p>
                        {(book.pages || book.quantity) && (
                          <p>
                            {book.pages ? `${book.pages} páginas.` : ""}{" "}
                            {book.quantity ? `${book.quantity} unidades.` : ""}
                          </p>
                        )}
                        {book.components.length > 0 && (
                          <ul>
                            {book.components.map((component, i) => (
                              <li key={i}>{component}</li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                </details>
                {edition.support.length > 0 && (
                  <details className={s.accordion}>
                    <summary>
                      Formação e apoio associados a esta apresentação
                    </summary>
                    <div>
                      <ul>
                        {edition.support.map((support, i) => (
                          <li key={i}>{support}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                )}

              </section>
            ))}
          </div>
        )}
        {prices.length > 0 && (
          <section id="oferta-2027" className={s.section}>
            <h2 className={s.heading}>
              Materiais relacionados na tabela 2027.
            </h2>
            <p className={s.note}>
              Esta relação preserva a nomenclatura e os destinatários da tabela.
              Não atribui a esses itens a composição de kits ou a metodologia de
              outra edição.
            </p>
            <details className={s.accordion}>
              <summary>
                Consultar {prices.length} materiais e variantes documentados
              </summary>
              <div
                className={s.tableScroll}
                role="region"
                aria-label="Materiais da edição 2027"
                tabIndex={0}
              >
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th scope="col">Material</th>
                      <th scope="col">Destinatário</th>
                      <th scope="col">Ano / público</th>
                      <th scope="col">Apresentação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((row) => (
                      <tr key={row.id}>
                        <td>{row.material}</td>
                        <td>{row.audience}</td>
                        <td>{row.schoolYear}</td>
                        <td>{row.kit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
            <TextLink
              href={`/recursos/tabela-precos?colecao=${encodeURIComponent(prices[0].collection)}`}
            >
              Consultar os preços publicados · 2027
            </TextLink>
            <p className={s.source}>
              A edição indicada é 2027. Confirme vigência, disponibilidade e
              condições com a editora.
            </p>
          </section>
        )}
      </div>
    </section>
  );
}

export function CollectionMaterials({ slug }: { slug: string }) {
  const detail = getCollectionDetail(slug);
  const resources = getCollectionResources(slug);
  const prices = priceRows.filter(row => row.collectionSlug === slug || row.relatedCollectionSlugs?.includes(slug));
  const gallery: GalleryItem[] = [
    ...(detail?.gallery || []).map((item) => ({
      ...item,
      group: item.group || item.caption,
    })),
    ...resources.flatMap((resource) =>
      (resource.previews || []).map((preview) => ({
        src: preview.src,
        alt: preview.alt,
        caption: `${resource.title} · página ${preview.page} da amostra · ${resource.edition}`,
        group: resource.title,
      })),
    ),
  ];

  gallery.sort((a, b) => Number(b.editionId === "catalogo-2025") - Number(a.editionId === "catalogo-2025"));
  return <section className={s.materialOpening}><div className="container">
        <nav className={s.index} aria-label="Detalhes da coleção">
          {detail?.editions.length ? (
            <a href="#edicoes">Apresentações e materiais</a>
          ) : null}
          {gallery.length > 0 && <a href="#galeria">Galeria</a>}
          {resources.length > 0 && <a href="#amostras">Amostras em PDF</a>}
          {prices.length > 0 && (
            <a href="#oferta-2027">Materiais na tabela 2027</a>
          )}
        </nav>
        {gallery.length > 0 && (
          <section id="galeria" className={s.materialSection}>
            <h2 className={s.heading}>Veja os materiais por dentro.</h2>
            <p className={s.note}>
              Explore kits, capas e páginas internas. Selecione um material e use
              “Ampliar imagem” para observar os detalhes.
            </p>
            <MaterialGallery items={gallery} />
          </section>
        )}
        {resources.length > 0 && (
          <section id="amostras" className={s.materialSection}>
            <h2 className={s.heading}>Amostras para consultar.</h2>
            <ResourceLinks items={resources} />
            <p className={s.note}>
              Amostras públicas do acervo da editora. O ano escolar e o volume
              não equivalem ao ano de edição.
            </p>
          </section>
        )}

  </div></section>;
}
