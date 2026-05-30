import { SectionFrame } from "@/components/layout/section-frame";
import { PageHero } from "@/components/layout/page-hero";
import { ContactCTA } from "@/components/layout/contact-cta";
import { Prose } from "@/components/layout/prose";
import { BreadcrumbLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "tilde is a software studio that builds custom web apps, ecommerce, mobile apps, and chat bots — full code ownership, fixed scope, direct access to the engineers.",
  path: "/about",
  generatedOgImage: true,
});

export default function AboutPage() {
  return (
    <div data-page-theme="bridge">
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <PageHero
        eyebrow="~ About"
        title="One studio. Whole stack."
        description="tilde is a small software studio that builds the software your business actually needs — and hands you the keys."
      />

      <SectionFrame className="pt-2 md:pt-4">
        <div className="mx-auto max-w-3xl">
          <Prose>
            <p>
              <strong>{site.legalName}</strong> — “tilde” — is a software
              development studio based in India, working with clients worldwide.
              We design and build custom web applications, ecommerce
              storefronts, mobile apps, and WhatsApp and Telegram bots. About
              half of our work is international.
            </p>

            <h2>What tilde does</h2>
            <p>
              We are a full-stack studio: one team takes a project from design
              through to launch rather than handing it between vendors. The work
              falls into a few areas:
            </p>
            <ul>
              <li>
                <strong>Custom software</strong> — internal tools, dashboards,
                admin panels, and marketplace backends built around your
                workflow rather than a SaaS template.
              </li>
              <li>
                <strong>Custom ecommerce &amp; headless Shopify</strong> —
                bespoke storefronts, and Next.js frontends on an existing
                Shopify backend.
              </li>
              <li>
                <strong>Mobile apps</strong> — native iOS and Android, or React
                Native when it is the right call, with store submission
                included.
              </li>
              <li>
                <strong>WhatsApp &amp; Telegram bots</strong> — ordering,
                support, and broadcasts on the official Business APIs.
              </li>
            </ul>

            <h2>How we work</h2>
            <p>
              Every project is scoped on a short discovery call and quoted with a
              fixed price and a written timeline. You see progress on a shared
              preview URL, talk directly to the engineers building your product,
              and own the code in a GitHub repository from day one — no lock-in,
              no per-seat licence. Every fixed-scope project includes 30 days of
              post-launch support.
            </p>
            <p>
              You can engage us three ways:{" "}
              <strong>fixed-scope</strong> for a defined deliverable, a{" "}
              <strong>monthly retainer</strong> when you need an embedded team,
              or <strong>hourly</strong> for audits, performance work, and
              specialist help.
            </p>

            <h2>Who we are</h2>
            <p>
              tilde is a small, senior team — two senior engineers, a designer,
              and a few sharp interns. There is no outsourcing, no offshore
              handoff, and no account-manager layer between you and the people
              writing the code.
            </p>

            <h2>What we build with</h2>
            <p>
              Our core stack is Next.js, React, and TypeScript on the web; Swift,
              Kotlin, and React Native on mobile; and Node, Postgres, MongoDB,
              and Redis on the backend, deployed on Vercel and Cloudflare. We
              integrate Shopify, Stripe, and Razorpay for commerce, the WhatsApp
              Business and Telegram Bot APIs for messaging, and OpenAI and
              Anthropic models where AI genuinely helps.
            </p>
          </Prose>
        </div>
      </SectionFrame>

      <ContactCTA
        title="Want to work together?"
        body="Tell us what you're building and we'll scope it on a short call."
      />
    </div>
  );
}
