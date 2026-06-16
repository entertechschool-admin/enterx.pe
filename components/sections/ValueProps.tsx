import { value } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ValueIcon } from "@/components/icons/ValueIcons";
import type { ValueCard as ValueCardType } from "@/lib/content";

/**
 * Sección "Servicios" — 3 líneas de negocio. Fondo claro.
 * Las 3 tarjetas tienen el mismo tratamiento (ninguna destacada).
 * Efecto sutil en hover/touch: borde acento + leve elevación + icono rojo.
 * Server Component.
 */
export function ValueProps() {
  return (
    <section id="servicios" className="bg-surface text-ink">
      <Container className="py-20 md:py-section">
        <Reveal>
          <SectionHeader label="Servicios" />
          <h2 className="mt-6 max-w-2xl text-h2 text-balance">{value.lead}</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {value.cards.map((card, i) => (
            <Reveal key={i} delay={i * 110} className="flex">
              <ValueCard card={card} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ValueCard({ card }: { card: ValueCardType }) {
  return (
    <article
      className="
        group relative flex w-full flex-col rounded-card-lg border border-line
        bg-surface p-7 transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-accent/40 hover:shadow-accent-sm
        focus-within:-translate-y-1 focus-within:border-accent/40
        active:-translate-y-0.5 motion-reduce:transform-none
        motion-reduce:transition-none md:p-8
      "
    >

      <span className="mt-6 text-ink/55 transition-colors duration-300 group-hover:text-accent">
        <ValueIcon name={card.icon} />
      </span>

      <h3 className="mt-5 text-h3">{card.title}</h3>

      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        {card.whatIs}
      </p>

      {/* Cliente ideal — separado, en mono, como dato */}
      <div className="mt-6 border-t border-line pt-5">
        <p className="font-mono text-[10px] uppercase tracking-label text-label">
          Para
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink/70">
          {card.idealClient}
        </p>
      </div>
    </article>
  );
}
