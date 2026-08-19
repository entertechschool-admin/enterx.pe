"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { TimelineIcon } from "@/components/icons/TimelineIcons";
import type { TimelineIconKey } from "@/lib/content";
import styles from "./MotionNarrative.module.css";

export type TimelineItem = {
  id: string;
  code: string;
  name: string;
  characteristic: string;
  icon: TimelineIconKey;
  target?: boolean;
};

export function TimelineInteractive({ levels }: { levels: TimelineItem[] }) {
  const defaultId = levels.find((level) => level.target)?.id ?? levels[0]?.id ?? "";
  const [activeId, setActiveId] = useState(defaultId);

  const handleClick = (id: string) => {
    if (window.matchMedia("(hover: hover)").matches) {
      setActiveId(id);
      return;
    }
    setActiveId((current) => (current === id ? "" : id));
  };

  return (
    <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-0">
      <span
        aria-hidden
        className={`${styles.timelineConnector} pointer-events-none absolute left-[10px] top-2 h-[calc(100%-1rem)] w-px bg-accent/65 md:left-0 md:top-[10px] md:h-px md:w-full`}
      />

      {levels.map((level) => {
        const isOpen = activeId === level.id;
        const panelId = `timeline-panel-${level.id}`;
        const buttonId = `timeline-node-${level.id}`;

        return (
          <li key={level.id} className={`${styles.timelineNode} relative pl-8 md:px-3 md:pl-3`}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleClick(level.id)}
              onMouseEnter={() => {
                if (window.matchMedia("(hover: hover)").matches) {
                  setActiveId(level.id);
                }
              }}
              onFocus={() => setActiveId(level.id)}
              className={`${styles.nodeButton} ${isOpen ? styles.activeNode : ""} group block min-h-11 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink`}
            >
              {level.target ? (
                <span aria-hidden className="absolute left-[-5px] top-[-4px] z-10 md:left-1 md:top-[-6px]">
                  <span className={styles.targetPulse} />
                  <span className="absolute inset-0 rounded-full bg-accent/30 blur-md" />
                  <Image
                    src="/ball_red.png"
                    alt=""
                    width={30}
                    height={30}
                    className="relative drop-shadow-[0_2px_10px_rgba(217,40,26,0.45)] contrast-150"
                  />
                </span>
              ) : (
                <span aria-hidden className="absolute left-0 top-1 z-10 flex size-5 items-center justify-center rounded-full border border-white/30 bg-ink md:left-3 md:top-0">
                  <span className="block size-1.5 rounded-full bg-label" />
                </span>
              )}

              <span className="flex items-center gap-2 md:mt-8">
                <span className={`font-mono text-sectionnum ${level.target ? "text-accent" : "text-label"}`}>
                  {level.code}
                </span>
                {level.target && (
                  <span className="rounded-pill bg-accent px-2 py-0.5 font-mono text-[9px] uppercase tracking-label text-white">
                    Objetivo
                  </span>
                )}
                <ChevronIcon className={`ml-auto text-white/45 transition-transform duration-300 motion-reduce:transition-none md:hidden ${isOpen ? "rotate-180" : ""}`} />
              </span>

              <span className="mt-3 flex items-center gap-2">
                <span className="text-[17px] font-semibold leading-snug text-white">
                  {level.name}
                </span>
              </span>
            </button>

            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={buttonId} className={`${styles.panelEnter} mt-4 flex items-start gap-3`}>
                <span className={level.target ? "text-accent" : "text-white/45"}>
                  <TimelineIcon name={level.icon} />
                </span>
                <p className="text-[14px] leading-relaxed text-white/65">{level.characteristic}</p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
