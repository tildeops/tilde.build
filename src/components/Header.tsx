"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 transition-[top] duration-300",
        scrolled ? "top-6" : "top-7",
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500 ease-in-out",
          scrolled
            ? "h-12 max-w-[760px] gap-3 rounded-full border border-white/5 bg-white/[0.04] px-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
            : "h-16 rounded-none border border-transparent bg-transparent px-6 lg:px-10",
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "group inline-flex items-baseline gap-1 font-display leading-none tracking-[-0.02em] transition-[font-size] duration-500",
            scrolled ? "text-[20px]" : "text-[26px]",
          )}
        >
          <span>tilde</span>
          {/* <span className="text-white text-[100px] leading-[5px] transition-transform duration-300 -translate-y-2.5">
            ~
          </span> */}
        </Link>

        {/* Main nav */}
        <nav
          className={cn(
            "hidden items-center transition-all duration-500 ease-in-out md:flex rounded-[28px] p-1",
            scrolled
              ? "gap-0 bg-transparent ring-0"
              : "gap-1 bg-white/[0.03] backdrop-blur-md ring-1 ring-white/[0.08]",
          )}
          style={
            scrolled
              ? undefined
              : {
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -40px rgba(0,0,0,0.6)",
                }
          }
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full text-fg/50 font-medium transition-all duration-300 ease-in-out hover:bg-white/[0.08] hover:text-fg hover:ring-1 hover:ring-white/[0.06]",
                scrolled ? "px-3 py-1 text-[12px]" : "px-4 py-1.5 text-[13px]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Start a project */}
        <Button
          href="#contact"
          variant="primary"
          className={cn(
            "transition-[padding,font-size,box-shadow] duration-500 font-medium",
            scrolled
              ? "px-3 py-1.5 text-[12px] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
              : "px-4 py-2 text-[13px]",
          )}
        >
          Start a project
        </Button>
      </div>
    </header>
  );
}
