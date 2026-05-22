"use client";

import { SectionFrame } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { BrokenAttribution } from "./broken-attribution";
import { DashboardMockup } from "./dashboard-mockup";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
      <span
        className="size-1.5 rounded-full bg-accent"
        style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
      />
      <span className="text-[12px] font-medium text-ink-muted">{children}</span>
    </div>
  );
}

export function AttributionDashboard() {
  return (
    <SectionFrame id="attribution">
      {/* Top: the problem */}
      <div className="text-center">
        <FadeUp>
          <Chip>The attribution problem</Chip>
        </FadeUp>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-extrabold leading-[0.98] tracking-[-0.04em] text-ink text-[clamp(2rem,4.6vw,3.4rem)]"
        >
          Headless attribution is broken everywhere.
        </RevealLines>
        <FadeUp delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-base text-ink-muted leading-relaxed">
            Pixels lose 40% of events. GA4 only sees what consents. Shopify
            counts a different way again. You stop trusting any of them — and
            start guessing.
          </p>
        </FadeUp>
      </div>

      {/* Three platforms disagreeing */}
      <div className="mt-12">
        <BrokenAttribution />
      </div>

      {/* Bridge headline */}
      <div className="mt-24 text-center">
        <FadeUp>
          <Chip>One source of truth</Chip>
        </FadeUp>
        <RevealLines
          as="h3"
          className="mx-auto mt-5 max-w-3xl font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(1.7rem,3.8vw,2.6rem)]"
        >
          So we built one dashboard that agrees with itself.
        </RevealLines>
      </div>

      {/* Dashboard mockup */}
      <div className="mt-10">
        <DashboardMockup />
      </div>
    </SectionFrame>
  );
}
