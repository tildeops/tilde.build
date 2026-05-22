import * as React from "react";
import type { StorefrontMockup } from "@/lib/storefronts";

type Props = {
  data: StorefrontMockup[];
  nounRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  className?: string;
};

/**
 * "Your [noun], reimagined." with a stack of absolutely-positioned noun spans
 * for the GSAP crossfade morph. The eyebrow stays static; only the noun word
 * cycles per category. The trailing "reimagined." carries the existing
 * .shimmer treatment for brand continuity with the prior carousel.
 */
export function EditorialHeading({ data, nounRefs, className }: Props) {
  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted sm:text-[11px]">
        ~ The Tilde difference
      </p>
      <h2
        className="mt-3 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(1.75rem,4.5vw,3.25rem)] text-ink sm:mt-4"
        aria-label={`Your ${data[0].noun}, reimagined.`}
      >
        Your{" "}
        <span className="relative inline-block align-baseline">
          {/* Width-stabilizing ghost using the longest noun-with-comma so the
              layout doesn't reflow as the noun morphs. Each visible noun is
              absolutely positioned and includes its trailing comma so the
              comma sits flush against the actual noun, not the ghost edge. */}
          <span aria-hidden className="invisible whitespace-nowrap">
            {
              data.reduce((a, b) => (a.noun.length > b.noun.length ? a : b))
                .noun
            }
            ,
          </span>
          {data.map((s, i) => (
            <span
              key={s.slug}
              ref={(el) => {
                nounRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 whitespace-nowrap italic text-ink-muted"
              style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity, transform" }}
              aria-hidden
            >
              {s.noun},
            </span>
          ))}
        </span>{" "}
        <span className="italic shimmer">reimagined.</span>
      </h2>
    </div>
  );
}
