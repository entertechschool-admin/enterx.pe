import { hero, clients } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { ClientMarquee } from "@/components/ui/ClientMarquee";

/** Portada: el contenido permanece en servidor; HeroVideo es la isla visual. */
export function Hero() {
  return (
    <section id="top" className="bg-ink px-3 pt-3 md:px-4 md:pt-4">
      <div className="relative flex min-h-[82vh] flex-col items-center justify-center overflow-hidden rounded-[24px] bg-black text-surface md:rounded-[32px]">
        <HeroVideo>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(13,13,13,0.78),rgba(13,13,13,0.62))] md:hidden" />
          <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(13,13,13,0.86)_0%,rgba(13,13,13,0.55)_30%,rgba(13,13,13,0.08)_58%,rgba(13,13,13,0)_78%)] md:block" />
        </HeroVideo>

        <Container className="relative z-10 flex w-full flex-col items-start px-6 py-24 text-left">
          <p className="mb-8 inline-flex items-center gap-2.5 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-[12px] text-surface/85">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {hero.availability}
          </p>
          <h1 className="max-w-xl text-balance text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-accent" : undefined}>{part.text}</span>
            ))}
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">{hero.subhead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {hero.ctas.map((cta) => (
              <WhatsAppButton key={cta.label} label={cta.label} variant={cta.variant} message={cta.message} ariaLabel={cta.ariaLabel} hideIcon />
            ))}
          </div>
        </Container>
      </div>

      <div id="clientes" className="mt-3 scroll-mt-24 overflow-hidden rounded-[24px] border border-white/[0.06] bg-ink-800 py-8 md:mt-4 md:rounded-[32px] md:py-10">
        <Container>
          <p className="text-center font-mono text-[11px] uppercase tracking-label text-label">{clients.trustedLabel}</p>
        </Container>
        <div className="mt-10 md:mt-12"><ClientMarquee items={clients.items} /></div>
      </div>
    </section>
  );
}
