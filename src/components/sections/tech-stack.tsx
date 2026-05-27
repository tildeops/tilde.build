"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { techGroups } from "@/lib/content";

export function TechStack() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const tiles = Array.from(
        root.querySelectorAll<HTMLElement>("[data-tile]"),
      );
      if (!tiles.length) return;

      gsap.set(tiles, { opacity: 0, y: 18 });
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "editorial",
            stagger: { grid: "auto", from: "start", amount: 0.6 },
          });
        },
      });

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
    { scope: rootRef as React.RefObject<HTMLElement>, dependencies: [] },
  );

  return (
    <SectionFrame>
      <div className="text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
            <span
              className="size-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
            />
            <span className="text-[12px] font-medium text-ink-muted">
              The stack we ship on
            </span>
          </div>
        </FadeUp>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(1.75rem,4vw,3rem)]"
        >
          Built on tools{" "}
          <span className="italic">you already trust.</span>
        </RevealLines>
      </div>

      <div ref={rootRef} className="mt-14 space-y-8">
        {techGroups.map((group) => (
          <div key={group.label}>
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
              <h3 className="font-display text-[20px] font-extrabold tracking-[-0.02em] text-ink md:text-[22px]">
                {group.label}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                ~ {group.eyebrow}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {group.items.map((t) => (
                <div
                  key={t.name}
                  data-tile
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-rule bg-bg-elevated px-3 py-4 transition-colors hover:border-accent/40 hover:bg-bg-elevated/80"
                >
                  <div
                    data-tile-icon
                    className="flex size-9 items-center justify-center rounded-full border border-rule bg-bg font-display text-[13px] font-bold text-ink-muted transition-colors group-hover:border-accent/40 group-hover:text-accent"
                  >
                    {t.initials}
                  </div>
                  <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                    {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
