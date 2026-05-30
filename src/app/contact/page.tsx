import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { CalEmbed } from "@/components/sections/cal-embed";
import { BreadcrumbLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Book a 30-minute discovery call or drop us a note. We respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div data-page-theme="bridge">
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <PageHero
        eyebrow={
          <>
            <span className="text-white">~</span> Get in touch
          </>
        }
        title={
          <>
            Let&apos;s <span className="italic">talk.</span>
          </>
        }
        description="Pick a slot for a 30-minute discovery call, or send us a note and we'll reply within one business day."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              Email
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-1.5 inline-block text-[15px] font-medium text-white underline-offset-4 hover:underline"
            >
              {site.contactEmail}
            </a>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              Response time
            </p>
            <p className="mt-1.5 text-[15px] font-medium text-white">
              Within 1 business day
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              Based in
            </p>
            <p className="mt-1.5 text-[15px] font-medium text-white">
              {site.city} · Working globally
            </p>
          </div>
        </div>
      </PageHero>

      {/* Booking */}
      <SectionFrame innerClassName="pt-14 md:pt-20 lg:pt-24 pb-8 md:pb-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 items-start">
          <div className="md:col-span-5">
            <Eyebrow className="text-accent">~ Book a call</Eyebrow>
            <h2 className="mt-5 font-display leading-[1.05] tracking-[-0.02em] text-ink text-[clamp(1.75rem,4vw,3rem)]">
              Find a time that <span className="italic">works.</span>
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed max-w-md">
              A relaxed 30 minutes — we&apos;ll talk through what you&apos;re
              building and whether we&apos;re a fit. No deck, no pitch.
            </p>
          </div>
          <div className="md:col-span-7">
            <CalEmbed />
          </div>
        </div>
      </SectionFrame>

      {/* Fallback form */}
      <SectionFrame innerClassName="pt-8 md:pt-10 pb-20 md:pb-28 lg:pb-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 items-start">
          <div className="md:col-span-5">
            <Eyebrow className="text-accent">~ Prefer email?</Eyebrow>
            <h2 className="mt-5 font-display leading-[1.05] tracking-[-0.02em] text-ink text-[clamp(1.75rem,4vw,3rem)]">
              Send us a note <span className="italic">instead.</span>
            </h2>
            <p className="mt-5 text-base text-ink-muted leading-relaxed">
              Tell us about your project and we&apos;ll get back to you. The more
              context, the better.
            </p>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
