export const whatsIncluded = [
  { group: "Design", items: ["Figma mockups (or implement yours)", "2 revision rounds", "Component library", "Mobile-first responsive"] },
  { group: "Storefront", items: ["Custom Next.js 15 (App Router)", "TypeScript, strict mode", "Edge-rendered for speed", "Optimised image pipeline"] },
  { group: "Backend", items: ["Shopify Storefront API integration", "Cart & inventory sync", "Customer accounts (optional)", "Search & filters"] },
  { group: "Checkout", items: ["Shopify-native checkout", "OR Razorpay (India)", "Switch via single env var", "Subscriptions module (opt-in)"] },
  { group: "Analytics", items: ["Meta Pixel + Conversions API", "GA4 + Measurement Protocol", "MS Clarity heatmaps", "Shopify native analytics"] },
  { group: "Marketing", items: ["Email marketing setup (Klaviyo)", "Welcome / abandoned cart flows", "Product setup & content", "SEO meta + sitemaps"] },
  { group: "Launch", items: ["Hosting setup on Vercel", "Domain & DNS configuration", "30-day post-launch support", "Full code handover"] },
] as const;

export const comparison = [
  {
    dim: "Brand expression",
    theme: "Constrained by Liquid + theme blocks",
    headless: "Anything you can design, we can build",
  },
  {
    dim: "Performance",
    theme: "Theme bloat + app scripts tank Core Web Vitals",
    headless: "RSC + edge rendering, LCP < 2s",
  },
  {
    dim: "Flexibility",
    theme: "App marketplace dependencies",
    headless: "Standard React ecosystem",
  },
  {
    dim: "Checkout options",
    theme: "Shopify-only",
    headless: "Shopify OR Razorpay, switchable",
  },
  {
    dim: "Code ownership",
    theme: "Locked to theme vendor",
    headless: "Full handover, GitHub repo you own",
  },
];

export const timeline = [
  {
    week: "Week 1",
    title: "Brief & design",
    body: "Discovery call, brand audit, Figma mockups for home, product, collection, cart, checkout pages.",
  },
  {
    week: "Week 2",
    title: "Build",
    body: "Storefront scaffolded. Shopify integration wired. Daily preview URL with progress.",
  },
  {
    week: "Week 3",
    title: "Integrate",
    body: "Checkout (Shopify or Razorpay), analytics fan-out, email flows, product setup.",
  },
  {
    week: "Week 4",
    title: "Test & launch",
    body: "QA, perf passes, staging review with you, DNS swap, post-launch monitoring.",
  },
];

export const headlessFaq = [
  {
    q: "Why Next.js specifically?",
    a: "Server components, edge rendering, the largest React ecosystem, and Vercel's CDN make it the fastest path to a Lighthouse-95 storefront. We're also fluent in Remix and Nuxt if you have a strong preference — talk to us.",
  },
  {
    q: "What about Shopify apps I currently use?",
    a: "Most app functionality (reviews, upsells, loyalty) can be re-implemented natively or reached via their APIs. We audit your existing apps in week 1 and propose a swap-or-keep plan for each.",
  },
  {
    q: "Will my SEO ranking drop?",
    a: "No. We preserve URL structures, set up 301s for anything that has to change, and ship a faster site than your current one — which Google rewards. We've never seen a ranking drop post-migration when this is done correctly.",
  },
  {
    q: "Can I still edit my products in Shopify admin?",
    a: "Yes. Shopify admin is your source of truth — products, collections, customers, orders all live there. The storefront just renders that data, faster and prettier.",
  },
  {
    q: "What if I need a feature that's not in the package?",
    a: "We'll scope it on the call and re-quote if it's substantial. Small additions inside the ₹40,000 package are no-charge if they take an hour or two.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "30 days post-launch is included. After that, monthly retainers start at ₹15,000/month for bug fixes, small features, and on-call support. Or take it in-house — the code is fully documented.",
  },
];
