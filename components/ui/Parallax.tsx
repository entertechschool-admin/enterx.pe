"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ParallaxProps = {
  children: ReactNode;
  /** Cuánto se desplaza respecto al scroll (px por viewport). Sutil por defecto. */
  strength?: number;
  className?: string;
};

/**
 * Parallax sutil: desplaza su contenido en Y según la posición de scroll.
 * Usa transform (no layout) vía rAF y un listener pasivo. Se desactiva por
 * completo si el usuario pidió reducir movimiento.
 */
export function Parallax({
  children,
  strength = 40,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Progreso -1..1 según el centro del elemento cruza el viewport.
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(-1, Math.min(1, progress)) * strength;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
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
  }, [reduced, strength]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
