import { ServiceLd, FAQLd } from "@/components/seo/json-ld";
import { TrackSection } from "@/components/analytics/track-section";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { ServicesBento } from "@/components/sections/services-bento";
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
      <TrackSection name="hero">
        <Hero />
      </TrackSection>
      <TrackSection name="pain-points">
        <PainPoints />
      </TrackSection>
      <Gap />
      <TrackSection name="services">
        <ServicesBento />
        <Gap />
        <ServicesShowcase />
      </TrackSection>
      <Gap />
      <TrackSection name="process">
        <Process />
      </TrackSection>
      <TrackSection name="pricing">
        <Pricing />
      </TrackSection>
      <TrackSection name="tech-stack">
        <TechStack />
      </TrackSection>
      <TrackSection name="testimonials">
        <Testimonials />
      </TrackSection>
      <TrackSection name="about">
        <About />
      </TrackSection>
      <TrackSection name="faq">
        <FAQ />
      </TrackSection>
      <TrackSection name="final-cta">
        <FinalCTA />
      </TrackSection>
    </div>
  );
}
