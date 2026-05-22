"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  as?: ElementType;
  className?: string;
  /** CSS selector for the children to animate. Defaults to direct children. */
  selector?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
  start?: string;
  /** When true, uses a grid stagger ('from' = start) for wave entry. */
  grid?: boolean;
  /** Optional rotation in degrees applied during entry. */
  rotate?: number;
  children: ReactNode;
};

export function StaggerChildren({
  as,
  className,
  selector,
  delay = 0,
  duration = 0.85,
  stagger = 0.08,
  y = 24,
  start = "top 85%",
  grid = false,
  rotate = 0,
  children,
}: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = selector
        ? Array.from(el.querySelectorAll<HTMLElement>(selector))
        : (Array.from(el.children) as HTMLElement[]);
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y, rotate });

      const t = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration,
            delay,
            ease: "editorial",
            stagger: grid
              ? { grid: "auto", from: "start", amount: stagger * items.length }
              : stagger,
          });
        },
      });
      return () => t.kill();
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
