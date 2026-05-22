"use client";

import { forwardRef, type RefObject } from "react";
import type { StorefrontMockup } from "@/lib/storefronts";
import { DefaultScreen } from "./default-screen";
import { TildeScreen } from "./tilde-screen";

export type BrowserRefs = {
  /** Wrapper around DefaultScreen — orchestrator translates Y to scroll through. */
  defaultScrollRef: RefObject<HTMLDivElement | null>;
  /** Wrapper around TildeScreen — orchestrator translates Y to scroll through. */
  tildeScrollRef: RefObject<HTMLDivElement | null>;
  /** Width-clip mask that reveals the Tilde version 0% → 100%. */
  tildeClipRef: RefObject<HTMLDivElement | null>;
  /** Accent vertical handle that tracks the wipe position. */
  separatorRef: RefObject<HTMLDivElement | null>;
  /** The visible viewport inside the browser (used to measure scroll distances). */
  screensAreaRef: RefObject<HTMLDivElement | null>;
};

/**
 * The browser window that launches from the dock. Single-brand: the tab title
 * and address-bar URL are static. The screens area is a fixed viewport with
 * two long content layers (default + tilde) translated on the Y axis by the
 * orchestrator to drive the scroll-through.
 */
export const AnimatedBrowser = forwardRef<
  HTMLDivElement,
  { brand: StorefrontMockup; refs: BrowserRefs }
>(function AnimatedBrowser({ brand, refs }, ref) {
  const {
    defaultScrollRef,
    tildeScrollRef,
    tildeClipRef,
    separatorRef,
    screensAreaRef,
  } = refs;

  return (
    <div
      ref={ref}
      className="absolute z-[5] overflow-hidden rounded-[10px] bg-white"
      style={{
        top: "32px",
        bottom: "20px",
        // Starts on the RIGHT side (default phase). Orchestrator slides it to
        // the LEFT side during the wipe so the Tilde version takes the left.
        left: "26%",
        right: "3%",
        opacity: 0,
        willChange: "transform, opacity",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05), 0 30px 60px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      {/* Tab strip */}
      <div className="relative z-10 flex h-[30px] items-end gap-1.5 bg-[#ececec] px-3">
        <div className="relative -mb-px flex h-[26px] min-w-[180px] max-w-[260px] items-center gap-2 rounded-t-[8px] bg-white px-3">
          <span className="size-2.5 rounded-full bg-gradient-to-br from-[var(--color-accent-bright,#3b82f6)] to-[var(--color-accent,#155DFC)]" />
          <span className="flex-1 truncate font-mono text-[10px] text-black/70">
            {brand.brand}
          </span>
          <span className="ml-2 text-[10px] text-black/30">×</span>
        </div>
        <div className="-mb-px flex h-[22px] w-[130px] items-center rounded-t-[8px] bg-black/[0.04] px-3 text-[10px] text-black/40 truncate">
          shopify admin
        </div>
        <div className="-mb-px grid size-[22px] place-items-center rounded-t-[8px] bg-black/[0.03] text-[12px] text-black/30">
          +
        </div>
      </div>

      {/* Address bar */}
      <div className="relative z-10 flex shrink-0 items-center gap-1.5 border-b border-black/[0.06] bg-[#f6f6f6] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />

        <div className="ml-3 flex flex-1 items-center justify-center">
          <div
            className="relative flex h-6 w-full max-w-[460px] items-center justify-center rounded-md border border-black/[0.06] bg-white px-2"
            style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)" }}
          >
            <span className="mr-1 text-[10px] text-black/40">🔒</span>
            <span className="font-mono text-[11px] text-black/60">
              <span className="opacity-50">https://</span>
              {brand.url}
            </span>
          </div>
        </div>

        <span className="w-[50px]" />
      </div>

      {/* Screens area — fixed-height viewport, content scrolls inside via GSAP. */}
      <div
        ref={screensAreaRef}
        className="relative h-[calc(100%-30px-37px)] w-full overflow-hidden"
      >
        {/* Default screen layer — orchestrator translates Y for scroll-through. */}
        <div
          ref={defaultScrollRef}
          className="absolute inset-x-0 top-0"
          style={{ zIndex: 1, willChange: "transform" }}
        >
          <DefaultScreen brand={brand} />
        </div>

        {/* Tilde clip — width sweeps 0% → 100% during the wipe. */}
        <div
          ref={tildeClipRef}
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: "0%", zIndex: 2, willChange: "width" }}
        >
          {/* Inner sized via JS to match the browser viewport width, so the
              tilde version fills the entire revealed area no matter how wide
              the browser is on the current viewport. */}
          <div
            data-tilde-inner
            className="relative h-full"
            style={{ width: "100vw" }}
          >
            <div
              ref={tildeScrollRef}
              className="absolute inset-x-0 top-0"
              style={{ willChange: "transform" }}
            >
              <TildeScreen brand={brand} />
            </div>
          </div>
        </div>

        {/* Separator handle */}
        <div
          ref={separatorRef}
          className="absolute inset-y-0 z-[3] flex items-center"
          style={{
            left: "0%",
            width: "2px",
            backgroundColor: "var(--color-accent)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.2), 0 0 24px rgb(var(--accent-rgb) / 0.45)",
            transform: "translateX(-1px)",
            opacity: 0,
            willChange: "left, opacity",
          }}
          aria-hidden
        >
          <div
            className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-on-accent"
            style={{
              backgroundColor: "var(--color-accent)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.25), 0 8px 24px -8px rgba(0,0,0,0.5)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M5 4 L1 8 L5 12 M11 4 L15 8 L11 12 M1 8 H15" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});
