"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type Report = {
  name: string;
  value: string;
  rawValue: number;
  bg: string;
  fg: string;
  note: string;
  delta: { label: string; sign: "up" | "down" };
  /** 7 bar heights from 0..1 — week-on-week pattern. */
  bars: number[];
  /** Polyline path on a 100×30 canvas — small trend sparkline. */
  spark: string;
};

const REPORTS: Report[] = [
  {
    name: "Meta Ads",
    value: "₹12L",
    rawValue: 12,
    bg: "#1877F2",
    fg: "#ffffff",
    note: "claiming revenue",
    delta: { label: "+47% of total sales", sign: "up" },
    bars: [0.32, 0.55, 0.48, 0.72, 0.66, 0.84, 1.0],
    spark: "M 0 22 L 16 18 L 32 20 L 48 12 L 64 15 L 80 8 L 100 4",
  },
  {
    name: "GA4",
    value: "₹8L",
    rawValue: 8,
    bg: "#F9AB00",
    fg: "#1a1a1a",
    note: "tracked revenue",
    delta: { label: "31% of total sales", sign: "up" },
    bars: [0.42, 0.38, 0.55, 0.62, 0.5, 0.58, 0.74],
    spark: "M 0 18 L 16 22 L 32 16 L 48 14 L 64 18 L 80 12 L 100 10",
  },
  {
    name: "Shopify",
    value: "₹6L",
    rawValue: 6,
    bg: "#008060",
    fg: "#ffffff",
    note: "actual revenue",
    delta: { label: "100% of orders", sign: "up" },
    bars: [0.55, 0.62, 0.50, 0.68, 0.72, 0.65, 0.78],
    spark: "M 0 16 L 16 14 L 32 18 L 48 10 L 64 14 L 80 8 L 100 6",
  },
];

const CLAIMED_TOTAL = 26;
const ACTUAL_TOTAL = 6;

export function BrokenAttribution() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sparkRefs = useRef<(SVGPathElement | null)[]>([]);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      // Init sparklines
      sparkRefs.current.forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Init bars
      barGroupRefs.current.forEach((group) => {
        if (!group) return;
        const bars = Array.from(group.querySelectorAll<HTMLElement>("[data-bar]"));
        gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });
      });

      const t = ScrollTrigger.create({
        trigger: wrap,
        start: "top 78%",
        once: true,
        onEnter: () => {
          // Animate count-up on numbers (handled inline — uses GSAP proxy)
          REPORTS.forEach((r, i) => {
            const el = numberRefs.current[i];
            if (!el) return;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: r.rawValue,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `₹${obj.v.toFixed(0)}L`;
              },
            });
          });

          // Animate bar charts
          barGroupRefs.current.forEach((group) => {
            if (!group) return;
            const bars = group.querySelectorAll<HTMLElement>("[data-bar]");
            gsap.to(bars, {
              scaleY: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.06,
            });
          });

          // Animate sparklines
          gsap.to(sparkRefs.current.filter(Boolean) as SVGPathElement[], {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            stagger: 0.18,
            delay: 0.3,
          });
        },
      });
      return () => t.kill();
    },
    { scope: wrapRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <div ref={wrapRef} className="relative">
      {/* Eyebrow */}
      <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
        Three platforms. Three different stories.
      </p>

      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-3">
        {REPORTS.map((r, i) => (
          <div
            key={r.name}
            className="group relative overflow-hidden rounded-2xl border border-rule bg-bg p-6 shadow-[0_1px_2px_rgba(8,30,90,0.04),0_24px_60px_-30px_rgba(8,30,90,0.18)] transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(8,30,90,0.04),0_36px_80px_-30px_rgba(8,30,90,0.28)]"
          >
            <div className="flex items-start justify-between">
              <span
                className="flex size-10 items-center justify-center rounded-lg font-display text-[14px] font-bold"
                style={{ backgroundColor: r.bg, color: r.fg }}
              >
                {r.name[0]}
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                {r.note}
              </span>
            </div>

            <p
              className="mt-6 font-display font-extrabold text-[clamp(2.4rem,4.4vw,3.2rem)] leading-[1] tracking-[-0.04em] text-ink tabular-nums"
            >
              <span
                ref={(el) => {
                  numberRefs.current[i] = el;
                }}
              >
                ₹0L
              </span>
            </p>
            <p className="mt-2 text-[13px] font-medium text-ink">{r.name}</p>

            {/* Mini bar chart */}
            <div
              ref={(el) => {
                barGroupRefs.current[i] = el;
              }}
              className="mt-5 flex h-[44px] items-end gap-1.5"
            >
              {r.bars.map((h, bi) => (
                <span
                  key={bi}
                  data-bar
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h * 100}%`,
                    backgroundColor: r.bg,
                    opacity: 0.85 - bi * 0.05,
                  }}
                />
              ))}
            </div>

            {/* Sparkline trend */}
            <div className="mt-4 flex items-center gap-2">
              <svg
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
                className="h-[20px] flex-1"
                aria-hidden
              >
                <path
                  ref={(el) => {
                    sparkRefs.current[i] = el;
                  }}
                  d={r.spark}
                  fill="none"
                  stroke={r.bg}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                7d
              </span>
            </div>

            {/* Delta pill */}
            <div className="mt-4 flex items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  backgroundColor: `${r.bg}1a`,
                  color: r.bg,
                }}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 7 L5 3 L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {r.delta.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary band */}
      <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-3">
        <div className="bg-bg-elevated p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
            Combined claimed
          </p>
          <p className="mt-2 font-display text-[24px] font-bold leading-none tabular-nums text-ink">
            ₹{CLAIMED_TOTAL}L
          </p>
        </div>
        <div className="bg-bg-elevated p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
            Actual revenue
          </p>
          <p className="mt-2 font-display text-[24px] font-bold leading-none tabular-nums text-ink">
            ₹{ACTUAL_TOTAL}L
          </p>
        </div>
        <div className="bg-bg-elevated p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
            Double-counted
          </p>
          <p className="mt-2 font-display text-[24px] font-bold leading-none tabular-nums text-accent">
            ₹{CLAIMED_TOTAL - ACTUAL_TOTAL}L
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-[13px] font-medium text-ink-muted">
        Same week. Three sources. Zero agreement.
      </p>
    </div>
  );
}
