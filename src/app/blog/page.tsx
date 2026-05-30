import { SectionFrame } from "@/components/layout/section-frame";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCTA } from "@/components/layout/contact-cta";
import { BlogExplorer, type BlogCardData } from "@/components/blog/blog-explorer";
import { BreadcrumbLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { BLOG_INDEXABLE } from "@/lib/site";
import {
  posts,
  CATEGORIES,
  categoryForSlug,
  imageForSlug,
} from "@/content/blog";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Guides and answers on headless Shopify, custom ecommerce, hiring a software agency, and shipping software that fits your business.",
  path: "/blog",
  generatedOgImage: true,
  noindex: !BLOG_INDEXABLE,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Serializable card data computed on the server and handed to the client filter
// component (the full BlogPost has a non-serializable Body).
const cards: BlogCardData[] = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  dateLabel: formatDate(p.datePublished),
  readingTime: p.readingTime,
  category: categoryForSlug[p.slug] ?? "Headless Shopify",
  image: imageForSlug[p.slug],
}));

// Categories that actually have posts, in the canonical order.
const categories = CATEGORIES.filter((c) =>
  cards.some((card) => card.category === c),
);

export default function BlogIndexPage() {
  return (
    <div data-page-theme="bridge">
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <PageHero
        eyebrow="~ Blog"
        title="Notes from the studio"
        description="Straight answers on headless Shopify, custom ecommerce, bots, and hiring engineers — written by the people who build them."
      />

      <SectionFrame className="pt-2 md:pt-4" framed={false}>
        <BlogExplorer posts={cards} categories={categories} />
      </SectionFrame>

      <ContactCTA
        title="Have a project in mind?"
        body="Tell us what you're building and we'll point you in the right direction."
      />
    </div>
  );
}
