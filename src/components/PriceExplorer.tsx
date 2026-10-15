"use client";
import { useT } from "@/i18n/client";
import { useHydrated } from "@/lib/use-hydrated";
import { useSearchParams } from "next/navigation";
import { priceRows } from "@/data/prices";
import s from "./content.module.css";
const normalize = (text: string) => text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
export function PriceExplorer() {
    const hydrated = useHydrated();
    const t = useT();
    const params = useSearchParams();
    const query = params.get("q") || "";
    const collection = params.get("colecao") || "";
    const audience = params.get("publico") || "";
    const collections = Array.from(new Set(priceRows.map((row) => row.collection))).sort((a, b) => t(a).localeCompare(t(b), t.numberLocale));
    const audiences = Array.from(new Set(priceRows.map((row) => row.audience))).sort((a, b) => t(a).localeCompare(t(b), t.numberLocale));
    const results = priceRows.filter((row) => (!query ||
        normalize([row.material, row.collection, row.schoolYear, row.audience, row.kit, row.segment, t(row.material), t(row.collection), t(row.schoolYear), t(row.audience), t(row.kit), t(row.segment)].join(" ")).includes(normalize(query.trim()))) &&
        (!collection ||
            row.collection === collection ||
            row.collectionSlug === collection) &&
        (!audience || row.audience === audience));
    function update(key: string, value: string) {
        const url = new URL(location.href);
        value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
        const next = url.pathname + url.search + url.hash;
        if (key === "q") history.replaceState(null, "", next);
        else history.pushState(null, "", next);
    }
    function reset() {
        const url = new URL(location.href);
        ["q", "colecao", "publico"].forEach((key) => url.searchParams.delete(key));
        history.pushState(null, "", url.pathname + url.search + url.hash);
    }
    return (<>
      <form className={s.filters} onSubmit={(e) => e.preventDefault()} role="search" aria-label={t("Consultar tabela de preços")}>
        <div>
          <label htmlFor="price-search">{t("Material ou ano")}</label>
          <input disabled={!hydrated} id="price-search" type="search" value={query} onChange={(e) => update("q", e.target.value)} placeholder={t("Ex.: inglês, 6º ano, professor")}/>
        </div>
        <div>
          <label htmlFor="price-collection">{t("Cole\u00E7\u00E3o")}</label>
          <select disabled={!hydrated} id="price-collection" value={collection} onChange={(e) => update("colecao", e.target.value)}>
            <option value="">{t("Todas as cole\u00E7\u00F5es")}</option>
            {collections.map((name) => (<option key={name} value={name}>{t(name)}</option>))}
            {collection && !collections.includes(collection) && (<option value={collection}>
                {t(priceRows.find((row) => row.collectionSlug === collection)
                ?.collection || "Coleção não encontrada")}
              </option>)}
          </select>
        </div>
        <div>
          <label htmlFor="price-audience">{t("Destinat\u00E1rio")}</label>
          <select disabled={!hydrated} id="price-audience" value={audience} onChange={(e) => update("publico", e.target.value)}>
            <option value="">{t("Todos os p\u00FAblicos")}</option>
            {audiences.map((name) => (<option key={name} value={name}>{t(name)}</option>))}
            {audience && !audiences.includes(audience) && (<option value={audience}>{t("Público não encontrado")}</option>)}
          </select>
        </div>
      </form>
      <div className={s.results}>
        <p role="status">
          {t.number(results.length)}{t(" ")}
          {t(results.length === 1 ? "item encontrado" : "itens encontrados")}{t(" \u00B7 edi\u00E7\u00E3o 2027 ")}</p>
        {(query || collection || audience) && (<button disabled={!hydrated} className={s.reset} onClick={reset}>{t("Limpar filtros ")}</button>)}
      </div>
      {results.length ? (<div className={s.tableScroll} role="region" aria-label={t("Tabela de preços com rolagem horizontal")} tabIndex={0}>
          <table className={s.table}>
            <caption>{t("Pre\u00E7os de capa publicados pela Aprender Editora na tabela identificada como 2027. Confirme a vig\u00EAncia e as condi\u00E7\u00F5es com a editora. ")}</caption>
            <thead>
              <tr>
                <th scope="col">{t("Material")}</th>
                <th scope="col">{t("Destinat\u00E1rio")}</th>
                <th scope="col">{t("Ano / p\u00FAblico")}</th>
                <th scope="col">{t("Apresenta\u00E7\u00E3o")}</th>
                <th scope="col">{t("Pre\u00E7o de capa")}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (<tr key={row.id}>
                  <td>
                    {t(row.material)}
                    <small>
                      {t(row.collection)}{t(" \u00B7 ")}{t(row.segment)}
                    </small>
                  </td>
                  <td>{t(row.audience)}</td>
                  <td>{t(row.schoolYear)}</td>
                  <td>{t(row.kit)}</td>
                  <td>
                    {t.number(row.priceCents / 100, {
                    style: "currency",
                    currency: "BRL",
                })}
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>) : (<div className={s.empty}>
          <h2>{t("Nenhum material nesta combina\u00E7\u00E3o.")}</h2>
          <p>{t("Altere o nome, a cole\u00E7\u00E3o ou o destinat\u00E1rio.")}</p>
          <button disabled={!hydrated} className={s.reset} onClick={reset}>{t("Ver todos os pre\u00E7os ")}</button>
        </div>)}
    </>);
}
