import Image from "next/image";
import { hero } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Parallax } from "@/components/ui/Parallax";

/**
 * Hero — fondo oscuro #0D0D0D. Tipografía protagonista (H1 oversized con
 * "Menos del 5%" en rojo) + isótopo grande a la derecha con glow rojo radial.
 * Server Component. El texto NO se anima (es el LCP — debe pintar de inmediato);
 * el isótopo lleva parallax sutil y `priority`.
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

      <Container className="relative grid items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:py-24 lg:py-28">
        {/* Columna de texto */}
        <div className="order-2 md:order-1">

          <h1 className="mt-6 text-balance text-[clamp(34px,5vw,66px)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-accent" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-lg text-lead text-white/70">
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

        {/* Isótopo — protagonista visual a la derecha (desktop), con parallax sutil. */}
        <div className="relative order-1 flex justify-center md:order-2 md:justify-end">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-ambient-red-center"
          />
          <Parallax strength={28} className="relative">
            <Image
              src="/iso_enterx.png"
              alt="Isótopo de EnterX: una constelación de esferas donde el punto rojo marca dónde empieza el valor real."
              width={589}
              height={631}
              priority
              sizes="(max-width: 768px) 70vw, 42vw"
              className="w-[62vw] max-w-[300px] drop-shadow-[0_30px_80px_rgba(217,40,26,0.18)] md:w-full md:max-w-[480px]"
            />
          </Parallax>
        </div>
      </Container>
    </section>
  );
}
