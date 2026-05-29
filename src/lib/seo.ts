import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Builds per-page `Metadata` with a canonical URL and matching Open Graph /
 * Twitter entries, so every page shares a consistent social-preview shape.
 * `path` is root-relative (e.g. "/pricing"); the og:image is inherited from
 * the root `app/opengraph-image.tsx` unless overridden.
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
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
