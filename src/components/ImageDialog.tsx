"use client";
import { useT } from "@/i18n/client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import s from "./ImageDialog.module.css";
/** The original is requested only when the reader opens the image. */
export function ImageDialog({ src, alt, caption, buttonLabel, children }: {
    src: string;
    alt: string;
    caption: string;
    buttonLabel?: string;
    children?: ReactNode;
}) {
    const t = useT();
    const label = buttonLabel ? t(buttonLabel) : t("Ampliar imagem");
    const dialog = useRef<HTMLDialogElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const previousOverflow = useRef("");
    const locked = useRef(false);
    const titleId = useId();
    const [open, setOpen] = useState(false);
    const [zoom, setZoom] = useState(false);
    useEffect(() => () => {
        if (locked.current)
            document.body.style.overflow = previousOverflow.current;
    }, []);
    const close = () => dialog.current?.close();
    const restore = () => {
        document.body.style.overflow = previousOverflow.current;
        locked.current = false;
        setOpen(false);
        setZoom(false);
        trigger.current?.focus({ preventScroll: true });
    };
    return <>
    <button ref={trigger} type="button" className={children ? s.imageTrigger : s.trigger} aria-haspopup="dialog" aria-label={children ? `${label}: ${t(alt)}` : undefined} onClick={() => {
            previousOverflow.current = document.body.style.overflow;
            locked.current = true;
            document.body.style.overflow = "hidden";
            setOpen(true);
            dialog.current?.showModal();
        }}>
      {t(children)}<span>{label}</span>
    </button>
    <dialog ref={dialog} className={s.dialog} aria-labelledby={titleId} onClose={restore} onKeyDown={event => {
            if (event.key !== "Tab")
                return;
            const controls = dialog.current?.querySelectorAll<HTMLElement>('button, [tabindex="0"]');
            if (!controls?.length)
                return;
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }} onClick={event => { if (event.target === event.currentTarget)
        close(); }}>
      <div className={s.panel}>
        <div className={s.toolbar}>
          <h2 id={titleId}>{label}</h2>
          <button type="button" aria-pressed={zoom} onClick={() => setZoom(value => !value)}>
            {t(zoom ? "Ajustar à tela" : "Ver tamanho original")}
          </button>
          <button type="button" autoFocus onClick={close}>{t("Fechar imagem")}</button>
        </div>
        <div className={`${s.viewport} ${zoom ? s.zoom : ""}`} tabIndex={0} role="region" aria-label={t("Imagem ampliada; use as setas para rolar")}>
          {open && <img src={src} alt={t(alt)}/>}
        </div>
        <p className={s.caption}>{t(caption)}</p>
      </div>
    </dialog>
  </>;
}
