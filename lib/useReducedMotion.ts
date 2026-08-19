"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve la preferencia de movimiento cuando el cliente ya la resolvió.
 * `null` evita asumir reduced motion antes de leer la media query.
 */
export function useReducedMotion(): boolean | null {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
