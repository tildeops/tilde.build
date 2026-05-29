"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { processSteps } from "@/lib/content";

const N = processSteps.length;
// Angular spacing between markers around the full circle.
const STEP_ANGLE = 360 / N;
// Per-transition timeline beats. Each scroll step = ease rotation → short dwell.
const TRANSITION_DUR = 1;
const DWELL_DUR = 0.2;

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = pinRef.current;
      if (!pin) return;

      const disk = pin.querySelector<HTMLElement>("[data-arc-disk]");
      const markers = Array.from(
        pin.querySelectorAll<HTMLElement>("[data-arc-marker]")
      );
      const texts = Array.from(
        pin.querySelectorAll<HTMLElement>("[data-arc-text]")
      );

      if (!disk) return;

      // Shared state driven by the timeline. Disk rotates negative (CCW) to
      // bring step i to top; each marker counter-rotates so its content
      // stays upright relative to the viewport.
      const state = { rotation: 0 };

      const update = () => {
        gsap.set(disk, { rotation: state.rotation });
        gsap.set(markers, { rotation: -state.rotation });

        // Active step is implied by current rotation: 0 → step 0, -72 → 1, …
        const activeFloat = -state.rotation / STEP_ANGLE;
        texts.forEach((el, i) => {
          const dist = Math.abs(i - activeFloat);
          const op = dist >= 0.5 ? 0 : 1 - dist * 2;
          gsap.set(el, {
            opacity: op,
            y: (1 - op) * 12,
            pointerEvents: op > 0.5 ? "auto" : "none",
          });
        });
      };

      update();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${(N - 1) * window.innerHeight}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: update,
      });

      // Initial dwell at step 0.
      tl.to(state, { rotation: 0, duration: DWELL_DUR });
      for (let i = 0; i < N - 1; i++) {
        tl.to(state, {
          rotation: -(i + 1) * STEP_ANGLE,
          duration: TRANSITION_DUR,
          ease: "power2.inOut",
        });
        tl.to(state, {
          rotation: -(i + 1) * STEP_ANGLE,
          duration: DWELL_DUR,
        });
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: pinRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  // Mobile timeline animation (unchanged from prior implementation).
  useGSAP(
    () => {
      const root = mobileRef.current;
      if (!root) return;
      const stepThresholds = processSteps.map((_, idx) =>
        N > 1 ? idx / (N - 1) : 0
      );
      const trackFill = root.querySelector<HTMLElement>("[data-process-fill]");
      const circles = Array.from(
        root.querySelectorAll<HTMLElement>("[data-process-step-filled]")
      );
      const labels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-process-label]")
      );

      if (trackFill) gsap.set(trackFill, { scaleY: 0 });
      gsap.set(circles, { opacity: 0 });
      gsap.set(labels, { opacity: 0, y: 14 });

      const activated = new Array(N).fill(false);

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 75%",
        end: "bottom 35%",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (trackFill) gsap.set(trackFill, { scaleY: progress });

          circles.forEach((circle, i) => {
            const t = stepThresholds[i] ?? 0;
            const start = Math.max(0, t - 0.05);
            const end = Math.min(1, t + 0.02);
            const opacity =
              progress <= start
                ? 0
                : progress >= end
                  ? 1
                  : (progress - start) / (end - start);
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
    { scope: mobileRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <SectionFrame id="process">
      {/* Desktop: pinned rotating disk (Webflow technique) */}
      <div
        ref={pinRef}
        className="hidden lg:block relative h-screen w-full overflow-hidden"
      >
        {/* Title — top left */}
        <div className="absolute left-0 top-0 z-20 max-w-[58%] pt-2">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
              <span
                className="size-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
              />
              <span className="text-[12px] font-medium text-ink-muted">
                How we work
              </span>
            </div>
          </FadeUp>
          <RevealLines
            as="h2"
            className="mt-5 font-display font-extrabold leading-none tracking-[-0.035em] text-ink text-[clamp(2rem,4.4vw,3.4rem)]"
          >
            Plan → Design →{" "}
            <span className="italic">Build → Launch.</span>
          </RevealLines>
        </div>

        {/* STEP label — pinned at the top-center, just above where the active marker arrives */}
        <div className="absolute left-1/2 top-[14vh] z-20 -translate-x-1/2">
          <span className="rounded-sm bg-bg-elevated px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] text-ink">
            STEP
          </span>
        </div>

        {/* Vertical drop line — from the active marker down toward the text */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[31vh] z-10 h-[15vh] w-px -translate-x-px bg-ink/15"
        />

        {/* Active step text — crossfades among all steps */}
        <div className="absolute left-1/2 top-[48vh] z-20 -translate-x-1/2 w-[clamp(280px,32vw,420px)] text-center">
          {processSteps.map((s, i) => (
            <div
              key={s.n}
              data-arc-text={i}
              className="absolute inset-x-0 top-0"
            >
              <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.6rem)] font-semibold leading-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-ink-muted">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* The rotating disk. The circle is sized to the viewport width so
            roughly the top half (a dome) sits inside the pinned area. The
            disk rotates with scroll; each marker counter-rotates to stay
            upright. */}
        <div
          data-arc-disk
          className="absolute left-1/2 top-[30vh] -translate-x-1/2 rounded-full border border-ink/15"
          style={{
            width: "100vw",
            height: "100vw",
          }}
          aria-hidden
        >
          {processSteps.map((s, i) => {
            const angle = i * STEP_ANGLE;
            return (
              <div
                key={s.n}
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  // Position marker on the disk edge at `angle` from top,
                  // then counter-rotate so it reads upright initially.
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-50vw) rotate(${-angle}deg)`,
                }}
              >
                <div
                  data-arc-marker
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="inline-flex size-11 items-center justify-center rounded-full border border-rule bg-bg font-mono text-[13px] text-ink">
                    {s.n}
                  </div>
                  <span className="font-mono text-[15px] leading-none text-accent">
                    +
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet: vertical timeline (unchanged) */}
      <div className="lg:hidden">
        <div className="text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
              <span
                className="size-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
              />
              <span className="text-[12px] font-medium text-ink-muted">
                How we work
              </span>
            </div>
          </FadeUp>
          <RevealLines
            as="h2"
            className="mx-auto mt-5 max-w-3xl font-display font-extrabold leading-none tracking-[-0.035em] text-ink text-[clamp(2rem,4.6vw,3.4rem)]"
          >
            From brief to{" "}
            <span className="italic">launch in 3–6 weeks.</span>
          </RevealLines>
        </div>

        <div ref={mobileRef} className="mt-16 -mx-2 sm:-mx-4">
          <ol className="space-y-8 relative pl-12">
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
                <span className="absolute -left-9 top-0 inline-block">
                  <ProcessCircle n={s.n} stepIndex={i} />
                </span>
                <Eyebrow
                  {...({
                    "data-process-label": "",
                    "data-step": String(i),
                  } as object)}
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
