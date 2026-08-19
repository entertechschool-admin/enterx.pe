import Image from "next/image";
import { statBand } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./MotionNarrative.module.css";

/** Banda server-side: la estadística se entiende completa sin el recurso visual. */
export function StatBand() {
  const { journey } = statBand;

  return (
    <section aria-labelledby="stat-band-title" className="bg-ink text-surface">
      <Container className="py-10 md:py-14">
        <Reveal animateSelf={false}>
          <div className={`${styles.statCard} relative overflow-hidden rounded-card-lg border border-white/10 bg-ink-800 px-6 py-8 md:px-10 md:py-9`}>
            <div className="relative">
              <div className={styles.statCopy}>
                <p className="font-mono text-[11px] uppercase tracking-label text-label">
                  {statBand.attribution}
                </p>
                <h2 id="stat-band-title" className="mt-4 max-w-md text-[clamp(24px,3vw,38px)] font-medium leading-tight tracking-[-0.03em]">
                  {statBand.statement}
                </h2>
              </div>

              <p className="sr-only">
                {statBand.statement}. {statBand.metric} {statBand.metricLabel}.
              </p>

              <div aria-hidden className={styles.statJourney}>
                <div className={styles.dotField}>
                  {Array.from({ length: 17 }, (_, index) => (
                    <span key={index} className={styles.sourceDot} />
                  ))}
                </div>

                <div className={styles.journeyStage}>
                  <span className={styles.journeyCode}>N1</span>
                  <span className={styles.journeyName}>{journey.n1}</span>
                </div>

                <span className={`${styles.journeyConnector} ${styles.connectorOne}`} />

                <div className={`${styles.journeyStage} ${styles.stageTwo}`}>
                  <span className={styles.journeyCode}>N2</span>
                  <span className={styles.journeyName}>{journey.n2}</span>
                </div>

                <span className={`${styles.journeyConnector} ${styles.connectorTwo}`} />

                <div className={styles.journeyGap}>
                  <span className={styles.gapLabel}>{journey.gap}</span>
                  <span className={styles.gapCriterion}>{journey.criterion}</span>
                  <span className={styles.stalledTrail} />
                </div>

                <div className={styles.journeyTarget}>
                  <span className={styles.targetRing} />
                  <span className={styles.redCrossingDot} />
                  <Image
                    src="/ball_red.png"
                    alt=""
                    aria-hidden
                    width={28}
                    height={28}
                    className={styles.targetBall}
                  />
                  <span className={styles.targetLabel}>
                    <span className={styles.journeyCode}>N3</span>
                    <span className={styles.journeyName}>{journey.n3}</span>
                  </span>
                  <span className={styles.metricNote}>
                    {statBand.metric} {statBand.metricLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
