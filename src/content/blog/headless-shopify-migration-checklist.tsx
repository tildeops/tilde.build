import type { BlogPost } from "@/content/blog/types";

function Body() {
  return (
    <>
      <p>
        Going headless does not have to cost you rankings or sales. The fear is
        reasonable — a migration done carelessly can tank both — but when URLs
        are preserved, redirects are set, and the new site is faster, search
        rankings carry over and conversions usually improve. Here is the
        checklist we run.
      </p>

      <h2>Before you switch</h2>
      <ul>
        <li>
          <strong>Crawl and inventory every URL.</strong> Export your current
          URLs, top landing pages, and the queries that drive traffic so nothing
          is lost silently.
        </li>
        <li>
          <strong>Map old → new.</strong> Decide which URLs stay identical and
          which change, and plan a 301 redirect for every one that moves.
        </li>
        <li>
          <strong>Baseline your metrics.</strong> Record current rankings,
          organic traffic, Core Web Vitals, and conversion rate so you can prove
          the migration helped.
        </li>
        <li>
          <strong>Audit your apps.</strong> List what each Shopify app does;
          plan to re-implement the important ones natively or via their APIs.
        </li>
      </ul>

      <h2>During the build</h2>
      <ul>
        <li>
          <strong>Preserve URL structure</strong> wherever possible — the
          cheapest SEO insurance is not changing URLs at all.
        </li>
        <li>
          <strong>Keep Shopify as the backend.</strong> Products, customers,
          orders, and checkout stay in Shopify; only the storefront is replaced,
          so there is no risky data export.
        </li>
        <li>
          <strong>Match metadata and structured data.</strong> Carry over
          titles, descriptions, canonical tags, and product schema so search
          engines see continuity.
        </li>
        <li>
          <strong>Wire analytics server-side</strong> before launch so you never
          lose measurement during the cutover.
        </li>
      </ul>

      <h2>Launch day</h2>
      <ul>
        <li>
          <strong>Deploy the 301 redirects</strong> and test a sample of old
          URLs end to end.
        </li>
        <li>
          <strong>Submit the new sitemap</strong> in Google Search Console and
          Bing Webmaster Tools.
        </li>
        <li>
          <strong>Verify Core Web Vitals</strong> on mobile — the new site
          should be measurably faster, which Google rewards.
        </li>
      </ul>

      <h2>After launch</h2>
      <ul>
        <li>
          <strong>Watch coverage and crawl errors</strong> in Search Console for
          the first few weeks and fix any 404s fast.
        </li>
        <li>
          <strong>Compare against your baseline.</strong> Expect rankings to hold
          and speed-driven conversion to climb.
        </li>
      </ul>

      <h2>Will rankings really survive?</h2>
      <p>
        Done correctly, yes — we have not seen a ranking drop from a clean
        migration. The damage comes from skipping redirects or changing URLs
        carelessly, not from headless itself. Preserve structure, redirect what
        moves, ship faster, and search treats it as an upgrade.
      </p>

      <h3>The short version</h3>
      <p>
        Inventory URLs, map and 301-redirect anything that changes, keep Shopify
        as the backend, match metadata and schema, then submit sitemaps and
        watch Search Console. A faster site with preserved URLs keeps its
        rankings and tends to convert better.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "headless-shopify-migration-checklist",
  title: "The headless Shopify migration checklist: switch without losing SEO or sales",
  description:
    "A step-by-step checklist for migrating to a headless Shopify storefront without losing search rankings or conversions — URLs, 301s, schema, and launch checks.",
  summary:
    "A clean headless migration preserves rankings: inventory every URL, map and 301-redirect anything that changes, keep Shopify as the backend, carry over metadata and structured data, then submit sitemaps to Google and Bing and monitor Search Console. Ranking drops come from skipped redirects and careless URL changes — not from going headless. A faster site usually converts better.",
  datePublished: "2026-04-21",
  dateModified: "2026-04-21",
  topics: ["Headless Shopify", "SEO", "Migration"],
  readingTime: "6 min read",
  variant: 5,
  Body,
};
