"use client";

import { useState } from "react";
import Image from "next/image";
import { timeline, timelineNote, type TimelineLevel } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TimelineIcon } from "@/components/icons/TimelineIcons";
import { ChevronIcon } from "@/components/icons/ChevronIcon";

/**
 * Sección "La brecha" — 4 niveles de madurez en IA como nodos conectados en
 * línea (horizontal desktop / vertical mobile). N3 es el objetivo, en rojo.
 * Fondo claro.
 *
 * Interacción accesible: cada nodo es un <button aria-expanded> que revela su
 * característica. Por defecto N3 está abierto. Desktop: se abre en hover y en
 * focus (teclado). Mobile: tap = toggle (acordeón, uno a la vez).
 */
export function Timeline() {
  // N3 abierto por defecto (el objetivo).
  const defaultId = timeline.find((l) => l.target)?.id ?? timeline[0].id;
  const [activeId, setActiveId] = useState<string>(defaultId);

  return (
    <section id="la-brecha" className="bg-surface-50 text-ink">
      <Container className="py-20 md:py-section">
        <Reveal>
          <SectionHeader label="La brecha" />
          <h2 className="mt-6 max-w-2xl text-h2">
            De preguntarle a la IA a{" "}
            <span className="text-accent">delegarle el trabajo</span>.
          </h2>
          <p className="mt-5 max-w-xl text-lead text-muted">{timelineNote}</p>
        </Reveal>

        <ol className="relative mt-14 grid gap-y-8 md:grid-cols-4 md:gap-y-0">
          {/* Línea conectora — vertical en mobile, horizontal en desktop */}
          <span
            aria-hidden
            className="
              pointer-events-none absolute bg-line
              left-[10px] top-2 h-[calc(100%-1rem)] w-px
              md:left-0 md:top-[10px] md:h-px md:w-full
            "
          />

          {timeline.map((level, i) => (
            <Reveal as="li" key={level.id} delay={i * 90} className="relative">
              <TimelineNode
                level={level}
                isOpen={activeId === level.id}
                onOpen={() => setActiveId(level.id)}
                onToggle={() =>
                  setActiveId((cur) => (cur === level.id ? "" : level.id))
                }
              />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function TimelineNode({
  level,
  isOpen,
  onOpen,
  onToggle,
}: {
  level: TimelineLevel;
  isOpen: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const panelId = `timeline-panel-${level.id}`;
  const btnId = `timeline-node-${level.id}`;

  return (
    <div className="pl-8 md:px-3 md:pl-3">
      <button
        id={btnId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        onMouseEnter={onOpen}
        onFocus={onOpen}
        className="group block w-full text-left focus-visible:outline-none"
      >
        {/* Nodo: esfera roja real para el objetivo (N3); círculo para el resto. */}
        {level.target ? (
          <span
            aria-hidden
            className="absolute left-[-5px] top-[-4px] z-10 md:left-1 md:top-[-6px]"
          >
            <span className="absolute inset-0 rounded-full bg-accent/30 blur-md" />
            <Image
              src="/ball_red.png"
              alt=""
              width={30}
              height={30}
              className="relative drop-shadow-[0_2px_10px_rgba(217,40,26,0.45)] contrast-150"
            />
          </span>
        ) : (
          <span
            aria-hidden
            className="
              absolute left-0 top-1 z-10 flex h-[20px] w-[20px] items-center
              justify-center rounded-full border border-line bg-surface
              transition-colors group-hover:border-muted md:left-3 md:top-0
            "
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-label" />
          </span>
        )}

        {/* Encabezado del nodo */}
        <span className="flex items-center gap-2 md:mt-8">
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
          <ChevronIcon
            className={`ml-auto text-ink/35 transition-transform duration-300 md:hidden ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>

        <span className="mt-3 flex items-center gap-2">
          <h3 className="text-[17px] font-semibold leading-snug text-ink group-hover:text-ink">
            {level.name}
          </h3>
        </span>
      </button>

      {/* Panel de característica + icono. Animación de altura/opacidad. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`
          grid overflow-hidden transition-all duration-300 ease-out
          motion-reduce:transition-none
          ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="min-h-0">
          <div className="flex items-start gap-3">
            <span className={level.target ? "text-accent" : "text-ink/40"}>
              <TimelineIcon name={level.icon} />
            </span>
            <p className="text-[14px] leading-relaxed text-muted">
              {level.characteristic}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
