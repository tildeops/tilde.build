import Link from "next/link";
import { Heart } from "lucide-react";
import { site, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-rule bg-bg-elevated/40">
      {/* Giant "tilde" wordmark backdrop — subtle on most pages, accent-tinted on bridge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-12 z-0 select-none text-center font-display font-extrabold leading-none tracking-[-0.06em] text-ink/[0.05] [[data-page-theme=bridge]_&]:text-accent/[0.08]"
        style={{ fontSize: "clamp(10rem, 28vw, 24rem)" }}
      >
        tilde
      </span>

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 pt-14 pb-32 md:pb-40">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-display text-3xl leading-none tracking-tight text-ink">
              tilde
            </span>
            <p className="mt-4 max-w-sm text-sm text-ink-muted leading-relaxed">
              Headless Shopify and custom commerce, built by a small senior team
              that ships.
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-6 inline-block font-mono text-[12px] uppercase tracking-[0.18em] text-ink hover:text-accent"
            >
              {site.contactEmail}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Site
            </p>
            <ul className="mt-4 space-y-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-ink hover:text-accent"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/shopify-headless"
                  className="text-sm text-ink hover:text-accent"
                >
                  Shopify headless
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-ink hover:text-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Legal
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-ink hover:text-accent"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-ink hover:text-accent"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={site.social.x}
                  className="text-sm text-ink hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href={site.social.github}
                  className="text-sm text-ink hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  className="text-sm text-ink hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright strip — pinned near the bottom of the footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="pointer-events-auto flex flex-col gap-3 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em]">
            Made with
            <Heart
              className="inline-block size-3 fill-accent text-accent"
              aria-hidden
            />
            in {site.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
