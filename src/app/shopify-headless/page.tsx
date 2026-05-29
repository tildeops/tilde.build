import { FAQ } from "@/components/sections/faq";
import { HeroBento } from "@/components/sections/shopify-headless/hero-bento";
import { MacbookReveal } from "@/components/sections/shopify-headless/macbook-reveal";
import { IntegrationsGrid } from "@/components/sections/shopify-headless/integrations-grid";
import { MessagingBots } from "@/components/sections/shopify-headless/messaging-bots";
import { EmailTemplateSwap } from "@/components/sections/shopify-headless/email-templates";
import { AttributionDashboard } from "@/components/sections/shopify-headless/attribution-dashboard";
import { PricingHeadless } from "@/components/sections/shopify-headless/pricing-headless";
import { BridgeFinalCTA } from "@/components/sections/shopify-headless/bridge-final-cta";
import { BreadcrumbLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { headlessFaqItems } from "@/lib/shopify-headless/faq";

export const metadata = pageMetadata({
  title: "Headless Shopify Storefronts",
  description:
    "Tilde rebuilds your Shopify store as a custom Next.js storefront. Faster, fully on-brand, with attribution that adds up — and add-ons for WhatsApp bots, custom emails, and a unified dashboard.",
  path: "/shopify-headless",
});

// Uniform inter-section spacer. Pinned + sticky sections end flush with the
// next one, so we inject this between them to keep vertical rhythm consistent
// with the SectionFrame-based sections lower on the page. Mobile gets a much
// shorter spacer so the empty interval between a pinned section unpinning
// and the next section repinning doesn't read as a "dead zone".
const Gap = () => (
  <div aria-hidden className="h-8 w-full md:h-28 lg:h-32" />
);

export default function ShopifyHeadlessPage() {
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Headless Shopify", path: "/shopify-headless" },
        ]}
      />
      <HeroBento />
      <MacbookReveal />
      <Gap />
      <IntegrationsGrid />
      <Gap />
      <MessagingBots />
      <Gap />
      <EmailTemplateSwap />
      <AttributionDashboard />
      <PricingHeadless />
      <FAQ items={headlessFaqItems} id="headless-faq" />
      <BridgeFinalCTA />
    </>
  );
}
