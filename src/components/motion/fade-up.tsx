"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  start?: string;
  children: ReactNode;
};

export function FadeUp({
  as,
  className,
  delay = 0,
  duration = 0.9,
  y = 24,
  start = "top 85%",
  children,
}: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { opacity: 0, y });
      const t = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration, delay, ease: "editorial" });
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
