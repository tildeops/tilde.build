import { site } from "@/lib/site";
import { faq } from "@/lib/content";
import { SERVICES, type ServicePricing } from "@/lib/pricing/services";
import type { BlogPost } from "@/content/blog/types";

export function OrganizationLd() {
  const data = {
    "@context": "https://schema.org",
    // Dual type: a general Organization that is also a ProfessionalService, so
    // AI/knowledge-graph extractors treat tilde as a known service entity.
    "@type": ["Organization", "ProfessionalService"],
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
    // Topical-authority signal AI Mode uses to pick sources per query category.
    knowsAbout: [
      "Headless Shopify",
      "Shopify Hydrogen",
      "Next.js development",
      "Custom ecommerce development",
      "WhatsApp Business API integration",
      "Telegram Bot API",
      "React Native app development",
      "Custom internal tools and dashboards",
    ],
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

/**
 * Studio-wide service catalogue for the homepage. Driven from the single
 * pricing source (`SERVICES`) so the schema can never drift from on-page
 * prices. Priced services carry an INR base price; on-call services omit it.
 */
export function ServiceLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom software development",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software development services",
      itemListElement: SERVICES.map((s) => {
        const base = s.basePrice;
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.tagline,
            url: `${site.url}/pricing/${s.slug}`,
          },
          ...(base ? { price: String(base.inr), priceCurrency: "INR" } : {}),
        };
      }),
    },
  };
  return <Script data={data} />;
}

/**
 * Detailed Service + Offer schema for a single `/pricing/[service]` page.
 * Driven from the `ServicePricing` object already passed into the page, so the
 * structured prices, currencies, timeline, and included features match exactly
 * what's rendered. Priced services emit one Offer per currency; on-call
 * services (basePrice === null) emit the Service without a price.
 */
export function ServicePricingLd({ service }: { service: ServicePricing }) {
  const base = service.basePrice;
  const offers = base
    ? (["INR", "USD"] as const).map((currency) => ({
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: String(currency === "INR" ? base.inr : base.usd),
          priceCurrency: currency,
          valueAddedTaxIncluded: false,
        },
        description: `Base build (${service.priceNote}), delivered in ${service.timeline}.`,
        availability: "https://schema.org/InStock",
        url: `${site.url}/pricing/${service.slug}`,
      }))
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} — ${site.name}`,
    serviceType: service.name,
    description: `${service.tagline} Includes: ${service.baseFeatures.join("; ")}.`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    url: `${site.url}/pricing/${service.slug}`,
    ...(offers ? { offers } : {}),
  };
  return <Script data={data} />;
}

/**
 * FAQPage schema. Defaults to the homepage FAQ but accepts any `{ q, a }[]`
 * list (e.g. the dedicated `/shopify-headless` FAQ) so each page with an FAQ
 * can ship matching structured data.
 */
export function FAQLd({
  items = faq,
}: {
  items?: readonly { q: string; a: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <Script data={data} />;
}

/**
 * BlogPosting schema for a single blog post. Authored and published by the
 * studio (Organization) — no per-person attribution is invented. AI answer
 * engines weight dated, structured articles when picking sources.
 */
export function BlogPostingLd({ post }: { post: BlogPost }) {
  const url = `${site.url}/blog/${post.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    abstract: post.summary,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    keywords: post.topics.join(", "),
    inLanguage: "en",
    url,
    mainEntityOfPage: url,
    image: `${site.url}/og.jpg`,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
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
