"use client";

import { useEffect } from "react";
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
      // First refresh after binding so all triggers measure with smooth scroll active
      ScrollTrigger.refresh();

      bound = () => {
        lenis.off("scroll", onScroll);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
      };
    };

    bind();

    return () => {
      cancelled = true;
      bound?.();
    };
  }, []);

  return <>{children}</>;
}
