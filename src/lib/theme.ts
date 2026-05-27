/**
 * Single source of truth for accent theming.
 *
 * To switch the whole site between accent palettes, change ACTIVE_THEME below.
 * No other file edits required.
 */

export type Theme = "purple" | "red" | "bridge";

export const ACTIVE_THEME: Theme = "bridge";

type Vec3 = readonly [number, number, number];

export type ThemePalette = {
  accent: string;
  accentSoft: string;
  accentHover: string;
  accentDeep: string;
  accentBright: string;
  accentGlow: string;
  shimmerMid: string;
  /** Space-separated RGB triplet for use in `rgb(var(--accent-rgb) / X)`. */
  accentRgb: string;
  /** Five-stop palette for the liquid shader, dark → bright. */
  liquidPalette: readonly [Vec3, Vec3, Vec3, Vec3, Vec3];
  /** Specular crest highlight range (low, high). */
  liquidCrest: { low: Vec3; high: Vec3 };
  /** Color the shader sinks toward in trough regions. */
  liquidTrough: Vec3;
};

export const themes: Record<Theme, ThemePalette> = {
  purple: {
    accent: "#3a1480",
    accentSoft: "#ede9fe",
    accentHover: "#2d0f6e",
    accentDeep: "#1e0840",
    accentBright: "#6d28d9",
    accentGlow: "#a78bfa",
    shimmerMid: "#8b5cf6",
    accentRgb: "58 20 128",
    liquidPalette: [
      [0.020, 0.012, 0.065], // #05031a near-black violet
      [0.055, 0.027, 0.165], // #0e072a obsidian violet
      [0.137, 0.055, 0.333], // #231155 deep violet
      [0.235, 0.094, 0.467], // #3c1877 mid violet
      [0.353, 0.176, 0.616], // #5a2d9d primary violet
    ],
    liquidCrest: {
      low: [0.09, 0.05, 0.18],
      high: [0.14, 0.09, 0.28],
    },
    // Preserve previous look: c0 * 0.55
    liquidTrough: [0.011, 0.0066, 0.036],
  },
  red: {
    accent: "#6e1423",
    accentSoft: "#f1dde0",
    accentHover: "#5a0f1c",
    accentDeep: "#4a0e1a",
    accentBright: "#9e329a",
    accentGlow: "#c26dc2",
    shimmerMid: "#a92847",
    accentRgb: "110 20 35",
    liquidPalette: [
      [0.102, 0.020, 0.035], // #1a0509 near-black wine
      [0.227, 0.039, 0.078], // #3a0a14 deep burgundy
      [0.431, 0.078, 0.137], // #6e1423 brand burgundy
      [0.541, 0.110, 0.200], // #8a1c33 ruby
      [0.663, 0.157, 0.278], // #a92847 warm crest
    ],
    liquidCrest: {
      low: [0.16, 0.05, 0.08],
      high: [0.24, 0.08, 0.12],
    },
    // Preserve previous look: c0 * 0.55
    liquidTrough: [0.056, 0.011, 0.019],
  },
  bridge: {
    accent: "#155DFC",
    accentSoft: "#dbeafe",
    accentHover: "#0e4ad1",
    accentDeep: "#0a2f8a",
    accentBright: "#3b82f6",
    accentGlow: "#93c5fd",
    shimmerMid: "#2563eb",
    accentRgb: "21 93 252",
    liquidPalette: [
      [0.082, 0.365, 0.988], // #155DFC CTA blue — deepest stop, nothing darker
      [0.145, 0.388, 0.922], // #2563eb blue-600
      [0.231, 0.510, 0.965], // #3b82f6 blue-500
      [0.310, 0.580, 0.975], // ~#4f94f9 mid blue
      [0.376, 0.647, 0.980], // #60a5fa blue-400 — brightest, no whites
    ],
    // Tiny additive crest so highlights stay blue, not white
    liquidCrest: {
      low: [0.04, 0.08, 0.16],
      high: [0.06, 0.12, 0.20],
    },
    // Sink toward the CTA blue itself — never darker than #155DFC
    liquidTrough: [0.082, 0.365, 0.988],
  },
};

export const activeTheme = themes[ACTIVE_THEME];
