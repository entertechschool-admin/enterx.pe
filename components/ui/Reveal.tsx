"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/** useLayoutEffect avisa por consola al renderizar en servidor; allí no corre igual. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type RevealProps = {
  children: ReactNode;
  /** Retardo en ms para entrada escalonada (stagger). */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * "pre"    — primer render (y SSR): visible, sin clases de animación, para que
 *            el contenido exista aunque el JS no llegue nunca.
 * "static" — el usuario pidió reducir movimiento: se queda visible, sin animar.
 * "hidden" — listo para animar, esperando entrar al viewport.
 * "shown"  — revelado.
 */
type Phase = "pre" | "static" | "hidden" | "shown";

/**
 * Revela su contenido (fade-in + leve translateY) la primera vez que entra
 * al viewport. One-shot: se desuscribe tras revelar. Si el usuario pidió
 * reducir movimiento, aparece directamente sin animar.
 *
 * Usa IntersectionObserver (no scroll handler) y anima el wrapper.
 *
 * Sobre `prefers-reduced-motion`: NO usa useReducedMotion() a propósito. Ese
 * hook arranca en `true` y lo confirma en un efecto; Reveal leería el valor
 * pesimista en el primer ciclo, se daría por revelado y no animaría nunca.
 * Aquí se consulta matchMedia en un layout effect: corre tras el primer paint
 * "pre" pero ANTES de pintar "hidden", así no hay parpadeo de ida ni de vuelta.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("pre");

  useIsomorphicLayoutEffect(() => {
    setPhase(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "static"
        : "hidden",
    );
  }, []);

  useEffect(() => {
    if (phase !== "hidden") return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [phase]);

  const animating = phase === "hidden" || phase === "shown";

  return (
    <Tag
      ref={ref}
      // El retardo se mantiene mientras dura la animación: si se quitara en el
      // mismo commit que revela, el stagger no llegaría a aplicarse.
      style={animating ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${
        animating
          ? `transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              phase === "shown"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`
          : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
