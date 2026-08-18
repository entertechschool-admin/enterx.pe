"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import Image from "next/image";
import { nav } from "@/lib/content";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Navbar flotante sobre fondo oscuro/translúcido.
 * - nav-active: resalta el ancla de la sección visible (IntersectionObserver).
 * - menú mobile: drawer accesible (foco atrapado/retornado, cierra con Esc).
 */
export function Navbar() {
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Callbacks estables: el drawer no reinstala su listener de teclado cada vez
  // que Navbar renderiza por un cambio de sección activa.
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Resalta la sección activa al hacer scroll (mismo rootMargin del brand book).
  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[70] rounded-pill bg-surface px-4 py-3 text-sm font-medium text-ink shadow-card focus:not-sr-only"
      >
        Saltar al contenido
      </a>

      <nav
        aria-label="Principal"
        className="relative flex w-full max-w-4xl items-center justify-between gap-4 rounded-pill border border-white/15 bg-ink/40 py-2 pl-6 pr-2 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        <a href="#top" className="flex items-center" aria-label="EnterX — inicio">
          <Image
            src="/logo_claro.png"
            alt="EnterX"
            width={934}
            height={279}
            priority
            className="h-[18px] w-auto"
          />
        </a>

        {/* Anclas desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={`font-mono text-[11px] uppercase tracking-wide transition-colors duration-200 ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <WhatsAppButton
              label="Conversemos"
              variant="nav"
              ariaLabel="Conversemos por WhatsApp"
            />
          </div>

          {/* Botón hamburguesa (solo mobile) */}
          <button
            ref={menuTriggerRef}
            type="button"
            className="flex size-11 touch-manipulation items-center justify-center rounded-full text-white md:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={openMenu}
          >
            <BurgerIcon />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        returnFocusRef={menuTriggerRef}
      />
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Cierra con Esc y atrapa el foco mientras está abierto.
  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overscroll-contain md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar menú"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-menu"
        className="absolute inset-x-0 top-0 animate-reveal overscroll-contain border-b border-white/10 bg-ink px-6 pb-10 pt-4"
      >
        <div className="flex h-nav items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wide text-label">
            Menú
          </span>
          <button
            ref={closeRef}
            type="button"
            className="flex size-11 touch-manipulation items-center justify-center rounded-full text-white"
            aria-label="Cerrar menú"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="mt-6 flex flex-col gap-1">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={onClose}
                className="block py-3 text-h3 text-white/90 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <WhatsAppButton
            label="Conversemos"
            variant="primary"
            ariaLabel="Conversemos por WhatsApp"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

function BurgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
