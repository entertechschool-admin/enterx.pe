/**
 * Todo el copy del sitio, tipado y centralizado.
 * Texto literal de CONTEXT.md (fuente de verdad). No inventar claims ni datos.
 * Voz: sobria, nunca afirmar carencia del cliente; afirmar lo que EnterX construye.
 */

// ---- Hero ----------------------------------------------------------------

/** Una parte del H1; `accent: true` se pinta en rojo dentro del mismo <h1>. */
export type TitlePart = { text: string; accent?: boolean };

export const hero = {
  pendingValidation: false,
  availability: "Disponibles para nuevos proyectos",
  titleParts: [
    { text: "Soluciones digitales con IA que " },
    { text: "potencian", accent: true },
    { text: " a tu equipo" },
  ] as TitlePart[],
  subhead:
    "Formación e implementación de IA para tu operación, tu equipo y tus procesos —con tu gente y sin reemplazar a nadie— en Perú.",
  ctas: [
    {
      label: "Agendar una asesoría gratuita",
      variant: "primary",
      message: "Hola EnterX, quiero agendar una asesoría gratuita.",
      ariaLabel: "Agendar una asesoría gratuita por WhatsApp",
    },
    {
      label: "Quiero información",
      variant: "ghost",
      message: "Hola EnterX, quiero información sobre lo que hacen.",
      ariaLabel: "Pedir información por WhatsApp",
    },
  ] as const,
} as const;

export type Client = {
  name: string;
  logo: string;
  width: number;
  height: number;
};

export const clients = {
  pendingValidation: false,
  trustedLabel: "Empresas que confían en nosotros",
  items: [
    { name: "StartUPC", logo: "/clients/startupc-light.png", width: 234, height: 63 },
    { name: "Atlas Copco", logo: "/clients/atlas-copco-light.png", width: 166, height: 85 },
    { name: "WIM Perú", logo: "/clients/wim-peru-light.png", width: 181, height: 93 },
    { name: "ciemam", logo: "/clients/ciemam-light.png", width: 126, height: 97 },
    { name: "Cori Puno", logo: "/clients/cori-puno-light.png", width: 327, height: 61 },
    { name: "QTC", logo: "/clients/qtc-light.png", width: 128, height: 63 },
    { name: "grupo tesacom", logo: "/clients/grupo-tesacom-light.png", width: 214, height: 56 },
    { name: "lift", logo: "/clients/lift-light.png", width: 112, height: 74 },
    { name: "Buenaventura", logo: "/clients/buenaventura-light.png", width: 336, height: 45 },
    { name: "holos", logo: "/clients/holos-light.png", width: 130, height: 49 },
    { name: "Consorcio Minero Horizonte", logo: "/clients/consorcio-minero-horizonte-light.png", width: 168, height: 76 },
    { name: "BOB", logo: "/clients/bob-light.png", width: 157, height: 80 },
    { name: "CETEMIN", logo: "/clients/cetemin-light.png", width: 536, height: 150 },
  ] as Client[],
} as const;

// ---- Banda estadística ---------------------------------------------------

export const statBand = {
  attribution: "Lectura de mercado EnterX",
  statement: "Casi todas usan IA",
  metric: "<5%",
  metricLabel: "llega a agentes",
  journey: {
    n1: "Preguntas a la IA",
    n2: "Context & Prompt Engineering",
    gap: "La brecha",
    criterion: "Criterio",
    n3: "Agentes de IA",
  },
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
      title: "Formación",
      whatIs:
        "Programas 100% en vivo donde los equipos aprenden a trabajar con IA y a decidir con criterio propio.",
      idealClient:
        "Empresas que quieren elevar el nivel de sus equipos antes de construir.",
      icon: "formacion",
    },
    {
      title: "Implementación",
      whatIs:
        "Construimos la solución de IA que el problema necesita y la dejamos operando en producción.",
      idealClient:
        "Empresas con un problema definido que necesitan ejecución experta.",
      icon: "implementacion",
    },
    {
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

// ---- Productos para tu empresa ------------------------------------------

export type ProductKind = "luna" | "operations" | "sales";
export type PartnerKey = "pathpilot" | "sprinta";

export type PartnerBrand = {
  name: string;
  relationship: "Partner tecnológico";
  logo: string;
  width: number;
  height: number;
};

/** Fuente única de identidad para las marcas tecnológicas públicas. */
export const PARTNER_BRANDS = {
  pathpilot: {
    name: "PathPilot",
    relationship: "Partner tecnológico",
    logo: "/partners/pathpilot.png",
    width: 374,
    height: 102,
  },
  sprinta: {
    name: "Sprinta",
    relationship: "Partner tecnológico",
    logo: "/partners/sprinta.png",
    width: 521,
    height: 114,
  },
} as const satisfies Record<PartnerKey, PartnerBrand>;

export const alliances = {
  label: "Alianzas",
  title: "Tecnología y respaldo",
  technologiesLabel: "Partners tecnológicos",
  brands: [PARTNER_BRANDS.pathpilot, PARTNER_BRANDS.sprinta],
  organization: {
    introduction: "EnterX es la unidad B2B de",
    name: "Enter Tech School",
    logo: "/partners/enter-tech-school.png",
    width: 3262,
    height: 1130,
  },
} as const;

export type Product = {
  name: string;
  description: string;
  kind: ProductKind;
  featured?: boolean;
  label?: string;
  partner?: PartnerKey;
};

export const products = {
  label: "Productos",
  title: "Productos para tu empresa",
  ownLabel: "Producto propio de EnterX",
  items: [
    {
      name: "Agente Luna AI",
      description:
        "Agente que personaliza la formación de tu equipo: aprende con el contenido y contexto de tu propia organización.",
      kind: "luna",
      featured: true,
      label: "Producto propio de EnterX",
    },
    {
      name: "Agentes Operativos",
      description:
        "Agentes que cubren 4 procesos con clientes: onboarding, atención, cobranzas y cumplimiento.",
      kind: "operations",
      partner: "pathpilot",
    },
    {
      name: "Agentes de Ventas",
      description:
        "Agentes inteligentes para WhatsApp que atienden, califican y convierten leads automáticamente.",
      kind: "sales",
      partner: "sprinta",
    },
  ] as const satisfies readonly Product[],
  scenes: {
    luna: ["Contenido", "Contexto", "Equipo"],
    operations: ["Onboarding", "Atención", "Cobranzas", "Cumplimiento"],
    sales: ["Atender", "Calificar", "Convertir"],
  },
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
  primary: "EnterX · 2026",
  backing: "Respaldados por CETEMIN & Enter Tech School",
} as const;
