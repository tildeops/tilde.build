export const site = {
  name: "tilde",
  legalName: "Tilde Infotech Solutions Pvt. Ltd.",
  tagline: "One studio. Whole stack.",
  description:
    "Custom web, mobile apps, Shopify storefronts, and WhatsApp/Telegram bots — built by a small team of senior engineers.",
  url: "https://tilde.build",
  contactEmail: "hello@tilde.build",
  calcomUrl: "tilde/discovery-call",
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
  googleSiteVerification: process.env.GSC_VERIFICATION ?? "",
};

export const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];
