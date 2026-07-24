import type { Metadata } from "next";
import { openSauceSans } from "@/components/diagnostico/font";
import "@/components/diagnostico/diagnostico.css";

/**
 * Página sola del diagnóstico (link directo, compartible). La misma pieza
 * vive también incrustada en el home, justo antes del cierre — ver
 * components/sections/DiagnosticoSection.tsx. Estilo propio, aislado del
 * resto del sitio (mismo patrón que app/masterclass-lift). Decisión de
 * Ariana (17-07-2026): se lleva tal cual se ve en la pieza original.
 */
export const metadata: Metadata = {
  title: "Diagnóstico de Madurez en IA",
  description:
    "3 minutos. Descubre en qué nivel de madurez de IA está tu equipo, según el framework propio de EnterX.",
  alternates: {
    canonical: "/diagnostico",
  },
};

export default function DiagnosticoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={openSauceSans.variable}>{children}</div>;
}
