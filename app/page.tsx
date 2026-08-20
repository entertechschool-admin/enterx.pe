import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatBand } from "@/components/sections/StatBand";
import { Timeline } from "@/components/sections/Timeline";
import { ValueProps } from "@/components/sections/ValueProps";
import { Products } from "@/components/sections/Products";
import { Partners } from "@/components/sections/Partners";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <StatBand />
        <Timeline />
        <ValueProps />
        <Products />
        <Partners />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
