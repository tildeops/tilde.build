import type { BlogPost } from "@/content/blog/types";

function Body() {
  return (
    <>
      <p>
        For an Indian store, checkout choice comes down to one question first:{" "}
        <strong>where are your customers?</strong> If most pay in INR with UPI,{" "}
        <strong>Razorpay</strong> is usually the right default. If you sell
        mostly internationally, <strong>Stripe</strong> or{" "}
        <strong>Shopify Payments</strong> fit better. Here is how they compare.
      </p>

      <h2>Quick comparison</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Razorpay</th>
            <th>Stripe</th>
            <th>Shopify Payments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Best for</td>
            <td>India / INR</td>
            <td>Global / cards</td>
            <td>Shopify-native stores</td>
          </tr>
          <tr>
            <td>UPI</td>
            <td>Yes, first-class</td>
            <td>Limited</td>
            <td>Via providers, varies</td>
          </tr>
          <tr>
            <td>India availability</td>
            <td>Built for India</td>
            <td>Available, card-led</td>
            <td>Region-dependent</td>
          </tr>
          <tr>
            <td>Setup</td>
            <td>Standalone integration</td>
            <td>Standalone integration</td>
            <td>Native, lowest friction</td>
          </tr>
        </tbody>
      </table>

      <h2>Razorpay — the India default</h2>
      <p>
        Razorpay supports UPI, cards, netbanking, and wallets natively, which
        matches how most Indian shoppers actually pay. UPI in particular drives
        conversion for INR checkouts — leaving it out costs you completed
        orders. For a store whose revenue is mostly domestic, Razorpay is the
        sensible default.
      </p>

      <h2>Stripe — when you sell globally</h2>
      <p>
        Stripe shines for international, card-led businesses: strong developer
        tooling, broad currency support, subscriptions, and a clean API. If a
        large share of your revenue is overseas, Stripe (often alongside
        Razorpay for India) is a strong pairing.
      </p>

      <h2>Shopify Payments — lowest friction on Shopify</h2>
      <p>
        If you are on Shopify and it is available in your region, Shopify
        Payments is the least work: it is native, so there is no separate
        gateway to wire up, and it avoids Shopify&apos;s third-party transaction
        fee. The trade-off is less control and regional limits on methods like
        UPI.
      </p>

      <h2>You do not have to pick just one</h2>
      <p>
        A well-built (especially headless) storefront can switch gateways per
        region — Razorpay for India, Stripe or Shopify Payments for
        international — so each customer sees the payment methods they expect.
        That is usually the highest-converting setup for a brand selling in both
        markets.
      </p>

      <h3>The short version</h3>
      <p>
        Domestic and INR-heavy: start with Razorpay for UPI. Global and
        card-led: Stripe. All-in on Shopify with no UPI need: Shopify Payments.
        Selling in both? Route by region.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "razorpay-vs-stripe-vs-shopify-payments",
  title: "Razorpay vs Stripe vs Shopify Payments: checkout for an Indian store",
  description:
    "How to choose a checkout provider for an Indian ecommerce store — Razorpay for UPI/INR, Stripe for global cards, Shopify Payments for native simplicity.",
  summary:
    "For an India-first store, Razorpay is usually the default because it supports UPI and local methods natively, which drives INR conversion. Stripe fits global, card-led businesses; Shopify Payments is lowest-friction if you are on Shopify and it is available in your region. A headless storefront can route gateways per region so you do not have to choose only one.",
  datePublished: "2026-05-19",
  dateModified: "2026-05-19",
  topics: ["Payments", "India", "Ecommerce", "Razorpay"],
  readingTime: "5 min read",
  variant: 3,
  Body,
};
