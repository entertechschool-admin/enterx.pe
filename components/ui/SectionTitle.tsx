import type { TitlePart } from "@/lib/content";

/**
 * Titular de sección (`h2`) con acento rojo en una palabra — el gesto que ya
 * usan el hero y el cierre, y que el brochure repite en cada página
 * ("Empresas que **confían**", "**Productos** para tu empresa").
 *
 * Va a `text-h2`, la misma escala que "La brecha" y "Servicios": un titular de
 * sección en tamaño de párrafo no se lee como titular. Server, presentacional.
 */
export function SectionTitle({
  parts,
  className = "",
}: {
  parts: readonly TitlePart[];
  className?: string;
}) {
  return (
    <h2 className={`text-h2 text-balance ${className}`}>
      {parts.map((part, i) => (
        <span key={i} className={part.accent ? "text-accent" : undefined}>
          {part.text}
        </span>
      ))}
    </h2>
  );
}
