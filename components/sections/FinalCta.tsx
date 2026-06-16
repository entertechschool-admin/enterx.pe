import Image from "next/image";
import { closing } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Sección de cierre (CTA) — oscuro full-bleed #0D0D0D.
 * Isótopo + tagline de marca ("…Las dejamos capaces." en rojo) + CTA WhatsApp.
 * Server Component.
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
          <Image
            src="/iso_enterx.png"
            alt=""
            width={589}
            height={631}
            sizes="(max-width: 768px) 120px, 150px"
            className="w-[110px] drop-shadow-[0_24px_60px_rgba(217,40,26,0.22)] md:w-[140px]"
          />

          <h2 className="mt-10 max-w-3xl text-h2 text-balance">
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
              ariaLabel="Conversemos por WhatsApp"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
