import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Builds per-page `Metadata` with a canonical URL and matching Open Graph /
 * Twitter entries, so every page shares a consistent social-preview shape.
 * `path` is root-relative (e.g. "/pricing"). Every page carries the shared
 * static `/og.jpg` banner (a child segment's `openGraph` shallow-replaces the
 * root layout's, so the image must be set here too).
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = `${title} · ${site.name}`;
  const ogImage = {
    url: "/og.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: `${site.name} — ${site.tagline}`,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og.jpg"],
    },
  };
}
