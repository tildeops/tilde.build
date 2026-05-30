export const site = {
  name: "tilde",
  legalName: "Tilde Infotech Solutions Pvt. Ltd.",
  tagline: "One studio. Whole stack.",
  description:
    "From Shopify storefronts to internal tools and AI bots, we build software tailored to your business. Just experienced engineers shipping quickly and working closely with your team.",
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
    x: "https://x.com/tildeops",
    github: "https://github.com/tilde",
    linkedin: "https://linkedin.com/company/tilde",
  },
  /** X/Twitter handle for the `twitter:site` / `twitter:creator` tags. */
  twitterHandle: "@tildeops",
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
   * Maintenance mode. On by default while the site is being finished: the
   * whole site collapses to a single, non-scrollable hero screen with no
   * working navigation. Set NEXT_PUBLIC_MAINTENANCE=false to take the full
   * site live (e.g. at launch).
   */
  maintenance: process.env.NEXT_PUBLIC_MAINTENANCE !== "false",
};

/**
 * Blog visibility switch. While `false`, the blog index and every post are
 * kept out of the sitemap and served with a `noindex` robots directive, so
 * search engines don't crawl or index them yet. The pages still render and
 * carry full metadata — they're just withheld from search. Flip to `true`
 * (or set NEXT_PUBLIC_BLOG_INDEXABLE=true) to list them in the sitemap and
 * allow indexing at launch.
 */
export const BLOG_INDEXABLE = process.env.NEXT_PUBLIC_BLOG_INDEXABLE === "true";

export const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
];
