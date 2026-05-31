import * as React from "react";
import { storefronts } from "@/lib/storefronts";
import { SafeImg } from "../macbook-reveal/safe-img";

/* SÉRA editorial palette — matches the storefront (tilde-screen.tsx). The
   bridge page theme remaps --font-display to Inter, so we reference
   --font-cormorant directly for the serif. */
const PANEL = "#cfe0ea"; // powder blue
const BG = "#fbfaf7"; // warm white
const INK = "#14110f"; // near-black
const INK_SOFT = "#57524c";
const RULE = "#e9e3d9";
const SERIF =
  "var(--font-cormorant), 'Iowan Old Style', Baskerville, Georgia, serif";

const brand = storefronts.find((s) => s.slug === "plain-skin")!;

/**
 * Custom on-brand post-purchase email — the same editorial language as the
 * SÉRA storefront: powder-blue, Cormorant serif, a real product photograph,
 * an unhurried order summary, and a footer that does NOT say "Powered by
 * Shopify".
 */
export function CustomEmail() {
  const serum = brand.products[0];
  const spf = brand.products[3];

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        backgroundColor: BG,
        color: INK,
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Mail app header */}
      <div
        className="flex shrink-0 items-center justify-between px-4 pt-9 pb-2 text-[11px]"
        style={{ borderBottom: `1px solid ${RULE}`, color: INK_SOFT }}
      >
        <span>‹ Inbox</span>
        <span>Your ritual is on its way</span>
        <span>⋯</span>
      </div>

      <div className="px-5 py-4 text-[11px]">
        <p style={{ color: INK_SOFT }}>From: hello@{brand.url}</p>
        <p className="mt-0.5" style={{ color: INK_SOFT }}>
          To: Priya
        </p>

        {/* Brand mark + headline */}
        <div className="mt-6 text-center">
          <span
            className="inline-block"
            style={{
              fontFamily: SERIF,
              fontSize: 13,
              letterSpacing: "0.42em",
              textIndent: "0.42em",
            }}
          >
            {brand.brand}
          </span>
          <h1
            className="mt-3 leading-[1.02]"
            style={{
              fontFamily: SERIF,
              fontSize: 28,
              letterSpacing: "-0.012em",
              textTransform: "uppercase",
            }}
          >
            Your ritual
            <br />
            is on its way
          </h1>
          <p
            className="mt-3 text-[11.5px] leading-snug"
            style={{ color: INK_SOFT }}
          >
            Hi Priya — your serum and SPF leave our Bangalore studio tomorrow
            morning. Tracking lands in your WhatsApp the moment it ships.
          </p>
        </div>

        {/* Hero product — real photograph */}
        <div
          className="mt-6 overflow-hidden rounded-2xl"
          style={{ border: `1px solid ${RULE}` }}
        >
          <SafeImg
            src={serum.image}
            alt={serum.name}
            tint={PANEL}
            className="block w-full object-cover"
            style={{ aspectRatio: "5 / 4" }}
          />
          <div className="px-4 py-3" style={{ backgroundColor: BG }}>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 17,
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
              }}
            >
              {serum.name}
            </p>
            <p
              className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ color: INK_SOFT }}
            >
              30ml · Morning + night
            </p>
            <p className="mt-1.5 text-[11px]" style={{ color: INK }}>
              {serum.price} · paid via Razorpay UPI
            </p>
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-5 space-y-2 text-[11px]">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color: INK_SOFT }}
          >
            Order · #SR-1042
          </p>
          <div className="flex items-center justify-between">
            <span>{serum.name}</span>
            <span>{serum.price}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{spf.name}</span>
            <span>{spf.price}</span>
          </div>
          <div
            className="flex items-center justify-between pt-2"
            style={{ borderTop: `1px solid ${RULE}` }}
          >
            <span className="font-medium">Total</span>
            <span className="font-medium">₹3,540</span>
          </div>
        </div>

        {/* Editorial note */}
        <div
          className="mt-5 rounded-2xl px-4 py-3 text-[11px] leading-snug"
          style={{ backgroundColor: PANEL, color: INK }}
        >
          <p
            className="mb-1 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(20,17,15,0.55)" }}
          >
            While you wait
          </p>
          A three-minute read on layering serum under SPF — written by our
          formulator, not a stock blog.
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-4 w-full rounded-full px-3.5 py-2.5 text-[12px] font-medium"
          style={{ backgroundColor: INK, color: BG }}
        >
          Track your order →
        </button>

        <p
          className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.18em]"
          style={{ color: INK_SOFT }}
        >
          With care — the {brand.brand} studio · Bangalore
        </p>
      </div>
    </div>
  );
}
