import * as React from "react";
import { cn } from "@/lib/utils";

type BentoSpan = 1 | 2 | 3 | 4;
type BentoAccent = "default" | "accent" | "dark";

type BentoCardProps = React.HTMLAttributes<HTMLDivElement> & {
  colSpan?: BentoSpan;
  rowSpan?: BentoSpan;
  /** Optional matching span at the `sm` breakpoint (2-col grid). */
  smColSpan?: 1 | 2;
  /** Solid surface; defaults to `bg-bg-elevated`. Pass to override (e.g. brand-tinted tiles). */
  surface?: string;
  /** Adds the brand inset gloss + warmer corner radius. Use sparingly. */
  glossy?: boolean;
  /** Removes default padding. Use when the child paints to the edges (chat UIs, dashboards). */
  flush?: boolean;
  /** Visual emphasis — default white surface, accent (deep navy/brand), or dark (near-ink). */
  accent?: BentoAccent;
  /** Adds the elevated shadow + hover lift. Default true. */
  elevated?: boolean;
};

// NOTE: Tailwind needs literal class names. These maps must stay static.
const colMap: Record<BentoSpan, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};

const rowMap: Record<BentoSpan, string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
  4: "md:row-span-4",
};

const smColMap: Record<1 | 2, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
};

const accentSurface: Record<BentoAccent, string> = {
  default: "bg-bg-elevated text-ink",
  accent:
    "bg-gradient-to-br from-[color:var(--color-accent-deep,#0a2f8a)] via-accent to-[color:var(--color-accent-bright,#3b82f6)] text-white",
  dark: "bg-[#0b0c0e] text-white",
};

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      colSpan = 1,
      rowSpan = 1,
      smColSpan,
      surface,
      glossy = false,
      flush = false,
      accent = "default",
      elevated = true,
      children,
      ...rest
    },
    ref
  ) => {
    // Map md colspans down to sm so 2-col tiles stay 2-wide on the sm 2-col grid.
    const resolvedSmCol = smColSpan ?? (colSpan >= 2 ? 2 : 1);
    const isDarkSurface = accent !== "default";

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl border",
          isDarkSurface ? "border-white/10" : "border-rule",
          surface ?? accentSurface[accent],
          glossy && "gloss-inset",
          !flush && "p-5 md:p-6",
          colMap[colSpan],
          rowMap[rowSpan],
          smColMap[resolvedSmCol],
          elevated &&
            "shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_18px_44px_-26px_rgba(8,30,90,0.18),0_2px_6px_-2px_rgba(8,30,90,0.08)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_28px_60px_-26px_rgba(8,30,90,0.28),0_4px_10px_-2px_rgba(8,30,90,0.12)]",
          className
        )}
        {...rest}
      >
        {/* Double-hairline highlight — a subtle inset ring on top of the border. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset",
            isDarkSurface ? "ring-white/8" : "ring-white/40"
          )}
        />
        {children}
      </div>
    );
  }
);
BentoCard.displayName = "BentoCard";
