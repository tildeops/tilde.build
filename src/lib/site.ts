export const site = {
  name: "tilde",
  legalName: "Tilde Infotech Solutions Pvt. Ltd.",
  tagline: "One studio. Whole stack.",
  description:
    "Custom web, mobile apps, Shopify storefronts, and WhatsApp/Telegram bots — built by a small team of senior engineers.",
  url: "https://tilde.build",
  contactEmail: "hello@tilde.build",
  /** GST registration number (GSTIN). */
  gst: "33AALCT4253A1ZO",
  /**
   * Cal.com scheduling. `link` is the booking calLink and `namespace` the
   * embed namespace — single source of truth for the inline embeds and the
   * popup CTAs.
   */
  cal: { namespace: "30min", link: "tildeops/30min" },
  city: "India",
  social: {
    x: "https://x.com/tilde",
    github: "https://github.com/tilde",
    linkedin: "https://linkedin.com/company/tilde",
  },
  /** X/Twitter handle for the `twitter:site` / `twitter:creator` tags. */
  twitterHandle: "@tilde",
  /**
   * Third-party analytics. IDs are read from env so they can vary per
   * environment; the defaults are the production values.
   */
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-S15DSE4N46",
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "wyjm95yi3o",
  },
  /**
   * Google Search Console verification token. Paste the value from the
   * "HTML tag" verification method, or set GSC_VERIFICATION in the env.
   * Empty string → the verification meta tag is omitted.
   */
  googleSiteVerification:
    process.env.GSC_VERIFICATION ??
    "WTK7VAZN8YhwMBHqSsXu1gEqYBOciG08ES35Ywh6y5M",
  /**
   * "Build in progress" hero overlay. On by default while the site is being
   * built; set NEXT_PUBLIC_BUILD_IN_PROGRESS=false to hide it (e.g. at launch).
   */
  buildInProgress: process.env.NEXT_PUBLIC_BUILD_IN_PROGRESS !== "false",
};

export const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];
