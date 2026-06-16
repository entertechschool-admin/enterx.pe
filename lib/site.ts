/**
 * Configuración central del sitio EnterX.
 * Fuente única para dominios, contacto (WhatsApp), metadata y datos de organización.
 * Datos validados en CONTEXT.md — no inventar nada fuera de aquí.
 */

export const SITE_URL = "https://enterx.pe";

export const DOMAINS = {
  primary: "enterx.pe",
  global: "enterx.io",
} as const;

/**
 * Contacto WhatsApp (CTA principal). Número real validado por Bruno.
 * Resuelve el placeholder [POR VALIDAR] de CONTEXT.md §9.
 */
export const WHATSAPP = {
  number: "51964401918",
  defaultMessage:
    "Hola EnterX, vengo de la masterclass y quiero conversar.",
} as const;

/** Construye un link wa.me con mensaje pre-cargado (URL-encoded). */
export function buildWhatsappUrl(message: string = WHATSAPP.defaultMessage): string {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;
}

/** Link por defecto, ya resuelto, para el caso común del CTA. */
export const WHATSAPP_URL = buildWhatsappUrl();

export const META = {
  title: "EnterX — IA aplicada para empresas",
  titleTemplate: "%s · EnterX",
  description:
    "EnterX lleva a las empresas del uso básico de IA a agentes que ejecutan de punta a punta. Formamos equipos y construimos sistemas que quedan operando en casa del cliente. Capacidad instalada, no dependencia.",
  ogAlt: "EnterX — la unidad de IA aplicada B2B de Enter Tech School",
  locale: "es_PE",
} as const;

/**
 * Datos para JSON-LD (Organization). Se inyecta en la Fase 4.
 * Arquitectura de marca: CETEMIN → Enter Tech School → EnterX.
 */
export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EnterX",
  url: SITE_URL,
  description: META.description,
  logo: `${SITE_URL}/isotipo_enterx.png`,
  parentOrganization: {
    "@type": "Organization",
    name: "Enter Tech School",
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "CETEMIN",
    },
  },
} as const;
