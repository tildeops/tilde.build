"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const useNotchInstead = pathname?.startsWith("/shopify-headless");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      // Hide on scroll-down past 120px; show on scroll-up
      const delta = y - lastY.current;
      if (y < 120) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
        setOpen(false);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    gsap.to(el, {
      y: hidden ? -100 : 0,
      duration: 0.4,
      ease: "editorial",
      overwrite: "auto",
    });
  }, [hidden]);

  // GSAP-driven open/close. The pill itself stays at a fixed border-radius
  // (24px — clamps to height/2 when the pill is short, so it still reads as
  // a capsule when closed). Only the panel's height animates: links sit in
  // normal flow inside an overflow-hidden container, so they're revealed
  // top→bottom as the pill grows.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Mobile-only — desktop nav doesn't expand.
    const mm = window.matchMedia("(min-width: 768px)");
    if (mm.matches) return;

    if (open) {
      gsap.set(panel, { height: "auto", autoAlpha: 1 });
      const targetH = panel.offsetHeight;
      gsap.fromTo(
        panel,
        { height: 0, autoAlpha: 1 },
        { height: targetH, duration: 0.4, ease: "expo.out" }
      );
    } else {
      gsap.to(panel, {
        height: 0,
        duration: 0.3,
        ease: "expo.inOut",
      });
    }
  }, [open]);

  // Close the mobile nav whenever the route is changed via a Link click.
  const closeOnNav = () => setOpen(false);

  return (
    <header
      ref={headerRef as React.RefObject<HTMLElement>}
      className={cn(
        "fixed inset-x-0 z-50 w-full transition-[top,padding] duration-300 ease-out",
        // Mobile: sits inside the liquid hero band with equal padding (24px
        // top + 24px each side = band's 12px inset + 12px gap to band edge).
        // Desktop keeps its original travel.
        scrolled
          ? "top-6 px-6 md:px-4 lg:px-6"
          : "top-6 px-6 md:top-14 md:px-5 lg:top-16 lg:px-6",
        // On /shopify-headless, the notch nav takes over from md+ — keep
        // the regular pill on mobile only.
        useNotchInstead && "md:hidden",
      )}
    >
      <div
        ref={pillRef}
        style={{
          // Background/border get CSS transitions (cheap); height + radius are
          // driven by GSAP for a smooth morph (no circle→square snap).
          transition: [
            "background-color 240ms ease-out",
            "border-color 240ms ease-out",
            "backdrop-filter 240ms ease-out",
            "max-width 320ms ease-out",
            "padding 320ms ease-out",
          ].join(", "),
        }}
        className={cn(
          // Outer pill — flex column on mobile so the panel can drop below
          // the top row, flex row on desktop. Mobile border-radius is fixed
          // at 24px (clamps to height/2 when short, reads as a rounded
          // rectangle when expanded) so the pill doesn't morph through an
          // oval shape mid-animation.
          "relative mx-auto flex flex-col overflow-hidden rounded-3xl border md:flex-row md:items-center md:justify-between md:rounded-none md:border",
          // Mobile: full-width glass pill (no fixed cap — sits inside the band)
          open
            ? "max-w-full border-white/25 bg-black/55 backdrop-blur-md md:max-w-[760px]"
            : "max-w-full border-white/15 bg-black/30 backdrop-blur-[2px]",
          // Desktop overrides for the transparent-at-top → pill-when-scrolled travel
          scrolled
            ? "md:max-w-[760px] md:h-11 md:rounded-full md:border-white/15 md:bg-black/30 md:pl-3 md:pr-1.5 md:py-1.5 md:backdrop-blur-[2px]"
            : "md:max-w-[1240px] md:h-12 md:rounded-none md:border-transparent md:bg-transparent md:p-0 md:backdrop-blur-none",
        )}
      >
        {/* Top row — logo + (desktop nav center) + (desktop CTA right) + (mobile toggle right) */}
        <div className="flex h-11 w-full shrink-0 items-center justify-between pl-3 pr-1.5 md:h-auto md:w-auto md:flex-1 md:p-0">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label={`${site.name} home`}
            onClick={closeOnNav}
          >
            <span
              className={cn(
                "font-display leading-none tracking-tight font-semibold text-white transition-[font-size] duration-300",
                scrolled
                  ? "text-[20px] md:text-[22px]"
                  : "text-[20px] md:text-[30px]",
              )}
            >
              tilde
            </span>
          </Link>

          {/* Desktop centered nav (kept in the top row so layout flow matches) */}
          <nav
            className={cn(
              "hidden md:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              scrolled
                ? "gap-5"
                : "gap-1 rounded-full border border-white/15 bg-black/30 px-2 py-1 backdrop-blur-[2px]",
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group/nav relative transition-colors font-semibold",
                  scrolled
                    ? "text-[12px] text-on-accent/80 hover:text-white"
                    : "rounded-full px-3 py-1 text-[13px] text-on-accent/80 hover:bg-white/10 hover:text-on-accent",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-1 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/nav:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          {/* Desktop "Book a call" */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant={scrolled ? "invert" : "invert"}
              className={cn(scrolled && "h-7 px-3 text-[11px] [&_svg]:size-3")}
            >
              <Link href="/contact">
                Book a call <ArrowUpRight />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle — flips between hamburger and X */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border text-white transition-colors",
              open
                ? "border-white/30 bg-white/15"
                : "border-white/20 bg-white/10",
            )}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Mobile expanded panel — outer div is purely the height container
            (overflow-hidden, no padding so its inline height:0 truly hides
            everything). The inner wrapper holds the padding + nav items at
            their natural height; as the outer's height grows, more of the
            inner is revealed top→bottom. */}
        <div
          ref={panelRef}
          style={{ height: 0 }}
          className={cn(
            "md:hidden w-full overflow-hidden",
            open ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <div className="flex w-full flex-col gap-1 px-3 pb-3 pt-2">
            <div className="mb-1 border-t border-white/10" />
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeOnNav}
                className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeOnNav}
              className="mt-2 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-white px-4 text-[13px] font-semibold text-accent shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]"
            >
              Book a call
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
