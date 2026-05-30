import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Transparent base prices for headless Shopify, custom ecommerce, WhatsApp and Telegram bots. Pick the add-ons you need and get a quote.",
  path: "/pricing",
});

export default function PricingIndexPage() {
  // The detailed pricing lives under per-service subroutes; send the bare
  // /pricing URL to the flagship Shopify breakdown.
  redirect("/pricing/shopify");
}
