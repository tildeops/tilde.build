"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { storefronts } from "@/lib/storefronts";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { DesktopShell } from "./desktop-shell";
import { DesktopBackground } from "./desktop-background";
import { ScreenMessage } from "./screen-message";
import { AnimatedBrowser, type BrowserRefs } from "./animated-browser";
import { MobileStack } from "./mobile-stack";

const PICK_SLUG = "plain-skin";

const INTRO_COPY = "Your Shopify template looks like this.";
const LEFT_COPY = "Generic theme. Generic brand.";
const RIGHT_COPY = "A storefront that feels like the brand.";
const PAYOFF_COPY = "Same store. Built better.";

/* ============================================================ */
/* Entry — mode router                                           */
/* ============================================================ */

export function MacbookReveal() {
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
  return <DesktopMacbookReveal />;
}

/* ============================================================ */
/* Desktop pinned reveal — single brand, scroll-through          */
/* ============================================================ */

function DesktopMacbookReveal() {
  const brand = storefronts.find((s) => s.slug === PICK_SLUG)!;

  // Section / pin
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  // Genie source (dock icon) + target (browser window)
  const dockIconRef = useRef<HTMLDivElement | null>(null);
  const browserRef = useRef<HTMLDivElement | null>(null);

  // Messages — center intro + left (default phase) + right (tilde phase) + center payoff (browser minimizes)
  const introRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const payoffRef = useRef<HTMLDivElement | null>(null);

  // Browser internals (wipe + scroll wrappers)
  const browserRefs: BrowserRefs = {
    defaultScrollRef: useRef<HTMLDivElement | null>(null),
    tildeScrollRef: useRef<HTMLDivElement | null>(null),
    tildeClipRef: useRef<HTMLDivElement | null>(null),
    separatorRef: useRef<HTMLDivElement | null>(null),
    screensAreaRef: useRef<HTMLDivElement | null>(null),
  };

  // Scroll-distance scalars (recomputed on resize via measureScrollDistances)
  const scrollDistances = useRef({ default: 0, tilde: 0 });

  useGSAP(
    () => {
      const pin = pinRef.current;
      const shell = shellRef.current;
      if (!pin || !shell) return;

      // ---------- Initial state ----------
      gsap.set(shell, { opacity: 0, y: 18, scale: 0.985, transformOrigin: "center top" });
      gsap.set(browserRef.current, { opacity: 0, scale: 0.05 });

      gsap.set(
        [introRef.current, leftRef.current, rightRef.current, payoffRef.current],
        { opacity: 0, y: 0 }
      );

      // Browser starts on the RIGHT side (default phase). It'll slide to the
      // LEFT side during the wipe so the Tilde version takes the left.
      gsap.set(browserRef.current, { opacity: 0, scale: 0.05 });

      gsap.set(browserRefs.tildeClipRef.current, { width: "0%" });
      gsap.set(browserRefs.separatorRef.current, { left: "0%", opacity: 0 });
      gsap.set(browserRefs.defaultScrollRef.current, { y: 0 });
      gsap.set(browserRefs.tildeScrollRef.current, { y: 0 });

      // ---------- Genie pivot (browser scales toward dock icon) ----------
      const measureGeniePivot = () => {
        const icon = dockIconRef.current;
        const browser = browserRef.current;
        if (!icon || !browser) return;
        const i = icon.getBoundingClientRect();
        const prev = browser.style.transform;
        browser.style.transform = "none";
        const b = browser.getBoundingClientRect();
        browser.style.transform = prev;
        const ox = i.left + i.width / 2 - b.left;
        const oy = i.top + i.height / 2 - b.top;
        gsap.set(browser, { transformOrigin: `${ox}px ${oy}px` });
      };

      // ---------- Scroll-distance measurement ----------
      const measureScrollDistances = () => {
        const area = browserRefs.screensAreaRef.current;
        const dEl = browserRefs.defaultScrollRef.current;
        const tEl = browserRefs.tildeScrollRef.current;
        if (!area || !dEl || !tEl) return;
        const viewportH = area.clientHeight;
        scrollDistances.current.default = Math.max(0, dEl.scrollHeight - viewportH);
        scrollDistances.current.tilde = Math.max(0, tEl.scrollHeight - viewportH);
      };

      measureGeniePivot();
      measureScrollDistances();
      const onRefresh = () => {
        measureGeniePivot();
        measureScrollDistances();
      };
      ScrollTrigger.addEventListener("refresh", onRefresh);

      // ---------- Master timeline ----------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=700%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // ---------- Helpers ----------
      const revealMessage = (
        el: HTMLElement | null,
        tIn: number,
        tOut: number
      ) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.04 },
          tIn
        );
        tl.to(el, { opacity: 0, y: -8, duration: 0.04 }, tOut);
      };

      // ---------- Phase budget (runway = +=700%) ----------

      // 0  Settle              0.00–0.04
      tl.to(shell, { opacity: 1, y: 0, scale: 1, duration: 0.04 }, 0);

      // 1  Center intro        0.04–0.12 (fades out as browser opens)
      revealMessage(introRef.current, 0.04, 0.10);

      // 2  Browser opens       0.10–0.18 (genie with overshoot)
      tl.set(browserRef.current, { opacity: 1 }, 0.10);
      tl.to(browserRef.current, { scale: 0.85, duration: 0.05 }, 0.10);
      tl.to(browserRef.current, { scale: 1.04, duration: 0.015 }, 0.15);
      tl.to(browserRef.current, { scale: 1.0, duration: 0.015 }, 0.165);

      // 3  LEFT message in     0.16
      tl.fromTo(
        leftRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.04 },
        0.16
      );

      // 4  Default scroll DOWN 0.18–0.44 (translate by measured distance)
      tl.to(
        browserRefs.defaultScrollRef.current,
        {
          y: () => -scrollDistances.current.default,
          duration: 0.26,
          ease: "none",
        },
        0.18
      );

      // 5  Default scroll UP   0.44–0.60
      tl.to(
        browserRefs.defaultScrollRef.current,
        { y: 0, duration: 0.16, ease: "none" },
        0.44
      );

      // 6  LEFT message out    0.60
      tl.to(leftRef.current, { opacity: 0, y: -8, duration: 0.04 }, 0.60);

      // 7  Wipe to Tilde + browser SLIDES to the LEFT side   0.62–0.74
      tl.to(
        browserRefs.tildeClipRef.current,
        { width: "100%", duration: 0.12, ease: "expo.inOut" },
        0.62
      );
      tl.to(
        browserRefs.separatorRef.current,
        { left: "100%", opacity: 1, duration: 0.12, ease: "expo.inOut" },
        0.62
      );
      // Browser swaps sides during the wipe — default was on RIGHT, tilde takes LEFT.
      tl.to(
        browserRef.current,
        { left: "3%", right: "26%", duration: 0.12, ease: "expo.inOut" },
        0.62
      );

      // 8  RIGHT message in    0.72
      tl.fromTo(
        rightRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.04 },
        0.72
      );

      // Re-measure the genie pivot now that the browser is on the LEFT side
      // — the close-to-dock should still scale toward the dock icon.
      tl.call(measureGeniePivot, [], 0.74);

      // 9  Tilde scroll DOWN   0.74–0.92
      tl.to(
        browserRefs.tildeScrollRef.current,
        {
          y: () => -scrollDistances.current.tilde,
          duration: 0.18,
          ease: "none",
        },
        0.74
      );

      // 10 RIGHT message out   0.90
      tl.to(rightRef.current, { opacity: 0, y: -8, duration: 0.04 }, 0.90);

      // 11 Browser minimizes back toward dock    0.92–0.97 (reverse genie)
      tl.to(browserRef.current, { scale: 0.05, duration: 0.05 }, 0.92);
      tl.to(browserRef.current, { opacity: 0, duration: 0.005 }, 0.97);

      // 12 Payoff message appears as the browser minimizes   0.93–0.99
      tl.fromTo(
        payoffRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.04 },
        0.93
      );
      tl.to(payoffRef.current, { opacity: 0, y: -8, duration: 0.03 }, 0.99);

      // 13 Outro               0.96–1.00 — shell soft fade
      tl.to(shell, { y: 12, opacity: 0.9, duration: 0.04 }, 0.96);

      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
      };
    },
    { scope: sectionRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <section ref={sectionRef} id="macbook" className="relative w-full pt-12 md:pt-20">
      <div ref={pinRef} className="relative flex h-screen w-full flex-col">
        {/* Heading — compact, locked to the top */}
        <div className="relative z-10 mx-auto w-full max-w-[860px] shrink-0 px-6 pt-8 pb-3 text-center md:pt-10 md:pb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated/80 px-3 py-1.5 backdrop-blur">
            <span
              className="size-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
            />
            <span className="text-[12px] font-medium text-ink-muted">
              The before &amp; after
            </span>
          </div>
          <h2 className="mt-3 font-display font-extrabold leading-[1.1] tracking-[-0.025em] text-ink text-[clamp(1.1rem,2.4vw,1.75rem)]">
            Same Shopify backend.
            <br />
            <span className="text-ink-muted">A different universe up front.</span>
          </h2>
        </div>

        {/* Mac stage — fills the remaining viewport height */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-6 pb-4 md:px-10">
          <DesktopShell
            ref={shellRef}
            style={{
              aspectRatio: "16 / 10",
              width: "min(92vw, 1180px)",
              maxHeight: "calc(100vh - 180px)",
            }}
          >
            <DesktopBackground ref={dockIconRef} />

            <ScreenMessage ref={introRef} position="center">
              {INTRO_COPY}
            </ScreenMessage>
            <ScreenMessage ref={leftRef} position="left">
              {LEFT_COPY}
            </ScreenMessage>
            <ScreenMessage ref={rightRef} position="right">
              {RIGHT_COPY}
            </ScreenMessage>
            <ScreenMessage ref={payoffRef} position="center">
              {PAYOFF_COPY}
            </ScreenMessage>

            <AnimatedBrowser
              ref={browserRef}
              brand={brand}
              refs={browserRefs}
            />
          </DesktopShell>
        </div>
      </div>
    </section>
  );
}
