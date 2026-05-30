import type { BlogPost } from "@/content/blog/types";

function Body() {
  return (
    <>
      <p>
        Store speed is not a vanity metric — it moves revenue. Faster pages
        convert better, and Google uses Core Web Vitals as a ranking signal.
        Here is how we get Shopify storefronts to a{" "}
        <strong>Lighthouse mobile score of 95+</strong>, and why a typical theme
        struggles to.
      </p>

      <h2>Why themes get slow</h2>
      <p>
        A Shopify theme starts fine and degrades as apps pile on. Each installed
        app injects its own scripts, the theme ships more than any single page
        needs, and third-party tags block rendering. The result is a heavy main
        thread and slow Largest Contentful Paint on mobile — exactly where most
        traffic and most drop-off live.
      </p>

      <h2>What actually moves the score</h2>
      <ol>
        <li>
          <strong>Server-render the storefront.</strong> A headless Next.js
          frontend sends mostly-ready HTML instead of assembling the page in the
          browser, so content paints sooner.
        </li>
        <li>
          <strong>Ship less JavaScript.</strong> Replace app scripts with native
          code, and load what remains lazily so it does not block the first
          paint.
        </li>
        <li>
          <strong>Move tags server-side.</strong> Pixels and analytics fired via
          server-side events (Conversions API, Measurement Protocol) keep the
          main thread free and, as a bonus, make attribution more accurate.
        </li>
        <li>
          <strong>Optimise images.</strong> Modern formats, correct sizing, and
          priority hints on the hero image fix most LCP problems.
        </li>
        <li>
          <strong>Cache at the edge.</strong> Deploying on a CDN/edge (we use
          Vercel) puts the storefront physically close to the shopper.
        </li>
      </ol>

      <h2>Why speed pays for itself</h2>
      <p>
        Mobile is where the gains compound: it is the slowest environment and
        the largest share of traffic, so every second shaved off load shows up
        in completed checkouts. One apparel brand we rebuilt went from a mobile
        Lighthouse score of 38 to 96, and its checkout completion rate climbed
        within a month of launch.
      </p>

      <h2>Is 95+ realistic for every store?</h2>
      <p>
        For a headless build, yes — we treat a 95+ mobile Lighthouse score as
        part of the contract rather than a hope. On a theme weighed down by
        many apps it is much harder, which is often the real reason a store goes
        headless in the first place.
      </p>

      <h3>The short version</h3>
      <p>
        Speed is a revenue lever, not a checkbox. Server-rendering, less
        JavaScript, server-side tags, image discipline, and edge hosting are
        what reliably take a Shopify storefront to 95+ on mobile.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "shopify-lighthouse-95",
  title: "How we get Shopify storefronts to Lighthouse 95+ (and why speed sells)",
  description:
    "The concrete techniques that take a Shopify storefront to a 95+ mobile Lighthouse score — server rendering, less JavaScript, server-side tags — and why it lifts revenue.",
  summary:
    "Shopify themes slow down as apps inject scripts and block rendering. A headless rebuild reaches a 95+ mobile Lighthouse score by server-rendering the storefront, shipping less JavaScript, moving pixels server-side, optimising images, and caching at the edge. Speed is a revenue lever: one rebuild went from a mobile score of 38 to 96 with a higher checkout completion rate.",
  datePublished: "2026-05-12",
  dateModified: "2026-05-12",
  topics: ["Performance", "Headless Shopify", "Core Web Vitals"],
  readingTime: "5 min read",
  variant: 5,
  Body,
};
