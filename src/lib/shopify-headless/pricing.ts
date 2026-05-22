// Pricing data for the headless-specific PricingHeadless section.
// One flagship tier + dashed-border add-ons.

export type PricingFeature = {
  label: string;
  /** When true, render with the accent dot. */
  emphasis?: boolean;
};

export type FlagshipTier = {
  name: string;
  tagline: string;
  /** Numeric value used by CountUp animation */
  price: number;
  /** Currency prefix, e.g. "₹" */
  currency: string;
  /** Sub-line under the price, e.g. "fixed, one-time · excl. GST" */
  priceMeta: string;
  /** Bulleted features */
  features: PricingFeature[];
  cta: {
    label: string;
    href: string;
  };
};

export type Addon = {
  id: string;
  name: string;
  blurb: string;
  /** Display price string, e.g. "+ ₹15,000" or "from ₹8,000/mo" */
  price: string;
};

export const flagship: FlagshipTier = {
  name: "Headless Shopify rebuild",
  tagline: "The full build, end to end, in 3–4 weeks.",
  price: 40000,
  currency: "₹",
  priceMeta: "fixed · one-time · excl. GST",
  features: [
    { label: "Custom Next.js storefront on Shopify backend", emphasis: true },
    { label: "Mobile-first responsive design (Figma included)" },
    { label: "Shopify or Razorpay checkout — switchable" },
    { label: "Meta Pixel + GA4 + Clarity wired correctly", emphasis: true },
    { label: "Klaviyo email flows scaffolded" },
    { label: "Hosted on Vercel · Lighthouse 95+" },
    { label: "Full code handover · GitHub repo you own", emphasis: true },
    { label: "30 days post-launch support" },
  ],
  cta: {
    label: "Book a discovery call",
    href: "/contact",
  },
};

export const addons: Addon[] = [
  {
    id: "messaging-bots",
    name: "WhatsApp + Telegram bot",
    blurb: "Cart recovery, order updates, support routing — all on the channel your customers already use.",
    price: "+ ₹25,000",
  },
  {
    id: "attribution-dashboard",
    name: "Attribution dashboard",
    blurb: "One source of truth across Meta, GA4, and Shopify. ROAS that finally adds up.",
    price: "+ ₹35,000",
  },
  {
    id: "custom-emails",
    name: "Custom transactional emails",
    blurb: "Replace the default Shopify confirmations with on-brand templates customers screenshot.",
    price: "+ ₹15,000",
  },
  {
    id: "retainer",
    name: "Maintenance retainer",
    blurb: "Bug fixes, small features, on-call support after the 30-day warranty ends.",
    price: "from ₹15,000/mo",
  },
];
