import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// El CSS de reveal es global y agresivo: se importa SOLO en este subtree para
// no contaminar el resto de enterx.pe. reset.css normaliza; reveal.css es el core.
import "reveal.js/reset.css";
import "reveal.js/reveal.css";
// Tema EnterX (override de variables de reveal con tokens de marca).
import "./deck.css";

export const metadata: Metadata = {
  title: "IA Agéntica 2026 — Masterclass · EnterX",
  description:
    "Masterclass en vivo: el idioma de la IA agéntica, una demo de un agente trabajando y la mentalidad para sacarle lo mejor. De lo simple a lo complejo.",
  // Material de evento, no contenido SEO del sitio → fuera del índice.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
};

export default function MasterclassLiftLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Re-inyecta las vars de Geist en el subtree del deck para que el tema de
  // reveal pueda usar var(--font-geist-sans) / var(--font-geist-mono).
  return (
    <div className={`${GeistSans.variable} ${GeistMono.variable}`}>
      {children}
    </div>
  );
}
