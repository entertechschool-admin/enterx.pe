import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollJourney } from "@/components/ui/ScrollJourney";
import { Hero } from "@/components/sections/Hero";
import { StatBand } from "@/components/sections/StatBand";
import { Timeline } from "@/components/sections/Timeline";
import { ValueProps } from "@/components/sections/ValueProps";
import { Products } from "@/components/sections/Products";
import { Partners } from "@/components/sections/Partners";
import { DiagnosticoSection } from "@/components/sections/DiagnosticoSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollJourney />
      <main>
        <Hero />
        <StatBand />
        <Timeline />
        <ValueProps />
        <Products />
        <Partners />
        <DiagnosticoSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
