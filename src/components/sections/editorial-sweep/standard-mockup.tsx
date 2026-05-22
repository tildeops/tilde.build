import type { StorefrontMockup } from "@/lib/storefronts";

type Props = {
  brand: StorefrontMockup;
};

const SHOPIFY_GREEN = "#008060";
const STANDARD_BG = "#ffffff";
const STANDARD_INK = "#1a1a1a";
const STANDARD_MUTED = "#666666";
const STANDARD_RULE = "#e6e6e6";
const STANDARD_PLACEHOLDER = "#f2f2f2";

/**
 * Generic Shopify-template mockup. Hard-coded inline color values so it stays
 * flat white even when the host site is in dark mode. No CSS custom properties
 * are consumed here — that's the dark-mode-immunity contract.
 */
export function StandardMockup({ brand }: Props) {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        backgroundColor: STANDARD_BG,
        color: STANDARD_INK,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif",
        transform: "translateZ(0)",
      }}
    >
      {/* Top nav */}
      <div
        className="flex shrink-0 items-center justify-between px-5 py-2.5"
        style={{ borderBottom: `1px solid ${STANDARD_RULE}` }}
      >
        <div
          className="text-[15px] font-bold"
          style={{ color: STANDARD_INK, letterSpacing: "-0.01em" }}
        >
          {brand.brand}
        </div>
        <nav className="flex items-center gap-4 text-[12px]">
          {brand.navItems.map((item) => (
            <span key={item} style={{ color: STANDARD_INK }}>
              {item}
            </span>
          ))}
          <span
            className="ml-1 rounded-sm px-2 py-0.5 text-[11px] font-medium"
            style={{ backgroundColor: STANDARD_PLACEHOLDER, color: STANDARD_INK }}
          >
            Cart (0)
          </span>
        </nav>
      </div>

      {/* Hero panel — compact 2-column */}
      <div className="grid shrink-0 grid-cols-12 gap-4 px-5 py-4">
        <div className="col-span-7 flex flex-col justify-center">
          <p
            className="text-[10px] uppercase tracking-wide"
            style={{ color: STANDARD_MUTED }}
          >
            New collection
          </p>
          <h2
            className="mt-1 text-[20px] font-bold leading-[1.15]"
            style={{ color: STANDARD_INK, letterSpacing: "-0.01em" }}
          >
            Welcome to {brand.brand}
          </h2>
          <p
            className="mt-1 text-[12px] leading-snug"
            style={{ color: STANDARD_MUTED }}
          >
            Shop our newest arrivals. Free shipping on orders over ₹2,000.
          </p>
          <div className="mt-2.5">
            <button
              type="button"
              className="rounded-sm px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: SHOPIFY_GREEN, color: "#ffffff" }}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Hero "image" placeholder — short bar to keep vertical compact */}
        <div
          className="col-span-5 flex h-24 items-center justify-center rounded-sm"
          style={{
            backgroundColor: STANDARD_PLACEHOLDER,
            border: `1px solid ${STANDARD_RULE}`,
          }}
        >
          <PlaceholderImageIcon stroke={STANDARD_MUTED} />
        </div>
      </div>

      {/* Section heading row */}
      <div
        className="flex shrink-0 items-center justify-between px-5 pb-1.5"
      >
        <h3
          className="text-[13px] font-semibold"
          style={{ color: STANDARD_INK }}
        >
          Featured Products
        </h3>
        <span className="text-[11px]" style={{ color: STANDARD_MUTED }}>
          View all →
        </span>
      </div>

      {/* Product grid 4-up — tight cards */}
      <div className="grid flex-1 grid-cols-4 gap-2 px-5 pb-3 min-h-0">
        {brand.products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col overflow-hidden rounded-sm min-h-0"
            style={{ border: `1px solid ${STANDARD_RULE}` }}
          >
            <div
              className="flex flex-1 items-center justify-center min-h-0"
              style={{ backgroundColor: STANDARD_PLACEHOLDER, minHeight: "40px" }}
            >
              <PlaceholderImageIcon stroke={STANDARD_MUTED} small />
            </div>
            <div className="shrink-0 px-2 pt-1.5 pb-2">
              <p
                className="truncate text-[11px] font-medium"
                style={{ color: STANDARD_INK }}
              >
                {p.name}
              </p>
              <p
                className="mt-0.5 text-[10px]"
                style={{ color: STANDARD_MUTED }}
              >
                {p.price}
              </p>
              <button
                type="button"
                className="mt-1.5 w-full rounded-sm py-1 text-[9px] font-semibold uppercase tracking-wide"
                style={{ backgroundColor: SHOPIFY_GREEN, color: "#ffffff" }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer trim */}
      <div
        className="shrink-0 px-5 py-2 text-center text-[10px]"
        style={{
          color: STANDARD_MUTED,
          borderTop: `1px solid ${STANDARD_RULE}`,
        }}
      >
        © 2025 {brand.brand} · Powered by Shopify
      </div>
    </div>
  );
}

function PlaceholderImageIcon({
  stroke,
  small = false,
}: {
  stroke: string;
  small?: boolean;
}) {
  const size = small ? 18 : 28;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.25}
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M3 16 L9 11 L13 14 L18 9 L21 12" />
    </svg>
  );
}
