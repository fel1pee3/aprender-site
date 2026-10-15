"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/Icon";
import styles from "./Header.module.css";
import { navigation } from "@/data/navigation";

export function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  function closeMenu() {
    dialogRef.current?.close();
  }

  function openMenu() {
    if (!dialogRef.current || dialogRef.current.open) return;
    dialogRef.current.showModal();
    setMenuOpen(true);
  }

  function keepFocusInMenu(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
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
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1280px)");
    const handleResize = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    desktop.addEventListener("change", handleResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", handleResize);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={`container ${styles.inner}`}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Aprender Editora — página inicial"
        >
          <img src="/images/logo.png" width={172} height={60} alt="" />
        </Link>
        <nav className={styles.desktopNav} aria-label="Navegação principal">
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={styles.navLink}
              aria-current={isCurrent(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.desktopActions}>
          <Link
            href="/plataformas"
            className={styles.platformLink}
            aria-current={isCurrent("/plataformas") ? "page" : undefined}
          >
            Plataformas <Icon name="arrow" size={15} />
          </Link>
          <Link
            href="/contato"
            className={styles.contactLink}
            aria-current={isCurrent("/contato") ? "page" : undefined}
          >
            Vamos conversar <Icon name="arrow" size={17} />
          </Link>
        </div>
        <button
          ref={menuButtonRef}
          className={styles.menuButton}
          type="button"
          aria-label="Abrir menu de navegação"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={openMenu}
        >
          <span>Menu</span>
          <Icon name="menu" size={24} />
        </button>
      </div>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="mobile-menu-title"
        onKeyDown={keepFocusInMenu}
        onClose={() => {
          setMenuOpen(false);
          if (menuButtonRef.current?.getClientRects().length)
            menuButtonRef.current.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className={styles.dialogContent}>
          <div className={styles.dialogTop}>
            <span id="mobile-menu-title" className={styles.menuTitle}>
              Explore a Aprender
            </span>
            <button
              className={styles.closeButton}
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
            >
              <Icon name="close" size={24} />
            </button>
          </div>
          <nav aria-label="Navegação para celular" className={styles.mobileNav}>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              onClick={closeMenu}
            >
              Início <Icon name="arrow" size={20} />
            </Link>
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent(href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {label} <Icon name="arrow" size={20} />
              </Link>
            ))}
            <Link
              href="/plataformas"
              aria-current={isCurrent("/plataformas") ? "page" : undefined}
              onClick={closeMenu}
            >
              Plataformas <Icon name="arrow" size={20} />
            </Link>
          </nav>
          <Link
            href="/contato"
            className={styles.mobileContact}
            aria-current={isCurrent("/contato") ? "page" : undefined}
            onClick={closeMenu}
          >
            Vamos conversar <Icon name="arrow" size={20} />
          </Link>
          <p className={styles.menuFootnote}>Compromisso com a Aprendizagem.</p>
        </div>
      </dialog>
    </header>
  );
}
