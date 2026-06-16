type SectionHeaderProps = {
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
  label,
  className = "",
}: SectionHeaderProps) {
  return (
    <p className={`font-mono text-sectionnum uppercase ${className}`}>
      <span className="text-label">{label}</span>
    </p>
  );
}
