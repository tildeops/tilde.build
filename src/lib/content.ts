// Landing-page content. Service-agnostic copy for the end-to-end studio
// positioning. Used by the section components in src/components/sections/*.

export const painPoints = [
  {
    icon: "Box",
    title: "Templates that look like every other site in your category.",
    body: "Off-the-shelf themes can't render the brand you have in your head. You bought the platform for the backend — but you're stuck with someone else's frontend.",
  },
  {
    icon: "Lock",
    title: "Your tools stopped scaling six months ago.",
    body: "Custom flows, layouts, integrations — they all fight the platform you're on. Every new feature feels like a workaround stacked on a workaround.",
  },
  {
    icon: "Gauge",
    title: "Your team can't ship without a developer for every change.",
    body: "Copy edits behind a Jira ticket. New pages take a week. The marketing team is bottlenecked on engineering for things that should take ten minutes.",
  },
  {
    icon: "CreditCard",
    title: "Five SaaS products, still missing the one feature you need.",
    body: "Stitched-together tools, monthly bills climbing, and the workflow your business actually runs on lives in a spreadsheet. Custom software pays for itself fast.",
  },
] as const;

// Service beats for the pinned ServicesShowcase. One entry = one scrolled
// beat. The `device` field selects which device frame the showcase renders.
export type ServiceBeat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: readonly string[];
  device: "laptop" | "phone";
  /** Visual variant rendered inside the device frame */
  visual:
    | "custom-dashboard"
    | "ecommerce-sweep"
    | "shopify-store"
    | "mobile-app"
    | "chat-bot";
  cta?: { label: string; href: string };
};

export const serviceBeats: readonly ServiceBeat[] = [
  {
    id: "custom",
    eyebrow: "~ 01 / Custom software",
    title: "Internal tools that fit how your team actually works.",
    body: "Dashboards, admin panels, ops tools, marketplace backends — built around your data and your workflow, not a SaaS template's.",
    bullets: [
      "Next.js + your choice of Postgres/Mongo/Redis",
      "Auth, role-based access, audit trails done right",
      "Connected to whatever you already use",
    ],
    device: "laptop",
    visual: "custom-dashboard",
  },
  {
    id: "ecommerce",
    eyebrow: "~ 02 / Custom ecommerce",
    title: "Storefronts that don't look like everyone else's.",
    body: "When the platform you're on can't render the brand you have in your head, we build the storefront from scratch — and wire it to whatever backend you need.",
    bullets: [
      "Bespoke design, custom checkout, headless or full custom",
      "Subscriptions, B2B, marketplaces — past the template ceiling",
      "Built to load fast and convert better",
    ],
    device: "laptop",
    visual: "ecommerce-sweep",
  },
  {
    id: "shopify",
    eyebrow: "~ 03 / Headless Shopify",
    title: "Your Shopify, without the Shopify look.",
    body: "Keep the backend you know. Replace only the part that matters — the storefront. ₹40,000 fixed, 3–4 weeks, full code handover.",
    bullets: [
      "Fully custom Next.js frontend on your Shopify backend",
      "Razorpay or Shopify-native checkout",
      "Unified attribution that actually adds up",
    ],
    device: "laptop",
    visual: "shopify-store",
    cta: { label: "See the flagship breakdown →", href: "/shopify-headless" },
  },
  {
    id: "mobile",
    eyebrow: "~ 04 / Mobile apps",
    title: "Apps that don't feel like a website in a wrapper.",
    body: "Native iOS, native Android, React Native when it's the right call. Auth, push, offline, in-app purchase — all the boring infrastructure done right.",
    bullets: [
      "Native (Swift / Kotlin) or React Native + Expo",
      "Push, deep links, biometric auth, in-app purchase",
      "App Store and Play Store submission included",
    ],
    device: "phone",
    visual: "mobile-app",
  },
  {
    id: "bots",
    eyebrow: "~ 05 / WhatsApp + Telegram bots",
    title: "Meet customers where their thumbs already live.",
    body: "Order placement, support, broadcasts, abandoned-cart recovery — all inside one chat thread. Built on the official Business APIs, not flaky third-party stitching.",
    bullets: [
      "Official WhatsApp Business API + Telegram Bot API",
      "Catalogue browse → pay → track, all in-chat",
      "Templates, broadcasts, opt-in flows, agent handoff",
    ],
    device: "phone",
    visual: "chat-bot",
  },
];

// Engagement-type pricing. Replaces the previous per-service pricing.
// Three cards: fixed-scope, retainer, hourly.
export type EngagementTier = {
  id: "fixed" | "retainer" | "hourly";
  eyebrow: string;
  name: string;
  description: string;
  /** Display number used by CountUp. */
  amount: number;
  /** Currency prefix shown before the amount. */
  currency: string;
  /** What sits to the right of the number (e.g. "+", "/mo", "/hr"). */
  suffix?: string;
  /** Short caption below the price. */
  cadence: string;
  features: readonly string[];
  cta: { label: string; href: string };
  /** Highlight the flagship card. */
  highlight?: boolean;
  /** When set, an inline "flagship example" badge linking to a deeper page. */
  flagshipExample?: { label: string; href: string };
};

export const engagementTiers: readonly EngagementTier[] = [
  {
    id: "fixed",
    eyebrow: "Most projects start here",
    name: "Fixed-scope project",
    description:
      "A defined deliverable, a fixed price, a known timeline. Best for storefronts, bots, landing-page sprints — anything we can scope on the discovery call.",
    amount: 40000,
    currency: "₹",
    suffix: "+",
    cadence: "fixed, one-time · starts from",
    features: [
      "Headless Shopify storefront — ₹40,000",
      "WhatsApp / Telegram bot — from ₹25,000",
      "Landing page or microsite — from ₹15,000",
      "Two revision rounds, no surprise invoices",
      "Full code handover · 30-day support",
    ],
    cta: { label: "Book a discovery call", href: "/contact" },
    highlight: true,
    flagshipExample: {
      label: "See the Shopify flagship",
      href: "/shopify-headless",
    },
  },
  {
    id: "retainer",
    eyebrow: "When you need a team, not a project",
    name: "Monthly retainer",
    description:
      "Embedded engineering. We become part of your team for the month, shipping features against a rolling backlog. Capped hours, predictable bill.",
    amount: 60000,
    currency: "₹",
    suffix: "/mo",
    cadence: "from · 40 hrs / month",
    features: [
      "Embedded engineer + design support",
      "Rolling backlog, weekly demo, monthly review",
      "Cancel or pause anytime",
      "Priority on hotfixes & infra",
      "Scales up with another seat when you need it",
    ],
    cta: { label: "Start a retainer", href: "/contact" },
  },
  {
    id: "hourly",
    eyebrow: "For specialist help",
    name: "Hourly engineering",
    description:
      "Got a specific problem? Pay for the hours it takes to solve. Useful for audits, performance work, integrations, or unsticking your in-house team.",
    amount: 2000,
    currency: "₹",
    suffix: "/hr",
    cadence: "min. 10 hours · billed weekly",
    features: [
      "Architecture & code audits",
      "Performance & Core Web Vitals work",
      "Tricky third-party integrations",
      "Pair-programming with your team",
      "No retainer commitment",
    ],
    cta: { label: "Tell us what's broken", href: "/contact" },
  },
];

// Process steps — service-agnostic. Range extended to cover larger builds.
export const processSteps = [
  {
    n: "01",
    eyebrow: "DISCOVERY",
    title: "Brief",
    body: "30-min call. We understand your business, current setup, and the shape of what you need. You leave with a written scope and a fixed quote.",
  },
  {
    n: "02",
    eyebrow: "VISUAL",
    title: "Design",
    body: "Figma mockups for every screen. Two revision rounds included. Already have a design? We build to spec.",
  },
  {
    n: "03",
    eyebrow: "ENGINEERING",
    title: "Build",
    body: "Daily progress on a shared preview URL. Whether it's a storefront, an app, or a bot — same cadence, same transparency.",
  },
  {
    n: "04",
    eyebrow: "WIRING",
    title: "Integrate",
    body: "Analytics, payments, third-party APIs, deployment pipelines — all configured and tested end-to-end before launch.",
  },
  {
    n: "05",
    eyebrow: "GO-LIVE",
    title: "Launch & handover",
    body: "Ship to production, walk you through everything, hand over full code ownership. 30 days of post-launch support included.",
  },
] as const;

// Tech stack grouped by surface. Each group is a row in the section.
export type TechGroup = {
  label: string;
  eyebrow: string;
  items: readonly { name: string; initials: string }[];
};

export const techGroups: readonly TechGroup[] = [
  {
    label: "Web",
    eyebrow: "FRONTEND · WEB",
    items: [
      { name: "Next.js", initials: "N" },
      { name: "React", initials: "R" },
      { name: "TypeScript", initials: "TS" },
      { name: "Tailwind", initials: "Tw" },
      { name: "GSAP", initials: "Gs" },
    ],
  },
  {
    label: "Mobile",
    eyebrow: "NATIVE & CROSS-PLATFORM",
    items: [
      { name: "Swift", initials: "Sw" },
      { name: "Kotlin", initials: "Kt" },
      { name: "React Native", initials: "RN" },
      { name: "Expo", initials: "Ex" },
    ],
  },
  {
    label: "Commerce",
    eyebrow: "ECOMM · PAYMENTS",
    items: [
      { name: "Shopify", initials: "S" },
      { name: "Stripe", initials: "St" },
      { name: "Razorpay", initials: "₹" },
    ],
  },
  {
    label: "Backend",
    eyebrow: "SERVERS · DATA",
    items: [
      { name: "Node", initials: "Nd" },
      { name: "Postgres", initials: "Pg" },
      { name: "MongoDB", initials: "Mg" },
      { name: "Redis", initials: "Rd" },
      { name: "AWS", initials: "Aw" },
    ],
  },
  {
    label: "Messaging",
    eyebrow: "BOTS · CHAT APIS",
    items: [
      { name: "WhatsApp Business API", initials: "Wa" },
      { name: "Telegram Bot API", initials: "Tg" },
    ],
  },
  {
    label: "AI & Infra",
    eyebrow: "MODELS · HOSTING",
    items: [
      { name: "OpenAI", initials: "Oa" },
      { name: "Anthropic", initials: "An" },
      { name: "Vercel", initials: "▲" },
      { name: "Cloudflare", initials: "Cf" },
    ],
  },
];

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
  {
    quote:
      "We needed a WhatsApp bot wired to our existing order system, not a generic chatbot. Three weeks later it was live and handling sixty percent of our support load.",
    name: "Operations lead",
    role: "Personal-care brand",
    company: "—",
  },
] as const;

export const faq = [
  {
    q: "What kinds of projects do you actually take on?",
    a: "Custom web apps, ecommerce (Shopify and bespoke), mobile apps (native + React Native), and WhatsApp/Telegram bots. If it ships software, we probably do it. If it doesn't fit, we'll say so on the discovery call.",
  },
  {
    q: "How long does a typical project take?",
    a: "A headless Shopify rebuild is 3–4 weeks. A bot is 2–3 weeks. A mobile app is 6–10 weeks depending on scope. Internal tools and custom ecommerce vary — we'll quote a fixed range on the discovery call.",
  },
  {
    q: "Fixed-scope, retainer, or hourly — which one should I pick?",
    a: "Fixed-scope when the deliverable is clear (storefront, bot, landing page). Retainer when you need a team, not a project. Hourly for audits, performance fixes, or specialist help. We'll suggest the right shape on the call.",
  },
  {
    q: "Who actually writes the code?",
    a: "We do. tilde is two senior engineers, one designer, and a few sharp interns. No outsourcing, no offshore handoffs, no account managers — you talk directly to the people building your product.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. About half our work is international. We invoice in USD or EUR, async-first, with a few overlap hours per week for live calls.",
  },
  {
    q: "Who owns the code after launch?",
    a: "You do. Code lives in a GitHub repo you own. No per-seat licence, no recurring fee, no vendor lock-in. The whole codebase is yours from day one.",
  },
  {
    q: "What about ongoing support and maintenance?",
    a: "30 days of post-launch support is included on every fixed-scope project. After that we offer monthly retainers from ₹60,000/mo, or you can take it in-house — we hand over a fully documented codebase.",
  },
  {
    q: "What if my requirements change mid-project?",
    a: "Scope changes happen. We re-quote the delta, you approve, we proceed. No surprise invoices, no scope creep snuck into the timeline.",
  },
] as const;
