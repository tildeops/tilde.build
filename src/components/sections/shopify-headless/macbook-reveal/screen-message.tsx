"use client";

import { forwardRef, type ReactNode } from "react";

type Position = "center" | "left" | "right";

/**
 * Position-aware narrative overlay inside the Mac screen. Driven by the
 * orchestrator via opacity + small y translate — opacity is reliable under
 * scrub and ensures the message fully disappears with no residual artifact
 * between beats.
 *
 * - `center`: full-width centered. Use for the pre-browser intro on brand 1.
 * - `left` / `right`: anchored in the side zones flanking the narrowed
 *   browser window.
 */
export const ScreenMessage = forwardRef<
  HTMLDivElement,
  { children: ReactNode; position?: Position }
>(function ScreenMessage({ children, position = "center" }, ref) {
  const positionClass =
    position === "center"
      ? "inset-x-0 top-1/2 -translate-y-1/2 justify-center px-10 text-center"
      : position === "left"
      ? "left-0 top-1/2 -translate-y-1/2 pl-[4%] pr-[3%] w-[24%] text-left justify-start"
      : "right-0 top-1/2 -translate-y-1/2 pl-[3%] pr-[4%] w-[24%] text-right justify-end";

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute z-20 flex items-center ${positionClass}`}
      style={{ opacity: 0, willChange: "opacity, transform" }}
    >
      <p
        className="font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-white"
        style={{
          fontSize:
            position === "center"
              ? "clamp(1.3rem, 2.6vw, 2rem)"
              : "clamp(1rem, 1.7vw, 1.5rem)",
          textShadow: "0 2px 18px rgba(0,0,0,0.35)",
        }}
      >
        {children}
      </p>
    </div>
  );
});
