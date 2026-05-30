import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/motion/fade-up";
import { LiquidBackground } from "@/components/effects/liquid-background";
import { cn } from "@/lib/utils";

type ContactCTAProps = {
  title?: React.ReactNode;
  body?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

/**
 * Closing CTA band so pages don't dead-end in white. Reuses the homepage hero's
 * animated liquid background (the canvas pauses while off-screen, so it only
 * runs once scrolled into view) for a living blue band rather than a flat fill.
 */
export function ContactCTA({
  title = "Questions? Let's talk.",
  body = "Tell us what you're building and we'll point you in the right direction.",
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
  className,
}: ContactCTAProps) {
  return (
    <section
      className={cn("relative w-full px-4 pb-20 pt-8 sm:px-6 lg:px-10", className)}
    >
      <div className="mx-auto max-w-[1240px]">
        <div
          style={{ transform: "translateZ(0)" }}
          className="relative isolate overflow-hidden rounded-[28px] bg-accent text-on-accent"
        >
          <LiquidBackground
            animated
            themeOverride="bridge"
            className="absolute inset-0 -z-10"
          />

          {/* Film-grain overlay — matches the homepage hero band. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 flex flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-12 md:py-16">
            <div className="max-w-xl">
              <FadeUp>
                <h2 className="font-display font-extrabold leading-[0.98] tracking-[-0.045em] text-on-accent text-[clamp(1.75rem,3.8vw,2.6rem)]">
                  {title}
                </h2>
              </FadeUp>
              {body && (
                <FadeUp delay={0.15}>
                  <p className="mt-3 text-[14px] text-on-accent/85 leading-relaxed md:text-[15px]">
                    {body}
                  </p>
                </FadeUp>
              )}
            </div>

            <FadeUp delay={0.25}>
              <Link
                href={ctaHref}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-semibold text-accent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.02]"
              >
                {ctaLabel}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
