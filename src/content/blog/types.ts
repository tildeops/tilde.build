import type { ComponentType } from "react";

/**
 * A blog post. Metadata drives the listing page, per-post <head> metadata, the
 * BlogPosting JSON-LD, and the sitemap; `Body` is the rendered article. Authors
 * are the studio (Organization) — see ArticleLd — so no per-person attribution
 * is invented. Dates are ISO `YYYY-MM-DD`.
 */
export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description + social/AI preview. One or two sentences. */
  description: string;
  /** Answer-first TL;DR rendered at the top of the article. */
  summary: string;
  datePublished: string;
  dateModified: string;
  /** Topic tags — also fed to the post's `keywords` and surfaced on the page. */
  topics: string[];
  /** Human-readable reading time, e.g. "6 min read". */
  readingTime: string;
  /**
   * Card background variant (0–5, see lib/blog-card.ts). Drives the index card
   * art and the matching share image. Set per post so neighbours never clash.
   */
  variant: number;
  Body: ComponentType;
};
