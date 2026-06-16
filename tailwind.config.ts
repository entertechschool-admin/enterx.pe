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
        muted: "#6B6B6B", // gris texto secundario
        label: "#8A8A8A", // gris labels / mono descriptor
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Clamps exactos del manual.
        h1: [
          "clamp(40px, 6.4vw, 86px)",
          { lineHeight: "1.0", letterSpacing: "-0.035em", fontWeight: "600" },
        ],
        h2: [
          "clamp(30px, 4vw, 52px)",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" },
        ],
        h3: [
          "clamp(24px, 2.6vw, 34px)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
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
        "ambient-red":
          "radial-gradient(60% 50% at 80% 30%, rgba(217,40,26,0.14), transparent 70%)",
        "ambient-red-bl":
          "radial-gradient(50% 50% at 18% 92%, rgba(217,40,26,0.10), transparent 70%)",
        "ambient-red-center":
          "radial-gradient(55% 55% at 50% 45%, rgba(217,40,26,0.16), transparent 70%)",
      },
      backdropBlur: {
        nav: "14px",
      },
      keyframes: {
        reveal: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        reveal: "reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
