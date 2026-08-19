import Image from "next/image";
import type { ReactNode } from "react";
import { HeroAmbientController } from "@/components/ui/HeroAmbientController";
import styles from "./HeroAmbient.module.css";

export function HeroAmbient({ children }: { children?: ReactNode }) {
  return (
    <HeroAmbientController>
      <div className={styles.scene}>
        <div className={styles.lightStage} aria-hidden="true">
          <div className={`${styles.lightLayer} ${styles.primaryBand}`} />
          <div className={`${styles.lightLayer} ${styles.secondaryBand}`} />
          <div className={`${styles.lightLayer} ${styles.bloom}`} />
        </div>
        <div className={styles.person} aria-hidden="true">
          <Image
            src="/hero-person.png"
            alt=""
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 768px) 105vw, 58vw"
            className={styles.personImage}
          />
        </div>
        {children}
      </div>
    </HeroAmbientController>
  );
}
