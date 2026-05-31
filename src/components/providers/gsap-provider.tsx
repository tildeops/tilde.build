"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

let registered = false;
function registerDefaults() {
  if (registered) return;
  // expo-out-ish curve, calmer than power4 — feels "editorial"
  CustomEase.create("editorial", "M0,0 C0.22,0.96 0.18,1 1,1");
  CustomEase.create("editorial-in", "M0,0 C0,0 0.82,0.04 1,1");
  gsap.defaults({ ease: "editorial", duration: 0.9 });
  // Prevent ScrollTrigger from refreshing every time iOS Safari's address bar
  // shows/hides — the resulting refresh-jump is the main cause of perceived
  // "glitches" when entering/leaving pinned sections on mobile.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

type WindowWithLenis = Window & {
  __lenis?: {
    on: (event: string, cb: (e: unknown) => void) => void;
    off: (event: string, cb: (e: unknown) => void) => void;
    raf: (time: number) => void;
  };
};

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerDefaults();

    // Best-effort: bridge Lenis -> ScrollTrigger. Lenis is mounted by LenisProvider
    // and exposed at window.__lenis. We poll briefly until it appears.
    let cancelled = false;
    let bound: (() => void) | null = null;

    const bind = () => {
      const w = window as WindowWithLenis;
      const lenis = w.__lenis;
      if (!lenis) {
        if (!cancelled) setTimeout(bind, 50);
        return;
      }
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      const onRefresh = () => ScrollTrigger.update();
      ScrollTrigger.addEventListener("refresh", onRefresh);

      // Canonical Lenis<->GSAP integration: drive lenis.raf from GSAP's ticker
      // so both run on ONE frame clock (gsap time is seconds -> lenis wants ms),
      // and disable lagSmoothing so GSAP never silently drops frames. This is
      // what keeps scrubbed pins from reading 1-2-frame-stale scroll and
      // jittering, especially on touch.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // First refresh after binding so all triggers measure with smooth scroll active
      ScrollTrigger.refresh();

      bound = () => {
        lenis.off("scroll", onScroll);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        gsap.ticker.remove(tick);
      };
    };

    bind();

    return () => {
      cancelled = true;
      bound?.();
    };
  }, []);

  // Recompute every ScrollTrigger after a client-side route change. Next's App
  // Router swaps the page with no `load` event, so triggers created by the new
  // route — and persistent ones like the NotchNav living in the root layout —
  // otherwise keep start/end measurements taken against the previous page's
  // layout. That stale geometry is the root cause of the notch settling a few
  // px off the hero band's top edge. We defer past paint (double rAF) and past
  // font settle so the band's pinned geometry is final before we measure.
  const pathname = usePathname();
  const firstRoute = useRef(true);
  useEffect(() => {
    if (firstRoute.current) {
      // The initial measure is already handled by the Lenis bind above.
      firstRoute.current = false;
      return;
    }
    let raf1 = 0;
    let raf2 = 0;
    const refresh = () => ScrollTrigger.refresh();
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(refresh);
    });
    // Font swap-in can change the hero band's height after first paint.
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return <>{children}</>;
}
