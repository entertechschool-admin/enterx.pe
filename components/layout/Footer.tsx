import { footer } from "@/lib/content";
import { SOCIAL } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/icons/SocialIcons";

/**
 * Footer minimal sobre fondo oscuro: línea principal + redes.
 * Sin navegación pesada. Server Component.
 *
 * La línea de respaldo institucional se retiró — el porqué y lo que implica
 * están documentados en lib/content.ts, sobre `footer`.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-surface">
      <Container className="flex flex-col items-start gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="font-mono text-[12px] uppercase tracking-wide text-white/55">
          {footer.primary}
        </p>

        {/* Objetivo táctil de 40px (≥24px de WCAG 2.5.8), aunque el glifo mida
            18px. El -mr-2.5 recupera el aire que añade ese área de toque para
            que el último icono quede ópticamente a ras del margen. */}
        <ul className="-mr-2.5 flex items-center">
          {SOCIAL.map((social) => (
            <li key={social.key}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`EnterX en ${social.name}`}
                className="
                  flex h-10 w-10 items-center justify-center rounded-pill
                  text-white/55 transition-colors duration-200 hover:text-white
                "
              >
                <SocialIcon name={social.key} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
