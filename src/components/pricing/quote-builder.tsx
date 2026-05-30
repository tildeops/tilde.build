"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/layout/section-frame";
import { BaseFeatureList } from "@/components/pricing/base-feature-list";
import { SelectableFeatureList } from "@/components/pricing/selectable-feature-list";
import { QuoteForm } from "@/components/pricing/quote-form";
import { BillCard } from "@/components/pricing/bill-card";
import { CountUp } from "@/components/motion/count-up";
import { useCurrency } from "@/components/providers/currency-provider";
import {
  amountFor,
  currencySymbol,
  formatMoney,
  type Money,
} from "@/lib/pricing/currency";
import type { ServicePricing } from "@/lib/pricing/services";

/**
 * Interactive per-service quote builder. The scope (features, add-ons, form)
 * scrolls on the left while a sticky receipt-style "bill" on the right tallies
 * the base price plus whichever add-ons the visitor has selected. Selection is
 * scoped to this service only — navigating tabs mounts a fresh instance.
 */
export function QuoteBuilder({ service }: { service: ServicePricing }) {
  const { currency } = useCurrency();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLDivElement | null>(null);

  const toggle = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selected = useMemo(
    () => service.selectableFeatures.filter((f) => selectedIds.has(f.id)),
    [service.selectableFeatures, selectedIds],
  );
  const selectedFeatures = selected.map((f) => f.label);
  const count = selectedFeatures.length;

  const base: Money = service.basePrice ?? { inr: 0, usd: 0 };
  const localeFor = (n: number) =>
    n.toLocaleString(currency === "USD" ? "en-US" : "en-IN");

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="pb-28 md:pb-32">
      {/* Header */}
      <div className="max-w-3xl">
        <Eyebrow>
          <span className="text-accent">{service.eyebrow}</span>
        </Eyebrow>
        <h2 className="mt-6 font-display font-extrabold leading-[0.98] tracking-[-0.03em] text-ink text-[clamp(2.25rem,5vw,3.75rem)]">
          {service.name}
        </h2>
        <p className="mt-5 max-w-xl text-base text-ink-muted leading-relaxed md:text-lg">
          {service.tagline}
        </p>
        {/* Answer-first summary — server-rendered prose with the real price and
            timeline so crawlers and AI answer engines can extract them (the big
            number in the bill animates from 0 client-side). */}
        <p className="mt-4 max-w-xl text-[14px] text-ink-muted/90 leading-relaxed">
          From {formatMoney(base, currency)} ({service.priceNote}), delivered in{" "}
          {service.timeline}. The base build includes{" "}
          {service.baseFeatures.length} features; additional add-ons are priced
          on a call.
        </p>
      </div>

      <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-12 lg:gap-16">
        {/* RIGHT (source order kept early for mobile) — sticky bill */}
        <div className="order-1 md:order-2 md:col-span-5 lg:col-span-4">
          <div className="md:sticky md:top-24">
            <BillCard>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                <span>Estimate</span>
                <span>{service.eyebrow.replace(/^~\s*/, "").split(" /")[0]}</span>
              </div>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                Starting at
              </p>
              <p className="mt-1.5 font-display font-extrabold text-[clamp(2.5rem,6vw,3.25rem)] leading-none tracking-[-0.045em] text-ink">
                <CountUp
                  to={amountFor(base, currency)}
                  prefix={currencySymbol(currency)}
                  format={localeFor}
                  duration={1.2}
                />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                {service.priceNote}
              </p>

              {/* Line items */}
              <div className="mt-6 space-y-2.5 border-t border-dashed border-ink/15 pt-5">
                <BillRow label="Base build" value={formatMoney(base, currency)} strong />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted/80">
                  {service.timeline} · all base features included
                </p>
              </div>

              <div className="mt-4 space-y-2.5 border-t border-dashed border-ink/15 pt-4">
                {count === 0 ? (
                  <p className="text-[12.5px] text-ink-muted leading-snug">
                    Tick the add-ons you want below and they&apos;ll line up here
                    for a quote.
                  </p>
                ) : (
                  selected.map((f) => (
                    <BillRow key={f.id} label={f.label} value="on call" muted />
                  ))
                )}
              </div>

              <div className="mt-4 space-y-2.5 border-t border-dashed border-ink/15 pt-4">
                <BillRow
                  label="Extra hours"
                  value={`${formatMoney(service.hourlyRate, currency)}/hr`}
                  muted
                />
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-ink/25 pt-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                  Total
                </span>
                <span className="font-display text-lg font-extrabold tracking-[-0.01em] text-ink">
                  {count > 0
                    ? `${formatMoney(base, currency)} + quote`
                    : formatMoney(base, currency)}
                </span>
              </div>

              <button
                type="button"
                onClick={scrollToForm}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgb(var(--accent-rgb)/0.55)] transition-transform duration-300 hover:scale-[1.02]"
              >
                {count > 0 ? `Quote my ${count} add-on${count === 1 ? "" : "s"}` : "Request a quote"}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-muted/80">
                50% upfront · 50% before launch · taxes extra
              </p>
            </BillCard>
          </div>
        </div>

        {/* LEFT — scrolling scope */}
        <div className="order-2 space-y-16 md:order-1 md:col-span-7 md:space-y-20 lg:col-span-8">
          {/* Base features */}
          <section>
            <div className="flex flex-col gap-2 border-b border-rule pb-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-[-0.02em] text-ink">
                What&apos;s included
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                In the base price
              </p>
            </div>
            <div className="mt-8">
              <BaseFeatureList features={service.baseFeatures} />
            </div>
            <p className="mt-6 max-w-2xl text-[13px] text-ink-muted/90 leading-relaxed">
              {service.onCallNote}
            </p>
          </section>

          {/* Selectable add-ons */}
          {service.selectableFeatures.length > 0 && (
            <section>
              <div className="flex flex-col gap-2 border-b border-rule pb-4 md:flex-row md:items-end md:justify-between">
                <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-[-0.02em] text-ink">
                  Add what you need
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  Pick any · priced on a call
                </p>
              </div>
              <p className="mt-4 max-w-2xl text-[14.5px] text-ink-muted leading-relaxed">
                Select the extras you&apos;re interested in. They&apos;ll show up
                on the estimate, and we&apos;ll price the exact bundle you pick.
              </p>
              <div className="mt-8">
                <SelectableFeatureList
                  features={service.selectableFeatures}
                  selectedIds={selectedIds}
                  onToggle={toggle}
                />
              </div>
            </section>
          )}

          {/* Quote form */}
          <section ref={formRef} className="scroll-mt-28">
            <div className="border-b border-rule pb-4">
              <Eyebrow>
                <span className="text-accent">~</span> Get your quote
              </Eyebrow>
              <h2 className="mt-4 font-display font-extrabold leading-[1.02] tracking-[-0.025em] text-ink text-[clamp(1.75rem,4vw,2.4rem)]">
                {count > 0 ? (
                  <>
                    {count} add-on{count === 1 ? "" : "s"} on the estimate.{" "}
                    <span className="italic text-ink-muted">
                      Let&apos;s price it.
                    </span>
                  </>
                ) : (
                  <>Tell us where to send it.</>
                )}
              </h2>
            </div>
            <p className="mt-5 max-w-xl text-[15px] text-ink-muted leading-relaxed">
              {count > 0
                ? "We'll price your exact selection on top of the base and reply within one business day."
                : "Submit for the base scope, or pick add-ons above and we'll price the bundle. Either way, you'll hear back within one business day."}
            </p>
            <div className="mt-8">
              <QuoteForm
                serviceSlug={service.slug}
                serviceName={service.name}
                selectedFeatures={selectedFeatures}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Floating selection bar (mobile-friendly shortcut to the form) */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5 transition-all duration-300 md:hidden ${
          count > 0
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
        aria-hidden={count === 0}
      >
        <div
          className={`flex items-center gap-4 rounded-full border border-rule bg-bg/90 py-2 pl-5 pr-2 shadow-[0_20px_50px_-24px_rgba(8,30,90,0.45)] backdrop-blur ${
            count > 0 ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <span className="text-[13px] font-medium text-ink">
            <span className="text-accent">{count}</span> add-on
            {count === 1 ? "" : "s"} selected
          </span>
          <button
            type="button"
            onClick={scrollToForm}
            className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[13px] font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
          >
            Get a quote
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** A receipt line: label, dotted leader, value. */
function BillRow({
  label,
  value,
  strong,
  muted,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`text-[13px] ${strong ? "font-medium text-ink" : "text-ink"} ${muted ? "text-ink-muted" : ""}`}
      >
        {label}
      </span>
      <span className="mb-1 flex-1 border-b border-dashed border-ink/20" />
      <span
        className={`shrink-0 font-mono text-[12px] ${muted ? "text-ink-muted" : "text-ink"}`}
      >
        {value}
      </span>
    </div>
  );
}
