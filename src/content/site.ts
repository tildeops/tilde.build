export const site = {
  brand: {
    name: "Tilde",
    tagline: "approximate to precise",
  },

  contact: {
    email: "hi@tilde.build",
    whatsapp: "",
    city: "",
    calcomLink: "tilde/intro-call",
  },

  hero: {
    eyebrow: "A studio for software that almost shipped",
    headlineA: "Your product is",
    headlineEm: "close",
    headlineB: ". We close the gap.",
    sub: "Tilde designs and builds the software that moves approximate ideas into precise, shipping products.",
    primaryCta: { label: "Start a project", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#offerings" },
    image:
      "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=1400&q=80",
  },

  painPoints: {
    eyebrow: "What's slowing you down",
    headline: "If any of this sounds familiar, we should talk.",
    cases: [
      {
        lead: "You've been almost shipping for months.",
        tail: " The MVP is 80% done, the last 20% keeps growing, and the launch keeps slipping.",
      },
      {
        lead: "You went headless and attribution went with it.",
        tail: " Meta says one number, Google says another, and no one agrees which ads actually work.",
      },
      {
        lead: "Your stack is held together with Zapier.",
        tail: " Orders in Shopify, email elsewhere, support in a third tab — one broken webhook from chaos.",
      },
      {
        lead: "Your Figma is beautiful. Production isn't.",
        tail: " Half the interactions never shipped. The polish died at handoff.",
      },
    ],
  },

  offerings: {
    eyebrow: "What we build",
    headline: "Four things we do, well.",
    sub: "You'll work with the people building it. No account manager in the middle.",
    cta: {
      kicker: "Let's build",
      headline: "something rare.",
      sub: "Bring what you have — a Figma, a doc, a half-sentence idea. We'll tell you straight whether we're the right team.",
      primary: { label: "Start a project", href: "#contact" },
    },
    items: [
      {
        id: "headless-shopify",
        flagship: true,
        tag: "Flagship",
        title: "Headless Shopify",
        pitch:
          "A Next.js storefront that's fast, measurable, and doesn't lose the data Shopify can't show you.",
        pills: [
          "Next.js Storefront",
          "Core Web Vitals",
          "Meta Pixel + GA4",
          "PostHog Replays",
          "Shopify Setup",
          "Email Templates",
          "Attribution Dashboard",
        ],
        features: [
          "Next.js storefront tuned for Core Web Vitals",
          "Meta Pixel & GA4, properly deduplicated",
          "PostHog heatmaps and session replays",
          "Shopify setup & payment configuration",
          "Branded email marketing templates",
          "Custom Attribution Dashboard",
        ],
        bestFor:
          "DTC brands scaling past the default theme.",
        media:
          "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "custom-ecommerce",
        tag: "Custom",
        title: "Custom Ecommerce",
        pitch:
          "A custom store when Shopify's constraints cost more than they save. Every feature is a decision, not a default.",
        pills: [
          "Custom Frontend",
          "Custom Backend",
          "Stripe & Razorpay",
          "Inventory & Orders",
          "Fulfillment Workflow",
          "Regional Payments",
          "Pay for what you need",
        ],
        features: [
          "Fully custom frontend + backend",
          "Payments (Stripe, Razorpay, regional)",
          "Inventory, orders, fulfillment — your workflow",
          "Pay for the features you need",
        ],
        bestFor:
          "Teams whose catalogue or checkout Shopify can't bend to.",
        media:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "bots",
        tag: "Conversational",
        title: "Chat Commerce Bots",
        pitch:
          "Custom bots that do the full job — browse, order, pay, track — inside a chat window.",
        pills: [
          "WhatsApp Bot",
          "Telegram Bot",
          "Catalogue Sync",
          "In-Chat Orders",
          "Payment Integration",
          "Shipping & Tracking",
        ],
        features: [
          "Catalogue sync from Shopify or custom",
          "Order placement inside the chat",
          "Payment integration",
          "Shipping & tracking automated",
        ],
        bestFor:
          "Brands in WA- and Telegram-heavy markets.",
        media:
          "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "saas",
        tag: "Software",
        title: "Custom Software",
        pitch:
          "Internal tools, dashboards, APIs, automations — built to the spec, not to a framework's preferences.",
        pills: [
          "Internal Tools",
          "Dashboards",
          "REST & GraphQL APIs",
          "Automations",
          "Auth & Billing",
          "Multi-Tenancy",
          "Infra",
        ],
        features: [
          "Full stack: frontend, backend, infra",
          "Auth, billing, multi-tenancy where needed",
          "Scoped tight — no bloat, no boilerplate",
        ],
        bestFor:
          "Founders who know exactly what they need built.",
        media:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },

  collaboration: {
    eyebrow: "How we work",
    headline: "Bring a design, or don't.",
    modes: [
      {
        title: "Design-ready",
        body: "You have Figma. We build it, faithfully.",
      },
      {
        title: "From scratch",
        body: "We'll design and build, end to end.",
      },
      {
        title: "Collaborative",
        body: "Your designer, our engineers — or vice versa — in the same room.",
      },
    ],
  },

  pricing: {
    eyebrow: "Clear numbers, no surprise invoices",
    headline: "Priced like software, not like consulting.",
    sub: "Two offerings have a starting price. Two scale with scope. Everything's negotiable within reason.",
    items: [
      {
        id: "headless-shopify",
        tag: "Flagship · Fixed",
        title: "Headless Shopify",
        price: "TBD",
        priceNote: "one-time build",
        subline: "+ TBD/mo for the Attribution Dashboard",
        bullets: [
          "Next.js storefront",
          "Pixel + GA4",
          "PostHog",
          "Shopify setup",
          "Email templates",
          "Attribution Dashboard",
        ],
        footnote:
          "Negotiable for teams with ready Figma or existing infrastructure.",
        cta: { label: "Start a build", href: "#contact" },
      },
      {
        id: "whatsapp",
        tag: "Fixed",
        title: "WhatsApp Bot",
        price: "TBD",
        priceNote: "one-time build",
        subline: "Hosting & message fees billed at cost",
        bullets: [
          "Catalogue sync",
          "Order flow",
          "Payment integration",
          "Shipping & tracking",
          "Standalone or paired",
        ],
        footnote:
          "Negotiable based on catalogue size and payment provider.",
        cta: { label: "Start a build", href: "#contact" },
      },
      {
        id: "telegram",
        tag: "Flexible",
        title: "Telegram Bot",
        price: "TBD",
        priceNote: "range",
        subline: "Priced by scope — catalogue, payments, integrations",
        bullets: [
          "Everything in WhatsApp, tailored",
          "Inline ordering",
          "Channel + bot hybrids",
        ],
        footnote: "Tell us the flow, we'll quote in a day.",
        cta: { label: "Get a quote", href: "#contact" },
      },
      {
        id: "saas",
        tag: "Flexible",
        title: "Custom Ecommerce / SaaS",
        price: "TBD",
        priceNote: "starts at",
        subline: "Scope drives price — no fixed tiers, no padded line items",
        bullets: [
          "Custom frontend + backend",
          "Payments",
          "Auth",
          "Whatever the software is",
        ],
        footnote: "Pay for what you need. Nothing else.",
        cta: { label: "Scope a project", href: "#contact" },
      },
    ],
    finePrint:
      "All prices exclude GST. We're happy to split milestones, invoice through your entity, or quote in USD/EUR for international clients.",
  },

  team: {
    eyebrow: "Two engineers, one designer",
    headline: "Small team.",
    headlineEm: "Uncomfortably",
    headlineB: " fast.",
    body: "Tilde is three people. That's the whole company. You talk directly to the people writing the code and drawing the screens — because there isn't anyone else. It's the reason we ship in weeks, not quarters.",
    members: [
      {
        name: "TBD",
        role: "Engineering",
        bio: "Ships the backend. Cares about the 99th percentile.",
        image:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "TBD",
        role: "Engineering",
        bio: "Ships the frontend. Believes pixel precision is engineering.",
        image:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "TBD",
        role: "Design",
        bio: "Draws screens that hold up in production. Makes the hard calls on what to leave out.",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },

  focus: {
    eyebrow: "Where we're sharpest",
    headline: "Design and web engineering, in the same conversation.",
    body: "We don't do everything. What we do well is the thing most agencies split across two teams: visual design and the engineering to ship it. That collapse is the reason our work doesn't drift between Figma and production — the person who drew it and the person who built it were sitting next to each other.",
    points: [
      {
        title: "Design that holds up in code.",
        body: "We design in the browser's constraints, not against them.",
      },
      {
        title: "Engineering that keeps the polish.",
        body: "Animations, states, edges — shipped, not cut.",
      },
      {
        title: "One team. One timeline.",
        body: "No handoffs. No \"that wasn't in the spec.\"",
      },
    ],
  },

  faq: {
    eyebrow: "FAQs",
    headline: "Can't find your answer?",
    sub: "Book a call, or email us directly.",
    cta: { label: "Book a call", href: "#contact" },
    items: [
      {
        q: "Why choose Tilde over hiring in-house or a freelancer?",
        a: "You get senior-level design and engineering without the six-figure salary, recruitment time, or benefits overhead. Because we're three people you also talk directly to the people writing the code — no account manager relay.",
      },
      {
        q: "How does your pricing work?",
        a: "Two offerings have fixed build prices (Headless Shopify and WhatsApp Bot). The other two (Telegram Bot and Custom Ecommerce/SaaS) scale with scope and we quote in a day. Everything's negotiable within reason.",
      },
      {
        q: "Will I be locked into a contract?",
        a: "No. Projects are scoped and milestoned. If you want ongoing support after launch we'll put a short retainer in place — but there's no long lock-in.",
      },
      {
        q: "What's the Attribution Dashboard and why is it a subscription?",
        a: "When you go headless, Shopify loses native attribution. We built a login-based dashboard that unifies Meta, GA4, PostHog and Shopify data into one picture. It's monthly because it's hosted software we maintain, not a one-off build.",
      },
      {
        q: "Do you work with teams that already have a Figma ready?",
        a: "Yes. Design-ready, from-scratch, and collaborative are all valid. If you have a designer and need engineering, that's our favourite combination — we slot in without stepping on toes.",
      },
      {
        q: "How long does a typical project take?",
        a: "Headless Shopify: 3–5 weeks end-to-end. WhatsApp Bot: 2–4 weeks. Custom ecommerce and SaaS depend on scope — a focused MVP is usually 6–10 weeks.",
      },
      {
        q: "Which payment providers and regions do you support?",
        a: "Stripe, Razorpay, Shopify Payments, PayPal, and most regional providers. We've shipped to India, MENA, SEA, LATAM, and the EU — tell us the market and we'll confirm.",
      },
      {
        q: "What happens after launch?",
        a: "We offer post-launch support retainers for bug fixes, iteration, and small feature work. For headless Shopify clients, the Attribution Dashboard subscription includes ongoing platform updates.",
      },
    ],
  },

  contactSection: {
    eyebrow: "Ready when you are",
    headline: "Book 20 minutes with us.",
    body: "Bring what you have — a Figma, a Notion doc, a half-sentence idea. We'll tell you honestly whether we're the right team and, if so, what the shape of the work looks like. No pitch deck, no discovery call, no sales.",
  },

  nav: [
    { label: "Services", href: "#offerings" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  footer: {
    columns: [
      {
        title: "Services",
        links: [
          { label: "Headless Shopify", href: "#offerings" },
          { label: "Custom Ecommerce", href: "#offerings" },
          { label: "Bots", href: "#offerings" },
          { label: "Custom SaaS", href: "#offerings" },
        ],
      },
      {
        title: "Studio",
        links: [
          { label: "Team", href: "#team" },
          { label: "Process", href: "#focus" },
          { label: "FAQs", href: "#faq" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Elsewhere",
        links: [
          { label: "X / Twitter", href: "https://twitter.com/TildeStudio" },
          { label: "LinkedIn", href: "#" },
          { label: "GitHub", href: "#" },
        ],
      },
    ],
  },
};
