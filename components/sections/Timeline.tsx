import { timeline, timelineNote } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineInteractive, type TimelineItem } from "@/components/sections/TimelineInteractive";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./MotionNarrative.module.css";

/**
 * Sección "La brecha" — 4 niveles de madurez en IA como nodos conectados en
 * línea (horizontal desktop / vertical mobile). N3 es el objetivo, en rojo.
 * El shell y el copy permanecen en servidor; la interacción vive en una isla
 * mínima que recibe únicamente los campos usados por los nodos.
 */
export function Timeline() {
  const levels: TimelineItem[] = timeline.map(({ id, code, name, characteristic, icon, target }) => ({
    id,
    code,
    name,
    characteristic,
    icon,
    target,
  }));

  return (
    <Reveal animateSelf={false}>
      <section id="la-brecha" className="bg-ink text-surface">
        <Container className="py-20 md:py-section">
          <div className={styles.timelineHeader}>
            <SectionHeader label="La brecha" />
            <h2 className="mt-6 max-w-2xl text-h2 text-white">
              De preguntarle a la IA a{" "}
              <span className="text-accent">delegarle el trabajo</span>.
            </h2>
            <p className="mt-5 max-w-xl text-lead text-white/65">{timelineNote}</p>
          </div>

          <TimelineInteractive levels={levels} />
        </Container>
      </section>
    </Reveal>
  );
}
