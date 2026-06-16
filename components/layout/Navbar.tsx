import Image from "next/image";
import { nav } from "@/lib/content";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Navbar sticky sobre fondo oscuro. Versión estática de Fase 2
 * (logo + anclas + CTA). El nav-active por scroll y el menú mobile
 * llegan en Fase 3 (cuando pasa a Client Component).
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-nav border-b border-white/10 bg-ink/80 backdrop-blur-nav">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-full max-w-container items-center justify-between px-6 md:px-section-x"
      >
        <a
          href="#top"
          className="flex items-center"
          aria-label="EnterX — inicio"
        >
          <Image
            src="/logo_claro.png"
            alt="EnterX"
            width={934}
            height={279}
            priority
            className="h-[18px] w-auto"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="font-mono text-[11px] uppercase tracking-wide text-white/55 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <WhatsAppButton
          label="Conversemos"
          variant="nav"
          ariaLabel="Conversemos por WhatsApp"
        />
      </nav>
    </header>
  );
}
