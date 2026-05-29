import { ServiceLd, FAQLd } from "@/components/seo/json-ld";
import { NotchNav } from "@/components/sections/shopify-headless/notch-nav";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

/** Uniform spacer between pinned-and-sticky sections. */
const Gap = () => <div aria-hidden className="h-8 w-full md:h-20 lg:h-24" />;

export default function Home() {
  return (
    <div data-page-theme="bridge">
      <ServiceLd />
      <FAQLd />
      <NotchNav />
      <Hero />
      <PainPoints />
      <Gap />
      <ServicesShowcase />
      <Gap />
      <Process />
      <Pricing />
      <TechStack />
      <Testimonials />
      <About />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
