"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires a `section_view` event once, the first time the wrapped section
 * scrolls into view (≥35% visible). Used to learn which homepage sections
 * visitors actually reach. Renders a plain wrapper `<div>` so it doesn't
 * disturb the section's own layout.
 */
export function TrackSection({
  name,
  children,
  className,
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            trackEvent("section_view", { section: name });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [name]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
