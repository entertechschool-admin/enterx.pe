"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export function MarqueeController({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div data-paused={paused ? "true" : "false"}>
      {children}
      <div className="mt-6 flex justify-end px-8 motion-reduce:hidden md:px-12">
        <button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? "Reanudar el desplazamiento de los logos de clientes" : "Pausar el desplazamiento de los logos de clientes"} className="flex min-h-11 min-w-11 items-center justify-center rounded-pill border border-white/15 bg-ink text-surface/60 transition-colors duration-200 hover:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          {paused ? "▶" : "Ⅱ"}
        </button>
      </div>
    </div>
  );
}
