import * as React from "react";
import type { StorefrontMockup } from "@/lib/storefronts";

type Props = {
  side: "standard" | "tilde";
  data: StorefrontMockup[];
  /** 2D ref array: [categoryIdx][bulletIdx] */
  bulletRefs: React.MutableRefObject<(HTMLLIElement | null)[][]>;
  /** Group-level refs, one per category, used for opacity gating */
  groupRefs: React.MutableRefObject<(HTMLUListElement | null)[]>;
  className?: string;
};

/**
 * One side of the comparison ledger. "THE TEMPLATE" lives left of the browser
 * (muted, neutral), "THE TILDE BUILD" lives right (alive, accented).
 *
 * All 4 category bullet-lists are mounted at once, absolutely stacked. GSAP
 * drives opacity/y on individual <li> refs to stagger them in and out per
 * category. The header label stays static.
 */
export function LedgerColumn({ side, data, bulletRefs, groupRefs, className }: Props) {
  const isTilde = side === "tilde";
  const label = isTilde ? "The Tilde build" : "The template";
  const align = isTilde ? "items-end text-right" : "items-start text-left";
  const markerColor = isTilde ? "text-accent" : "text-ink-muted/50";
  const marker = isTilde ? "+" : "—";

  return (
    <div className={["flex flex-col", align, className ?? ""].join(" ")}>
      <p
        className={[
          "font-mono text-[10px] uppercase tracking-[0.22em]",
          isTilde ? "text-accent" : "text-ink-muted",
        ].join(" ")}
      >
        {label}
      </p>

      {/* Stacked bullet groups */}
      <div className="relative mt-3 w-full sm:mt-4">
        {data.map((s, ci) => {
          const bullets = isTilde ? s.tildeBullets : s.standardBullets;
          return (
            <ul
              key={s.slug}
              ref={(el) => {
                groupRefs.current[ci] = el;
              }}
              className={[
                "absolute inset-0 space-y-2 sm:space-y-2.5",
                align,
              ].join(" ")}
              style={{ opacity: ci === 0 ? 1 : 0, willChange: "opacity" }}
              aria-hidden={ci === 0 ? undefined : true}
            >
              {bullets.map((b, bi) => (
                <li
                  key={b}
                  ref={(el) => {
                    if (!bulletRefs.current[ci]) bulletRefs.current[ci] = [];
                    bulletRefs.current[ci][bi] = el;
                  }}
                  className={[
                    "flex max-w-[26ch] gap-2 text-[12px] leading-snug sm:text-[13px]",
                    isTilde ? "text-ink flex-row-reverse" : "text-ink-muted",
                  ].join(" ")}
                  style={{ willChange: "opacity, transform" }}
                >
                  <span className={[markerColor, "shrink-0 leading-[1.3] font-medium"].join(" ")}>
                    {marker}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          );
        })}
        {/* Reserve vertical space — invisible ghost equal to the longest list */}
        <ul className="invisible space-y-2 sm:space-y-2.5">
          {data[0].standardBullets.map((b) => (
            <li key={b} className="flex gap-2 text-[12px] leading-snug sm:text-[13px]">
              <span>·</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
