"use client";
import { useT } from "@/i18n/client";
import Link from "@/i18n/Link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/Icon";
import styles from "./Header.module.css";
import { navigation } from "@/data/navigation";
import { splitLocale } from "@/i18n/shared";
export function Header() {
    const t = useT();
    const pathname = splitLocale(usePathname()).path;
    const dialogRef = useRef<HTMLDialogElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
    function closeMenu() {
        dialogRef.current?.close();
    }
    function openMenu() {
        if (!dialogRef.current || dialogRef.current.open)
            return;
        dialogRef.current.showModal();
        setMenuOpen(true);
    }
    function keepFocusInMenu(event: KeyboardEvent<HTMLDialogElement>) {
        if (event.key !== "Tab")
            return;
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
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
    }
    useEffect(() => {
        dialogRef.current?.close();
    }, [pathname]);
    useEffect(() => {
        let frame = 0;
        const update = () => {
            setScrolled(window.scrollY > 16);
            frame = 0;
        };
        const onScroll = () => {
            if (!frame)
                frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.cancelAnimationFrame(frame);
        };
    }, []);
    useEffect(() => {
        if (!menuOpen)
            return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const desktop = window.matchMedia("(min-width: 1280px)");
        const handleResize = () => {
            if (desktop.matches)
                dialogRef.current?.close();
        };
        desktop.addEventListener("change", handleResize);
        return () => {
            document.body.style.overflow = previousOverflow;
            desktop.removeEventListener("change", handleResize);
        };
    }, [menuOpen]);
    return (<header className={styles.header} data-scrolled={scrolled}>
      <div className={`container ${styles.inner}`}>
        <Link href={t.href("/")} className={styles.brand} aria-label={t("Aprender Editora — página inicial")}>
          <img src="/images/logo.png" width={172} height={60} alt={t("")}/>
        </Link>
        <nav className={styles.desktopNav} aria-label={t("Navegação principal")}>
          {navigation.map(({ href, label }) => (<Link key={href} href={t.href(href)} className={styles.navLink} aria-current={isCurrent(href) ? "page" : undefined}>
              {t(label)}
            </Link>))}
        </nav>
        <div className={styles.desktopActions}>
          <Link href={t.href("/plataformas")} className={styles.platformLink} aria-current={isCurrent("/plataformas") ? "page" : undefined}>{t("Plataformas ")}<Icon name="arrow" size={15}/>
          </Link>
          <Link href={t.href("/contato")} className={styles.contactLink} aria-current={isCurrent("/contato") ? "page" : undefined}>{t("Vamos conversar ")}<Icon name="arrow" size={17}/>
          </Link>
        </div>
        <button ref={menuButtonRef} className={styles.menuButton} type="button" aria-label={t("Abrir menu de navegação")} aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={openMenu}>
          <span>{t("Menu")}</span>
          <Icon name="menu" size={24}/>
        </button>
      </div>

      <dialog id="mobile-menu" ref={dialogRef} className={styles.dialog} aria-labelledby="mobile-menu-title" onKeyDown={keepFocusInMenu} onClose={() => {
            setMenuOpen(false);
            if (menuButtonRef.current?.getClientRects().length)
                menuButtonRef.current.focus({ preventScroll: true });
        }} onClick={(event) => {
            if (event.target === event.currentTarget)
                closeMenu();
        }}>
        <div className={styles.dialogContent}>
          <div className={styles.dialogTop}>
            <span id="mobile-menu-title" className={styles.menuTitle}>{t("Explore a Aprender ")}</span>
            <button className={styles.closeButton} type="button" onClick={closeMenu} aria-label={t("Fechar menu")}>
              <Icon name="close" size={24}/>
            </button>
          </div>
          <nav aria-label={t("Navegação para celular")} className={styles.mobileNav}>
            <Link href={t.href("/")} aria-current={pathname === "/" ? "page" : undefined} onClick={closeMenu}>{t("In\u00EDcio ")}<Icon name="arrow" size={20}/>
            </Link>
            {navigation.map(({ href, label }) => (<Link key={href} href={t.href(href)} aria-current={isCurrent(href) ? "page" : undefined} onClick={closeMenu}>
                {t(label)} <Icon name="arrow" size={20}/>
              </Link>))}
            <Link href={t.href("/plataformas")} aria-current={isCurrent("/plataformas") ? "page" : undefined} onClick={closeMenu}>{t("Plataformas ")}<Icon name="arrow" size={20}/>
            </Link>
          </nav>
          <Link href={t.href("/contato")} className={styles.mobileContact} aria-current={isCurrent("/contato") ? "page" : undefined} onClick={closeMenu}>{t("Vamos conversar ")}<Icon name="arrow" size={20}/>
          </Link>
          <p className={styles.menuFootnote}>{t("Compromisso com a Aprendizagem.")}</p>
        </div>
      </dialog>
    </header>);
}
