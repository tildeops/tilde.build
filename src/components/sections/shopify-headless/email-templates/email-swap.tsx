"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { SectionFrame } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { PhoneFrame } from "./phone-frame";
import { DefaultEmail } from "./default-email";
import { CustomEmail } from "./custom-email";

const STEPS = [
  {
    id: "default",
    label: "Default Shopify",
    blurb:
      "Table layout. Times New Roman. Footer literally says “Powered by Shopify”.",
  },
  {
    id: "custom",
    label: "Tilde custom",
    blurb:
      "On-brand. Editorial. The same energy as the site they bought from.",
  },
];

export function EmailTemplateSwap() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div id="email-templates">
        <EmailMobileStack />
      </div>
    );
  }
  // Sticky-pinned scroll-driven reveal runs on every viewport size. The pin
  // uses CSS `position: sticky` + a native scroll listener — no GSAP pin —
  // which works correctly on iOS Safari without fighting momentum scroll.
  return (
    <div id="email-templates">
      <EmailSwap />
    </div>
  );
}

/* ============================================================ */

function EmailSwap() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneScreenRef = useRef<HTMLDivElement | null>(null);
  const progressRailRef = useRef<HTMLDivElement | null>(null);
  const customClipRef = useRef<HTMLDivElement | null>(null);
  const separatorRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Sticky-pinned section. Native scroll listener drives the active step + the
  // custom-email reveal clip + the progress rail (same shape as messaging-bots).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const N = STEPS.length;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const progress = scrolled / total;
      // Active step: 0 for first half, 1 for second half.
      const idx = Math.min(N - 1, Math.floor(progress * N * 0.9999));
      setActive((prev) => (prev !== idx ? idx : prev));

      // Drive the custom-email clip + the matching separator bar.
      const pct = Math.round(progress * 100);
      if (customClipRef.current) {
        customClipRef.current.style.height = `${pct}%`;
      }
      if (separatorRef.current) {
        // Fade in/out near the ends so the bar doesn't sit at the very top/bottom edges
        const edgeFade = progress < 0.02 || progress > 0.98 ? 0 : 1;
        separatorRef.current.style.top = `${pct}%`;
        separatorRef.current.style.opacity = String(edgeFade);
      }
      if (progressRailRef.current) {
        progressRailRef.current.style.transform = `scaleY(${progress})`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Brief phone fade when active step changes
  useGSAP(
    () => {
      const el = phoneScreenRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0.85 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    },
    { dependencies: [active] }
  );

  const handleStepClick = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const N = STEPS.length;
    const sectionTopAbs = section.getBoundingClientRect().top + window.scrollY;
    const total = section.offsetHeight - window.innerHeight;
    const target = sectionTopAbs + ((i + 0.5) / N) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${STEPS.length * 100}svh` }}
    >
      {/* Sticky stage — whole section stays in viewport while user scrolls */}
      <div className="sticky top-0 flex h-[100svh] w-full items-start justify-center overflow-hidden px-4 pt-12 pb-6 sm:px-6 md:items-center md:overflow-visible md:px-10 md:pt-0 md:pb-0 lg:px-16">
        <div className="grid w-full max-w-[1240px] gap-4 md:grid-cols-12 md:items-center md:gap-12">
          {/* Phone (centerpiece). On mobile this is order-2 so the heading
              renders above; on desktop it moves to order-1 (left column). */}
          <div className="order-2 md:order-1 md:col-span-5">
            <div ref={phoneScreenRef} className="flex w-full justify-center">
              <div className="w-full max-w-[min(260px,calc((100svh-256px)*9/19))] md:max-w-none">
              <PhoneFrame>
                <div className="relative h-full w-full">
                  <DefaultEmail />

                  {/* Custom email — vertical clip reveal driven by scroll progress */}
                  <div
                    ref={customClipRef}
                    className="absolute inset-x-0 top-0 z-20 overflow-hidden"
                    style={{ height: "0%", willChange: "height" }}
                  >
                    <div className="relative h-full w-full">
                      <CustomEmail />
                    </div>
                  </div>

                  {/* Horizontal separator handle — sits at the wipe line */}
                  <div
                    ref={separatorRef}
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 z-30"
                    style={{
                      top: "0%",
                      height: "2px",
                      backgroundColor: "var(--color-accent)",
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.18), 0 0 24px rgb(var(--accent-rgb) / 0.55)",
                      transform: "translateY(-1px)",
                      opacity: 0,
                      willChange: "top, opacity",
                    }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-on-accent"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 24px -8px rgba(0,0,0,0.5)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M4 5 L8 1 L12 5 M4 11 L8 15 L12 11 M8 1 V15" />
                      </svg>
                    </div>
                  </div>
                </div>
              </PhoneFrame>
              </div>
            </div>
          </div>

          {/* Copy + step switcher. Order-1 on mobile (above phone), col-span-7
              on desktop (right side). Step descriptions hide on mobile to keep
              the sticky stage within 100svh. */}
          <div className="order-1 md:order-2 md:col-span-7 md:pl-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
                <span
                  className="size-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
                />
                <span className="text-[12px] font-medium text-ink-muted">
                  The receipt is a brand moment
                </span>
              </div>
            </FadeUp>
            <RevealLines
              as="h2"
              className="mt-3 font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(1.5rem,5.5vw,2.4rem)] md:mt-4"
            >
              Your post-purchase moment shouldn&apos;t look like 2012.
            </RevealLines>
            <FadeUp delay={0.2}>
              <p className="mt-3 hidden max-w-xl text-[14px] text-ink-muted leading-relaxed md:mt-4 md:block md:text-[15px]">
                Order confirmations, shipping pings, return labels — every
                automated email matches the storefront they bought from.
                Designed in Figma, built in React Email, deployed to your
                Shopify backend.
              </p>
            </FadeUp>

            {/* Compact mobile label row — shows which step is active without
                taking the full step-list height. Hidden on desktop. */}
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.18em] md:hidden">
              <span
                className={`flex items-center gap-1.5 transition-colors duration-300 ${
                  active === 0 ? "text-ink" : "text-ink-muted/50"
                }`}
              >
                <span
                  className={`inline-block size-2 rounded-sm transition-colors duration-300 ${
                    active === 0 ? "bg-ink" : "bg-ink-muted/30"
                  }`}
                  aria-hidden
                />
                Default Shopify
              </span>
              <span
                className={`flex items-center gap-1.5 transition-colors duration-300 ${
                  active === 1 ? "text-accent" : "text-ink-muted/50"
                }`}
              >
                Tilde custom
                <span
                  className={`inline-block size-2 rounded-sm transition-colors duration-300 ${
                    active === 1 ? "bg-accent" : "bg-ink-muted/30"
                  }`}
                  style={
                    active === 1
                      ? { boxShadow: "0 0 8px rgb(var(--accent-rgb) / 0.5)" }
                      : undefined
                  }
                  aria-hidden
                />
              </span>
            </div>

            {/* Full step list — hidden on mobile, shown on desktop */}
            <div className="mt-7 hidden gap-6 md:flex">
              {/* Vertical progress rail */}
              <div className="relative w-[2px] shrink-0 overflow-hidden rounded-full bg-rule">
                <div
                  ref={progressRailRef}
                  className="absolute inset-0 origin-top bg-accent"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>

              <ul className="flex-1 space-y-2.5">
                {STEPS.map((s, i) => (
                  <li key={s.id} data-step={i}>
                    <button
                      type="button"
                      onClick={() => handleStepClick(i)}
                      className={`group flex w-full items-start gap-4 rounded-xl px-4 py-3 text-left transition-all duration-500 ${
                        i === active
                          ? "bg-bg-elevated ring-1 ring-accent/40 shadow-[0_4px_20px_-8px_rgb(var(--accent-rgb)/0.18)]"
                          : "bg-transparent hover:bg-bg-elevated/60"
                      }`}
                    >
                      <span
                        className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-semibold transition-colors ${
                          i === active
                            ? "bg-accent text-on-accent"
                            : "bg-bg-elevated text-ink-muted ring-1 ring-rule"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block text-[15px] font-semibold leading-tight tracking-[-0.005em] ${
                            i === active ? "text-ink" : "text-ink-muted"
                          }`}
                        >
                          {s.label}
                        </span>
                        <span className="mt-1 block text-[12.5px] text-ink-muted leading-snug">
                          {s.blurb}
                        </span>
                      </span>
                      {i === active && (
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block size-2 shrink-0 rounded-full bg-accent"
                          style={{
                            boxShadow: "0 0 12px rgb(var(--accent-rgb) / 0.6)",
                          }}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted md:mt-6">
              Scroll to swap ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Mobile fallback                                               */
/* ============================================================ */

function EmailMobileStack() {
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
              The receipt is a brand moment
            </span>
          </div>
        </FadeUp>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-2xl font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(2rem,5vw,3.2rem)]"
        >
          Your post-purchase moment shouldn&apos;t look like 2012.
        </RevealLines>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Default Shopify
          </p>
          <PhoneFrame>
            <div className="relative h-full w-full">
              <DefaultEmail />
            </div>
          </PhoneFrame>
        </div>
        <div>
          <p className="mb-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            Tilde custom
          </p>
          <PhoneFrame>
            <div className="relative h-full w-full">
              <CustomEmail />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </SectionFrame>
  );
}
