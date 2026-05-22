"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export function Scribble({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 0,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.8,
        ease: "power2.inOut",
        delay: 0.3,
      });
    },
    { dependencies: [] }
  );

  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      aria-hidden
      className={cn("w-full", className)}
    >
      <path
        ref={pathRef}
        d="M 4 40 C 60 4, 120 76, 180 40 S 300 4, 360 40 S 480 76, 540 40 L 596 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScribbleStatic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      aria-hidden
      className={cn("w-full", className)}
    >
      <path
        d="M 4 40 C 60 4, 120 76, 180 40 S 300 4, 360 40 S 480 76, 540 40 L 596 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
