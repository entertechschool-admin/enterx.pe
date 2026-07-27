"use client";

import { useEffect, useRef } from "react";

/**
 * Video de fondo de la portada (public/background-home.mp4): figura con visor
 * sobre luces rojas. Reemplazó a la onda cromática en
 * movimiento sobre negro. Silenciado + en bucle + `playsInline` para que
 * autoreproduzca también en móvil; `poster` (public/hero-poster.png) se ve
 * mientras carga, así no hay parpadeo negro.
 *
 * `prefers-reduced-motion`: se pausa y queda en el poster/último frame — nada
 * se mueve para quien lo pidió.
 *
 * ⚠️⚠️ PESO — LO MÁS URGENTE ANTES DE PUBLICAR: el .mp4 son ~15,5 MB y va sobre
 * el pliegue (carga de inmediato, sin escapatoria en móvil). Es casi el DOBLE
 * del anterior (7,9 MB), que ya estaba marcado como pesado. No se pudo
 * comprimir aquí (sin ffmpeg). Bruno debería recodificarlo (1080p, CRF alto,
 * sin audio) — un clip así suele bajar a 1-2 MB sin diferencia visible.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
    }
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-poster.png"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    >
      <source src="/background-home.mp4" type="video/mp4" />
    </video>
  );
}
