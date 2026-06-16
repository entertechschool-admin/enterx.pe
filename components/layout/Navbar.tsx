"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { nav } from "@/lib/content";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Navbar sticky sobre fondo oscuro.
 * - nav-active: resalta el ancla de la sección visible (IntersectionObserver).
 * - menú mobile: drawer accesible (aria-expanded, foco atrapado, cierra con Esc).
 */
export function Navbar() {
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 h-nav border-b border-white/10 bg-ink/80 backdrop-blur-nav">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-full max-w-container items-center justify-between px-6 md:px-section-x"
      >
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
                  aria-current={active ? "true" : undefined}
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
            type="button"
            className="flex h-9 w-9 items-center justify-center text-white md:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <BurgerIcon />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] md:hidden"
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
        className="absolute inset-x-0 top-0 animate-reveal border-b border-white/10 bg-ink px-6 pb-10 pt-4"
      >
        <div className="flex h-nav items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wide text-label">
            Menú
          </span>
          <button
            ref={closeRef}
            type="button"
            className="flex h-9 w-9 items-center justify-center text-white"
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
