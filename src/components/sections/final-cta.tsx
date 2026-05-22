"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealLines } from "@/components/motion/reveal-lines";
import { LiquidBackground } from "@/components/effects/liquid-background";

export function FinalCTA() {
  const blockRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const block = blockRef.current;
      if (!block) return;
      gsap.set(block, { opacity: 0, scale: 0.96, y: 28 });
      const st = ScrollTrigger.create({
        trigger: block,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(block, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.1,
            ease: "editorial",
          });
        },
      });
      return () => st.kill();
    },
    { scope: blockRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-16 md:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div
          ref={blockRef}
          className="relative isolate overflow-hidden rounded-2xl bg-accent text-on-accent"
        >
          {/* WebGL liquid paint background */}
          <LiquidBackground
            animated
            className="absolute inset-0 -z-10"
          />

          {/* Film-grain noise overlay for "glittery" texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-accent/80">
                ~ Ready when you are
              </p>
              <RevealLines
                as="h2"
                duration={1.15}
                stagger={0.09}
                yPercent={130}
                className="mt-5 font-display font-medium leading-[1.04] tracking-[-0.02em] text-[clamp(2.25rem,5vw,4.25rem)]"
              >
                Ready to give your Shopify store a{" "}
                <span className="italic">real identity?</span>
              </RevealLines>
              <p className="mt-5 text-base md:text-lg text-on-accent/85 max-w-xl leading-relaxed">
                30-minute discovery call, no commitment. We&apos;ll tell you
                honestly whether headless is right for you.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" variant="invert" className="gloss-inset group/cta">
                  <Link href="/contact">
                    Book a discovery call{" "}
                    <ArrowUpRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-on-accent hover:bg-on-accent/10"
                >
                  <Link href="mailto:hello@tilde.dev">Email us instead</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
