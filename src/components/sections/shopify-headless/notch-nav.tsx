"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { navItems } from "@/lib/site";
import { calTrigger } from "@/lib/cal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* External store: matchMedia → isMobile. Defined at module scope so
   useSyncExternalStore's `subscribe` / `getSnapshot` references are stable
   across renders (otherwise React resubscribes every render). */
const MQ_QUERY = "(max-width: 767.98px)";
function subscribeMobileMq(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(MQ_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getMobileMqSnapshot() {
  return window.matchMedia(MQ_QUERY).matches;
}
function getMobileMqServerSnapshot() {
  return false;
}

const COMPACT_W = 152;
const COMPACT_H = 32;
const EXPANDED_H_DESKTOP = 56;
const RADIUS_COMPACT = 18;
const RADIUS_EXPANDED_DESKTOP = 28;
const RADIUS_EXPANDED_MOBILE = 22;
const MOBILE_GUTTER_PX = 12; // breathing room on each side of the drawer

export function NotchNav() {
  // The landing (/) and /shopify-headless host the liquid hero band: the notch
  // tucks into the band's top edge and travels up as the band expands. Every
  // other route is a plain page with no hero — the notch hangs flush from the
  // viewport top instead, expanded by default and collapsing on scroll.
  const pathname = usePathname();
  const heroMode =
    pathname === "/" || (pathname?.startsWith("/shopify-headless") ?? false);

  // Hover/focus intent (desktop), tap intent (mobile), and scroll-derived
  // "collapsed" state. Effective `expanded` derives from all three.
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  // `pastHero` doubles as the generic-page "scrolled past the top" flag.
  const [pastHero, setPastHero] = useState(false);
  // Subscribe to viewport via the React 19 external-store hook. SSR snapshot
  // is `false` (desktop) to match server-rendered HTML; the post-hydration
  // pass swaps to the real client value, which avoids both the lint rule on
  // setState-in-effect and any hydration warning.
  const isMobile = useSyncExternalStore(
    subscribeMobileMq,
    getMobileMqSnapshot,
    getMobileMqServerSnapshot,
  );
  // Desktop auto-expands while inside the hero (mouse-driven UX). On mobile
  // the drawer would cover hero content, so it stays compact until tapped.
  const expanded = isMobile
    ? tapped
    : !pastHero || hovered || tapped;

  // Over the dark hero band the glass can be near-transparent; on generic
  // (light) pages it must stay a solid dark pill so the white text reads.
  const darkSurface = !heroMode || pastHero;

  const travelRef = useRef<HTMLDivElement | null>(null);
  const notchRef = useRef<HTMLDivElement | null>(null);
  const compactRef = useRef<HTMLDivElement | null>(null);
  const expandedRef = useRef<HTMLDivElement | null>(null);
  const desktopMeasureRef = useRef<HTMLDivElement | null>(null);
  const mobileMeasureRef = useRef<HTMLDivElement | null>(null);
  const firstRunRef = useRef(true);

  // Close the mobile drawer on any tap outside the notch.
  useEffect(() => {
    if (!tapped) return;
    const onPointerDown = (e: PointerEvent) => {
      const notch = notchRef.current;
      if (!notch) return;
      if (!notch.contains(e.target as Node)) {
        setTapped(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [tapped]);

  // Two scroll regimes, keyed off the route so a client-side navigation tears
  // down the old setup and wires up the right one (this component lives in the
  // root layout and never unmounts).
  //
  // • heroMode — the notch starts tucked into the rounded hero band's top edge
  //   (matching the band's responsive inset), then travels up to the viewport
  //   top as the band expands to full-bleed. `pastHero` flips once the pinned
  //   hero releases.
  // • generic — no hero. The notch hangs flush from the viewport top (top:0)
  //   and `pastHero` is driven by a plain scroll threshold so it collapses to
  //   the compact pill the moment the page is scrolled.
  useGSAP(() => {
    const travel = travelRef.current;
    if (!travel) return;

    if (!heroMode) {
      gsap.set(travel, { top: 0 });
      const onScroll = () => setPastHero(window.scrollY > 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const hero = document.getElementById("hero");
    if (!hero) return;

    setPastHero(false);

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
              // Match the hero band's scrub window AND smoothing exactly so the
              // notch tracks the band's top edge frame-for-frame instead of
              // lagging it. The band uses 0.25 on mobile / 0.4 elsewhere — a
              // mismatch here lets the two drift apart mid-scroll.
              end: c.isXs || c.isSm ? "+=40%" : "+=70%",
              scrub: c.isXs || c.isSm ? 0.25 : 0.4,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    );

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: () =>
        window.matchMedia("(max-width: 767.98px)").matches ? "+=40%" : "+=70%",
      onLeave: () => setPastHero(true),
      onEnterBack: () => setPastHero(false),
    });

    return () => {
      mm.revert();
      st.kill();
    };
    // `revertOnUpdate` is REQUIRED here. NotchNav lives in the root layout and
    // never unmounts, so without it @gsap/react defers this context's cleanup
    // to unmount (i.e. never) and merely *adds* a fresh set of ScrollTriggers
    // on every route change. The stale hero trigger from a previous visit then
    // keeps scrubbing `top` on later pages — the notch resting "a little below"
    // the top. revertOnUpdate reverts the prior context on each heroMode change.
  }, { dependencies: [heroMode], revertOnUpdate: true });

  // Animate the expand/collapse morph. First run sets the size instantly so
  // the initial expanded-in-hero state doesn't flash through compact on mount.
  useGSAP(
    () => {
      const notch = notchRef.current;
      const com = compactRef.current;
      const exp = expandedRef.current;
      const measure = isMobile
        ? mobileMeasureRef.current
        : desktopMeasureRef.current;
      if (!notch || !com || !exp || !measure) return;

      const viewportW =
        typeof window !== "undefined" ? window.innerWidth : 360;

      let targetW: number;
      let targetH: number;
      let targetR: number;

      if (expanded) {
        if (isMobile) {
          // Cap drawer width to viewport minus a gutter on each side.
          targetW = Math.min(
            measure.offsetWidth,
            viewportW - MOBILE_GUTTER_PX * 2,
          );
          targetH = measure.offsetHeight;
          targetR = RADIUS_EXPANDED_MOBILE;
        } else {
          targetW = measure.offsetWidth;
          targetH = EXPANDED_H_DESKTOP;
          targetR = RADIUS_EXPANDED_DESKTOP;
        }
      } else {
        targetW = COMPACT_W;
        targetH = COMPACT_H;
        targetR = RADIUS_COMPACT;
      }

      const instant = firstRunRef.current;
      firstRunRef.current = false;

      gsap.killTweensOf([notch, com, exp]);

      gsap.to(notch, {
        width: targetW,
        height: targetH,
        borderBottomLeftRadius: targetR,
        borderBottomRightRadius: targetR,
        duration: instant ? 0 : 0.55,
        ease: "expo.out",
      });

      if (instant) {
        gsap.set(com, { autoAlpha: expanded ? 0 : 1 });
        gsap.set(exp, { autoAlpha: expanded ? 1 : 0 });
        return;
      }

      const outgoing = expanded ? com : exp;
      const incoming = expanded ? exp : com;

      gsap.to(outgoing, {
        autoAlpha: 0,
        duration: 0.15,
        ease: "power2.in",
      });
      gsap.to(incoming, {
        autoAlpha: 1,
        duration: 0.22,
        delay: 0.18,
        ease: "power2.out",
      });
    },
    { dependencies: [expanded, isMobile] }
  );

  const handleNotchTap = () => {
    if (!isMobile) return; // desktop relies on hover
    // Tap-to-open only — closing is via the X button inside the drawer or
    // by tapping outside. Prevents an accidental tap on the drawer's
    // background from collapsing it.
    if (!tapped) setTapped(true);
  };

  const handleDrawerLinkTap = () => {
    setTapped(false);
  };

  return (
    <>
      {/* Hidden sizers — one per layout variant. */}
      <div
        aria-hidden
        className="pointer-events-none fixed -left-[9999px] top-0 opacity-0"
      >
        <div
          ref={desktopMeasureRef}
          className="inline-flex items-center gap-1 px-3"
        >
          <NavInner />
        </div>
        <div
          ref={mobileMeasureRef}
          style={{ width: 320 }}
          className="flex flex-col"
        >
          <MobileDrawer onLinkTap={() => {}} onClose={() => {}} />
        </div>
      </div>

      {/* Fixed wrapper whose `top` is scroll-scrubbed. */}
      <div
        ref={travelRef}
        className="pointer-events-none fixed inset-x-0 z-[60] flex justify-center"
        // Generic pages resolve to top:0; only hero pages start tucked into the
        // band's edge. Keying the initial inline value off heroMode avoids the
        // 32px "drop then snap up" flash on non-hero pages before GSAP runs.
        style={{ top: heroMode ? 32 : 0 }}
      >
        <div
          ref={notchRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setHovered(false);
            }
          }}
          onClick={handleNotchTap}
          className={cn(
            "pointer-events-auto relative overflow-hidden border border-t-0",
            "text-white backdrop-blur-xl",
            "transition-[background-color,border-color] duration-300 ease-out",
            "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]",
            darkSurface
              ? "bg-black/75 border-white/10"
              : "bg-white/10 border-white/25",
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
          {/* Compact layer — tilde centered, menu icon pushed to the right
              edge. Centering survives the menu's offset because we absolutely
              position both children rather than relying on flex justification. */}
          <div
            ref={compactRef}
            className="absolute inset-x-0 top-0 h-[32px] leading-none"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15px] font-semibold tracking-tight">
              tilde
            </span>
            <Menu
              className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-white/70"
              strokeWidth={2.25}
            />
          </div>

          {/* Expanded layer — desktop: horizontal NavInner. Mobile: drawer. */}
          <div
            ref={expandedRef}
            className={cn(
              "absolute",
              isMobile
                ? "inset-0 flex flex-col"
                : "inset-y-0 left-0 flex w-max items-center gap-1 whitespace-nowrap px-3",
            )}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {isMobile ? (
              <MobileDrawer
                onLinkTap={handleDrawerLinkTap}
                onClose={() => setTapped(false)}
              />
            ) : (
              <NavInner />
            )}
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
        {...calTrigger("notch_nav")}
        className="ml-2 inline-flex h-8 items-center gap-1 rounded-full bg-white px-3 text-[12px] font-semibold text-black shadow-[0_6px_18px_-6px_rgba(255,255,255,0.45)] hover:scale-[1.02] transition-transform"
      >
        Book a call
        <ArrowUpRight className="size-3.5" />
      </Link>
    </>
  );
}

function MobileDrawer({
  onLinkTap,
  onClose,
}: {
  onLinkTap: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex w-full flex-col px-3 pb-3 pt-3">
      {/* Brand row mirroring the compact pill so the visual identity is
          continuous when the drawer opens. Menu icon swaps to an X that
          closes the drawer on tap. */}
      <div className="flex items-center justify-between px-1 pb-2">
        <Link
          href="/"
          onClick={onLinkTap}
          className="font-display text-[15px] font-semibold leading-none tracking-tight text-white"
          aria-label="tilde home"
        >
          tilde
        </Link>
        <button
          type="button"
          onClick={(e) => {
            // Block the outer notch click handler from re-toggling.
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close menu"
          className="inline-flex size-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-3.5" strokeWidth={2.25} />
        </button>
      </div>
      <div className="my-1 h-px w-full bg-white/12" aria-hidden />
      <nav className="flex flex-col gap-0.5 pt-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkTap}
            className="rounded-xl px-3 py-2.5 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/contact"
        onClick={onLinkTap}
        {...calTrigger("notch_nav_mobile")}
        className="mt-2 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-white px-4 text-[13px] font-semibold text-black shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]"
      >
        Book a call
        <ArrowUpRight className="size-3.5" />
      </Link>
    </div>
  );
}
