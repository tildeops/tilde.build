import type { BlogPost } from "@/content/blog/types";

function Body() {
  return (
    <>
      <p>
        If Meta, GA4, and Shopify each report a different number of orders, you
        are not alone — and it is not your imagination. The cause is{" "}
        <strong>client-side tracking</strong> that browsers, ad blockers, and
        privacy features increasingly drop. The fix is to move your events{" "}
        <strong>server-side</strong> so every platform reads from one reliable
        stream.
      </p>

      <h2>Why the numbers never match</h2>
      <ul>
        <li>
          <strong>Blocked pixels.</strong> Ad blockers and tracking-prevention
          stop browser-side tags from firing, so conversions go uncounted.
        </li>
        <li>
          <strong>Lost cookies.</strong> Short cookie lifetimes break the link
          between an ad click and a later purchase.
        </li>
        <li>
          <strong>Different windows and models.</strong> Each platform counts
          conversions over different attribution windows, so totals diverge even
          when tracking works.
        </li>
      </ul>

      <h2>The fix: server-side events</h2>
      <p>
        Instead of relying on the browser, send the key events (page view, add
        to cart, purchase) from the server to each platform&apos;s API:
      </p>
      <ul>
        <li>
          <strong>Meta Conversions API (CAPI)</strong> for ad attribution that
          survives blockers.
        </li>
        <li>
          <strong>GA4 Measurement Protocol</strong> for reliable analytics.
        </li>
        <li>
          <strong>Shopify&apos;s own order data</strong> as the source of
          truth.
        </li>
      </ul>
      <p>
        Converge all three on a single server-side event stream and the figures
        line up no matter who you ask. This is exactly the kind of thing a theme
        plus a stack of apps tends to get wrong — and where a headless build, or
        a focused attribution project, fixes it properly.
      </p>

      <h2>Client-side vs server-side, briefly</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Client-side pixels</th>
            <th>Server-side events</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Blocked by ad blockers</td>
            <td>Often</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Depends on cookies</td>
            <td>Heavily</td>
            <td>Much less</td>
          </tr>
          <tr>
            <td>Data accuracy</td>
            <td>Leaky</td>
            <td>Reliable</td>
          </tr>
          <tr>
            <td>Effect on page speed</td>
            <td>Adds main-thread work</td>
            <td>Off the critical path</td>
          </tr>
        </tbody>
      </table>

      <h2>Seeing it in one place</h2>
      <p>
        Once events are server-side, an attribution dashboard can show
        channel-level ROAS, blended CAC, and contribution that actually match
        the platforms — so you can spend with confidence instead of arguing with
        three dashboards.
      </p>

      <h3>The short version</h3>
      <p>
        Mismatched numbers come from leaky client-side tracking. Move to Meta
        CAPI + GA4 Measurement Protocol + Shopify order data on one server-side
        stream, and your attribution finally agrees with itself.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "fix-shopify-attribution",
  title: "Shopify attribution is broken: making Meta, GA4 & Shopify agree",
  description:
    "Why Meta, GA4, and Shopify report different numbers — and how server-side events (Meta CAPI + GA4 Measurement Protocol) make your ecommerce attribution agree.",
  summary:
    "Meta, GA4, and Shopify disagree because client-side pixels get blocked, cookies expire, and each platform uses different attribution windows. The fix is server-side events — Meta Conversions API and GA4 Measurement Protocol converged with Shopify order data on one stream — so the numbers match and a dashboard can show ROAS you can trust.",
  datePublished: "2026-05-05",
  dateModified: "2026-05-05",
  topics: ["Attribution", "Analytics", "Ecommerce", "Headless Shopify"],
  readingTime: "5 min read",
  variant: 1,
  Body,
};
