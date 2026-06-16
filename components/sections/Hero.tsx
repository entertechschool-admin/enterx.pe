import Image from "next/image";
import { hero } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Hero — fondo oscuro #0D0D0D. Tipografía protagonista (H1 oversized con
 * "Menos del 5%" en rojo) + isótopo grande a la derecha con glow rojo radial.
 * Server Component. El isótopo lleva `priority` (es el LCP probable).
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-surface"
    >
      {/* Glow rojo ambiente, detrás del contenido. Decorativo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-ambient-red"
      />

      <Container className="relative grid items-center gap-12 py-20 md:min-h-[calc(100svh-theme(spacing.nav))] md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:py-section">
        {/* Columna de texto */}
        <div className="order-2 md:order-1">
          <p className="font-mono text-kicker uppercase text-label">
            Unidad de IA aplicada · B2B
          </p>

          <h1 className="mt-6 text-balance text-h1">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-accent" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-lead text-white/70">
            {hero.subhead}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <WhatsAppButton
              label={hero.ctaLabel}
              variant="primary"
              ariaLabel="Conversemos por WhatsApp"
            />
            <span className="font-mono text-[12px] uppercase tracking-wide text-label">
              {hero.footnote.join(" · ")}
            </span>
          </div>
        </div>

        {/* Isótopo — protagonista visual a la derecha (desktop). */}
        <div className="relative order-1 flex justify-center md:order-2 md:justify-end">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-ambient-red-center"
          />
          <Image
            src="/iso_enterx.png"
            alt="Isótopo de EnterX: una constelación de esferas donde el punto rojo marca dónde empieza el valor real."
            width={589}
            height={631}
            priority
            sizes="(max-width: 768px) 70vw, 42vw"
            className="relative w-[62vw] max-w-[300px] drop-shadow-[0_30px_80px_rgba(217,40,26,0.18)] md:w-full md:max-w-[480px]"
          />
        </div>
      </Container>
    </section>
  );
}
