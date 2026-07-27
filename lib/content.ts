/**
 * Todo el copy del sitio, tipado y centralizado.
 * Texto literal de CONTEXT.md (fuente de verdad). No inventar claims ni datos.
 * Voz: sobria, nunca afirmar carencia del cliente; afirmar lo que EnterX construye.
 */

// ---- Hero ----------------------------------------------------------------

/** Una parte del H1; `accent: true` se pinta en rojo dentro del mismo <h1>. */
export type TitlePart = { text: string; accent?: boolean };

export const hero = {
  pendingValidation: true,
  /** Chip de disponibilidad sobre el titular. Punto rojo con latido. */
  availability: "Disponibles para nuevos proyectos",
  /**
   * H1 — posicionamiento correcto (Ariana, 21-07-2026, confirmado con su
   * Instagram): EnterX NO vende "agentes" como producto ni "reemplaza gente".
   * Vende SOLUCIONES DIGITALES CON IA para la operación, el equipo y los
   * procesos, POTENCIANDO a las personas. Alineado con CONTEXT ("Las dejamos
   * capaces", "contigo, no por ti", "autonomía sobre dependencia") y con su IG
   * ("IA donde más la necesitas: tu operación, tu equipo, tus procesos").
   * "potencian" en acento rojo. La subhead suma el alcance + formación +
   * "con tu gente, no en su lugar" + Perú.
   */
  titleParts: [
    { text: "Soluciones digitales con IA que " },
    { text: "potencian", accent: true },
    { text: " a tu equipo" },
  ] as TitlePart[],
  subhead:
    "Formación e implementación de IA para tu operación, tu equipo y tus procesos —con tu gente y sin reemplazar a nadie— en Perú.",
  /**
   * Dos CTA (Ariana, 16-07-2026). Cada uno llega a WhatsApp con un mensaje
   * distinto: así se sabe qué botón trajo a cada quien, que hoy es imposible.
   *
   * ⚠️ "Asesoría gratuita" NO está en CONTEXT.md y contradice SPEC.md §5
   * ("CTA suave... no es captura agresiva de leads") y §18 ("CTA único y suave:
   * WhatsApp 'Conversemos'"). Nótese "único": la spec pedía UN CTA, aquí van
   * dos. Sale del brochure pág. 7 ("Demo y consultoría gratis" / "Te asesoramos
   * sin compromiso"), igual que el cierre. Va bajo el mismo candado.
   * Para revertir: un solo CTA con label "Conversemos" y sin `message`.
   */
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

// ---- Estadística (banda animada entre portada y Clientes) ---------------

/** El dato que antes vivía en el H1, ahora como gráfico de dona + quote: la dona
 *  casi vacía (arco rojo del ~5%) dramatiza lo mínimo que es, y el quote le da
 *  voz. Se anima al entrar en pantalla (StatBand). Cifra <5% defendible
 *  (Gartner 2025: <5% de apps empresariales con agentes específicos). */
export const stat = {
  kicker: "La brecha, en un dato",
  source: "Gartner, 2025",
  /** La dona LOOPEA entre estos dos datos (Ariana, 21-07-2026): el arco y la
   *  cifra van del 92% (usa ChatGPT, blanco) al ~5% (tiene agentes, rojo). */
  donutPoints: [
    { pct: 92, pre: "", to: 92, suf: "%", label: "usa ChatGPT", accent: false },
    {
      pct: 5,
      pre: "menos del",
      to: 5,
      suf: "%",
      label: "tiene agentes de IA trabajando",
      accent: true,
    },
  ],
  /** Quote dividido en dos frases, cada una ligada a un punto de la dona: al
   *  cambiar el loop, se ilumina la frase del dato que se muestra y se atenúa la
   *  otra. clauses[0] ↔ 92%, clauses[1] ↔ 5%. */
  quote: {
    clauses: [
      "El 92% de las empresas usa ChatGPT",
      "menos del 5% tiene agentes de IA trabajando",
    ],
    connector: ", pero ",
    end: ".",
  },
  /** Frase completa para lectores de pantalla (dona/cifras van aria-hidden). */
  sr: "El 92% de las empresas usa ChatGPT, pero menos del 5% tiene agentes de IA trabajando. Fuente: Gartner, 2025.",
} as const;

// ---- Navegación ----------------------------------------------------------

export type NavLink = { id: string; label: string };

export const nav: NavLink[] = [
  { id: "la-brecha", label: "La brecha" },
  { id: "servicios", label: "Servicios" },
  { id: "diagnostico", label: "Diagnóstico" },
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

// ---- Clientes ------------------------------------------------------------

/**
 * ⚠️ PENDIENTE DE VALIDACIÓN — no está en CONTEXT.md.
 * Origen: brochure comercial, pág. 2 ("Empresas que confían en nosotros").
 *
 * ⚠️ Los logos de /public/clients NO son los archivos originales: están
 * recortados del brochure, que es un PDF aplanado en JPEG calidad 60. A tamaño
 * de cinta (~40px de alto) la pérdida no se ve, pero son marcas de terceros
 * servidas desde una web pública — lo correcto es pedir los archivos buenos.
 *
 * Falta el visto bueno de Bruno sobre:
 *   1. publicar los 12 logos de clientes en una web abierta (el brochure es
 *      material comercial dirigido; una web pública es otra exposición),
 *   2. el permiso de uso de marca de cada empresa,
 *   3. sustituir los recortes por los logos originales.
 * Hasta entonces `pendingValidation` bloquea el despliegue (scripts/check-pending.mjs).
 */
export type Client = {
  name: string;
  logo: string;
  /** Dimensiones intrínsecas del PNG recortado — evitan CLS en next/image. */
  width: number;
  height: number;
};

export const clients = {
  pendingValidation: true,
  label: "Clientes",
  /** Rótulo de la franja "trusted by" en la base de la tarjeta de la portada. */
  trustedLabel: "Empresas que confían en nosotros",
  /** Literal del brochure (pág. 2), con el acento rojo en la misma palabra. */
  titleParts: [
    { text: "Empresas que " },
    { text: "confían", accent: true },
    { text: " en nosotros" },
  ] as TitlePart[],
  // Orden del brochure, de izquierda a derecha y de arriba abajo.
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
    {
      name: "Consorcio Minero Horizonte",
      logo: "/clients/consorcio-minero-horizonte-light.png",
      width: 168,
      height: 76,
    },
    { name: "BOB", logo: "/clients/bob-light.png", width: 157, height: 80 },
    // Añadido por Ariana (16-07-2026), fuera del brochure. Va al final para no
    // alterar el orden original y dejar rastro de que se sumó después.
    //
    // ⚠️ BRUNO, DOS COSAS SOBRE ESTE:
    // 1. CETEMIN es el respaldo institucional de EnterX (CONTEXT.md §2), no un
    //    tercero: el footer ya dice "Respaldados por CETEMIN". Con esto, la
    //    misma página lo presenta como respaldo abajo y como cliente aquí. El
    //    brochure NO lo incluye entre las 12 "empresas que confían". Hay
    //    proyecto real (cierre 202604C15, Sistema de Agentes IA), así que el
    //    dato no es falso — es una decisión de posicionamiento. Ariana la tomó
    //    con el conflicto sobre la mesa.
    // 2. Su logo y el de `ciemam` son la MISMA marca (idéntica "C" con flecha);
    //    en monocromo se leen como un duplicado.
    { name: "CETEMIN", logo: "/clients/cetemin-light.png", width: 536, height: 150 },
  ] as Client[],
} as const;

// ---- Alianzas tecnológicas ----------------------------------------------

/**
 * ⚠️ PENDIENTE DE VALIDACIÓN — no está en CONTEXT.md.
 * Datos aportados por Ariana (16-07-2026): partners comerciales cuya tecnología
 * usa EnterX para construir agentes de nicho. Ariana confirma que los acuerdos
 * ya están cerrados. Falta el visto bueno de Bruno sobre:
 *   1. los nombres y el permiso de uso de cada marca,
 *   2. el texto de la relación ("construimos sobre su tecnología"),
 *   3. el tratamiento monocromático de los logos (ver components/sections/Partners.tsx).
 * Hasta entonces `pendingValidation` bloquea el despliegue (scripts/check-pending.mjs).
 * Al aprobar: mover este contenido a CONTEXT.md y borrar `pendingValidation`.
 */
/** `enterTechSchool` NO alimenta ningún producto (a diferencia de los otros
 *  dos); solo aparece en Alianzas. Product.partner nunca lo usa. */
export type PartnerKey = "pathpilot" | "sprinta" | "enterTechSchool";

export type Partner = {
  key: PartnerKey;
  name: string;
  /** Qué tipo de alianza es. Distingue a los partners de TECNOLOGÍA (usamos su
   *  producto) del RESPALDO académico — no son lo mismo y no deben leerse
   *  igual. Se muestra bajo cada logo. */
  role: string;
  /** Monocromático sobre transparente. Dos tintas porque los consumen dos
   *  secciones de fondo opuesto: Alianzas (claro/tarjetas) y Productos. */
  logo: string; // blanco → fondo oscuro
  logoInk: string; // negro → fondo claro
  /** Dimensiones intrínsecas del PNG recortado — evitan CLS en next/image. */
  width: number;
  height: number;
};

/** Marcas de los partners. Fuente única: las consumen Alianzas y Productos. */
export const PARTNER_BRANDS: Record<PartnerKey, Partner> = {
  pathpilot: {
    key: "pathpilot",
    name: "PathPilot",
    role: "Partner tecnológico",
    logo: "/partners/pathpilot.png",
    logoInk: "/partners/pathpilot-ink.png",
    width: 374,
    height: 102,
  },
  sprinta: {
    key: "sprinta",
    name: "Sprinta",
    role: "Partner tecnológico",
    logo: "/partners/sprinta.png",
    logoInk: "/partners/sprinta-ink.png",
    width: 521,
    height: 114,
  },
  // ⚠️ Enter Tech School NO es un partner comercial como los otros dos: es la
  // matriz de EnterX (CONTEXT.md §2: "EnterX es la unidad B2B de Enter Tech
  // School"). Aquí figura por su ROL REAL —respaldo académico de los
  // certificados de workshops/masterclass (Ariana, 17-07-2026)— no como
  // proveedor de tecnología. Por eso `role` lo separa de PathPilot/Sprinta.
  // Logo (enter-tech-school): archivo real "Enter_Logo-02.png", recoloreado a
  // negro para la tarjeta clara. `logo` (blanco) queda por si vuelve a oscuro.
  enterTechSchool: {
    key: "enterTechSchool",
    name: "Enter Tech School",
    role: "Respaldo académico",
    logo: "/partners/enter-tech-school.png",
    logoInk: "/partners/enter-tech-school-ink.png",
    width: 3262,
    height: 1130,
  },
};

export const partners = {
  pendingValidation: true,
  label: "Alianzas",
  // Todo en blanco (sin acento) por decisión de Ariana (17-07-2026).
  titleParts: [{ text: "Nuestros partners" }] as TitlePart[],
  // PathPilot y Sprinta (tecnología) + Enter Tech School (respaldo académico).
  items: [
    PARTNER_BRANDS.pathpilot,
    PARTNER_BRANDS.sprinta,
    PARTNER_BRANDS.enterTechSchool,
  ],
  /** Invitación a nuevos partners; abre el correo (mailto). */
  joinLabel: "¿Quieres sumarte como partner?",
  joinSubject: "Quiero sumarme como partner de EnterX",
} as const;

// ---- Productos -----------------------------------------------------------

/**
 * ⚠️ PENDIENTE DE VALIDACIÓN — no está en CONTEXT.md.
 * Origen: brochure comercial, pág. 5 ("PRODUCTOS PARA TU EMPRESA"). Textos
 * literales. Los dos primeros llevan ★ en el brochure ("Trabajo de la mano con
 * nuestros partners comerciales"); Luna AI es de EnterX y no lo lleva.
 */
export type ProductMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type Product = {
  name: string;
  description: string;
  /** Partner que hace funcionar el producto; ausente = producto propio. */
  partner?: PartnerKey;
  /** Protagonista: bloque propio, a lo ancho y en oscuro. Solo uno. */
  featured?: boolean;
  /** Captura/demo que se revela al abrir el desplegable del producto. */
  media?: ProductMedia;
  /**
   * Escena ilustrativa ANIMADA (ProductScene) en vez de una captura. Original
   * de EnterX: transmite qué hace el producto sin copiar interfaces ajenas ni
   * depender de un mockup. Preferida sobre `media`.
   */
  anim?: "sprinta" | "pathpilot" | "luna";
};

export const products = {
  pendingValidation: true,
  label: "Productos",
  // Todo en blanco (sin acento) por decisión de Ariana (17-07-2026).
  titleParts: [{ text: "Productos para tu empresa" }] as TitlePart[],
  /** Público, literal del brochure: las 3 tarjetas dicen "Empresas". */
  audience: "Empresas",
  /** Etiqueta del protagonista: lo que lo separa de los otros dos. */
  ownLabel: "Producto propio de EnterX",
  // Luna AI va primera y destacada, alterando el orden del brochure (donde es
  // la 3ª de tres iguales): es el único producto propio — los otros dos corren
  // sobre tecnología de partners. Decisión de Ariana (16-07-2026).
  items: [
    {
      name: "Agente Luna AI",
      description:
        "Agente que personaliza la formación de tu equipo: aprende con el contenido y contexto de tu propia organización.",
      featured: true,
      // Escena animada original (ProductScene) — reemplaza el mockup provisional
      // que no se podía publicar (mostraba N1-N5, un bloque de prompt y un chip
      // de CRM sin confirmar). La escena usa N1-N4, coherente con "La brecha".
      anim: "luna",
    },
    {
      name: "Agentes Operativos",
      description:
        "Agentes que cubren 4 procesos con clientes: onboarding, atención, cobranzas y cumplimiento.",
      partner: "pathpilot",
      // Escena animada original (ProductScene) en vez de la captura de su web.
      anim: "pathpilot",
    },
    {
      name: "Agentes de Ventas",
      description:
        "Agentes inteligentes para WhatsApp que atienden, califican y convierten leads automáticamente.",
      partner: "sprinta",
      // Escena animada original (ProductScene) en vez de la captura de su web.
      anim: "sprinta",
    },
  ] as Product[],
} as const;

// ---- Diagnóstico ---------------------------------------------------------

/** Título de la sección del diagnóstico de madurez (framing; la card interna
 *  ya pregunta "¿En qué nivel…?", así que aquí NO se repite). */
export const diagnostico = {
  label: "Diagnóstico",
  titleParts: [
    { text: "Primero, descubre " },
    { text: "dónde estás", accent: true },
  ] as TitlePart[],
} as const;

// ---- Cierre (CTA) y footer ----------------------------------------------

/**
 * ⚠️ `offerPill` y `ctaLabel` PENDIENTES DE VALIDACIÓN.
 * Origen: brochure pág. 7 — la píldora "Demo y consultoría gratis" y el botón
 * "TE ASESORAMOS SIN COMPROMISO". Textos literales.
 *
 * ⚠️ BRUNO: esto CONTRADICE SPEC.md a propósito, no por descuido.
 *   · §5: "Objetivo: presencia y credibilidad + un CTA suave (WhatsApp). NO es
 *     captura agresiva de leads."
 *   · §18: "CTA único y suave: WhatsApp 'Conversemos'."
 * O sea, "Conversemos" era una decisión deliberada de no vender en el cierre.
 * Ariana pidió el cambio con la contradicción sobre la mesa: el brochure sí
 * vende la asesoría y el sitio no la mencionaba en ningún punto. Tampoco hay
 * nada de "gratis" ni "sin compromiso" en CONTEXT.md.
 * Si se aprueba: corregir SPEC.md §5/§18, no solo el código.
 * Para revertir: `ctaLabel: "Conversemos"` y borrar `offerPill`.
 */
export const closing = {
  pendingValidation: true,
  /** Tagline de marca; la 2ª frase ("Las dejamos capaces.") va en rojo. */
  taglineParts: [
    { text: "No dejamos a las empresas dependientes de nosotros. " },
    { text: "Las dejamos capaces.", accent: true },
  ] as TitlePart[],
  offerPill: "Demo y consultoría gratis",
  ctaLabel: "Te asesoramos sin compromiso",
  /** Correo para OTROS temas (no implementación ni formación, que van por el
   *  CTA de WhatsApp). El correo real vive en lib/site.ts → EMAIL_CLOSING. */
  emailIntro:
    "¿Quieres hablar de otra cosa que no sea implementación ni formación? Escríbenos a",
} as const;

/**
 * ⚠️ BRUNO — AQUÍ SE QUITÓ CONTENIDO QUE LA SPEC EXIGE.
 *
 * La línea de respaldo ("Respaldados por CETEMIN & Enter Tech School") se
 * retiró por decisión de Ariana (16-07-2026), después de añadir CETEMIN a la
 * cinta de clientes: la misma página lo presentaba como respaldo y como cliente
 * a la vez. Se le expuso el conflicto y las alternativas antes de hacerlo.
 *
 * Lo que esto rompe, para que lo decidas con el dato completo:
 *  · SPEC.md §FOOTER la exige literalmente ("línea de respaldo compacta:
 *    CETEMIN · Enter Tech School") → la spec habría que corregirla, no solo
 *    el código.
 *  · CONTEXT.md §5 lista "Respaldo CETEMIN" como diferenciador #05 de 5.
 *  · Era el ÚNICO punto del sitio público que decía que EnterX pertenece a
 *    Enter Tech School. El JSON-LD (lib/site.ts → ORG_JSONLD) sí sigue
 *    declarando la genealogía CETEMIN → Enter Tech School → EnterX, así que
 *    ahora Google conoce un linaje que el visitante no ve.
 *
 * Para restaurar: devolver `backing: "Respaldados por CETEMIN & Enter Tech
 * School"` y volver a pintarlo en components/layout/Footer.tsx.
 */
export const footer = {
  primary: "EnterX · 2026",
} as const;
