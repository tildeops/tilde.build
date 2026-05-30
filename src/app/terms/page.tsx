import { SectionFrame } from "@/components/layout/section-frame";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCTA } from "@/components/layout/contact-cta";
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
    <div data-page-theme="bridge">
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]}
      />

      <PageHero
        eyebrow="~ Legal"
        title="Terms of Service"
        description={`The terms that govern your use of tilde.build and how we engage on client work. Last updated ${LAST_UPDATED}.`}
      />

      <SectionFrame className="pt-2 md:pt-4">
      <div className="mx-auto max-w-3xl">
        <div className="prose prose-neutral max-w-none text-ink [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-ink-muted [&_p]:leading-relaxed [&_ul]:text-ink-muted [&_li]:leading-relaxed [&_a]:text-accent [&_strong]:text-ink">
          <p>
            These Terms of Service (“Terms”) govern your use of{" "}
            <a href={site.url}>tilde.build</a> (the “Site”), operated by{" "}
            <strong>{site.legalName}</strong> (“tilde”, “we”, “us”). By using
            this Site, you agree to these Terms. If you do not agree, please do
            not use the Site.
          </p>

          <h2>1. About tilde &amp; scope of these Terms</h2>
          <p>
            tilde is a software studio that builds custom software and digital
            experiences for businesses. These Terms apply only to this website.
          </p>
          <p>
            Any client engagement is governed separately through a written
            proposal, agreement, or Statement of Work (“SoW”), which takes
            precedence over these Terms where applicable.
          </p>

          <h2>2. Engagements &amp; Statements of Work</h2>
          <p>
            Nothing on this Site constitutes a binding offer to provide
            services. A client engagement begins only after both parties agree
            in writing to a proposal or Statement of Work defining scope,
            deliverables, timelines, pricing, and payment terms.
          </p>
          <p>
            Ownership of deliverables, warranties, support, and
            project-specific obligations are governed exclusively by the
            applicable agreement.
          </p>

          <h2>3. Pricing &amp; quotes</h2>
          <p>
            Any pricing shown on the Site is indicative and may vary depending
            on project scope and requirements. Final pricing is confirmed only
            through a written proposal or Statement of Work.
          </p>
          <p>
            Prices may be displayed in INR or USD depending on the client’s
            region and are exclusive of applicable taxes unless stated
            otherwise.
          </p>

          <h2>4. Discovery calls &amp; enquiries</h2>
          <p>
            Booking a discovery call or contacting us does not create a client
            relationship or obligation for either party. Scheduling may be
            handled through third-party providers such as Cal.com.
          </p>

          <h2>5. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              misuse, disrupt, or interfere with the Site or its
              infrastructure;
            </li>
            <li>attempt unauthorised access to systems or data;</li>
            <li>use the Site for unlawful, deceptive, or abusive purposes;</li>
            <li>
              scrape, copy, or reproduce Site content except where permitted by
              law.
            </li>
          </ul>

          <h2>6. Intellectual property</h2>
          <p>
            The Site and its contents — including text, branding, design,
            graphics, and code — are owned by tilde or its licensors and
            protected under applicable intellectual-property laws.
          </p>
          <p>
            We grant you a limited, non-exclusive right to access and use the
            Site for informational purposes only.
          </p>
          <p>
            Ownership and usage rights for client deliverables are governed
            separately by the applicable client agreement or Statement of Work.
          </p>

          <h2>7. Third-party services</h2>
          <p>
            The Site may use or link to third-party services and providers,
            including scheduling, hosting, and analytics platforms. We are not
            responsible for the content, availability, or practices of those
            third parties, and your use of them is subject to their own terms
            and policies.
          </p>

          <h2>8. Disclaimer</h2>
          <p>
            The Site is provided “as is” and “as available” without warranties
            of any kind, whether express or implied, including warranties of
            availability, accuracy, fitness for a particular purpose, or
            non-infringement.
          </p>
          <p>
            We do not guarantee that the Site will be uninterrupted, secure, or
            error-free.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, tilde will not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages, including loss of profits, revenue, data, or business
            opportunity arising from your use of the Site.
          </p>
          <p>
            Any liability relating to client work or services is governed
            exclusively by the applicable client agreement or Statement of
            Work.
          </p>

          <h2>10. Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless tilde and its team from
            any claims, damages, liabilities, or expenses arising from your
            misuse of the Site or breach of these Terms.
          </p>

          <h2>11. Governing law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes
            relating to these Terms are subject to the jurisdiction of the
            courts located in Chennai, Tamil Nadu.
          </p>

          <h2>12. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. Updated versions
            become effective when posted on the Site. Continued use of the Site
            after changes are posted constitutes acceptance of the updated
            Terms.
          </p>

          <h2>13. Contact</h2>
          <p>
            For questions regarding these Terms, contact us at{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </div>
      </div>
      </SectionFrame>

      <ContactCTA
        title="Questions about these terms?"
        body="If anything here is unclear, reach out — we're happy to walk through it."
      />
    </div>
  );
}
