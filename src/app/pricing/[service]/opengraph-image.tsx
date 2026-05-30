import { SERVICES, SERVICES_MAP } from "@/lib/pricing/services";
import { formatMoney } from "@/lib/pricing/currency";
import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "tilde — pricing";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = SERVICES_MAP[service];
  const eyebrow = s?.basePrice
    ? `From ${formatMoney(s.basePrice, "INR")}`
    : "Pricing";
  return ogImageResponse({ eyebrow, title: s?.name ?? "Pricing" });
}
