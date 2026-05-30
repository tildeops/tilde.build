import type { MetadataRoute } from "next";
import { site, BLOG_INDEXABLE } from "@/lib/site";
import { posts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Blog is withheld from the sitemap until BLOG_INDEXABLE flips on (it's also
  // served `noindex` in the meantime). Keeps the index and every post out of
  // search while the section is being finished.
  const blogEntries: MetadataRoute.Sitemap = BLOG_INDEXABLE
    ? [
        { url: `${site.url}/blog`, lastModified: now, priority: 0.7 },
        ...posts.map((p) => ({
          url: `${site.url}/blog/${p.slug}`,
          lastModified: new Date(p.dateModified),
          priority: 0.7,
        })),
      ]
    : [];

  return [
    { url: site.url, lastModified: now, priority: 1.0 },
    { url: `${site.url}/shopify-headless`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/pricing`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/pricing/shopify`, lastModified: now, priority: 0.85 },
    { url: `${site.url}/pricing/ecommerce`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/pricing/whatsapp`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/pricing/telegram`, lastModified: now, priority: 0.75 },
    { url: `${site.url}/pricing/custom`, lastModified: now, priority: 0.75 },
    { url: `${site.url}/about`, lastModified: now, priority: 0.7 },
    ...blogEntries,
    { url: `${site.url}/contact`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: now, priority: 0.3 },
  ];
}
