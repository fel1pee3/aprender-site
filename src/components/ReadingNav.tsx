import { getTranslator } from "@/i18n/server";
import Link from "@/i18n/Link";
import { institutionalNavigation } from "@/data/navigation";
import s from "./content.module.css";
export async function ReadingNav({ current }: {
    current?: string;
}) {
    const t = await getTranslator();
    return (<nav aria-label={t("Conteúdo institucional")} className={s.index}>
      {institutionalNavigation.map((item) => (<Link href={t.href(item.href)} key={item.href} aria-current={current === item.href ? "page" : undefined}>
          {t(item.label)}
        </Link>))}
    </nav>);
}
