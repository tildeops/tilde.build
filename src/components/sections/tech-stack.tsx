"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { RevealLines } from "@/components/motion/reveal-lines";
import { techStack } from "@/lib/content";

export function TechStack() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const tiles = Array.from(grid.querySelectorAll<HTMLElement>("[data-tile]"));
      if (!tiles.length) return;

      gsap.set(tiles, { opacity: 0, y: 18 });
      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "editorial",
            stagger: { grid: "auto", from: "start", amount: 0.55 },
          });
        },
      });

      // Per-tile hover
      const cleanups: Array<() => void> = [];
      tiles.forEach((tile) => {
        const icon = tile.querySelector<HTMLElement>("[data-tile-icon]");
        if (!icon) return;
        const onEnter = () => {
          gsap.to(icon, {
            scale: 1.1,
            rotate: 3,
            duration: 0.35,
            ease: "power3.out",
          });
        };
        const onLeave = () => {
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        };
        tile.addEventListener("pointerenter", onEnter);
        tile.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          tile.removeEventListener("pointerenter", onEnter);
          tile.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => {
        st.kill();
        cleanups.forEach((c) => c());
      };
    },
    { scope: gridRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <SectionFrame>
      <div className="text-center">
        <Eyebrow shimmer>~ The stack we build on</Eyebrow>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-medium leading-[1.05] tracking-[-0.02em] text-[clamp(1.75rem,4vw,3rem)]"
        >
          Built on tools{" "}
          <span className="italic text-ink-muted">you already trust.</span>
        </RevealLines>
      </div>

      <div
        ref={gridRef}
        className="mt-14 grid grid-cols-2 sm:grid-cols-5 gap-px bg-rule border border-rule rounded-2xl overflow-hidden"
      >
        {techStack.map((t) => (
          <div
            key={t.name}
            data-tile
            className="bg-bg p-6 flex flex-col items-center justify-center gap-3 text-center min-h-[120px] group hover:bg-bg-elevated/60 transition-colors"
          >
            <div
              data-tile-icon
              className="size-12 rounded-full bg-bg-elevated border border-rule flex items-center justify-center font-display text-lg font-medium text-ink-muted group-hover:text-accent group-hover:border-accent/40 transition-colors"
            >
              {t.initials}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
              {t.name}
            </p>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
