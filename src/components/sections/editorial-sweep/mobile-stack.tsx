"use client";

import * as React from "react";
import { useState } from "react";
import { storefronts, type StorefrontMockup } from "@/lib/storefronts";
import { StandardMockup } from "./standard-mockup";
import { TildeMockup } from "./tilde-mockup";

/**
 * Mobile fallback for the editorial sweep section. No pin, no scrub, no GSAP.
 * Renders 4 category blocks vertically; each block has its own browser chrome
 * containing both mockups stacked, swapped via a tab toggle at the top.
 */
export function MobileStack() {
  return (
    <div className="px-4 pt-6 pb-10 sm:px-6">
      <div className="mx-auto max-w-[640px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          ~ The Tilde difference
        </p>
        <h2 className="mt-3 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(1.75rem,8vw,2.4rem)] text-ink">
          Same brand. Twice.{" "}
          <span className="italic shimmer">Reimagined.</span>
        </h2>
        <p className="mt-3 max-w-[44ch] text-[13px] leading-relaxed text-ink-muted">
          Four storefronts, two ways. Tap the toggle to flip between a default
          Shopify template and the same brand rebuilt by us.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-[640px] flex-col gap-14">
        {storefronts.map((brand) => (
          <CategoryBlock key={brand.slug} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function CategoryBlock({ brand }: { brand: StorefrontMockup }) {
  const [view, setView] = useState<"standard" | "tilde">("standard");

  return (
    <section className="flex flex-col gap-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          ~ {brand.category.toLowerCase()}
        </p>
        <h3 className="mt-2 font-display leading-[1.05] tracking-[-0.015em] text-[clamp(1.5rem,6vw,2rem)] text-ink">
          Your{" "}
          <span className="italic text-ink-muted">{brand.noun}</span>,{" "}
          <span className="italic shimmer">reimagined.</span>
        </h3>
      </div>

      {/* Browser chrome with inline tab toggle */}
      <div className="relative overflow-hidden rounded-2xl border border-rule bg-bg-elevated shadow-[0_20px_50px_-30px_rgb(var(--accent-rgb)/0.3)]">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 border-b border-rule bg-bg/70 px-3 py-2.5">
          <span className="size-2 rounded-full bg-rule" />
          <span className="size-2 rounded-full bg-rule" />
          <span className="size-2 rounded-full bg-rule" />
          <div className="ml-2 flex h-5 flex-1 items-center justify-center rounded-md border border-rule bg-bg px-2 font-mono text-[10px] text-ink-muted">
            <span className="opacity-50 mr-1">https://</span>
            {brand.url}
          </div>
        </div>

        {/* View toggle */}
        <div className="grid grid-cols-2 border-b border-rule">
          <button
            type="button"
            onClick={() => setView("standard")}
            className={[
              "py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
              view === "standard"
                ? "bg-bg-elevated text-ink"
                : "bg-bg/40 text-ink-muted",
            ].join(" ")}
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => setView("tilde")}
            className={[
              "py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
              view === "tilde"
                ? "bg-bg-elevated text-accent"
                : "bg-bg/40 text-ink-muted",
            ].join(" ")}
          >
            With Tilde
          </button>
        </div>

        {/* Body — both mockups stacked, CSS-only opacity swap */}
        <div className="relative aspect-[4/5]">
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: view === "standard" ? 1 : 0,
              pointerEvents: view === "standard" ? "auto" : "none",
            }}
          >
            <StandardMockup brand={brand} />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: view === "tilde" ? 1 : 0,
              pointerEvents: view === "tilde" ? "auto" : "none",
            }}
          >
            <TildeMockup brand={brand} />
          </div>
        </div>
      </div>

      {/* Stacked ledger lists */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            The template
          </p>
          <ul className="mt-2 space-y-1.5">
            {brand.standardBullets.map((b) => (
              <li key={b} className="flex gap-2 text-[12px] leading-snug text-ink-muted">
                <span className="text-ink-muted/50">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <hr className="border-rule" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            The Tilde build
          </p>
          <ul className="mt-2 space-y-1.5">
            {brand.tildeBullets.map((b) => (
              <li key={b} className="flex gap-2 text-[12px] leading-snug text-ink">
                <span className="text-accent font-medium">+</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stat row */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-rule pt-4">
        {brand.stat.map((piece, idx) => (
          <React.Fragment key={piece}>
            <span
              className={[
                "font-mono text-[10px] uppercase tracking-[0.22em]",
                idx === 0 ? "text-ink" : "text-ink-muted",
              ].join(" ")}
            >
              {piece}
            </span>
            {idx < brand.stat.length - 1 && (
              <span className="font-mono text-[10px] text-rule">·</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
