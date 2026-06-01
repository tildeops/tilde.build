import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Unified width for every single-phone mockup across the site. One ceiling +
 * one height-overhead so the phones come out IDENTICAL in width wherever they
 * appear (previously each section computed its own, so they drifted unequal and
 * too narrow). The `calc((100svh - 256px) * 9/19)` clamp keeps the tall 9/19
 * frame fully visible inside a sticky `h-[100svh]` stage; 264px is the copy
 * overhead each section reserves above the phone. Tune in one place if needed.
 */
export const PHONE_FRAME_WIDTH =
  "w-full max-w-[min(300px,calc((100svh-264px)*9/19))] md:max-w-none md:w-[300px] lg:w-[320px]";

type Props = {
  children: React.ReactNode;
  /** Width/positioning classes for the outer bezel. Defaults to PHONE_FRAME_WIDTH. */
  className?: string;
  /**
   * Padding on the inner content layer. Default `pt-10` clears the notch; pass
   * `""` for full-bleed screens (e.g. a storefront wipe) where the notch should
   * simply overlay the content.
   */
  contentClassName?: string;
};

/**
 * The single source of truth for the iPhone-style device mockup: gradient
 * bezel, %-based side buttons, rounded screen, and notch. All phone mockups
 * route through this so their dimensions stay consistent.
 */
export function PhoneFrame({
  children,
  className = PHONE_FRAME_WIDTH,
  contentClassName = "pt-10",
}: Props) {
  return (
    <div
      className={cn(
        "relative mx-auto rounded-[44px] p-2.5 shadow-[0_40px_90px_-40px_rgba(8,30,90,0.55)]",
        className,
      )}
      style={{
        background:
          "linear-gradient(180deg, #1a1a1c 0%, #0e0e10 55%, #1a1a1c 100%)",
        aspectRatio: "9 / 19",
      }}
    >
      {/* Side button hints — %-based so they scale with the frame */}
      <span
        className="absolute -left-[3px] top-[18%] h-10 w-1 rounded-l-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />
      <span
        className="absolute -left-[3px] top-[28%] h-16 w-1 rounded-l-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />
      <span
        className="absolute -right-[3px] top-[24%] h-20 w-1 rounded-r-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />

      {/* Screen */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[34px] bg-white"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 8px rgba(0,0,0,0.6)",
        }}
      >
        <div className={cn("absolute inset-0", contentClassName)}>{children}</div>

        {/* Notch — overlays the content */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-2 z-30 h-6 w-24 -translate-x-1/2 rounded-full"
          style={{ background: "#0a0a0a" }}
        />
      </div>
    </div>
  );
}
