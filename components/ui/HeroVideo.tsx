"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type HeroVideoProps = { children?: ReactNode };

/** Poster en SSR; el video solo se monta si no hay reduced-motion. */
export function HeroVideo({ children }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setVideoEnabled(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <div className="absolute inset-0" aria-label="Video ambiental del hero">
      {videoEnabled ? (
        <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.png" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover">
          <source src="/background-home.mp4" type="video/mp4" />
        </video>
      ) : (
        <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-poster.png')" }} />
      )}
      {children}
      {videoEnabled && (
        <button type="button" onClick={togglePlayback} aria-label={paused ? "Reanudar video del hero" : "Pausar video del hero"} className="absolute bottom-4 right-4 z-10 flex min-h-11 min-w-11 items-center justify-center rounded-pill border border-white/30 bg-ink/70 px-3 text-xs text-white transition-colors hover:bg-ink focus-visible:outline-accent">
          {paused ? "▶" : "Ⅱ"}
        </button>
      )}
    </div>
  );
}
