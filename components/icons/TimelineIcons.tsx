import type { SVGProps } from "react";
import type { TimelineIconKey } from "@/lib/content";

/**
 * Iconos mono-línea de los 4 niveles de madurez.
 * Stroke 1.5, currentColor, viewBox 24, sin relleno. Decorativos (aria-hidden):
 * el nombre del nivel ya da el significado. Server, sin estado.
 */
const baseProps: SVGProps<SVGSVGElement> = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** N1 — Preguntas a la IA: burbuja de chat con "?". */
function AskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 13.5Z" />
      <path d="M10 8.2a2 2 0 0 1 3.5 1.3c0 1.3-2 1.5-2 2.8" />
      <path d="M11.5 14.2h.01" />
    </svg>
  );
}

/** N2 — Context & Prompt Engineering: capas de contexto + cursor de prompt. */
function ContextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 7.5 12 4l7 3.5-7 3.5z" />
      <path d="M5 12l7 3.5L19 12" />
      <path d="M5 16.5 12 20l7-3.5" />
    </svg>
  );
}

/** N3 — Agentes de IA: nodo autónomo con flujo en bucle cerrado. */
function AgentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 5.2A6.8 6.8 0 0 1 18.2 9" />
      <path d="M18.6 12a6.8 6.8 0 0 1-9.4 6.3" />
      <path d="M5.4 14A6.8 6.8 0 0 1 8 6.1" />
      <path d="M18.2 9 18.8 6l-3 .2" />
      <path d="M9.2 18.3 6 18.4l1.6-2.6" />
    </svg>
  );
}

/** N4 — IA como propuesta de valor: paquete con flecha saliente al cliente. */
function ProductIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 8.5 9 6l5 2.5v5L9 16l-5-2.5z" />
      <path d="M9 6v10" />
      <path d="M4 8.5 9 11l5-2.5" />
      <path d="M14 11h6" />
      <path d="m17.5 8.5 3 2.5-3 2.5" />
    </svg>
  );
}

const ICONS: Record<TimelineIconKey, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  ask: AskIcon,
  context: ContextIcon,
  agent: AgentIcon,
  product: ProductIcon,
};

export function TimelineIcon({
  name,
  ...props
}: { name: TimelineIconKey } & SVGProps<SVGSVGElement>) {
  const Cmp = ICONS[name];
  return <Cmp {...props} />;
}
