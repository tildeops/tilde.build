import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { Offerings } from "@/components/sections/Offerings";
import { Collaboration } from "@/components/sections/Collaboration";
import { Pricing } from "@/components/sections/Pricing";
import { Team } from "@/components/sections/Team";
import { FocusSpeciality } from "@/components/sections/FocusSpeciality";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Offerings />
        <Collaboration />
        <Pricing />
        <Team />
        <FocusSpeciality />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
