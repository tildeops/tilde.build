"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { RevealLines } from "@/components/motion/reveal-lines";
import { FadeUp } from "@/components/motion/fade-up";
import { CountUp } from "@/components/motion/count-up";

export function About() {
  const statsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const grid = statsRef.current;
      if (!grid) return;
      const tiles = Array.from(grid.querySelectorAll<HTMLElement>("[data-stat]"));
      if (!tiles.length) return;
      gsap.set(tiles, { opacity: 0, y: 22 });
      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "editorial",
            stagger: 0.12,
          });
        },
      });
      return () => st.kill();
    },
    { scope: statsRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <SectionFrame id="about">
      <div className="grid gap-10 md:grid-cols-12 md:gap-16 items-start">
        <div className="md:col-span-5">
          <Eyebrow shimmer>~ About tilde</Eyebrow>
          <RevealLines
            as="h2"
            className="mt-5 font-display font-medium leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.6vw,3.5rem)]"
          >
            A small team{" "}
            <span className="italic text-ink-muted">that ships.</span>
          </RevealLines>
        </div>

        <div className="md:col-span-7">
          <FadeUp as="p" className="text-lg md:text-xl text-ink leading-relaxed">
            tilde is two senior engineers, one designer, and a few sharp interns
            who actually ship. No project managers, no account executives — you
            talk directly to the people writing your code.
          </FadeUp>
          <FadeUp
            as="p"
            delay={0.12}
            className="mt-5 text-base text-ink-muted leading-relaxed"
          >
            Small enough to move fast, experienced enough not to break things.
            We&apos;ve spent years inside Shopify, Next.js, and ad-platform
            internals — so when something inevitably gets weird, we know where
            to look.
          </FadeUp>

          <div
            ref={statsRef}
            className="mt-10 grid grid-cols-3 gap-4"
          >
            <Stat label="Senior engineers" value="2" />
            <Stat label="Designer" value="1" />
            <Stat label="Sharp interns" value="∞" />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const numeric = Number(value);
  const isNumber = Number.isFinite(numeric);
  return (
    <div data-stat className="border-t border-rule pt-4">
      <p className="font-display text-4xl md:text-5xl font-medium tracking-tight text-ink">
        {isNumber ? <CountUp to={numeric} duration={1.1} /> : value}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </p>
    </div>
  );
}
