import * as React from "react";
import type { StorefrontMockup } from "@/lib/storefronts";

type Props = {
  data: StorefrontMockup[];
  urlRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  categoryRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  children: React.ReactNode;
  className?: string;
};

/**
 * Shared browser-frame shell. The chrome bar holds three traffic-light dots,
 * a centered URL stack (one absolutely positioned span per category), a
 * category label stack (top-right), and a flex-1 body that hosts the
 * standard + tilde mockup layers. The orchestrator drives opacity on the
 * url/category stacks via the provided refs.
 */
export function BrowserChrome({ data, urlRefs, categoryRefs, children, className }: Props) {
  return (
    <div
      className={[
        "relative h-full w-full overflow-hidden rounded-2xl border border-rule",
        "bg-bg-elevated shadow-[0_30px_80px_-40px_rgb(var(--accent-rgb)/0.35)]",
        "flex flex-col",
        className ?? "",
      ].join(" ")}
    >
      {/* Chrome bar */}
      <div className="relative shrink-0 flex items-center gap-2 border-b border-rule bg-bg/70 px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="size-2 rounded-full bg-rule sm:size-2.5" />
        <span className="size-2 rounded-full bg-rule sm:size-2.5" />
        <span className="size-2 rounded-full bg-rule sm:size-2.5" />

        {/* URL slot — 4 stacked spans, all but active have opacity 0 */}
        <div className="relative ml-2 sm:ml-4 h-6 flex-1 rounded-md border border-rule bg-bg">
          {data.map((s, i) => (
            <span
              key={s.slug}
              ref={(el) => {
                urlRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center font-mono text-[10px] sm:text-[11px] text-ink-muted"
              style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity" }}
            >
              <span className="opacity-50 mr-1">https://</span>
              {s.url}
            </span>
          ))}
        </div>

        {/* Category slot — top-right, 4 stacked spans */}
        <div className="relative hidden sm:flex h-4 w-28 justify-end">
          {data.map((s, i) => (
            <span
              key={s.slug}
              ref={(el) => {
                categoryRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-end font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted"
              style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity" }}
            >
              {s.category}
            </span>
          ))}
        </div>
      </div>

      {/* Body — the standard + tilde mockup layers live here */}
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
