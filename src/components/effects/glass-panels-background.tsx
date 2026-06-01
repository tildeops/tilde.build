import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Stacked glass-panel hero background. Pure CSS, server-renderable (no canvas,
 * no WebGL). A row of vertical panes over a white base. Each pane shows a
 * vertical gradient — mostly white, easing slowly into a bright blue band, then
 * falling off more aggressively back to white. The band's vertical position
 * steps DOWN toward the center panes and back UP toward the edges, so the bands
 * collectively trace an upward-opening arc. The blue is strongest in the center.
 *
 * Motion (gated by `animated`, disabled under `prefers-reduced-motion`):
 *  - the whole row gently pulses brightness, capped at ~80% (`.crescent-glow`);
 *  - every band travels its full height in sync (`.band-bob`) — each shifts to
 *    its mirror position, so the rest arc (bottom semicircle ∪) flips to a top
 *    semicircle (∩) and back. Edge and center bands swing with equal range.
 *
 * Mount with `absolute inset-0 -z-10`.
 */
export function GlassPanelsBackground({
  className,
  panelCount = 15,
  animated = true,
}: {
  className?: string;
  panelCount?: number;
  animated?: boolean;
}) {
  // Strong brand blue (#155DFC) for the band core.
  const BLUE = "21,93,252";

  // Arc geometry, as % of pane height for the band's bright peak. Kept
  // symmetric about the 50% midline (EDGE_Y = 100 − CENTER_Y) so every band's
  // mirror swing covers the same range.
  const EDGE_Y = 20; // band sits high at the edges
  const CENTER_Y = 80; // band sits low at the center → upward arc (∪) at rest
  // Band brightness: strongest in the center, but still clearly present at the
  // edges so the first/last panes aren't plain.
  const CENTER_A = 0.9;
  const EDGE_A = 0.3;

  // Motion. A per-pane phase stagger (by distance from center) means the panes
  // cross the midline at different moments, so the arc never collapses into a
  // straight line mid-cycle. PERIOD must match the `.band-bob` duration.
  const PERIOD = 15; // seconds
  const STAGGER = 0.22; // edge lags center by this fraction of a period

  const mid = (panelCount - 1) / 2;

  return (
    <div aria-hidden className={cn("overflow-hidden bg-bg", className)}>
      <div className={cn("absolute inset-0 flex", animated && "crescent-glow")}>
        {Array.from({ length: panelCount }).map((_, i) => {
          const t = (i - mid) / mid; // -1 (left) … 0 (center) … 1 (right)
          const peak = CENTER_Y - (CENTER_Y - EDGE_Y) * (t * t);
          // (1 - t²) keeps the strong blue across the central panes, easing to
          // the edge value only near the sides.
          const alpha = EDGE_A + (CENTER_A - EDGE_A) * (1 - t * t);
          // Symmetric ~40%-tall band that goes transparent at peak±20. Every
          // pane's on-screen peak stays within [20, 80] at rest AND through the
          // whole flip, so both transparent ends always land inside 0–100% —
          // the band fully fades before the pane edge and never clips flat.
          const p = (v: number) => v.toFixed(2);
          const aMid = (alpha * 0.4).toFixed(3);
          const aFull = alpha.toFixed(3);
          const background = `linear-gradient(to bottom,
            transparent ${p(peak - 20)}%,
            rgba(${BLUE},${aMid}) ${p(peak - 14)}%,
            rgba(${BLUE},${aFull}) ${p(peak - 7)}%,
            rgba(${BLUE},${aFull}) ${p(peak + 7)}%,
            rgba(${BLUE},${aMid}) ${p(peak + 14)}%,
            transparent ${p(peak + 20)}%)`;

          // Translate that carries this band from its rest peak to the mirror
          // peak (100 − peak). Edges (peak ≈ 20) shift down, center (peak ≈ 80)
          // shifts up by the same magnitude; the midline panes barely move.
          const shift = 100 - 2 * peak;
          const delay = -(t * t) * PERIOD * STAGGER;
          const bandStyle = {
            background,
            "--shift": `${shift.toFixed(2)}%`,
            animationDuration: `${PERIOD}s`,
            animationDelay: `${delay.toFixed(2)}s`,
          } as CSSProperties;

          return (
            <div key={i} className="relative h-full flex-1 overflow-hidden">
              <div
                className={cn("absolute inset-0", animated && "band-bob")}
                style={bandStyle}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
