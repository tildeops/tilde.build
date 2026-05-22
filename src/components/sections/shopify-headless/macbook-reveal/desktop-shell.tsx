"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";

/**
 * Mac frame for the desktop reveal — outer bezel + inner screen.
 * The bezel is a thin dark ring (~8px) so the inner screen reads as a real
 * M-series display edge. The notch sits at the top of the inner screen,
 * biting in. No body, no hinge, no chin.
 *
 * The forwarded ref points at the outer bezel (this is what GSAP fades in).
 */
export const DesktopShell = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string; style?: CSSProperties }
>(function DesktopShell({ children, className, style }, ref) {
  return (
    <div
      ref={ref}
      className={`relative rounded-[20px] ${className ?? ""}`}
      style={{
        // Bezel: thin dark frame with subtle shading + outer drop shadow
        padding: "8px 8px 10px",
        background:
          "linear-gradient(180deg, #1a1a1d 0%, #0d0d10 50%, #18181b 100%)",
        boxShadow:
          "0 60px 120px -45px rgba(8,30,90,0.45), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.10) inset, 0 -1px 0 rgba(0,0,0,0.4) inset",
        ...style,
      }}
    >
      {/* Inner screen — children render inside this. */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[12px]"
        style={{
          background:
            "radial-gradient(ellipse at top, #0e0f12 0%, #050507 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 2px 14px rgba(0,0,0,0.7)",
        }}
      >
        {/* Notch — sits at the top edge of the inner screen, biting in. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 rounded-b-[11px]"
          style={{
            height: "21px",
            width: "min(16%, 160px)",
            background: "#050507",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(255,255,255,0.02)",
          }}
        >
          {/* Camera dot */}
          <div
            className="absolute left-1/2 top-1/2 size-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "#0a0a0c",
              boxShadow:
                "inset 0 0 0 1px rgba(180,200,255,0.18), 0 0 4px rgba(120,160,255,0.25)",
            }}
          />
        </div>

        {children}
      </div>
    </div>
  );
});
