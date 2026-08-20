import Image from "next/image";
import { alliances } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Partners.module.css";

/** Alianzas públicas. Server Component: solo composición editorial estática. */
export function Partners() {
  return (
    <section id="alianzas" className="bg-ink text-surface">
      <Container className="py-20 md:py-28">
        <SectionHeader label={alliances.label} />
        <h2 className="mt-6 max-w-2xl text-h2 text-balance">{alliances.title}</h2>

        <div className={`${styles.panel} mt-12 md:mt-14`}>
          <div className={styles.technologies}>
            <p className={styles.groupLabel}>{alliances.technologiesLabel}</p>
            <ul className={styles.brandList}>
              {alliances.brands.map((brand) => (
                <li key={brand.name} className={styles.brand}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={brand.width}
                    height={brand.height}
                    sizes="(min-width: 768px) 220px, 180px"
                    className={styles.brandLogo}
                  />
                  <p className={styles.relationship}>{brand.relationship}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.organization}>
            <p className={styles.organizationIntro}>{alliances.organization.introduction}</p>
            <Image
              src={alliances.organization.logo}
              alt={alliances.organization.name}
              width={alliances.organization.width}
              height={alliances.organization.height}
              sizes="(min-width: 768px) 300px, 250px"
              className={styles.organizationLogo}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
