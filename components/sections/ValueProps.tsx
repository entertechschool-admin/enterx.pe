import { value } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ValueIcon } from "@/components/icons/ValueIcons";
import type { ValueCard as ValueCardType } from "@/lib/content";

/**
 * Sección "Servicios" — 3 líneas de negocio. Fondo claro.
 * La tarjeta de Co-implementación (featured) es oscura, es el diferenciador.
 * Server Component.
 */
export function ValueProps() {
  return (
    <section id="servicios" className="bg-surface text-ink">
      <Container className="py-20 md:py-section">
        <SectionHeader number="02" label="Servicios" />

        <h2 className="mt-6 max-w-2xl text-h2 text-balance">{value.lead}</h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {value.cards.map((card) => (
            <ValueCard key={card.number} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ValueCard({ card }: { card: ValueCardType }) {
  const featured = card.featured;

  return (
    <article
      className={`
        relative flex flex-col rounded-card-lg border p-7 md:p-8
        ${
          featured
            ? "border-ink bg-ink text-surface shadow-accent"
            : "border-line bg-surface"
        }
      `}
    >
      {featured && (
        <span className="absolute right-6 top-6 rounded-pill bg-accent px-2.5 py-1 font-mono text-[9px] uppercase tracking-label text-white">
          Diferencial
        </span>
      )}

      <span
        className={`font-mono text-sectionnum ${
          featured ? "text-accent" : "text-label"
        }`}
      >
        {card.number}
      </span>

      <span
        className={`mt-6 ${featured ? "text-accent" : "text-ink/55"}`}
      >
        <ValueIcon name={card.icon} />
      </span>

      <h3 className="mt-5 text-h3">{card.title}</h3>

      <p
        className={`mt-4 text-[15px] leading-relaxed ${
          featured ? "text-white/75" : "text-muted"
        }`}
      >
        {card.whatIs}
      </p>

      {/* Cliente ideal — separado, en mono, como dato */}
      <div
        className={`mt-6 border-t pt-5 ${
          featured ? "border-white/15" : "border-line"
        }`}
      >
        <p
          className={`font-mono text-[10px] uppercase tracking-label ${
            featured ? "text-white/45" : "text-label"
          }`}
        >
          Para
        </p>
        <p
          className={`mt-2 text-[13.5px] leading-relaxed ${
            featured ? "text-white/70" : "text-ink/70"
          }`}
        >
          {card.idealClient}
        </p>
      </div>
    </article>
  );
}
