"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/layout/section-frame";
import { EditorialSweep } from "@/components/sections/editorial-sweep";
import { LiquidBackground } from "@/components/effects/liquid-background";

export function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "editorial", duration: 0.85 },
      });
      tl.from("[data-hero-head]", { opacity: 0, y: 16 }, 0)
        .from("[data-hero-sub]", { opacity: 0, y: 10 }, 0.15)
        .from("[data-hero-ctas]", { opacity: 0, y: 10 }, 0.25);
      // Note: do NOT animate `[data-hero-carousel]` — it would leave an inline
      // `transform` on the wrapper, which establishes a containing block and
      // breaks GSAP ScrollTrigger pin (position: fixed becomes scoped to the
      // wrapper instead of the viewport). EditorialSweep owns its own
      // entrance via the grow phase + content fade-in inside its pin timeline.
    },
    { scope: root as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <section ref={root} className="relative w-full">
      <div>
        <div className="relative isolate overflow-hidden bg-accent text-on-accent flex items-center justify-center min-h-screen">
          <LiquidBackground animated className="absolute inset-0 -z-10" />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 w-full px-6 pt-24 pb-10 sm:px-10 sm:pt-28 sm:pb-12 md:px-16 md:pt-32 md:pb-14 lg:pt-36 lg:pb-16">
            <Eyebrow className="relative text-center text-on-accent/90">
              <span>~ Headless commerce, built for your brand ~</span>
            </Eyebrow>

            <h1
              data-hero-head
              className="relative mx-auto mt-7 max-w-5xl text-center font-display font-medium leading-[1.02] tracking-[-0.02em] text-[clamp(2.75rem,7.5vw,6rem)] text-on-accent"
            >
              Your Shopify,{" "}
              <span className="italic text-on-accent/90">
                without the Shopify look.
              </span>
            </h1>

            <p
              data-hero-sub
              className="relative mx-auto mt-7 max-w-2xl text-center text-base md:text-lg leading-relaxed text-on-accent/80"
            >
              We rebuild Shopify stores as fully custom, lightning-fast Next.js
              storefronts. Your catalogue, your checkout, your brand.
            </p>

            <div
              data-hero-ctas
              className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button asChild size="lg" variant="invert" className="gloss-inset">
                <Link href="/contact">
                  Book a discovery call <ArrowUpRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border border-white/15 bg-black/30 text-on-accent backdrop-blur-[2px] hover:bg-black/40 hover:border-white/25"
              >
                <Link href="/shopify-headless">
                  See our flagship offering →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        data-hero-carousel
        className="relative z-20 -mt-8 md:-mt-12 lg:-mt-16"
      >
        <EditorialSweep />
      </div>
    </section>
  );
}
