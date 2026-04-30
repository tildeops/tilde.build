"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroBackgroundClient } from "@/components/HeroBackgroundClient";
import { site } from "@/content/site";

type Item = (typeof site.offerings.items)[number];

const SPRING = { stiffness: 140, damping: 28, mass: 0.55 } as const;
const ACTIVE_VW = 40;
const COLLAPSED_VW = 8; // wide enough that the 56px ornament + side margins fit
const CTA_VW = 100;
const NAVBAR_OFFSET = 88; // px — clears the floating nav chip

// Per-card top-spotlight tints. Desaturated, very low alpha — atmospheric, not
// graphic. Each card gets a distinct hue so the four reads as a quartet.
const VARIANT_GLOWS = [
  "rgba(59, 130, 246, 0.13)",  // 0 — cool blue
  "rgba(139, 92, 246, 0.10)",  // 1 — violet
  "rgba(217, 119, 87, 0.09)",  // 2 — warm ember
  "rgba(45, 212, 191, 0.08)",  // 3 — pale teal
] as const;

const PILL_CLASS =
  "inline-flex items-center rounded-full border border-white/[0.10] " +
  "bg-gradient-to-b from-white/[0.09] to-white/[0.025] backdrop-blur-md " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_1px_2px_rgba(0,0,0,0.35)] " +
  "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg/85 " +
  "whitespace-nowrap transition-colors duration-300 " +
  "hover:from-white/[0.13] hover:to-white/[0.04] hover:text-fg/95";

const SECTION_MESH =
  "radial-gradient(70% 55% at 8% 12%, rgba(11,42,107,0.28) 0%, transparent 55%)," +
  "radial-gradient(55% 45% at 92% 95%, rgba(120,82,170,0.10) 0%, transparent 60%)," +
  "radial-gradient(40% 60% at 50% 110%, rgba(217,119,87,0.06) 0%, transparent 70%)";

export function Offerings() {
  const o = site.offerings;
  const items = o.items;
  const N = items.length;
  const stages = N;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* Desktop: pinned column-collapse. Slightly shorter than v2 so the
          section doesn't overstay its welcome. */}
      <section
        ref={ref}
        id="offerings"
        className="relative hidden lg:block"
        style={{ height: `${stages * 100 + 50}vh` /* 450vh @ N=4 */ }}
      >
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-bg">
          {/* Premium gradient mesh — atmospheric depth, not saturated color. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: SECTION_MESH }}
          />
          <div
            aria-hidden
            className="noise pointer-events-none absolute inset-0 -z-10"
          />

          <div aria-hidden className="shrink-0" style={{ height: NAVBAR_OFFSET }} />

          <SectionHeader eyebrow={o.eyebrow} count={N} />

          <div
            className="flex min-h-0 flex-1 flex-row"
            style={{ width: "max-content" }}
          >
            {items.map((item, i) => (
              <ServiceColumn
                key={item.id}
                item={item}
                index={i}
                total={N}
                progress={scrollYProgress}
                stages={stages}
              />
            ))}
            <CTAColumn cta={o.cta} progress={scrollYProgress} stages={stages} />
          </div>
        </div>
      </section>

      {/* Mobile fallback */}
      <section id="offerings-mobile" className="relative overflow-hidden bg-bg lg:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: SECTION_MESH }}
        />
        <div
          aria-hidden
          className="noise pointer-events-none absolute inset-0 -z-10"
        />
        <div className="border-t border-divider/[0.06]">
          {items.map((item, i) => (
            <MobileCard key={item.id} item={item} index={i} total={N} />
          ))}
          <MobileCTA cta={o.cta} />
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header — editorial, hero-like                                       */
/* -------------------------------------------------------------------------- */

function SectionHeader({ eyebrow, count }: { eyebrow: string; count: number }) {
  return (
    <header className="relative shrink-0 px-8 py-10 lg:px-12 lg:py-14">
      {/* Mask-faded hairlines — gradient borders that breathe instead of
          slicing the section in two. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      {/* Editorial horizon glow behind the headline — no text tint, just
          ambient color sitting underneath. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 100% at 12% 70%, rgba(59,130,246,0.08), transparent 60%)",
        }}
      />

      {/* Top meta row: eyebrow on the left, counter on the right. */}
      <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-fg/40">
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className="block h-px w-10 bg-divider/[0.18]"
          />
          {eyebrow}
        </span>
        <span className="flex items-center gap-3">
          <span className="text-fg/65">{String(count).padStart(2, "0")}</span>
          <span className="text-fg/25">/</span>
          <span>services</span>
          <span
            aria-hidden
            className="block h-px w-10 bg-divider/[0.18]"
          />
        </span>
      </div>

      {/* Headline: editorial, italic accent. Cormorant's italic is the
          highlight here — same display family used throughout the site. */}
      <h2 className="relative mt-7 font-display text-[clamp(40px,4.6vw,72px)] font-normal leading-[0.96] tracking-[-0.022em] text-fg/95">
        Four things we do,{" "}
        <span className="italic text-fg/75">well.</span>
      </h2>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop service column with collapse-to-ornament                            */
/* -------------------------------------------------------------------------- */

function ServiceColumn({
  item,
  index,
  total,
  progress,
  stages,
}: {
  item: Item;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stages: number;
}) {
  const collapseStart = index / stages;
  const collapseEnd = (index + 1) / stages;

  const widthRaw = useTransform(
    progress,
    [collapseStart, collapseEnd],
    [ACTIVE_VW, COLLAPSED_VW],
  );
  const widthSpring = useSpring(widthRaw, SPRING);
  const width = useTransform(widthSpring, (v) => `${v}vw`);

  const contentOpacity = useTransform(
    progress,
    [collapseStart, collapseStart + (collapseEnd - collapseStart) * 0.5],
    [1, 0],
  );

  const glow = VARIANT_GLOWS[index % VARIANT_GLOWS.length];

  return (
    <motion.article
      style={{ width }}
      className="relative flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-r border-divider/[0.06] will-change-[width]"
    >
      {/* Per-card top spotlight — distinct hue per index, fades with collapse. */}
      <motion.div
        aria-hidden
        style={{
          opacity: contentOpacity,
          background: `radial-gradient(120% 70% at 50% -10%, ${glow}, transparent 65%)`,
        }}
        className="pointer-events-none absolute inset-0"
      />
      {/* Lit top edge — 1px linear that hints at the spotlight above. */}
      <motion.span
        aria-hidden
        style={{ opacity: contentOpacity }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {/* Ornament strip — independent padding so the dot grid stays visible
          even after the column collapses. */}
      <div className="relative flex shrink-0 items-start justify-between px-4 pt-7 lg:px-5 lg:pt-9">
        <Ornament variant={index} size={56} />
        <motion.div
          style={{ opacity: contentOpacity }}
          className="font-mono text-[10px] tracking-widest text-fg/40 whitespace-nowrap"
        >
          <span className="text-fg/70">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-fg/30">/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </motion.div>
      </div>

      {/* Tag */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mt-4 px-7 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45 whitespace-nowrap lg:px-9"
      >
        {item.tag}
      </motion.div>

      {/* Title */}
      <motion.h3
        style={{ opacity: contentOpacity }}
        className="relative mt-3 px-7 font-display text-[clamp(30px,2.8vw,48px)] font-normal leading-[0.98] tracking-[-0.02em] whitespace-nowrap lg:px-9"
      >
        {item.title}
      </motion.h3>

      {/* Pills */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mt-5 flex flex-wrap gap-2 px-7 lg:px-9"
      >
        {item.pills.slice(0, 4).map((p) => (
          <span key={p} className={PILL_CLASS}>
            {p}
          </span>
        ))}
      </motion.div>

      {/* Bottom: image + description side-by-side. items-stretch + a capped
          image height keeps the right column's text inside the viewport on
          short laptop heights (~720px). */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mt-auto grid grid-cols-[1.1fr_1fr] items-stretch gap-5 px-7 pb-7 pt-3 lg:px-9"
      >
        <div className="relative aspect-[4/3] max-h-[36vh] overflow-hidden rounded-xl bg-divider/[0.04] ring-1 ring-divider/[0.08]">
          <Image
            src={item.media}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-end gap-3">
          <p className="line-clamp-3 text-[14px] leading-relaxed text-fg/70">
            {item.pitch}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">
            Best for{" "}
            <span className="normal-case tracking-normal text-fg/65">
              · {item.bestFor}
            </span>
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA column with WebGL gradient                                              */
/* -------------------------------------------------------------------------- */

function CTAColumn({
  cta,
  progress,
  stages,
}: {
  cta: typeof site.offerings.cta;
  progress: MotionValue<number>;
  stages: number;
}) {
  const opacity = useTransform(
    progress,
    [(stages - 1) / stages - 0.05, 1],
    [0, 1],
  );

  return (
    <motion.article
      style={{ width: `${CTA_VW}vw` }}
      className="relative flex h-full shrink-0 flex-col items-start justify-center overflow-hidden text-white"
    >
      <div className="absolute inset-0 z-0">
        <HeroBackgroundClient />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-2xl px-12 lg:px-20"
      >
        <p className="font-display text-[44px] font-normal italic leading-none tracking-[-0.01em] text-white/85 sm:text-[64px] lg:text-[80px]">
          {cta.kicker}
        </p>
        <h3 className="mt-3 font-display text-[64px] font-normal leading-[0.96] tracking-[-0.02em] sm:text-[88px] lg:text-[112px]">
          {cta.headline}
        </h3>
        <p className="mt-8 max-w-md text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
          {cta.sub}
        </p>
        <div className="mt-10">
          <Button href={cta.primary.href} variant="primary" arrow>
            {cta.primary.label}
          </Button>
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/></svg>\")",
        }}
      />
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile cards                                                                */
/* -------------------------------------------------------------------------- */

function MobileCard({
  item,
  index,
  total,
}: {
  item: Item;
  index: number;
  total: number;
}) {
  const glow = VARIANT_GLOWS[index % VARIANT_GLOWS.length];

  return (
    <article className="relative overflow-hidden border-b border-divider/[0.06] px-6 py-16 sm:px-8">
      {/* Per-card spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(110% 60% at 50% -10%, ${glow}, transparent 65%)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="relative flex items-start justify-between">
        <Ornament variant={index} size={56} />
        <div className="font-mono text-[10px] tracking-widest text-fg/40">
          <span className="text-fg/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 text-fg/30">/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="relative mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45">
        {item.tag}
      </div>
      <h3 className="relative mt-4 font-display text-[44px] font-normal leading-[0.98] tracking-[-0.02em] sm:text-[56px]">
        {item.title}
      </h3>
      <div className="relative mt-8 flex flex-wrap gap-2">
        {item.pills.map((p) => (
          <span key={p} className={PILL_CLASS}>
            {p}
          </span>
        ))}
      </div>
      <div className="relative mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-divider/[0.04] ring-1 ring-divider/[0.08]">
          <Image
            src={item.media}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-end gap-3">
          <p className="text-[15px] leading-relaxed text-fg/70">{item.pitch}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg/45">
            Best for{" "}
            <span className="normal-case tracking-normal text-fg/65">
              · {item.bestFor}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}

function MobileCTA({ cta }: { cta: typeof site.offerings.cta }) {
  return (
    <article
      className="px-6 py-20 text-center text-white sm:px-8"
      style={{
        background:
          "radial-gradient(120% 80% at 70% 20%, #4a1a8e 0%, #2a0e54 45%, #140843 100%)",
      }}
    >
      <p className="font-display text-[36px] font-normal italic leading-none tracking-[-0.01em] text-white/85 sm:text-[44px]">
        {cta.kicker}
      </p>
      <h3 className="mt-3 font-display text-[56px] font-normal leading-[0.96] tracking-[-0.02em] sm:text-[72px]">
        {cta.headline}
      </h3>
      <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-white/75">
        {cta.sub}
      </p>
      <div className="mt-10">
        <Button href={cta.primary.href} variant="primary" arrow>
          {cta.primary.label}
        </Button>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Ornament — animated dot matrix. Each circle twinkles with a delay based    */
/* on its distance from the center, producing a soft radial pulse.            */
/* -------------------------------------------------------------------------- */

function Ornament({ variant, size = 80 }: { variant: number; size?: number }) {
  const grid = 8;
  const step = 100 / (grid + 1);
  const center = (grid + 1) / 2;

  type Cell = {
    cx: number;
    cy: number;
    on: boolean;
    dist: number;
  };
  const cells: Cell[] = [];

  const v = variant % 4;

  for (let y = 1; y <= grid; y++) {
    for (let x = 1; x <= grid; x++) {
      const cx = x * step;
      const cy = y * step;
      const dx = x - center; // ∈ {-3.5, -2.5, ..., 3.5}
      const dy = y - center;
      const dist = Math.hypot(dx, dy);

      let on = false;
      switch (v) {
        case 0: {
          // Plus — orthogonal cross through center.
          on = (Math.abs(dx) < 0.6 || Math.abs(dy) < 0.6) && dist <= 3.6;
          break;
        }
        case 1: {
          // Circle — single ring.
          on = dist > 2.0 && dist < 3.3;
          break;
        }
        case 2: {
          // Square — perimeter outline (outermost ring of cells, m === 3.5).
          const m = Math.max(Math.abs(dx), Math.abs(dy));
          on = m > 3.0;
          break;
        }
        case 3: {
          // Triangle — apex up. localY: 0 at apex row, ~5 at base.
          const localY = dy + 2.5;
          const halfWidth = localY * 0.55;
          const onLeft =
            Math.abs(dx + halfWidth) < 0.55 && localY >= 0 && localY <= 5;
          const onRight =
            Math.abs(dx - halfWidth) < 0.55 && localY >= 0 && localY <= 5;
          const onBase =
            Math.abs(localY - 5) < 0.6 && Math.abs(dx) < halfWidth + 0.4;
          on = onLeft || onRight || onBase;
          break;
        }
      }
      cells.push({ cx, cy, on, dist });
    }
  }

  // Determine ornament's max radius for delay normalization
  const maxDist = Math.hypot(center - 1, center - 1);

  const baseR = size <= 56 ? 1.2 : 1.6;
  const dimR = size <= 56 ? 0.5 : 0.7;

  // Per-variant motion: circle and triangle slowly rotate, plus and square
  // gently wobble. Tuned durations keep the four reading as a quartet.
  const motionClass =
    v === 1 || v === 3 ? "ornament-spin" : "ornament-drift";
  const animationDuration =
    v === 1 ? "32s" : v === 3 ? "44s" : v === 2 ? "11s" : "7s";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`text-fg/55 shrink-0 ${motionClass}`}
      style={{ animationDuration }}
      aria-hidden
    >
      {cells.map((c, i) => {
        const isOn = c.on;
        // Stagger delay so the pulse ripples outward from center.
        const delay = (c.dist / maxDist) * 1.4; // seconds, 0 → 1.4
        const dotMin = isOn ? 0.85 : 0.1;
        const dotMax = isOn ? 1 : 0.5;
        return (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={isOn ? baseR : dimR}
            fill="currentColor"
            className="dot-twinkle"
            style={
              {
                animationDelay: `${delay.toFixed(2)}s`,
                ["--dot-min" as string]: String(dotMin),
                ["--dot-max" as string]: String(dotMax),
              } as React.CSSProperties
            }
          />
        );
      })}
    </svg>
  );
}
