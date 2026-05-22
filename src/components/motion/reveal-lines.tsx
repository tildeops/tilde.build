"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitLines } from "@/lib/motion/split-lines";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  yPercent?: number;
  start?: string;
  children: ReactNode;
};

/**
 * Splits its children's text into lines, wraps each line in an overflow:hidden
 * mask, and reveals on scroll (yPercent -> 0). Re-splits on resize.
 *
 * Pass text content as children. Inline tags (<span>, <em>, italic spans)
 * are preserved across the split.
 */
export function RevealLines({
  as,
  className,
  delay = 0,
  stagger = 0.07,
  duration = 0.95,
  yPercent = 110,
  start = "top 85%",
  children,
}: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const ctl = splitLines(el);

      const setup = () => {
        if (!ctl.lines.length) return;
        gsap.set(ctl.lines, { yPercent });
      };
      setup();

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(ctl.lines, {
            yPercent: 0,
            duration,
            stagger,
            delay,
            ease: "editorial",
          });
        },
      });

      let raf = 0;
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const wasRevealed = trigger.progress > 0 || !trigger.isActive;
          ctl.resplit();
          if (wasRevealed) {
            gsap.set(ctl.lines, { yPercent: 0 });
          } else {
            gsap.set(ctl.lines, { yPercent });
          }
          ScrollTrigger.refresh();
        });
      });
      ro.observe(el);

      return () => {
        ro.disconnect();
        cancelAnimationFrame(raf);
        trigger.kill();
        ctl.revert();
      };
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
