import { OrganizationLd, ServiceLd, FAQLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { Offerings } from "@/components/sections/offerings";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <OrganizationLd />
      <ServiceLd />
      <FAQLd />
      <Hero />
      <PainPoints />
      <Offerings />
      <Pricing />
      <Process />
      <TechStack />
      <Testimonials />
      <About />
      <FAQ />
      <FinalCTA />
    </>
  );
}
