import * as React from "react";
import type { StorefrontMockup } from "@/lib/storefronts";
import { SafeImg } from "./safe-img";

type Props = { brand: StorefrontMockup };

/**
 * Generic Shopify-template storefront — long-form for the scroll-through
 * mechanic. Same real product photography as the Tilde build, but dropped into
 * a deliberately bland default theme: system fonts, Shopify-green CTAs, cramped
 * grids, a coupon pop-up, lazy section repetition, "Powered by Shopify". The
 * contrast is design quality, not real-vs-placeholder.
 */
export function DefaultScreen({ brand }: Props) {
  // A flat pool of every available photo, reused across the bland sections.
  const gallery = [
    ...brand.products.map((p) => p.image),
    ...(brand.lookbookImages ?? []),
    ...(brand.statement?.images ?? []),
  ].filter(Boolean) as string[];

  return (
    <div
      className="relative bg-white text-[#1a1a1a]"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif",
      }}
    >
      {/* Top nav */}
      <div className="flex items-center justify-between border-b border-[#ececec] px-5 py-2.5">
        <span className="text-[13px] font-bold tracking-tight">
          {brand.brand}
        </span>
        <nav className="flex items-center gap-4 text-[11px] text-[#555]">
          {brand.navItems.map((n) => (
            <span key={n}>{n}</span>
          ))}
          <span className="rounded-sm bg-[#f1f1f1] px-2 py-0.5 text-[11px] font-medium text-[#222]">
            Cart (0)
          </span>
        </nav>
      </div>

      {/* Hero banner */}
      <div
        className="relative flex items-center justify-between gap-6 px-5 py-8"
        style={{
          background:
            "linear-gradient(135deg, #e4e4e4 0%, #d8d8d8 40%, #f2f2f2 100%)",
        }}
      >
        <div className="max-w-[55%]">
          <p className="text-[9px] uppercase tracking-wide text-[#777]">
            New collection
          </p>
          <h2 className="mt-1 text-[18px] font-extrabold leading-tight">
            Welcome to {brand.brand}!
          </h2>
          <p className="mt-1 text-[11px] text-[#555]">
            Shop our newest arrivals. Free shipping over ₹2,000.
          </p>
          <button
            type="button"
            className="mt-2.5 rounded-sm bg-[#008060] px-3 py-1.5 text-[11px] font-semibold text-white"
          >
            Shop Now
          </button>
        </div>
        <SafeImg
          src={brand.products[0].image}
          alt={brand.products[0].name}
          tint="#e0e0e0"
          className="size-[88px] shrink-0 rounded-md border border-[#cfcfcf] object-cover"
        />
      </div>

      {/* Featured products */}
      <ProductBand title="Featured products" products={brand.products} />

      {/* Marketing banner #1 */}
      <div
        className="flex items-center justify-center gap-3 px-5 py-3 text-center"
        style={{ background: "#fef9e7" }}
      >
        <p className="text-[11px] font-semibold text-[#7c6f1a]">
          🚚  FREE SHIPPING ON ORDERS ABOVE ₹2,000  •  COD AVAILABLE  •
          EASY 30-DAY RETURNS
        </p>
      </div>

      {/* Best sellers — identical treatment */}
      <ProductBand title="Best sellers" products={brand.products} />

      {/* Customer testimonials */}
      <div className="border-b border-t border-[#ececec] bg-[#fafafa] px-5 py-6">
        <p className="text-[12px] font-semibold">What customers are saying</p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[
            "Love this stuff! Will def buy again ⭐",
            "Took a while to ship but worth it.",
            "5 stars. Highly recommend to anyone.",
          ].map((q, i) => (
            <div
              key={i}
              className="rounded-sm border border-[#dedede] bg-white px-3 py-3"
            >
              <p className="text-[10px] text-[#f5b300]">★★★★★</p>
              <p className="mt-1 text-[11px] text-[#333] leading-snug">{q}</p>
              <p className="mt-2 text-[9px] text-[#888]">
                — Verified Buyer
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* As seen in / press strip */}
      <div className="grid grid-cols-5 gap-4 px-5 py-5 text-center">
        {["VOGUE", "ELLE", "HARPER'S", "GQ", "FORBES"].map((n) => (
          <p
            key={n}
            className="text-[10px] font-bold tracking-[0.18em] text-[#aaa]"
          >
            {n}
          </p>
        ))}
      </div>

      {/* Newsletter strip */}
      <div className="border-t border-[#ececec] bg-[#f6f6f6] px-5 py-7 text-center">
        <p className="text-[14px] font-bold">Sign up & get 10% off!</p>
        <p className="mt-1 text-[10px] text-[#666]">
          Be the first to know about new launches and special offers.
        </p>
        <div className="mx-auto mt-3 flex max-w-[300px] items-stretch gap-1">
          <input
            type="email"
            placeholder="enter your email"
            className="flex-1 rounded-sm border border-[#dedede] bg-white px-2 text-[11px] text-[#444]"
            readOnly
          />
          <button
            type="button"
            className="rounded-sm bg-[#1a1a1a] px-3 text-[11px] font-semibold text-white"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Follow us on Instagram */}
      <div className="px-5 py-5">
        <div className="flex items-end justify-between">
          <p className="text-[12px] font-semibold">@{brand.brand.toLowerCase().replace(/\s/g, "")}</p>
          <p className="text-[10px] text-[#888]">Follow us on Instagram →</p>
        </div>
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SafeImg
              key={i}
              src={gallery[i % gallery.length]}
              alt=""
              tint="#e6e6e6"
              className="aspect-square rounded-sm border border-[#dedede] object-cover"
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#ececec] bg-[#fafafa] px-5 py-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { h: "Shop", items: ["All products", "New arrivals", "Best sellers", "On sale"] },
            { h: "Help", items: ["Contact us", "Shipping", "Returns", "FAQ"] },
            { h: "About", items: ["Our story", "Sustainability", "Press", "Careers"] },
            { h: "Legal", items: ["Privacy", "Terms", "Cookies", "Refunds"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#444]">
                {col.h}
              </p>
              <div className="mt-2 space-y-1">
                {col.items.map((it) => (
                  <p key={it} className="text-[10px] text-[#888]">
                    {it}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#ececec] pt-3 text-[9px] text-[#999]">
          <span>© {new Date().getFullYear()} {brand.brand}. All rights reserved.</span>
          <span>Powered by Shopify</span>
        </div>
      </div>

      {/* Cookie / coupon pop-up — absolute, scrolls WITH the page (classic Shopify popup) */}
      <div
        className="absolute left-3 z-10 max-w-[180px] rounded-md border border-[#d4d4d4] bg-white p-2.5 shadow-md"
        style={{ top: "200px" }}
        aria-hidden
      >
        <p className="text-[10px] font-semibold">Get 10% off!</p>
        <p className="mt-0.5 text-[9px] text-[#666]">
          Subscribe for instant savings.
        </p>
        <div className="mt-1.5 flex gap-1">
          <div className="h-5 flex-1 rounded-sm border border-[#dedede] bg-[#f6f6f6]" />
          <button
            type="button"
            className="rounded-sm bg-[#1a1a1a] px-2 text-[9px] font-semibold text-white"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable product band: section header + 4-col grid */
function ProductBand({
  title,
  products,
}: {
  title: string;
  products: StorefrontMockup["products"];
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-[#ececec] px-5 py-3">
        <p className="text-[12px] font-semibold">{title}</p>
        <p className="text-[10px] text-[#888]">View all →</p>
      </div>
      <div className="grid grid-cols-4 gap-3 px-5 py-4">
        {products.map((p) => (
          <div key={p.name} className="flex flex-col">
            <SafeImg
              src={p.image}
              alt={p.name}
              tint="#f0f0f0"
              className="aspect-square w-full rounded-sm border border-[#dedede] object-cover"
            />
            <p className="mt-1.5 truncate text-[11px] font-medium">{p.name}</p>
            <p className="text-[10px] text-[#666]">From {p.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}
