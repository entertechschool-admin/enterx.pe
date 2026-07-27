import localFont from "next/font/local";

/**
 * Tipografía propia del Diagnóstico (Open Sauce Sans), aislada del resto del
 * sitio (que usa Geist). Se usa tanto en la página sola (app/diagnostico)
 * como en la versión incrustada en el home (components/sections/DiagnosticoSection).
 */
export const openSauceSans = localFont({
  src: [
    { path: "./fonts/OpenSauceSans-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/OpenSauceSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/OpenSauceSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/OpenSauceSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/OpenSauceSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/OpenSauceSans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/OpenSauceSans-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-open-sauce",
  display: "swap",
});
