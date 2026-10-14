import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Solution } from "@/data/solutions";
import { Icon } from "./Icon";
import styles from "./ui.module.css";

export function Button({
  href,
  children,
  secondary = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${styles.button} ${secondary ? styles.secondary : ""}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon name={external ? "external" : "arrow"} size={19} />
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={styles.textLink}>
      {children}
      <Icon name="arrow" size={19} />
    </Link>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`${styles.eyebrow} ${light ? styles.light : ""}`}>
      <span />
      {children}
    </p>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function ProductCard({ solution }: { solution: Solution }) {
  return (
    <Link
      className={styles.productCard}
      href={`/solucoes/${solution.slug}`}
      style={{ "--card-color": solution.accent } as CSSProperties}
    >
      <div className={styles.cover}>
        <Image
          src={solution.image}
          alt={`Capa da coleção ${solution.name}`}
          width={320}
          height={380}
          sizes="(max-width: 600px) 78vw, (max-width: 1000px) 40vw, 280px"
        />
        <span className={styles.roundArrow}>
          <Icon name="arrow-up" size={21} />
        </span>
      </div>
      <div className={styles.cardCopy}>
        <span className={styles.stage}>{solution.stage}</span>
        <h3>{solution.name}</h3>
        <p>{solution.subtitle || solution.description}</p>
      </div>
    </Link>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Caminho de navegação" className={styles.breadcrumb}>
      <Link href="/">Início</Link>
      {items.map((item, i) => (
        <span key={i}>
          <Icon name="chevron" size={12} />
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  breadcrumb?: string;
}) {
  return (
    <section className={styles.pageIntro}>
      <div className="container">
        <Breadcrumb items={[{ label: breadcrumb || eyebrow }]} />
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function ContactCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div>
          <Eyebrow light>Vamos construir juntos</Eyebrow>
          <h2>
            Cada rede tem uma realidade.
            <br />
            <em>Vamos conhecer a sua?</em>
          </h2>
          <p>
            Converse com a Aprender sobre os caminhos para a aprendizagem no seu
            município.
          </p>
        </div>
        <Button href="/contato">Conversar com a Aprender</Button>
      </div>
    </section>
  );
}
