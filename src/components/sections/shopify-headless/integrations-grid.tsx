"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { integrations, type Integration } from "@/lib/shopify-headless/integrations";

/**
 * Pinned horizontal scroll for the integrations grid. The section pins to the
 * viewport and vertical scroll drives the horizontal track movement on every
 * viewport size — phones get the same "stays in place, scroll reveals more"
 * mechanic as desktop. Reduced-motion users get a static stack fallback.
 */
export function IntegrationsGrid() {
  const reduced = useReducedMotion();

  if (reduced) {
    return <ReducedMotionFallback />;
  }
  return (
    <div id="integrations">
      <PinnedHorizontalScroll />
    </div>
  );
}

function PinnedHorizontalScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track) return;

      const computeDistance = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewportWidth + 80);
      };

      let distance = computeDistance();

      const tween = gsap.to(track, {
        x: () => -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progress) {
              progress.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      const onResize = () => {
        distance = computeDistance();
        tween.scrollTrigger?.refresh();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: sectionRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col">
        {/* Header band */}
        <div className="mx-auto w-full max-w-[1240px] px-4 pt-20 sm:px-6 md:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
            <div className="md:max-w-[560px]">
              <FadeUp>
                <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated/80 backdrop-blur px-3 py-1.5">
                  <span
                    className="size-1.5 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
                  />
                  <span className="text-[12px] font-medium text-ink-muted">
                    Connect everything
                  </span>
                </div>
              </FadeUp>
              <RevealLines
                as="h2"
                className="mt-4 font-display font-extrabold leading-[0.98] tracking-[-0.04em] text-ink text-[clamp(1.75rem,5vw,3.2rem)] md:mt-5"
              >
                Plug into everything you already pay for.
              </RevealLines>
            </div>
            <FadeUp delay={0.18}>
              <p className="text-[14px] text-ink-muted leading-relaxed md:max-w-[400px] md:text-[15px]">
                Attribution, analytics, payments, email, support — wired
                server-side so the numbers finally match the platforms that own
                the spend.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Track */}
        <div className="relative flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-stretch gap-4 pl-[max(4vw,1rem)] pr-[80px] will-change-transform sm:gap-6 sm:pl-[max(4vw,2rem)]"
          >
            {integrations.map((i) => (
              <IntegrationTile key={i.id} item={i} />
            ))}
          </div>
        </div>

        {/* Footer caption + progress rail */}
        <div className="mx-auto w-full max-w-[1240px] px-4 pb-10 sm:px-6 md:px-10 md:pb-14">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Scroll
            </span>
            <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-rule">
              <div
                ref={progressRef}
                className="absolute inset-0 origin-left bg-accent"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              {integrations.length} integrations
            </span>
          </div>
          <p className="mt-4 text-center text-[12px] text-ink-muted md:mt-5 md:text-[13px]">
            + custom integrations on request. yes, even that obscure one.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Reduced-motion fallback — non-pinned scroll                   */
/* ============================================================ */

function ReducedMotionFallback() {
  return (
    <section id="integrations" className="relative py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 md:px-10">
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
            <span
              className="size-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
            />
            <span className="text-[12px] font-medium text-ink-muted">
              Connect everything
            </span>
          </div>
        </FadeUp>
        <RevealLines
          as="h2"
          className="mt-5 font-display font-extrabold leading-[0.98] tracking-[-0.04em] text-ink text-[clamp(2rem,4.6vw,3.4rem)]"
        >
          Plug into everything you already pay for.
        </RevealLines>
      </div>

      {/* No GSAP pin under reduced motion. Use a normal horizontal scroll
          rail so the tiles still display at their designed size. */}
      <div className="mt-10 flex gap-4 overflow-x-auto pl-4 pr-12 pb-4 sm:pl-6 md:pl-10 no-scrollbar [scrollbar-width:none]">
        {integrations.map((i) => (
          <IntegrationTile key={i.id} item={i} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* Tile — two-tone product chip                                  */
/* ============================================================ */

export function IntegrationTile({ item }: { item: Integration }) {
  return (
    <div
      data-int-tile
      className="group relative flex-none w-[240px] sm:w-[260px] lg:w-[280px] h-[280px] sm:h-[300px] lg:h-[320px] snap-start overflow-hidden rounded-[20px] shadow-[0_24px_60px_-30px_rgba(8,30,90,0.30),0_2px_4px_-2px_rgba(8,30,90,0.10)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:rotate-[-0.4deg]"
      style={{
        background: `linear-gradient(135deg, ${item.bg} 0%, ${darken(item.bg, 0.18)} 100%)`,
        color: item.fg,
      }}
    >
      {/* --- Intricate layered effects --- */}

      {/* 1. Slow-rotating holographic shimmer (conic gradient) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[40%] z-0 opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.0) 0deg, rgba(255,255,255,0.28) 60deg, rgba(255,255,255,0.0) 130deg, rgba(255,255,255,0.18) 230deg, rgba(255,255,255,0.0) 320deg, rgba(255,255,255,0.0) 360deg)",
          animation: "tile-shimmer 14s linear infinite",
        }}
      />

      {/* 2. Diagonal mesh lines — visible only on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 14px)",
        }}
      />

      {/* 3. Film grain */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-[0.10]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* 4. Top-left bright bloom */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 22% 12%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 55%)",
        }}
      />

      {/* 5. Bottom-right deep vignette */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 85% 90%, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0) 55%)",
        }}
      />

      {/* 6. Inner ring highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-white/25"
      />

      {/* Status badge */}
      {item.status === "coming-soon" && (
        <span className="absolute right-3 top-3 z-20 rounded-full bg-black/30 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur">
          Soon
        </span>
      )}

      {/* Frosted icon disc — centered in the full card */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div
          className="relative grid size-[92px] place-items-center rounded-[22px] bg-white/[0.16] backdrop-blur-sm ring-1 ring-white/25 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18), 0 12px 28px -14px rgba(0,0,0,0.4)",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            className="size-[54px]"
            style={{ color: item.fg }}
            aria-hidden
            dangerouslySetInnerHTML={{ __html: item.logo }}
          />
        </div>
      </div>

      {/* Text — directly on the gradient at the bottom of the same card */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-3">
        {/* Hairline above the name to anchor it */}
        <span
          aria-hidden
          className="mb-3 block h-px w-8"
          style={{ background: "rgba(255,255,255,0.30)" }}
        />
        <p
          className="text-[15px] font-semibold leading-tight tracking-[-0.005em]"
          style={{ color: item.fg }}
        >
          {item.name}
        </p>
        <p
          className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.20em]"
          style={{ color: item.fg, opacity: 0.7 }}
        >
          {item.category}
        </p>
      </div>
    </div>
  );
}

/* Hex darken helper — tiny self-contained, no external dep. */
function darken(hex: string, amount: number) {
  const h = hex.replace("#", "");
  const isShort = h.length === 3;
  const r = parseInt(isShort ? h[0] + h[0] : h.substring(0, 2), 16);
  const g = parseInt(isShort ? h[1] + h[1] : h.substring(2, 4), 16);
  const b = parseInt(isShort ? h[2] + h[2] : h.substring(4, 6), 16);
  const dim = (c: number) => Math.max(0, Math.min(255, Math.round(c * (1 - amount))));
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return `#${toHex(dim(r))}${toHex(dim(g))}${toHex(dim(b))}`;
}

/* Avoid unused warning in build if tree-shaking removes ScrollTrigger ref. */
void ScrollTrigger;
