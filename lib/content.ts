/**
 * Todo el copy del sitio, tipado y centralizado.
 * Texto literal de CONTEXT.md (fuente de verdad). No inventar claims ni datos.
 * Voz: sobria, nunca afirmar carencia del cliente; afirmar lo que EnterX construye.
 */

// ---- Hero ----------------------------------------------------------------

/** Una parte del H1; `accent: true` se pinta en rojo dentro del mismo <h1>. */
export type TitlePart = { text: string; accent?: boolean };

export const hero = {
  /**
   * "El 100% de las empresas usa ChatGPT. Menos del 5% usa agentes de IA."
   * El fragmento "Menos del 5%" va en acento rojo.
   */
  titleParts: [
    { text: "El 100% de las empresas usa ChatGPT. " },
    { text: "Menos del 5%", accent: true },
    { text: " usa agentes de IA." },
  ] as TitlePart[],
  subhead:
    "El salto del uso básico a los agentes no son las herramientas — es el criterio. En EnterX lo construimos contigo.",
  ctaLabel: "Conversemos",
  footnote: ["enterx.pe", "enterx.io"],
} as const;

// ---- Navegación ----------------------------------------------------------

export type NavLink = { id: string; label: string };

export const nav: NavLink[] = [
  { id: "la-brecha", label: "La brecha" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];

// ---- Timeline: 4 niveles de madurez en IA --------------------------------

export type TimelineIconKey = "ask" | "context" | "agent" | "product";

export type TimelineLevel = {
  id: string;
  code: string; // N1..N4
  name: string;
  characteristic: string; // texto que se revela al expandir
  icon: TimelineIconKey;
  target?: boolean; // N3 — el objetivo, en rojo
};

export const timeline: TimelineLevel[] = [
  {
    id: "n1",
    code: "N1",
    name: "Preguntas a la IA",
    characteristic:
      "Le preguntas a ChatGPT cosas sueltas. Útil, pero sin método ni resultado consistente.",
    icon: "ask",
  },
  {
    id: "n2",
    code: "N2",
    name: "Context & Prompt Engineering",
    characteristic:
      "Aprendes a darle contexto y a estructurar prompts. La IA responde mejor, pero sigues operando tú.",
    icon: "context",
  },
  {
    id: "n3",
    code: "N3",
    name: "Agentes de IA (delegar tareas)",
    characteristic:
      "Delegas trabajo real a agentes que ejecutan de punta a punta. Aquí empieza el valor.",
    icon: "agent",
    target: true,
  },
  {
    id: "n4",
    code: "N4",
    name: "IA como propuesta de valor",
    characteristic:
      "La IA deja de ser herramienta interna y se vuelve parte de lo que tu empresa ofrece al mercado.",
    icon: "product",
  },
];

/** Lectura de mercado EnterX que refuerza la sección (sin cita externa). */
export const timelineNote =
  "Casi todas las empresas están en N1. El salto a N3 — donde está el valor — no son las herramientas, es el criterio.";

// ---- Propuesta de valor: 3 líneas de negocio -----------------------------

export type ValueIconKey = "formacion" | "implementacion" | "coimplementacion";

export type ValueCard = {
  number: string; // 01..03
  title: string;
  whatIs: string;
  idealClient: string;
  icon: ValueIconKey;
  featured?: boolean; // Co-implementación — diferenciador
};

export const value = {
  lead: "Capacidad instalada. No dependencia. Lo que construimos, tu equipo lo opera.",
  cards: [
    {
      number: "01",
      title: "Formación",
      whatIs:
        "Programas 100% en vivo donde los equipos aprenden a trabajar con IA y a decidir con criterio propio.",
      idealClient:
        "Empresas que quieren elevar el nivel de sus equipos antes de construir.",
      icon: "formacion",
    },
    {
      number: "02",
      title: "Implementación",
      whatIs:
        "Construimos la solución de IA que el problema necesita y la dejamos operando en producción.",
      idealClient:
        "Empresas con un problema definido que necesitan ejecución experta.",
      icon: "implementacion",
    },
    {
      number: "03",
      title: "Co-implementación",
      whatIs:
        "Construimos contigo, no por ti. Tu equipo participa en cada decisión y queda al mando del sistema.",
      idealClient:
        "Empresas que buscan autonomía duradera, no dependencia de un proveedor.",
      icon: "coimplementacion",
      featured: true,
    },
  ] as ValueCard[],
} as const;

// ---- Cierre (CTA) y footer ----------------------------------------------

export const closing = {
  /** Tagline de marca; la 2ª frase ("Las dejamos capaces.") va en rojo. */
  taglineParts: [
    { text: "No dejamos a las empresas dependientes de nosotros. " },
    { text: "Las dejamos capaces.", accent: true },
  ] as TitlePart[],
  ctaLabel: "Conversemos",
} as const;

export const footer = {
  primary: "EnterX · enterx.pe · 2026",
  backing: "CETEMIN · Enter Tech School",
} as const;
