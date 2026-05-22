"use client";

import { forwardRef } from "react";

/**
 * Soft gradient wallpaper + floating dock pill rendered inside the Mac screen.
 * Forwards a ref to the browser-launch icon so the orchestrator can compute
 * the genie pivot via getBoundingClientRect().
 */
export const DesktopBackground = forwardRef<HTMLDivElement>(
  function DesktopBackground(_, browserIconRef) {
    return (
      <>
        {/* Wallpaper */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 30% 0%, #93c5fd 0%, #60a5fa 35%, #3b82f6 65%, #2563eb 100%)",
            zIndex: 1,
          }}
        />

        {/* Faint top-left vignette to seat the wallpaper */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 100%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
            zIndex: 1,
          }}
        />

        {/* Invisible genie anchor — sits where the dock used to be (bottom-center)
            so the browser still launches/minimizes toward this point. */}
        <div
          ref={browserIconRef}
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: "12px",
            zIndex: 5,
            width: 1,
            height: 1,
          }}
        />
      </>
    );
  }
);

type IconVariant =
  | "finder"
  | "browser"
  | "mail"
  | "messages"
  | "calendar"
  | "notes"
  | "settings";

// Kept for reference but no longer rendered.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _DockIcon = forwardRef<
  HTMLDivElement,
  {
    variant: IconVariant;
    colors: [string, string];
    prominent?: boolean;
  }
>(function DockIcon({ variant, colors, prominent }, ref) {
  return (
    <div
      ref={ref}
      className="relative grid size-9 place-items-center rounded-[9px]"
      style={{
        background: `linear-gradient(160deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        boxShadow: prominent
          ? "0 6px 14px -4px rgba(8,30,90,0.55), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.25)"
          : "0 4px 10px -4px rgba(8,30,90,0.4), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)",
      }}
    >
      <IconGlyph variant={variant} />
    </div>
  );
});

function IconGlyph({ variant }: { variant: IconVariant }) {
  const stroke = "rgba(255,255,255,0.92)";
  const size = 18;
  switch (variant) {
    case "browser":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
      );
    case "finder":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          <circle cx="9" cy="9" r="1.2" />
          <circle cx="15" cy="9" r="1.2" />
          <path d="M9 15c1 1 5 1 6 0" />
        </svg>
      );
    case "mail":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M4 8l8 6 8-6" />
        </svg>
      );
    case "messages":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
          <path d="M5 6h12a2 2 0 012 2v6a2 2 0 01-2 2h-5l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      );
    case "calendar":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <path d="M8 4v4M16 4v4M4 11h16" />
        </svg>
      );
    case "notes":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          <path d="M7 5h10v14H7z" />
          <path d="M9 9h6M9 12h6M9 15h4" />
        </svg>
      );
    case "settings":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M6 18l1.5-1.5M16.5 7.5L18 6" />
        </svg>
      );
  }
}
