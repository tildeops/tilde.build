import * as React from "react";
import type { StorefrontMockup } from "@/lib/storefronts";

type Props = {
  data: StorefrontMockup[];
  statRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  className?: string;
};

/**
 * Bottom cycling stat strip. Four lines stacked, opacity-gated by GSAP per
 * scroll progress. Each line reads "[Brand] · [shipped] · [metric]" in mono
 * caps with `·` separators in the rule color.
 */
export function StatStrip({ data, statRefs, className }: Props) {
  return (
    <div className={["relative h-5 sm:h-6", className ?? ""].join(" ")}>
      {data.map((s, i) => (
        <div
          key={s.slug}
          ref={(el) => {
            statRefs.current[i] = el;
          }}
          className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3"
          style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity" }}
          aria-hidden={i === 0 ? undefined : true}
        >
          {s.stat.map((piece, idx) => (
            <React.Fragment key={piece}>
              <span
                className={[
                  "font-mono text-[10px] uppercase tracking-[0.22em] sm:text-[11px]",
                  idx === 0 ? "text-ink" : "text-ink-muted",
                ].join(" ")}
              >
                {piece}
              </span>
              {idx < s.stat.length - 1 && (
                <span className="font-mono text-[10px] text-rule sm:text-[11px]">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
