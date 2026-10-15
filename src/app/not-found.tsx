"use client";
import { useT } from "@/i18n/client";
import { Button, TextLink } from "@/components/ui";
import s from "./inner.module.css";
export default function NotFound() {
    const t = useT();
    return (<section className={s.notFound}>
      <div className="container">
        <span aria-hidden="true">{t("404")}</span>
        <h1>{t("Vamos encontrar outro caminho?")}</h1>
        <p>{t("A p\u00E1gina que voc\u00EA procura n\u00E3o foi encontrada. H\u00E1 muitas descobertas esperando por voc\u00EA no nosso cat\u00E1logo. ")}</p>
        <div className={s.actions}>
          <Button href={t.href("/solucoes")}>{t("Explorar as solu\u00E7\u00F5es")}</Button>
          <TextLink href={t.href("/")}>{t("Voltar ao in\u00EDcio")}</TextLink>
        </div>
      </div>
    </section>);
}
