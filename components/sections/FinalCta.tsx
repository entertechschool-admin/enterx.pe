import { closing } from "@/lib/content";
import { EMAIL_CLOSING } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Sección de cierre (CTA) — oscuro full-bleed #0D0D0D.
 * Píldora de oferta + tagline de marca ("…Las dejamos capaces." en rojo) +
 * CTA WhatsApp + email. Server Component.
 *
 * ⚠️ El isótopo se retiró por decisión de Ariana (16-07-2026). SPEC.md
 * §"SECCIÓN 4 — CTA" lo exige entre los elementos de la sección ("isótopo ·
 * tagline · botón WhatsApp") → hay que corregir la spec, no solo el código.
 *
 * La píldora y el texto del botón salen de la pág. 7 del brochure y están
 * pendientes de validación — el porqué, en lib/content.ts sobre `closing`.
 */
export function FinalCta() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-ink text-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-ambient-red-bl"
      />

      <Container className="relative flex flex-col items-center py-24 text-center md:py-section">
        <Reveal className="flex flex-col items-center">
          {/* Píldora de oferta (brochure pág. 7). Allí el punto es verde; aquí
              va en el acento rojo — el verde está fuera de la paleta. */}
          <p
            className="
              inline-flex items-center gap-2.5 rounded-pill border
              border-white/15 bg-white/5 px-4 py-2 text-[13px] text-surface/90
            "
          >
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {closing.offerPill}
          </p>

          <h2 className="mt-6 max-w-3xl text-h2 text-balance">
            {closing.taglineParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-accent" : undefined}>
                {part.text}
              </span>
            ))}
          </h2>

          <div className="mt-10">
            <WhatsAppButton
              label={closing.ctaLabel}
              variant="primary"
              ariaLabel="Conversar por WhatsApp"
            />
          </div>

          {/* Vía para OTROS temas (no implementación ni formación, que van por
              el CTA de WhatsApp de arriba). */}
          <p className="mt-6 max-w-md text-[14px] text-surface/60">
            {closing.emailIntro}{" "}
            <a
              href={`mailto:${EMAIL_CLOSING}`}
              className="text-surface/90 underline underline-offset-4 transition-colors duration-200 hover:text-accent"
            >
              {EMAIL_CLOSING}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
