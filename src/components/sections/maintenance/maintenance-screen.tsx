import { LiquidBackground } from "@/components/effects/liquid-background";
import { site } from "@/lib/site";

/**
 * Whole-site maintenance takeover. Rendered by the root layout (in place of the
 * page tree) whenever `site.maintenance` is on, so every route resolves to this
 * single, unmistakable screen.
 *
 * Visual: the brand's signature electric-blue liquid band (same WebGL shader as
 * the Hero and 404), so a sealed-off site still reads as tilde. Intentionally
 * static — the shader renders a frozen snapshot (`animated={false}`) and there
 * are no entrance animations, so the screen needs no GSAP/Lenis providers.
 *
 * Two registers of copy, deliberately distinct so they don't read as redundant:
 *   - a machine/status chip ("STATUS — UNDER MAINTENANCE") that signals state,
 *   - a human headline + body that reassures.
 * The only action is a plain mailto, since the rest of the site is sealed.
 */
export function MaintenanceScreen() {
  return (
    <div data-page-theme="bridge">
      <main className="relative h-[100svh] w-full">
        <div className="absolute inset-0 p-3 sm:p-5 md:p-6 lg:p-8">
          <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-accent text-on-accent sm:rounded-[32px] md:rounded-[40px]">
            {/* Static liquid snapshot — frozen, but still a rich, intentional
                gradient texture. Flip `animated` to bring it to life later. */}
            <LiquidBackground
              animated={false}
              themeOverride="bridge"
              seed={7}
              className="absolute inset-0 -z-10"
            />

            {/* Fine grain over the shader for tactile depth (matches Hero/404). */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Static, non-interactive echo of the notch nav — just the tilde
                wordmark in a glass pill at the band's top edge. */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 z-20 flex min-w-[152px] -translate-x-1/2 select-none items-center justify-center border border-t-0 border-white/25 bg-white/10 px-8 text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              style={{
                height: 32,
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
              }}
            >
              <span className="font-display text-[15px] font-semibold leading-none tracking-tight">
                tilde
              </span>
            </div>

            <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:px-10">
              {/* (a) Status chip — the unmistakable "we're down" signal. */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-white"
                  style={{ boxShadow: "0 0 12px rgba(255,255,255,0.85)" }}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/90">
                  Status — Under maintenance
                </span>
              </div>

              {/* (b) Headline — human reassurance. */}
              <h1 className="mt-7 font-display font-extrabold leading-[1.04] tracking-[-0.03em] text-on-accent text-[clamp(2rem,6vw,4rem)]">
                We&rsquo;ll be back <span className="italic">shortly.</span>
              </h1>

              {/* (c) Body — down-for-maintenance framing. */}
              <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-on-accent/85 md:text-base">
                We&rsquo;re making a few improvements behind the scenes. The site
                will be back online soon — thanks for your patience.
              </p>

              {/* (d) Contact — the one useful action while everything's sealed. */}
              <div className="mx-auto mt-9 flex flex-col items-center gap-2.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-accent/60">
                  Need us in the meantime?
                </span>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-[14px] font-semibold text-accent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.02]"
                >
                  {site.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
