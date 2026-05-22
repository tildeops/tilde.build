"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  /** Element whose scroll progress drives the fill. */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** ScrollTrigger start/end strings. */
  start?: string;
  end?: string;
  className?: string;
  fillClassName?: string;
  /** "x" for horizontal, "y" for vertical. */
  axis?: "x" | "y";
  style?: CSSProperties;
};

export function ScrollProgress({
  triggerRef,
  start = "top 75%",
  end = "bottom 65%",
  className,
  fillClassName,
  axis = "x",
  style,
}: Props) {
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const trigger = triggerRef.current;
      const fill = fillRef.current;
      if (!trigger || !fill) return;

      const prop = axis === "x" ? "scaleX" : "scaleY";
      gsap.set(fill, { [prop]: 0, transformOrigin: axis === "x" ? "left center" : "top center" });

      const st = ScrollTrigger.create({
        trigger,
        start,
        end,
        scrub: true,
        onUpdate: (self) => {
          gsap.set(fill, { [prop]: self.progress });
        },
      });
      return () => st.kill();
    },
    { dependencies: [axis, start, end] }
  );

  return (
    <span aria-hidden className={className} style={style}>
      <span ref={fillRef} className={fillClassName} />
    </span>
  );
}
