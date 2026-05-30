"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Receipt paper — flat white; a hairline outline makes the torn edges read. */
const PAPER = "#ffffff";
const LINE = "#d6d9df";
const TOOTH_W = 15;
const TOOTH_H = 8;

function ZigEdge({ side }: { side: "top" | "bottom" }) {
  const id = useId().replace(/:/g, "");
  // Open path (no closing base) so the fill makes a solid tooth while the
  // stroke only traces the two diagonals — no seam line where it meets the body.
  const d =
    side === "top"
      ? `M0 ${TOOTH_H} L${TOOTH_W / 2} 0.6 L${TOOTH_W} ${TOOTH_H}`
      : `M0 0 L${TOOTH_W / 2} ${TOOTH_H - 0.6} L${TOOTH_W} 0`;
  return (
    <svg
      aria-hidden
      width="100%"
      height={TOOTH_H}
      className={cn("absolute inset-x-0 block", side === "top" ? "bottom-full" : "top-full")}
    >
      <defs>
        <pattern id={id} width={TOOTH_W} height={TOOTH_H} patternUnits="userSpaceOnUse">
          <path d={d} fill={PAPER} stroke={LINE} strokeWidth={1} strokeLinejoin="round" />
        </pattern>
      </defs>
      <rect width="100%" height={TOOTH_H} fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * A receipt/bill-styled container: flat white background with torn zigzag edges
 * top and bottom, a hairline outline so the teeth read on a white page, and a
 * soft drop shadow for depth. Content is supplied by the caller; sticky
 * positioning is left to the parent.
 */
export function BillCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative", className)}
      style={{ filter: "drop-shadow(0 24px 40px rgba(8,30,90,0.14))" }}
    >
      <ZigEdge side="top" />
      <div
        className="border-x px-6 py-7 md:px-7 md:py-8"
        style={{ backgroundColor: PAPER, borderColor: LINE }}
      >
        {children}
      </div>
      <ZigEdge side="bottom" />
    </div>
  );
}
