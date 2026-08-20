import Image from "next/image";
import { products, type ProductKind } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Products.module.css";

/** Catálogo editorial de productos. Server Component: las escenas viven en CSS. */
export function Products() {
  const [luna, operations, sales] = products.items;

  return (
    <section id="productos" className="bg-ink text-surface">
      <Container className="py-20 md:py-section">
        <SectionHeader label={products.label} />
        <h2 className="mt-6 max-w-2xl text-h2 text-balance">{products.title}</h2>

        <div className="mt-12 grid gap-5 md:mt-14">
          <ProductCard product={luna} featured />

          <div className="grid gap-5 md:grid-cols-2">
            <ProductCard product={operations} />
            <ProductCard product={sales} />
          </div>
        </div>
      </Container>
    </section>
  );
}

type ProductCardProps = {
  product: (typeof products.items)[number];
  featured?: boolean;
};

function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <article className={`${styles.card} ${featured ? styles.featuredCard : ""}`}>
      <div className={styles.copy}>
        <div className={styles.meta}>
          {"label" in product ? <span className={styles.ownLabel}>{product.label}</span> : null}
          {"partner" in product ? (
            <Image
              src={product.partner.logo}
              alt={product.partner.name}
              width={product.partner.width}
              height={product.partner.height}
              sizes="150px"
              className={styles.partnerLogo}
            />
          ) : null}
        </div>

        <h3 className="text-h3">{product.name}</h3>
        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-surface/65">
          {product.description}
        </p>
      </div>

      <ProductScene kind={product.kind} />
    </article>
  );
}

function ProductScene({ kind }: { kind: ProductKind }) {
  if (kind === "luna") {
    return (
      <div aria-hidden className={`${styles.scene} ${styles.lunaScene}`}>
        <div className={styles.lunaSources}>
          {products.scenes.luna.slice(0, 2).map((label) => (
            <span key={label} className={styles.sourceChip}>{label}</span>
          ))}
        </div>
        <span className={styles.lunaRoute} />
        <span className={styles.lunaSignal} />
        <div className={styles.lunaCore}>
          <span className={styles.coreDot} />
        </div>
        <div className={styles.teamField}>
          <span />
          <span />
          <span />
          <span />
          <small>{products.scenes.luna[2]}</small>
        </div>
      </div>
    );
  }

  if (kind === "operations") {
    return (
      <div aria-hidden className={`${styles.scene} ${styles.operationsScene}`}>
        <span className={styles.operationsRoute} />
        {products.scenes.operations.map((label) => (
          <span key={label} className={styles.operationNode}>{label}</span>
        ))}
        <span className={styles.operationsSignal} />
      </div>
    );
  }

  return (
    <div aria-hidden className={`${styles.scene} ${styles.salesScene}`}>
      <span className={styles.salesRoute} />
      {products.scenes.sales.map((label, index) => (
        <span key={label} className={styles.salesStep}>
          <i>{index + 1}</i>
          {label}
        </span>
      ))}
      <span className={styles.salesSignal} />
      <span className={styles.salesBubble} />
    </div>
  );
}
