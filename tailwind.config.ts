import type { Config } from "tailwindcss";

/**
 * Sistema de diseño EnterX — derivado del brand book canónico
 * (brand/reference/manual-de-marca.html). Acento ÚNICO #D9281A sobre negro #0D0D0D.
 * Tipografía Geist + Geist Mono (vars inyectadas por el paquete `geist` en <html>).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Acento único — usar con moderación, nunca para rellenar.
        accent: {
          DEFAULT: "#D9281A",
          ink: "#B71F12", // variante para hover/estados sobre claro
        },
        // Negros / tinta
        ink: {
          DEFAULT: "#0D0D0D", // fondo oscuro base (hero, cierre)
          800: "#1A1A1A",
          600: "#3A3A3A",
        },
        // Superficies claras
        surface: {
          DEFAULT: "#FFFFFF",
          50: "#F7F7F7",
          100: "#EDEDED",
        },
        line: "#E6E6E6", // borde claro
        muted: "#6B6B6B", // gris texto secundario — SOLO sobre fondo claro
        // Gemelo de `muted` para fondo oscuro. `muted` (#6B6B6B) da 3.6:1 sobre
        // #0D0D0D y no llega al 4.5:1 de WCAG AA; este da 8.2:1 sobre #0D0D0D
        // y 7.3:1 sobre #1A1A1A. Al pasar una sección a oscuro hay que
        // cambiarlo — no basta con voltear el fondo.
        "muted-dark": "#A8A8A8",
        label: "#8A8A8A", // gris labels / mono descriptor — pasa en claro y oscuro
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Clamps exactos del manual.
        h1: [
          "clamp(40px, 6.4vw, 86px)",
          { lineHeight: "1.0", letterSpacing: "-0.035em", fontWeight: "300" },
        ],
        h2: [
          "clamp(30px, 4vw, 52px)",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "300" },
        ],
        h3: [
          "clamp(24px, 2.6vw, 34px)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "300" },
        ],
        lead: [
          "clamp(18px, 2vw, 22px)",
          { lineHeight: "1.55", letterSpacing: "-0.01em" },
        ],
        kicker: ["12px", { letterSpacing: "0.22em", lineHeight: "1" }],
        sectionnum: ["13px", { letterSpacing: "0.12em", lineHeight: "1" }],
        label: ["11px", { letterSpacing: "0.16em", lineHeight: "1" }],
      },
      letterSpacing: {
        kicker: "0.22em",
        label: "0.16em",
        num: "0.12em",
        wide: "0.06em",
      },
      maxWidth: {
        container: "1120px",
      },
      spacing: {
        nav: "62px",
        section: "120px",
        "section-x": "56px",
      },
      borderRadius: {
        card: "14px",
        "card-lg": "18px",
        pill: "100px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(13,13,13,0.04)",
        accent: "0 24px 60px rgba(217,40,26,0.16)",
        "accent-sm": "0 16px 36px rgba(217,40,26,0.22)",
        "accent-glow":
          "0 0 0 6px rgba(217,40,26,0.18), 0 0 30px rgba(217,40,26,0.50)",
      },
      backgroundImage: {
        // Fondo del Hero — desktop: guinda a la izquierda (tras el texto) → negro
        // puro a la derecha (tras el isótopo). Radial anclado al borde izq. para
        // el "glow" cálido de la referencia; a 64% ya es #000, así la columna del
        // isótopo (der.) queda negra total y el fondo #000 del video no deja
        // costura en el borde del clip.
        "hero-stage":
          "radial-gradient(85% 125% at 8% 52%, #3a130d 0%, #1e0a08 32%, #000 64%)",
        // Fondo del Hero — mobile: negro puro arriba (isótopo, order-1) → guinda
        // abajo (columna de texto). Glow anclado al centro-inferior.
        "hero-stage-mobile":
          "radial-gradient(120% 78% at 50% 100%, #3a130d 0%, #1e0a08 34%, #000 68%)",
        // Fondo del Hero centrado — para la variante SIN isótopo. Los dos de
        // arriba anclan el glow a un lado porque la otra mitad la ocupaba el
        // clip y tenía que ser negro puro; sin clip, el glow va detrás del
        // texto. Blanco sobre el guinda #3a130d da 16:1, de sobra.
        //
        // El centro sale de dos variables que HeroStage mueve con el puntero.
        // Los valores por defecto (50%/58%) son los que ve quien no tiene ratón,
        // quien pidió reducir movimiento y quien no ejecuta JS — el fondo se
        // pinta bien sin que nada corra.
        "hero-stage-center":
          "radial-gradient(105% 105% at var(--hero-x, 50%) var(--hero-y, 58%), #3a130d 0%, #1e0a08 34%, #000 72%)",
        "ambient-red-bl":
          "radial-gradient(50% 50% at 18% 92%, rgba(217,40,26,0.10), transparent 70%)",
        "ambient-red-center":
          "radial-gradient(55% 55% at 50% 45%, rgba(217,40,26,0.16), transparent 70%)",
        // Escenario negro tras el isótopo: hunde la zona del clip a negro puro
        // para que el ruido de compresión del video (visible sobre rojo)
        // desaparezca. El borde transparente cae más allá del clip para no
        // coincidir nunca con el borde del video.
        "stage-black":
          "radial-gradient(60% 55% at 50% 45%, #000 0%, #000 35%, transparent 75%)",
      },
      backdropBlur: {
        nav: "14px",
      },
      keyframes: {
        reveal: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // La sombra roja del isótopo se enciende una sola vez al asentarse el
        // logo (reemplaza el antiguo "bloom" que reintroducía rojo tras el
        // cuerpo). Solo corre en "settled", con el frame ya congelado.
        "settle-shadow": {
          from: { filter: "drop-shadow(0 30px 80px rgba(217,40,26,0))" },
          to: { filter: "drop-shadow(0 30px 80px rgba(217,40,26,0.18))" },
        },
        // Cinta de logos de clientes. La pista lleva la lista DUPLICADA, así
        // que a -50% el segundo juego cae exactamente donde empezaba el
        // primero y el bucle no tiene costura.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Flotación lenta del isótopo cromado del hero (HeroChrome). Sube y
        // baja apenas, para que el metal parezca suspendido y vivo sin robarle
        // la atención al titular. `alternate` lo hace ir y volver suave.
        "chrome-float": {
          from: { transform: "translateY(-1.5%) rotate(-1.2deg)" },
          to: { transform: "translateY(1.5%) rotate(1.2deg)" },
        },
        // Flotación muy sutil de las capturas de producto (ProductsAccordion):
        // apenas se elevan y bajan, para que no se sientan estáticas.
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        // Parpadeo para los puntos de "escribiendo…"/"analizando…" de las
        // animaciones ilustrativas de producto (ProductScene).
        blink: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        reveal: "reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "settle-shadow": "settle-shadow 0.9s ease-out forwards",
        marquee: "marquee 45s linear infinite",
        "chrome-float": "chrome-float 9s ease-in-out infinite alternate",
        "float-soft": "float-soft 6s ease-in-out infinite",
        blink: "blink 1.3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
