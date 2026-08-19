"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  /** Retardo en ms para entrada escalonada (stagger). */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Permite que descendientes reaccionen a `data-revealed` sin animar la raíz. */
  animateSelf?: boolean;
};

/**
 * Revela su contenido (fade-in + leve translateY) la primera vez que entra
 * al viewport. One-shot: se desuscribe tras revelar. Si el usuario pidió
 * reducir movimiento, aparece directamente sin animar.
 *
 * Usa IntersectionObserver (no scroll handler) y anima el wrapper.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  animateSelf = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const preference = useReducedMotion();
  const reduced = preference === true;

  useEffect(() => {
    if (preference === null) return;
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [preference, reduced]);

  const style =
    preference !== false || shown
      ? undefined
      : { transitionDelay: `${delay}ms` };

  return (
    <Tag
      ref={ref}
      style={style}
      data-revealed={shown ? "true" : "false"}
      className={`${
        !animateSelf || reduced
          ? ""
          : `transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
