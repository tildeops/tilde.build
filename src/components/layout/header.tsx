"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
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

  return (
    <header
      ref={headerRef as React.RefObject<HTMLElement>}
      className={cn(
        "fixed inset-x-0 z-50 w-full transition-[top,padding] duration-300 ease-out",
        scrolled
          ? "top-5 md:top-6 px-3 sm:px-4 lg:px-6"
          : "top-10 sm:top-14 lg:top-16 px-3 sm:px-5 lg:px-6"
      )}
    >
      <div
        style={{
          transition: [
            "background-color 140ms ease-out",
            "border-color 140ms ease-out",
            "box-shadow 160ms ease-out",
            "backdrop-filter 180ms ease-out",
            "max-width 320ms ease-out",
            "height 320ms ease-out",
            "padding 320ms ease-out",
            "border-radius 260ms ease-out",
          ].join(", "),
        }}
        className={cn(
          "relative mx-auto flex items-center justify-between border",
          scrolled
            ? "h-11 max-w-[760px] rounded-full border-white/15 bg-black/30 px-1.5 py-1.5 backdrop-blur-[2px]"
            : "h-12 max-w-[1240px] rounded-none border-transparent bg-transparent backdrop-blur-none"
        )}
      >
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2",
            scrolled && "pl-2"
          )}
          aria-label={`${site.name} home`}
        >
          <span
            className={cn(
              "font-display leading-none tracking-tight font-semibold text-white transition-[font-size] duration-300",
              scrolled ? "text-[22px]" : "text-[30px]"
            )}
          >
            tilde
          </span>
        </Link>

        <nav
          className={cn(
            "hidden md:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            scrolled
              ? "gap-5"
              : "gap-1 rounded-full border border-white/15 bg-black/30 px-2 py-1 backdrop-blur-[2px]"
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
                  : "rounded-full px-3 py-1 text-[13px] text-on-accent/80 hover:bg-white/10 hover:text-on-accent"
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

        <div className="hidden md:flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant={scrolled ? "invert" : "invert"}
            className={cn(
              scrolled && "h-7 px-3 text-[11px] [&_svg]:size-3"
            )}
          >
            <Link href="/contact">
              Book a call <ArrowUpRight />
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className={cn(
                "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                scrolled
                  ? "border-rule text-ink"
                  : "border-white/15 bg-black/30 text-on-accent backdrop-blur-[2px]"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[88%] max-w-sm bg-bg p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl leading-none tracking-tight text-ink">
                  tilde
                </span>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule"
                    aria-label="Close menu"
                  >
                    <X className="size-5" />
                  </button>
                </Dialog.Close>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl py-3 border-b border-rule text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8">
                <Button asChild size="lg" variant="primary" className="w-full">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Book a call <ArrowUpRight />
                  </Link>
                </Button>
              </div>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                {site.contactEmail}
              </p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
