"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Lock, Gauge, CreditCard, type LucideIcon } from "lucide-react";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { RevealLines } from "@/components/motion/reveal-lines";
import { painPoints } from "@/lib/content";

const icons: Record<string, LucideIcon> = { Box, Lock, Gauge, CreditCard };

export function PainPoints() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-pain-card]"));
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 28, rotate: 0.4 });
      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.95,
            ease: "editorial",
            stagger: 0.11,
          });
        },
      });

      // Icon micro-bounce on hover
      const cleanups: Array<() => void> = [];
      cards.forEach((card) => {
        const icon = card.querySelector<HTMLElement>("[data-pain-icon]");
        if (!icon) return;
        const onEnter = () =>
          gsap.fromTo(
            icon,
            { scale: 1 },
            {
              scale: 1.12,
              duration: 0.18,
              ease: "power3.out",
              yoyo: true,
              repeat: 1,
            }
          );
        card.addEventListener("pointerenter", onEnter);
        cleanups.push(() => card.removeEventListener("pointerenter", onEnter));
      });

      return () => {
        st.kill();
        cleanups.forEach((c) => c());
      };
    },
    { scope: gridRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <SectionFrame id="pain">
      <div className="text-center">
        <Eyebrow shimmer>~ The reasons brands come to us</Eyebrow>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-medium leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.6vw,3.5rem)]"
        >
          Sound familiar?
        </RevealLines>
      </div>

      <div
        ref={gridRef}
        className="mt-14 grid gap-px bg-rule md:grid-cols-2 border border-rule rounded-2xl overflow-hidden"
      >
        {painPoints.map((p) => {
          const Icon = icons[p.icon] ?? Box;
          return (
            <div
              key={p.title}
              data-pain-card
              className="group relative bg-bg p-8 md:p-10 flex flex-col gap-4 transition-colors duration-300 ease-out hover:bg-bg-elevated/60"
            >
              <span
                data-pain-icon
                className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent"
              >
                <Icon className="size-5" />
              </span>
              <h3 className="font-display text-xl md:text-2xl leading-snug transition-colors duration-300 group-hover:text-accent">
                {p.title}
              </h3>
              <p className="text-sm md:text-base text-ink-muted leading-relaxed">
                {p.body}
              </p>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              />
            </div>
          );
        })}
      </div>
    </SectionFrame>
  );
}
