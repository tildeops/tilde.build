import * as React from "react";
import { FadeUp } from "@/components/motion/fade-up";
import { LiquidBackground } from "@/components/effects/liquid-background";
import { Eyebrow } from "@/components/layout/section-frame";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  /** Mono uppercase kicker above the title. */
  eyebrow: React.ReactNode;
  /** Page H1. */
  title: React.ReactNode;
  /** Optional supporting line under the title. */
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Extra content rendered below the description (e.g. info chips, CTAs). */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Reusable blue liquid hero band for secondary pages (contact, pricing, legal).
 * Mirrors the homepage hero's painterly band (`sections/hero.tsx`) but as a
 * static header — no pin-to-full-bleed scroll, just a fade-up reveal. The
 * generous top padding clears the fixed NotchNav, whose dark pill sits over the
 * blue band with good contrast.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
  children,
  className,
}: PageHeroProps) {
  const centered = align === "center";
  return (
    <section
      className={cn(
        "relative w-full px-4 pt-3 sm:px-6 sm:pt-5 lg:px-10 md:pt-6",
        className,
      )}
    >
      <div className="mx-auto max-w-[1240px]">
        <div
          style={{ transform: "translateZ(0)" }}
          className="relative isolate overflow-hidden rounded-[28px] bg-accent text-on-accent sm:rounded-[32px] md:rounded-[40px]"
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

          <div
            className={cn(
              "relative z-10 mx-auto max-w-3xl px-6 pb-12 pt-28 sm:px-10 sm:pt-32 md:pb-16 md:pt-36",
              centered && "text-center",
            )}
          >
            <FadeUp>
              <Eyebrow className="text-white">{eyebrow}</Eyebrow>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="mt-5 font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-on-accent text-[clamp(2.25rem,5.5vw,4rem)]">
                {title}
              </h1>
            </FadeUp>

            {description && (
              <FadeUp delay={0.2}>
                <p
                  className={cn(
                    "mt-6 max-w-xl text-[15px] text-on-accent/85 leading-relaxed md:text-[17px]",
                    centered && "mx-auto",
                  )}
                >
                  {description}
                </p>
              </FadeUp>
            )}

            {children && (
              <FadeUp delay={0.3}>
                <div className="mt-8">{children}</div>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
