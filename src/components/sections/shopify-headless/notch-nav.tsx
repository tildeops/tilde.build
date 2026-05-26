"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const COMPACT_W = 168;
const COMPACT_H = 32;
const EXPANDED_H = 56;
const RADIUS_COMPACT = 18;
const RADIUS_EXPANDED = 28;

export function NotchNav() {
  const [expanded, setExpanded] = useState(false);
  const travelRef = useRef<HTMLDivElement | null>(null);
  const notchRef = useRef<HTMLDivElement | null>(null);
  const compactRef = useRef<HTMLDivElement | null>(null);
  const expandedRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  // Scroll-driven travel: starts tucked into the rounded hero band's top
  // edge (matching the band's responsive inset), then animates up to the
  // viewport top as the hero band expands to full-bleed.
  useGSAP(() => {
    const travel = travelRef.current;
    if (!travel) return;

    const hero = document.getElementById("hero");
    if (!hero) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        isLg: "(min-width: 1024px)",
        isMd: "(min-width: 768px) and (max-width: 1023.98px)",
        isSm: "(min-width: 640px) and (max-width: 767.98px)",
        isXs: "(max-width: 639.98px)",
      },
      (ctx) => {
        const c = ctx.conditions as {
          isLg: boolean;
          isMd: boolean;
          isSm: boolean;
          isXs: boolean;
        };
        // Mirror the hero frame's responsive padding: p-3/sm:p-5/md:p-6/lg:p-8.
        const startTop = c.isLg ? 32 : c.isMd ? 24 : c.isSm ? 20 : 12;

        gsap.fromTo(
          travel,
          { top: startTop },
          {
            top: 0,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "+=70%",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    );

    return () => mm.revert();
  }, []);

  // Hover/focus expand on desktop.
  useGSAP(
    () => {
      const notch = notchRef.current;
      const com = compactRef.current;
      const exp = expandedRef.current;
      const measure = measureRef.current;
      if (!notch || !com || !exp || !measure) return;

      const targetW = expanded ? measure.offsetWidth : COMPACT_W;
      const targetH = expanded ? EXPANDED_H : COMPACT_H;
      const targetR = expanded ? RADIUS_EXPANDED : RADIUS_COMPACT;

      gsap.to(notch, {
        width: targetW,
        height: targetH,
        borderBottomLeftRadius: targetR,
        borderBottomRightRadius: targetR,
        duration: 0.55,
        ease: "expo.out",
        overwrite: "auto",
      });

      gsap.to(com, {
        autoAlpha: expanded ? 0 : 1,
        duration: expanded ? 0.18 : 0.28,
        delay: expanded ? 0 : 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(exp, {
        autoAlpha: expanded ? 1 : 0,
        duration: expanded ? 0.28 : 0.16,
        delay: expanded ? 0.18 : 0,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    { dependencies: [expanded] }
  );

  return (
    <>
      {/* Hidden sizer to measure the expanded content's natural width. */}
      <div
        aria-hidden
        className="pointer-events-none fixed -left-[9999px] top-0 opacity-0"
      >
        <div ref={measureRef} className="inline-flex items-center gap-1 px-3">
          <NavInner />
        </div>
      </div>

      {/* travelRef is the fixed wrapper whose `top` is scroll-scrubbed.
          Desktop-only — on mobile, the regular pill header is used instead. */}
      <div
        ref={travelRef}
        className="pointer-events-none fixed inset-x-0 z-[60] hidden justify-center md:flex"
        style={{ top: 32 }}
      >
        {/* Desktop notch */}
        <div
          ref={notchRef}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          onFocus={() => setExpanded(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setExpanded(false);
            }
          }}
          className={cn(
            "pointer-events-auto relative hidden overflow-hidden border border-t-0 border-white/10 md:block",
            "bg-black/95 text-white backdrop-blur-md",
            "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
          )}
          style={{
            width: COMPACT_W,
            height: COMPACT_H,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: RADIUS_COMPACT,
            borderBottomRightRadius: RADIUS_COMPACT,
            willChange: "width, height, border-radius",
          }}
        >
          {/* Compact layer */}
          <div
            ref={compactRef}
            className="absolute inset-0 flex items-center justify-center gap-2 px-4 leading-none"
          >
            <span
              className="size-1.5 shrink-0 rounded-full bg-white"
              style={{ boxShadow: "0 0 10px rgba(255,255,255,0.7)" }}
            />
            <span className="font-display text-[14px] font-semibold leading-none tracking-tight">
              tilde
            </span>
            <span className="mt-px text-[10px] font-medium uppercase leading-none tracking-[0.18em] text-white/55">
              menu
            </span>
          </div>

          {/* Expanded layer */}
          <div
            ref={expandedRef}
            className="absolute inset-y-0 left-0 flex w-max items-center gap-1 whitespace-nowrap px-3"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <NavInner />
          </div>
        </div>

      </div>
    </>
  );
}

function NavInner() {
  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-white/5"
        aria-label="tilde home"
      >
        <span
          className="size-1.5 rounded-full bg-white"
          style={{ boxShadow: "0 0 10px rgba(255,255,255,0.7)" }}
        />
        <span className="font-display text-[15px] font-semibold leading-none tracking-tight">
          tilde
        </span>
      </Link>
      <span className="mx-1 h-4 w-px bg-white/15" aria-hidden />
      <nav className="flex items-center gap-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1.5 text-[12px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/contact"
        className="ml-2 inline-flex h-8 items-center gap-1 rounded-full bg-white px-3 text-[12px] font-semibold text-black shadow-[0_6px_18px_-6px_rgba(255,255,255,0.45)] hover:scale-[1.02] transition-transform"
      >
        Book a call
        <ArrowUpRight className="size-3.5" />
      </Link>
    </>
  );
}
