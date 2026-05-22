import type { Metadata } from "next";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing engagements with tilde.",
};

export default function TermsPage() {
  return (
    <SectionFrame className="pt-6 md:pt-10">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>~ Legal</Eyebrow>
        <h1 className="mt-5 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2.25rem,5vw,3.5rem)]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: May 2026</p>

        <div className="prose prose-neutral mt-10 max-w-none text-ink [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-ink-muted [&_p]:leading-relaxed [&_ul]:text-ink-muted [&_a]:text-accent">
          <p>
            These terms apply to your use of this website. The terms for any
            engagement you sign with us are governed by a separate Statement of
            Work (SoW) we will share before work begins.
          </p>

          <h2>Use of this site</h2>
          <p>
            You agree not to abuse this site — no scraping at volume, no
            attempts to break authentication, no spamming the contact form.
          </p>

          <h2>Prices on this site</h2>
          <p>
            Prices listed are indicative for typical scopes. The final price
            for any engagement is set in writing in the SoW. All prices exclude
            GST.
          </p>

          <h2>Bookings</h2>
          <p>
            Booking a discovery call doesn&apos;t commit either party to
            anything beyond the call itself.
          </p>

          <h2>Liability</h2>
          <p>
            This site is provided as-is. We&apos;re not liable for any losses
            arising from your use of it. Engagement-level liability is governed
            by the SoW.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of India.
          </p>

          <h2>Contact</h2>
          <p>
            Legal questions: <a href="mailto:hello@tilde.dev">hello@tilde.dev</a>
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
