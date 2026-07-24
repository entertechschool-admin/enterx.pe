"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * "El camino del isótopo": un riel vertical fijo en el costado por el que baja
 * el isótopo de EnterX conforme el usuario hace scroll. La porción recorrida del
 * camino se pinta de rojo — un indicador de progreso con la marca como cuenta.
 *
 * Rendimiento: el scroll solo mueve la cuenta con `transform` (nunca layout), y
 * se agenda con rAF. Decorativo (`aria-hidden`).
 *
 * `motion-reduce:hidden` + salida temprana del efecto → invisible y sin JS para
 * quien pidió reducir movimiento. Oculto en móvil (poco espacio).
 */
export function ScrollJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const beadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const fill = fillRef.current;
      const bead = beadRef.current;
      if (!track || !fill || !bead) return;

      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      const travel = track.clientHeight - bead.offsetHeight;
      bead.style.transform = `translate(-50%, ${(p * travel).toFixed(1)}px)`;
      fill.style.height = `${(p * 100).toFixed(2)}%`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-24 right-6 top-24 z-40 hidden w-12 motion-reduce:hidden md:block lg:right-10"
    >
      <div ref={trackRef} className="relative mx-auto h-full w-0.5 rounded-full bg-white/15">
        {/* Camino recorrido */}
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 rounded-full bg-accent"
          style={{ height: "0%" }}
        />
        {/* El isótopo, la cuenta que baja */}
        <div
          ref={beadRef}
          className="absolute left-1/2 top-0 will-change-transform"
          style={{ transform: "translate(-50%, 0px)" }}
        >
          {/* Halo rojo para que resalte sobre cualquier fondo */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-lg"
          />
          <Image
            src="/iso_enterx.png"
            alt=""
            width={128}
            height={136}
            sizes="48px"
            className="relative w-12 drop-shadow-[0_2px_12px_rgba(217,40,26,0.7)]"
          />
        </div>
      </div>
    </div>
  );
}
