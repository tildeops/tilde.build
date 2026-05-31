import Link from "next/link";
import { Heart } from "lucide-react";
import { site, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-rule bg-bg-elevated/40">
      {/* Giant "tilde" wordmark backdrop. Sized down + pushed below on mobile
          so it acts as a watermark peek instead of overlapping copyright. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-2 z-0 select-none text-center font-display font-extrabold leading-none tracking-[-0.06em] text-ink/[0.06] md:hidden [[data-page-theme=bridge]_&]:text-accent/[0.09]"
        style={{ fontSize: "9rem" }}
      >
        tilde
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-12 z-0 hidden select-none text-center font-display font-extrabold leading-none tracking-[-0.06em] text-ink/[0.05] md:block [[data-page-theme=bridge]_&]:text-accent/[0.08]"
        style={{ fontSize: "clamp(10rem, 28vw, 24rem)" }}
      >
        tilde
      </span>

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10 pt-14 pb-16 md:pb-16">
        <div className="grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-3 sm:gap-10 md:grid-cols-12">
          <div className="col-span-2 sm:col-span-3 md:col-span-5">
            <span className="font-display text-3xl leading-none tracking-tight text-ink">
              tilde
            </span>
            <p className="mt-4 max-w-sm text-sm text-ink-muted leading-relaxed">
              {site.description}
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-6 inline-block font-mono text-[12px] uppercase tracking-[0.18em] text-ink hover:text-accent"
            >
              {site.contactEmail}
            </a>
          </div>

          <div className="col-span-1 sm:col-span-1 md:col-span-3">
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
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
                >
                  Headless Shopify
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                    Flagship
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-ink hover:text-accent"
                >
                  Blog
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

          <div className="col-span-1 sm:col-span-1 md:col-span-2">
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

          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Elsewhere
            </p>
            {/* Mobile (2-col layout): inline row to use the full width.
                Tablet/desktop: vertical list like the other link columns. */}
            <ul className="mt-4 flex flex-row gap-5 sm:flex-col sm:gap-0 sm:space-y-2">
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

        {/* Copyright strip — in normal flow so it can't overlap link columns.
            The deep bottom margin pushes the footer's base (and the giant tilde
            watermark anchored to it) well below this line, so the wordmark
            reads as a separate flourish rather than crowding the copyright. */}
        <div className="mt-10 mb-44 border-t border-rule pt-6 md:mt-16 md:mb-60">
          <div className="flex flex-col gap-3 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
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
      </div>
    </footer>
  );
}
