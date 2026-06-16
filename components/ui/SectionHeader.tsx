type SectionHeaderProps = {
  /** Número de sección, p. ej. "01". Se pinta en rojo. */
  number: string;
  /** Descriptor, p. ej. "La brecha". */
  label: string;
  className?: string;
};

/**
 * Kicker de sección estilo manual: `01 — Texto` en Geist Mono.
 * Número en acento rojo, descriptor en gris (#8A8A8A funciona en claro y oscuro).
 * Server, presentacional.
 */
export function SectionHeader({
  number,
  label,
  className = "",
}: SectionHeaderProps) {
  return (
    <p className={`font-mono text-sectionnum uppercase ${className}`}>
      <span className="text-accent">{number}</span>
      <span aria-hidden className="mx-2 text-label">
        —
      </span>
      <span className="text-label">{label}</span>
    </p>
  );
}
