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
    <div data-page-theme="bridge">
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
            This Privacy Policy explains how <strong>{site.legalName}</strong>{" "}
            (“tilde”, “we”, “us”) collects, uses, and protects personal
            information when you use <a href={site.url}>tilde.build</a> or
            contact us.
          </p>
          <p>
            If you have any questions about this policy, you can contact us at{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>

          <h2>1. Information we collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>your name and email address;</li>
            <li>
              project or business information you submit through our contact
              forms;
            </li>
            <li>information shared when booking a discovery call.</li>
          </ul>
          <p>
            We also collect limited technical and usage information such as IP
            address, browser type, pages visited, and general analytics data
            used to improve the Site.
          </p>
          <p>
            Please do not submit sensitive personal information through the Site
            or contact forms.
          </p>

          <h2>2. Cookies &amp; analytics</h2>
          <p>
            We use cookies and analytics tools to understand how visitors use
            the Site and to improve performance and usability.
          </p>
          <p>
            Third-party analytics providers may collect usage information
            according to their own privacy policies. You can disable cookies
            through your browser settings if you prefer.
          </p>

          <h2>3. How we use your information</h2>
          <p>We use information we collect to:</p>
          <ul>
            <li>respond to enquiries and discuss potential engagements;</li>
            <li>schedule and manage discovery calls;</li>
            <li>operate, maintain, and improve the Site;</li>
            <li>maintain security and prevent misuse;</li>
            <li>comply with legal obligations.</li>
          </ul>
          <p>
            We do not sell your personal information or share it for
            third-party advertising purposes.
          </p>

          <h2>4. Third-party providers</h2>
          <p>
            We work with trusted third-party providers that help us operate the
            Site and communicate with clients, including providers for hosting,
            analytics, email delivery, and scheduling.
          </p>
          <p>
            These providers process data according to their own privacy
            policies and terms.
          </p>

          <h2>5. Data security</h2>
          <p>
            We use reasonable technical and organisational measures to protect
            your information, including encrypted connections and trusted
            infrastructure providers.
          </p>
          <p>
            Access to submitted information is limited to people who need it to
            operate the business and respond to enquiries.
          </p>

          <h2>6. Data retention</h2>
          <p>
            We retain enquiries and related communications for as long as
            reasonably necessary for business, legal, and reference purposes.
          </p>
          <p>
            Analytics and scheduling data may be retained according to the
            policies of the relevant third-party providers.
          </p>

          <h2>7. Your rights</h2>
          <p>
            Depending on applicable law, you may have rights to access,
            correct, delete, or object to the processing of your personal
            information.
          </p>
          <p>
            To make a request regarding your data, contact{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>

          <h2>8. International data transfers</h2>
          <p>
            We are based in India and may work with service providers located
            in other countries. As a result, your information may be processed
            outside your country of residence.
          </p>

          <h2>9. Children</h2>
          <p>
            This Site is intended for businesses and is not directed at
            individuals under 18 years of age.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Updated
            versions become effective when posted on the Site.
          </p>

          <h2>11. Contact</h2>
          <p>
            For privacy-related questions or requests, contact{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
        </div>
      </div>
      </SectionFrame>
    </div>
  );
}
