import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
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
      <SectionFrame
        className="pt-6 md:pt-10"
        innerClassName="py-14 md:py-20 lg:py-24"
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 items-start">
          <div className="md:col-span-5">
            <Eyebrow>
              <span className="text-accent">~</span> Get in touch
            </Eyebrow>
            <h1 className="mt-6 font-display leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4.5rem)]">
              Let&apos;s{" "}
              <span className="italic text-ink-muted">talk.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-ink-muted leading-relaxed max-w-md">
              Pick a slot for a 30-minute discovery call, or send us a note and
              we&apos;ll reply within one business day.
            </p>

            <div className="mt-10 space-y-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  Email
                </p>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="mt-1 inline-block font-display text-2xl text-ink hover:text-accent"
                >
                  {site.contactEmail}
                </a>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  Response time
                </p>
                <p className="mt-1 text-base text-ink">
                  Within 1 business day
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  Based in
                </p>
                <p className="mt-1 text-base text-ink">
                  {site.city} · Working with brands globally
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <CalEmbed />
          </div>
        </div>
      </SectionFrame>

      {/* Fallback form */}
      <SectionFrame>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 items-start">
          <div className="md:col-span-5">
            <Eyebrow>~ Prefer email?</Eyebrow>
            <h2 className="mt-5 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(1.75rem,4vw,3rem)]">
              Send us a note{" "}
              <span className="italic text-ink-muted">instead.</span>
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
