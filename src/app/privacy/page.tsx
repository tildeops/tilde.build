import type { Metadata } from "next";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How tilde handles personal data.",
};

export default function PrivacyPage() {
  return (
    <SectionFrame className="pt-6 md:pt-10">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>~ Legal</Eyebrow>
        <h1 className="mt-5 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2.25rem,5vw,3.5rem)]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: May 2026</p>

        <div className="prose prose-neutral mt-10 max-w-none text-ink [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-ink-muted [&_p]:leading-relaxed [&_ul]:text-ink-muted [&_a]:text-accent">
          <p>
            This page describes how tilde (&ldquo;we&rdquo;) handles
            information you share with us via this website. We try to keep this
            short and human.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              Information you send via the contact form or by booking a call —
              your name, email, and anything you choose to put in the message
              field.
            </li>
            <li>
              Standard server logs (IP, user agent, referrer) for security and
              debugging.
            </li>
            <li>
              Privacy-respecting analytics (Vercel Analytics) which does not use
              cookies or fingerprinting.
            </li>
          </ul>

          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell your data.</li>
            <li>We don&apos;t share it with third parties for marketing.</li>
            <li>
              We don&apos;t use behavioural advertising trackers on this
              marketing site.
            </li>
          </ul>

          <h2>How long we keep it</h2>
          <p>
            We keep contact-form submissions for as long as we are in
            conversation with you, and up to 24 months thereafter for reference.
            Booking records live in our scheduling tool (Cal.com) under their
            data policy.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us to delete the information you&apos;ve shared by
            emailing us. We&apos;ll do it within 30 days.
          </p>

          <h2>Contact</h2>
          <p>
            Privacy questions: <a href="mailto:hello@tilde.dev">hello@tilde.dev</a>
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
