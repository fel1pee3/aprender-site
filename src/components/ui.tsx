"use client";
import { useT } from "@/i18n/client";
import Link from "@/i18n/Link";
import Image from "@/components/AssetImage";
import type { CSSProperties, ReactNode } from "react";
import type { Solution } from "@/data/solutions";
import { Icon } from "./Icon";
import styles from "./ui.module.css";
export function Button({ href, children, secondary = false, external = false, }: {
    href: string;
    children: ReactNode;
    secondary?: boolean;
    external?: boolean;
}) {
    const t = useT();
    return (<Link href={t.href(href)} className={`${styles.button} ${secondary ? styles.secondary : ""}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {t(children)}
      <Icon name={external ? "external" : "arrow"} size={19}/>
      {external && <span className="sr-only">{t(" (abre em nova aba)")}</span>}
    </Link>);
}
export function TextLink({ href, children, }: {
    href: string;
    children: ReactNode;
}) {
    const t = useT();
    const external = /^https?:/.test(href);
    const asset = /\.(?:pdf|jpe?g|png|webp|mp4|vtt)(?:[?#]|$)/i.test(href);
    if (external || asset)
        return (<a href={t.href(href)} className={styles.textLink}>
        {t(children)}
        <Icon name={external ? "external" : "arrow"} size={19}/>
      </a>);
    return (<Link href={t.href(href)} className={styles.textLink}>
      {t(children)}
      <Icon name={/^https?:/.test(href) ? "external" : "arrow"} size={19}/>
    </Link>);
}
export function Eyebrow({ children, light = false, }: {
    children: ReactNode;
    light?: boolean;
}) {
    const t = useT();
    return (<p className={`${styles.eyebrow} ${light ? styles.light : ""}`}>
      <span />
      {t(children)}
    </p>);
}
export function SectionHeading({ eyebrow, title, description, children, }: {
    eyebrow: string;
    title: ReactNode;
    description?: string;
    children?: ReactNode;
}) {
    const t = useT();
    return (<div className={styles.sectionHeading}>
      <div>
        <Eyebrow>{t(eyebrow)}</Eyebrow>
        <h2>{t(title)}</h2>
        {description && <p className={styles.description}>{t(description)}</p>}
      </div>
      {t(children)}
    </div>);
}
export function ProductCard({ solution }: {
    solution: Solution;
}) {
    const t = useT();
    return (<Link className={styles.productCard} href={t.href(`/solucoes/${solution.slug}`)} style={{ "--card-color": solution.accent } as CSSProperties}>
      <div className={styles.cover}>
        {solution.image ? (<Image src={solution.image} alt={t("Materiais da coleção {0}", [solution.name])} width={320} height={380} sizes="(max-width: 600px) 78vw, (max-width: 1000px) 40vw, 280px"/>) : (<div className={styles.textCover}>
            <Icon name="book" size={38}/>
            <strong>{t(solution.name)}</strong>
            <span>{t("Materiais de estudantes e professores")}</span>
          </div>)}
        <span className={styles.roundArrow}>
          <Icon name="arrow" size={21}/>
        </span>
      </div>
      <div className={styles.cardCopy}>
        <span className={styles.stage}>{t(solution.stage)}</span>
        <h3>{t(solution.name)}</h3>
        <p>{t(solution.subtitle || solution.description)}</p>
      </div>
    </Link>);
}
export function Breadcrumb({ items, }: {
    items: {
        label: string;
        href?: string;
    }[];
}) {
    const t = useT();
    return (<nav aria-label={t("Caminho de navegação")} className={styles.breadcrumb}>
      <Link href={t.href("/")}>{t("In\u00EDcio")}</Link>
      {items.map((item, i) => (<span key={i}>
          <Icon name="chevron" size={12}/>
          {item.href ? (<Link href={t.href(item.href)}>{t(item.label)}</Link>) : (<span aria-current="page">{t(item.label)}</span>)}
        </span>))}
    </nav>);
}
export function PageIntro({ eyebrow, title, description, breadcrumb, }: {
    eyebrow: string;
    title: ReactNode;
    description: string;
    breadcrumb?: string;
}) {
    const t = useT();
    return (<section className={styles.pageIntro}>
      <div className="container">
        <Breadcrumb items={t.data([{ label: breadcrumb || eyebrow }])}/>
        <Eyebrow>{t(eyebrow)}</Eyebrow>
        <h1>{t(title)}</h1>
        <p>{t(description)}</p>
      </div>
    </section>);
}
export function ContactCTA() {
    const t = useT();
    return (<section className={styles.cta}>
      <div className="container">
        <div>
          <Eyebrow light>{t("Vamos construir juntos")}</Eyebrow>
          <h2>{t("Cada rede tem uma realidade. ")}<br />
            <em>{t("Vamos conhecer a sua?")}</em>
          </h2>
          <p>{t("Conhe\u00E7a os materiais, a forma\u00E7\u00E3o e o acompanhamento adequados \u00E0 sua rede de ensino. ")}</p>
        </div>
        <Button href={t.href("/contato")}>{t("Conversar com a Aprender")}</Button>
      </div>
    </section>);
}
