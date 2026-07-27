import Image from "next/image";
import { partners } from "@/lib/content";
import { EMAIL } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import type { Partner } from "@/lib/content";

/**
 * Sección "Alianzas" — tarjetas blancas centradas sobre el negro.
 * Server Component.
 *
 * Fondo `ink` (#0D0D0D): las tarjetas blancas son los paneles claros que
 * puntean la página oscura, igual que la tarjeta de Clientes.
 *
 * Cada logo lleva su ROL debajo, y no es decorativo: hay DOS tipos de alianza
 * aquí y no significan lo mismo. PathPilot y Sprinta son partners de
 * tecnología (EnterX construye sobre su producto). Enter Tech School es la
 * matriz de EnterX y figura por su respaldo académico a los certificados —
 * NO es un proveedor. Sin el rol, un visitante los leería a los tres igual.
 *
 * Logos en negro (`logoInk`) porque la tarjeta es blanca. Los originales de
 * PathPilot/Sprinta traen verde (#01EF88), fuera de la paleta; el monocromo lo
 * corrige y empareja marcas de origen distinto. Originales en brand/assets/.
 */
export function Partners() {
  return (
    <section id="alianzas" className="bg-ink text-surface">
      <Container className="pb-20 pt-10 md:pb-24 md:pt-12">
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeader label={partners.label} />
          <SectionTitle parts={partners.titleParts} className="mx-auto mt-4" />
        </Reveal>

        <Reveal>
          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {partners.items.map((partner) => (
              <li key={partner.key}>
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Invitación a nuevos partners → abre el correo. Contorno (ghost) para
            no competir con el CTA rojo del cierre; es una invitación, no el CTA
            principal. */}
        <Reveal className="mt-10 flex justify-center">
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(partners.joinSubject)}`}
            className="
              inline-flex items-center gap-2 rounded-pill border border-white/20
              px-6 py-3 text-[14px] text-surface transition-colors duration-200
              hover:border-white/45 hover:bg-white/5
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-accent
            "
          >
            {partners.joinLabel}
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div
      className="
        flex h-full flex-col items-center justify-center gap-4 rounded-card-lg
        bg-surface px-6 py-10 text-center
      "
    >
      {/* Caja de alto fijo: los tres logos tienen proporciones muy distintas
          (Enter Tech School es larguísimo), y encajarlos en el mismo alto los
          equilibra ópticamente en vez de que uno domine. */}
      <div className="flex h-8 items-center justify-center">
        <Image
          src={partner.logoInk}
          alt={partner.name}
          width={partner.width}
          height={partner.height}
          sizes="240px"
          className="max-h-8 w-auto object-contain"
        />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-label text-label">
        {partner.role}
      </p>
    </div>
  );
}
