import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Builds per-page `Metadata` with a canonical URL and matching Open Graph /
 * Twitter entries, so every page shares a consistent social-preview shape.
 * `path` is root-relative (e.g. "/pricing"). Every page carries the shared
 * static `/og.jpg` banner (a child segment's `openGraph` shallow-replaces the
 * root layout's, so the image must be set here too).
 *
 * Pass `generatedOgImage: true` for routes that ship a code-generated
 * `opengraph-image` file — that omits the explicit image here so Next's file
 * convention can supply the per-page image instead of being overridden.
 *
 * Pass `noindex: true` to mark the route `noindex, follow` — it keeps its full
 * metadata and stays crawlable (so the directive is actually seen) but is held
 * out of the search index. Used for routes not yet ready to rank.
 */
export function pageMetadata({
  title,
  description,
  path,
  generatedOgImage = false,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  generatedOgImage?: boolean;
  noindex?: boolean;
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
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      // Omit when a generated opengraph-image route exists, so it isn't
      // shadowed by the static banner.
      ...(generatedOgImage ? {} : { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(generatedOgImage ? {} : { images: ["/og.jpg"] }),
    },
  };
}
