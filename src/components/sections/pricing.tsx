"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { RevealLines } from "@/components/motion/reveal-lines";
import { CountUp } from "@/components/motion/count-up";
import { pricing, addOn } from "@/lib/content";
import { cn } from "@/lib/utils";

const INR = new Intl.NumberFormat("en-IN");

function parsePrice(raw: string): {
  prefix: string;
  amount: number | null;
  suffix: string;
} {
  // Match the first number with optional thousands separators
  const match = raw.match(/(₹|US\$|\$|€)?\s*([0-9][0-9,]*)/);
  if (!match) return { prefix: "", amount: null, suffix: raw };
  const [full, currency, digits] = match;
  const idx = raw.indexOf(full);
  const before = raw.slice(0, idx) + (currency ?? "");
  const after = raw.slice(idx + full.length);
  return {
    prefix: before,
    amount: Number(digits.replace(/,/g, "")),
    suffix: after,
  };
}

export function Pricing() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const addonRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-price-card]"));
      gsap.set(cards, { opacity: 0, y: 36, scale: 0.97 });
      cards.forEach((c) => {
        if (c.dataset.highlight === "true") gsap.set(c, { scale: 0.94 });
      });

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
            stagger: 0.14,
            onComplete: () => {
              const addon = addonRef.current;
              if (!addon) return;
              gsap.fromTo(
                addon,
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: 0.85, ease: "editorial" }
              );
            },
          });
        },
      });
      return () => st.kill();
    },
    { scope: gridRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <SectionFrame id="pricing">
      <div className="text-center">
        <Eyebrow shimmer>~ Transparent pricing</Eyebrow>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-medium leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.6vw,3.5rem)]"
        >
          No quote-required{" "}
          <span className="italic text-ink-muted">nonsense.</span>
        </RevealLines>
        <p className="mx-auto mt-5 max-w-xl text-base text-ink-muted leading-relaxed">
          We list our prices because we&apos;re confident in the value. Plug the
          add-ons you need, skip the ones you don&apos;t.
        </p>
      </div>

      <div ref={gridRef} className="mt-14 grid gap-5 lg:grid-cols-3">
        {pricing.map((p) => {
          const parsed = parsePrice(p.price);
          return (
            <article
              key={p.name}
              data-price-card
              data-highlight={p.highlight ? "true" : "false"}
              className={cn(
                "group/card relative flex flex-col rounded-2xl border bg-bg p-7 md:p-8 transition-shadow duration-500 will-change-transform hover:-translate-y-1",
                p.highlight
                  ? "border-accent shadow-[0_30px_80px_-50px_rgb(var(--accent-rgb)/0.5)] hover:shadow-[0_45px_110px_-40px_rgb(var(--accent-rgb)/0.6)]"
                  : "border-rule hover:shadow-[0_30px_80px_-50px_rgb(var(--accent-rgb)/0.35)]"
              )}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-on-accent gloss-inset shadow-[0_8px_24px_-8px_rgb(var(--accent-rgb)/0.55)]">
                  Flagship · Most popular
                </span>
              )}
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <h3 className="mt-3 font-display text-2xl md:text-3xl">{p.name}</h3>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed min-h-[3rem]">
                {p.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl md:text-5xl font-medium tracking-tight">
                  {parsed.amount != null ? (
                    <>
                      {parsed.prefix}
                      <CountUp to={parsed.amount} format={(n) => INR.format(n)} />
                    </>
                  ) : (
                    p.price
                  )}
                </span>
                {parsed.suffix && (
                  <span className="font-display text-2xl md:text-3xl font-medium tracking-tight text-ink-muted">
                    {parsed.suffix}
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                {p.cadence}
              </p>

              <ul className="mt-7 space-y-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink">
                    <Check className="mt-0.5 size-4 text-accent shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={p.highlight ? "primary" : "secondary"}
                size="md"
                className="mt-8 w-full"
              >
                <Link href={p.cta.href}>
                  {p.cta.label} <ArrowUpRight />
                </Link>
              </Button>
            </article>
          );
        })}
      </div>

      {/* Add-on */}
      <div
        ref={addonRef}
        className="group mt-6 rounded-2xl border border-dashed border-rule bg-bg-elevated/40 p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-solid hover:border-accent/40 hover:shadow-[0_30px_80px_-50px_rgb(var(--accent-rgb)/0.30)]"
      >
        <div className="grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <Eyebrow>~ Optional add-on</Eyebrow>
            <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight">
              {addOn.name}
            </h3>
            <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed max-w-prose">
              {addOn.description}
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl md:text-4xl font-medium tracking-tight">
                {addOn.price}
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {addOn.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink">
                  <Check className="mt-0.5 size-4 text-accent shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        All prices in INR, excluding GST · Hosting, domain, third-party SaaS
        billed separately at cost
      </p>
    </SectionFrame>
  );
}
