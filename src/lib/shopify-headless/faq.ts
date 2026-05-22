// FAQ items specific to the redesigned /shopify-headless page.
// Shape matches the `items` prop of <FAQ /> in src/components/sections/faq.tsx.

export const headlessFaqItems = [
  {
    q: "Why headless instead of a Shopify theme?",
    a: "Themes are templates: every store ends up looking the same, and you're capped by what Liquid + the app marketplace can do. Headless replaces the storefront with a custom Next.js app while Shopify keeps owning products, orders, and checkout — so you get full design control without losing the admin you already know.",
  },
  {
    q: "Will my SEO and rankings survive the migration?",
    a: "Yes. We preserve URL structures, set up 301 redirects for anything that has to change, and ship a measurably faster site — which Google rewards. We've never seen a ranking drop post-migration when it's done correctly.",
  },
  {
    q: "Can I still edit products in Shopify admin?",
    a: "Absolutely. Shopify admin stays your source of truth — products, collections, customers, orders. The Tilde storefront just renders that data, faster and prettier. Your team's workflow doesn't change.",
  },
  {
    q: "What about my existing Shopify apps?",
    a: "We audit them in week 1. Most app functionality (reviews, upsells, loyalty) can be re-implemented natively or reached via their APIs. Some apps (like Klaviyo) integrate cleanly with the headless storefront. You'll save on app fees you no longer need.",
  },
  {
    q: "How does attribution actually work on a headless setup?",
    a: "This is where most agencies break it. We wire Meta Pixel + Conversions API, GA4 + Measurement Protocol, and Shopify's own analytics to converge on one server-side event stream — so the numbers match no matter who you ask. The optional dashboard add-on visualizes it all in one place.",
  },
  {
    q: "How long does the full build take?",
    a: "3–4 weeks for the headless rebuild. Add-ons (WhatsApp bot, attribution dashboard, custom emails) run in parallel and don't extend the core timeline. You get a daily preview URL from week 2 onward.",
  },
  {
    q: "What's the cost vs Shopify Plus?",
    a: "Shopify Plus starts at $2,300/mo (~₹1.9L/mo). The Tilde headless rebuild is ₹40,000 one-time, runs on your existing Shopify plan, and gives you more design control than Plus does. We're not anti-Plus — we just don't think most brands need it.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "30 days post-launch support is included. After that, monthly retainers start at ₹15,000/mo. Or take it in-house — the code is fully documented and the repo is yours.",
  },
];
