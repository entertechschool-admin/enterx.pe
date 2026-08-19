"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import styles from "./HeroAmbient.module.css";

type MotionState = "running" | "paused";

export function HeroAmbientController({ children }: { children: ReactNode }) {
  const [userPaused, setUserPaused] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    updateMotionPreference();

    const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    updateVisibility();
    media.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    const scene = document.querySelector<HTMLElement>(`.${styles.scene}`);
    const observer = scene
      ? new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), { threshold: 0.15 })
      : null;
    if (scene && observer) observer.observe(scene);

    return () => {
      media.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  const motionState: MotionState =
    !userPaused && inViewport && documentVisible && !reducedMotion ? "running" : "paused";

  return (
    <div
      className={styles.controller}
      data-motion={motionState}
      data-motion-reduced={reducedMotion ? "true" : "false"}
    >
      {children}
      <button
        type="button"
        className={styles.control}
        hidden={reducedMotion}
        onClick={() => setUserPaused((paused) => !paused)}
        aria-label={userPaused ? "Reanudar ambiente del hero" : "Pausar ambiente del hero"}
      >
        {userPaused ? "▶" : "Ⅱ"}
      </button>
    </div>
  );
}
