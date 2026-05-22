"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  to: number;
  /** Optional formatter (e.g. for thousands separators). */
  format?: (n: number) => string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
};

export function CountUp({
  to,
  format,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const state = { v: 0 };
      const render = () => {
        const n = decimals
          ? state.v.toFixed(decimals)
          : Math.round(state.v).toString();
        el.textContent = `${prefix}${format ? format(Number(n)) : n}${suffix}`;
      };
      render();

      const t = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(state, {
            v: to,
            duration,
            ease: "editorial",
            onUpdate: render,
          });
        },
      });
      return () => t.kill();
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [to] }
  );

  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>;
}
