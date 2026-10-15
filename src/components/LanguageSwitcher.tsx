"use client";
import { useId } from "react";
import { usePathname } from "next/navigation";
import { useT } from "@/i18n/client";
import { localizedPath, type Locale } from "@/i18n/shared";
import { languageCookie } from "@/lib/reading-preferences";
import styles from "./LanguageSwitcher.module.css";
export function LanguageSwitcher({ preferredLocale }: { preferredLocale?: Locale }) {
  const t = useT();
  const pathname = usePathname();
  const id = useId();
  function change(locale: Locale) {
    try { document.cookie = `${languageCookie}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`; } catch { /* URL remains the source of truth. */ }
    window.location.assign(localizedPath(pathname, locale) + window.location.search + window.location.hash);
  }
  return <div className={styles.switcher}>
    <label htmlFor={id}>{t("Idioma")}</label>
    <select id={id} value={t.locale} onChange={event => change(event.target.value as Locale)}>
      <option value="pt" lang="pt-BR">Português</option>
      <option value="en" lang="en">English</option>
      <option value="es" lang="es">Español</option>
    </select>
    {preferredLocale && preferredLocale !== t.locale && <button type="button" onClick={() => change(preferredLocale)}>{t("Usar {0}", [preferredLocale === "en" ? "English" : preferredLocale === "es" ? "Español" : "Português"])}</button>}
  </div>;
}
