import { footer } from "@/lib/content";
import { Container } from "@/components/ui/Container";

/**
 * Footer minimal sobre fondo oscuro: línea principal + respaldo institucional.
 * Sin navegación pesada. Server Component.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-surface">
      <Container className="flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
        <p className="font-mono text-[12px] uppercase tracking-wide text-white/55">
          {footer.primary}
        </p>
        <p className="font-mono text-[12px] uppercase tracking-wide text-label">
          {footer.backing}
        </p>
      </Container>
    </footer>
  );
}
