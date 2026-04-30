import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-baseline gap-1 font-display text-[30px] tracking-[-0.02em]">
              <span>tilde</span>
              <span className="text-accent">~</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] text-muted">
              {site.brand.name} — {site.brand.tagline}.
            </p>
          </div>

          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[10.5px] uppercase tracking-widest text-muted">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-fg/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-6 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {site.brand.name}. All rights reserved.</span>
          <span>
            Built by two engineers and a designer
            {site.contact.city ? ` in ${site.contact.city}` : ""}.
          </span>
        </div>
      </div>
    </footer>
  );
}
