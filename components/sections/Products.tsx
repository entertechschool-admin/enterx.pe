import { products } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ProductsCarousel } from "@/components/ui/ProductsCarousel";

/**
 * Sección "Productos" — carrusel: un producto a la vez, avanza solo al
 * siguiente en bucle, con flechas y puntos. Server Component; solo el carrusel
 * (con su temporizador e índice) cruza al cliente.
 *
 * Fondo oscuro (#0D0D0D). Servicios, justo encima, se queda en claro: es el
 * respiro de la página, y SPEC.md §Sección 3 lo exige explícitamente.
 */
export function Products() {
  return (
    <section id="productos" className="bg-ink text-surface">
      <Container className="pt-20 pb-12 md:pb-14 md:pt-section">
        <Reveal>
          <SectionHeader label={products.label} />
          <SectionTitle parts={products.titleParts} className="mt-6 max-w-2xl" />
        </Reveal>

        <Reveal>
          <ProductsCarousel />
        </Reveal>
      </Container>
    </section>
  );
}
