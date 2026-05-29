"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionFrame } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { CountUp } from "@/components/motion/count-up";
import { flagship, addons } from "@/lib/shopify-headless/pricing";
import { calTrigger } from "@/lib/cal";

export function PricingHeadless() {
  return (
    <SectionFrame id="pricing">
      <div className="text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
            <span
              className="size-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
            />
            <span className="text-[12px] font-medium text-ink-muted">
              One price. No surprises.
            </span>
          </div>
        </FadeUp>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-extrabold leading-[0.98] tracking-[-0.04em] text-ink text-[clamp(2rem,4.6vw,3.4rem)]"
        >
          The build is fixed. The extras are à la carte.
        </RevealLines>
      </div>

      {/* Flagship — one continuous brushed-silver card. Features on the left,
          price + CTA on the right, separated only by a perforated hairline. */}
      <FadeUp delay={0.15}>
        <div
          className="relative mt-14 overflow-hidden rounded-3xl border border-white/40 shadow-[0_1px_2px_rgba(11,12,14,0.04),0_40px_90px_-30px_rgba(11,12,14,0.28)]"
          style={{
            background:
              "linear-gradient(135deg, #f5f6f8 0%, #e6e8ec 45%, #f0f1f3 70%, #d9dce1 100%)",
          }}
        >
          {/* Decorative silver layers — desktop only. Mobile keeps the base
              gradient so the card stays cleaner and the page lighter. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden md:block">
            {/* Diagonal flash sweep */}
            <div
              className="absolute inset-y-0 w-[35%]"
              style={{
                left: 0,
                background:
                  "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 45%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,0) 100%)",
                animation: "flash-diagonal 8s linear infinite",
                mixBlendMode: "overlay",
                filter: "blur(4px)",
              }}
            />
            {/* Ambient washes */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 60% at 30% 30%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 60%), radial-gradient(70% 50% at 80% 80%, rgba(160,170,185,0.16) 0%, rgba(160,170,185,0) 55%)",
              }}
            />
            {/* Top-left bloom */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(40% 50% at 8% 6%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 55%)",
              }}
            />
            {/* Bottom-right pool */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 50% at 95% 95%, rgba(115,125,140,0.22) 0%, rgba(115,125,140,0) 55%)",
              }}
            />
            {/* Metallic grain */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-[0.20]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Embossed silver edge */}
            <span
              className="absolute inset-0 rounded-[inherit]"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.8), inset 1px 0 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(80,90,105,0.18), inset -1px 0 0 rgba(80,90,105,0.10)",
              }}
            />
          </div>

          <div className="relative z-10 grid md:grid-cols-12">
            {/* LEFT — features */}
            <div className="relative p-6 sm:p-7 md:col-span-7 md:p-10 lg:p-12">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                  Tilde · headless package
                </p>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-sm"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.55)",
                    boxShadow: "inset 0 0 0 1px rgba(11,12,14,0.06)",
                  }}
                >
                  <span
                    className="size-1.5 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 8px rgb(var(--accent-rgb) / 0.6)" }}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                    Most popular
                  </span>
                </span>
              </div>

              <h3 className="mt-7 font-display font-extrabold text-[clamp(2rem,4vw,3rem)] leading-[0.98] tracking-[-0.04em] text-ink">
                {flagship.name}
              </h3>
              <p className="mt-4 max-w-xl text-base text-ink-muted leading-relaxed">
                {flagship.tagline}
              </p>

              <div className="mt-8 flex items-end justify-between border-b border-ink/10 pb-2 md:mt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  What&apos;s included
                </p>
                {/* Item count — desktop only, cleaner on mobile without it */}
                <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted md:block">
                  {flagship.features.length} items
                </p>
              </div>

              {/* On mobile, show only the emphasis features (the 3 headliners).
                  Full breakdown lives on /pricing. */}
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-2.5">
                {flagship.features.map((f) => (
                  <li
                    key={f.label}
                    className={`flex items-start gap-2.5 text-[13.5px] leading-snug ${
                      f.emphasis ? "text-ink" : "text-ink-muted"
                    } ${!f.emphasis ? "hidden md:flex" : ""}`}
                  >
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${
                        f.emphasis ? "text-accent" : "text-ink-muted/50"
                      }`}
                    />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>

              {/* Mobile-only link to the full breakdown */}
              <Link
                href="/pricing"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent md:hidden"
              >
                See full breakdown
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Perforated vertical divider — same silver continues, just a "tear" line */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-6 z-10 hidden md:block"
              style={{
                left: "calc(7 / 12 * 100%)",
                width: "1px",
                backgroundImage:
                  "linear-gradient(to bottom, rgba(11,12,14,0.18) 50%, transparent 50%)",
                backgroundSize: "1px 8px",
                backgroundRepeat: "repeat-y",
              }}
            />

            {/* RIGHT — price + CTA on the same silver surface */}
            <div className="relative flex flex-col p-6 pt-2 sm:p-7 sm:pt-2 md:col-span-5 md:p-10 md:pt-10 lg:p-12 lg:pt-12">
              {/* Quote-style header — desktop only */}
              <div className="hidden items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted md:flex">
                <span>Quote · TLD-0042</span>
                <span className="text-ink-muted/70">PDF ↗</span>
              </div>

              <div aria-hidden className="mt-5 hidden border-t border-ink/10 md:block" />

              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted md:mt-7">
                Project total
              </p>
              <CountUp
                to={flagship.price}
                prefix={flagship.currency}
                format={(n) => n.toLocaleString("en-IN")}
                className="mt-2 block font-display font-extrabold text-[clamp(2.6rem,8vw,4.6rem)] leading-none tracking-[-0.045em] text-ink"
              />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                {flagship.priceMeta}
              </p>

              {/* Line-item-style mini table — desktop only */}
              <div className="mt-7 hidden space-y-1.5 font-mono text-[11px] text-ink-muted md:block">
                <div className="flex justify-between">
                  <span>Build · 3–4 weeks</span>
                  <span className="text-ink">included</span>
                </div>
                <div className="flex justify-between">
                  <span>Migration · backend stays</span>
                  <span className="text-ink">included</span>
                </div>
                <div className="flex justify-between">
                  <span>Handover · code + docs</span>
                  <span className="text-ink">included</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={flagship.cta.href}
                {...calTrigger("pricing_headless")}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(11,12,14,0.55)] transition-all duration-300 hover:bg-[#0a1126] hover:shadow-[0_16px_38px_-12px_rgba(11,12,14,0.7)] md:mt-auto"
              >
                {flagship.cta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted/80">
                Hosting · domain · third-party billed at cost
              </p>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Add-ons — desktop only. Mobile sends users to /pricing for the full
          breakdown, since the page is already long with the pinned animations. */}
      <div className="mt-16 hidden md:block">
        <div className="flex items-baseline justify-between">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Optional add-ons
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[12px] text-ink-muted">
              Built in parallel — doesn&apos;t extend the timeline
            </p>
          </FadeUp>
        </div>

        <StaggerChildren
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5"
          stagger={0.06}
          y={20}
          grid
        >
          {addons.map((a) => (
            <Link
              key={a.id}
              href="/pricing"
              className="group flex flex-col rounded-2xl bg-bg p-6 shadow-[0_1px_2px_rgba(11,12,14,0.04),0_8px_24px_-12px_rgba(11,12,14,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(11,12,14,0.04),0_18px_36px_-18px_rgba(11,12,14,0.20)]"
            >
              <p className="text-[16px] font-semibold tracking-[-0.005em] text-ink">
                {a.name}
              </p>
              <p className="mt-2 flex-1 text-[13px] text-ink-muted leading-snug">
                {a.blurb}
              </p>
              <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                {a.price}
              </p>
            </Link>
          ))}
        </StaggerChildren>
      </div>

      {/* Mobile-only addons teaser link */}
      <div className="mt-10 text-center md:hidden">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-5 py-3 text-[13px] font-semibold text-ink"
        >
          View add-ons &amp; full breakdown
          <ArrowRight className="size-4" />
        </Link>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {addons.length} optional modules
        </p>
      </div>
    </SectionFrame>
  );
}
