"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useT } from "@/i18n/client";
import { splitLocale } from "@/i18n/shared";
import styles from "./VLibras.module.css";

declare global {
  interface Window {
    VLibrasWidget?: { initBtn?: HTMLButtonElement };
  }
}

const scriptUrl = "https://vlibras.gov.br/app/vlibras-plugin.js";
const scriptId = "aprender-vlibras-script";
const bootstrapTimeout = 15_000;
const applicationTimeout = 30_000;
let bootstrap: Promise<HTMLButtonElement> | undefined;

// The official bootstrap initializes itself. It must never be combined with
// another Widget constructor call. A shared promise also covers Strict Mode.
function loadOfficialButton() {
  const existingButton = window.VLibrasWidget?.initBtn;
  if (existingButton?.isConnected) return Promise.resolve(existingButton);
  if (bootstrap) return bootstrap;
  bootstrap = new Promise<HTMLButtonElement>((resolve, reject) => {
    let settled = false;
    let polling = 0;
    let timeout = 0;
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    const script = existingScript || document.createElement("script");
    const finish = (button?: HTMLButtonElement) => {
      if (settled) return;
      settled = true;
      window.clearInterval(polling);
      window.clearTimeout(timeout);
      script.removeEventListener("error", failed);
      if (button) resolve(button);
      else reject(new Error("The official VLibras resource is unavailable."));
    };
    const failed = () => finish();
    script.addEventListener("error", failed, { once: true });
    polling = window.setInterval(() => {
      const button = window.VLibrasWidget?.initBtn;
      if (button?.isConnected) finish(button);
    }, 80);
    timeout = window.setTimeout(() => finish(), bootstrapTimeout);
    if (!existingScript) {
      script.id = scriptId;
      script.src = scriptUrl;
      script.async = true;
      document.body.appendChild(script);
    }
  });
  return bootstrap;
}

type Status = "idle" | "loading" | "opening" | "ready" | "failed";

export function VLibras({ onActivate, onReturnFocus, onFailure }: { onActivate?: () => void; onReturnFocus?: () => void; onFailure?: () => void } = {}) {
  const t = useT();
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [statusHost, setStatusHost] = useState<HTMLElement | null>(null);
  const [portugueseHref, setPortugueseHref] = useState(splitLocale(pathname).path);
  const slot = useRef<HTMLSpanElement>(null);
  const mounted = useRef(false);
  const releaseButton = useRef<(() => void) | undefined>(undefined);
  const applicationLoading = useRef(false);
  const officialButton = useRef<HTMLButtonElement | undefined>(undefined);
  const retryButton = useRef<HTMLButtonElement>(null);

  useEffect(() => { setStatusHost(document.body); }, []);

  useEffect(() => {
    if (t.locale !== "pt" || status === "idle" || status === "failed") return;
    let cleanupDock = () => {};
    let attached = false;
    const attach = () => {
      if (attached) return;
      const host = document.getElementById("vlibras-app-root");
      const mount = document.getElementById("vlibras-dock-mount");
      if (!host || !mount) return;
      attached = true;
      const dock = document.createElement("aside");
      dock.id = "libras-avatar";
      dock.className = styles.avatarDock;
      dock.setAttribute("aria-label", t("Tradução automática para Libras"));
      dock.tabIndex = -1;
      mount.appendChild(dock);
      dock.appendChild(host);
      // Keep the official fixed overlay in viewport coordinates. This wrapper
      // never reserves page space or changes the player's shadow DOM.
      host.classList.add(styles.avatarHost);
      const accessFrame = window.VLibrasWidget?.initBtn?.parentElement;
      const update = () => {
        // data-active is only the bootstrap's open command. The official app
        // hides its access button while open and reveals it when closed.
        const open = accessFrame?.style.display === "none";
        dock.hidden = !open;
        document.documentElement.toggleAttribute("data-libras-open", open);
        if (mounted.current) setAvatarOpen(open);
      };
      const observer = new MutationObserver(update);
      if (accessFrame) observer.observe(accessFrame, { attributes: true, attributeFilter: ["style"] });
      update();
      cleanupDock = () => {
        observer.disconnect();
        host.classList.remove(styles.avatarHost);
        document.body.appendChild(host);
        dock.remove();
        document.documentElement.removeAttribute("data-libras-open");
      };
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true });
    return () => { observer.disconnect(); cleanupDock(); };
  }, [status === "idle" || status === "failed", t]);

  useEffect(() => {
    setPortugueseHref(splitLocale(pathname).path + window.location.search + window.location.hash);
  }, [pathname]);

  const attachOfficialButton = useCallback((button: HTMLButtonElement) => {
    const root = button.getRootNode();
    if (!(root instanceof ShadowRoot) || !slot.current) return false;
    const host = root.host as HTMLElement;
    const frame = button.parentElement;
    if (!frame) return false;
    releaseButton.current?.();
    // initBtn is documented for DOM listeners/styles. Keep that original
    // control, positioned in the utility panel instead of floating over content.
    slot.current.appendChild(host);
    host.hidden = false;
    Object.assign(host.style, { display: "inline-flex", position: "static", width: "44px", height: "44px" });
    Object.assign(frame.style, { position: "relative", top: "auto", right: "auto", left: "auto", zIndex: "auto", width: "44px", height: "44px", overflow: "hidden", transition: "none" });
    Object.assign(button.style, { width: "44px", height: "44px", inset: "0", borderRadius: "6px", border: "1px solid var(--control-border)", transition: "border-color 160ms ease" });
    button.setAttribute("aria-label", t("Traduzir conteúdo em Libras"));
    const popup = root.getElementById("vlibras-popup");
    if (popup instanceof HTMLElement) popup.hidden = true;
    officialButton.current = button;
    let clearApplicationWatch: (() => void) | undefined;
    const hover = () => {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) button.style.borderColor = "var(--link)";
    };
    const leave = () => { button.style.borderColor = "var(--control-border)"; };
    const beforeOpen = (event: MouseEvent) => {
      if (applicationLoading.current) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      onActivate?.();
      onReturnFocus?.();
      if (document.getElementById("vlibras-app-root")) return;
      // The official bootstrap may already have requested its app because it
      // remembers an earlier open state. Observe that request, without issuing
      // a second click to its loader while the module is still downloading.
      if (document.querySelector('script[src*="vlibras-plugin-app.js"]')) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      applicationLoading.current = true;
      setStatus("opening");
      button.disabled = true;
      let waiting = 0;
      let deadline = 0;
      let appScript: HTMLScriptElement | null = null;
      const clean = () => {
        window.clearInterval(waiting);
        window.clearTimeout(deadline);
        appScript?.removeEventListener("load", loaded);
        appScript?.removeEventListener("error", failed);
        document.removeEventListener("error", resourceFailed, { capture: true });
      };
      const finish = (success: boolean) => {
        clean();
        applicationLoading.current = false;
        button.disabled = !success;
        if (mounted.current) setStatus(success ? "ready" : "failed");
      };
      const loaded = () => finish(Boolean(document.getElementById("vlibras-app-root")));
      const failed = () => finish(false);
      const resourceFailed = (error: Event) => {
        if (error.target instanceof HTMLScriptElement && error.target.src.includes("vlibras-plugin-app.js")) failed();
      };
      document.addEventListener("error", resourceFailed, { capture: true });
      waiting = window.setInterval(() => {
        if (appScript) return;
        appScript = document.querySelector<HTMLScriptElement>('script[src*="vlibras-plugin-app.js"]');
        if (appScript) {
          appScript.addEventListener("load", loaded, { once: true });
          appScript.addEventListener("error", failed, { once: true });
          // Module evaluation may finish before the next polling interval.
          if (document.getElementById("vlibras-app-root")) finish(true);
        }
      }, 80);
      deadline = window.setTimeout(failed, applicationTimeout);
      clearApplicationWatch = clean;
    };
    button.addEventListener("click", beforeOpen, { capture: true });
    button.addEventListener("pointerenter", hover);
    button.addEventListener("pointerleave", leave);
    // The official application hides/reveals this same control when closing.
    // Return keyboard focus without reaching into its private player methods.
    let previouslyHidden = frame.style.display === "none";
    const visibility = new MutationObserver(() => {
      const hidden = frame.style.display === "none";
      if (previouslyHidden && !hidden && (document.activeElement === document.body || document.activeElement?.id === "vlibras-app-root")) {
        if (onReturnFocus) onReturnFocus();
        else button.focus({ preventScroll: true });
      }
      previouslyHidden = hidden;
    });
    visibility.observe(frame, { attributes: true, attributeFilter: ["style"] });
    releaseButton.current = () => {
      button.removeEventListener("click", beforeOpen, { capture: true });
      button.removeEventListener("pointerenter", hover);
      button.removeEventListener("pointerleave", leave);
      visibility.disconnect();
      clearApplicationWatch?.();
      applicationLoading.current = false;
      button.disabled = false;
      // Retain the one official node across development remounts. No private
      // destroy/update/open API is called. Language changes use full navigation.
      if (host.isConnected) {
        host.hidden = true;
        document.body.appendChild(host);
      }
    };
    return true;
  }, [t, onActivate, onReturnFocus]);

  useEffect(() => {
    mounted.current = true;
    if (t.locale === "pt" && window.VLibrasWidget?.initBtn?.isConnected) {
      if (attachOfficialButton(window.VLibrasWidget.initBtn)) setStatus("ready");
    }
    return () => {
      mounted.current = false;
      releaseButton.current?.();
      releaseButton.current = undefined;
    };
  }, [attachOfficialButton, t.locale]);

  useEffect(() => {
    if (status !== "failed") return;
    const revealFailure = () => {
      if (document.querySelector("dialog[open]")) return;
      document.removeEventListener("close", revealFailure, true);
      onFailure?.();
      retryButton.current?.focus({ preventScroll: true });
    };
    if (document.querySelector("dialog[open]")) document.addEventListener("close", revealFailure, true);
    else revealFailure();
    return () => document.removeEventListener("close", revealFailure, true);
  }, [status, onFailure]);

  async function activate() {
    if (status !== "idle") return;
    onActivate?.();
    onReturnFocus?.();
    setStatus("loading");
    try {
      const button = await loadOfficialButton();
      if (!mounted.current) return;
      if (!attachOfficialButton(button)) throw new Error("VLibras control unavailable.");
      setStatus("ready");
      window.requestAnimationFrame(() => {
        if (!mounted.current) return;
        if (button.getClientRects().length) button.focus({ preventScroll: true });
        // A click on the documented original button opens the original tool.
        button.click();
      });
    } catch {
      if (mounted.current) setStatus("failed");
    }
  }

  if (t.locale !== "pt") {
    // Native navigation resets the Portuguese-only third-party widget lifecycle.
    return <a className={styles.portugueseLink} href={portugueseHref}>{t("Libras: versão em português")}</a>;
  }

  const statusMessage = status === "loading" ? t("Carregando o acesso ao VLibras.")
    : status === "opening" ? t("Abrindo o VLibras. O avatar pode levar alguns instantes para carregar.")
    : status === "failed" ? t("Não foi possível carregar o VLibras.") : "";

  return <><div className={styles.control} data-vlibras-status={status}>
    <div className={styles.triggerArea}>
      {(status === "idle" || status === "loading") && <button className={styles.activate} type="button" onClick={activate} disabled={status === "loading"} aria-describedby="vlibras-loading-status">
        <span aria-hidden="true">L</span><span>{t("Libras")}</span>
      </button>}
      <span className={styles.officialSlot} ref={slot} hidden={status === "idle" || status === "loading" || status === "failed"} />
      {(status === "ready" || status === "opening") && <span className={styles.label}>{t("Libras")}</span>}
      {avatarOpen && <a className={styles.avatarLink} href="#libras-avatar" onClick={() => document.getElementById("libras-avatar")?.focus()}>{t("Ver avatar de Libras")}</a>}
    </div>
    {avatarOpen && <p className={styles.usage}>{t("Com o VLibras aberto, selecione o link ou botão e use Interagir no painel da ferramenta para ativá-lo.")}</p>}
    <span id="vlibras-loading-status" className={status === "failed" ? styles.failure : "sr-only"}>{statusMessage}</span>
    {status === "failed" && <button ref={retryButton} data-vlibras-retry className={styles.retry} type="button" onClick={() => window.location.reload()}>{t("Recarregar para tentar novamente")}</button>}
  </div>
    {/* Keep announcements available when the utility popover closes on activation. */}
    {statusHost && createPortal(<span className="sr-only" aria-live="polite" aria-atomic="true" role={statusMessage ? "status" : undefined}>{statusMessage}</span>, statusHost)}
  </>;
}
