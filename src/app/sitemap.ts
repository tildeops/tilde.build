import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1.0 },
    { url: `${site.url}/shopify-headless`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/pricing`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: now, priority: 0.3 },
  ];
}
