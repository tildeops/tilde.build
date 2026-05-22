import type { StorefrontMockup } from "@/lib/storefronts";
import { ProductSilhouette } from "./product-silhouettes";

type Props = {
  brand: StorefrontMockup;
};

const FILM_GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Editorial Tilde-built mockup. Brand-tinted bg, Cormorant Garamond display,
 * brand-accent CTAs with gloss-inset, and code-drawn product silhouettes in
 * place of placeholder images. Inline color values so it ignores host
 * dark-mode like the standard side does — both layers stay self-contained.
 */
export function TildeMockup({ brand }: Props) {
  const { bgHex, inkHex, accentHex } = brand;

  const inkMuted = mixHex(inkHex, bgHex, 0.55);
  const ruleColor = mixHex(inkHex, bgHex, 0.85);
  const tileBg = mixHex(bgHex, accentHex, 0.92);
  const tileEdge = mixHex(bgHex, accentHex, 0.78);

  // First word of headline (everything before space) renders in inkMuted italic
  const [firstWord, ...restWords] = brand.mockupHeadline.split(" ");
  const restHeadline = restWords.join(" ");

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        backgroundColor: bgHex,
        color: inkHex,
        transform: "translateZ(0)",
      }}
    >
      {/* Film grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: FILM_GRAIN_URL,
          opacity: 0.06,
          mixBlendMode: "overlay",
          zIndex: 1,
        }}
      />

      {/* Top nav */}
      <div
        className="relative z-[2] flex shrink-0 items-center justify-between px-6 py-3"
        style={{ borderBottom: `1px solid ${ruleColor}` }}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px]" style={{ color: accentHex }}>
            ~
          </span>
          <span
            className="font-display text-[18px] font-medium leading-none"
            style={{ letterSpacing: "-0.005em" }}
          >
            {brand.brand}
          </span>
        </div>
        <nav className="flex items-center gap-2.5">
          {brand.navItems.map((item, idx) => (
            <span
              key={item}
              className="flex items-center font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: inkMuted }}
            >
              {item}
              {idx < brand.navItems.length - 1 && (
                <span className="mx-2" style={{ color: ruleColor }}>·</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Hero panel — compact 2-column */}
      <div className="relative z-[2] grid shrink-0 grid-cols-12 gap-5 px-6 py-5">
        <div className="col-span-7 flex flex-col justify-center">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: inkMuted }}
          >
            ~ {brand.category.toLowerCase()}
          </p>
          <h2
            className="mt-2 font-display leading-[1.05] tracking-[-0.015em] text-[26px]"
            style={{ color: inkHex }}
          >
            <span className="italic" style={{ color: inkMuted }}>
              {firstWord}
            </span>{" "}
            <span>{restHeadline}</span>
          </h2>
          <p
            className="mt-2 max-w-[38ch] text-[12px] leading-relaxed"
            style={{ color: inkMuted }}
          >
            {brand.mockupDeck}
          </p>
          <div className="mt-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium"
              style={{
                backgroundColor: accentHex,
                color: bgHex,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.22), 0 6px 18px -10px rgba(0,0,0,0.45)",
              }}
            >
              {brand.ctaLabel}
              <svg
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M3 8 H13 M9 4 L13 8 L9 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero side panel — featured product card */}
        <div className="col-span-5 flex">
          <div
            className="relative w-full overflow-hidden rounded-sm p-3"
            style={{
              background: `linear-gradient(160deg, ${tileBg} 0%, ${tileEdge} 100%)`,
              border: `1px solid ${ruleColor}`,
            }}
          >
            <span
              className="absolute right-2 top-2 rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em]"
              style={{ backgroundColor: accentHex, color: bgHex }}
            >
              Featured
            </span>
            <div
              className="flex h-14 items-center justify-center"
              style={{ color: mixHex(inkHex, tileBg, 0.45) }}
            >
              <ProductSilhouette
                shape={brand.products[0].shape}
                className="h-14 w-auto"
              />
            </div>
            <p
              className="mt-1 font-display italic text-[14px] leading-tight"
              style={{ color: inkHex }}
            >
              {brand.products[0].name}
            </p>
            <p
              className="mt-1 font-mono text-[10px] tracking-wider"
              style={{ color: accentHex }}
            >
              {brand.products[0].price}
            </p>
          </div>
        </div>
      </div>

      {/* Section eyebrow row */}
      <div className="relative z-[2] flex shrink-0 items-center justify-between px-6 pb-1.5">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: inkMuted }}
        >
          ~ The collection
        </p>
        <p
          className="font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: inkMuted }}
        >
          04 pieces
        </p>
      </div>

      {/* Product grid 4-up */}
      <div className="relative z-[2] grid flex-1 grid-cols-4 gap-2 px-6 pb-3 min-h-0">
        {brand.products.map((p) => (
          <ProductTile
            key={p.name}
            product={p}
            tileBg={tileBg}
            tileEdge={tileEdge}
            inkHex={inkHex}
            inkMuted={inkMuted}
            accentHex={accentHex}
          />
        ))}
      </div>

      {/* Footer trim */}
      <div
        className="relative z-[2] flex shrink-0 items-center justify-between px-6 py-2"
        style={{ borderTop: `1px solid ${ruleColor}` }}
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: inkMuted }}
        >
          Free ship · ₹2,000+
        </p>
        <p
          className="font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: inkMuted }}
        >
          Made in India
        </p>
        <p
          className="font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: inkMuted }}
        >
          UPI · COD · Razorpay
        </p>
      </div>
    </div>
  );
}

function ProductTile({
  product,
  tileBg,
  tileEdge,
  inkHex,
  inkMuted,
  accentHex,
}: {
  product: StorefrontMockup["products"][number];
  tileBg: string;
  tileEdge: string;
  inkHex: string;
  inkMuted: string;
  accentHex: string;
}) {
  return (
    <div
      className="relative flex min-h-0 flex-col overflow-hidden rounded-sm"
      style={{
        background: `linear-gradient(160deg, ${tileBg} 0%, ${tileEdge} 100%)`,
        border: `1px solid ${tileEdge}`,
      }}
    >
      {product.tag && (
        <span
          className="absolute left-2 top-2 z-[1] rounded-full px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em]"
          style={{ backgroundColor: accentHex, color: tileBg }}
        >
          {product.tag}
        </span>
      )}
      <div
        className="flex flex-1 items-center justify-center min-h-0 pt-2.5 pb-1"
        style={{ color: mixHex(inkHex, tileBg, 0.4) }}
      >
        <ProductSilhouette
          shape={product.shape}
          className="h-12 w-auto"
        />
      </div>
      <div className="shrink-0 px-2 pb-2 pt-0.5">
        <p
          className="truncate font-display italic text-[12px] leading-tight"
          style={{ color: inkHex }}
        >
          {product.name}
        </p>
        <p
          className="mt-0.5 font-mono text-[10px] tracking-wider"
          style={{ color: inkMuted }}
        >
          {product.price}
        </p>
      </div>
    </div>
  );
}

/** Linearly blend two hex colors. ratio=0 → a, ratio=1 → b. */
function mixHex(a: string, b: string, ratio: number): string {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const r = Math.round(pa.r + (pb.r - pa.r) * ratio);
  const g = Math.round(pa.g + (pb.g - pa.g) * ratio);
  const bl = Math.round(pa.b + (pb.b - pa.b) * ratio);
  return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}
