"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/pricing/services";
import { cn } from "@/lib/utils";

/**
 * Sticky service switcher for /pricing/[service]. Each tab is a real <Link> to
 * a subroute, so the active state comes from `useSelectedLayoutSegment()`. An
 * accent pill slides behind the active tab (measured from the active link's
 * box); inactive tabs get a soft hover background. Horizontally scrollable on
 * mobile, with the active tab scrolled into view on route change.
 */
export function PricingTabBar() {
  const segment = useSelectedLayoutSegment();
  const listRef = useRef<HTMLUListElement | null>(null);
  const activeRef = useRef<HTMLLIElement | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(
    null,
  );

  // Position the sliding pill under the active tab (runs before paint).
  useLayoutEffect(() => {
    const item = activeRef.current;
    if (!item) return;
    setPill({ left: item.offsetLeft, width: item.offsetWidth });
  }, [segment]);

  // Re-measure on layout/resize (font load, viewport change) and keep the
  // active tab in view on mobile when the route changes.
  useEffect(() => {
    const list = listRef.current;
    const item = activeRef.current;
    const measure = () => {
      if (activeRef.current)
        setPill({
          left: activeRef.current.offsetLeft,
          width: activeRef.current.offsetWidth,
        });
    };
    const ro = list ? new ResizeObserver(measure) : null;
    if (ro && list) ro.observe(list);
    window.addEventListener("resize", measure);
    if (list && item) {
      list.scrollTo({ left: Math.max(0, item.offsetLeft - 16), behavior: "smooth" });
    }
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [segment]);

  return (
    <div className="sticky top-0 z-30 border-b border-rule bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto max-w-[1240px] px-4 pt-8 pb-3 sm:px-6 lg:px-10">
        <nav aria-label="Pricing by service">
          <ul
            ref={listRef}
            className="relative flex gap-1 overflow-x-auto no-scrollbar [scrollbar-width:none]"
          >
            {/* Sliding accent highlight */}
            {pill && (
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 h-9 rounded-full bg-accent/40 transition-[transform,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateX(${pill.left}px)`,
                  width: pill.width,
                }}
              />
            )}
            {SERVICES.map((s) => {
              const active = segment === s.slug;
              return (
                <li
                  key={s.slug}
                  ref={active ? activeRef : undefined}
                  className="shrink-0"
                >
                  <Link
                    href={`/pricing/${s.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative z-10 inline-flex h-9 items-center whitespace-nowrap rounded-full px-4 text-[13px] font-medium transition-colors duration-200",
                      active
                        ? "font-semibold text-ink"
                        : "text-ink-muted hover:bg-bg-elevated hover:text-ink",
                    )}
                  >
                    {s.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
