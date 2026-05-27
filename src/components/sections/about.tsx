"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame } from "@/components/layout/section-frame";
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
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
              <span
                className="size-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
              />
              <span className="text-[12px] font-medium text-ink-muted">
                About tilde
              </span>
            </div>
          </FadeUp>
          <RevealLines
            as="h2"
            className="mt-5 font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(2rem,4.6vw,3.4rem)]"
          >
            A small team{" "}
            <span className="italic">that ships.</span>
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
            We&apos;ve spent years deep inside Shopify, Next.js, native mobile,
            and the WhatsApp + Telegram Business APIs — so when something
            inevitably gets weird, we know where to look.
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
