import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { LiquidBackground } from "@/components/effects/liquid-background";
import { navItems } from "@/lib/site";

/** Helpful destinations surfaced below the band when a route 404s. */
const quickLinks = [...navItems, { label: "Contact", href: "/contact" }];

export default function NotFound() {
  return (
    <div data-page-theme="bridge">
      {/* Signature liquid band — sized to the full viewport like the landing
          hero, so a dead end still feels unmistakably like tilde. */}
      <section className="relative w-full">
        <div className="relative h-[100svh] w-full">
          <div className="absolute inset-0 p-3 sm:p-5 md:p-6 lg:p-8">
            <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-accent text-on-accent sm:rounded-[32px] md:rounded-[40px]">
              <LiquidBackground
                animated
                themeOverride="bridge"
                className="absolute inset-0 -z-10"
              />

              {/* Fine grain over the shader for tactile depth. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:px-10">
                <FadeUp>
                  <div className="select-none font-display font-extrabold leading-[0.8] tracking-[-0.04em] text-on-accent text-[clamp(4.5rem,18vw,12rem)]">
                    404
                  </div>
                </FadeUp>

                <RevealLines
                  as="h1"
                  className="mt-6 font-display font-bold leading-[1.05] tracking-[-0.02em] text-on-accent text-[clamp(1.5rem,4vw,2.5rem)]"
                >
                  This page wandered off the stack.
                </RevealLines>

                <FadeUp delay={0.25}>
                  <p className="mx-auto mt-5 max-w-md text-[15px] text-on-accent/80 leading-relaxed md:text-base">
                    The link may be broken or the page may have moved — but
                    everything we build is still one click away.
                  </p>
                </FadeUp>

                <FadeUp delay={0.35}>
                  <div className="mx-auto mt-9 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:w-auto">
                    <Link
                      href="/"
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-semibold text-accent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.02]"
                    >
                      Back home
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/[0.06] px-6 text-[15px] font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.12]"
                    >
                      Get in touch
                      <span className="text-white/70 transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links on the white dot-grid surface — genuinely useful, and a
          calm editorial counterpoint to the band. */}
      <SectionFrame className="pt-10 md:pt-14" innerClassName="py-10 md:py-14">
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Try one of these</Eyebrow>
            <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </FadeUp>
      </SectionFrame>
    </div>
  );
}
