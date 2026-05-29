"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionFrame } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { CountUp } from "@/components/motion/count-up";
import { calTrigger } from "@/lib/cal";
import { engagementTiers } from "@/lib/content";
import { cn } from "@/lib/utils";

const INR = new Intl.NumberFormat("en-IN");

export function Pricing() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = Array.from(
        grid.querySelectorAll<HTMLElement>("[data-price-card]"),
      );
      gsap.set(cards, { opacity: 0, y: 36, scale: 0.97 });

      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: "editorial",
            stagger: 0.12,
          });
        },
      });
      return () => st.kill();
    },
    { scope: gridRef as React.RefObject<HTMLElement>, dependencies: [] },
  );

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
              Three ways to work with us
            </span>
          </div>
        </FadeUp>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(2rem,4.6vw,3.4rem)]"
        >
          Pick the engagement that{" "}
          <span className="italic">fits your project.</span>
        </RevealLines>
        <FadeUp delay={0.15}>
          <p className="mx-auto mt-5 max-w-xl text-base text-ink-muted leading-relaxed">
            Most projects start fixed-scope. Some need a team for the month.
            Some just need an hour of senior eyes. Same engineers, three shapes.
          </p>
        </FadeUp>
      </div>

      <div ref={gridRef} className="mt-14 grid gap-5 lg:grid-cols-3">
        {engagementTiers.map((tier) => (
          <article
            key={tier.id}
            data-price-card
            className={cn(
              "group/card relative flex flex-col rounded-2xl border bg-bg p-7 md:p-8 transition-shadow duration-500 will-change-transform hover:-translate-y-1",
              tier.highlight
                ? "border-accent shadow-[0_30px_80px_-50px_rgb(var(--accent-rgb)/0.5)] hover:shadow-[0_45px_110px_-40px_rgb(var(--accent-rgb)/0.6)]"
                : "border-rule hover:shadow-[0_30px_80px_-50px_rgb(var(--accent-rgb)/0.35)]",
            )}
          >
            {tier.highlight && (
              <span
                className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-on-accent"
                style={{
                  boxShadow:
                    "0 8px 24px -8px rgb(var(--accent-rgb) / 0.55)",
                }}
              >
                Most popular
              </span>
            )}
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              ~ {tier.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-ink md:text-3xl">
              {tier.name}
            </h3>
            <p className="mt-4 min-h-[3rem] text-sm text-ink-muted leading-relaxed">
              {tier.description}
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                {tier.currency}
                <CountUp to={tier.amount} format={(n) => INR.format(n)} />
              </span>
              {tier.suffix && (
                <span className="font-display text-2xl font-extrabold tracking-tight text-ink-muted md:text-3xl">
                  {tier.suffix}
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              {tier.cadence}
            </p>

            <ul className="mt-7 flex-1 space-y-2.5">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-ink"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {tier.flagshipExample && (
              <Link
                href={tier.flagshipExample.href}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-transform duration-300 hover:translate-x-0.5"
              >
                {tier.flagshipExample.label}
                <ArrowRight className="size-3.5" />
              </Link>
            )}

            <Link
              href={tier.cta.href}
              {...(tier.cta.href === "/contact"
                ? calTrigger(`pricing_tier_${tier.id}`)
                : {})}
              className={cn(
                "mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-[14px] font-semibold transition-transform duration-300 hover:scale-[1.02]",
                tier.highlight
                  ? "bg-ink text-white shadow-[0_10px_30px_-12px_rgba(11,12,14,0.55)]"
                  : "border border-rule bg-bg-elevated text-ink hover:border-accent/40",
              )}
            >
              {tier.cta.label}
              <ArrowUpRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        All prices in INR, excluding GST · International invoicing in USD / EUR
        on request
      </p>
    </SectionFrame>
  );
}
