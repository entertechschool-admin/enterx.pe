"use client";

import { useState } from "react";
import Image from "next/image";
import { clients } from "@/lib/content";
import type { Client } from "@/lib/content";

/**
 * Cinta de logos de clientes en bucle continuo.
 *
 * Es lo único cliente de la sección: el botón de pausa necesita estado. La
 * cabecera se queda en el Server Component que lo envuelve.
 *
 * Movimiento: la pista lleva la lista duplicada y se desplaza a -50% (ver
 * keyframes `marquee` en tailwind.config.ts), así el bucle no tiene costura.
 *
 * Accesibilidad:
 * - WCAG 2.2.2 — todo lo que se mueve solo más de 5s debe poder detenerse.
 *   De ahí el botón de pausa, mismo patrón que el del video del hero.
 * - `prefers-reduced-motion` se resuelve en CSS (`motion-reduce:`), no en JS:
 *   la cinta se convierte en una rejilla quieta con los 12 logos visibles. Si
 *   solo se quitara la animación, se verían los 4 primeros y el resto quedaría
 *   cortado fuera de pantalla.
 * - El 2º juego de logos va `aria-hidden`: es relleno visual del bucle, y sin
 *   eso el lector de pantalla leería los 12 nombres dos veces.
 */
export function ClientMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <div className="relative">
        <div className="overflow-hidden">
          <ul
            className="
              flex w-max animate-marquee items-center gap-10 md:gap-14
              motion-reduce:w-full motion-reduce:animate-none
              motion-reduce:flex-wrap motion-reduce:justify-center
              motion-reduce:gap-x-10 motion-reduce:gap-y-8
            "
            style={paused ? { animationPlayState: "paused" } : undefined}
          >
            {clients.items.map((client) => (
              <LogoItem key={client.name} client={client} />
            ))}
            {clients.items.map((client) => (
              <LogoItem key={`dup-${client.name}`} client={client} duplicate />
            ))}
          </ul>
        </div>

        {/* Difuminado en los bordes: la cinta se desvanece en vez de cortarse.
            Se apaga con reduced motion, donde no hay nada que desbordar.
            El destino del degradado es el blanco de la tarjeta que la contiene (no
            `to-transparent`, que en Safari puede tirar a negro): debe coincidir
            con el fondo de la sección o se vería una banda. */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r
            from-ink-800 to-ink-800/0 motion-reduce:hidden md:w-24
          "
        />
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l
            from-ink-800 to-ink-800/0 motion-reduce:hidden md:w-24
          "
        />
      </div>

      <div className="mt-6 flex justify-end px-8 motion-reduce:hidden md:px-12">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={
            paused
              ? "Reanudar el desplazamiento de los logos de clientes"
              : "Pausar el desplazamiento de los logos de clientes"
          }
          className="
            flex h-8 w-8 items-center justify-center rounded-pill border
            border-white/15 bg-ink text-surface/60 transition-colors duration-200
            hover:text-surface focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-accent
          "
        >
          {paused ? (
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1.5 0.5 L9.5 5 L1.5 9.5 Z" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <rect x="1" y="0.5" width="2.6" height="9" rx="0.6" />
              <rect x="6.4" y="0.5" width="2.6" height="9" rx="0.6" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * Cada logo se encaja (`object-contain`) en una caja del MISMO tamaño en vez de
 * igualarse por altura: los 12 vienen con proporciones muy distintas (unos
 * anchos de una línea, otros casi cuadrados o de dos líneas) y la altura pareja
 * hace que Buenaventura aplaste a ciemam. La caja los equilibra ópticamente.
 */
function LogoItem({
  client,
  duplicate = false,
}: {
  client: Client;
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className={`flex h-10 w-[130px] shrink-0 items-center justify-center sm:w-[150px] ${
        duplicate ? "motion-reduce:hidden" : ""
      }`}
    >
      <Image
        src={client.logo}
        alt={duplicate ? "" : client.name}
        width={client.width}
        height={client.height}
        sizes="150px"
        className="h-full w-full object-contain opacity-70"
      />
    </li>
  );
}
