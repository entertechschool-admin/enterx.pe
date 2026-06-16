import { timeline, timelineNote } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineIcon } from "@/components/icons/TimelineIcons";

/**
 * Sección "La brecha" — 4 niveles de madurez en IA como nodos conectados
 * en línea (horizontal en desktop, vertical en mobile). N3 es el objetivo,
 * en rojo con glow. Fondo CLARO.
 *
 * Versión estática de Fase 2: la característica de cada nodo está visible.
 * En Fase 3 esto pasa a Client Component con expand por hover/touch/teclado.
 */
export function Timeline() {
  return (
    <section id="la-brecha" className="bg-surface-50 text-ink">
      <Container className="py-20 md:py-section">
        <SectionHeader number="01" label="La brecha" />

        <h2 className="mt-6 max-w-2xl text-h2">
          De preguntarle a la IA a{" "}
          <span className="text-accent">delegarle el trabajo</span>.
        </h2>
        <p className="mt-5 max-w-xl text-lead text-muted">{timelineNote}</p>

        {/* Nodos conectados */}
        <ol
          className="
            relative mt-14 grid gap-y-10
            md:grid-cols-4 md:gap-y-0
          "
        >
          {/* Línea conectora — horizontal en desktop, vertical en mobile */}
          <span
            aria-hidden
            className="
              pointer-events-none absolute bg-line
              left-[11px] top-2 h-[calc(100%-1rem)] w-px
              md:left-0 md:top-[11px] md:h-px md:w-full
            "
          />

          {timeline.map((level) => (
            <li
              key={level.id}
              className="relative pl-9 md:px-3 md:pl-3"
            >
              {/* Nodo (círculo) */}
              <span
                aria-hidden
                className={`
                  absolute left-0 top-1 z-10 flex h-[22px] w-[22px] items-center
                  justify-center rounded-full md:left-3 md:top-0
                  ${
                    level.target
                      ? "bg-accent shadow-accent-glow"
                      : "border border-line bg-surface"
                  }
                `}
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full ${
                    level.target ? "bg-white" : "bg-label"
                  }`}
                />
              </span>

              {/* Encabezado del nodo */}
              <div className="flex items-center gap-2 md:mt-9">
                <span
                  className={`font-mono text-sectionnum ${
                    level.target ? "text-accent" : "text-label"
                  }`}
                >
                  {level.code}
                </span>
                {level.target && (
                  <span className="rounded-pill bg-accent px-2 py-0.5 font-mono text-[9px] uppercase tracking-label text-white">
                    Objetivo
                  </span>
                )}
              </div>

              <h3 className="mt-3 text-[17px] font-semibold leading-snug">
                {level.name}
              </h3>

              {/* Característica + icono (visible en estático; expandible en F3) */}
              <div className="mt-3 flex items-start gap-3">
                <span
                  className={level.target ? "text-accent" : "text-ink/45"}
                >
                  <TimelineIcon name={level.icon} />
                </span>
                <p className="text-[14px] leading-relaxed text-muted">
                  {level.characteristic}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
