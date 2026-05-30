// Per-service pricing for the detailed /pricing/[service] quote builder.
//
// Model: each service has a transparent BASE price (negotiable on a call) plus
// the BASE features included at that price. ADDITIONAL features are listed
// WITHOUT a price — the visitor selects the ones they want and submits the
// list, and we price it manually and reply. Custom Software has no base price
// (`basePrice: null`) and renders the "scoped on call" panel instead of a table.
//
// Prices are dual-currency (INR for India, USD for everyone else). See
// currency.ts — values are deliberate price points per currency, not FX
// conversions. The active currency is chosen at render via CurrencyProvider.
//
// ─────────────────────────────────────────────────────────────────────────
// NOTE: The Shopify entry derives its feature lists from the existing
// flagship/addons data. The ecommerce / whatsapp / telegram numbers and
// feature lists are SENSIBLE DRAFTS — review base prices and copy before
// launch. USD base prices were set by the user; INR figures are existing.
// ─────────────────────────────────────────────────────────────────────────

import { flagship, addons } from "@/lib/shopify-headless/pricing";
import type { Money } from "@/lib/pricing/currency";

export type SelectableFeature = {
  id: string;
  label: string;
  /** One-sentence context shown under the feature in the selectable list. */
  description?: string;
};

export type ServicePricing = {
  slug: string;
  /** Tab label + page heading. */
  name: string;
  /** Short mono eyebrow, e.g. "~ 01 / Headless Shopify". */
  eyebrow: string;
  /** One-line value proposition under the heading. */
  tagline: string;
  /**
   * Starting price in both currencies. `null` means the service is scoped on a
   * call only — renders the OnCallPanel, no table.
   */
  basePrice: Money | null;
  /** Caption under the price, e.g. "from · negotiable on call". */
  priceNote: string;
  /** Delivery window, e.g. "3-4 weeks". */
  timeline: string;
  /** Included at the base price — shown with check marks, no per-item price. */
  baseFeatures: string[];
  /** Add-ons the visitor can select for a quote — shown WITHOUT a price. */
  selectableFeatures: SelectableFeature[];
  /** Hourly rate for extra work beyond scope (both currencies). */
  hourlyRate: Money;
  /** Footer note about bespoke work priced on a call. */
  onCallNote: string;
};

/** ₹2,500/hr / $50/hr — single source for the extra-hours row. */
const HOURLY_RATE: Money = { inr: 2500, usd: 50 };

const ON_CALL_NOTE =
  "Anything bespoke (custom integrations, unusual flows, larger scope) is priced on the discovery call.";

/** Chat-commerce services assume a Shopify backend; custom backends are scoped on a call. */
const CHAT_BACKEND_NOTE =
  "Order-status updates, inventory sync, and catalogue browsing assume a Shopify backend. Integrating with a custom backend is scoped and priced on the discovery call.";

// ── Shopify: feature lists derived from the existing flagship + addons data ──
const shopify: ServicePricing = {
  slug: "shopify",
  name: "Headless Shopify",
  eyebrow: "~ 01 / Headless Shopify",
  tagline: flagship.tagline,
  basePrice: { inr: 40000, usd: 1000 },
  priceNote: "fixed · one-time · negotiable on call",
  timeline: "3-4 weeks",
  baseFeatures: flagship.features.map((f) => f.label),
  selectableFeatures: addons.map((a) => ({
    id: a.id,
    label: a.name,
    description: a.blurb,
  })),
  hourlyRate: HOURLY_RATE,
  onCallNote: ON_CALL_NOTE,
};

// ── Custom ecommerce (DRAFT INR; USD base set by user) ───────────────────────
const ecommerce: ServicePricing = {
  slug: "ecommerce",
  name: "Custom ecommerce",
  eyebrow: "~ 02 / Custom ecommerce",
  tagline: "Storefronts built from scratch, wired to whatever backend you need.",
  basePrice: { inr: 60000, usd: 2000 },
  priceNote: "from · negotiable on call",
  timeline: "4-6 weeks",
  baseFeatures: [
    "Bespoke storefront design",
    "Mobile-first, responsive across breakpoints",
    "Headless or fully custom, your choice of backend",
    "Custom checkout flow (Razorpay by default)",
    "Product catalogue, collections, search & filtering",
    "Analytics + Meta Pixel / GA4 wired server-side",
    "Hosted on Vercel · Lighthouse 95+",
    "Full code handover · GitHub repo you own",
    "1 week post-launch support",
  ],
  selectableFeatures: [
    {
      id: "subscriptions",
      label: "Subscriptions / recurring billing",
      description: "Recurring orders, customer portal, dunning and retries.",
    },
    {
      id: "extended-support",
      label: "Extended support (30 days)",
      description: "Push the 1-week warranty out to a full 30 days of fixes.",
    },
    {
      id: "b2b",
      label: "B2B / wholesale pricing",
      description: "Tiered price lists, net terms, company accounts, quotes.",
    },
    {
      id: "marketplace",
      label: "Multi-vendor marketplace",
      description: "Vendor onboarding, split payouts, per-vendor dashboards.",
    },
    {
      id: "multi-currency",
      label: "Multi-currency / multi-region",
      description: "Localised pricing, currency switching, regional checkout.",
    },
    {
      id: "attribution-dashboard",
      label: "Attribution dashboard",
      description: "Channel-level ROAS that matches what the platforms report.",
    },
    {
      id: "custom-emails",
      label: "Custom transactional emails",
      description: "On-brand order, shipping, and delivery templates.",
    },
  ],
  hourlyRate: HOURLY_RATE,
  onCallNote: ON_CALL_NOTE,
};

// ── WhatsApp bot (DRAFT INR; USD base set by user) ───────────────────────────
const whatsapp: ServicePricing = {
  slug: "whatsapp",
  name: "WhatsApp bot",
  eyebrow: "~ 03 / WhatsApp",
  tagline: "Browse, buy, and get support without leaving the chat.",
  basePrice: { inr: 25000, usd: 800 },
  priceNote: "from · negotiable on call",
  timeline: "2-3 weeks",
  baseFeatures: [
    "Built on Kapso + the official WhatsApp Business API",
    "Catalogue browse + order placement in-chat",
    "In-chat payments (Razorpay / UPI) for order placement",
    "Automated order-status updates",
    "Two-tier routing: bot handles most, hands off to humans cleanly",
    "Connected to your store admin so inventory stays in sync",
    "1 week post-launch support",
  ],
  selectableFeatures: [
    {
      id: "abandoned-cart",
      label: "Abandoned-cart recovery",
      description: "Automatic nudges that bring shoppers back to checkout.",
    },
    {
      id: "broadcasts",
      label: "Broadcasts & opt-in campaigns",
      description: "Templated promotional sends with opt-in management.",
    },
    {
      id: "ai-replies",
      label: "AI-assisted replies",
      description: "LLM-backed answers grounded in your catalogue and FAQs.",
    },
    {
      id: "extended-support",
      label: "Extended support (30 days)",
      description: "Push the 1-week warranty out to a full 30 days of fixes.",
    },
  ],
  hourlyRate: HOURLY_RATE,
  onCallNote: CHAT_BACKEND_NOTE,
};

// ── Telegram bot (DRAFT INR; USD base set by user) ───────────────────────────
const telegram: ServicePricing = {
  slug: "telegram",
  name: "Telegram bot",
  eyebrow: "~ 04 / Telegram",
  tagline: "A full storefront and support desk inside a Telegram bot.",
  basePrice: { inr: 20000, usd: 600 },
  priceNote: "from · negotiable on call",
  timeline: "2-3 weeks",
  baseFeatures: [
    "Telegram Bot API setup",
    "Inline catalogue browse + order placement",
    "Automated order-status updates",
    "Command + button-based navigation",
    "Connected to your store admin so inventory stays in sync",
    "1 week post-launch support",
  ],
  selectableFeatures: [
    {
      id: "payments-in-chat",
      label: "In-chat payments",
      description: "Telegram Payments / Razorpay links inside the bot.",
    },
    {
      id: "broadcasts",
      label: "Channel broadcasts",
      description: "Scheduled announcements to your subscribers and groups.",
    },
    {
      id: "group-mgmt",
      label: "Community / group management",
      description: "Moderation, gated access, and member onboarding flows.",
    },
    {
      id: "ai-replies",
      label: "AI-assisted replies",
      description: "LLM-backed answers grounded in your catalogue and FAQs.",
    },
    {
      id: "extended-support",
      label: "Extended support (30 days)",
      description: "Push the 1-week warranty out to a full 30 days of fixes.",
    },
  ],
  hourlyRate: HOURLY_RATE,
  onCallNote: CHAT_BACKEND_NOTE,
};

// ── Custom software: scoped on a call only (no base price → OnCallPanel) ─────
const custom: ServicePricing = {
  slug: "custom",
  name: "Custom software",
  eyebrow: "~ 05 / Custom software",
  tagline:
    "Internal tools, dashboards, and bespoke systems, scoped and priced on a call.",
  basePrice: null,
  priceNote: "scoped on call",
  timeline: "Varies with scope",
  baseFeatures: [
    "Dashboards, admin panels, ops tools, marketplace backends",
    "Next.js + your choice of Postgres / Mongo / Redis",
    "Auth, role-based access, and audit trails done right",
    "Connected to whatever you already use",
    "Full code handover · GitHub repo you own",
  ],
  selectableFeatures: [],
  hourlyRate: HOURLY_RATE,
  onCallNote: ON_CALL_NOTE,
};

export const SERVICES: ServicePricing[] = [
  shopify,
  ecommerce,
  whatsapp,
  telegram,
  custom,
];

export const SERVICES_MAP: Record<string, ServicePricing> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
