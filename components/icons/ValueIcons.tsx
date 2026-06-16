import type { SVGProps } from "react";
import type { ValueIconKey } from "@/lib/content";

/**
 * Iconos mono-línea de las 3 líneas de valor.
 * Stroke 1.5, currentColor, viewBox 24, sin relleno. Decorativos (aria-hidden).
 * Server, sin estado.
 */
const baseProps: SVGProps<SVGSVGElement> = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** Formación: aprendizaje (birrete + base de conocimiento). */
function FormacionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3.5 8.5 12 5l8.5 3.5L12 12z" />
      <path d="M7 10.6v3.6c0 1.1 2.2 2.3 5 2.3s5-1.2 5-2.3v-3.6" />
      <path d="M20.5 8.5v4.2" />
    </svg>
  );
}

/** Implementación: solución en producción (engranaje + bloque). */
function ImplementacionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2M6.7 6.7l1.4 1.4M15.9 15.9l1.4 1.4M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4" />
    </svg>
  );
}

/** Co-implementación: transferencia / construir contigo (dos lados que se enlazan). */
function CoimplementacionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 12.5 7 9l3.2 2.4a1.4 1.4 0 0 1-1.7 2.2L7 12.6" />
      <path d="M21 12.5 17 9l-3.2 2.4a1.4 1.4 0 0 0 1.7 2.2L17 12.6" />
      <path d="M7 12.6l2 1.8c1 .9 2.4 1 3.5.3l1-.7" />
      <path d="M9 9.5l2-1.4c.7-.5 1.6-.5 2.3 0L15 9.5" />
    </svg>
  );
}

const ICONS: Record<
  ValueIconKey,
  (p: SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  formacion: FormacionIcon,
  implementacion: ImplementacionIcon,
  coimplementacion: CoimplementacionIcon,
};

export function ValueIcon({
  name,
  ...props
}: { name: ValueIconKey } & SVGProps<SVGSVGElement>) {
  const Cmp = ICONS[name];
  return <Cmp {...props} />;
}
