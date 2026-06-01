"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { GlassPanelsBackground } from "@/components/effects/glass-panels-background";
import { SectionFrame } from "@/components/layout/section-frame";
import { DeviceCluster } from "./hero/device-cluster";
import { calTrigger } from "@/lib/cal";

/**
 * SAVED VARIANT — the glass-panels hero. A full-bleed white band with an
 * animated blue concentric-ring arc (bands flip ∪↔∩) and a row of seamless
 * frosted-glass panes (see GlassPanelsBackground). Cormorant heading; the
 * flagship CTA carries a slow silver sliver sweep. Scrolls normally (no
 * pin/expand). Not currently mounted — swap `Hero` in landing/page.tsx for
 * `HeroGlassPanels` to use it instead of the liquid hero.
 */
export function HeroGlassPanels() {
  return (
    <section id="hero" className="relative w-full">
      <div className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-bg text-ink">
        <GlassPanelsBackground className="absolute inset-0 -z-10" />

        {/* Soft white spotlight — keeps the content legible as the blue arc
            sweeps behind it, without hiding the effect at the edges. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(60% 52% at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0) 72%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center sm:px-10 sm:py-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-rule/70 bg-white/90 px-3 py-1.5 shadow-[0_2px_12px_-4px_rgba(8,30,90,0.2)] backdrop-blur-sm">
              <span
                className="size-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 12px rgb(var(--accent-rgb) / 0.7)" }}
              />
              <span className="text-[12px] font-semibold tracking-[-0.005em] text-ink/80">
                ~ One studio. Whole stack.
              </span>
            </div>
          </FadeUp>

          <RevealLines
            as="h1"
            className="mt-7 font-[family-name:var(--font-cormorant)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink text-[clamp(2.5rem,6.4vw,4.75rem)]"
          >
            We build whatever your business{" "}
            <span className="italic font-medium text-accent">
              actually needs.
            </span>
          </RevealLines>

          <FadeUp delay={0.25}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] text-ink/70 leading-relaxed md:mt-7 md:text-[17px]">
              From Shopify storefronts to internal tools and AI bots, we build
              software tailored to your business.
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="mx-auto mt-9 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:w-auto">
              <Link
                href="/contact"
                {...calTrigger("hero")}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,28,36,0.82), rgba(8,9,14,0.9))",
                }}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 px-6 text-[15px] font-semibold text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_18px_44px_-16px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-[1.02]"
              >
                Book a discovery call
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/"
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-ink/20 bg-white px-6 text-[15px] font-medium text-ink shadow-[0_8px_24px_-16px_rgba(8,30,90,0.22)] transition-colors duration-300 hover:border-ink/40"
              >
                {/* Diagonal sliver sweep — slow, near-continuous, silver-toned
                    so it reads as a drifting metallic sheen on the white surface. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 w-[72%]"
                  style={{
                    left: 0,
                    background:
                      "linear-gradient(110deg, rgba(212,214,222,0) 0%, rgba(198,201,212,0.32) 32%, rgba(140,144,158,0.5) 50%, rgba(198,201,212,0.32) 68%, rgba(212,214,222,0) 100%)",
                    animation: "flash-diagonal-slow 6s linear infinite",
                    filter: "blur(7px)",
                  }}
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  See our flagship offering
                  <span className="text-ink-muted transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Device cluster — sits below the hero on the normal page surface.
          Telegraphs the breadth of surfaces tilde ships. */}
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
