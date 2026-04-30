"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { site } from "@/content/site";

const StaticGradientBackground = dynamic(
  () => import("@/components/StaticGradientBackground"),
  { ssr: false }
);

export function PainPoints() {
  const p = site.painPoints;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value with a spring for a less jittery reveal.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const N = p.cases.length;

  return (
    <section id="pain" className="relative bg-bg p-2 sm:p-3 lg:p-4">
      <div
        ref={wrapperRef}
        style={{ height: `${N * 140}vh` }}
        className="relative"
      >
        <div className="sticky top-2 flex h-[calc(100svh-1rem)] w-full flex-col gap-2 sm:top-3 sm:h-[calc(100svh-1.5rem)] sm:gap-3 md:flex-row lg:top-4 lg:h-[calc(100svh-2rem)] lg:gap-4">
          {/* LEFT — rounded card with static hero shader + sticky digit */}
          <div className="relative h-[40svh] w-full overflow-hidden rounded-[20px] ring-1 ring-white/[0.06] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.04)] md:h-full md:w-[44%] md:shrink-0 md:rounded-[24px] lg:rounded-[28px]">
            {/* Static frame of the hero gradient shader */}
            <div className="absolute inset-0 z-0">
              <StaticGradientBackground seed={7.4} />
            </div>

            {/* Grain — same as hero, ties this panel to the brand */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/></svg>\")",
              }}
            />

            {/* Soft glass wash — softens the shader and lifts the digit */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0.32) 100%)",
              }}
            />

            {/* Inner edge highlight — specular rim to match the hero card */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[3] rounded-[20px] md:rounded-[24px] lg:rounded-[28px]"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.50)",
              }}
            />

            {/* Eyebrow — top-left */}
            <div className="absolute left-5 top-5 z-10 sm:left-7 sm:top-7 lg:left-9 lg:top-9">
              <Pill className="bg-black/35 text-white/90 ring-1 ring-white/10 backdrop-blur-sm">
                {p.eyebrow}
              </Pill>
            </div>

            {/* Big cross-fading digit */}
            <div className="absolute inset-0 z-10">
              {p.cases.map((_, i) => (
                <Digit key={i} index={i} total={N} progress={smooth} />
              ))}
            </div>

            {/* Bottom-left — count */}
            <div className="absolute bottom-5 left-5 z-10 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/70 sm:bottom-7 sm:left-7 lg:bottom-9 lg:left-9">
              <CountIndicator progress={smooth} total={N} />
            </div>

            {/* Bottom-right — sub-label */}
            <div className="absolute bottom-5 right-5 z-10 hidden font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/55 md:block sm:bottom-7 sm:right-7 lg:bottom-9 lg:right-9">
              friction · drift · drag
            </div>
          </div>

          {/* RIGHT — dark text panel, scrolling reveal */}
          <div className="relative flex-1 overflow-hidden">
            <div className="relative flex h-full items-center px-3 py-8 sm:px-6 lg:px-12">
              <div className="relative w-full max-w-[760px]">
                {p.cases.map((c, i) => (
                  <Case
                    key={i}
                    index={i}
                    total={N}
                    lead={c.lead}
                    tail={c.tail}
                    progress={smooth}
                  />
                ))}
              </div>
            </div>

            {/* Tiny scroll cue */}
            <div className="absolute bottom-3 right-3 z-10 hidden font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/40 sm:block sm:bottom-5 sm:right-5 lg:bottom-7 lg:right-7">
              scroll ↓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Digit({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / total;
  const fadeWidth = slice * 0.12;

  const a = index * slice;
  const b = a + fadeWidth;
  const d = (index + 1) * slice;
  const c = d - fadeWidth;

  const startVal = index === 0 ? 1 : 0;
  const endVal = index === total - 1 ? 1 : 0;

  const opacity = useTransform(
    progress,
    [a, b, c, d],
    [startVal, 1, 1, endVal]
  );
  // Subtle vertical drift on swap so digits glide rather than blink.
  const y = useTransform(progress, [a, b, c, d], [36, 0, 0, -36]);

  const digit = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <span
        className="select-none font-display italic font-medium leading-none tracking-[-0.04em] text-white"
        style={{
          fontSize: "clamp(140px, 22vw, 360px)",
          textShadow: "0 18px 60px rgba(0,0,0,0.55)",
        }}
      >
        {digit}
      </span>
    </motion.div>
  );
}

function Case({
  index,
  total,
  lead,
  tail,
  progress,
}: {
  index: number;
  total: number;
  lead: string;
  tail: string;
  progress: MotionValue<number>;
}) {
  const slice = 1 / total;
  const fadeWidth = slice * 0.1;

  const a = index * slice;
  const b = a + fadeWidth;
  const d = (index + 1) * slice;
  const c = d - fadeWidth;

  const startVal = index === 0 ? 1 : 0;
  const endVal = index === total - 1 ? 1 : 0;

  const containerOpacity = useTransform(
    progress,
    [a, b, c, d],
    [startVal, 1, 1, endVal]
  );
  const localProgress = useTransform(progress, [b, c], [0, 1]);

  const leadChars = lead.split("");
  const tailChars = tail.split("");
  const totalChars = leadChars.length + tailChars.length;

  return (
    <motion.div
      style={{ opacity: containerOpacity }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <p className="font-display text-[28px] leading-[1.12] tracking-[-0.005em] text-white sm:text-[40px] lg:text-[52px]">
        {leadChars.map((ch, i) => (
          <Char
            key={`l-${i}`}
            ch={ch}
            index={i}
            total={totalChars}
            progress={localProgress}
          />
        ))}
      </p>
      <p className="mt-4 font-display italic text-[18px] leading-[1.35] text-white/45 sm:mt-5 sm:text-[22px] lg:mt-6 lg:text-[26px]">
        {tailChars.map((ch, i) => (
          <Char
            key={`t-${i}`}
            ch={ch}
            index={i + leadChars.length}
            total={totalChars}
            progress={localProgress}
            to={0.55}
            dim={0.1}
          />
        ))}
      </p>
    </motion.div>
  );
}

function Char({
  ch,
  index,
  total,
  progress,
  to = 1,
  dim = 0.18,
}: {
  ch: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  to?: number;
  dim?: number;
}) {
  const start = Math.max(0, (index - 2) / total);
  const end = Math.min(1, (index + 2) / total);
  const opacity = useTransform(progress, [start, end], [dim, to]);

  if (ch === " ") return <> </>;
  return <motion.span style={{ opacity }}>{ch}</motion.span>;
}

function CountIndicator({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const current = useTransform(progress, (v) =>
    String(Math.min(total, Math.floor(v * total) + 1)).padStart(2, "0")
  );
  return (
    <div className="flex items-center gap-3">
      <motion.span>{current}</motion.span>
      <span className="h-px w-10 bg-white/30" />
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}
