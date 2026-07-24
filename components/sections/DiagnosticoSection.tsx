import { diagnostico } from "@/lib/content";
import { openSauceSans } from "@/components/diagnostico/font";
import "@/components/diagnostico/diagnostico.css";
import Diagnostico from "@/components/diagnostico/Diagnostico";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

/**
 * El diagnóstico interactivo, incrustado en el home (no una página aparte —
 * pedido de Ariana, 21-07-2026: "que no salgan de la web"). Va antes del cierre.
 *
 * Desktop: dos columnas 30/70 — título a la izquierda (en Geist, fuera de
 * `.diag-root`, para combinar con las demás secciones) y la card centrada a la
 * derecha. En móvil se apilan.
 *
 * Sin luz roja de fondo (Ariana, 21-07-2026): la clase `diag-embedded` apaga el
 * brillo interno del widget (`.bg-fixed`) y no hay ambiente de sección. La
 * página independiente (app/diagnostico) conserva su brillo.
 *
 * bg-ink (#0D0D0D) = mismo negro que el `--bg` del widget → un solo lienzo.
 */
export function DiagnosticoSection() {
  return (
    <section
      id="diagnostico"
      className={`diag-embedded ${openSauceSans.variable} bg-ink text-surface`}
    >
      <Container className="py-16 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-[3fr_7fr] md:gap-12">
          <Reveal>
            <SectionHeader label={diagnostico.label} />
            <SectionTitle
              parts={diagnostico.titleParts}
              className="mt-4 max-w-md"
            />
          </Reveal>

          {/* Diagnostico va DIRECTO como hijo de la rejilla (se estira al ancho
              de la columna). NO envolver en `flex justify-center`: eso lo
              convertía en flex-item que se encoge a su contenido y colapsaba el
              ancho de la card (`width:100%` sin referencia) — la dejaba
              inusable, sobre todo en móvil. El propio `.diag-root` ya centra la
              card con align-items:center. */}
          <Diagnostico secondaryCta="email" />
        </div>
      </Container>
    </section>
  );
}
