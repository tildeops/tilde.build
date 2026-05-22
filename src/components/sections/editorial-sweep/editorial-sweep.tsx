"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { storefronts } from "@/lib/storefronts";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { BrowserChrome } from "./browser-chrome";
import { StandardMockup } from "./standard-mockup";
import { TildeMockup } from "./tilde-mockup";
import { LedgerColumn } from "./ledger-column";
import { EditorialHeading } from "./editorial-heading";
import { StatStrip } from "./stat-strip";
import { MobileStack } from "./mobile-stack";

/**
 * Entry point. Routes to the desktop pinned sweep or the mobile static stack
 * based on viewport width and reduced-motion preference. The two layouts are
 * intentionally separate components — the desktop one owns a heavy GSAP
 * timeline that would be wasted (and incorrect) on small screens.
 */
export function EditorialSweep() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"loading" | "desktop" | "mobile">("loading");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setMode(mq.matches ? "mobile" : "desktop");
    const handler = (e: MediaQueryListEvent) =>
      setMode(e.matches ? "mobile" : "desktop");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (mode === "loading") {
    return <div className="h-[60vh] w-full" />;
  }

  if (mode === "mobile" || reduced) {
    return <MobileStack />;
  }

  return <DesktopSweep />;
}

/* ------------------------------------------------------------------------- */
/* Desktop pinned sweep                                                       */
/* ------------------------------------------------------------------------- */

const N = storefronts.length; // 4

function DesktopSweep() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  // Card grow + transform
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Heading + ledgers + stat strip wrappers (for fade-in after grow)
  const headingWrapRef = useRef<HTMLDivElement | null>(null);
  const leftLedgerWrapRef = useRef<HTMLDivElement | null>(null);
  const rightLedgerWrapRef = useRef<HTMLDivElement | null>(null);
  const statWrapRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLParagraphElement | null>(null);

  // Per-category refs
  const standardLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tildeLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const urlRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nounRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftBulletRefs = useRef<(HTMLLIElement | null)[][]>([[], [], [], []]);
  const rightBulletRefs = useRef<(HTMLLIElement | null)[][]>([[], [], [], []]);
  const leftGroupRefs = useRef<(HTMLUListElement | null)[]>([]);
  const rightGroupRefs = useRef<(HTMLUListElement | null)[]>([]);

  // Separator + tilde clip
  const tildeClipRef = useRef<HTMLDivElement | null>(null);
  const separatorRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      const pin = pinRef.current;
      if (!card || !pin) return;

      // Initial state setup — everything hidden except first category placeholders
      gsap.set(card, { scale: 0.7, transformOrigin: "center center" });
      gsap.set(
        [
          headingWrapRef.current,
          leftLedgerWrapRef.current,
          rightLedgerWrapRef.current,
          statWrapRef.current,
        ],
        { opacity: 0 }
      );
      gsap.set(summaryRef.current, { opacity: 0, y: 8 });

      // Hide all non-first standard/tilde layers, URLs, categories, nouns, stats
      for (let i = 0; i < N; i++) {
        gsap.set(standardLayerRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        gsap.set(tildeLayerRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        gsap.set(urlRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        gsap.set(categoryRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        gsap.set(nounRefs.current[i], { opacity: i === 0 ? 1 : 0, y: 0 });
        gsap.set(statRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        gsap.set(leftGroupRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        gsap.set(rightGroupRefs.current[i], { opacity: i === 0 ? 1 : 0 });
      }

      // All bullets start hidden (they'll stagger in per category)
      const allLeftBullets = leftBulletRefs.current.flat().filter(Boolean);
      const allRightBullets = rightBulletRefs.current.flat().filter(Boolean);
      gsap.set([...allLeftBullets, ...allRightBullets], { opacity: 0, y: 10 });

      // Slider initial state
      gsap.set(tildeClipRef.current, { width: "0%" });
      gsap.set(separatorRef.current, { left: "0%", opacity: 0 });

      /* ============================================================
       *  TIMELINE
       *  Total duration normalized to 1.0; mapped to +=500% scroll.
       *  Phase budget:
       *    0.000–0.080  grow + initial UI fade-in
       *    0.080–0.280  category 0 (skincare)
       *    0.280–0.320  transition 0 → 1
       *    0.320–0.520  category 1 (furniture)
       *    0.520–0.560  transition 1 → 2
       *    0.560–0.760  category 2 (apparel)
       *    0.760–0.800  transition 2 → 3
       *    0.800–0.940  category 3 (jewelry, last — no out transition)
       *    0.940–1.000  summary + unpin runway
       * ============================================================ */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=500%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // -----------------------------------------------------------------
      // PHASE 0: GROW (0.00 – 0.08)
      // -----------------------------------------------------------------
      tl.to(card, { scale: 1, duration: 0.08 }, 0)
        .to(headingWrapRef.current, { opacity: 1, y: 0, duration: 0.05 }, 0.03)
        .to(leftLedgerWrapRef.current, { opacity: 1, duration: 0.05 }, 0.05)
        .to(rightLedgerWrapRef.current, { opacity: 1, duration: 0.05 }, 0.05)
        .to(statWrapRef.current, { opacity: 1, duration: 0.05 }, 0.05)
        .to(separatorRef.current, { opacity: 0.5, duration: 0.03 }, 0.06);

      // -----------------------------------------------------------------
      // CATEGORY PHASE BUILDER
      // -----------------------------------------------------------------
      const buildCategory = (i: number, start: number) => {
        // Within each 0.20 window:
        //   start+0.000 : standard already visible
        //   start+0.005 : left bullets stagger in
        //   start+0.040 : separator begins sweep (and tilde fades in)
        //   start+0.140 : right bullets stagger in
        //   start+0.170 : sweep complete, hold

        // Left ledger bullets stagger in
        leftBulletRefs.current[i].forEach((el, bi) => {
          if (!el) return;
          tl.fromTo(
            el,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.04, ease: "editorial" },
            start + 0.005 + bi * 0.012
          );
        });

        // Slider sweep + tilde reveal (0.04 → 0.16 within window, so 12% of timeline = 60vh of scroll)
        tl.to(
          tildeClipRef.current,
          { width: "100%", duration: 0.12 },
          start + 0.04
        ).to(
          separatorRef.current,
          { left: "100%", opacity: 1, duration: 0.12 },
          start + 0.04
        );

        // Right ledger bullets stagger in midway through the sweep
        rightBulletRefs.current[i].forEach((el, bi) => {
          if (!el) return;
          tl.fromTo(
            el,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.04, ease: "editorial" },
            start + 0.105 + bi * 0.012
          );
        });
      };

      // -----------------------------------------------------------------
      // TRANSITION PHASE BUILDER
      // -----------------------------------------------------------------
      const buildTransition = (from: number, to: number, start: number) => {
        // 0.04 wide window:
        //   start+0.000 : ledgers fade out (both groups)
        //   start+0.010 : separator + clip retract to 0%
        //   start+0.020 : layer crossfade (standard, tilde, url, category, noun, stat)
        //   start+0.030 : standard for next is visible, ready for next category

        // Fade out current bullets
        leftBulletRefs.current[from].forEach((el) => {
          if (el) tl.to(el, { opacity: 0, y: -6, duration: 0.015 }, start);
        });
        rightBulletRefs.current[from].forEach((el) => {
          if (el) tl.to(el, { opacity: 0, y: -6, duration: 0.015 }, start);
        });

        // Fade out group containers
        tl.to(leftGroupRefs.current[from], { opacity: 0, duration: 0.015 }, start + 0.012);
        tl.to(rightGroupRefs.current[from], { opacity: 0, duration: 0.015 }, start + 0.012);

        // Reset slider
        tl.to(
          tildeClipRef.current,
          { width: "0%", duration: 0.022 },
          start + 0.008
        ).to(
          separatorRef.current,
          { left: "0%", duration: 0.022 },
          start + 0.008
        );

        // Crossfade chrome bits
        tl.to(urlRefs.current[from], { opacity: 0, duration: 0.014 }, start + 0.014);
        tl.to(urlRefs.current[to], { opacity: 1, duration: 0.014 }, start + 0.020);
        tl.to(
          categoryRefs.current[from],
          { opacity: 0, duration: 0.014 },
          start + 0.014
        );
        tl.to(
          categoryRefs.current[to],
          { opacity: 1, duration: 0.014 },
          start + 0.020
        );

        // Noun morph
        tl.to(
          nounRefs.current[from],
          { opacity: 0, y: -8, duration: 0.018, ease: "editorial-in" },
          start + 0.010
        ).fromTo(
          nounRefs.current[to],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.020, ease: "editorial" },
          start + 0.020
        );

        // Stat strip cycle
        tl.to(statRefs.current[from], { opacity: 0, duration: 0.014 }, start + 0.014);
        tl.to(statRefs.current[to], { opacity: 1, duration: 0.014 }, start + 0.020);

        // Mockup content crossfade
        tl.to(standardLayerRefs.current[from], { opacity: 0, duration: 0.014 }, start + 0.014);
        tl.to(standardLayerRefs.current[to], { opacity: 1, duration: 0.014 }, start + 0.018);
        tl.to(tildeLayerRefs.current[from], { opacity: 0, duration: 0.014 }, start + 0.014);
        tl.to(tildeLayerRefs.current[to], { opacity: 1, duration: 0.014 }, start + 0.018);

        // Next group container fades in
        tl.to(leftGroupRefs.current[to], { opacity: 1, duration: 0.014 }, start + 0.022);
        tl.to(rightGroupRefs.current[to], { opacity: 1, duration: 0.014 }, start + 0.022);
      };

      // -----------------------------------------------------------------
      // RUN PHASES
      // -----------------------------------------------------------------
      buildCategory(0, 0.08);
      buildTransition(0, 1, 0.28);
      buildCategory(1, 0.32);
      buildTransition(1, 2, 0.52);
      buildCategory(2, 0.56);
      buildTransition(2, 3, 0.76);
      buildCategory(3, 0.80);

      // -----------------------------------------------------------------
      // PHASE FINAL: SUMMARY + OUTRO (0.94 – 1.00)
      // -----------------------------------------------------------------
      tl.to(
        statWrapRef.current,
        { opacity: 0, y: -8, duration: 0.03 },
        0.945
      )
        .fromTo(
          summaryRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.04, ease: "editorial" },
          0.96
        )
        .to(separatorRef.current, { opacity: 0, duration: 0.03 }, 0.96);

      // Refresh after setup so Lenis-aware measurements settle
      ScrollTrigger.refresh();

      return () => {
        // useGSAP cleanup auto-kills timelines bound via scope; nothing extra.
      };
    },
    { scope: sectionRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ paddingTop: 0 }}
      >
        {/* Eyebrow + heading — pinned near top, fades in after grow */}
        <div
          ref={headingWrapRef}
          className="absolute left-0 right-0 top-[72px] z-30 mx-auto w-full max-w-[1100px] px-6 text-center sm:top-[88px] lg:top-[96px]"
        >
          <EditorialHeading data={storefronts} nounRefs={nounRefs} />
        </div>

        {/* Left ledger column */}
        <div
          ref={leftLedgerWrapRef}
          className="absolute left-6 top-1/2 z-20 hidden w-[180px] -translate-y-1/2 xl:w-[220px] lg:block"
        >
          <LedgerColumn
            side="standard"
            data={storefronts}
            bulletRefs={leftBulletRefs}
            groupRefs={leftGroupRefs}
          />
        </div>

        {/* Right ledger column */}
        <div
          ref={rightLedgerWrapRef}
          className="absolute right-6 top-1/2 z-20 hidden w-[180px] -translate-y-1/2 xl:w-[220px] lg:block"
        >
          <LedgerColumn
            side="tilde"
            data={storefronts}
            bulletRefs={rightBulletRefs}
            groupRefs={rightGroupRefs}
          />
        </div>

        {/* Card — center stage */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 pt-[176px] pb-[110px] sm:px-6 lg:px-[230px] xl:px-[260px]">
          <div
            className="relative w-full"
            style={{
              maxWidth: "min(96vw, 1200px)",
              height: "min(64vh, 640px)",
            }}
          >
            <div
              ref={cardRef}
              className="relative h-full w-full"
              style={{ willChange: "transform" }}
            >
              <BrowserChrome
                data={storefronts}
                urlRefs={urlRefs}
                categoryRefs={categoryRefs}
              >
                {/* Standard layers — always behind, opacity-gated */}
                {storefronts.map((s, i) => (
                  <div
                    key={`std-${s.slug}`}
                    ref={(el) => {
                      standardLayerRefs.current[i] = el;
                    }}
                    className="absolute inset-0"
                    style={{
                      opacity: i === 0 ? 1 : 0,
                      willChange: "opacity",
                      zIndex: 1,
                    }}
                  >
                    <StandardMockup brand={s} />
                  </div>
                ))}

                {/* Tilde reveal clip — width animates 0 → 100% per sweep */}
                <div
                  ref={tildeClipRef}
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{
                    width: "0%",
                    willChange: "width",
                    zIndex: 2,
                  }}
                >
                  <div
                    className="relative h-full"
                    style={{
                      width: "min(96vw, 1200px)",
                      maxWidth: "100vw",
                    }}
                  >
                    {storefronts.map((s, i) => (
                      <div
                        key={`tld-${s.slug}`}
                        ref={(el) => {
                          tildeLayerRefs.current[i] = el;
                        }}
                        className="absolute inset-0"
                        style={{
                          opacity: i === 0 ? 1 : 0,
                          willChange: "opacity",
                        }}
                      >
                        <TildeMockup brand={s} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Separator handle */}
                <div
                  ref={separatorRef}
                  className="absolute inset-y-0 z-[3] flex items-center"
                  style={{
                    left: "0%",
                    width: "2px",
                    backgroundColor: "var(--color-accent)",
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.18), 0 0 24px rgba(58,20,128,0.45)",
                    willChange: "left, opacity",
                    transform: "translateX(-1px)",
                  }}
                  aria-hidden
                >
                  <div
                    className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-on-accent"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25), 0 8px 24px -8px rgba(0,0,0,0.5)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path d="M5 4 L1 8 L5 12 M11 4 L15 8 L11 12 M1 8 H15" />
                    </svg>
                  </div>
                </div>
              </BrowserChrome>
            </div>
          </div>
        </div>

        {/* Bottom area: stat strip + summary line */}
        <div className="absolute bottom-[48px] left-0 right-0 z-30 px-6 sm:bottom-[64px]">
          <div ref={statWrapRef} className="mx-auto max-w-[640px]">
            <StatStrip data={storefronts} statRefs={statRefs} />
          </div>
          <p
            ref={summaryRef}
            className="mt-3 text-center font-display italic text-[15px] leading-tight text-ink-muted sm:text-[17px] md:text-[19px]"
          >
            Four brands. Four worlds.{" "}
            <span className="text-ink">One studio. One handoff.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
