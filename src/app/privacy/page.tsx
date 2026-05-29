import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { BreadcrumbLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How tilde collects, uses, and protects your personal data — including cookies, analytics, and your rights.",
  path: "/privacy",
});

const LAST_UPDATED = "29 May 2026";

export default function PrivacyPage() {
  return (
    <SectionFrame className="pt-6 md:pt-10">
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <div className="mx-auto max-w-3xl">
        <Eyebrow>~ Legal</Eyebrow>
        <h1 className="mt-5 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2.25rem,5vw,3.5rem)]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-ink-muted">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="prose prose-neutral mt-10 max-w-none text-ink [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-lg [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-ink-muted [&_p]:leading-relaxed [&_ul]:text-ink-muted [&_li]:leading-relaxed [&_a]:text-accent [&_strong]:text-ink">
          <p>
            This Privacy Policy explains how{" "}
            <strong>{site.legalName}</strong> (&ldquo;tilde&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects
            personal data when you visit{" "}
            <a href={site.url}>tilde.build</a> or get in touch with us. tilde is
            a software studio based in {site.city} that builds custom web and
            mobile software, headless Shopify storefronts, and WhatsApp/Telegram
            sales channels for clients worldwide.
          </p>
          <p>
            We have tried to keep this short and readable. If anything here is
            unclear, email us at{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and
            we&apos;ll explain.
          </p>

          <h2>1. Information we collect</h2>
          <p>We only collect what we need to respond to you and run the site:</p>
          <ul>
            <li>
              <strong>Contact details you give us.</strong> When you submit the
              contact form, we collect your name, email address, the project
              type you select, and anything you write in the message field.
            </li>
            <li>
              <strong>Booking details.</strong> When you book a discovery call,
              your name, email, and scheduling details are processed by our
              booking provider (Cal.com).
            </li>
            <li>
              <strong>Technical and usage data.</strong> Standard server logs
              (IP address, browser/user-agent, referrer, timestamps) and
              analytics data about how pages are used — including page views,
              clicks, scroll behaviour, and session recordings/heatmaps (see
              &ldquo;Cookies &amp; analytics&rdquo; below).
            </li>
          </ul>
          <p>
            We do not intentionally collect sensitive personal data, and we ask
            that you don&apos;t send any (for example, financial account
            numbers or government IDs) through the contact form.
          </p>

          <h2>2. Cookies &amp; analytics</h2>
          <p>
            We use cookies and similar technologies for analytics so we can
            understand how the site is used and improve it. We use two
            third-party tools:
          </p>
          <ul>
            <li>
              <strong>Google Analytics 4</strong> — aggregate traffic and
              engagement measurement. Google may set cookies and process data
              per the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — behavioural analytics,
              including heatmaps and session recordings that capture
              interactions such as mouse movement, clicks, and scrolling (with
              keystrokes in input fields masked). Data is processed per the{" "}
              <a
                href="https://privacy.microsoft.com/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Privacy Statement
              </a>
              .
            </li>
          </ul>
          <p>
            You can opt out by blocking cookies in your browser, enabling
            &ldquo;Do Not Track&rdquo;/Global Privacy Control, or using the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics opt-out add-on
            </a>
            . We do not use these tools for advertising or to build marketing
            profiles of you.
          </p>

          <h2>3. How we use your information</h2>
          <ul>
            <li>To respond to your enquiry and discuss a possible engagement.</li>
            <li>To schedule and hold discovery calls.</li>
            <li>
              To operate, secure, debug, and improve this website and our
              services.
            </li>
            <li>
              To comply with our legal obligations and enforce our terms.
            </li>
          </ul>
          <p>
            We process this data because it is necessary to respond to a request
            you initiated, for our legitimate interest in running and improving
            the site, and — for analytics cookies — on the basis of the notice
            we provide. We do <strong>not</strong> sell your personal data or
            share it for third-party marketing.
          </p>

          <h2>4. Who we share it with (sub-processors)</h2>
          <p>
            We share data only with service providers that help us operate, and
            only as needed:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> — website hosting, delivery, and server
              logs.
            </li>
            <li>
              <strong>Resend</strong> — delivery of contact-form submissions to
              our inbox.
            </li>
            <li>
              <strong>Cal.com</strong> — discovery-call scheduling.
            </li>
            <li>
              <strong>Google (Analytics)</strong> and{" "}
              <strong>Microsoft (Clarity)</strong> — analytics, as described
              above.
            </li>
          </ul>
          <p>
            Each processor handles your data under its own privacy terms. We may
            also disclose information if required by law or to protect our
            rights.
          </p>

          <h2>5. How we protect your data</h2>
          <ul>
            <li>
              Data is transmitted over encrypted connections (HTTPS/TLS) and
              stored by reputable providers with their own security controls.
            </li>
            <li>
              Access to enquiry and booking data is limited to the small team
              who needs it to respond to you.
            </li>
            <li>
              We vet the third-party processors we rely on and keep their number
              to a minimum.
            </li>
            <li>
              No method of transmission or storage is perfectly secure, but if a
              breach affecting your personal data occurs, we will act to contain
              it and notify affected people and authorities where the law
              requires.
            </li>
          </ul>
          <p>
            To report a security issue, see our{" "}
            <a href="/.well-known/security.txt">security.txt</a>.
          </p>

          <h2>6. How long we keep it</h2>
          <p>
            We keep contact-form submissions for as long as we are in
            conversation with you and up to 24 months afterwards for reference,
            then delete or anonymise them. Booking records live in Cal.com under
            their retention policy. Analytics data is retained per the providers&apos;
            default retention settings.
          </p>

          <h2>7. Your rights</h2>
          <p>
            Subject to applicable law (including India&apos;s Digital Personal
            Data Protection Act, 2023, and the GDPR where it applies), you can
            ask us to:
          </p>
          <ul>
            <li>access the personal data we hold about you;</li>
            <li>correct it if it is inaccurate;</li>
            <li>delete it;</li>
            <li>withdraw consent or object to certain processing.</li>
          </ul>
          <p>
            Email{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and
            we&apos;ll respond within 30 days. If you are unsatisfied with our
            response, you may have the right to complain to your local data
            protection authority.
          </p>

          <h2>8. International transfers</h2>
          <p>
            We are based in {site.city} and work with clients and providers
            globally. Your data may be processed in countries other than your
            own (for example, where our hosting and analytics providers operate).
            Where required, we rely on appropriate safeguards for such transfers.
          </p>

          <h2>9. Children</h2>
          <p>
            This site is intended for businesses and is not directed at children.
            We do not knowingly collect personal data from anyone under 18.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. We&apos;ll change the
            &ldquo;Last updated&rdquo; date above and, for material changes, take
            reasonable steps to highlight them.
          </p>

          <h2>11. Contact</h2>
          <p>
            For any privacy question or to exercise your rights, contact us at{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            This inbox also serves as our grievance/data-protection contact.
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
