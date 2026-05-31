"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { LiquidBackground } from "@/components/effects/liquid-background";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { SectionFrame } from "@/components/layout/section-frame";
import { DeviceCluster } from "./hero/device-cluster";
import { calTrigger } from "@/lib/cal";

/**
 * Landing hero. Inherits the HeroBento expansion pattern from /shopify-headless:
 * a rounded liquid band that pin-scrolls to full-bleed. The NotchNav travels
 * with the band's top edge — both keyed off the `id="hero"` section.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const bandRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (reduce) return;
      const section = sectionRef.current;
      const frame = frameRef.current;
      const band = bandRef.current;
      if (!section || !frame || !band) return;

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add(
          {
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767.98px)",
          },
          (ctx2) => {
            const { isMobile } = ctx2.conditions as {
              isDesktop: boolean;
              isMobile: boolean;
            };

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: isMobile ? "+=40%" : "+=70%",
                scrub: isMobile ? 0.25 : 0.4,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            tl.to(
              frame,
              {
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
              },
              0,
            ).to(band, { borderRadius: 0 }, 0);
          },
        );
      }, section);

      return () => ctx.revert();
    },
    { dependencies: [reduce] },
  );

  return (
    <section
      id="hero"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full"
    >
      <div className="relative h-[100svh] w-full">
        <div
          ref={frameRef}
          className="absolute inset-0 p-3 sm:p-5 md:p-6 lg:p-8"
        >
          <div
            ref={bandRef}
            style={{ transform: "translateZ(0)" }}
            className="relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-accent text-on-accent sm:rounded-[32px] md:rounded-[40px]"
          >
            <LiquidBackground
              animated
              themeOverride="bridge"
              className="absolute inset-0 -z-10"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center sm:px-10 sm:py-20">
              <FadeUp>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                  <span
                    className="size-1.5 rounded-full bg-white"
                    style={{ boxShadow: "0 0 12px rgba(255,255,255,0.7)" }}
                  />
                  <span className="text-[12px] font-medium tracking-[-0.005em] text-white/90">
                    ~ One studio. Whole stack.
                  </span>
                </div>
              </FadeUp>

              <RevealLines
                as="h1"
                className="mt-7 font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-on-accent text-[clamp(2rem,5.4vw,4rem)]"
              >
                We build whatever your business{" "}
                <span className="italic">actually needs.</span>
              </RevealLines>

              <FadeUp delay={0.25}>
                <p className="mx-auto mt-6 max-w-xl text-[15px] text-on-accent/85 leading-relaxed md:mt-7 md:text-[17px]">
                  From Shopify storefronts to internal tools and AI bots, we
                  build software tailored to your business.
                </p>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="mx-auto mt-9 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:w-auto">
                  <Link
                    href="/contact"
                    {...calTrigger("hero")}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-semibold text-accent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Book a discovery call
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/[0.06] px-6 text-[15px] font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.12]"
                  >
                    See our flagship offering
                    <span className="text-white/70 transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>

      {/* Device cluster — sits below the liquid band on the normal page
          surface. Telegraphs the breadth of surfaces tilde ships. */}
      <SectionFrame
        className="pt-12 md:pt-16"
        innerClassName="py-10 md:py-16 lg:py-20"
      >
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
              <span
                className="size-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
              />
              <span className="text-[12px] font-medium text-ink-muted">
                Built on every surface that talks to your customer
              </span>
            </div>
            <h2 className="mt-5 font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-ink text-[clamp(1.5rem,3.2vw,2.4rem)]">
              Phone, laptop, store, chat — same team.
            </h2>
          </div>
        </FadeUp>

        <DeviceCluster />
      </SectionFrame>
    </section>
  );
}
