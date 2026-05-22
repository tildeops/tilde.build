import * as React from "react";
import type { StorefrontMockup } from "@/lib/storefronts";

type Props = { brand: StorefrontMockup };

/**
 * Editorial Tilde-built storefront — designed long-form for the scroll-through
 * mechanic. Oversized type, halftone textures, asymmetric grid, ritual-led
 * narrative. Designed specifically for Plain Skin but driven from brand data
 * so other brands still render correctly.
 */
export function TildeScreen({ brand }: Props) {
  const { bgHex, inkHex, accentHex } = brand;
  const inkMuted = mix(inkHex, bgHex, 0.55);
  const inkSoft = mix(inkHex, bgHex, 0.75);
  const ruleColor = mix(inkHex, bgHex, 0.86);
  const accentSoft = mix(bgHex, accentHex, 0.92);
  const accentMid = mix(bgHex, accentHex, 0.78);

  const halftoneId = `halftone-${brand.slug}`;

  return (
    <div style={{ backgroundColor: bgHex, color: inkHex }}>
      {/* SVG defs for halftone dot pattern */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden
        focusable="false"
      >
        <defs>
          <pattern
            id={halftoneId}
            x="0"
            y="0"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={inkHex} opacity="0.5" />
          </pattern>
        </defs>
      </svg>

      {/* ─── Nav ───────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-8 py-4"
        style={{ borderBottom: `1px solid ${ruleColor}` }}
      >
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-mono text-[11px] leading-none"
            style={{ color: accentHex }}
          >
            ~
          </span>
          <span
            className="font-display text-[17px] font-medium leading-none"
            style={{ letterSpacing: "-0.005em" }}
          >
            {brand.brand}
          </span>
        </div>
        <nav className="flex items-center gap-6">
          {brand.navItems.map((n) => (
            <span
              key={n}
              className="font-mono text-[9px] uppercase tracking-[0.22em]"
              style={{ color: inkMuted }}
            >
              {n}
            </span>
          ))}
        </nav>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.22em]"
          style={{ color: inkSoft }}
        >
          Cart · 0
        </span>
      </div>

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <div className="relative grid grid-cols-12 gap-4 px-8 pt-14 pb-20">
        {/* Halftone overlay top-right of hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-44 w-44"
          style={{
            background: `url(#${halftoneId})`,
            fill: `url(#${halftoneId})`,
            opacity: 0.08,
            backgroundImage: `radial-gradient(${inkHex} 0.8px, transparent 0.9px)`,
            backgroundSize: "8px 8px",
          }}
        />

        <div className="relative z-10 col-span-7 flex flex-col justify-end">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: inkMuted }}
          >
            A {brand.noun} reimagined
          </p>
          <h1
            className="mt-4 font-display font-medium"
            style={{
              color: inkHex,
              fontSize: "62px",
              lineHeight: "0.96",
              letterSpacing: "-0.025em",
            }}
          >
            {brand.mockupHeadline}
          </h1>
          <p
            className="mt-6 max-w-[38ch] text-[13px] leading-[1.55]"
            style={{ color: inkSoft }}
          >
            {brand.mockupDeck}
          </p>
          <div className="mt-7 flex items-center gap-4">
            <button
              type="button"
              className="rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: accentHex }}
            >
              {brand.ctaLabel} →
            </button>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: inkMuted }}
            >
              Edition I · 4 pieces
            </span>
          </div>
        </div>

        {/* Bleed-out hero silhouette */}
        <div className="relative col-span-5">
          <div
            className="absolute inset-y-0 right-[-32px] w-[calc(100%+32px)]"
            style={{
              background: `linear-gradient(180deg, ${accentSoft} 0%, ${accentMid} 100%)`,
            }}
          />
          <div className="relative flex h-full items-end justify-center pb-2 pt-6">
            <ProductGlyph
              shape={brand.products[0].shape}
              accent={accentHex}
              ink={inkHex}
              size={220}
              stroke={1.6}
            />
          </div>
        </div>
      </div>

      {/* ─── Pull-quote band ───────────────────────────────────── */}
      <div
        className="px-12 py-12 text-center"
        style={{
          backgroundColor: accentSoft,
          borderTop: `1px solid ${ruleColor}`,
          borderBottom: `1px solid ${ruleColor}`,
        }}
      >
        <p
          className="font-mono text-[9px] uppercase tracking-[0.28em]"
          style={{ color: inkMuted }}
        >
          On ritual
        </p>
        <p
          className="mx-auto mt-4 max-w-[58ch] italic"
          style={{
            color: inkHex,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "20px",
            lineHeight: "1.45",
            letterSpacing: "-0.005em",
          }}
        >
          “{brand.tildeBullets[0]}. Layouts that make room for the routine
          itself — not for a hundred competing pop-ups.”
        </p>
        <p
          className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em]"
          style={{ color: inkSoft }}
        >
          — From the journal
        </p>
      </div>

      {/* ─── The ritual ─ 3 steps ──────────────────────────────── */}
      <div className="px-8 pt-12 pb-10">
        <SectionLabel
          left="The ritual"
          right="Morning + night"
          inkMuted={inkMuted}
          ruleColor={ruleColor}
        />
        <div className="mt-7 grid grid-cols-3 gap-8">
          {[
            { num: "01", name: brand.products[2].name, line: "Cool water. Two pumps. No squeak." },
            { num: "02", name: brand.products[0].name, line: "Press into damp skin. Wait." },
            { num: "03", name: brand.products[1].name, line: "A pea, where it's dry." },
          ].map((s) => (
            <div key={s.num}>
              <p
                className="font-display"
                style={{
                  color: accentHex,
                  fontSize: "44px",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.num}
              </p>
              <p
                className="mt-3 font-display text-[18px]"
                style={{ color: inkHex, letterSpacing: "-0.01em" }}
              >
                {s.name}
              </p>
              <p
                className="mt-2 text-[12px] leading-relaxed"
                style={{ color: inkSoft }}
              >
                {s.line}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── The collection — asymmetric 12-col ────────────────── */}
      <div className="px-8 pt-10 pb-14">
        <SectionLabel
          left="The collection"
          right={`${brand.products.length} pieces · Edition I`}
          inkMuted={inkMuted}
          ruleColor={ruleColor}
        />
        <div className="mt-6 grid grid-cols-12 gap-3">
          {/* Hero product — big tile spanning 7 cols x 2 rows */}
          <ProductTile
            product={brand.products[0]}
            edition="EDITION 01"
            inkHex={inkHex}
            inkSoft={inkSoft}
            accentHex={accentHex}
            ruleColor={ruleColor}
            tintFrom={accentSoft}
            tintTo={accentMid}
            className="col-span-7 row-span-2"
            glyphSize={140}
            featured
          />
          {/* Three smaller products stacked in the remaining 5 cols */}
          {brand.products.slice(1, 4).map((p, i) => (
            <ProductTile
              key={p.name}
              product={p}
              edition={`EDITION 0${i + 2}`}
              inkHex={inkHex}
              inkSoft={inkSoft}
              accentHex={accentHex}
              ruleColor={ruleColor}
              tintFrom={mix(bgHex, accentHex, 0.95)}
              tintTo={mix(bgHex, accentHex, 0.88)}
              className="col-span-5"
              glyphSize={56}
              horizontal
            />
          ))}
        </div>
      </div>

      {/* ─── Lookbook strip ────────────────────────────────────── */}
      <div className="px-8 pt-2 pb-12">
        <SectionLabel
          left="Lookbook"
          right={`Studied · ${brand.products.length} frames`}
          inkMuted={inkMuted}
          ruleColor={ruleColor}
        />
        <div className="mt-5 grid grid-cols-3 gap-3">
          {brand.products.slice(0, 3).map((p, i) => (
            <div key={p.name} className="flex flex-col">
              <div
                className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md"
                style={{
                  background: mix(bgHex, accentHex, 0.92 - i * 0.06),
                  border: `1px solid ${ruleColor}`,
                }}
              >
                {/* Halftone overlay via repeating radial-gradient */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(${inkHex} 0.7px, transparent 0.85px)`,
                    backgroundSize: "7px 7px",
                    opacity: 0.07,
                  }}
                />
                <ProductGlyph
                  shape={p.shape}
                  accent={accentHex}
                  ink={inkHex}
                  size={88}
                  stroke={1.4}
                />
              </div>
              <p
                className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: inkMuted }}
              >
                No. 0{i + 1} — {p.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Stats strip ───────────────────────────────────────── */}
      <div
        className="grid grid-cols-3 px-8 py-12"
        style={{
          borderTop: `1px solid ${ruleColor}`,
          borderBottom: `1px solid ${ruleColor}`,
        }}
      >
        {brand.stat.map((s, i) => (
          <div
            key={s}
            className={
              i < brand.stat.length - 1 ? "border-r pr-8" : "pr-8"
            }
            style={
              i < brand.stat.length - 1
                ? { borderColor: ruleColor }
                : undefined
            }
          >
            <p
              className="font-display"
              style={{
                color: inkHex,
                fontSize: "32px",
                lineHeight: "1",
                letterSpacing: "-0.018em",
              }}
            >
              {s}
            </p>
            <p
              className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: inkMuted }}
            >
              {["The brand", "Time on tools", "Performance"][i]}
            </p>
          </div>
        ))}
      </div>

      {/* ─── Founder note ──────────────────────────────────────── */}
      <div className="px-8 pt-14 pb-16 text-center">
        <p
          className="font-mono text-[9px] uppercase tracking-[0.28em]"
          style={{ color: inkMuted }}
        >
          A note
        </p>
        <p
          className="mx-auto mt-4 max-w-[52ch] italic"
          style={{
            color: inkSoft,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "15px",
            lineHeight: "1.65",
            letterSpacing: "-0.003em",
          }}
        >
          We built {brand.brand} the way we'd build anything we wanted to use
          ourselves. {brand.tildeBullets[1]}. {brand.tildeBullets[2]}. Slow on
          purpose.
        </p>
        <svg
          width="100"
          height="28"
          viewBox="0 0 100 28"
          fill="none"
          stroke={inkHex}
          strokeWidth="1.2"
          strokeLinecap="round"
          className="mx-auto mt-6"
          aria-hidden
        >
          <path d="M4 18 C 10 8, 18 6, 22 14 S 30 22, 38 14 L 46 18 C 54 8, 62 14, 68 12 S 80 22, 92 12" />
        </svg>
        <p
          className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: inkMuted }}
        >
          Founder · {brand.brand}
        </p>
      </div>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-8 py-5"
        style={{ borderTop: `1px solid ${ruleColor}` }}
      >
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[10px]" style={{ color: accentHex }}>
            ~
          </span>
          <span className="font-display text-[13px]" style={{ color: inkHex }}>
            {brand.brand}
          </span>
          <span
            className="ml-2 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color: inkSoft }}
          >
            © Edition I
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em]"
          style={{ backgroundColor: inkHex, color: bgHex }}
        >
          <span style={{ color: accentHex }}>~</span> Built by Tilde ↗
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Small inline sub-components                                     */
/* ────────────────────────────────────────────────────────────── */

function SectionLabel({
  left,
  right,
  inkMuted,
  ruleColor,
}: {
  left: string;
  right: string;
  inkMuted: string;
  ruleColor: string;
}) {
  return (
    <div
      className="flex items-end justify-between pb-3"
      style={{ borderBottom: `1px solid ${ruleColor}` }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.26em]"
        style={{ color: inkMuted }}
      >
        {left}
      </p>
      <p
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: inkMuted }}
      >
        {right}
      </p>
    </div>
  );
}

function ProductTile({
  product,
  edition,
  inkHex,
  inkSoft,
  accentHex,
  ruleColor,
  tintFrom,
  tintTo,
  className,
  glyphSize,
  featured = false,
  horizontal = false,
}: {
  product: StorefrontMockup["products"][number];
  edition: string;
  inkHex: string;
  inkSoft: string;
  accentHex: string;
  ruleColor: string;
  tintFrom: string;
  tintTo: string;
  className?: string;
  glyphSize: number;
  featured?: boolean;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <div
        className={`flex items-center gap-4 overflow-hidden rounded-md ${className ?? ""}`}
        style={{
          background: `linear-gradient(135deg, ${tintFrom}, ${tintTo})`,
          border: `1px solid ${ruleColor}`,
        }}
      >
        <div className="flex w-[34%] items-center justify-center self-stretch py-4">
          <ProductGlyph
            shape={product.shape}
            accent={accentHex}
            ink={inkHex}
            size={glyphSize}
            stroke={1.3}
          />
        </div>
        <div className="flex-1 py-4 pr-4">
          <p
            className="font-mono text-[8px] uppercase tracking-[0.24em]"
            style={{ color: accentHex }}
          >
            {edition}
          </p>
          <p
            className="mt-1.5 font-display text-[16px] leading-tight"
            style={{ color: inkHex, letterSpacing: "-0.01em" }}
          >
            {product.name}
          </p>
          <p
            className="mt-1 font-mono text-[11px]"
            style={{ color: inkSoft }}
          >
            {product.price}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, ${tintFrom}, ${tintTo})`,
        border: `1px solid ${ruleColor}`,
      }}
    >
      <div className="flex flex-1 items-end justify-center pt-10 pb-8">
        <ProductGlyph
          shape={product.shape}
          accent={accentHex}
          ink={inkHex}
          size={glyphSize}
          stroke={1.6}
        />
      </div>
      <div
        className="flex items-end justify-between px-5 py-4"
        style={{ borderTop: `1px solid ${ruleColor}` }}
      >
        <div>
          <p
            className="font-mono text-[8px] uppercase tracking-[0.24em]"
            style={{ color: accentHex }}
          >
            {edition}
          </p>
          <p
            className={`mt-1.5 font-display ${featured ? "text-[22px]" : "text-[15px]"} leading-tight`}
            style={{ color: inkHex, letterSpacing: "-0.012em" }}
          >
            {product.name}
          </p>
        </div>
        <p
          className="font-mono text-[12px]"
          style={{ color: inkSoft }}
        >
          {product.price}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Product glyph — code-drawn silhouette, scalable                 */
/* ────────────────────────────────────────────────────────────── */

function ProductGlyph({
  shape,
  accent,
  ink,
  size = 48,
  stroke = 1.6,
}: {
  shape: StorefrontMockup["products"][number]["shape"];
  accent: string;
  ink: string;
  size?: number;
  stroke?: number;
}) {
  const path = SHAPE_PATHS[shape];
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke={ink}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: accent }}
      aria-hidden
    >
      <g opacity={0.88}>{path}</g>
    </svg>
  );
}

const SHAPE_PATHS: Record<StorefrontMockup["products"][number]["shape"], React.ReactNode> = {
  bottle: (
    <>
      <path d="M28 8h8v8c0 2 2 4 2 6v32c0 3-3 6-6 6h-4c-3 0-6-3-6-6V22c0-2 2-4 2-6V8z" />
      <line x1="24" y1="36" x2="40" y2="36" />
    </>
  ),
  jar: (
    <>
      <rect x="18" y="20" width="28" height="32" rx="3" />
      <rect x="22" y="12" width="20" height="8" rx="2" />
    </>
  ),
  tube: (
    <>
      <path d="M22 14h20v40c0 3-3 4-5 4h-10c-2 0-5-1-5-4V14z" />
      <line x1="22" y1="22" x2="42" y2="22" />
    </>
  ),
  pump: (
    <>
      <rect x="20" y="22" width="24" height="32" rx="3" />
      <rect x="28" y="10" width="8" height="12" />
      <line x1="32" y1="6" x2="32" y2="10" />
    </>
  ),
  lounge: (
    <>
      <path d="M10 38h44v10H10z" />
      <path d="M12 38v-8c0-4 3-6 6-6h28c3 0 6 2 6 6v8" />
      <line x1="14" y1="48" x2="14" y2="56" />
      <line x1="50" y1="48" x2="50" y2="56" />
    </>
  ),
  stool: (
    <>
      <ellipse cx="32" cy="22" rx="18" ry="4" />
      <line x1="18" y1="24" x2="14" y2="52" />
      <line x1="46" y1="24" x2="50" y2="52" />
      <line x1="22" y1="36" x2="42" y2="36" />
    </>
  ),
  table: (
    <>
      <rect x="8" y="20" width="48" height="6" />
      <line x1="14" y1="26" x2="14" y2="54" />
      <line x1="50" y1="26" x2="50" y2="54" />
    </>
  ),
  bench: (
    <>
      <rect x="8" y="26" width="48" height="6" />
      <line x1="14" y1="32" x2="14" y2="52" />
      <line x1="50" y1="32" x2="50" y2="52" />
      <line x1="32" y1="32" x2="32" y2="52" />
    </>
  ),
  tee: (
    <>
      <path d="M14 20l8-6h20l8 6-6 8h-6v28H26V28h-6z" />
    </>
  ),
  hoodie: (
    <>
      <path d="M16 20l8-6h16l8 6-4 10h-4v26H24V30h-4z" />
      <path d="M24 14c0-4 4-8 8-8s8 4 8 8" />
    </>
  ),
  pant: (
    <>
      <path d="M20 8h24v18l-4 30h-7l-2-22-2 22h-7l-4-30z" />
    </>
  ),
  cap: (
    <>
      <path d="M14 36c0-10 8-18 18-18s18 8 18 18z" />
      <path d="M14 36h36l8 4H6z" />
    </>
  ),
  ring: (
    <>
      <circle cx="32" cy="38" r="14" />
      <path d="M24 26l8-12 8 12" />
    </>
  ),
  pendant: (
    <>
      <path d="M10 14h44" />
      <path d="M16 14l8 24" />
      <path d="M48 14l-8 24" />
      <circle cx="32" cy="44" r="10" />
    </>
  ),
  hoop: (
    <>
      <circle cx="22" cy="34" r="12" />
      <circle cx="42" cy="34" r="12" />
    </>
  ),
  cuff: (
    <>
      <path d="M14 32c0-12 8-20 18-20s18 8 18 20-8 20-18 20" />
      <line x1="32" y1="12" x2="32" y2="20" />
      <line x1="32" y1="44" x2="32" y2="52" />
    </>
  ),
};

/* ────────────────────────────────────────────────────────────── */
/* Hex mix utility                                                 */
/* ────────────────────────────────────────────────────────────── */

function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar * (1 - t) + br * t);
  const g = Math.round(ag * (1 - t) + bg * t);
  const bl = Math.round(ab * (1 - t) + bb * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return [r, g, b];
}
