"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      // Touch is intentionally left to native OS momentum (Lenis default
      // syncTouch: false). Lenis touch-smoothing lerps against the thumb and
      // feels glitchy page-wide on real devices; native momentum is smoother.
      // The hero scrub no longer needs it — the clip-path expansion removed the
      // per-frame reflow that used to be the real source of pin-jitter.
      touchMultiplier: 1.5,
    });

    // Expose globally for anchor-click delegation
    type WindowWithLenis = Window & { __lenis?: Lenis };
    (window as WindowWithLenis).__lenis = lenis;

    // NOTE: Lenis is NOT driven by its own requestAnimationFrame loop here.
    // GSAPProvider drives `lenis.raf` from `gsap.ticker` so Lenis and
    // ScrollTrigger share one frame clock (a desync between two rAF loops is
    // what made scrubbed pins read stale scroll and jitter).

    // Delegated anchor handling for #hash links
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.includes("#")) return;
      // Only handle in-page anchors
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const id = url.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
      // Update URL without jumping
      window.history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete (window as WindowWithLenis).__lenis;
    };
  }, []);

  return <>{children}</>;
}
