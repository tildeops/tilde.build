import { site } from "@/lib/site";
import { faq } from "@/lib/content";

export function OrganizationLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    taxID: site.gst,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og.jpg`,
    email: site.contactEmail,
    description: site.description,
    areaServed: "Worldwide",
    sameAs: [site.social.x, site.social.github, site.social.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "IN",
    },
  };
  return <Script data={data} />;
}

export function WebSiteLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
  return <Script data={data} />;
}

/** Renders a BreadcrumbList for a sub-page: Home → <page>. */
export function BreadcrumbLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
  return <Script data={data} />;
}

export function ServiceLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom software development",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "Worldwide",
    offers: [
      {
        "@type": "Offer",
        name: "Custom web software",
      },
      {
        "@type": "Offer",
        name: "Custom ecommerce storefronts",
      },
      {
        "@type": "Offer",
        name: "Headless Shopify storefront",
        price: "40000",
        priceCurrency: "INR",
      },
      {
        "@type": "Offer",
        name: "Mobile apps (iOS, Android, React Native)",
      },
      {
        "@type": "Offer",
        name: "WhatsApp and Telegram bots",
      },
      {
        "@type": "Offer",
        name: "Monthly engineering retainer",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "60000",
          priceCurrency: "INR",
        },
      },
    ],
  };
  return <Script data={data} />;
}

export function FAQLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <Script data={data} />;
}

function Script({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
