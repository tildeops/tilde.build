export const painPoints = [
  {
    icon: "Box",
    title: "Your storefront looks like every other Shopify store.",
    body: "Off-the-shelf themes can't render the brand you have in your head. You bought Shopify for the backend — but you're stuck with someone else's frontend.",
  },
  {
    icon: "Lock",
    title: "You've hit the ceiling of what Liquid + a theme can do.",
    body: "Custom interactions, animations, layouts — they all fight the platform. Every new feature feels like a workaround.",
  },
  {
    icon: "Gauge",
    title: "Page-speed is killing your ad ROAS.",
    body: "Theme bloat and a dozen third-party apps tank Core Web Vitals. Your Meta ads spend gets less efficient by the quarter.",
  },
  {
    icon: "CreditCard",
    title: "You want flexibility on checkout, not a rebuild.",
    body: "Razorpay for India, Shopify Payments elsewhere. One stack that handles both — without two parallel codebases.",
  },
] as const;

export const offerings = [
  {
    eyebrow: "FLAGSHIP",
    title: "Headless Shopify storefront",
    blurb:
      "A fully custom Next.js storefront wired to your existing Shopify backend. Keep your catalogue, checkout, and tooling — replace only the part that matters: the frontend.",
    bullets: [
      "Figma design (yours or ours)",
      "Razorpay or Shopify-native checkout",
      "Meta CAPI, GA4, MS Clarity, Shopify native analytics",
      "Product setup + email marketing setup",
      "Full code handover · 30-day post-launch support",
    ],
    href: "/shopify-headless",
    cta: "See full breakdown",
  },
  {
    eyebrow: "WHEN SHOPIFY ISN'T ENOUGH",
    title: "Custom e-commerce",
    blurb:
      "A bespoke backend and storefront, built around what your business actually needs. Subscriptions, marketplaces, B2B workflows, anything that breaks the Shopify mold.",
    bullets: [
      "Custom backend (Node/Postgres/Mongo)",
      "Storefront in Next.js or your framework of choice",
      "Custom checkout & payment integrations",
      "Hourly billing — scoped per project",
      "Everything in the Shopify plan, plus what you need",
    ],
    href: "/#contact",
    cta: "Talk to us",
  },
  {
    eyebrow: "EXTRA SALES CHANNEL",
    title: "WhatsApp sales channel",
    blurb:
      "A custom WhatsApp bot built around your Shopify catalogue. Customers browse, order, and track delivery — all from the most-used app on their phone.",
    bullets: [
      "Custom bot built for your products",
      "Shopify catalogue integration",
      "Order placement directly in WhatsApp",
      "Delivery updates pushed back to customer",
      "Opt-in flows for abandoned carts & broadcasts",
    ],
    href: "/#contact",
    cta: "Add to my Shopify",
  },
] as const;

export const pricing = [
  {
    name: "Headless Shopify",
    eyebrow: "FLAGSHIP — MOST POPULAR",
    price: "₹40,000",
    cadence: "fixed, one-time",
    description:
      "Everything you need to replace your Shopify theme with a custom Next.js storefront.",
    features: [
      "Design (Figma) + full storefront build",
      "Razorpay or Shopify-native checkout",
      "Meta, GA4, MS Clarity, Shopify analytics setup",
      "Product setup & email marketing setup",
      "30-day post-launch support",
      "Full code handover",
    ],
    cta: { label: "Book a discovery call", href: "/contact" },
    highlight: true,
  },
  {
    name: "Custom e-commerce",
    eyebrow: "VARIABLE",
    price: "₹20,000 – ₹40,000",
    cadence: "billed at ₹2,000 / hour",
    description:
      "Bespoke backend + storefront when Shopify doesn't fit. Scoped per project.",
    features: [
      "Custom backend, schema, APIs",
      "Storefront in Next.js or your stack",
      "Custom checkout & payment integrations",
      "Everything in the Shopify plan, plus what you need",
      "Hourly billing, no surprises",
    ],
    cta: { label: "Get a quote", href: "/contact" },
    highlight: false,
  },
  {
    name: "WhatsApp sales channel",
    eyebrow: "ADD-ON",
    price: "₹10,000",
    cadence: "fixed, one-time",
    description:
      "A second sales channel that lives where your customers already are.",
    features: [
      "Bot build & conversation design",
      "Shopify catalogue integration",
      "Order placement inside WhatsApp",
      "Delivery & shipping updates",
      "Opt-in flows for abandoned cart / broadcasts",
    ],
    cta: { label: "Add to my project", href: "/contact" },
    highlight: false,
  },
] as const;

export const addOn = {
  name: "Meta Ads dashboard + initial campaign setup",
  price: "₹5,000 – ₹10,000",
  description:
    "We set up your Meta Business account, sanity-check Pixel + CAPI, and launch your first 2–3 campaigns so you have a working baseline.",
  features: [
    "Meta Business Manager setup",
    "Pixel + Conversions API health check",
    "First 2–3 campaign launches",
    "Dashboard for ongoing reporting",
  ],
};

export const processSteps = [
  {
    n: "01",
    eyebrow: "DISCOVERY",
    title: "Brief",
    body: "30-min call. We understand your brand, current setup, and goals. You leave with a written scope.",
  },
  {
    n: "02",
    eyebrow: "VISUAL",
    title: "Design",
    body: "Figma mockups for every page. Two revision rounds included. Already have a design? We implement it.",
  },
  {
    n: "03",
    eyebrow: "ENGINEERING",
    title: "Build",
    body: "Next.js storefront wired to your Shopify backend. Daily progress on a shared preview URL.",
  },
  {
    n: "04",
    eyebrow: "WIRING",
    title: "Integrate",
    body: "Analytics, payments, catalogues, email marketing — all configured and tested end-to-end.",
  },
  {
    n: "05",
    eyebrow: "GO-LIVE",
    title: "Launch & handover",
    body: "Deploy to your domain, walk you through everything, hand over full code ownership.",
  },
] as const;

export const techStack = [
  { name: "Next.js", initials: "N" },
  { name: "Shopify", initials: "S" },
  { name: "Shopify Merchant", initials: "SM" },
  { name: "Razorpay", initials: "₹" },
  { name: "Meta", initials: "M" },
  { name: "Google Analytics", initials: "GA" },
  { name: "Search Console", initials: "GSC" },
  { name: "MS Clarity", initials: "C" },
  { name: "WhatsApp Business", initials: "Wa" },
  { name: "Vercel", initials: "▲" },
] as const;

export const testimonials = [
  {
    quote:
      "They rebuilt our storefront in three weeks and the difference in feel is night and day. Page-speed went from 38 to 96 on mobile and our checkout completion rate climbed within a month.",
    name: "Founder",
    role: "DTC apparel brand",
    company: "—",
  },
  {
    quote:
      "Working with tilde feels like having two senior engineers on retainer. They scope sharply, ship fast, and they actually care about your stack after they leave.",
    name: "Co-founder",
    role: "F&B startup",
    company: "—",
  },
] as const;

export const faq = [
  {
    q: "How long does a headless Shopify rebuild take?",
    a: "Typically 3–4 weeks from kickoff to launch, assuming we have your Shopify backend access and product data on day one. Design adds a week if you don't have Figma files already.",
  },
  {
    q: "Do I need to be on Shopify Plus?",
    a: "No. The standard Shopify plan exposes the Storefront API we need. Plus only matters if you want Shopify Functions or B2B features.",
  },
  {
    q: "Who owns the code after launch?",
    a: "You do. The entire codebase is pushed to a GitHub repo you own. There's no per-seat licence, no recurring fee, no vendor lock-in beyond what your hosting provider charges.",
  },
  {
    q: "Can I keep my existing Shopify checkout?",
    a: "Yes. We support both Shopify-native checkout and Razorpay — chosen per deployment by a single environment variable. Switching later is one config change.",
  },
  {
    q: "What about post-launch support?",
    a: "30 days of bug fixes and small tweaks are included. After that we offer monthly retainers, or you can take it in-house — we hand over a fully documented codebase.",
  },
  {
    q: "Can you migrate my existing theme's content?",
    a: "Yes. Products, collections, pages, blog posts, customer accounts — anything stored in Shopify stays in Shopify. We just replace the rendering layer.",
  },
  {
    q: "What if my requirements change mid-project?",
    a: "Scope changes happen. We re-quote the delta, you approve, we proceed. No surprise invoices.",
  },
  {
    q: "Do you take equity or discount for early-stage brands?",
    a: "We're open to it case-by-case for brands we believe in. Reach out and tell us your story.",
  },
] as const;
