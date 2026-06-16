import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Metadata mínima temporal (la completa — OG, canonical, JSON-LD — llega en la Fase 4).
export const metadata: Metadata = {
  title: "EnterX — IA aplicada para empresas",
  description:
    "EnterX lleva a las empresas del uso básico de IA a agentes que ejecutan. Capacidad instalada, no dependencia.",
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
