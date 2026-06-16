"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve true si el usuario pidió reducir el movimiento.
 * Empieza en `true` (lado seguro: sin animar) hasta confirmar en cliente,
 * así el primer paint no dispara movimiento no deseado.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
