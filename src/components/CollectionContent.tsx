import { getTranslator } from "@/i18n/server";
import { getCollectionDetail } from "@/data/collection-details";
import { getCollectionResources } from "@/data/resources";
import { priceRows } from "@/data/prices";
import { MaterialGallery, type GalleryItem } from "./MaterialGallery";
import { ResourceLinks } from "./ResourceLinks";
import { TextLink } from "./ui";
import s from "./content.module.css";
export async function CollectionContent({ slug }: {
    slug: string;
}) {
    const t = await getTranslator();
    const detail = getCollectionDetail(slug);
    const prices = priceRows.filter((row) => row.collectionSlug === slug || row.relatedCollectionSlugs?.includes(slug));
    return (<section className={s.section}>
      <div className="container">
        {detail && (<div id="edicoes">
            <h2 className={s.heading}>{t("Composi\u00E7\u00E3o e proposta pedag\u00F3gica.")}</h2>
            <div className={s.prose}>
              {detail.intro.map((p, i) => (<p key={i}>{t(p)}</p>))}
            </div>
            {detail.editions.length > 1 && <nav className={s.index} aria-label={t("Apresentações da coleção")}>
              {[...detail.editions].sort((a, b) => Number(b.id === "catalogo-2025") - Number(a.id === "catalogo-2025")).map(edition => <a key={edition.id} href={t.href(`#${edition.id}`)}>{t(edition.label)}</a>)}
            </nav>}
            {[...detail.editions].sort((a, b) => Number(b.id === "catalogo-2025") - Number(a.id === "catalogo-2025")).map((edition, editionIndex) => (<section key={edition.id} id={edition.id} className={s.edition}>
                <span className={s.editionBadge}>{t(edition.label)}</span>
                <h3>{t(edition.audience)}</h3>
                {edition.context && (<p className={s.notice}>{t(edition.context)}</p>)}
                {edition.foundation.length > 0 && (<details className={s.accordion}>
                    <summary>{t("Fundamenta\u00E7\u00E3o e organiza\u00E7\u00E3o pedag\u00F3gica")}</summary>
                    <div className={s.prose}>
                      {edition.foundation.map((p, i) => (<p key={i}>{t(p)}</p>))}
                    </div>
                  </details>)}
                <details className={s.accordion} open={editionIndex === 0}>
                  <summary>{t("Livros, volumes e destinat\u00E1rios \u00B7 ")}{t.number(edition.books.length)}{t(" ")}{t("itens ")}</summary>
                  <div>
                    {edition.books.map((book) => (<article key={book.id} id={book.id} className={s.book}>
                        {book.image && (<img src={book.image} alt={t("Material: {0}", [book.title])} loading="lazy" width={140} height={180} className={s.bookImage}/>)}
                        <h4>{t(book.title)}</h4>
                        <p className={s.bookInfo}>
                          {t([book.audience, book.schoolYear, book.ageRange]
                        .filter(Boolean)
                        .join(" · "))}
                        </p>
                        <p>{t(book.description)}</p>
                        {(book.pages || book.quantity) && (<p>
                            {book.pages ? t("{0} páginas.", [t.number(book.pages)]) : ""}{t(" ")}
                            {book.quantity ? t("{0} unidades.", [t.number(book.quantity)]) : ""}
                          </p>)}
                        {book.components.length > 0 && (<ul>
                            {book.components.map((component, i) => (<li key={i}>{t(component)}</li>))}
                          </ul>)}
                      </article>))}
                  </div>
                </details>
                {edition.support.length > 0 && (<details className={s.accordion}>
                    <summary>{t("Forma\u00E7\u00E3o e apoio associados a esta apresenta\u00E7\u00E3o ")}</summary>
                    <div>
                      <ul>
                        {edition.support.map((support, i) => (<li key={i}>{t(support)}</li>))}
                      </ul>
                    </div>
                  </details>)}

              </section>))}
          </div>)}
        {prices.length > 0 && (<section id="oferta-2027" className={s.section}>
            <h2 className={s.heading}>{t("Materiais relacionados na tabela 2027. ")}</h2>
            <p className={s.note}>{t("Esta rela\u00E7\u00E3o preserva a nomenclatura e os destinat\u00E1rios da tabela. N\u00E3o atribui a esses itens a composi\u00E7\u00E3o de kits ou a metodologia de outra edi\u00E7\u00E3o. ")}</p>
            <details className={s.accordion}>
              <summary>{t("Consultar ")}{t.number(prices.length)}{t(" materiais e variantes documentados ")}</summary>
              <div className={s.tableScroll} role="region" aria-label={t("Materiais da edição 2027")} tabIndex={0}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th scope="col">{t("Material")}</th>
                      <th scope="col">{t("Destinat\u00E1rio")}</th>
                      <th scope="col">{t("Ano / p\u00FAblico")}</th>
                      <th scope="col">{t("Apresenta\u00E7\u00E3o")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((row) => (<tr key={row.id}>
                        <td>{t(row.material)}</td>
                        <td>{t(row.audience)}</td>
                        <td>{t(row.schoolYear)}</td>
                        <td>{t(row.kit)}</td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </details>
            <TextLink href={t.href(`/recursos/tabela-precos?colecao=${encodeURIComponent(prices[0].collection)}`)}>{t("Consultar os pre\u00E7os publicados \u00B7 2027 ")}</TextLink>
            <p className={s.source}>{t("A edi\u00E7\u00E3o indicada \u00E9 2027. Confirme vig\u00EAncia, disponibilidade e condi\u00E7\u00F5es com a editora. ")}</p>
          </section>)}
      </div>
    </section>);
}
export async function CollectionMaterials({ slug }: {
    slug: string;
}) {
    const t = await getTranslator();
    const detail = getCollectionDetail(slug);
    const resources = getCollectionResources(slug);
    const prices = priceRows.filter(row => row.collectionSlug === slug || row.relatedCollectionSlugs?.includes(slug));
    const gallery: GalleryItem[] = [
        ...(detail?.gallery || []).map((item) => ({
            ...item,
            group: item.group || item.caption,
        })),
        ...resources.flatMap((resource) => (resource.previews || []).map((preview) => ({
            src: preview.src,
            alt: preview.alt,
            caption: `${t(resource.title)} · ${t("página {0} da amostra", [t.number(preview.page)])} · ${t(resource.edition)}`,
            group: resource.title,
        }))),
    ];
    gallery.sort((a, b) => Number(b.editionId === "catalogo-2025") - Number(a.editionId === "catalogo-2025"));
    return <section className={s.materialOpening}><div className="container">
        <nav className={s.index} aria-label={t("Detalhes da coleção")}>
          {detail?.editions.length ? (<a href={t.href("#edicoes")}>{t("Apresenta\u00E7\u00F5es e materiais")}</a>) : null}
          {gallery.length > 0 && <a href={t.href("#galeria")}>{t("Galeria")}</a>}
          {resources.length > 0 && <a href={t.href("#amostras")}>{t("Amostras em PDF")}</a>}
          {prices.length > 0 && (<a href={t.href("#oferta-2027")}>{t("Materiais na tabela 2027")}</a>)}
        </nav>
        {gallery.length > 0 && (<section id="galeria" className={s.materialSection}>
            <h2 className={s.heading}>{t("Veja os materiais por dentro.")}</h2>
            <p className={s.note}>{t("Explore kits, capas e p\u00E1ginas internas. Selecione um material e use \u201CAmpliar imagem\u201D para observar os detalhes. ")}</p>
            <MaterialGallery items={t.data(gallery)}/>
          </section>)}
        {resources.length > 0 && (<section id="amostras" className={s.materialSection}>
            <h2 className={s.heading}>{t("Amostras para consultar.")}</h2>
            <ResourceLinks items={t.data(resources)}/>
            <p className={s.note}>{t("Amostras p\u00FAblicas do acervo da editora. O ano escolar e o volume n\u00E3o equivalem ao ano de edi\u00E7\u00E3o. ")}</p>
          </section>)}

  </div></section>;
}
