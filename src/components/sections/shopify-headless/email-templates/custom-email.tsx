import * as React from "react";

const BRAND_ACCENT = "#2d3a2a";
const BRAND_BG = "#f1ede3";
const BRAND_INK = "#1a1f1a";

/**
 * Custom on-brand email — Cormorant display headings, brand-tinted parchment
 * background, ritual-led copy, hero product, footer that doesn't say "Powered
 * by Shopify".
 */
export function CustomEmail() {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      style={{
        backgroundColor: BRAND_BG,
        color: BRAND_INK,
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Mail app header */}
      <div
        className="flex shrink-0 items-center justify-between px-4 pt-9 pb-2 text-[11px]"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.5)" }}
      >
        <span>‹ Inbox</span>
        <span>Your routine is on its way</span>
        <span>⋯</span>
      </div>

      <div className="px-5 py-4 text-[11px]">
        <p style={{ color: "rgba(0,0,0,0.55)" }}>From: hello@plainskin.in</p>
        <p className="mt-0.5" style={{ color: "rgba(0,0,0,0.55)" }}>
          To: Priya
        </p>

        {/* Brand mark + headline */}
        <div className="mt-5 text-center">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: BRAND_ACCENT }}
          >
            ~ Plain Skin
          </span>
          <h1
            className="mt-3 font-display leading-[1.05] tracking-[-0.015em]"
            style={{
              fontSize: 26,
              fontFamily: "var(--font-display)",
            }}
          >
            Your routine is{" "}
            <span style={{ fontStyle: "italic", color: "rgba(0,0,0,0.55)" }}>
              on its way.
            </span>
          </h1>
          <p
            className="mt-3 text-[11.5px] leading-snug"
            style={{ color: "rgba(0,0,0,0.65)" }}
          >
            Hi Priya — your serum and SPF leave our warehouse in Bangalore
            tomorrow morning. Tracking lands in your WhatsApp the moment it
            ships.
          </p>
        </div>

        {/* Hero product card */}
        <div
          className="mt-5 overflow-hidden rounded-2xl"
          style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div
            className="flex aspect-[5/3] items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(45,58,42,0.10) 0%, rgba(45,58,42,0.04) 100%)",
            }}
          >
            <svg
              viewBox="0 0 64 64"
              width={64}
              height={64}
              fill="none"
              stroke={BRAND_INK}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.9}
            >
              <path d="M28 8h8v8c0 2 2 4 2 6v32c0 3-3 6-6 6h-4c-3 0-6-3-6-6V22c0-2 2-4 2-6V8z" />
              <line x1="24" y1="36" x2="40" y2="36" />
            </svg>
          </div>
          <div className="px-3 py-3">
            <p className="font-display text-[15px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Hydrating Serum
            </p>
            <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.55)" }}>
              30ml · Use AM + PM
            </p>
            <p className="mt-1 text-[10px]" style={{ color: BRAND_ACCENT }}>
              ₹1,890 · paid via Razorpay UPI
            </p>
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-4 space-y-2 text-[11px]">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(0,0,0,0.45)" }}
          >
            Order · #PS-1042
          </p>
          <div className="flex items-center justify-between">
            <span>Hydrating Serum</span>
            <span>₹1,890</span>
          </div>
          <div className="flex items-center justify-between">
            <span>SPF 40 Daily</span>
            <span>₹1,650</span>
          </div>
          <div
            className="flex items-center justify-between pt-2"
            style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
          >
            <span className="font-medium">Total</span>
            <span className="font-medium">₹3,540</span>
          </div>
        </div>

        {/* Ritual prompt */}
        <div
          className="mt-5 rounded-2xl px-4 py-3 text-[11px] leading-snug"
          style={{
            background: "rgba(45,58,42,0.08)",
            color: BRAND_INK,
            border: "1px solid rgba(45,58,42,0.18)",
          }}
        >
          <p
            className="font-mono text-[9px] uppercase tracking-[0.22em] mb-1"
            style={{ color: BRAND_ACCENT }}
          >
            While you wait
          </p>
          A 3-minute read on layering serums with SPF — written by our
          formulator, not a stock blog.
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-4 w-full rounded-full px-3.5 py-2 text-[12px] font-medium text-white gloss-inset"
          style={{ backgroundColor: BRAND_ACCENT }}
        >
          Track your order →
        </button>

        <p
          className="mt-5 text-center text-[9px]"
          style={{ color: "rgba(0,0,0,0.4)" }}
        >
          With care, the Plain Skin team · Bangalore
        </p>
      </div>
    </div>
  );
}
