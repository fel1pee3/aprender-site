import type { DocumentResource } from "@/data/resources";
import { Icon } from "./Icon";
import s from "./content.module.css";
export const fileSize = (bytes: number) =>
  `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
export function ResourceLinks({ items }: { items: DocumentResource[] }) {
  return (
    <div className={s.files}>
      {items.map((item) => (
        <a
          className={s.file}
          key={item.id}
          id={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="book" size={25} />
          <div>
            <strong>{item.title}</strong>
            <span>
              {item.edition}
              {item.audience ? ` · ${item.audience}` : ""}
            </span>
            <span>
              PDF · {fileSize(item.sizeBytes)} · {item.pageCount} páginas
              digitais
            </span>
            {item.notes && <span>{item.notes}</span>}
            <span>
              Abrir {item.kind === "sample" ? "amostra" : item.kind === "catalog" ? "catálogo" : "documento"} em PDF (nova aba) <Icon name="external" size={12} />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
