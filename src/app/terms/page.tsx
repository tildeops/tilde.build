import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { BreadcrumbLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms governing your use of the tilde website and the basis on which we engage on client work.",
  path: "/terms",
});

const LAST_UPDATED = "29 May 2026";

export default function TermsPage() {
  return (
    <SectionFrame className="pt-6 md:pt-10">
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]}
      />
      <div className="mx-auto max-w-3xl">
        <Eyebrow>~ Legal</Eyebrow>
        <h1 className="mt-5 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2.25rem,5vw,3.5rem)]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-ink-muted">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="prose prose-neutral mt-10 max-w-none text-ink [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-ink-muted [&_p]:leading-relaxed [&_ul]:text-ink-muted [&_li]:leading-relaxed [&_a]:text-accent [&_strong]:text-ink">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of{" "}
            <a href={site.url}>tilde.build</a> (the &ldquo;site&rdquo;),
            operated by <strong>{site.legalName}</strong> (&ldquo;tilde&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site you agree to
            these Terms. If you don&apos;t agree, please don&apos;t use the site.
          </p>

          <h2>1. About tilde &amp; scope of these Terms</h2>
          <p>
            tilde is a software studio that builds custom web and mobile
            software, headless Shopify storefronts, custom e-commerce, Meta Ads
            setups, and WhatsApp/Telegram sales channels. These Terms cover this
            marketing website only. Any paid engagement is governed by a
            separate written agreement — a Statement of Work (&ldquo;SoW&rdquo;)
            or proposal — which prevails over these Terms for that engagement.
          </p>

          <h2>2. Engagements &amp; Statements of Work</h2>
          <p>
            Nothing on this site is an offer or a binding commitment to provide
            services. A client engagement begins only when both parties sign or
            confirm a SoW that sets out the scope, deliverables, timeline,
            fees, and payment terms. Deliverables, ownership of work product,
            and project-level warranties are defined in that SoW.
          </p>

          <h2>3. Quotes &amp; pricing</h2>
          <p>
            Prices shown on this site (including the headless Shopify rebuild
            price and any retainer figures) are indicative for a typical scope
            and may change. The final price for any engagement is the one set in
            writing in the SoW. Unless stated otherwise, prices are in Indian
            Rupees (INR) and exclusive of applicable taxes (including GST).
            GSTIN: {site.gst}.
          </p>

          <h2>4. Discovery calls &amp; bookings</h2>
          <p>
            Booking a discovery call lets us understand your project; it
            doesn&apos;t commit either party to anything beyond the call itself.
            Scheduling is handled by a third-party tool (Cal.com).
          </p>

          <h2>5. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              scrape, crawl at volume, or copy the site&apos;s content except as
              permitted by law;
            </li>
            <li>
              attempt to probe, disrupt, or gain unauthorised access to the site
              or its infrastructure;
            </li>
            <li>
              submit unlawful, infringing, or deceptive content, or spam the
              contact form;
            </li>
            <li>use the site in any way that breaks applicable law.</li>
          </ul>

          <h2>6. Intellectual property</h2>
          <p>
            The site and its content — text, design, graphics, code, and the
            tilde name and marks — are owned by tilde or its licensors and are
            protected by intellectual-property laws. We grant you a limited,
            personal, non-exclusive licence to view the site for evaluating our
            services. Ownership of any deliverables we create for a client is
            assigned and governed by the relevant SoW, not these Terms.
          </p>

          <h2>7. Third-party services &amp; links</h2>
          <p>
            The site uses and may link to third-party services (for example
            Cal.com for scheduling, and analytics providers). We don&apos;t
            control those services and aren&apos;t responsible for their content
            or practices; your use of them is subject to their own terms.
          </p>

          <h2>8. Disclaimers</h2>
          <p>
            The site is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo;, without warranties of any kind, whether express or
            implied, including fitness for a particular purpose and
            non-infringement. We don&apos;t warrant that the site will be
            uninterrupted, error-free, or secure, and content may contain
            inaccuracies or be changed at any time.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, tilde will not be liable for
            any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits, revenue, or data, arising from your
            use of (or inability to use) this site. Liability arising from a
            client engagement is governed exclusively by the applicable SoW.
          </p>

          <h2>10. Indemnity</h2>
          <p>
            You agree to indemnify and hold tilde harmless from any claims,
            losses, or expenses arising out of your misuse of the site or breach
            of these Terms.
          </p>

          <h2>11. Governing law</h2>
          <p>
            These Terms are governed by the laws of India, and any disputes
            relating to them are subject to the jurisdiction of the competent
            courts in India.
          </p>

          <h2>12. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. Changes take effect when
            posted, and we&apos;ll update the &ldquo;Last updated&rdquo; date
            above. Continuing to use the site means you accept the updated Terms.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}
