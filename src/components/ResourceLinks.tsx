import { getTranslator } from "@/i18n/server";
import type { DocumentResource } from "@/data/resources";
import { Icon } from "./Icon";
import s from "./content.module.css";
export const fileSize = (bytes: number, locale = "pt-BR") => `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(bytes / 1000000)} MB`;
export async function ResourceLinks({ items }: {
    items: DocumentResource[];
}) {
    const t = await getTranslator();
    return (<div className={s.files}>
      {items.map((item) => (<a className={s.file} key={item.id} id={item.id} href={t.href(item.url)} target="_blank" rel="noopener noreferrer">
          <Icon name="book" size={25}/>
          <div>
            <strong>{t(item.title)}</strong>
            <span>
              {t(item.edition)}
              {t(item.audience ? ` · ${item.audience}` : "")}
            </span>
            <span>PDF · {fileSize(item.sizeBytes, t.numberLocale)} · {t.number(item.pageCount)} {t("páginas digitais")} · {t("Arquivo original em português")}</span>
            {item.notes && <span>{t(item.notes)}</span>}
            <span>{t(item.kind === "sample" ? "Ver amostra em PDF" : item.kind === "catalog" ? "Abrir catálogo em PDF" : "Abrir documento em PDF")} <Icon name="external" size={12}/>
            </span>
            <span className="sr-only">{t("Abre em nova aba")}</span>
          </div>
        </a>))}
    </div>);
}
