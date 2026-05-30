"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";

type Service = {
  id: string;
  title: string;
  description: string;
  Visual: React.ComponentType;
};

const SERVICES: Service[] = [
  {
    id: "fullstack",
    title: "Full-Stack Engineering",
    description:
      "AI-augmented Next.js + edge backends. Type-safe end to end, shipped weekly.",
    Visual: FullStackVisual,
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    description:
      "React Native and native iOS/Android with shared design language and offline-first sync.",
    Visual: MobileVisual,
  },
  {
    id: "automation",
    title: "Automation Bots",
    description:
      "Agentic workflows that scrape, classify and act — wired into your stack via webhooks.",
    Visual: AutomationVisual,
  },
  {
    id: "ecommerce",
    title: "Headless E-Commerce",
    description:
      "Shopify Hydrogen storefronts with custom checkout, CMS and subsecond product pages.",
    Visual: CommerceVisual,
  },
  {
    id: "design",
    title: "AI-Powered Design",
    description:
      "Brand systems and UI explored at the speed of prompting — still hand-finished by humans.",
    Visual: DesignVisual,
  },
  {
    id: "ai",
    title: "AI Integration",
    description:
      "RAG pipelines, LLM tool-use and inference at the edge — production-grade evals included.",
    Visual: AIVisual,
  },
];

/* Per-card outer-corner rounding — the grid drops `overflow-hidden` so a
   hovered card can scale past the grid edge without being clipped, so each
   card that sits on an outer corner must round itself to keep the resting
   grid crisp. Corners differ by breakpoint (1 / 2 / 3 columns). */
const BENTO_CORNERS = [
  "rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none",
  "md:rounded-tr-2xl lg:rounded-tr-none",
  "lg:rounded-tr-2xl",
  "lg:rounded-bl-2xl",
  "md:rounded-bl-2xl lg:rounded-bl-none",
  "rounded-bl-2xl rounded-br-2xl md:rounded-bl-none",
];

export function ServicesBento() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = Array.from(
        grid.querySelectorAll<HTMLElement>("[data-bento-card]"),
      );
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 28 });
      const st = ScrollTrigger.create({
        trigger: grid,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "editorial",
            stagger: 0.08,
          });
        },
      });

      /* --- Hover: expanding accordion. The hovered cell's column + row
         grow while the rest shrink in-flow (no overlap, no float). Shrunken
         cards collapse to just their title so the smaller boxes stay clean.
         Desktop 3-col layout only; disabled for touch / reduced-motion. --- */
      const cleanups: Array<() => void> = [];
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lgMq = window.matchMedia("(min-width: 1024px)");

      if (canHover && !reduce) {
        const COLS = 3;
        const ROWS = Math.ceil(cards.length / COLS);
        const tracks = { c0: 1, c1: 1, c2: 1, r0: 1, r1: 1 };
        const applyTracks = () => {
          grid.style.gridTemplateColumns = `${tracks.c0}fr ${tracks.c1}fr ${tracks.c2}fr`;
          grid.style.gridTemplateRows = `${tracks.r0}fr ${tracks.r1}fr`;
        };
        // `fill` = the hovered card: its media flex-grows to fill the now-tall
        // cell so the animation scales up with the box, instead of staying a
        // thin h-40 strip that the SVG's slice fit crops down to a sliver.
        const setOpen = (card: HTMLElement, open: boolean, fill = false) => {
          const media = card.querySelector<HTMLElement>("[data-bento-media]");
          const desc = card.querySelector<HTMLElement>("[data-bento-desc]");
          if (media)
            gsap.to(media, {
              flexGrow: fill ? 1 : 0,
              height: open ? 160 : 0, // flex-basis; grows past this when filling
              opacity: open ? 1 : 0,
              marginBottom: open ? 0 : -20, // soak up the flex gap when hidden
              duration: 0.55,
              ease: "power3.out",
              overwrite: "auto",
            });
          if (desc)
            gsap.to(desc, {
              height: open ? "auto" : 0,
              opacity: open ? 1 : 0,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
        };

        let active = -1;
        const expand = (i: number) => {
          if (!lgMq.matches || active === i) return;
          active = i;
          grid.style.height = `${grid.offsetHeight}px`; // pin so rows can size
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const cBig = 1.9;
          const cSmall = (COLS - cBig) / (COLS - 1);
          const rBig = 1.5;
          const rSmall = (ROWS - rBig) / (ROWS - 1);
          gsap.to(tracks, {
            c0: col === 0 ? cBig : cSmall,
            c1: col === 1 ? cBig : cSmall,
            c2: col === 2 ? cBig : cSmall,
            r0: row === 0 ? rBig : rSmall,
            r1: row === 1 ? rBig : rSmall,
            duration: 0.55,
            ease: "power3.out",
            onUpdate: applyTracks,
            overwrite: true,
          });
          cards.forEach((card, idx) => setOpen(card, idx === i, idx === i));
        };

        const reset = () => {
          if (active === -1) return;
          active = -1;
          gsap.to(tracks, {
            c0: 1, c1: 1, c2: 1, r0: 1, r1: 1,
            duration: 0.5,
            ease: "power3.out",
            onUpdate: applyTracks,
            overwrite: true,
            onComplete: () => {
              grid.style.removeProperty("grid-template-columns");
              grid.style.removeProperty("grid-template-rows");
              grid.style.removeProperty("height");
            },
          });
          cards.forEach((card) => setOpen(card, true, false));
        };

        cards.forEach((card, i) => {
          const enter = () => expand(i);
          card.addEventListener("mouseenter", enter);
          cleanups.push(() => card.removeEventListener("mouseenter", enter));
        });
        grid.addEventListener("mouseleave", reset);
        cleanups.push(() => grid.removeEventListener("mouseleave", reset));

        // Bail out cleanly if we drop below the lg breakpoint mid-hover.
        const onBreakpoint = () => {
          if (!lgMq.matches) reset();
        };
        lgMq.addEventListener("change", onBreakpoint);
        cleanups.push(() => lgMq.removeEventListener("change", onBreakpoint));
      }

      return () => {
        st.kill();
        cleanups.forEach((c) => c());
      };
    },
    { scope: gridRef as React.RefObject<HTMLElement>, dependencies: [] },
  );

  return (
    <SectionFrame id="services-bento">
      <div className="text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
            <span
              className="size-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
            />
            <span className="text-[12px] font-medium text-ink-muted">
              What we build
            </span>
          </div>
        </FadeUp>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(2rem,4.6vw,3.4rem)]"
        >
          Six disciplines, <span className="italic">one team.</span>
        </RevealLines>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            Engineering, design and AI under one roof — the full surface area
            of a modern product, without the agency hand-offs.
          </p>
        </FadeUp>
      </div>

      <div
        ref={gridRef}
        className="mt-14 grid gap-px rounded-2xl border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map(({ id, title, description, Visual }, i) => (
          <article
            key={id}
            data-bento-card
            className={`group relative flex flex-col justify-center gap-5 bg-bg p-6 transition-colors duration-300 ease-out hover:bg-bg-elevated/70 md:p-7 ${BENTO_CORNERS[i]}`}
          >
            <div
              data-bento-media
              className="relative h-40 min-h-0 w-full overflow-hidden rounded-xl border border-rule bg-bg-elevated"
            >
              <div data-bento-visual className="absolute inset-0">
                <Visual />
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent-rgb)/0.08),transparent_60%)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent md:text-[1.35rem]">
                {title}
              </h3>
              <p data-bento-desc className="text-[13.5px] leading-relaxed text-ink-muted">
                {description}
              </p>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
            />
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Per-service animated SVG visuals                                    */
/* All visuals fill their parent (absolute inset-0)                    */
/* ------------------------------------------------------------------ */

function GradientDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.95" />
        <stop offset="50%" stopColor="var(--shimmer-mid, #3b82f6)" stopOpacity="0.85" />
        <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.95" />
        <animate
          attributeName="x1"
          values="0%;100%;0%"
          dur="6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x2"
          values="100%;200%;100%"
          dur="6s"
          repeatCount="indefinite"
        />
      </linearGradient>
      <linearGradient id={`grad-soft-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.18" />
        <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.02" />
      </linearGradient>
    </defs>
  );
}

// Gentle slowdown applied to every looping card visual so the bento reads
// calm rather than frantic (1 = original speed; <1 is slower).
const VISUAL_SPEED = 0.8;

function useVisualAnim(ref: React.RefObject<SVGSVGElement | null>, fn: () => void) {
  useGSAP(
    () => {
      if (!ref.current) return;
      // Slow only the animations this visual creates: diff the global
      // timeline's top-level children before/after, then ease back the new
      // ones (timeScale cascades into nested timelines automatically).
      const before = new Set(gsap.globalTimeline.getChildren(false, true, true));
      fn();
      gsap.globalTimeline
        .getChildren(false, true, true)
        .forEach((anim) => {
          if (!before.has(anim)) anim.timeScale(anim.timeScale() * VISUAL_SPEED);
        });
    },
    { scope: ref as React.RefObject<Element>, dependencies: [] },
  );
}

/* 1. Full Stack — isometric stacked layers diorama, subtle ambient motion */
function FullStackVisual() {
  const ref = useRef<SVGSVGElement>(null);
  useVisualAnim(ref, () => {
    const root = ref.current!;

    // Whole stack floats gently (subtle)
    const stack = root.querySelector<SVGElement>("[data-stack]");
    if (stack) {
      gsap.to(stack, {
        y: -3,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Each platform breathes (very subtle, staggered)
    const tops = root.querySelectorAll<SVGElement>("[data-top-face]");
    tops.forEach((t, i) => {
      gsap.to(t, {
        scale: 1.025,
        transformOrigin: "center",
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.5,
      });
    });

    // Energy pulse traveling up the pillar
    const pulse = root.querySelector<SVGElement>("[data-pulse]");
    if (pulse) {
      gsap.fromTo(
        pulse,
        { y: 0, opacity: 0 },
        {
          y: -50,
          opacity: 1,
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
      );
    }

    // React atom rotates slowly
    const react = root.querySelector<SVGElement>("[data-react]");
    if (react) {
      gsap.to(react, {
        rotation: 360,
        transformOrigin: "center",
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    }

    // Side chips bob softly
    const chips = root.querySelectorAll<SVGElement>("[data-chip]");
    chips.forEach((c, i) => {
      gsap.to(c, {
        y: i % 2 === 0 ? -3 : 3,
        duration: 3.2 + i * 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.4,
      });
    });

    // Halo softly pulses
    const halo = root.querySelector<SVGElement>("[data-halo]");
    if (halo) {
      gsap.to(halo, {
        opacity: 0.55,
        scale: 1.06,
        transformOrigin: "50% 50%",
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    /* --- Top card: cursor sweeps in & clicks the button --- */
    const cursor = root.querySelector<SVGElement>("[data-cursor]");
    const button = root.querySelector<SVGElement>("[data-btn]");
    const btnRipple = root.querySelector<SVGElement>("[data-btn-ripple]");
    if (cursor && button) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 0.4 });
      tl.set(cursor, { x: 28, y: -22, opacity: 0, scale: 1 })
        .set(button, { transformOrigin: "center", scale: 1, fill: "rgb(var(--accent-rgb))" })
        .to(cursor, { opacity: 1, duration: 0.25 })
        .to(cursor, { x: 18, y: 4, duration: 1.1, ease: "power2.inOut" })
        // click
        .to(cursor, { scale: 0.85, duration: 0.09, ease: "power2.out" })
        .to(button, { scale: 0.9, duration: 0.09, ease: "power2.out" }, "<")
        .to(cursor, { scale: 1, duration: 0.14, ease: "power2.out" })
        .to(button, { scale: 1, duration: 0.14, ease: "back.out(2)" }, "<");
      if (btnRipple) {
        tl.fromTo(
          btnRipple,
          { opacity: 0.55, scale: 1, transformOrigin: "center" },
          { opacity: 0, scale: 2.2, duration: 0.6, ease: "sine.out" },
          "<",
        );
      }
      tl.to(cursor, { x: 36, y: -22, opacity: 0, duration: 0.8, delay: 0.4 });
    }

    /* --- Top card: caret blink in the address bar --- */
    const caret = root.querySelector<SVGElement>("[data-caret]");
    if (caret) {
      gsap.to(caret, {
        opacity: 0,
        duration: 0.45,
        ease: "steps(1)",
        repeat: -1,
        yoyo: true,
      });
    }

    /* --- Middle card: 200 status badge pops in periodically --- */
    const status = root.querySelector<SVGElement>("[data-status]");
    if (status) {
      gsap.set(status, { opacity: 0, scale: 0.6, transformOrigin: "center" });
      gsap.to(status, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "back.out(2.4)",
        repeat: -1,
        repeatDelay: 3.2,
        yoyo: true,
      });
    }

    /* --- Middle card: response body rows fade in/out sequentially --- */
    const rows = root.querySelectorAll<SVGElement>("[data-row]");
    rows.forEach((r, i) => {
      gsap.fromTo(
        r,
        { opacity: 0.18, scaleX: 0.55, transformOrigin: "left center" },
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.35,
        },
      );
    });

    /* --- Bottom card: heartbeat dot --- */
    const dot = root.querySelector<SVGElement>("[data-dot]");
    if (dot) {
      gsap.to(dot, {
        scale: 1.7,
        transformOrigin: "center",
        duration: 0.55,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    /* --- Bottom card: ping ring expanding from the status dot --- */
    const ping = root.querySelector<SVGElement>("[data-ping]");
    if (ping) {
      gsap.fromTo(
        ping,
        { opacity: 0.6, scale: 0.4, transformOrigin: "center" },
        {
          opacity: 0,
          scale: 2.4,
          duration: 1.4,
          ease: "sine.out",
          repeat: -1,
          repeatDelay: 0.6,
        },
      );
    }

    /* --- Bottom card: DB scan band travels through the cylinder --- */
    const dbScan = root.querySelector<SVGElement>("[data-db-scan]");
    if (dbScan) {
      gsap.fromTo(
        dbScan,
        { y: -4, opacity: 0 },
        {
          y: 4,
          opacity: 1,
          duration: 1.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
      );
    }

    /* --- Bottom card: "+row" write indicator pops in --- */
    const writes = root.querySelectorAll<SVGElement>("[data-write]");
    writes.forEach((w, i) => {
      gsap.fromTo(
        w,
        { opacity: 0, y: 4, transformOrigin: "center" },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(2)",
          repeat: -1,
          repeatDelay: 2.4 + i * 0.6,
          yoyo: true,
          delay: 1 + i * 0.7,
        },
      );
    });

    /* --- Expand / collapse loop: layers fan apart to reveal each card --- */
    const layerTop = root.querySelector<SVGElement>("[data-layer-top]");
    const layerMid = root.querySelector<SVGElement>("[data-layer-mid]");
    const layerBot = root.querySelector<SVGElement>("[data-layer-bot]");
    const beamGroup = root.querySelector<SVGElement>("[data-beam-group]");
    if (layerTop && layerMid && layerBot) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4, delay: 1.6 });
      const expandEase = "power3.inOut";
      // Expand — layers fan apart simultaneously, beam fades out
      tl.to(layerTop, { y: -22, duration: 1.3, ease: expandEase })
        .to(layerMid, { y: -4, duration: 1.3, ease: expandEase }, "<")
        .to(layerBot, { y: 18, duration: 1.3, ease: expandEase }, "<");
      if (beamGroup) {
        tl.to(beamGroup, { opacity: 0, duration: 0.5, ease: "sine.out" }, "<");
      }
      // Hold expanded — gives time to read each layer's card
      tl.to({}, { duration: 2.6 });
      // Collapse — back to sandwiched
      tl.to(layerTop, { y: 0, duration: 1.0, ease: expandEase })
        .to(layerMid, { y: 0, duration: 1.0, ease: expandEase }, "<")
        .to(layerBot, { y: 0, duration: 1.0, ease: expandEase }, "<");
      if (beamGroup) {
        tl.to(beamGroup, { opacity: 1, duration: 0.6, ease: "sine.out" }, "<0.3");
      }
    }
  });

  // Isometric platform geometry helpers
  const cx = 180;
  const W = 96; // top-face half-width (x extent)
  const D = 32; // top-face half-depth (y extent)
  const H = 10; // platform thickness
  const yTop = 60;
  const yMid = 92;
  const yBot = 124;

  /** Render one isometric platform centered at (cx, cy) with a child on top */
  const Platform = ({
    cy,
    tone,
    children,
  }: {
    cy: number;
    tone: "top" | "mid" | "bot";
    children?: React.ReactNode;
  }) => {
    // top diamond points (clockwise from top)
    const t1 = `${cx},${cy - D}`;
    const t2 = `${cx + W},${cy}`;
    const t3 = `${cx},${cy + D}`;
    const t4 = `${cx - W},${cy}`;
    // bottom-left edge corners (front-left side)
    const bL = `${cx - W},${cy + H}`;
    const bM = `${cx},${cy + D + H}`;
    const bR = `${cx + W},${cy + H}`;
    const topFill = `url(#fs-top-${tone})`;
    const leftFill = `url(#fs-left-${tone})`;
    const rightFill = `url(#fs-right-${tone})`;
    return (
      <g>
        {/* left side */}
        <path d={`M ${t4} L ${t3} L ${bM} L ${bL} Z`} fill={leftFill} />
        {/* right side */}
        <path d={`M ${t3} L ${t2} L ${bR} L ${bM} Z`} fill={rightFill} />
        {/* top face */}
        <g data-top-face style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <path
            d={`M ${t1} L ${t2} L ${t3} L ${t4} Z`}
            fill={topFill}
            stroke="rgb(var(--accent-rgb))"
            strokeOpacity="0.25"
            strokeWidth="0.5"
          />
          {/* top-face grid lines for an "interface" feel */}
          <path
            d={`M ${cx - W * 0.5},${cy - D * 0.5} L ${cx + W * 0.5},${cy + D * 0.5} M ${cx - W * 0.5},${cy + D * 0.5} L ${cx + W * 0.5},${cy - D * 0.5}`}
            stroke="white"
            strokeOpacity="0.18"
            strokeWidth="0.5"
          />
        </g>
        {/* content sitting on the top face */}
        {children && <g transform={`translate(${cx} ${cy})`}>{children}</g>}
      </g>
    );
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 360 160"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Per-layer tonal gradients — top brightest, side darker for depth */}
        {(["top", "mid", "bot"] as const).map((t, i) => {
          const lighten = [1.0, 0.92, 0.85][i];
          return (
            <g key={t}>
              <linearGradient id={`fs-top-${t}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--shimmer-mid, #3b82f6)" stopOpacity={0.95 * lighten} />
                <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity={0.95 * lighten} />
              </linearGradient>
              <linearGradient id={`fs-left-${t}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity={0.85 * lighten} />
                <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity={0.55 * lighten} />
              </linearGradient>
              <linearGradient id={`fs-right-${t}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity={0.7 * lighten} />
                <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity={0.4 * lighten} />
              </linearGradient>
            </g>
          );
        })}
        <radialGradient id="fs-halo" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fs-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.05" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="360" height="160" fill="url(#fs-bg)" />

      {/* halo behind the diorama */}
      <ellipse data-halo cx={cx} cy={108} rx="150" ry="46" fill="url(#fs-halo)" opacity="0.4" />

      <g data-stack>
        {/* Bottom layer — Database */}
        <g data-layer-bot>
        <Platform cy={yBot} tone="bot">
          <g>
            {/* drop shadow under card */}
            <ellipse cx="0" cy="9" rx="32" ry="3" fill="black" fillOpacity="0.18" />
            {/* white card */}
            <g transform="translate(-32 -14)">
              <rect width="64" height="22" rx="4" fill="white" />
              <rect width="64" height="22" rx="4" fill="none" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.18" strokeWidth="0.6" />
              {/* clip the DB icon so the scan band stays inside the cylinder */}
              <clipPath id="fs-db-clip">
                <rect x="6" y="4" width="14" height="14" />
              </clipPath>
              {/* DB cylinder icon */}
              <g transform="translate(13 11)">
                <ellipse cx="0" cy="-4" rx="6" ry="2.2" fill="rgb(var(--accent-rgb))" fillOpacity="0.92" />
                <path d="M -6 -4 V 4 a 6 2.2 0 0 0 12 0 V -4" fill="rgb(var(--accent-rgb))" fillOpacity="0.92" />
                <ellipse cx="0" cy="-4" rx="6" ry="2.2" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="0.6" />
                <ellipse cx="0" cy="0" rx="6" ry="2.2" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="0.5" />
                {/* scan band — travels up/down inside the cylinder */}
                <g clipPath="url(#fs-db-clip)" transform="translate(-13 -11)">
                  <rect data-db-scan x="6" y="9" width="14" height="1.6" fill="white" fillOpacity="0.85" />
                </g>
              </g>
              {/* labels */}
              <rect x="24" y="6" width="32" height="3" rx="1.5" fill="rgb(var(--accent-rgb))" fillOpacity="0.85" />
              <rect x="24" y="12" width="22" height="2.5" rx="1.25" fill="rgb(var(--accent-rgb))" fillOpacity="0.3" />
              {/* +row write indicator pop */}
              <g data-write transform="translate(24 17)">
                <rect width="14" height="2.5" rx="1.25" fill="#22c55e" fillOpacity="0.85" />
              </g>
              {/* green status dot + ping ring */}
              <g transform="translate(58 6)">
                <circle data-ping r="1.6" fill="none" stroke="#22c55e" strokeWidth="0.8" />
                <circle data-dot r="1.6" fill="#22c55e" />
              </g>
            </g>
          </g>
        </Platform>
        </g>

        {/* Middle layer — API */}
        <g data-layer-mid>
        <Platform cy={yMid} tone="mid">
          <g>
            <ellipse cx="0" cy="9" rx="32" ry="3" fill="black" fillOpacity="0.18" />
            <g transform="translate(-32 -14)">
              <rect width="64" height="22" rx="4" fill="white" />
              <rect width="64" height="22" rx="4" fill="none" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.18" strokeWidth="0.6" />
              {/* TS chip */}
              <g transform="translate(13 11)">
                <rect x="-7" y="-7" width="14" height="14" rx="2.5" fill="#3178C6" />
                <text x="0" y="3.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" fontFamily="ui-monospace, monospace">
                  TS
                </text>
              </g>
              {/* method + path */}
              <rect x="24" y="5" width="14" height="5" rx="1" fill="#22c55e" />
              <text x="31" y="9" textAnchor="middle" fontSize="3.6" fontWeight="800" fill="white" fontFamily="ui-monospace, monospace">
                GET
              </text>
              <text x="40" y="9.2" fontSize="4.4" fontWeight="700" fill="rgb(var(--accent-rgb))" fontFamily="ui-monospace, monospace">
                /api
              </text>
              {/* 200 status badge (pops in periodically) */}
              <g data-status transform="translate(56 7.5)">
                <rect x="-4" y="-2.5" width="8" height="5" rx="1" fill="#22c55e" />
                <text x="0" y="1.6" textAnchor="middle" fontSize="3.4" fontWeight="800" fill="white" fontFamily="ui-monospace, monospace">
                  200
                </text>
              </g>
              {/* response body rows (shimmer in sequentially) */}
              <rect data-row x="24" y="13" width="32" height="2.5" rx="1.25" fill="rgb(var(--accent-rgb))" fillOpacity="0.4" />
              <rect data-row x="24" y="17" width="20" height="2.5" rx="1.25" fill="rgb(var(--accent-rgb))" fillOpacity="0.4" />
            </g>
          </g>
        </Platform>
        </g>

        {/* Top layer — UI / React */}
        <g data-layer-top>
        <Platform cy={yTop} tone="top">
          <g>
            <ellipse cx="0" cy="11" rx="34" ry="3" fill="black" fillOpacity="0.18" />
            {/* browser-window card */}
            <g transform="translate(-34 -15)">
              <rect width="68" height="26" rx="4" fill="white" />
              <rect width="68" height="26" rx="4" fill="none" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.2" strokeWidth="0.6" />
              {/* title bar */}
              <rect width="68" height="7" rx="4" fill="rgb(var(--accent-rgb))" fillOpacity="0.08" />
              <rect y="3.5" width="68" height="3.5" fill="rgb(var(--accent-rgb))" fillOpacity="0.08" />
              <circle cx="4" cy="3.5" r="1.1" fill="#ef4444" />
              <circle cx="8" cy="3.5" r="1.1" fill="#f59e0b" />
              <circle cx="12" cy="3.5" r="1.1" fill="#22c55e" />
              {/* address pill */}
              <rect x="18" y="1.6" width="42" height="4" rx="2" fill="white" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.2" strokeWidth="0.4" />
              {/* address text stub + blinking caret */}
              <rect x="20" y="3.1" width="16" height="1" rx="0.5" fill="rgb(var(--accent-rgb))" fillOpacity="0.55" />
              <rect data-caret x="37" y="2.4" width="0.5" height="2.4" fill="rgb(var(--accent-rgb))" />
              {/* content */}
              <rect x="5" y="11" width="26" height="3" rx="1.5" fill="rgb(var(--accent-rgb))" fillOpacity="0.85" />
              <rect x="5" y="16" width="58" height="2" rx="1" fill="rgb(var(--accent-rgb))" fillOpacity="0.28" />
              <rect x="5" y="20" width="44" height="2" rx="1" fill="rgb(var(--accent-rgb))" fillOpacity="0.28" />
              {/* button + click ripple */}
              <g style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                <rect data-btn-ripple x="52" y="19" width="12" height="4.5" rx="2.25" fill="rgb(var(--accent-rgb))" fillOpacity="0.6" />
              </g>
              <rect data-btn x="52" y="19" width="12" height="4.5" rx="2.25" fill="rgb(var(--accent-rgb))" />
            </g>
            {/* React atom floating above */}
            <g data-react transform="translate(0 -34)">
              <circle r="2.4" fill="#61DAFB" />
              <g fill="none" stroke="#61DAFB" strokeWidth="1.1">
                <ellipse rx="10" ry="3.6" />
                <ellipse rx="10" ry="3.6" transform="rotate(60)" />
                <ellipse rx="10" ry="3.6" transform="rotate(120)" />
              </g>
            </g>
            {/* cursor — sweeps in and clicks the button (relative to platform center) */}
            <g data-cursor style={{ pointerEvents: "none" }}>
              <path
                d="M 0 0 L 0 9 L 2.8 6.8 L 4.4 10 L 6 9.2 L 4.4 6 L 7.5 5.8 Z"
                fill="white"
                stroke="rgb(var(--accent-rgb))"
                strokeWidth="0.7"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </Platform>
        </g>

        {/* Vertical light beam connecting layers (back-most for ambience) */}
        <g data-beam-group>
          <rect
            x={cx - 0.8}
            y={yTop - 4}
            width="1.6"
            height={yBot - yTop + 8}
            fill="rgb(var(--accent-rgb))"
            fillOpacity="0.18"
          />
          {/* traveling pulse along the beam */}
          <circle
            data-pulse
            cx={cx}
            cy={yBot}
            r="2.5"
            fill="var(--shimmer-mid, #3b82f6)"
          >
            <animate attributeName="r" values="2.5;3.5;2.5" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* floating side chips — TS-left, globe-right — gentle bob */}
      <g data-chip transform="translate(58 60)">
        <rect x="-12" y="-12" width="24" height="24" rx="6" fill="white" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.18" strokeWidth="1" />
        <rect x="-12" y="-12" width="24" height="24" rx="6" fill="white" fillOpacity="0.5" />
        <g>
          <rect x="-7" y="-7" width="14" height="14" rx="2.5" fill="#3178C6" />
          <text x="0" y="3" textAnchor="middle" fontSize="8" fontWeight="800" fill="white" fontFamily="ui-monospace, monospace">
            TS
          </text>
        </g>
      </g>
      <g data-chip transform="translate(302 70)">
        <rect x="-12" y="-12" width="24" height="24" rx="6" fill="white" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.18" strokeWidth="1" />
        <rect x="-12" y="-12" width="24" height="24" rx="6" fill="white" fillOpacity="0.5" />
        <g fill="none" stroke="rgb(var(--accent-rgb))" strokeWidth="1.1">
          <circle r="7" fill="rgb(var(--accent-rgb))" fillOpacity="0.1" />
          <ellipse rx="7" ry="3" />
          <ellipse rx="3" ry="7" />
          <line x1="-7" y1="0" x2="7" y2="0" />
        </g>
      </g>
      <g data-chip transform="translate(74 132)">
        <rect x="-11" y="-11" width="22" height="22" rx="5.5" fill="white" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.18" strokeWidth="1" />
        <rect x="-11" y="-11" width="22" height="22" rx="5.5" fill="white" fillOpacity="0.5" />
        <path
          d="M -7 3 A 3.5 3.5 0 0 1 -5 -4 A 4.5 4.5 0 0 1 4 -4 A 3.5 3.5 0 0 1 7 3 Z"
          fill="rgb(var(--accent-rgb))"
          fillOpacity="0.18"
          stroke="rgb(var(--accent-rgb))"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* 2. Mobile App — phone home screen, taps a booking app, then appointments, in a loop */
function MobileVisual() {
  const ref = useRef<SVGSVGElement>(null);
  useVisualAnim(ref, () => {
    const root = ref.current!;
    const home = root.querySelector<SVGElement>("[data-home]");
    const bookingScreen = root.querySelector<SVGElement>("[data-screen-booking]");
    const apptsScreen = root.querySelector<SVGElement>("[data-screen-appts]");
    const bookingIcon = root.querySelector<SVGElement>("[data-icon-booking]");
    const apptsIcon = root.querySelector<SVGElement>("[data-icon-appts]");
    const bookingRipple = root.querySelector<SVGElement>("[data-ripple-booking]");
    const apptsRipple = root.querySelector<SVGElement>("[data-ripple-appts]");
    const phone = root.querySelector<SVGElement>("[data-phone]");

    if (!home || !bookingScreen || !apptsScreen) return;

    gsap.set([bookingScreen, apptsScreen], {
      opacity: 0,
      scale: 0.35,
      transformOrigin: "50% 50%",
    });

    // Gentle phone bob
    if (phone) {
      gsap.to(phone, {
        y: -2,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Ambient micro-loops inside the open screens
    const slot = root.querySelector<SVGElement>("[data-slot]");
    if (slot) {
      gsap.to(slot, {
        opacity: 0.6,
        duration: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
    const next = root.querySelector<SVGElement>("[data-next-badge]");
    if (next) {
      gsap.to(next, {
        scale: 1.08,
        transformOrigin: "center",
        duration: 1.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
    const notif = root.querySelector<SVGElement>("[data-notif]");
    if (notif) {
      gsap.to(notif, {
        scale: 1.45,
        transformOrigin: "center",
        duration: 0.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Main loop: tap booking → open → close → tap appointments → open → close
    const tl = gsap.timeline({ repeat: -1, delay: 1.0 });
    const open = (
      icon: SVGElement | null,
      ripple: SVGElement | null,
      screen: SVGElement,
      hold: number,
    ) => {
      if (icon) {
        tl.to(icon, {
          scale: 0.82,
          duration: 0.13,
          transformOrigin: "center",
          ease: "power2.out",
        }).to(icon, {
          scale: 1,
          duration: 0.18,
          ease: "back.out(2.4)",
        });
      }
      if (ripple) {
        tl.fromTo(
          ripple,
          { scale: 0.3, opacity: 0.55, transformOrigin: "center" },
          { scale: 2.6, opacity: 0, duration: 0.55, ease: "sine.out" },
          "<-0.18",
        );
      }
      tl.to(home, { opacity: 0, duration: 0.28, ease: "sine.out" }, "+=0.04")
        .to(
          screen,
          { opacity: 1, scale: 1, duration: 0.42, ease: "power3.out" },
          "<0.04",
        )
        .to({}, { duration: hold })
        .to(screen, {
          opacity: 0,
          scale: 0.35,
          duration: 0.35,
          ease: "power2.in",
        })
        .to(home, { opacity: 1, duration: 0.3, ease: "sine.out" }, "<0.1");
    };

    open(bookingIcon, bookingRipple, bookingScreen, 2.0);
    tl.to({}, { duration: 0.7 });
    open(apptsIcon, apptsRipple, apptsScreen, 2.0);
    tl.to({}, { duration: 0.7 });
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 160"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="grad-soft-mb" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.16" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="grad-home-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
        <clipPath id="screen-mb-clip">
          <rect x="96" y="28" width="48" height="108" rx="8" />
        </clipPath>
      </defs>

      <rect width="240" height="160" fill="url(#grad-soft-mb)" />

      <g data-phone>
        {/* Side buttons — mute + volume on the left, power on the right */}
        <rect x="91.8" y="40" width="1.4" height="4" rx="0.7" fill="#23232b" />
        <rect x="91.8" y="48" width="1.4" height="8" rx="0.7" fill="#23232b" />
        <rect x="91.8" y="59" width="1.4" height="8" rx="0.7" fill="#23232b" />
        <rect x="146.8" y="52" width="1.4" height="12" rx="0.7" fill="#23232b" />

        {/* Phone frame — iPhone proportions + rounded (squircle-ish) corners */}
        <rect
          x="93"
          y="22"
          width="54"
          height="118"
          rx="13"
          fill="#0b0c0e"
          stroke="rgb(var(--accent-rgb))"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* titanium rim highlight */}
        <rect
          x="94"
          y="23"
          width="52"
          height="116"
          rx="12"
          fill="none"
          stroke="white"
          strokeOpacity="0.08"
          strokeWidth="0.6"
        />

        {/* Screen contents (clipped to screen rect) */}
        <g clipPath="url(#screen-mb-clip)">
          {/* widen the existing content to fill the roomier iPhone display */}
          <g transform="translate(120 0) scale(1.0909 1) translate(-120 0)">
          {/* === HOME === */}
          <g data-home>
            <rect x="98" y="28" width="44" height="108" fill="url(#grad-home-bg)" />
            {/* Status bar */}
            <text
              x="103"
              y="35"
              fontSize="3.4"
              fontWeight="700"
              fill="white"
              fontFamily="ui-monospace, monospace"
            >
              9:41
            </text>
            <g transform="translate(132 33)">
              <rect width="5" height="2.5" rx="0.5" fill="white" fillOpacity="0.85" />
              <rect x="5.5" y="0.6" width="0.5" height="1.3" fill="white" fillOpacity="0.85" />
            </g>

            {/* App grid 2 cols × 3 rows */}
            {/* Row 1 */}
            <g data-icon-booking>
              <rect x="105" y="42" width="12" height="12" rx="2.6" fill="#155DFC" />
              {/* mini calendar glyph */}
              <g stroke="white" strokeWidth="0.55" fill="none">
                <rect x="107.5" y="45" width="7" height="6.5" rx="0.8" />
                <line x1="107.5" y1="47.4" x2="114.5" y2="47.4" />
                <line x1="109" y1="44.4" x2="109" y2="45.4" />
                <line x1="113" y1="44.4" x2="113" y2="45.4" />
              </g>
              <rect x="109.5" y="48.6" width="1.2" height="1.2" fill="white" />
            </g>
            <g>
              <rect x="121" y="42" width="12" height="12" rx="2.6" fill="#22c55e" />
              {/* chat bubble */}
              <path
                d="M 123.5 45 H 130.5 a 1 1 0 0 1 1 1 V 49 a 1 1 0 0 1 -1 1 H 127.5 L 125.5 51.5 V 50 H 123.5 a 1 1 0 0 1 -1 -1 V 46 a 1 1 0 0 1 1 -1 Z"
                fill="white"
              />
            </g>
            {/* Row 2 */}
            <g>
              <rect x="105" y="58" width="12" height="12" rx="2.6" fill="#8b5cf6" />
              {/* camera lens */}
              <rect x="106.5" y="60.5" width="9" height="7" rx="1" fill="white" fillOpacity="0.18" />
              <circle cx="111" cy="64" r="2.4" fill="white" />
              <circle cx="111" cy="64" r="1.2" fill="#8b5cf6" />
              <circle cx="114.5" cy="61.5" r="0.5" fill="white" />
            </g>
            <g>
              <rect x="121" y="58" width="12" height="12" rx="2.6" fill="#ec4899" />
              {/* music note */}
              <path
                d="M 125 61.5 V 66 a 1.4 1.4 0 1 1 -0.8 -1.3 V 62.5 L 130 61.4 V 65.4 a 1.4 1.4 0 1 1 -0.8 -1.3 V 60 Z"
                fill="white"
              />
            </g>
            {/* Row 3 */}
            <g data-icon-appts>
              <rect x="105" y="74" width="12" height="12" rx="2.6" fill="#f97316" />
              {/* clock */}
              <circle cx="111" cy="80" r="3.6" fill="none" stroke="white" strokeWidth="0.7" />
              <line x1="111" y1="80" x2="111" y2="77.5" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
              <line x1="111" y1="80" x2="113" y2="80" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
              <circle cx="111" cy="80" r="0.5" fill="white" />
            </g>
            <g>
              <rect x="121" y="74" width="12" height="12" rx="2.6" fill="#475569" />
              {/* wallet */}
              <rect x="123" y="77" width="8" height="6" rx="1" fill="white" fillOpacity="0.9" />
              <circle cx="130" cy="80" r="1" fill="#475569" />
            </g>

            {/* Dock at the bottom */}
            <rect x="103" y="98" width="34" height="22" rx="6" fill="white" fillOpacity="0.08" />
            <rect x="106" y="101" width="8" height="8" rx="2" fill="#0ea5e9" />
            <rect x="117" y="101" width="8" height="8" rx="2" fill="#facc15" />
            <rect x="128" y="101" width="8" height="8" rx="2" fill="#a78bfa" />
            <text
              x="120"
              y="116"
              textAnchor="middle"
              fontSize="2"
              fill="white"
              fillOpacity="0.5"
              fontFamily="ui-monospace, monospace"
            >
              swipe up
            </text>

            {/* Home indicator */}
            <rect x="113" y="131" width="14" height="1" rx="0.5" fill="white" fillOpacity="0.6" />
          </g>

          {/* Ripples (above home, below open screens) */}
          <circle
            data-ripple-booking
            cx="111"
            cy="48"
            r="6"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
            opacity="0"
          />
          <circle
            data-ripple-appts
            cx="111"
            cy="80"
            r="6"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
            opacity="0"
          />

          {/* === BOOKING screen === */}
          <g data-screen-booking>
            <rect x="98" y="28" width="44" height="108" fill="#f8fafc" />
            {/* Status bar */}
            <text
              x="103"
              y="35"
              fontSize="3.4"
              fontWeight="700"
              fill="#0b0c0e"
              fontFamily="ui-monospace, monospace"
            >
              9:41
            </text>
            {/* Header */}
            <path
              d="M 102 41 L 99.5 43.5 L 102 46"
              stroke="#0b0c0e"
              strokeWidth="0.9"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="120"
              y="44.5"
              textAnchor="middle"
              fontSize="4.4"
              fontWeight="800"
              fill="#0b0c0e"
            >
              Book a slot
            </text>

            {/* Mini calendar */}
            <text
              x="101"
              y="54"
              fontSize="2.8"
              fontWeight="700"
              fill="#64748b"
              fontFamily="ui-monospace, monospace"
            >
              MAY 2026
            </text>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <text
                key={i}
                x={101 + i * 5.6}
                y="60"
                fontSize="2.2"
                fill="#94a3b8"
                fontFamily="ui-monospace, monospace"
              >
                {d}
              </text>
            ))}
            {Array.from({ length: 28 }).map((_, i) => {
              const col = i % 7;
              const row = Math.floor(i / 7);
              const day = i + 1;
              const isSelected = day === 14;
              return (
                <g key={i}>
                  {isSelected && (
                    <circle
                      cx={101 + col * 5.6 + 1.4}
                      cy={64.4 + row * 4.2}
                      r="2"
                      fill="#155DFC"
                    />
                  )}
                  <text
                    x={101 + col * 5.6 + 1.4}
                    y={65.6 + row * 4.2}
                    textAnchor="middle"
                    fontSize="2.4"
                    fontWeight={isSelected ? "800" : "500"}
                    fill={isSelected ? "white" : "#0b0c0e"}
                    fontFamily="ui-monospace, monospace"
                  >
                    {day}
                  </text>
                </g>
              );
            })}

            {/* Time slots */}
            <text
              x="101"
              y="93"
              fontSize="2.8"
              fontWeight="700"
              fill="#64748b"
              fontFamily="ui-monospace, monospace"
            >
              SLOTS
            </text>
            <g transform="translate(101 96)">
              <rect width="11" height="6.5" rx="2" fill="white" stroke="#cbd5e1" strokeWidth="0.4" />
              <text
                x="5.5"
                y="4.5"
                textAnchor="middle"
                fontSize="2.6"
                fontWeight="700"
                fill="#0b0c0e"
                fontFamily="ui-monospace, monospace"
              >
                9:00
              </text>
              <rect data-slot x="13" width="11" height="6.5" rx="2" fill="#155DFC" />
              <text
                x="18.5"
                y="4.5"
                textAnchor="middle"
                fontSize="2.6"
                fontWeight="800"
                fill="white"
                fontFamily="ui-monospace, monospace"
              >
                10:30
              </text>
              <rect x="26" width="11" height="6.5" rx="2" fill="white" stroke="#cbd5e1" strokeWidth="0.4" />
              <text
                x="31.5"
                y="4.5"
                textAnchor="middle"
                fontSize="2.6"
                fontWeight="700"
                fill="#0b0c0e"
                fontFamily="ui-monospace, monospace"
              >
                14:00
              </text>
            </g>

            {/* Confirm button */}
            <rect x="103" y="118" width="34" height="9" rx="4.5" fill="#155DFC" />
            <text
              x="120"
              y="124.2"
              textAnchor="middle"
              fontSize="3.4"
              fontWeight="800"
              fill="white"
            >
              Confirm
            </text>
            {/* Home indicator */}
            <rect x="113" y="131" width="14" height="1" rx="0.5" fill="#0b0c0e" fillOpacity="0.3" />
          </g>

          {/* === APPOINTMENTS screen === */}
          <g data-screen-appts>
            <rect x="98" y="28" width="44" height="108" fill="#f8fafc" />
            <text
              x="103"
              y="35"
              fontSize="3.4"
              fontWeight="700"
              fill="#0b0c0e"
              fontFamily="ui-monospace, monospace"
            >
              9:41
            </text>
            <text x="103" y="46" fontSize="5" fontWeight="800" fill="#0b0c0e">
              Today
            </text>
            <text x="103" y="51" fontSize="2.6" fill="#94a3b8" fontFamily="ui-monospace, monospace">
              3 appointments
            </text>

            {[
              { y: 55, color: "#f97316", name: "Alex K", time: "11:00", initial: "A", isNext: true },
              { y: 76, color: "#22c55e", name: "Mia R", time: "13:30", initial: "M" },
              { y: 97, color: "#8b5cf6", name: "Jordan T", time: "16:00", initial: "J" },
            ].map((appt, i) => (
              <g key={i} transform={`translate(101 ${appt.y})`}>
                <rect width="38" height="17" rx="2.4" fill="white" stroke="#e2e8f0" strokeWidth="0.4" />
                <circle cx="6" cy="8.5" r="3.6" fill={appt.color} />
                <text
                  x="6"
                  y="9.8"
                  textAnchor="middle"
                  fontSize="3.6"
                  fontWeight="800"
                  fill="white"
                >
                  {appt.initial}
                </text>
                <text x="12" y="7.2" fontSize="3" fontWeight="800" fill="#0b0c0e">
                  {appt.name}
                </text>
                <g transform="translate(12 11)">
                  <circle r="1" fill="none" stroke="#94a3b8" strokeWidth="0.4" />
                  <line x1="0" y1="0" x2="0" y2="-0.6" stroke="#94a3b8" strokeWidth="0.4" />
                  <line x1="0" y1="0" x2="0.6" y2="0" stroke="#94a3b8" strokeWidth="0.4" />
                  <text
                    x="2.5"
                    y="1.2"
                    fontSize="2.4"
                    fill="#94a3b8"
                    fontFamily="ui-monospace, monospace"
                  >
                    {appt.time}
                  </text>
                </g>
                {appt.isNext && (
                  <g data-next-badge transform="translate(31.5 4)">
                    <rect x="-4" y="-2" width="8" height="3.6" rx="1" fill="#155DFC" />
                    <text
                      x="0"
                      y="0.8"
                      textAnchor="middle"
                      fontSize="2.2"
                      fontWeight="800"
                      fill="white"
                      fontFamily="ui-monospace, monospace"
                    >
                      NEXT
                    </text>
                  </g>
                )}
                {i === 0 && <circle data-notif cx="35.5" cy="9" r="0.9" fill="#ef4444" />}
              </g>
            ))}

            {/* Home indicator */}
            <rect x="113" y="131" width="14" height="1" rx="0.5" fill="#0b0c0e" fillOpacity="0.3" />
          </g>
          </g>
          {/* Dynamic Island — undistorted, sits on top of every screen */}
          <g>
            <rect x="113.5" y="29" width="13" height="3.4" rx="1.7" fill="#000" />
            <circle cx="124.4" cy="30.7" r="0.85" fill="#15203a" />
            <circle cx="124.4" cy="30.7" r="0.38" fill="#2b3a5e" />
          </g>
        </g>
      </g>
    </svg>
  );
}

/* 3. Automation Bot — workflow card with steps that complete one by one */
function AutomationVisual() {
  const ref = useRef<SVGSVGElement>(null);

  const STEPS = [
    { label: "Webhook received", iconBg: "#fef3c7", iconFg: "#f59e0b", icon: "bolt" as const },
    { label: "Extract intent",  iconBg: "#dbeafe", iconFg: "#155DFC", icon: "code" as const },
    { label: "Classify w/ AI",  iconBg: "#ede9fe", iconFg: "#8b5cf6", icon: "sparkle" as const },
    { label: "Lookup customer", iconBg: "#cffafe", iconFg: "#0ea5e9", icon: "search" as const },
    { label: "Send Slack reply",iconBg: "#dcfce7", iconFg: "#22c55e", icon: "send" as const },
  ];

  useVisualAnim(ref, () => {
    const root = ref.current!;
    const bgs = root.querySelectorAll<SVGElement>("[data-step-bg]");
    const bars = root.querySelectorAll<SVGElement>("[data-step-bar]");
    const queueds = root.querySelectorAll<SVGElement>("[data-status-queued]");
    const spinners = root.querySelectorAll<SVGElement>("[data-status-spinner]");
    const checks = root.querySelectorAll<SVGElement>("[data-status-check]");
    const labels = root.querySelectorAll<SVGElement>("[data-step-label]");
    const progress = root.querySelector<SVGElement>("[data-progress]");
    const runningDot = root.querySelector<SVGElement>("[data-running-dot]");

    if (runningDot) {
      gsap.to(runningDot, {
        scale: 1.45,
        transformOrigin: "center",
        duration: 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    const N = bgs.length;
    if (!N) return;

    const tl = gsap.timeline({ repeat: -1 });
    // Reset all steps to "queued" at the start of each iteration
    bgs.forEach((b) => tl.set(b, { attr: { fill: "#ffffff" } }, 0));
    bars.forEach((b) => tl.set(b, { opacity: 0, attr: { fill: "#155DFC" } }, 0));
    queueds.forEach((q) => tl.set(q, { opacity: 1 }, 0));
    spinners.forEach((s) => tl.set(s, { opacity: 0 }, 0));
    checks.forEach((c) => tl.set(c, { opacity: 0 }, 0));
    labels.forEach((l) => tl.set(l, { attr: { fill: "#0b0c0e" } }, 0));
    if (progress) {
      tl.set(progress, { scaleX: 0, transformOrigin: "left center" }, 0);
    }

    const stepDur = 0.85;
    for (let i = 0; i < N; i++) {
      const t = 0.4 + i * stepDur;
      // Step activates → spinner
      tl.to(bgs[i], { attr: { fill: "#e0eaff" }, duration: 0.22 }, t)
        .to(bars[i], { opacity: 1, duration: 0.22 }, t)
        .to(queueds[i], { opacity: 0, duration: 0.15 }, t)
        .to(spinners[i], { opacity: 1, duration: 0.2 }, t);
      if (progress) {
        tl.to(
          progress,
          { scaleX: (i + 1) / N, duration: 0.55, ease: "power2.out" },
          t,
        );
      }
      // Step completes → check
      tl.to(spinners[i], { opacity: 0, duration: 0.15 }, t + 0.55)
        .to(
          checks[i],
          { opacity: 1, duration: 0.25, ease: "back.out(2.2)" },
          t + 0.55,
        )
        .to(bgs[i], { attr: { fill: "#dcfce7" }, duration: 0.25 }, t + 0.55)
        .to(bars[i], { attr: { fill: "#22c55e" }, duration: 0.25 }, t + 0.55)
        .to(labels[i], { attr: { fill: "#16a34a" }, duration: 0.25 }, t + 0.55);
    }
    // Hold complete state before the loop resets
    tl.to({}, { duration: 1.2 });
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 160"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="grad-soft-bot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.16" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <rect width="240" height="160" fill="url(#grad-soft-bot)" />

      {/* Workflow card */}
      <rect
        x="20"
        y="32"
        width="200"
        height="96"
        rx="6"
        fill="white"
        stroke="rgb(var(--accent-rgb))"
        strokeOpacity="0.18"
        strokeWidth="0.6"
      />

      {/* === Header === */}
      {/* Bot avatar */}
      <g data-bot transform="translate(31 42)">
        <rect x="-4" y="-3.5" width="8" height="7.5" rx="2" fill="#155DFC" />
        <circle data-bot-eye cx="-1.4" cy="-0.6" r="0.85" fill="white" />
        <circle data-bot-eye cx="1.4" cy="-0.6" r="0.85" fill="white" />
        <rect x="-2.2" y="1.6" width="4.4" height="0.9" rx="0.45" fill="white" />
        <line x1="0" y1="-3.5" x2="0" y2="-5.4" stroke="#155DFC" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="0" cy="-5.6" r="0.7" fill="#155DFC" />
      </g>
      {/* Title + sub */}
      <text x="40" y="42" fontSize="4.6" fontWeight="800" fill="#0b0c0e">
        Booking Bot
      </text>
      <text x="40" y="47.5" fontSize="2.6" fill="#94a3b8" fontFamily="ui-monospace, monospace">
        webhook → reply · 5 steps
      </text>
      {/* Running pill */}
      <g transform="translate(176 40)">
        <rect width="36" height="6" rx="3" fill="#dcfce7" />
        <circle data-running-dot cx="4" cy="3" r="1.2" fill="#16a34a" />
        <text
          x="9"
          y="4.3"
          fontSize="2.8"
          fontWeight="800"
          fill="#15803d"
          fontFamily="ui-monospace, monospace"
        >
          RUNNING
        </text>
      </g>

      {/* Progress track + fill */}
      <rect x="28" y="53" width="184" height="1.6" rx="0.8" fill="#e2e8f0" />
      <rect data-progress x="28" y="53" width="184" height="1.6" rx="0.8" fill="#155DFC" />

      {/* === Steps === */}
      {STEPS.map((step, i) => {
        const y = 60 + i * 12.5;
        return (
          <g key={i}>
            {/* row background */}
            <rect
              data-step-bg
              x="24"
              y={y - 0.5}
              width="192"
              height="11"
              rx="2.6"
              fill="white"
            />
            {/* left accent bar */}
            <rect
              data-step-bar
              x="24"
              y={y - 0.5}
              width="2"
              height="11"
              rx="1"
              fill="#155DFC"
              opacity="0"
            />
            {/* icon tile */}
            <g transform={`translate(32 ${y + 5})`}>
              <rect x="-3.5" y="-3.5" width="7" height="7" rx="1.6" fill={step.iconBg} />
              <StepGlyph kind={step.icon} color={step.iconFg} />
            </g>
            {/* label */}
            <text
              data-step-label
              x="40"
              y={y + 6.6}
              fontSize="3.8"
              fontWeight="700"
              fill="#0b0c0e"
            >
              {step.label}
            </text>
            {/* status (right side) */}
            <g transform={`translate(206 ${y + 5})`}>
              {/* queued — empty ring */}
              <circle
                data-status-queued
                r="2.2"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="0.7"
              />
              {/* spinner — rotating dashed ring */}
              <g data-status-spinner opacity="0">
                <g>
                  <circle
                    r="2.2"
                    fill="none"
                    stroke="#155DFC"
                    strokeWidth="0.9"
                    strokeDasharray="2.6 3.2"
                    strokeLinecap="round"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to="360"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </g>
              </g>
              {/* check — green tick */}
              <g data-status-check opacity="0">
                <circle r="2.4" fill="#22c55e" />
                <path
                  d="M -1.2 0 L -0.3 0.95 L 1.3 -0.95"
                  stroke="white"
                  strokeWidth="0.95"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function StepGlyph({
  kind,
  color,
}: {
  kind: "bolt" | "code" | "sparkle" | "search" | "send";
  color: string;
}) {
  switch (kind) {
    case "bolt":
      return (
        <path
          d="M 0.4 -2.6 L -1.8 0.4 L -0.2 0.4 L -0.6 2.6 L 1.6 -0.4 L 0 -0.4 Z"
          fill={color}
        />
      );
    case "code":
      return (
        <g stroke={color} strokeWidth="0.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -1.5 -1.6 L -2.6 0 L -1.5 1.6" />
          <path d="M 1.5 -1.6 L 2.6 0 L 1.5 1.6" />
        </g>
      );
    case "sparkle":
      return (
        <path
          d="M 0 -2.6 L 0.7 -0.7 L 2.6 0 L 0.7 0.7 L 0 2.6 L -0.7 0.7 L -2.6 0 L -0.7 -0.7 Z"
          fill={color}
        />
      );
    case "search":
      return (
        <g stroke={color} strokeWidth="0.75" fill="none" strokeLinecap="round">
          <circle cx="-0.6" cy="-0.6" r="1.6" />
          <line x1="0.7" y1="0.7" x2="2.1" y2="2.1" />
        </g>
      );
    case "send":
      return (
        <g fill={color}>
          <path d="M -2.6 -1.9 L 2.6 0 L -2.6 1.9 L -1.4 0 Z" />
        </g>
      );
  }
}

/* 4. Commerce — static template vs animated headless storefront, slider uncovers */
function CommerceVisual() {
  const ref = useRef<SVGSVGElement>(null);
  useVisualAnim(ref, () => {
    const root = ref.current!;
    const wipe = root.querySelector<SVGElement>("[data-wipe]");
    const slider = root.querySelector<SVGElement>("[data-slider]");
    if (!wipe || !slider) return;

    /* --- Headless side ambient animations (always running) --- */
    const cartBadge = root.querySelector<SVGElement>("[data-cart-badge]");
    if (cartBadge) {
      gsap.fromTo(
        cartBadge,
        { scale: 0.6, opacity: 0.4, transformOrigin: "center" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "back.out(2.2)",
          repeat: -1,
          repeatDelay: 2.2,
          yoyo: true,
        },
      );
    }
    const liveDot = root.querySelector<SVGElement>("[data-live-dot]");
    if (liveDot) {
      gsap.to(liveDot, {
        scale: 1.7,
        transformOrigin: "center",
        duration: 0.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
    const saleTag = root.querySelector<SVGElement>("[data-sale-tag]");
    if (saleTag) {
      gsap.to(saleTag, {
        rotation: 360,
        transformOrigin: "center",
        duration: 14,
        ease: "none",
        repeat: -1,
      });
    }
    const hero = root.querySelector<SVGElement>("[data-hero-img]");
    if (hero) {
      gsap.to(hero, {
        scale: 1.04,
        transformOrigin: "center",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
    const btnPulse = root.querySelector<SVGElement>("[data-btn-pulse]");
    if (btnPulse) {
      gsap.fromTo(
        btnPulse,
        { scaleX: 1, scaleY: 1, opacity: 0.5, transformOrigin: "center" },
        {
          scaleX: 1.15,
          scaleY: 1.6,
          opacity: 0,
          duration: 1.4,
          ease: "sine.out",
          repeat: -1,
          repeatDelay: 0.4,
        },
      );
    }
    const sparkles = root.querySelectorAll<SVGElement>("[data-sparkle]");
    sparkles.forEach((s, i) => {
      gsap.fromTo(
        s,
        { opacity: 0, scale: 0.3, transformOrigin: "center" },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.8,
          delay: i * 0.5,
        },
      );
    });

    /* Heart wishlist pulses occasionally */
    const heart = root.querySelector<SVGElement>("[data-heart]");
    if (heart) {
      gsap.fromTo(
        heart,
        { scale: 1, transformOrigin: "center" },
        {
          scale: 1.25,
          duration: 0.35,
          ease: "sine.inOut",
          repeat: -1,
          repeatDelay: 2.4,
          yoyo: true,
        },
      );
    }

    /* Marquee trust strip scrolls leftward */
    const marquee = root.querySelector<SVGElement>("[data-marquee]");
    if (marquee) {
      gsap.fromTo(
        marquee,
        { x: 0 },
        { x: -110, duration: 12, ease: "none", repeat: -1 },
      );
    }

    /* Featured cards: a spotlight travels through them one at a time — each
       card lifts, scales up slightly and blooms a soft accent glow, then
       eases back. (Animates the inner group, so the base translate holds.) */
    const fcards = root.querySelectorAll<SVGElement>("[data-fcard]");
    if (fcards.length) {
      const tlCards = gsap.timeline({ repeat: -1 });
      fcards.forEach((c, i) => {
        const glow = c.querySelector<SVGElement>("[data-fcard-glow]");
        const at = i * 1.5;
        tlCards
          .to(
            c,
            {
              y: -4,
              scale: 1.06,
              duration: 0.5,
              ease: "power3.out",
              transformOrigin: "50% 100%",
            },
            at,
          )
          .to(
            c,
            { y: 0, scale: 1, duration: 0.6, ease: "power2.inOut" },
            at + 1.0,
          );
        if (glow) {
          tlCards
            .fromTo(
              glow,
              { opacity: 0 },
              { opacity: 0.5, duration: 0.5, ease: "power2.out" },
              at,
            )
            .to(glow, { opacity: 0, duration: 0.6, ease: "power2.in" }, at + 1.0);
        }
      });
    }

    /* Quick-add buttons subtly pulse */
    const quickadds = root.querySelectorAll<SVGElement>("[data-quickadd]");
    quickadds.forEach((q, i) => {
      gsap.to(q, {
        scale: 1.18,
        transformOrigin: "center",
        duration: 0.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      });
    });

    /* Floating "just bought" toast slides in from the right */
    const toast = root.querySelector<SVGElement>("[data-toast]");
    if (toast) {
      gsap.set(toast, { x: 56, opacity: 0 });
      const tlToast = gsap.timeline({ repeat: -1, delay: 2.0 });
      tlToast
        .to(toast, { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" })
        .to({}, { duration: 2.6 })
        .to(toast, { x: 56, opacity: 0, duration: 0.55, ease: "power3.in" })
        .to({}, { duration: 4.4 });
    }

    /* --- Slider wipe: template ↔ headless, back and forth --- */
    const tl = gsap.timeline({ repeat: -1, delay: 0.6 });
    // initial: mostly template visible (slider near the right)
    tl.set(wipe, { attr: { width: 152 } }).set(slider, { x: 0 });
    // hold template view
    tl.to({}, { duration: 1.2 });
    // wipe to reveal headless
    tl.to(
      wipe,
      { attr: { width: 32 }, duration: 2.6, ease: "power2.inOut" },
      ">",
    ).to(slider, { x: -120, duration: 2.6, ease: "power2.inOut" }, "<");
    // hold headless view
    tl.to({}, { duration: 2.0 });
    // wipe back to template
    tl.to(
      wipe,
      { attr: { width: 152 }, duration: 2.6, ease: "power2.inOut" },
      ">",
    ).to(slider, { x: 0, duration: 2.6, ease: "power2.inOut" }, "<");
    // hold before loop
    tl.to({}, { duration: 0.6 });
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 160"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="grad-soft-ec" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.16" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="ec-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.92" />
          <stop offset="100%" stopColor="var(--shimmer-mid, #3b82f6)" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="ec-gloss" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="45%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.35" />
          <stop offset="55%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animate attributeName="x1" values="-50%;100%" dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;150%" dur="3.6s" repeatCount="indefinite" />
        </linearGradient>
        <clipPath id="ec-wipe-clip">
          <rect data-wipe x="20" y="31" width="152" height="111" />
        </clipPath>
        {/* soft accent bloom for the featured-card spotlight */}
        <filter id="ec-card-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      <rect width="240" height="160" fill="url(#grad-soft-ec)" />

      {/* Browser frame */}
      <rect
        x="20"
        y="22"
        width="200"
        height="120"
        rx="6"
        fill="white"
        stroke="rgb(var(--accent-rgb))"
        strokeOpacity="0.2"
        strokeWidth="0.6"
      />

      {/* ===== HEADLESS storefront (drawn first, always full; template wipes over it) ===== */}
      <g>
        {/* dark editorial bg with subtle gradient mesh */}
        <rect x="20" y="31" width="200" height="111" fill="#0a0a0a" />
        <ellipse cx="60" cy="80" rx="80" ry="40" fill="url(#ec-hero-grad)" opacity="0.12" />
        <ellipse cx="180" cy="120" rx="60" ry="30" fill="#a78bfa" opacity="0.06" />
        {/* accent strip at top */}
        <rect x="20" y="31" width="200" height="2" fill="url(#ec-hero-grad)" />

        {/* === Header === */}
        <text
          x="26"
          y="42"
          fontSize="6"
          fontWeight="800"
          fill="white"
          fontFamily="serif"
          fontStyle="italic"
        >
          aurora.
        </text>
        <g transform="translate(72 39.5)">
          <rect width="12" height="4.5" rx="2.25" fill="#22c55e" fillOpacity="0.18" />
          <circle data-live-dot cx="2.4" cy="2.3" r="0.9" fill="#22c55e" />
          <text x="5" y="3.4" fontSize="2.4" fontWeight="800" fill="#22c55e" fontFamily="ui-monospace, monospace">
            LIVE
          </text>
        </g>
        {/* nav strokes */}
        {[110, 128, 146, 164].map((x) => (
          <rect key={x} x={x} y="40" width="12" height="1.4" rx="0.7" fill="white" fillOpacity="0.55" />
        ))}
        {/* heart (wishlist) */}
        <g data-heart transform="translate(195 41)">
          <path
            d="M 0 1.6 C -2.6 -0.6 -3.4 -3.2 -1.6 -3.2 C -0.7 -3.2 -0.2 -2.6 0 -2.1 C 0.2 -2.6 0.7 -3.2 1.6 -3.2 C 3.4 -3.2 2.6 -0.6 0 1.6 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
          />
        </g>
        {/* Cart + badge */}
        <g transform="translate(208 41)">
          <path
            d="M -3 -1.5 H 3.2 L 2.6 2.4 H -2.4 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
          <path
            d="M -1.6 -1.5 V -3 a 1.6 1.6 0 0 1 3.2 0 V -1.5"
            fill="none"
            stroke="white"
            strokeWidth="0.7"
          />
          <g data-cart-badge transform="translate(2.6 -2.4)">
            <circle r="2" fill="#155DFC" />
            <text
              x="0"
              y="0.9"
              textAnchor="middle"
              fontSize="2.6"
              fontWeight="800"
              fill="white"
              fontFamily="ui-monospace, monospace"
            >
              3
            </text>
          </g>
        </g>

        {/* === Hero banner (editorial home banner) === */}
        <g data-hero-img>
          <rect x="24" y="47" width="192" height="42" rx="3" fill="url(#ec-hero-grad)" />
          {/* mesh glow */}
          <ellipse cx="70" cy="70" rx="60" ry="20" fill="white" fillOpacity="0.14" />
          {/* moving gloss sweep */}
          <rect x="24" y="47" width="192" height="42" rx="3" fill="url(#ec-gloss)" />

          {/* hoodie silhouette on the right side */}
          <g transform="translate(178 70)">
            <ellipse cx="0" cy="16" rx="18" ry="1.8" fill="black" fillOpacity="0.3" />
            <path d="M -9 -10 Q -9 -18 0 -18 Q 9 -18 9 -10 L 9 -7 L -9 -7 Z" fill="#0a0a0a" fillOpacity="0.88" />
            <path
              d="M -20 -5 L -9 -9 L 9 -9 L 20 -5 L 18 5 L 13 12 L 9 3 L -9 3 L -13 12 L -18 5 Z"
              fill="#0a0a0a"
              fillOpacity="0.92"
            />
            <rect x="-9" y="-9" width="18" height="22" fill="#0a0a0a" fillOpacity="0.92" />
            <path d="M -7 -6 L -5 -6 L -3 11 L -5 11 Z" fill="white" fillOpacity="0.12" />
            <line x1="-2.4" y1="-9" x2="-2.4" y2="-3" stroke="white" strokeOpacity="0.5" strokeWidth="0.45" />
            <line x1="2.4" y1="-9" x2="2.4" y2="-3" stroke="white" strokeOpacity="0.5" strokeWidth="0.45" />
          </g>

          {/* text overlay on left */}
          <text x="34" y="58" fontSize="2.6" fontWeight="800" fill="white" fillOpacity="0.85" fontFamily="ui-monospace, monospace">
            SS '26 / NEW SEASON
          </text>
          <text x="34" y="73" fontSize="10" fontWeight="800" fill="white" fontFamily="serif" fontStyle="italic">
            aurora.
          </text>
          <text x="34" y="80" fontSize="3" fill="white" fillOpacity="0.85" fontFamily="serif">
            an editorial drop
          </text>
          <g transform="translate(34 84)">
            <rect width="36" height="5.5" rx="2.75" fill="white" />
            <text x="18" y="3.9" textAnchor="middle" fontSize="2.8" fontWeight="800" fill="#0a0a0a" fontFamily="ui-monospace, monospace">
              SHOP →
            </text>
          </g>

          {/* sparkles */}
          <g data-sparkle transform="translate(105 56)">
            <path d="M 0 -2 L 0.5 -0.5 L 2 0 L 0.5 0.5 L 0 2 L -0.5 0.5 L -2 0 L -0.5 -0.5 Z" fill="white" />
          </g>
          <g data-sparkle transform="translate(155 60)">
            <path d="M 0 -1.5 L 0.4 -0.4 L 1.5 0 L 0.4 0.4 L 0 1.5 L -0.4 0.4 L -1.5 0 L -0.4 -0.4 Z" fill="white" />
          </g>
          <g data-sparkle transform="translate(200 84)">
            <path d="M 0 -1.2 L 0.3 -0.3 L 1.2 0 L 0.3 0.3 L 0 1.2 L -0.3 0.3 L -1.2 0 L -0.3 -0.3 Z" fill="white" />
          </g>

          {/* hero slide indicator (bar + dots) */}
          <g transform="translate(196 85)">
            <rect x="0" y="0" width="6" height="1.4" rx="0.7" fill="white" />
            <circle cx="9.5" cy="0.7" r="0.7" fill="white" fillOpacity="0.45" />
            <circle cx="12.5" cy="0.7" r="0.7" fill="white" fillOpacity="0.45" />
          </g>
        </g>

        {/* rotating SALE tag (overlapping hero, top-right) */}
        <g data-sale-tag transform="translate(208 53)">
          <circle r="6.5" fill="#facc15" stroke="white" strokeWidth="0.5" />
          <text
            x="0"
            y="1.3"
            textAnchor="middle"
            fontSize="3"
            fontWeight="900"
            fill="#0b0c0e"
            fontFamily="ui-monospace, monospace"
          >
            -30%
          </text>
        </g>

        {/* === Marquee trust strip === */}
        <g transform="translate(20 92)">
          <rect width="200" height="4" fill="rgb(var(--accent-rgb))" fillOpacity="0.12" />
          <text
            data-marquee
            x="6"
            y="2.9"
            fontSize="2.2"
            fontWeight="800"
            fill="white"
            fillOpacity="0.7"
            fontFamily="ui-monospace, monospace"
          >
            FREE SHIPPING · 30-DAY RETURNS · ★ 4.9 · 24/7 SUPPORT · FREE SHIPPING · 30-DAY RETURNS
          </text>
        </g>

        {/* === Featured products section === */}
        <text x="26" y="103" fontSize="3.6" fontWeight="800" fill="white" fontFamily="serif">
          new in
        </text>
        <text x="216" y="103" textAnchor="end" fontSize="2.4" fill="#a3a3a3" fontFamily="ui-monospace, monospace">
          view all →
        </text>
        <line x1="26" y1="105" x2="216" y2="105" stroke="#262626" strokeWidth="0.4" />

        {/* product cards */}
        {[
          {
            x: 28,
            name: "Hoodie",
            price: "$129",
            cardBg: "#155DFC",
            swatches: ["#0a0a0a", "#dc2626", "#facc15"],
            badge: "NEW",
            badgeColor: "#22c55e",
          },
          {
            x: 92,
            name: "Tee",
            price: "$49",
            cardBg: "#a78bfa",
            swatches: ["#0a0a0a", "#155DFC", "#22c55e"],
            badge: "-30%",
            badgeColor: "#facc15",
            badgeDark: true,
          },
          {
            x: 156,
            name: "Pants",
            price: "$89",
            cardBg: "#f97316",
            swatches: ["#0a0a0a", "#dc2626", "#a78bfa"],
          },
        ].map((p, i) => (
          // Outer group holds the static position; GSAP animates the inner
          // [data-fcard] group. GSAP's y/scale tweens REPLACE an element's
          // translate, so the positioning translate must live on a separate,
          // untweened group — otherwise the spotlight lift wipes out the
          // y=108 offset and the cards leap to the top of the storefront.
          <g key={i} transform={`translate(${p.x} 108)`}>
            <g data-fcard>
            {/* spotlight glow — blooms behind the active card */}
            <rect
              data-fcard-glow
              x="0"
              y="0"
              width="58"
              height="30"
              rx="3"
              fill="rgb(var(--accent-rgb))"
              opacity="0"
              filter="url(#ec-card-glow)"
            />
            {/* card bg */}
            <rect
              width="58"
              height="30"
              rx="2.5"
              fill="#171717"
              stroke="rgb(var(--accent-rgb))"
              strokeOpacity="0.35"
              strokeWidth="0.4"
            />
            {/* image area */}
            <rect x="3" y="3" width="52" height="15" rx="1.5" fill={p.cardBg} />
            {/* subtle abstract product silhouette */}
            <ellipse cx="29" cy="10.5" rx="9" ry="6" fill="#0a0a0a" fillOpacity="0.28" />
            <ellipse cx="29" cy="8.5" rx="5" ry="3" fill="white" fillOpacity="0.18" />
            {/* per-card highlight gloss */}
            <rect x="3" y="3" width="52" height="15" rx="1.5" fill="url(#ec-gloss)" opacity="0.5" />
            {/* badge */}
            {p.badge && (
              <g transform="translate(8 7)">
                <rect x="-5" y="-2.5" width="10" height="4.5" rx="1.2" fill={p.badgeColor} />
                <text
                  x="0"
                  y="0.9"
                  textAnchor="middle"
                  fontSize="2.4"
                  fontWeight="900"
                  fill={p.badgeDark ? "#0a0a0a" : "white"}
                  fontFamily="ui-monospace, monospace"
                >
                  {p.badge}
                </text>
              </g>
            )}
            {/* name */}
            <text x="6" y="23" fontSize="3" fontWeight="800" fill="white" fontFamily="serif">
              {p.name}
            </text>
            {/* price */}
            <text x="6" y="27.8" fontSize="2.6" fontWeight="800" fill="white" fontFamily="ui-monospace, monospace">
              {p.price}
            </text>
            {/* swatches */}
            <g transform="translate(33 26.5)">
              {p.swatches.map((c, j) => (
                <circle key={j} cx={j * 3} cy="0" r="1.1" fill={c} />
              ))}
            </g>
            {/* quick-add cart button */}
            <g data-quickadd transform="translate(52 26.5)">
              <circle r="2.6" fill="rgb(var(--accent-rgb))" />
              <path
                d="M -1.1 0 H 1.1 M 0 -1.1 V 1.1"
                stroke="white"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
            </g>
            </g>
          </g>
        ))}

        {/* Floating "just bought" toast (slides in periodically).
            Outer group = static position; inner [data-toast] is what GSAP
            slides in/out — keeping the x-tween from clobbering the position. */}
        <g transform="translate(212 54)">
          <g data-toast>
          <rect x="-44" y="-7" width="44" height="14" rx="2.5" fill="#171717" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.4" strokeWidth="0.4" />
          <circle cx="-37" cy="0" r="3.4" fill="#f59e0b" />
          <text x="-37" y="1.2" textAnchor="middle" fontSize="3" fontWeight="800" fill="white">
            S
          </text>
          <text x="-30" y="-2" fontSize="2.6" fontWeight="800" fill="white" fontFamily="ui-monospace, monospace">
            Sarah · NYC
          </text>
          <text x="-30" y="2.5" fontSize="2.2" fill="#a3a3a3" fontFamily="ui-monospace, monospace">
            bought Hoodie
          </text>
          <circle cx="-3" cy="-4" r="1" fill="#22c55e" />
          </g>
        </g>
      </g>

      {/* ===== TEMPLATE storefront — generic Shopify HOME PAGE (clipped by the wipe) ===== */}
      <g clipPath="url(#ec-wipe-clip)">
        {/* light, generic bg */}
        <rect x="20" y="31" width="200" height="111" fill="#fafafa" />
        {/* site header */}
        <rect
          x="20"
          y="31"
          width="200"
          height="11"
          fill="white"
          stroke="#e2e8f0"
          strokeWidth="0.3"
        />
        <text x="26" y="38.5" fontSize="4" fontWeight="700" fill="#0b0c0e" fontFamily="serif">
          ShopX
        </text>
        {/* search pill */}
        <rect x="80" y="34.5" width="80" height="4" rx="2" fill="#f1f5f9" />
        <circle cx="84" cy="36.5" r="1" fill="none" stroke="#94a3b8" strokeWidth="0.4" />
        <line x1="84.7" y1="37.2" x2="85.6" y2="38.1" stroke="#94a3b8" strokeWidth="0.4" strokeLinecap="round" />
        <text x="88" y="37.5" fontSize="2" fill="#94a3b8" fontFamily="ui-monospace, monospace">
          Search products...
        </text>
        {/* account + cart */}
        <circle cx="200" cy="37" r="1.6" fill="none" stroke="#475569" strokeWidth="0.5" />
        <g transform="translate(210 37)">
          <path
            d="M -3 -1 H 3.2 L 2.6 2 H -2.4 Z"
            fill="none"
            stroke="#475569"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          <path
            d="M -1.6 -1 V -2.4 a 1.6 1.6 0 0 1 3.2 0 V -1"
            fill="none"
            stroke="#475569"
            strokeWidth="0.6"
          />
        </g>

        {/* Category nav strip */}
        <rect x="20" y="42" width="200" height="5" fill="white" stroke="#e2e8f0" strokeWidth="0.3" />
        {[
          { x: 30, label: "NEW" },
          { x: 50, label: "WOMEN" },
          { x: 74, label: "MEN" },
          { x: 92, label: "KIDS" },
          { x: 110, label: "SALE" },
          { x: 128, label: "GIFTS" },
        ].map((c) => (
          <text
            key={c.label}
            x={c.x}
            y="45.7"
            fontSize="2.4"
            fontWeight="700"
            fill={c.label === "SALE" ? "#dc2626" : "#475569"}
            fontFamily="ui-monospace, monospace"
          >
            {c.label}
          </text>
        ))}

        {/* Promotional hero banner */}
        <rect x="24" y="51" width="192" height="28" rx="2" fill="#e2e8f0" />
        <text
          x="120"
          y="62"
          textAnchor="middle"
          fontSize="2.6"
          fontWeight="800"
          fill="#64748b"
          fontFamily="ui-monospace, monospace"
        >
          SS '26 COLLECTION
        </text>
        <text
          x="120"
          y="71"
          textAnchor="middle"
          fontSize="5.5"
          fontWeight="800"
          fill="#94a3b8"
          fontFamily="serif"
        >
          NEW ARRIVALS
        </text>
        <text
          x="120"
          y="76.5"
          textAnchor="middle"
          fontSize="2.4"
          fontWeight="700"
          fill="#64748b"
          fontFamily="ui-monospace, monospace"
        >
          SHOP NOW →
        </text>
        {/* banner pagination dots */}
        <circle cx="116" cy="78" r="0.7" fill="#475569" />
        <circle cx="120" cy="78" r="0.7" fill="#cbd5e1" />
        <circle cx="124" cy="78" r="0.7" fill="#cbd5e1" />

        {/* Section heading */}
        <text x="28" y="86" fontSize="2.6" fontWeight="800" fill="#0b0c0e" fontFamily="ui-monospace, monospace">
          FEATURED
        </text>
        <text x="200" y="86" fontSize="2.2" fill="#94a3b8" fontFamily="ui-monospace, monospace">
          View all →
        </text>
        <line x1="28" y1="88" x2="216" y2="88" stroke="#e2e8f0" strokeWidth="0.3" />

        {/* product grid (3 cards, plain) */}
        {[28, 92, 156].map((x, i) => (
          <g key={i} transform={`translate(${x} 91)`}>
            <rect width="60" height="48" rx="2" fill="white" stroke="#e2e8f0" strokeWidth="0.3" />
            <rect x="3" y="3" width="54" height="22" rx="1" fill="#cbd5e1" />
            <rect x="5" y="28" width="32" height="2.4" rx="1" fill="#475569" />
            <rect x="5" y="33" width="22" height="1.8" rx="1" fill="#94a3b8" />
            <text
              x="5"
              y="42.5"
              fontSize="3.2"
              fontWeight="800"
              fill="#0b0c0e"
              fontFamily="ui-monospace, monospace"
            >
              ${24 + i * 5}
            </text>
            <rect x="38" y="38" width="18" height="6" rx="1" fill="#475569" />
            <text
              x="47"
              y="42.4"
              textAnchor="middle"
              fontSize="2.4"
              fontWeight="700"
              fill="white"
              fontFamily="ui-monospace, monospace"
            >
              BUY
            </text>
          </g>
        ))}
      </g>

      {/* ===== Browser chrome (above content) ===== */}
      <rect x="20" y="22" width="200" height="9" rx="6" fill="#f1f5f9" />
      <rect x="20" y="27" width="200" height="4" fill="#f1f5f9" />
      <circle cx="26" cy="26.5" r="1.4" fill="#ef4444" />
      <circle cx="30.5" cy="26.5" r="1.4" fill="#f59e0b" />
      <circle cx="35" cy="26.5" r="1.4" fill="#22c55e" />
      <rect x="60" y="23.5" width="140" height="6" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="0.3" />
      <text
        x="130"
        y="28"
        textAnchor="middle"
        fontSize="3"
        fill="#64748b"
        fontFamily="ui-monospace, monospace"
      >
        store.tilde.build
      </text>

      {/* ===== Slider handle (always on top, traverses browser body) ===== */}
      <g data-slider transform="translate(172 31)">
        {/* white outline */}
        <line x1="0" y1="0" x2="0" y2="111" stroke="white" strokeWidth="2.6" />
        {/* accent line */}
        <line x1="0" y1="0" x2="0" y2="111" stroke="rgb(var(--accent-rgb))" strokeWidth="1" />
        {/* draggable knob */}
        <circle cx="0" cy="74" r="5.5" fill="white" stroke="rgb(var(--accent-rgb))" strokeWidth="1.2" />
        <path
          d="M -1.6 72 L -3 74 L -1.6 76 M 1.6 72 L 3 74 L 1.6 76"
          stroke="rgb(var(--accent-rgb))"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* 5. Design — prompt → 4 design variants → AI cursor picks the winner */
function DesignVisual() {
  const ref = useRef<SVGSVGElement>(null);

  const CHIPS = ["minimal", "editorial", "bold", "playful"] as const;
  const SELECTED_CHIP = "bold"; // matches v3
  const SELECTED_IDX = 2; // v3

  useVisualAnim(ref, () => {
    const root = ref.current!;
    const promptClip = root.querySelector<SVGElement>("[data-prompt-clip]");
    const caret = root.querySelector<SVGElement>("[data-caret]");
    const genBtn = root.querySelector<SVGElement>("[data-gen-btn]");
    const burst = root.querySelector<SVGElement>("[data-gen-burst]");
    const variants = root.querySelectorAll<SVGElement>("[data-variant]");
    const cursor = root.querySelector<SVGElement>("[data-cursor]");
    const selectedRing = root.querySelector<SVGElement>("[data-selected-ring]");
    const check = root.querySelector<SVGElement>("[data-selected-check]");
    const boldChip = root.querySelector<SVGElement>("[data-chip-bold]");
    const boldChipText = root.querySelector<SVGElement>("[data-chip-bold-text]");

    if (!variants.length || !promptClip) return;

    /* Caret blink — continuous */
    if (caret) {
      gsap.to(caret, {
        opacity: 0,
        duration: 0.45,
        ease: "steps(1)",
        repeat: -1,
        yoyo: true,
      });
    }

    /* Master loop */
    const tl = gsap.timeline({ repeat: -1 });

    // Reset
    tl.set(promptClip, { attr: { width: 0 } });
    tl.set(variants, { opacity: 0, y: 8 });
    if (cursor) tl.set(cursor, { x: 80, y: -16, opacity: 0 });
    if (selectedRing)
      tl.set(selectedRing, {
        opacity: 0,
        scale: 1.18,
        transformOrigin: "50% 50%",
      });
    if (check) tl.set(check, { opacity: 0, scale: 0.4, transformOrigin: "center" });
    if (boldChip) tl.set(boldChip, { attr: { fill: "#f1f5f9" } });
    if (boldChipText) tl.set(boldChipText, { attr: { fill: "#475569" } });

    // Hold blank prompt briefly
    tl.to({}, { duration: 0.3 });

    // Type out the prompt
    tl.to(promptClip, {
      attr: { width: 92 },
      duration: 2.0,
      ease: "steps(22)",
    });

    // Generate button click
    if (genBtn) {
      tl.to(genBtn, {
        scale: 0.92,
        duration: 0.1,
        transformOrigin: "center",
        ease: "power2.out",
      })
        .to(genBtn, {
          scale: 1,
          duration: 0.18,
          ease: "back.out(2.2)",
        });
    }
    if (burst) {
      tl.fromTo(
        burst,
        { scale: 0.3, opacity: 0.7, transformOrigin: "center" },
        { scale: 2.2, opacity: 0, duration: 0.6, ease: "sine.out" },
        "<",
      );
    }

    // Variants stagger in
    variants.forEach((v, i) => {
      tl.to(
        v,
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        i === 0 ? ">+0.05" : "<+0.2",
      );
    });

    // AI cursor enters and clicks v3 (v3 spans y=64-112, center ≈ viewBox 145,86)
    if (cursor) {
      tl.to(cursor, { opacity: 1, duration: 0.2 }, ">+0.15")
        .to(cursor, {
          x: -75,
          y: -16,
          duration: 1.1,
          ease: "power2.inOut",
        })
        // click pulse
        .to(cursor, {
          scale: 0.82,
          duration: 0.1,
          transformOrigin: "center",
          ease: "power2.out",
        })
        .to(cursor, {
          scale: 1,
          duration: 0.15,
          ease: "back.out(2.4)",
        });
    }

    // Selected ring + check spring in, chip highlights
    if (selectedRing) {
      tl.to(
        selectedRing,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(2.2)",
        },
        "<-0.1",
      );
    }
    if (check) {
      tl.to(
        check,
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "back.out(2.4)",
        },
        "<",
      );
    }
    if (boldChip) {
      tl.to(boldChip, { attr: { fill: "rgb(var(--accent-rgb))" }, duration: 0.3 }, "<");
    }
    if (boldChipText) {
      tl.to(boldChipText, { attr: { fill: "#ffffff" }, duration: 0.3 }, "<");
    }

    // Hold the result
    tl.to({}, { duration: 1.8 });

    // Fade out variants + cursor + selection (prepare next cycle)
    tl.to([variants, cursor, selectedRing, check].filter(Boolean), {
      opacity: 0,
      duration: 0.45,
      ease: "sine.in",
    });
    if (boldChip) {
      tl.to(boldChip, { attr: { fill: "#f1f5f9" }, duration: 0.3 }, "<");
    }
    if (boldChipText) {
      tl.to(boldChipText, { attr: { fill: "#475569" }, duration: 0.3 }, "<");
    }
    tl.to(promptClip, { attr: { width: 0 }, duration: 0.3 }, "<");
    tl.to({}, { duration: 0.3 });
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 160"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="grad-soft-dz" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.14" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.02" />
        </linearGradient>
        <clipPath id="dz-prompt-clip">
          <rect data-prompt-clip x="34" y="44" width="0" height="12" />
        </clipPath>
        <linearGradient id="dz-ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="rgb(var(--accent-rgb))" />
        </linearGradient>
      </defs>

      <rect width="240" height="160" fill="url(#grad-soft-dz)" />

      {/* Prompt label */}
      <text
        x="24"
        y="40"
        fontSize="2.4"
        fontWeight="800"
        fill="rgb(var(--accent-rgb))"
        fillOpacity="0.65"
        fontFamily="ui-monospace, monospace"
      >
        AI PROMPT
      </text>

      {/* ===== Prompt input row ===== */}
      <rect
        x="24"
        y="43"
        width="152"
        height="13"
        rx="2.8"
        fill="white"
        stroke="rgb(var(--accent-rgb))"
        strokeOpacity="0.5"
        strokeWidth="0.7"
      />
      {/* sparkle icon */}
      <g transform="translate(30 49.5)">
        <path
          d="M 0 -2.4 L 0.6 -0.6 L 2.4 0 L 0.6 0.6 L 0 2.4 L -0.6 0.6 L -2.4 0 L -0.6 -0.6 Z"
          fill="url(#dz-ai-grad)"
        />
      </g>
      {/* typewriter text (clipped) */}
      <g clipPath="url(#dz-prompt-clip)">
        <text
          x="35"
          y="52"
          fontSize="3.8"
          fontWeight="700"
          fill="#0b0c0e"
          fontFamily="ui-monospace, monospace"
        >
          minimalist landing hero
        </text>
      </g>
      {/* blinking caret at end of full text */}
      <rect data-caret x="127" y="47" width="0.6" height="5.5" fill="rgb(var(--accent-rgb))" />

      {/* generate button */}
      <g data-gen-btn transform="translate(199 49.5)">
        {/* burst behind */}
        <circle data-gen-burst r="6" fill="rgb(var(--accent-rgb))" opacity="0" />
        <rect
          x="-17"
          y="-6"
          width="34"
          height="12"
          rx="6"
          fill="rgb(var(--accent-rgb))"
        />
        {/* mini sparkle */}
        <path
          d="M -10 0 L -9.5 -1 L -8.5 -1.4 L -9.5 -1.8 L -10 -2.8 L -10.5 -1.8 L -11.5 -1.4 L -10.5 -1 Z"
          fill="white"
        />
        <text
          x="2"
          y="1.5"
          textAnchor="middle"
          fontSize="3.4"
          fontWeight="800"
          fill="white"
          fontFamily="ui-monospace, monospace"
        >
          Generate
        </text>
      </g>

      {/* ===== Variant thumbnails ===== */}
      {[0, 1, 2, 3].map((i) => {
        const x = 22 + i * 50;
        const y = 64;
        const isWinner = i === SELECTED_IDX;
        return (
          // Outer group holds the static position; the inner [data-variant]
          // group is what GSAP animates. GSAP's x/y tweens REPLACE an
          // element's translate (they are absolute, not additive), so the
          // positioning translate must live on a separate group the tween
          // never touches — otherwise the fade-in y-nudge wipes out the
          // y=64 offset and the cards land on top of the prompt input.
          <g key={i} transform={`translate(${x} ${y})`}>
            <g data-variant>
            {/* card frame */}
            <rect
              width="46"
              height="48"
              rx="2.5"
              fill="white"
              stroke="rgb(var(--accent-rgb))"
              strokeOpacity={isWinner ? "0.5" : "0.18"}
              strokeWidth="0.5"
            />

            {/* Per-variant mini composition */}
            {i === 0 && (
              /* minimal */
              <g>
                <rect x="3" y="3" width="40" height="2" rx="0.5" fill="#e2e8f0" />
                <rect x="3" y="10" width="22" height="3" rx="0.7" fill="#0b0c0e" />
                <rect x="3" y="16" width="32" height="1.6" rx="0.5" fill="#cbd5e1" />
                <rect x="3" y="20" width="26" height="1.6" rx="0.5" fill="#cbd5e1" />
                <rect x="3" y="29" width="14" height="5" rx="1.5" fill="#0b0c0e" />
                <rect x="3" y="38" width="20" height="1.4" rx="0.5" fill="#e2e8f0" />
                <rect x="3" y="41" width="14" height="1.4" rx="0.5" fill="#e2e8f0" />
              </g>
            )}
            {i === 1 && (
              /* split image */
              <g>
                <rect x="3" y="3" width="18" height="42" rx="1.5" fill="#a78bfa" />
                <circle cx="12" cy="20" r="4" fill="white" fillOpacity="0.5" />
                <rect x="23" y="6" width="20" height="2.5" rx="0.7" fill="#0b0c0e" />
                <rect x="23" y="11" width="18" height="2" rx="0.5" fill="#0b0c0e" />
                <rect x="23" y="17" width="20" height="1.4" rx="0.5" fill="#94a3b8" />
                <rect x="23" y="21" width="16" height="1.4" rx="0.5" fill="#94a3b8" />
                <rect x="23" y="25" width="18" height="1.4" rx="0.5" fill="#94a3b8" />
                <rect x="23" y="36" width="16" height="6" rx="1.5" fill="rgb(var(--accent-rgb))" />
              </g>
            )}
            {i === 2 && (
              /* BOLD centered — the winner */
              <g>
                <rect x="3" y="3" width="40" height="42" rx="1.5" fill="#0a0a0a" />
                <rect x="14" y="8" width="18" height="1.6" rx="0.5" fill="white" fillOpacity="0.55" />
                <text
                  x="23"
                  y="25"
                  textAnchor="middle"
                  fontSize="6"
                  fontWeight="800"
                  fontStyle="italic"
                  fill="white"
                  fontFamily="serif"
                >
                  AURORA
                </text>
                <rect x="14" y="29" width="18" height="1.4" rx="0.5" fill="white" fillOpacity="0.45" />
                <rect x="14" y="32" width="18" height="1.4" rx="0.5" fill="white" fillOpacity="0.45" />
                <rect x="14" y="38" width="18" height="4" rx="2" fill="white" />
                <text
                  x="23"
                  y="41"
                  textAnchor="middle"
                  fontSize="2.2"
                  fontWeight="800"
                  fill="#0a0a0a"
                  fontFamily="ui-monospace, monospace"
                >
                  SHOP
                </text>
              </g>
            )}
            {i === 3 && (
              /* editorial */
              <g>
                <rect x="3" y="3" width="40" height="20" rx="1.5" fill="url(#dz-ai-grad)" />
                <ellipse cx="23" cy="13" rx="9" ry="6" fill="white" fillOpacity="0.25" />
                <rect x="3" y="27" width="14" height="2.5" rx="0.5" fill="#0b0c0e" />
                <rect x="3" y="33" width="40" height="1.6" rx="0.5" fill="#94a3b8" />
                <rect x="3" y="37" width="32" height="1.6" rx="0.5" fill="#94a3b8" />
                <rect x="3" y="41" width="38" height="1.6" rx="0.5" fill="#94a3b8" />
              </g>
            )}

            {/* Selected ring + check on v3 only */}
            {isWinner && (
              <>
                <rect
                  data-selected-ring
                  x="-2"
                  y="-2"
                  width="50"
                  height="52"
                  rx="3.5"
                  fill="none"
                  stroke="rgb(var(--accent-rgb))"
                  strokeWidth="1.4"
                />
                <g data-selected-check transform="translate(42 4)">
                  <circle r="3" fill="#22c55e" />
                  <path
                    d="M -1.4 0 L -0.4 1.1 L 1.5 -1.1"
                    stroke="white"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </>
            )}
            </g>
          </g>
        );
      })}

      {/* ===== AI cursor (positioned in viewBox-space coords) ===== */}
      {/* Outer group = static base position; inner [data-cursor] is tweened.
          GSAP's x/y replace an element's translate, so the base position
          lives on the outer group and the tween's offsets compose on top. */}
      <g transform="translate(220 100)">
        <g data-cursor>
        {/* pointer */}
        <path
          d="M 0 0 L 0 10 L 3 7.5 L 5 11.5 L 6.8 10.5 L 4.8 6.5 L 8.5 6 Z"
          fill="white"
          stroke="rgb(var(--accent-rgb))"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* AI label */}
        <g transform="translate(10 10)">
          <rect x="0" y="0" width="14" height="6" rx="3" fill="url(#dz-ai-grad)" />
          <text
            x="7"
            y="4.3"
            textAnchor="middle"
            fontSize="3.4"
            fontWeight="900"
            fill="white"
            fontFamily="ui-monospace, monospace"
          >
            AI
          </text>
        </g>
        </g>
      </g>

      {/* ===== Style chips ===== */}
      {CHIPS.map((chip, i) => {
        const x = 26 + i * 50;
        const isSelected = chip === SELECTED_CHIP;
        const dataAttrs = isSelected
          ? { "data-chip-bold": true }
          : {};
        const textAttrs = isSelected
          ? { "data-chip-bold-text": true }
          : {};
        return (
          <g key={chip} transform={`translate(${x} 118)`}>
            <rect
              {...(dataAttrs as Record<string, boolean>)}
              x="0"
              y="0"
              width="42"
              height="7.5"
              rx="3.75"
              fill="#f1f5f9"
              stroke="#e2e8f0"
              strokeWidth="0.3"
            />
            <text
              {...(textAttrs as Record<string, boolean>)}
              x="21"
              y="5.2"
              textAnchor="middle"
              fontSize="3.2"
              fontWeight="700"
              fill="#475569"
              fontFamily="ui-monospace, monospace"
            >
              {chip}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* 6. AI Integration — an LLM agent runs a tool-use loop: the core dispatches
   a packet to each tool in turn (call → tool spins → result returns), tools
   light up and check off, a progress bar fills, then the run resolves. */
function AIVisual() {
  const ref = useRef<SVGSVGElement>(null);

  const TOOLS = [
    { key: "search", label: "search", color: "#22d3ee", y: 44 },
    { key: "code", label: "code", color: "#a78bfa", y: 64 },
    { key: "query", label: "query", color: "#f59e0b", y: 84 },
    { key: "http", label: "http", color: "#34d399", y: 104 },
  ] as const;

  const CORE = { x: 74, y: 84 };
  const CHIP = { x: 146, w: 60, h: 15 };
  const midY = (ty: number) => ty + CHIP.h / 2;

  useVisualAnim(ref, () => {
    const root = ref.current!;
    const q = (s: string) => root.querySelector<SVGElement>(s);
    const all = (s: string) => Array.from(root.querySelectorAll<SVGElement>(s));

    /* --- ambient (always running) --- */
    const orbit = q("[data-orbit]");
    if (orbit)
      gsap.to(orbit, { rotation: 360, transformOrigin: "center", duration: 22, ease: "none", repeat: -1 });
    const spark = q("[data-core-spark]");
    if (spark)
      gsap.to(spark, { rotation: 360, transformOrigin: "center", duration: 9, ease: "none", repeat: -1 });
    const runDot = q("[data-run-dot]");
    if (runDot)
      gsap.to(runDot, { scale: 1.5, transformOrigin: "center", duration: 0.7, ease: "sine.inOut", repeat: -1, yoyo: true });
    const corePulse = q("[data-core-pulse]");
    if (corePulse)
      gsap.fromTo(
        corePulse,
        { scale: 0.7, opacity: 0.5, transformOrigin: "center" },
        { scale: 1.55, opacity: 0, duration: 1.9, ease: "sine.out", repeat: -1 },
      );
    // spinners rotate continuously; their visibility is toggled in the loop
    all("[data-tool-spin]").forEach((s) =>
      gsap.to(s, { rotation: 360, transformOrigin: "center", duration: 0.85, ease: "none", repeat: -1 }),
    );

    const packet = q("[data-packet]");
    const progress = q("[data-progress]");
    const answer = q("[data-answer]");
    const bgs = all("[data-tool-bg]");
    const icons = all("[data-tool-icon]");
    const spins = all("[data-tool-spin]");
    const checks = all("[data-tool-check]");
    const links = all("[data-link]");
    if (!packet || bgs.length !== TOOLS.length) return;

    const tl = gsap.timeline({ repeat: -1 });

    /* reset */
    tl.set(packet, { x: 0, y: 0, opacity: 0 })
      .set(bgs, { attr: { fill: "#16161c" } }, 0)
      .set(icons, { opacity: 0.4 }, 0)
      .set(spins, { opacity: 0 }, 0)
      .set(checks, { opacity: 0, scale: 0.4, transformOrigin: "center" }, 0)
      .set(links, { opacity: 0.16 }, 0)
      .set(answer, { opacity: 0, scale: 0.8, transformOrigin: "left center" }, 0);
    if (progress) tl.set(progress, { scaleX: 0, transformOrigin: "left center" }, 0);
    tl.to({}, { duration: 0.5 });

    /* tool-call loop */
    TOOLS.forEach((t, i) => {
      const dx = CHIP.x - CORE.x; // packet travel from core edge to chip
      const dy = midY(t.y) - CORE.y;
      // dispatch: light the spoke, send the packet out
      tl.to(links[i], { opacity: 0.9, duration: 0.2 })
        .to(packet, { opacity: 1, duration: 0.15 }, "<")
        .to(packet, { x: dx, y: dy, duration: 0.5, ease: "power1.inOut" });
      // tool activates: bg lifts, icon brightens, spinner shows
      tl.to(bgs[i], { attr: { fill: "#1f2030" }, duration: 0.2 }, ">-0.05")
        .to(icons[i], { opacity: 1, duration: 0.2 }, "<")
        .fromTo(
          bgs[i],
          { scale: 1, transformOrigin: "center" },
          { scale: 1.06, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" },
          "<",
        )
        .to(spins[i], { opacity: 1, duration: 0.15 }, "<")
        .to(packet, { opacity: 0, duration: 0.12 }, "<");
      // working
      tl.to({}, { duration: 0.4 });
      // complete: spinner → check, result packet returns to core
      tl.to(spins[i], { opacity: 0, duration: 0.12 })
        .to(checks[i], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, "<")
        .set(packet, { x: dx, y: dy })
        .to(packet, { opacity: 1, duration: 0.12 }, "<")
        .to(packet, { x: 0, y: 0, duration: 0.45, ease: "power1.inOut" })
        .to(packet, { opacity: 0, duration: 0.12 }, ">-0.12")
        .to(links[i], { opacity: 0.16, duration: 0.3 }, "<");
      if (progress)
        tl.to(progress, { scaleX: (i + 1) / TOOLS.length, duration: 0.4, ease: "power2.out" }, "<");
      tl.to({}, { duration: 0.2 });
    });

    /* resolve */
    tl.to(answer, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, ">0.15");
    tl.to({}, { duration: 1.8 });
  });

  const toolIcon = (key: string, c: string) => {
    switch (key) {
      case "search":
        return (
          <>
            <circle cx="-0.6" cy="-0.6" r="2" fill="none" stroke={c} strokeWidth="0.9" />
            <line x1="0.9" y1="0.9" x2="2.5" y2="2.5" stroke={c} strokeWidth="0.9" strokeLinecap="round" />
          </>
        );
      case "code":
        return (
          <path
            d="M -1.4 -2.2 L -3 0 L -1.4 2.2 M 1.4 -2.2 L 3 0 L 1.4 2.2"
            fill="none"
            stroke={c}
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case "query":
        return (
          <>
            <ellipse cx="0" cy="-1.8" rx="2.4" ry="0.9" fill="none" stroke={c} strokeWidth="0.8" />
            <path d="M -2.4 -1.8 V 1.8 a 2.4 0.9 0 0 0 4.8 0 V -1.8" fill="none" stroke={c} strokeWidth="0.8" />
            <ellipse cx="0" cy="0" rx="2.4" ry="0.9" fill="none" stroke={c} strokeWidth="0.5" strokeOpacity="0.6" />
          </>
        );
      default: // http — globe
        return (
          <>
            <circle r="2.4" fill="none" stroke={c} strokeWidth="0.8" />
            <ellipse rx="1" ry="2.4" fill="none" stroke={c} strokeWidth="0.6" />
            <line x1="-2.4" y1="0" x2="2.4" y2="0" stroke={c} strokeWidth="0.6" />
          </>
        );
    }
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 160"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <GradientDefs id="ai" />
      <defs>
        <radialGradient id="ai-core-grad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="var(--shimmer-mid, #3b82f6)" />
          <stop offset="58%" stopColor="rgb(var(--accent-rgb))" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <filter id="ai-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      <rect width="240" height="160" fill="url(#grad-soft-ai)" />

      {/* agent console card */}
      <rect
        x="16"
        y="30"
        width="208"
        height="104"
        rx="7"
        fill="#0c0c11"
        stroke="rgb(var(--accent-rgb))"
        strokeOpacity="0.28"
        strokeWidth="0.6"
      />
      {/* faint interior glow */}
      <ellipse cx="74" cy="84" rx="68" ry="42" fill="url(#grad-ai)" opacity="0.07" />

      {/* === header === */}
      <text x="24" y="42" fontSize="5" fontWeight="800" fill="white" fontFamily="serif" fontStyle="italic">
        agent
      </text>
      <text x="46" y="42" fontSize="3" fill="#9ca3af" fontFamily="ui-monospace, monospace">
        · resolve ticket #4821
      </text>
      <g transform="translate(178 36)">
        <rect width="40" height="7" rx="3.5" fill="#10241a" />
        <circle data-run-dot cx="5" cy="3.5" r="1.3" fill="#34d399" />
        <text x="9.5" y="4.9" fontSize="2.9" fontWeight="800" fill="#34d399" fontFamily="ui-monospace, monospace">
          RUNNING
        </text>
      </g>

      {/* === connector spokes (behind core + chips) === */}
      {TOOLS.map((t, i) => (
        <line
          key={i}
          data-link
          x1="86"
          y1={CORE.y}
          x2={CHIP.x}
          y2={midY(t.y)}
          stroke="rgb(var(--accent-rgb))"
          strokeWidth="0.8"
          strokeOpacity="0.16"
        />
      ))}

      {/* === LLM core === */}
      <g transform={`translate(${CORE.x} ${CORE.y})`}>
        <circle data-core-pulse r="13" fill="none" stroke="rgb(var(--accent-rgb))" strokeWidth="1" />
        <g data-orbit>
          <circle r="19" fill="none" stroke="url(#grad-ai)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="19" cy="0" r="1.3" fill="rgb(var(--accent-rgb))" />
          <circle cx="-19" cy="0" r="1" fill="var(--shimmer-mid, #3b82f6)" />
        </g>
        <circle r="12" fill="url(#ai-core-grad)" />
        <circle r="12" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="0.6" />
        <g data-core-spark>
          <path d="M 0 -5 L 1.1 -1.1 L 5 0 L 1.1 1.1 L 0 5 L -1.1 1.1 L -5 0 L -1.1 -1.1 Z" fill="white" fillOpacity="0.95" />
        </g>
        <text x="0" y="9.6" textAnchor="middle" fontSize="3" fontWeight="800" fill="white" fillOpacity="0.7" fontFamily="ui-monospace, monospace">
          LLM
        </text>
      </g>

      {/* === tool chips === */}
      {TOOLS.map((t) => (
        <g key={t.key} transform={`translate(${CHIP.x} ${t.y})`}>
          <rect data-tool-bg width={CHIP.w} height={CHIP.h} rx="3" fill="#16161c" stroke={t.color} strokeOpacity="0.4" strokeWidth="0.5" />
          <g data-tool-icon transform="translate(9 7.5)">{toolIcon(t.key, t.color)}</g>
          <text x="19" y="9.3" fontSize="3.6" fontWeight="700" fill="#e5e7eb" fontFamily="ui-monospace, monospace">
            {t.label}
          </text>
          {/* spinner (active) */}
          <g data-tool-spin transform="translate(51 7.5)" opacity="0">
            <path d="M 0 -2.4 A 2.4 2.4 0 1 1 -2.4 0" fill="none" stroke={t.color} strokeWidth="0.9" strokeLinecap="round" />
          </g>
          {/* check (done) */}
          <g data-tool-check transform="translate(51 7.5)" opacity="0">
            <circle r="2.8" fill={t.color} />
            <path d="M -1.3 0.1 L -0.4 1 L 1.4 -1.1" fill="none" stroke="#0a0a0a" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      ))}

      {/* traveling packet (core ↔ tool) */}
      <circle data-packet cx={CORE.x} cy={CORE.y} r="2.2" fill="rgb(var(--accent-rgb))" filter="url(#ai-glow)" opacity="0" />

      {/* === footer: progress + resolution === */}
      <rect x="24" y="127" width="96" height="1.6" rx="0.8" fill="#27272f" />
      <rect data-progress x="24" y="127" width="96" height="1.6" rx="0.8" fill="rgb(var(--accent-rgb))" />
      <g data-answer transform="translate(128 124)">
        <circle cx="3" cy="3.5" r="3" fill="#34d399" />
        <path d="M 1.6 3.6 L 2.6 4.6 L 4.5 2.3" fill="none" stroke="#0a0a0a" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="8.5" y="4.9" fontSize="3.6" fontWeight="800" fill="#e5e7eb" fontFamily="ui-monospace, monospace">
          ticket resolved
        </text>
      </g>
    </svg>
  );
}
