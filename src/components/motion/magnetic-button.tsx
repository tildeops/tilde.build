"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  className?: string;
  strength?: number;
  radius?: number;
  children: ReactNode;
};

/**
 * Wrap a button/link in a magnetic container — pointer movement inside `radius`
 * gently translates the child. Used sparingly on hero CTAs.
 */
export function MagneticButton({
  className,
  strength = 0.25,
  radius = 80,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      const setX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const setY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius + Math.max(rect.width, rect.height) / 2) {
          setX(0);
          setY(0);
          return;
        }
        setX(dx * strength);
        setY(dy * strength);
      };
      const onLeave = () => {
        setX(0);
        setY(0);
      };

      window.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [strength, radius] }
  );

  return (
    <div ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </div>
  );
}
