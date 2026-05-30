"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/layout/section-frame";
import { BaseFeatureList } from "@/components/pricing/base-feature-list";
import { BillCard } from "@/components/pricing/bill-card";
import { useCurrency } from "@/components/providers/currency-provider";
import { formatMoney } from "@/lib/pricing/currency";
import { calTrigger } from "@/lib/cal";
import type { ServicePricing } from "@/lib/pricing/services";

/**
 * Rendered for services with no fixed base price (Custom Software). Every build
 * is bespoke, so the bill shows "scoped on call" instead of a number and routes
 * straight to a discovery call.
 */
export function OnCallPanel({ service }: { service: ServicePricing }) {
  const { currency } = useCurrency();

  return (
    <div>
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
      </div>

      <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-12 lg:gap-16">
        {/* Sticky bill */}
        <div className="order-1 md:order-2 md:col-span-5 lg:col-span-4">
          <div className="md:sticky md:top-24">
            <BillCard>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                <span>Estimate</span>
                <span>
                  {service.eyebrow.replace(/^~\s*/, "").split(" /")[0]}
                </span>
              </div>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                Pricing
              </p>
              <p className="mt-1.5 font-display font-extrabold text-[clamp(2rem,4.5vw,2.75rem)] leading-none tracking-[-0.03em] text-ink">
                Scoped on call
              </p>

              <p className="mt-5 border-t border-dashed border-ink/15 pt-5 text-[13px] text-ink-muted leading-relaxed">
                Custom software is priced to the problem. We map the scope on a
                30-minute call, then send a fixed written quote, no surprise
                invoices.
              </p>

              <div className="mt-4 flex items-baseline gap-2 border-t border-dashed border-ink/15 pt-4">
                <span className="text-[13px] text-ink-muted">Specialist hours</span>
                <span className="mb-1 flex-1 border-b border-dashed border-ink/20" />
                <span className="shrink-0 font-mono text-[12px] text-ink">
                  {formatMoney(service.hourlyRate, currency)}/hr
                </span>
              </div>

              <Link
                href="/contact"
                {...calTrigger("pricing_custom")}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgb(var(--accent-rgb)/0.55)] transition-transform duration-300 hover:scale-[1.02]"
              >
                Book a discovery call
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-3 text-center font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-muted/80">
                50% upfront · 50% before launch · taxes extra
              </p>
            </BillCard>
          </div>
        </div>

        {/* Scope */}
        <div className="order-2 md:order-1 md:col-span-7 lg:col-span-8">
          <div className="border-b border-rule pb-4">
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-[-0.02em] text-ink">
              What&apos;s typically in scope
            </h2>
          </div>
          <div className="mt-8">
            <BaseFeatureList features={service.baseFeatures} />
          </div>
        </div>
      </div>
    </div>
  );
}
