// Per-post colour variants for the blog share images (lib/og.tsx). Each pulls
// from the bridge theme's electric-blue family in globals.css (#155DFC accent →
// #0a2f8a deep, with #93b5ff / #3b82f6 glow) — the palette the blog pages
// render under (data-page-theme="bridge") — so share previews vary subtly by
// gradient pairing and angle while staying on-brand. Plain module (no JSX).

export type CardVariant = {
  /** Gradient start colour. */
  from: string;
  /** Gradient end colour. */
  to: string;
  /** Gradient angle in degrees. */
  angle: number;
  /** Accent colour used for the soft glow orbs. */
  glow: string;
};

export const CARD_VARIANT_COUNT = 6;

const VARIANTS: CardVariant[] = [
  { from: "#155DFC", to: "#0a2f8a", angle: 135, glow: "#93b5ff" },
  { from: "#3b82f6", to: "#0f47cc", angle: 115, glow: "#93b5ff" },
  { from: "#0f47cc", to: "#0a2f8a", angle: 160, glow: "#3b82f6" },
  { from: "#155DFC", to: "#0f47cc", angle: 125, glow: "#93b5ff" },
  { from: "#3b82f6", to: "#155DFC", angle: 145, glow: "#93b5ff" },
  { from: "#0a2f8a", to: "#155DFC", angle: 120, glow: "#3b82f6" },
];

/** Variant for an index — wraps so any integer is valid. */
export function cardVariant(i: number): CardVariant {
  const n = CARD_VARIANT_COUNT;
  return VARIANTS[((i % n) + n) % n];
}

/** CSS linear-gradient string for a variant. */
export function cardGradient(v: CardVariant): string {
  return `linear-gradient(${v.angle}deg, ${v.from} 0%, ${v.to} 100%)`;
}
