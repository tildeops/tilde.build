"use client";

import dynamic from "next/dynamic";
import type { Theme } from "@/lib/theme";

const LiquidCanvas = dynamic(() => import("./liquid-canvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-accent" aria-hidden />,
});

export function LiquidBackground({
  className,
  animated = true,
  seed,
  speed,
  themeOverride,
}: {
  className?: string;
  animated?: boolean;
  seed?: number;
  speed?: number;
  themeOverride?: Theme;
}) {
  return (
    <LiquidCanvas
      animated={animated}
      seed={seed}
      speed={speed}
      themeOverride={themeOverride}
      className={className}
    />
  );
}
