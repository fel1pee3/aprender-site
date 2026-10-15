"use client";
import { createContext, useContext, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useT } from "@/i18n/client";
import Link from "@/i18n/Link";
import { defaultPreferences, preferenceAttributes, preferenceCookie, type ReadingPreferences } from "@/lib/reading-preferences";
import styles from "./ReadingPreferences.module.css";

const ReadingContext = createContext<{
  preferences: ReadingPreferences;
  setPreference: <K extends keyof ReadingPreferences>(key: K, value: ReadingPreferences[K]) => void;
  restore: () => void;
}>({ preferences: defaultPreferences, setPreference: () => {}, restore: () => {} });

export function ReadingProvider({ initialPreferences, children }: { initialPreferences: ReadingPreferences; children: ReactNode }) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const save = (next: ReadingPreferences) => {
    setPreferences(next);
    for (const [key, value] of Object.entries(preferenceAttributes(next))) document.documentElement.setAttribute(key, value);
    try {
      document.cookie = `${preferenceCookie}=${encodeURIComponent(JSON.stringify(next))}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    } catch { /* Preferences still work for the current visit if cookies are blocked. */ }
  };
  return <ReadingContext.Provider value={{ preferences, setPreference: (key, value) => save({ ...preferences, [key]: value }), restore: () => save({ ...defaultPreferences }) }}>{children}</ReadingContext.Provider>;
}

export function ReadingPreferencesPanel({ onOpen, returnFocusRef }: { onOpen?: () => void; returnFocusRef?: RefObject<HTMLButtonElement | null> }) {
  const t = useT();
  const { preferences, setPreference, restore } = useContext(ReadingContext);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [restored, setRestored] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const id = useId();
  useEffect(() => { setPortalTarget(document.body); }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  function trap(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = [...(dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]') || [])].filter(element => element.getClientRects().length && (element.tagName !== "INPUT" || (element as HTMLInputElement).checked));
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  const group = <K extends keyof ReadingPreferences>(key: K, legend: string, options: [ReadingPreferences[K], string][]) => <fieldset>
    <legend>{t(legend)}</legend>
    <div className={styles.options}>{options.map(([value, label]) => <label key={value}>
      <input type="radio" name={`${id}-${key}`} value={value} checked={preferences[key] === value} onChange={() => { setPreference(key, value); setRestored(false); }} />
      <span>{t(label)}</span>
    </label>)}</div>
  </fieldset>;
  return <>
    <button className={styles.trigger} data-reading-trigger type="button" ref={trigger} disabled={!portalTarget} aria-haspopup="dialog" aria-expanded={open} aria-controls={`${id}-dialog`} onClick={() => { onOpen?.(); dialog.current?.showModal(); setOpen(true); setRestored(false); }}>{t("Preferências de leitura")}</button>
    {portalTarget && createPortal(<dialog className={styles.dialog} ref={dialog} id={`${id}-dialog`} aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} onKeyDown={trap} onClose={() => { setOpen(false); (returnFocusRef?.current || trigger.current)?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={styles.top}>
        <h2 id={`${id}-title`}>{t("Preferências de leitura")}</h2>
        <button className={styles.close} type="button" onClick={() => dialog.current?.close()} aria-label={t("Fechar preferências de leitura")}>×</button>
      </div>
      <p id={`${id}-description`}>{t("Ajuste a apresentação do site. Suas escolhas são salvas neste navegador quando os cookies estão disponíveis.")}</p>
      {group("theme", "Aparência", [["system", "Sistema"], ["light", "Claro"], ["dark", "Escuro"]])}
      {group("contrast", "Contraste", [["normal", "Padrão"], ["more", "Reforçado"]])}
      {group("textSize", "Tamanho do texto", [["100", "100%"], ["125", "125%"], ["150", "150%"], ["175", "175%"], ["200", "200%"]])}
      {group("spacing", "Espaçamento", [["standard", "Padrão"], ["comfortable", "Confortável"]])}
      {group("motion", "Movimento", [["system", "Sistema"], ["reduce", "Reduzido"]])}
      <div className={styles.actions}>
        <button type="button" onClick={() => { restore(); setRestored(true); }}>{t("Restaurar preferências de leitura")}</button>
        <Link href="/acessibilidade" onClick={() => dialog.current?.close()}>{t("Conheça os recursos de acessibilidade")}</Link>
      </div>
      <p className={styles.status} role="status">{restored ? t("Preferências de leitura restauradas. O idioma e os filtros foram mantidos.") : ""}</p>
    </dialog>, portalTarget)}
  </>;
}
