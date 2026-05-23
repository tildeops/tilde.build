"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionFrame } from "@/components/layout/section-frame";
import { BentoCard } from "@/components/ui/bento-card";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { LiquidBackground } from "@/components/effects/liquid-background";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { chatTiles } from "@/lib/shopify-headless/chat-content";
import { WhatsappTile } from "./chat-tiles/whatsapp-tile";
import { InstagramTile } from "./chat-tiles/instagram-tile";
import { TelegramTile } from "./chat-tiles/telegram-tile";

const tileBySlug = {
  whatsapp: WhatsappTile,
  instagram: InstagramTile,
  telegram: TelegramTile,
} as const;

export function HeroBento() {
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
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // Expand fully over ~70% of the viewport of scroll
            end: "+=70%",
            scrub: 0.4,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          frame,
          { paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 },
          0
        ).to(band, { borderRadius: 0 }, 0);
      }, section);

      return () => ctx.revert();
    },
    { dependencies: [reduce] }
  );

  return (
    <section
      id="hero"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full"
    >
      {/* Pinned, expanding hero band.
          Frame holds the inset (margin). Band holds the rounded surface that
          fills the frame. Scroll scrubs the frame padding -> 0 and band
          radius -> 0, then the page scrolls on. */}
      <div className="relative h-[100svh] w-full">
        <div
          ref={frameRef}
          className="absolute inset-0 p-3 sm:p-5 md:p-6 lg:p-8"
        >
          <div
            ref={bandRef}
            className="relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-accent text-on-accent sm:rounded-[32px] md:rounded-[40px]"
          >
            <LiquidBackground
              animated
              themeOverride="bridge"
              className="absolute inset-0 -z-10"
            />

            {/* Subtle film-grain overlay for warmth */}
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
                    Headless Shopify, by Tilde
                  </span>
                </div>
              </FadeUp>

              <RevealLines
                as="h1"
                className="mt-7 font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-on-accent text-[clamp(1.9rem,5vw,3.75rem)]"
              >
                Your customers, and your data, are already telling you what&apos;s wrong.
              </RevealLines>

              <FadeUp delay={0.25}>
                <p className="mx-auto mt-6 max-w-xl text-[15px] text-on-accent/80 leading-relaxed md:mt-7 md:text-[17px]">
                  Tilde rebuilds your Shopify store as a headless Next.js
                  storefront. Same backend, on-brand front, attribution that
                  actually adds up.
                </p>
              </FadeUp>

              <FadeUp delay={0.4}>
                {/* Mobile: stacked, both buttons full-width so they're visually
                    equal. Tablet+: side-by-side with natural widths. */}
                <div className="mx-auto mt-9 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:w-auto">
                  <Link
                    href="/contact"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-semibold text-accent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Book a discovery call
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="#macbook"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/[0.06] px-6 text-[15px] font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.12]"
                  >
                    See the difference
                    <span className="text-white/70 transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>

      {/* Bento grid — sits below the liquid hero band on the normal page surface */}
      <SectionFrame
        className="pt-16 md:pt-20"
        innerClassName="py-14 md:py-20 lg:py-24"
      >
        {/* Section heading */}
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
              <span
                className="size-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
              />
              <span className="text-[12px] font-medium text-ink-muted">
                Voice notes from the field
              </span>
            </div>
            <h2 className="mt-5 font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-ink text-[clamp(1.6rem,3.6vw,2.6rem)]">
              The chats that should never have happened.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] text-ink-muted leading-relaxed md:text-[15px]">
              What customers DM your store — and what your team Slacks each
              other at 11pm — when the storefront isn&apos;t pulling its weight.
            </p>
          </div>
        </FadeUp>

        <StaggerChildren
          className="mt-10 grid grid-cols-1 auto-rows-[200px] gap-3 sm:grid-cols-2 sm:auto-rows-[190px] md:mt-12 md:grid-cols-4 md:gap-4 md:auto-rows-[210px] lg:auto-rows-[230px]"
          stagger={0.06}
          y={28}
          rotate={1}
          grid
        >
          {chatTiles.map((tile) => {
            const Tile = tileBySlug[tile.platform];
            return (
              <BentoCard
                key={tile.id}
                colSpan={(tile.colSpan ?? 1) as 1 | 2 | 3 | 4}
                rowSpan={(tile.rowSpan ?? 1) as 1 | 2 | 3 | 4}
                flush
                className="border-ink/15 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_22px_50px_-24px_rgba(8,30,90,0.28),0_3px_8px_-2px_rgba(8,30,90,0.12)] hover:shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_34px_70px_-22px_rgba(8,30,90,0.38),0_5px_12px_-2px_rgba(8,30,90,0.18)]"
              >
                <Tile tile={tile} />
              </BentoCard>
            );
          })}
        </StaggerChildren>

        {/* Bento footer caption */}
        <FadeUp delay={0.5}>
          <p className="mt-8 text-center text-[13px] text-ink-muted">
            Real messages, real frustration — composited from brands we&apos;ve
            actually rebuilt for.
          </p>
        </FadeUp>
      </SectionFrame>
    </section>
  );
}
