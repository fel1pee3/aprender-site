"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ui";
import { solutions, stages, objectives } from "@/data/solutions";
import styles from "./CatalogExplorer.module.css";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

export function CatalogExplorer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const stage = searchParams.get("etapa") ?? "";
  const objective = searchParams.get("objetivo") ?? "";
  const hasFilters = Boolean(query || stage || objective);

  function updateFilter(key: "q" | "etapa" | "objetivo", value: string) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    // Native history updates keep the results immediate and preserve back/forward navigation.
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (key === "q") window.history.replaceState(null, "", nextUrl);
    else window.history.pushState(null, "", nextUrl);
  }

  function resetFilters() {
    const url = new URL(window.location.href);
    ["q", "etapa", "objetivo"].forEach((key) => url.searchParams.delete(key));
    window.history.pushState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }

  const results = useMemo(() => {
    const term = normalize(query.trim());
    return solutions.filter(
      (solution) =>
        (!term || normalize(solution.name).includes(term)) &&
        (!stage || solution.stageIds.some((id) => id === stage)) &&
        (!objective || solution.objectiveId === objective),
    );
  }, [query, stage, objective]);

  return (
    <div className={styles.explorer}>
      <form
        className={styles.filters}
        role="search"
        aria-label="Buscar soluções educacionais"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={styles.searchField}>
          <label htmlFor="catalog-search">Qual solução você procura?</label>
          <div className={styles.searchInput}>
            <Icon name="search" size={20} />
            <input
              id="catalog-search"
              type="search"
              placeholder="Busque pelo nome da coleção"
              value={query}
              onChange={(event) => updateFilter("q", event.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div className={styles.selectField}>
          <label htmlFor="catalog-stage">Etapa de ensino</label>
          <select
            id="catalog-stage"
            value={stage}
            onChange={(event) => updateFilter("etapa", event.target.value)}
          >
            <option value="">Todas as etapas</option>
            {stages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
            {stage && !stages.some((item) => item.id === stage) && (
              <option value={stage}>Etapa não encontrada</option>
            )}
          </select>
        </div>
        <div className={styles.selectField}>
          <label htmlFor="catalog-objective">Objetivo pedagógico</label>
          <select
            id="catalog-objective"
            value={objective}
            onChange={(event) => updateFilter("objetivo", event.target.value)}
          >
            <option value="">Todos os objetivos</option>
            {objectives.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
            {objective && !objectives.some((item) => item.id === objective) && (
              <option value={objective}>Objetivo não encontrado</option>
            )}
          </select>
        </div>
      </form>

      <div className={styles.resultsBar}>
        <p role="status" aria-live="polite">
          <strong>{results.length}</strong>{" "}
          {results.length === 1 ? "solução encontrada" : "soluções encontradas"}
          {query.trim() ? (
            <>
              {" "}
              para <span>“{query.trim()}”</span>
            </>
          ) : (
            ""
          )}
        </p>
        {hasFilters && (
          <button type="button" className={styles.reset} onClick={resetFilters}>
            Limpar filtros <Icon name="close" size={15} />
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((solution) => (
            <ProductCard key={solution.slug} solution={solution} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <Icon name="search" size={28} />
          </span>
          <h2>Vamos tentar outro caminho?</h2>
          <p>
            Nenhuma solução corresponde a essa combinação. Experimente outro
            nome ou amplie os filtros.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={styles.emptyReset}
          >
            Ver todas as soluções <Icon name="arrow" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
