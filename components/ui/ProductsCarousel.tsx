"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { products, PARTNER_BRANDS } from "@/lib/content";
import { ProductScene } from "@/components/ui/ProductScene";
import type { Product } from "@/lib/content";

const AUTO_MS = 6000;

/**
 * Carrusel de productos: uno a la vez, avanza solo al siguiente en bucle, con
 * flechas para ir/volver y puntos indicadores.
 *
 * Accesibilidad (carrusel que se mueve solo → WCAG 2.2.2):
 *  · No auto-avanza si el visitante pidió reducir movimiento.
 *  · Se pausa mientras el puntero está encima o el foco está dentro.
 *  · La transición se apaga con `motion-reduce` (salta en vez de deslizar).
 *  · Cada slide anuncia "N de 3: <producto>"; las no activas van aria-hidden.
 *  · Flechas y puntos son botones con etiqueta; el punto activo lleva
 *    aria-current.
 */
export function ProductsCarousel() {
  const items = products.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = (i: number) => setIndex((i + items.length) % items.length);

  // Auto-avance. Se recrea al cambiar índice o pausa (reinicia el reloj tras
  // navegar a mano). No corre bajo prefers-reduced-motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(index + 1), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, paused, items.length]);

  return (
    <div
      ref={regionRef}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Productos para tu empresa"
      className="mt-12"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget as Node))
          setPaused(false);
      }}
    >
      <div className="overflow-hidden rounded-card-lg">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((product, i) => (
            <div
              key={product.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${items.length}: ${product.name}`}
              aria-hidden={i !== index}
              className="flex w-full shrink-0"
            >
              <ProductSlide product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <Arrow dir="prev" onClick={() => go(index - 1)} />

        <ul className="flex items-center gap-2.5">
          {items.map((product, i) => (
            <li key={product.name}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir a ${product.name}`}
                aria-current={i === index ? "true" : undefined}
                className={`block size-2 rounded-full transition-colors duration-200 ${
                  i === index ? "bg-accent" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            </li>
          ))}
        </ul>

        <Arrow dir="next" onClick={() => go(index + 1)} />
      </div>
    </div>
  );
}

function ProductSlide({ product }: { product: Product }) {
  const partner = product.partner ? PARTNER_BRANDS[product.partner] : null;

  return (
    <div className="w-full rounded-card-lg border border-white/10 bg-ink-800 p-6 md:p-10">
      <div className="grid h-full gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p
            className={`font-mono text-[10px] uppercase tracking-label ${
              product.featured ? "text-accent" : "text-label"
            }`}
          >
            {product.featured ? products.ownLabel : products.audience}
          </p>

          <h3 className="mt-4 text-h2">{product.name}</h3>

          <p className="mt-5 text-lead text-surface/80">{product.description}</p>

          {partner && (
            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-label text-label">
                Con
              </span>
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                sizes="120px"
                className="h-5 w-auto opacity-80"
              />
            </div>
          )}
        </div>

        {product.anim && <ProductScene kind={product.anim} />}
      </div>
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const prev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={prev ? "Producto anterior" : "Producto siguiente"}
      className="
        flex size-10 items-center justify-center rounded-full border border-white/15
        text-surface/70 transition-colors duration-200 hover:border-white/40
        hover:text-surface focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-accent
      "
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={prev ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
