import { notFound } from "next/navigation";
import { BreadcrumbLd, ServicePricingLd } from "@/components/seo/json-ld";
import { OnCallPanel } from "@/components/pricing/on-call-panel";
import { QuoteBuilder } from "@/components/pricing/quote-builder";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, SERVICES_MAP } from "@/lib/pricing/services";
import { formatMoney } from "@/lib/pricing/currency";

// Pre-render one static page per service; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata(props: PageProps<"/pricing/[service]">) {
  const { service: slug } = await props.params;
  const service = SERVICES_MAP[slug];
  if (!service) return {};

  // Static metadata defaults to INR; the page itself switches per region.
  const priced =
    service.basePrice !== null
      ? `From ${formatMoney(service.basePrice, "INR")}, negotiable on a call. `
      : "Scoped on a call. ";

  return pageMetadata({
    title: `${service.name} pricing`,
    description: `${priced}${service.tagline} See what's included and pick the add-ons you need.`,
    path: `/pricing/${service.slug}`,
    generatedOgImage: true,
  });
}

export default async function ServicePricingPage(
  props: PageProps<"/pricing/[service]">,
) {
  const { service: slug } = await props.params;
  const service = SERVICES_MAP[slug];
  if (!service) notFound();

  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
          { name: service.name, path: `/pricing/${service.slug}` },
        ]}
      />
      <ServicePricingLd service={service} />
      {service.basePrice === null ? (
        <OnCallPanel service={service} />
      ) : (
        <QuoteBuilder service={service} />
      )}
    </>
  );
}
