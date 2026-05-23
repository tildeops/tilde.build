// Pricing data for the headless-specific PricingHeadless section and the
// dedicated /pricing page. One flagship tier + add-ons.

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
  /** Numeric value used by CountUp animation */
  price: number;
  /** Currency prefix, e.g. "₹" */
  currency: string;
  /** Sub-line under the price, e.g. "fixed, one-time · excl. GST" */
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
  /** Display price string, e.g. "+ ₹15,000" or "from ₹8,000/mo" */
  price: string;
  /** Longer 1–2 sentence description, used on /pricing. */
  description?: string;
  /** Bullet points of what's included in the add-on, used on /pricing. */
  included?: string[];
};

export const flagship: FlagshipTier = {
  name: "Headless Shopify rebuild",
  tagline: "The full build, end to end, in 3–4 weeks.",
  price: 40000,
  currency: "₹",
  priceMeta: "fixed · one-time · excl. GST",
  features: [
    {
      label: "Custom Next.js storefront on Shopify backend",
      emphasis: true,
      category: "build",
      description:
        "A bespoke storefront in Next.js 16 with App Router. Server-rendered for speed, designed in Figma against your brand.",
    },
    {
      label: "Mobile-first responsive design (Figma included)",
      category: "build",
      description:
        "Designed mobile-up. You keep the Figma file with every component, variant, and the design system.",
    },
    {
      label: "Shopify or Razorpay checkout — switchable",
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
      label: "Klaviyo email flows scaffolded",
      category: "build",
      description:
        "Welcome, abandoned cart, post-purchase, browse abandonment — five core flows wired up and ready to send.",
    },
    {
      label: "Hosted on Vercel · Lighthouse 95+",
      category: "build",
      description:
        "Edge-deployed on Vercel. Lighthouse mobile score 95+ guaranteed on launch — built into the contract.",
    },
    {
      label: "Migration of products, customers, orders",
      category: "migration",
      description:
        "Your existing Shopify store stays the backend. No data export, no re-keying — the new storefront just reads from it.",
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
      label: "30 days post-launch support",
      category: "handover",
      description:
        "Bug fixes, small tweaks, on-call Slack support for the first month. After that, optional retainer.",
    },
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
    blurb:
      "Cart recovery, order updates, support routing — all on the channel your customers already use.",
    price: "+ ₹25,000",
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
    id: "retainer",
    name: "Maintenance retainer",
    blurb:
      "Bug fixes, small features, on-call support after the 30-day warranty ends.",
    price: "from ₹15,000/mo",
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
    note: "Klaviyo, Razorpay, Meta ads etc. billed directly by the provider.",
  },
];
