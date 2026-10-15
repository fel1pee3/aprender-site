"use client";
import { useSearchParams } from "next/navigation";
import { priceRows } from "@/data/prices";
import s from "./content.module.css";
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
export function PriceExplorer() {
  const params = useSearchParams();
  const query = params.get("q") || "";
  const collection = params.get("colecao") || "";
  const audience = params.get("publico") || "";
  const collections = Array.from(
    new Set(priceRows.map((row) => row.collection)),
  ).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const audiences = Array.from(
    new Set(priceRows.map((row) => row.audience)),
  ).sort();
  const results = priceRows.filter(
    (row) =>
      (!query ||
        normalize(
          `${row.material} ${row.collection} ${row.schoolYear} ${row.audience} ${row.kit}`,
        ).includes(normalize(query.trim()))) &&
      (!collection ||
        row.collection === collection ||
        row.collectionSlug === collection) &&
      (!audience || row.audience === audience),
  );
  function update(key: string, value: string) {
    const url = new URL(location.href);
    value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
    history.replaceState(null, "", url.pathname + url.search);
  }
  function reset() {
    history.pushState(null, "", location.pathname);
  }
  return (
    <>
      <form
        className={s.filters}
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="Consultar tabela de preços"
      >
        <div>
          <label htmlFor="price-search">Material ou ano</label>
          <input
            id="price-search"
            type="search"
            value={query}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Ex.: inglês, 6º ano, professor"
          />
        </div>
        <div>
          <label htmlFor="price-collection">Coleção</label>
          <select
            id="price-collection"
            value={collection}
            onChange={(e) => update("colecao", e.target.value)}
          >
            <option value="">Todas as coleções</option>
            {collections.map((name) => (
              <option key={name}>{name}</option>
            ))}
            {collection && !collections.includes(collection) && (
              <option value={collection}>
                {priceRows.find((row) => row.collectionSlug === collection)
                  ?.collection || "Coleção não encontrada"}
              </option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="price-audience">Destinatário</label>
          <select
            id="price-audience"
            value={audience}
            onChange={(e) => update("publico", e.target.value)}
          >
            <option value="">Todos os públicos</option>
            {audiences.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
      </form>
      <div className={s.results}>
        <p role="status">
          {results.length}{" "}
          {results.length === 1 ? "item encontrado" : "itens encontrados"} ·
          edição 2027
        </p>
        {(query || collection || audience) && (
          <button className={s.reset} onClick={reset}>
            Limpar filtros
          </button>
        )}
      </div>
      {results.length ? (
        <div
          className={s.tableScroll}
          role="region"
          aria-label="Tabela de preços com rolagem horizontal"
          tabIndex={0}
        >
          <table className={s.table}>
            <caption>
              Preços de capa publicados pela Aprender Editora na tabela
              identificada como 2027. Confirme a vigência e as condições com a
              editora.
            </caption>
            <thead>
              <tr>
                <th scope="col">Material</th>
                <th scope="col">Destinatário</th>
                <th scope="col">Ano / público</th>
                <th scope="col">Apresentação</th>
                <th scope="col">Preço de capa</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.id}>
                  <td>
                    {row.material}
                    <small>
                      {row.collection} · {row.segment}
                    </small>
                  </td>
                  <td>{row.audience}</td>
                  <td>{row.schoolYear}</td>
                  <td>{row.kit}</td>
                  <td>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(row.priceCents / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={s.empty}>
          <h2>Nenhum material nesta combinação.</h2>
          <p>Altere o nome, a coleção ou o destinatário.</p>
          <button className={s.reset} onClick={reset}>
            Ver todos os preços
          </button>
        </div>
      )}
    </>
  );
}
