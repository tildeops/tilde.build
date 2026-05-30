"use client";

import * as React from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** Fallback fill shown while loading and if the image 404s. */
  tint?: string;
  loading?: "lazy" | "eager";
};

/**
 * Plain <img> with a graceful degrade: a tinted block sits behind the photo so
 * a slow load reads as a colored panel, and an onError flips to that block
 * permanently instead of a broken-image glyph. Used by both storefront mockups.
 */
export function SafeImg({
  src,
  alt,
  className,
  style,
  tint = "#e7e0d6",
  loading = "lazy",
}: Props) {
  const [failed, setFailed] = React.useState(false);

  if (!src || failed) {
    return (
      <span
        aria-hidden
        className={className}
        style={{ ...style, backgroundColor: tint, display: "block" }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      style={{ backgroundColor: tint, ...style }}
      onError={() => setFailed(true)}
    />
  );
}
