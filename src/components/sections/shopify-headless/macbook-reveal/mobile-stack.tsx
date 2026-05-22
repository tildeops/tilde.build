import * as React from "react";
import { storefronts } from "@/lib/storefronts";
import { SectionFrame } from "@/components/layout/section-frame";
import { MacbookFrame } from "./macbook-frame";
import { BrowserShell } from "./browser-shell";
import { DefaultScreen } from "./default-screen";
import { TildeScreen } from "./tilde-screen";

const PICK_SLUG = "plain-skin";

/**
 * Static fallback for screens < 1024px or `prefers-reduced-motion`.
 * Shows the Plain Skin storefront in two stacked frames — default vs Tilde —
 * with the tall mockups clipped to a sensible preview height since the
 * scroll-through animation isn't available here.
 */
export function MobileStack() {
  const brand = storefronts.find((s) => s.slug === PICK_SLUG)!;

  return (
    <SectionFrame id="macbook">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
          <span
            className="size-1.5 rounded-full bg-accent"
            style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
          />
          <span className="text-[12px] font-medium text-ink-muted">
            The before &amp; after
          </span>
        </div>
        <h2 className="mx-auto mt-5 max-w-3xl font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(2rem,5.4vw,3.6rem)]">
          Same Shopify backend. A different universe up front.
        </h2>
      </div>

      <div className="mt-12 space-y-10">
        <p className="text-center text-[12px] font-semibold tracking-[-0.005em] text-ink">
          <span
            className="mr-2 inline-block size-2 -translate-y-px rounded-sm align-middle"
            style={{ backgroundColor: brand.accentHex }}
          />
          {brand.brand}{" "}
          <span className="text-ink-muted">/ {brand.category.toLowerCase()}</span>
        </p>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Default Shopify
            </p>
            <MacbookFrame>
              <BrowserShell url={brand.url}>
                <div className="relative h-full w-full overflow-hidden">
                  <div className="absolute inset-x-0 top-0">
                    <DefaultScreen brand={brand} />
                  </div>
                </div>
              </BrowserShell>
            </MacbookFrame>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Tilde build
            </p>
            <MacbookFrame>
              <BrowserShell url={brand.url}>
                <div className="relative h-full w-full overflow-hidden">
                  <div className="absolute inset-x-0 top-0">
                    <TildeScreen brand={brand} />
                  </div>
                </div>
              </BrowserShell>
            </MacbookFrame>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
