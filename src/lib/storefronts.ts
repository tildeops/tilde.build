// Storefront mockup data for the editorial-sweep section.
// Four brand verticals; each renders as both a "standard Shopify template"
// and an editorial "Tilde build" inside a code-drawn browser frame.

export type StorefrontProduct = {
  name: string;
  /** Display price string, e.g. "₹1,890" */
  price: string;
  /** Optional badge text, e.g. "New", "Limited", "Bespoke" */
  tag?: string;
  /** Silhouette ID for the SVG product illustration on the tilde side */
  shape: "bottle" | "jar" | "tube" | "pump" |
         "lounge" | "stool" | "table" | "bench" |
         "tee" | "hoodie" | "pant" | "cap" |
         "ring" | "pendant" | "hoop" | "cuff";
};

export type StorefrontMockup = {
  slug: string;
  /** Uppercase short label rendered in the chrome top-right, e.g. "SKINCARE" */
  category: string;
  /** Display brand wordmark, e.g. "Plain Skin" */
  brand: string;
  /** Singular noun slotted into "Your [noun], reimagined." */
  noun: string;
  /** URL rendered in the chrome address bar, e.g. "plainskin.in" */
  url: string;
  /** Accent hex for tilde-side CTA + chip color */
  accentHex: string;
  /** Tilde-side background hex (a brand-shifted parchment) */
  bgHex: string;
  /** Tilde-side ink hex (defaults to dark, can be light on dark brand bg) */
  inkHex: string;
  /** Top-nav items for both mockups (the standard side just renders these literally) */
  navItems: [string, string, string, string];
  /** Headline shown inside the mockup hero panel */
  mockupHeadline: string;
  /** Short supporting deck inside the mockup hero panel */
  mockupDeck: string;
  /** CTA label on the tilde-side hero (standard side always says "Shop Now") */
  ctaLabel: string;
  /** Three bullets under "THE TEMPLATE" ledger */
  standardBullets: [string, string, string];
  /** Three bullets under "THE TILDE BUILD" ledger */
  tildeBullets: [string, string, string];
  /** Four products for the in-mockup grid */
  products: [StorefrontProduct, StorefrontProduct, StorefrontProduct, StorefrontProduct];
  /** Bottom stat strip pieces, joined with · separators */
  stat: [string, string, string];
};

export const storefronts: StorefrontMockup[] = [
  {
    slug: "plain-skin",
    category: "SKINCARE",
    brand: "Plain Skin",
    noun: "skincare brand",
    url: "plainskin.in",
    accentHex: "#2d3a2a",
    bgHex: "#f1ede3",
    inkHex: "#1a1f1a",
    navItems: ["Routine", "Shop", "Ingredients", "Journal"],
    mockupHeadline: "Three ingredients. Twelve weeks.",
    mockupDeck:
      "A minimal routine built around what your skin actually needs — and nothing it doesn't.",
    ctaLabel: "Build your routine",
    standardBullets: [
      "Generic beauty theme #47",
      "Stock photos flatten product",
      "Pop-ups before you can read",
    ],
    tildeBullets: [
      "Typography that breathes",
      "Ritual-led pages, not catalog",
      "Razorpay UPI native checkout",
    ],
    products: [
      { name: "Hydrating Serum", price: "₹1,890", shape: "bottle" },
      { name: "Barrier Cream", price: "₹2,340", tag: "New", shape: "jar" },
      { name: "Slow Cleanser", price: "₹990", shape: "tube" },
      { name: "SPF 40 Daily", price: "₹1,650", shape: "pump" },
    ],
    stat: ["Plain Skin", "9-day rebuild", "98 Lighthouse"],
  },
  {
    slug: "slow-wood",
    category: "FURNITURE",
    brand: "Slow Wood",
    noun: "furniture studio",
    url: "slowwood.studio",
    accentHex: "#3d2b1f",
    bgHex: "#ede5d7",
    inkHex: "#1c1612",
    navItems: ["Pieces", "Made-to-order", "Materials", "Studio"],
    mockupHeadline: "Built once. Made to last.",
    mockupDeck:
      "Solid hardwood furniture from one studio in Bangalore — joinery first, no flat-pack.",
    ctaLabel: "Browse pieces",
    standardBullets: [
      "Catalog grid with no scale",
      "Flat photos against white",
      "No room context, no story",
    ],
    tildeBullets: [
      "Room-scale context per piece",
      "Material & dimension chips inline",
      "INR + USD dual rails",
    ],
    products: [
      { name: "Walnut Lounge", price: "₹48,000", shape: "lounge" },
      { name: "Ash Side Table", price: "₹12,500", tag: "Limited", shape: "table" },
      { name: "Oak Reading Bench", price: "₹32,000", shape: "bench" },
      { name: "Teak Stool", price: "₹8,400", shape: "stool" },
    ],
    stat: ["Slow Wood", "12-day handoff", "2.1× session time"],
  },
  {
    slug: "halftone",
    category: "APPAREL",
    brand: "Halftone",
    noun: "apparel label",
    url: "halftone.co",
    accentHex: "#1a1a1a",
    bgHex: "#ebe6df",
    inkHex: "#0d0d0d",
    navItems: ["Drops", "Lookbook", "Archive", "About"],
    mockupHeadline: "Drop 04 — out now.",
    mockupDeck:
      "Small batch garments. Dyed in Tamil Nadu, cut in Bombay, shipped before next Friday.",
    ctaLabel: "Cop the drop",
    standardBullets: [
      "Hero banner that screams",
      "Grid where every card is identical",
      "3-step checkout, 8-second LCP",
    ],
    tildeBullets: [
      "Editorial lookbook with motion",
      "Grid that responds to cursor",
      "1-tap UPI / COD, sub-1.5s",
    ],
    products: [
      { name: "Heavyweight Tee", price: "₹2,400", shape: "tee" },
      { name: "Field Hoodie", price: "₹4,800", tag: "New", shape: "hoodie" },
      { name: "Cargo Pant", price: "₹3,600", shape: "pant" },
      { name: "Trail Cap", price: "₹1,200", shape: "cap" },
    ],
    stat: ["Halftone", "7-day rebuild", "138% AOV lift"],
  },
  {
    slug: "aurum",
    category: "JEWELRY",
    brand: "Aurum",
    noun: "jewelry house",
    url: "aurum.in",
    accentHex: "#5e4326",
    bgHex: "#f3ecdb",
    inkHex: "#1a140c",
    navItems: ["Collections", "Bespoke", "Care", "Atelier"],
    mockupHeadline: "Heirlooms. In waiting.",
    mockupDeck:
      "Fine 18k jewelry made in Jaipur. Each piece by one craftsperson, start to finish.",
    ctaLabel: "Open the case",
    standardBullets: [
      "Square photo grid, no detail",
      "Price-tag CTA, no story",
      "Boilerplate 'About' page",
    ],
    tildeBullets: [
      "Macro detail viewer with zoom",
      "Weight, carat & gauge specs",
      "Engraving flow with preview",
    ],
    products: [
      { name: "Signet Ring", price: "₹38,000", tag: "Bespoke", shape: "ring" },
      { name: "Chain Pendant", price: "₹24,500", shape: "pendant" },
      { name: "Twin Hoop", price: "₹16,800", shape: "hoop" },
      { name: "Cuff Bracelet", price: "₹52,000", shape: "cuff" },
    ],
    stat: ["Aurum", "14-day craft", "41% lower bounce"],
  },
];
