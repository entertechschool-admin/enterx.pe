import { WHATSAPP_URL } from "@/lib/site";

type Variant = "primary" | "ghost" | "nav";

type WhatsAppButtonProps = {
  label: string;
  variant?: Variant;
  className?: string;
  /** Marca el CTA como el principal de la página para lectores de pantalla. */
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-200 focus-visible:outline-none";

const variants: Record<Variant, string> = {
  // CTA principal: acento rojo sólido, texto blanco.
  primary:
    "bg-accent px-7 py-3.5 text-[15px] text-white hover:bg-accent-ink",
  // Secundario sobre oscuro: contorno tenue que se ilumina.
  ghost:
    "border border-white/20 px-7 py-3.5 text-[15px] text-white hover:border-white/45 hover:bg-white/5",
  // Compacto para el navbar.
  nav: "bg-accent px-4 py-2 text-[13px] text-white hover:bg-accent-ink",
};

/**
 * CTA a WhatsApp. Link real con mensaje pre-cargado (lib/site.ts).
 * Abre en pestaña nueva con rel seguro. Server, presentacional.
 */
export function WhatsAppButton({
  label,
  variant = "primary",
  className = "",
  ariaLabel,
}: WhatsAppButtonProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? `${label} por WhatsApp`}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {label}
      <WhatsAppGlyph />
    </a>
  );
}

/** Glifo de WhatsApp mono-línea, decorativo (el texto ya nombra la acción). */
function WhatsAppGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21a9 9 0 1 0-7.87-4.6L3 21l4.7-1.1A9 9 0 0 0 12 21Z" />
      <path d="M8.5 9.2c0-.4.3-.7.7-.7.3 0 .6.1.7.4l.6 1.3c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.3.6c.3.1.4.4.4.7 0 .4-.3.7-.7.7A6.7 6.7 0 0 1 8.5 9.2Z" />
    </svg>
  );
}
