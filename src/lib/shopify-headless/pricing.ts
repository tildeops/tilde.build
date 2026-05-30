// Pricing data for the headless-specific PricingHeadless section and the
// dedicated /pricing page. One flagship tier + add-ons.

import type { Money } from "@/lib/pricing/currency";

export type FeatureCategory = "build" | "migration" | "handover";

export type PricingFeature = {
  label: string;
  /** When true, render with the accent dot on the in-page card. */
  emphasis?: boolean;
  /** Longer one-sentence context, used on the dedicated /pricing page. */
  description?: string;
  /** Bucket for the /pricing page's grouped breakdown. Optional — features
   *  without a category just sit in the catch-all "Build" group. */
  category?: FeatureCategory;
};

export type FlagshipTier = {
  name: string;
  tagline: string;
  /** Numeric value used by CountUp animation (INR — legacy). */
  price: number;
  /** Currency prefix, e.g. "₹" (legacy; prefer `priceMoney` + CurrencyProvider). */
  currency: string;
  /** Dual-currency project total. */
  priceMoney: Money;
  /** Sub-line under the price, e.g. "fixed · one-time · excl. taxes" */
  priceMeta: string;
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
  /** Display price string, e.g. "+ ₹15,000" or "from ₹8,000/mo" (legacy). */
  price: string;
  /** Dual-currency add-on price + how to render it. */
  priceMoney: Money;
  pricePrefix: "+" | "from";
  priceSuffix?: "/mo";
  /** Longer 1–2 sentence description, used on /pricing. */
  description?: string;
  /** Bullet points of what's included in the add-on, used on /pricing. */
  included?: string[];
};

export const flagship: FlagshipTier = {
  name: "Headless Shopify rebuild",
  tagline: "The full build, end to end, in 3-4 weeks.",
  price: 40000,
  currency: "₹",
  priceMoney: { inr: 40000, usd: 1400 },
  priceMeta: "fixed · one-time · excl. taxes",
  features: [
    {
      label: "Custom Next.js storefront on Shopify backend",
      emphasis: true,
      category: "build",
      description:
        "A bespoke storefront in Next.js 16 with App Router. Server-rendered for speed, designed against your brand.",
    },
    {
      label: "Mobile-first responsive design",
      category: "build",
      description:
        "Designed mobile-up, with a component system that stays consistent across every breakpoint.",
    },
    {
      label: "Shopify or Razorpay checkout, switchable",
      category: "build",
      description:
        "Shopify Checkout out of the box, or Razorpay if you need UPI / India-native payment options. Switchable per locale.",
    },
    {
      label: "Meta Pixel + GA4 + Clarity wired correctly",
      emphasis: true,
      category: "build",
      description:
        "Server-side events via Conversions API + Measurement Protocol. The numbers match across Meta, Google, and Shopify.",
    },
    {
      label: "Hosted on Vercel · Lighthouse 95+",
      category: "build",
      description:
        "Edge-deployed on Vercel. Lighthouse mobile score 95+ guaranteed on launch — built into the contract.",
    },
    {
      label: "Your Shopify backend stays — no data migration needed",
      emphasis: true,
      category: "migration",
      description:
        "Your existing Shopify store stays the backend. No data export, no re-keying — the new storefront just reads from it. (Building from scratch on a new backend? See the add-on.)",
    },
    {
      label: "301 redirects for SEO continuity",
      category: "migration",
      description:
        "Every old URL maps to its new equivalent. Search rankings carry over instead of starting from zero.",
    },
    {
      label: "Full code handover · GitHub repo you own",
      emphasis: true,
      category: "handover",
      description:
        "Push access to the repo on day one, documentation walkthrough on launch day. Take it in-house anytime.",
    },
    {
      label: "1 week post-launch support",
      category: "handover",
      description:
        "Bug fixes, small tweaks, on-call Slack support for the first week. Extend to 30 days or move to a retainer anytime.",
    },
  ],
  cta: {
    label: "Book a discovery call",
    href: "/contact",
  },
};

export const addons: Addon[] = [
  {
    id: "email-flows",
    name: "Email marketing flows",
    blurb:
      "Welcome, abandoned-cart, post-purchase and win-back sequences that bring shoppers back.",
    price: "+ ₹20,000",
    priceMoney: { inr: 20000, usd: 400 },
    pricePrefix: "+",
    description:
      "Five core revenue flows set up on the platform that fits your list and budget — Omnisend, Brevo, or Klaviyo. (Klaviyo is powerful but pricey at scale; we'll recommend the cheapest fit on the call.)",
    included: [
      "Welcome, abandoned-cart, browse-abandonment, post-purchase, win-back flows",
      "Connected to your Shopify storefront events (works headless)",
      "Branded templates matching your storefront",
      "Segmentation + basic reporting set up so you can see revenue per flow",
    ],
  },
  {
    id: "messaging-bots",
    name: "WhatsApp + Telegram bot",
    blurb:
      "Cart recovery, order updates, support routing, all on the channel your customers already use.",
    price: "+ ₹25,000",
    priceMoney: { inr: 25000, usd: 600 },
    pricePrefix: "+",
    description:
      "Built on the official Business APIs (not flaky third-party bots). Customers browse, buy, and get support without leaving the chat.",
    included: [
      "Catalog browse + order placement inside WhatsApp / Telegram",
      "Automated abandoned-cart and order-status updates",
      "Two-tier routing — bot handles 90%, hands off to humans cleanly",
      "Connected to your Shopify admin so inventory stays in sync",
    ],
  },
  {
    id: "attribution-dashboard",
    name: "Attribution dashboard",
    blurb:
      "One source of truth across Meta, GA4, and Shopify. ROAS that finally adds up.",
    price: "+ ₹35,000",
    priceMoney: { inr: 35000, usd: 700 }, // USD draft — confirm
    pricePrefix: "+",
    description:
      "A unified view of where revenue actually comes from, with channel-level ROAS that matches what the platforms report.",
    included: [
      "Server-side event pipeline (Meta CAPI + GA4 Measurement Protocol)",
      "Custom dashboard with channel ROAS, blended CAC, contribution",
      "Cohort + LTV analysis from your Shopify customer history",
      "Slack / email alerts for spend anomalies and conversion drops",
    ],
  },
  {
    id: "custom-emails",
    name: "Custom transactional emails",
    blurb:
      "Replace the default Shopify confirmations with on-brand templates customers screenshot.",
    price: "+ ₹15,000",
    priceMoney: { inr: 15000, usd: 300 }, // USD draft — confirm
    pricePrefix: "+",
    description:
      "Designed in Figma, built in React Email, deployed back into your Shopify backend. Every automated message matches the storefront.",
    included: [
      "Order confirmation, shipping, delivery, return-label templates",
      "Welcome and re-engagement flows in matching design system",
      "Mobile-first responsive — tested in Gmail, Apple Mail, Outlook",
      "Editable in Shopify admin afterwards if you need quick copy tweaks",
    ],
  },
  {
    id: "subscriptions",
    name: "Subscriptions / recurring billing",
    blurb:
      "Turn one-off buyers into recurring revenue with subscribe-and-save and a self-serve customer portal.",
    price: "+ ₹25,000",
    priceMoney: { inr: 25000, usd: 500 },
    pricePrefix: "+",
    description:
      "Recurring orders wired into your storefront and checkout, with a portal where customers manage their own plans.",
    included: [
      "Subscribe-and-save on eligible products",
      "Customer portal: pause, skip, swap, cancel",
      "Dunning + retry logic for failed payments",
      "Synced to your Shopify backend and order flow",
    ],
  },
  {
    id: "extended-support",
    name: "Extended support (30 days)",
    blurb:
      "Push the included 1-week warranty out to a full 30 days of bug fixes and on-call support.",
    price: "+ ₹12,500",
    priceMoney: { inr: 12500, usd: 250 },
    pricePrefix: "+",
    description:
      "Adds three more weeks on top of the included 1-week post-launch window — roughly 5 hours of fixes and tweaks, priced off the hourly rate.",
    included: [
      "30 days of priority bug fixes from launch",
      "Small tweaks and on-call Slack support",
      "Rolls naturally into a retainer if you want to continue",
    ],
  },
  {
    id: "from-scratch",
    name: "Headless Shopify from scratch",
    blurb:
      "No existing store? We stand up a brand-new Shopify backend alongside the storefront.",
    price: "from ₹75,000",
    priceMoney: { inr: 75000, usd: 1800 },
    pricePrefix: "from",
    description:
      "When there's no Shopify store to build on, we set up the backend from zero. Product migration is billed at ₹500 / $5 per 100 products; full scope is confirmed on the discovery call.",
    included: [
      "Brand-new Shopify backend configured end to end",
      "Storefront built on top, same as the flagship build",
      "Product migration at ₹500 / $5 per 100 products",
      "Final scope + price confirmed on the call",
    ],
  },
  {
    id: "retainer",
    name: "Maintenance retainer",
    blurb:
      "Bug fixes, small features, on-call support after the 1-week warranty ends.",
    price: "from ₹15,000/mo",
    priceMoney: { inr: 15000, usd: 300 },
    pricePrefix: "from",
    priceSuffix: "/mo",
    description:
      "A predictable monthly engagement for stores that want a partner on standby rather than rebuilding the relationship every quarter.",
    included: [
      "Priority bug fixes within 1 business day",
      "Small features and content tweaks (4–8 hours/mo included)",
      "Quarterly performance + analytics review",
      "Discounted rates for larger feature work",
    ],
  },
];

export const excluded = [
  {
    label: "Hosting (Vercel)",
    note: "Free tier covers most stores; Pro is ~$20/mo when traffic grows.",
  },
  {
    label: "Domain registration & DNS",
    note: "Whatever your registrar charges (~₹800/yr typical).",
  },
  {
    label: "Shopify subscription",
    note: "Your existing Shopify plan stays — we don't replace it.",
  },
  {
    label: "Third-party services",
    note: "Email platform (Omnisend / Brevo / Klaviyo), Razorpay, Meta ads etc. billed directly by the provider.",
  },
];
