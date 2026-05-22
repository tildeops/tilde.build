import type { Metadata } from "next";
import { FAQ } from "@/components/sections/faq";
import { HeroBento } from "@/components/sections/shopify-headless/hero-bento";
import { MacbookReveal } from "@/components/sections/shopify-headless/macbook-reveal";
import { IntegrationsGrid } from "@/components/sections/shopify-headless/integrations-grid";
import { MessagingBots } from "@/components/sections/shopify-headless/messaging-bots";
import { EmailTemplateSwap } from "@/components/sections/shopify-headless/email-templates";
import { AttributionDashboard } from "@/components/sections/shopify-headless/attribution-dashboard";
import { PricingHeadless } from "@/components/sections/shopify-headless/pricing-headless";
import { BridgeFinalCTA } from "@/components/sections/shopify-headless/bridge-final-cta";
import { headlessFaqItems } from "@/lib/shopify-headless/faq";

export const metadata: Metadata = {
  title: "Headless Shopify — the storefront your brand actually deserves",
  description:
    "Tilde rebuilds your Shopify store as a custom Next.js storefront. Faster, fully on-brand, with attribution that adds up — and add-ons for WhatsApp bots, custom emails, and a unified dashboard.",
};

export default function ShopifyHeadlessPage() {
  return (
    <>
      <HeroBento />
      <MacbookReveal />
      <IntegrationsGrid />
      <MessagingBots />
      <EmailTemplateSwap />
      <AttributionDashboard />
      <PricingHeadless />
      <FAQ items={headlessFaqItems} id="headless-faq" />
      <BridgeFinalCTA />
    </>
  );
}
