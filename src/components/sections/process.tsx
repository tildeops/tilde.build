"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { RevealLines } from "@/components/motion/reveal-lines";
import { processSteps } from "@/lib/content";

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = timelineRef.current;
      if (!root) return;
      const totalSteps = processSteps.length;
      const stepThresholds = processSteps.map((_, idx) =>
        totalSteps > 1 ? idx / (totalSteps - 1) : 0
      );

      const trackFills = Array.from(
        root.querySelectorAll<HTMLElement>("[data-process-fill]")
      );
      const stepCircles = Array.from(
        root.querySelectorAll<HTMLElement>("[data-process-step-filled]")
      );
      const stepLabels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-process-label]")
      );

      if (!trackFills.length || !stepCircles.length) return;

      if (trackFills.length) gsap.set(trackFills, { scaleX: 0, scaleY: 0 });
      if (stepCircles.length) gsap.set(stepCircles, { opacity: 0 });
      if (stepLabels.length) gsap.set(stepLabels, { opacity: 0, y: 14 });

      // Track when each step has been "first activated" so we play the entrance once
      const activated = new Array(totalSteps).fill(false);

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 75%",
        end: "bottom 35%",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          // Track fills — both desktop (scaleX) and mobile (scaleY) move together
          trackFills.forEach((fill) => {
            const axis = fill.dataset.processFill === "y" ? "scaleY" : "scaleX";
            gsap.set(fill, { [axis]: progress });
          });

          // Step circles + labels
          stepCircles.forEach((circle, i) => {
            const t = stepThresholds[i] ?? 0;
            // Smooth fill-in from threshold-0.05 to threshold+0.02
            const start = Math.max(0, t - 0.05);
            const end = Math.min(1, t + 0.02);
            const opacity =
              progress <= start ? 0 : progress >= end ? 1 : (progress - start) / (end - start);
            gsap.set(circle, { opacity });

            if (!activated[i] && progress >= t - 0.04) {
              activated[i] = true;
              const labelsForStep = Array.from(
                root.querySelectorAll<HTMLElement>(
                  `[data-process-label][data-step="${i}"]`
                )
              );
              if (labelsForStep.length) {
                gsap.to(labelsForStep, {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "editorial",
                  stagger: 0.06,
                });
              }
            }
          });
        },
      });

      return () => st.kill();
    },
    { scope: timelineRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <SectionFrame id="process">
      <div className="text-center">
        <Eyebrow shimmer>~ How we work</Eyebrow>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-medium leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.6vw,3.5rem)]"
        >
          From brief to{" "}
          <span className="italic text-ink-muted">launch in 3–4 weeks.</span>
        </RevealLines>
      </div>

      <div ref={timelineRef} className="mt-16 -mx-2 sm:-mx-4 lg:-mx-8 xl:-mx-12">
        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Track (unfilled) */}
          <div
            className="absolute top-5 left-[10%] right-[10%] h-px bg-rule"
            aria-hidden
          />
          {/* Track (filled, scroll-bound) */}
          <span
            data-process-fill="x"
            aria-hidden
            className="absolute top-5 left-[10%] right-[10%] h-px bg-accent origin-left block"
          />

          {/* Circles row */}
          <ol className="relative flex">
            {processSteps.map((s, i) => (
              <li key={s.n} className="flex-1 flex justify-center">
                <ProcessCircle n={s.n} stepIndex={i} />
              </li>
            ))}
          </ol>

          {/* Text row */}
          <div className="mt-6 flex">
            {processSteps.map((s, i) => (
              <div key={s.n} className="flex-1 px-4 xl:px-6 text-center">
                <Eyebrow
                  className="text-[10.5px] tracking-[0.2em]"
                  {...{ "data-process-label": "", "data-step": String(i) } as object}
                >
                  {s.eyebrow}
                </Eyebrow>
                <h3
                  data-process-label
                  data-step={i}
                  className="mt-2 font-display text-xl leading-tight"
                >
                  {s.title}
                </h3>
                <p
                  data-process-label
                  data-step={i}
                  className="mt-2 text-[13px] leading-[1.55] text-ink-muted"
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <ol className="lg:hidden space-y-8 relative pl-12">
          <div
            className="absolute left-5 top-2 bottom-2 w-px bg-rule"
            aria-hidden
          />
          <span
            data-process-fill="y"
            aria-hidden
            className="absolute left-5 top-2 bottom-2 w-px bg-accent origin-top block"
          />

          {processSteps.map((s, i) => (
            <li key={s.n} className="relative">
              <span className="absolute left-[-2.25rem] top-0 inline-block">
                <ProcessCircle n={s.n} stepIndex={i} />
              </span>
              <Eyebrow
                {...{ "data-process-label": "", "data-step": String(i) } as object}
              >
                {s.eyebrow}
              </Eyebrow>
              <h3
                data-process-label
                data-step={i}
                className="mt-2 font-display text-2xl leading-tight"
              >
                {s.title}
              </h3>
              <p
                data-process-label
                data-step={i}
                className="mt-2 text-sm text-ink-muted leading-relaxed"
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionFrame>
  );
}

function ProcessCircle({ n, stepIndex }: { n: string; stepIndex: number }) {
  return (
    <div className="relative inline-flex">
      <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full bg-bg border border-rule font-mono text-[12px] text-ink-muted transition-colors">
        {n}
      </span>
      <span
        data-process-step-filled
        data-step={stepIndex}
        aria-hidden
        className="absolute inset-0 z-20 inline-flex size-10 items-center justify-center rounded-full bg-accent border border-accent font-mono text-[12px] text-on-accent gloss-inset shadow-[0_0_0_4px_rgb(var(--accent-rgb)/0.08)]"
      >
        {n}
      </span>
    </div>
  );
}
