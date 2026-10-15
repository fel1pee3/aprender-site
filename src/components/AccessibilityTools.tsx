"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ReadingPreferencesPanel } from "@/components/ReadingPreferences";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { VLibras } from "@/components/VLibras";
import { useT } from "@/i18n/client";
import type { Locale } from "@/i18n/shared";
import styles from "./AccessibilityTools.module.css";

export function AccessibilityTools({ preferredLocale }: { preferredLocale?: Locale }) {
  const t = useT();
  const pathname = usePathname();
  const id = useId();
  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const focusError = useRef(false);
  const close = useCallback(() => { panel.current?.hidePopover(); }, []);
  const returnFocus = useCallback(() => { launcher.current?.focus({ preventScroll: true }); }, []);
  const reveal = useCallback(() => { focusError.current = true; panel.current?.showPopover(); }, []);
  useEffect(() => { close(); }, [pathname, close]);

  return <>
    <button ref={launcher} type="button" className={styles.launcher} popoverTarget={id} aria-label={t("Acessibilidade e idioma")} aria-controls={id} aria-expanded={open} title={t("Acessibilidade e idioma")}>
      <Icon name="accessibility" size={25} />
      <span>{t("Acessibilidade")}</span>
    </button>
    <section ref={panel} id={id} popover="auto" role="region" aria-labelledby={`${id}-title`} className={styles.panel} onToggle={event => {
      const expanded = (event.nativeEvent as ToggleEvent).newState === "open";
      setOpen(expanded);
      if (expanded) {
        panel.current?.querySelector<HTMLButtonElement>(focusError.current ? "[data-vlibras-retry]" : "[data-reading-trigger]")?.focus({ preventScroll: true });
        focusError.current = false;
      }
    }}>
      <div className={styles.top}>
        <h2 id={`${id}-title`}>{t("Acessibilidade e idioma")}</h2>
        <button type="button" onClick={() => { close(); returnFocus(); }} aria-label={t("Fechar acessibilidade e idioma")} className={styles.close}><Icon name="close" size={21} /></button>
      </div>
      <div className={styles.group}>
        <ReadingPreferencesPanel onOpen={close} returnFocusRef={launcher} />
      </div>
      <div className={styles.group}>
        <LanguageSwitcher preferredLocale={preferredLocale} />
      </div>
      <div className={styles.group}>
        <VLibras onActivate={close} onReturnFocus={returnFocus} onFailure={reveal} />
      </div>
    </section>
  </>;
}
