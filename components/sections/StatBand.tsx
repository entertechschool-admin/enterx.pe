"use client";

import { useEffect, useRef, useState } from "react";
import { stat } from "@/lib/content";
import { Container } from "@/components/ui/Container";

const R = 82; // radio de la dona
const C = 2 * Math.PI * R; // circunferencia
const HOLD_MS = 3000; // cuánto se queda en cada dato antes de cambiar

/**
 * La estadística como gráfico de DONA + QUOTE. La dona LOOPEA entre los dos
 * datos: 92% (usa ChatGPT, blanco) ↔ menos del 5% (tiene agentes, rojo). El
 * arco crece/encoge y la cifra cuenta entre ambos; el quote da la voz del dato.
 *
 * Loop solo con `inView` y sin `prefers-reduced-motion`. Con reduced-motion se
 * queda fijo en el 5% (el dato clave), sin animar. La frase completa va en
 * `sr-only` (dona y cifra van aria-hidden).
 */
export function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Loop entre los dos datos mientras está en pantalla.
  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % stat.donutPoints.length),
      HOLD_MS,
    );
    return () => clearInterval(id);
  }, [inView, reduced]);

  const point = stat.donutPoints[reduced ? 1 : index];
  const run = inView && !reduced;
  const filled = reduced || inView;
  const offset = filled ? C * (1 - point.pct / 100) : C;

  // Resalta la frase del quote que corresponde al dato que muestra la dona.
  // La frase activa se ilumina (5% en rojo, 92% en blanco); la otra se atenúa.
  // Con reduced-motion no hay loop: se muestran ambas legibles.
  const clauseClass = (i: number) => {
    const base = "transition-colors duration-500";
    const on = i === 1 ? "text-accent" : "text-surface";
    if (reduced) return `${base} ${i === 1 ? "text-accent" : "text-surface/85"}`;
    return `${base} ${i === index ? on : "text-surface/25"}`;
  };

  return (
    <section className="bg-ink text-surface">
      <Container className="py-16 md:py-24">
        <p className="sr-only">{stat.sr}</p>

        <div
          ref={ref}
          aria-hidden
          className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16"
        >
          {/* Dona */}
          <div className="mx-auto">
            <div className="relative size-52 md:size-60">
              <svg viewBox="0 0 200 200" className="size-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r={R}
                  fill="none"
                  strokeWidth="15"
                  className="stroke-white/[0.08]"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={R}
                  fill="none"
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={offset}
                  // Una sola transición para el arco (largo) Y el color, si no
                  // se pisan y el arco no baja/sube suave. `stroke` cubre el
                  // color (stroke-accent / stroke-white).
                  className={`${
                    point.accent ? "stroke-accent" : "stroke-white/75"
                  } ${
                    reduced
                      ? ""
                      : "transition-[stroke-dashoffset,stroke] duration-[900ms] ease-out"
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {point.pre && (
                  <span className="font-mono text-[10px] uppercase tracking-label text-label">
                    {point.pre}
                  </span>
                )}
                <span
                  className={`text-[clamp(40px,6vw,58px)] font-semibold leading-none transition-colors duration-500 ${
                    point.accent ? "text-accent" : "text-surface"
                  }`}
                >
                  <Count to={point.to} run={run} />
                  {point.suf}
                </span>
              </div>
            </div>
            {/* Etiqueta del dato actual (cambia con el loop) — más grande y
                prominente, debajo de la dona (no cabe legible dentro). */}
            <p
              key={reduced ? "r" : index}
              className="mx-auto mt-5 max-w-[15rem] text-center text-[18px] font-medium leading-snug text-surface/90 motion-safe:animate-reveal"
            >
              {point.label}
            </p>
          </div>

          {/* Quote */}
          <figure>
            <p className="font-mono text-[10px] uppercase tracking-label text-label">
              {stat.kicker}
            </p>
            <blockquote className="mt-3 flex gap-3">
              <span
                aria-hidden
                className="select-none text-[44px] leading-[0.7] text-accent"
              >
                &ldquo;
              </span>
              <p className="text-h3 text-balance">
                <span className={clauseClass(0)}>{stat.quote.clauses[0]}</span>
                <span className="text-surface/35">{stat.quote.connector}</span>
                <span className={clauseClass(1)}>{stat.quote.clauses[1]}</span>
                <span className="text-surface/35">{stat.quote.end}</span>
              </p>
            </blockquote>
            <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-label text-label">
              Fuente: {stat.source}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}

/** Cuenta hasta `to`, animando desde el valor actual (para el loop). Sin `run`
 *  (reduced-motion / SSR) muestra `to`. */
function Count({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  const nRef = useRef(0);
  nRef.current = n;

  useEffect(() => {
    if (!run) {
      setN(to);
      return;
    }
    const from = nRef.current;
    let raf = 0;
    let start = 0;
    const dur = 900;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);

  return <>{n}</>;
}
