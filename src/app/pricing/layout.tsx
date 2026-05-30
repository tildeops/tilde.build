import { PageHero } from "@/components/layout/page-hero";
import { PricingTabBar } from "@/components/pricing/pricing-tab-bar";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-page-theme="bridge">
      {/* Shared hero — page-level H1; per-service headings are H2s below. The
          liquid band's own top padding clears the floating notch nav; the
          sticky tab bar follows it as a direct child of this tall wrapper so it
          can stay sticky across the whole page. */}
      <PageHero
        eyebrow={
          <>
            <span className="text-white">~</span> Pricing
          </>
        }
        title={
          <>
            Pricing, service by service
            <span className="text-white/70">.</span>
          </>
        }
        description="Transparent base prices, negotiable on a call. Pick the add-ons you want and we'll quote the exact bundle. No decks, no surprise invoices."
      />

      <PricingTabBar />

      <main className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        {children}
        <p className="mt-12 border-t border-rule pt-6 text-center text-[13px] text-ink-muted leading-relaxed">
          Payment terms: 50% upfront to start, 50% before we push to production.
          All prices exclude taxes.
        </p>
      </main>
    </div>
  );
}
