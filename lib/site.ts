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
 *
 * El mensaje decía "vengo de la masterclass" para TODO visitante (16-07-2026):
 * quien llegaba por Google abría WhatsApp con una frase falsa ya escrita y
 * tenía que borrarla antes de escribir — fricción justo en la conversión, y
 * atribución falsa para EnterX. Se escribió para el lanzamiento y nunca se
 * generalizó. No hacía falta una variante: la masterclass
 * (app/masterclass-lift) no usa este enlace, entra por un QR a su grupo.
 */
export const WHATSAPP = {
  number: "51964401918",
  defaultMessage: "Hola EnterX, quiero conversar sobre IA para mi empresa.",
} as const;

/** Construye un link wa.me con mensaje pre-cargado (URL-encoded). */
export function buildWhatsappUrl(message: string = WHATSAPP.defaultMessage): string {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;
}

/** Link por defecto, ya resuelto, para el caso común del CTA. */
export const WHATSAPP_URL = buildWhatsappUrl();

/**
 * Email de contacto. Resuelve el placeholder de CONTEXT.md §9
 * ("[POR VALIDAR — definir hola@enterx.pe vs correo actual]"): Ariana eligió el
 * correo actual (16-07-2026), una de las dos opciones que el propio documento
 * ofrecía. Es el que aparece en el brochure, pág. 7.
 *
 * ⚠️ BRUNO, dos cosas menores pero reales:
 *  1. Es un correo personal, no de rol. Si Ariana está fuera, el lead espera.
 *  2. Es @enter.edu.pe, no @enterx.pe — y hoy se retiró del footer la línea
 *     "Respaldados por CETEMIN & Enter Tech School", así que el sitio ya no
 *     explica de dónde sale ese dominio. El visitante ve enterx.pe y recibe un
 *     correo de una escuela que la página no menciona.
 * Actualizar CONTEXT.md §9 al aprobar.
 */
export const EMAIL = "ariana@enter.edu.pe";

/**
 * Correo del CTA del cierre (contacto general) — buzón de rol en el dominio
 * propio, por decisión de Ariana (21-07-2026). Va SOLO en FinalCta; el botón de
 * partners (Alianzas) sigue en `EMAIL` (Ariana, que lleva Alianzas).
 *
 * Nota para Bruno: esto deja dos correos en el sitio. Además `admin@enterx.pe`
 * es del dominio propio (mejor que @enter.edu.pe), pero el JSON-LD de la
 * organización (ORG_JSONLD.email) sigue apuntando a `EMAIL` — conviene unificar
 * cuál es el contacto oficial.
 */
export const EMAIL_CLOSING = "admin@enterx.pe";

/**
 * Redes oficiales de EnterX.
 *
 * ⚠️ Aportadas por Ariana (16-07-2026). NO están en CONTEXT.md §9, que solo
 * cubre WhatsApp, email y dominios — Bruno debería añadirlas ahí.
 * Verificadas el 16-07-2026 pidiendo cada URL:
 *   · LinkedIn → título "EnterX | LinkedIn"  ✓
 *   · YouTube  → título "enterx-pe"          ✓
 *   · Instagram → NO verificable: el muro de acceso devuelve un título
 *     genérico ("Instagram"). La URL responde 200 y el nombre es coherente,
 *     pero que sea la cuenta correcta está sin confirmar.
 */
export type SocialKey = "linkedin" | "instagram" | "youtube";

export const SOCIAL: { key: SocialKey; name: string; url: string }[] = [
  { key: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/company/enterx-pe/" },
  { key: "instagram", name: "Instagram", url: "https://www.instagram.com/enterx.pe" },
  { key: "youtube", name: "YouTube", url: "https://www.youtube.com/@enterx-pe" },
];

export const META = {
  /**
   * Título y descripción SEO — lo que sale en Google. Cargan las palabras clave
   * del negocio (Ariana, 21-07-2026): "agentes de IA", "automatización",
   * "formación", "para empresas", "Perú". El título va bajo ~60 caracteres y la
   * descripción bajo ~160 para que no se corten en el resultado.
   *
   * ⚠️ Bruno: es copy público (título/descripción de marca). No está en
   * CONTEXT.md — validar posicionamiento y el foco geográfico "Perú" (el
   * dominio .pe lo respalda, pero confirmar si el alcance es solo Perú o LATAM).
   */
  title: "EnterX — Soluciones de IA para empresas en Perú",
  titleTemplate: "%s · EnterX",
  description:
    "Soluciones de IA para tu operación, tu equipo y tus procesos. Formación e implementación con tu gente, sin reemplazar a nadie. Para empresas en Perú.",
  ogAlt: "EnterX — Soluciones de IA para empresas en Perú",
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
  email: EMAIL,
  // `sameAs` es el campo con el que Google enlaza la organización con sus
  // perfiles oficiales. Sale de SOCIAL para no repetir las URLs en dos sitios.
  sameAs: SOCIAL.map((s) => s.url),
  parentOrganization: {
    "@type": "Organization",
    name: "Enter Tech School",
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "CETEMIN",
    },
  },
} as const;
