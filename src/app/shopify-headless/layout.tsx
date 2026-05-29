import * as React from "react";

/**
 * Page-scoped Bridge-style theme: cool white + electric blue + heavy sans.
 * The `data-page-theme="bridge"` attribute is picked up by globals.css
 * (`html:has([data-page-theme="bridge"])` blocks) to override color and
 * font tokens for this entire page only. The NotchNav is rendered globally
 * from the root layout.
 */
export default function ShopifyHeadlessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-page-theme="bridge">{children}</div>;
}
