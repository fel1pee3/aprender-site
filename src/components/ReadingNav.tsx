import Link from "next/link";
import { institutionalNavigation } from "@/data/navigation";
import s from "./content.module.css";
export function ReadingNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Conteúdo institucional" className={s.index}>
      {institutionalNavigation.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          aria-current={current === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
