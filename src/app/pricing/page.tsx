import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { FAQ } from "@/components/sections/faq";
import { IntegrationTile } from "@/components/sections/shopify-headless/integrations-grid";
import { BreadcrumbLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { flagship, addons, excluded } from "@/lib/shopify-headless/pricing";
import { integrations } from "@/lib/shopify-headless/integrations";
import { headlessFaqItems } from "@/lib/shopify-headless/faq";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "₹40,000 fixed for the full headless Shopify rebuild. Full feature breakdown, integrations, and optional add-ons.",
  path: "/pricing",
});

const CATEGORIES: { id: "build" | "migration" | "handover"; label: string; blurb: string }[] = [
  {
    id: "build",
    label: "Build",
    blurb: "Everything that ships on launch day.",
  },
  {
    id: "migration",
    label: "Migration",
    blurb: "Your existing store stays the source of truth.",
  },
  {
    id: "handover",
    label: "Handover",
    blurb: "Code, docs, and 30 days of support.",
  },
];

export default function PricingPage() {
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      {/* Hero */}
      <SectionFrame
        className="pt-6 md:pt-10"
        innerClassName="py-14 md:py-20 lg:py-24"
      >
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Eyebrow>
              <span className="text-accent">~</span> Headless · {flagship.currency}
              {flagship.price.toLocaleString("en-IN")} fixed
            </Eyebrow>
            <h1 className="mt-6 font-display font-extrabold leading-[0.98] tracking-[-0.03em] text-ink text-[clamp(2.5rem,6vw,4.5rem)]">
              One price.{" "}
              <span className="italic text-ink-muted">
                Built into a real business case.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-ink-muted leading-relaxed md:text-lg">
              {flagship.tagline} No deck of tiers, no per-seat surcharges, no
              hosting markup. The whole headless Shopify rebuild on a single
              line item.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={flagship.cta.href}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgb(var(--accent-rgb)/0.55)] transition-all duration-300 hover:scale-[1.02]"
              >
                {flagship.cta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/shopify-headless"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-rule bg-bg-elevated px-6 text-[15px] font-medium text-ink"
              >
                See the build in action
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-2xl border border-rule bg-bg-elevated p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                Project total
              </p>
              <p className="mt-2 font-display font-extrabold text-[clamp(3rem,7vw,4.5rem)] leading-none tracking-[-0.045em] text-ink">
                {flagship.currency}
                {flagship.price.toLocaleString("en-IN")}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                {flagship.priceMeta}
              </p>
              <div className="mt-6 space-y-2 border-t border-rule pt-5 text-[13px] text-ink-muted">
                <p className="flex justify-between">
                  <span>Build · 3–4 weeks</span>
                  <span className="font-medium text-ink">included</span>
                </p>
                <p className="flex justify-between">
                  <span>Migration · backend stays</span>
                  <span className="font-medium text-ink">included</span>
                </p>
                <p className="flex justify-between">
                  <span>Handover · code + docs</span>
                  <span className="font-medium text-ink">included</span>
                </p>
                <p className="flex justify-between">
                  <span>Add-ons · à la carte</span>
                  <span className="font-medium text-accent">priced below</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionFrame>

      {/* What you get — grouped feature breakdown */}
      <SectionFrame id="features">
        <div className="md:max-w-[680px]">
          <Eyebrow>
            <span className="text-accent">~</span> What you get
          </Eyebrow>
          <h2 className="mt-5 font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(2rem,4.6vw,3.2rem)]">
            Every line item, plainly stated.
          </h2>
          <p className="mt-5 text-base text-ink-muted leading-relaxed">
            No vague bundles. Here&apos;s exactly what lands on launch day,
            grouped by phase.
          </p>
        </div>

        <div className="mt-14 space-y-14 md:mt-16 md:space-y-16">
          {CATEGORIES.map((cat) => {
            const items = flagship.features.filter((f) => f.category === cat.id);
            if (!items.length) return null;
            return (
              <div key={cat.id}>
                <div className="flex flex-col gap-2 border-b border-rule pb-4 md:flex-row md:items-end md:justify-between">
                  <h3 className="font-display font-bold text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-[-0.02em] text-ink">
                    {cat.label}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    {cat.blurb}
                  </p>
                </div>
                <ul className="mt-6 grid gap-6 md:grid-cols-2 md:gap-x-10 md:gap-y-8">
                  {items.map((f) => (
                    <li key={f.label} className="flex items-start gap-3">
                      <span
                        className={`mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-md ${
                          f.emphasis
                            ? "bg-accent text-on-accent"
                            : "bg-bg-elevated text-ink-muted ring-1 ring-rule"
                        }`}
                      >
                        <Check className="size-3" />
                      </span>
                      <div>
                        <p
                          className={`text-[15px] font-semibold leading-tight tracking-[-0.005em] ${
                            f.emphasis ? "text-ink" : "text-ink"
                          }`}
                        >
                          {f.label}
                        </p>
                        {f.description && (
                          <p className="mt-1.5 text-[13.5px] text-ink-muted leading-relaxed">
                            {f.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </SectionFrame>

      {/* Integrations wired in */}
      <SectionFrame id="integrations" innerClassName="py-14 md:py-20 lg:py-24">
        <div className="md:max-w-[680px]">
          <Eyebrow>
            <span className="text-accent">~</span> Wired in
          </Eyebrow>
          <h2 className="mt-5 font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(2rem,4.6vw,3.2rem)]">
            {integrations.length} integrations, server-side.
          </h2>
          <p className="mt-5 max-w-xl text-base text-ink-muted leading-relaxed">
            Attribution, analytics, payments, email, support — connected
            properly the first time so the numbers in your dashboards match
            the numbers in your ad accounts.
          </p>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pl-1 pr-12 pb-4 sm:pl-0 sm:pr-16 no-scrollbar [scrollbar-width:none] md:flex-wrap md:overflow-visible md:pr-0">
          {integrations.map((i) => (
            <IntegrationTile key={i.id} item={i} />
          ))}
        </div>

        <p className="mt-6 text-[13px] text-ink-muted">
          + custom integrations on request. Yes, even that obscure one.
        </p>
      </SectionFrame>

      {/* Optional add-ons */}
      <SectionFrame id="addons">
        <div className="md:max-w-[680px]">
          <Eyebrow>
            <span className="text-accent">~</span> Optional à la carte
          </Eyebrow>
          <h2 className="mt-5 font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(2rem,4.6vw,3.2rem)]">
            Add only what you need.
          </h2>
          <p className="mt-5 max-w-xl text-base text-ink-muted leading-relaxed">
            Modules that run in parallel with the core build and don&apos;t
            extend the timeline. Pick zero, pick all four — same fixed
            schedule.
          </p>
        </div>

        <div className="mt-10 space-y-6 md:mt-12 md:space-y-8">
          {addons.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-rule bg-bg-elevated p-6 md:p-8"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <div className="md:max-w-[560px]">
                  <h3 className="font-display font-extrabold text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight tracking-[-0.02em] text-ink">
                    {a.name}
                  </h3>
                  <p className="mt-2 text-[14px] text-ink-muted leading-relaxed md:text-[15px]">
                    {a.description ?? a.blurb}
                  </p>
                </div>
                <p className="font-display text-[clamp(1.5rem,2.8vw,2rem)] font-extrabold leading-none tracking-[-0.025em] text-accent md:text-right">
                  {a.price}
                </p>
              </div>

              {a.included && a.included.length > 0 && (
                <ul className="mt-6 grid gap-3 border-t border-rule pt-5 md:grid-cols-2 md:gap-x-8 md:gap-y-3">
                  {a.included.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-[13.5px] text-ink-muted leading-snug"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </SectionFrame>

      {/* What it doesn't include */}
      <SectionFrame id="excluded" innerClassName="py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow>
              <span className="text-accent">~</span> Billed at cost
            </Eyebrow>
            <h2 className="mt-5 font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(1.75rem,3.6vw,2.4rem)]">
              What we don&apos;t charge you for.
            </h2>
            <p className="mt-5 text-[15px] text-ink-muted leading-relaxed">
              Third-party costs go to the people providing the service. No
              markup, no resale.
            </p>
          </div>
          <ul className="md:col-span-7 space-y-5">
            {excluded.map((e) => (
              <li key={e.label} className="border-b border-rule pb-5 last:border-b-0">
                <p className="text-[15px] font-semibold tracking-[-0.005em] text-ink">
                  {e.label}
                </p>
                <p className="mt-1 text-[13.5px] text-ink-muted leading-snug">
                  {e.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SectionFrame>

      {/* FAQ */}
      <FAQ items={headlessFaqItems} id="pricing-faq" />

      {/* Final CTA */}
      <SectionFrame innerClassName="py-14 md:py-20 lg:py-24">
        <div className="rounded-2xl border border-rule bg-accent p-8 text-on-accent md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="md:max-w-[560px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-accent/70">
                Ready to scope it?
              </p>
              <h2 className="mt-4 font-display font-extrabold leading-[0.98] tracking-[-0.025em] text-[clamp(1.75rem,4vw,2.6rem)]">
                30-minute discovery call. No deck.
              </h2>
              <p className="mt-4 text-[14px] text-on-accent/80 leading-relaxed md:text-[15px]">
                We&apos;ll walk through your current store, where the numbers
                aren&apos;t adding up, and whether headless is actually the
                right call for your stage.
              </p>
            </div>
            <Link
              href={flagship.cta.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-on-accent px-6 text-[15px] font-semibold text-accent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.02]"
            >
              {flagship.cta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </SectionFrame>
    </>
  );
}
