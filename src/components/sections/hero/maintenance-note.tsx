import { site } from "@/lib/site";

/**
 * Maintenance message shown inside the hero band in place of the CTAs while
 * `site.maintenance` is on. Deliberately link-free — in maintenance mode the
 * rest of the site is sealed off, so this only signals status and surfaces a
 * plain (non-navigational) contact address.
 */
export function HeroMaintenanceNote() {
  return (
    <div className="mx-auto mt-9 flex max-w-md flex-col items-center gap-4 text-center">
      <p className="text-[14px] text-on-accent/80 leading-relaxed md:text-[15px]">
        We&rsquo;re putting the finishing touches on something good. The site is
        back online shortly — thanks for your patience.
      </p>
      <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-on-accent/70">
        {site.contactEmail}
      </span>
    </div>
  );
}
