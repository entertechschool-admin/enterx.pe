import { hero } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Parallax } from "@/components/ui/Parallax";
import { HeroLogoVideo } from "@/components/ui/HeroLogoVideo";

/**
 * Hero — fondo oscuro #0D0D0D. Tipografía protagonista (H1 oversized con
 * "Menos del 5%" en rojo) + isótopo grande a la derecha con glow rojo radial.
 * Server Component. El texto NO se anima (es el LCP — debe pintar de inmediato);
 * el isótopo lleva parallax sutil y se forma una vez en video con canal alfa
 * (HEVC .mov para Safari / VP9 .webm para el resto), con PNG de fallback.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-black text-surface bg-hero-stage-mobile md:bg-hero-stage"
    >
      <Container className="relative grid items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:py-24 lg:py-28">
        {/* Columna de texto */}
        <div className="order-2 md:order-1">

          <h1 className="mt-6 text-balance text-[clamp(34px,4vw,44px)] font-semibold leading-[1.01] tracking-[-0.03em]">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-accent" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-lg text-lead text-white/70">
            {hero.subhead}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <WhatsAppButton
              label={hero.ctaLabel}
              variant="primary"
              ariaLabel="Conversemos por WhatsApp"
            />
            <span className="font-mono text-[12px] uppercase tracking-wide text-label">
              {hero.footnote.join(" · ")}
            </span>
          </div>
        </div>

        {/* Isótopo — protagonista visual a la derecha (desktop), con parallax sutil. */}
        <div className="relative order-1 flex justify-center md:order-2 md:justify-end">
          <Parallax strength={28} className="relative">
            {/* Escenario negro tras el isótopo: hunde la zona del clip a negro
                puro para que el ruido de compresión del video (visible sobre
                rojo) desaparezca. Va DENTRO del wrapper del isótopo para
                centrarse exactamente en el clip; se extiende un 18% más allá
                para que el borde del gradiente no coincida con el del video.
                Decorativo, pintado antes que el isótopo → queda detrás. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-[18%] bg-stage-black"
            />
            <HeroLogoVideo
              stillSrc="/iso_enterx.png"
              webmSrc="/enterx_motion_original.webm"
              hevcSrc="/enterx_motion_original.mov"
              alt="Isótopo de EnterX: una constelación de esferas donde el punto rojo marca dónde empieza el valor real."
              width={432}
              height={462}
              sizes="(max-width: 768px) 70vw, 42vw"
              // El drop-shadow rojo lo aplica el propio componente por fase:
              // mantenerlo aquí re-rasterizaría el blur en cada frame del video.
              // Anchos en vw (no %): el wrapper vive en una cadena flex
              // shrink-to-fit donde `w-full` colapsa al ancho natural del img.
              className="w-[70vw] max-w-[360px] md:w-[18vw] md:max-w-[432px]"
            />
          </Parallax>
        </div>
      </Container>
    </section>
  );
}
