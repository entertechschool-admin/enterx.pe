"use client";

import dynamic from "next/dynamic";

/**
 * reveal.js es una librería de navegador (usa window/document) → no puede
 * renderizarse en servidor. Por eso el Deck se carga con ssr:false.
 * En App Router ssr:false no se permite dentro de Server Components, así que
 * esta página es Client Component ('use client'). Ver PLAN_MASTERCLASS.md §10.
 */
const Deck = dynamic(() => import("./Deck"), { ssr: false });

export default function MasterclassLiftPage() {
  return <Deck />;
}
