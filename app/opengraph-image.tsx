import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// OG image 1200×630 — minimal: fondo #0D0D0D, isótopo + wordmark + tagline corta.
export const runtime = "nodejs";
export const alt = "EnterX — IA aplicada para empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // El isótopo se incrusta como data URI (ImageResponse no usa next/image).
  const isoData = await readFile(
    join(process.cwd(), "public", "iso_enterx.png"),
  );
  const isoSrc = `data:image/png;base64,${isoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0D0D",
          // Glow rojo ambiente, muy tenue.
          backgroundImage:
            "radial-gradient(60% 55% at 50% 42%, rgba(217,40,26,0.16), transparent 70%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={isoSrc}
          alt=""
          width={250}
          height={268}
          style={{
            filter: "drop-shadow(0 24px 60px rgba(217,40,26,0.30))",
          }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
          }}
        >
          EnterX
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 30,
            letterSpacing: "0.02em",
            color: "#8A8A8A",
          }}
        >
          IA aplicada para empresas
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D9281A",
          }}
        >
          enterx.pe
        </div>
      </div>
    ),
    { ...size },
  );
}
