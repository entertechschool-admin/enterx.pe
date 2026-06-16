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
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
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
  }, [reduced]);

  const style =
    reduced || shown
      ? undefined
      : { transitionDelay: `${delay}ms` };

  return (
    <Tag
      ref={ref}
      style={style}
      className={`${
        reduced
          ? ""
          : `transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
