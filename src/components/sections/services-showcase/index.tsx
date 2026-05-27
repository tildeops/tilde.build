"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { serviceBeats, type ServiceBeat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { LaptopVisual } from "./laptop-visual";
import { PhoneVisual } from "./phone-visual";

/**
 * The marquee section. Replaces the previous Offerings + EditorialSweep with
 * a single pinned scroll showcase that cycles through five service beats.
 *
 * Desktop: section is (N+1)*100vh tall; the inner sticks at top and a native
 * scroll listener drives `active`. Left column shows the clickable step list
 * with a progress rail; right column shows a device frame that swaps between
 * laptop and phone shapes per beat.
 *
 * Mobile: standard non-pinned vertical stack — each beat gets its own card.
 */
export function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRailRef = useRef<HTMLDivElement | null>(null);
  const mobileProgressRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Pin runway: extra +1 frame at the end so the last beat is held for a
  // full screen before the section releases (matches MessagingBots tuning).
  const [sectionHeightVh, setSectionHeightVh] = useState(
    (serviceBeats.length + 1) * 100,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const apply = () => {
      // On mobile we switch to a non-pinned vertical layout, so the section
      // is just `auto`-tall. The state value here is only used on desktop.
      setSectionHeightVh(mq.matches ? 0 : (serviceBeats.length + 1) * 100);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Desktop scroll handler — maps scroll progress to active beat index +
  // updates the progress rails.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
    if (isMobile) return;

    const N = serviceBeats.length;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const progress = scrolled / total;
      const idx = Math.min(N - 1, Math.floor(progress * N * 0.9999));
      setActive((prev) => (prev !== idx ? idx : prev));
      if (progressRailRef.current) {
        progressRailRef.current.style.transform = `scaleY(${progress})`;
      }
      if (mobileProgressRef.current) {
        mobileProgressRef.current.style.transform = `scaleX(${progress})`;
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
  }, [sectionHeightVh]);

  // Crossfade the device stage on active change.
  useGSAP(
    () => {
      const el = stageRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 16, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [active] },
  );

  const handleStepClick = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const N = serviceBeats.length;
    const sectionTopAbs = section.getBoundingClientRect().top + window.scrollY;
    const total = section.offsetHeight - window.innerHeight;
    const target = sectionTopAbs + ((i + 0.5) / N) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const beat = serviceBeats[active];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full"
      style={
        sectionHeightVh > 0 ? { height: `${sectionHeightVh}vh` } : undefined
      }
    >
      {/* Desktop pinned stage */}
      <div className="sticky top-0 hidden h-[100svh] w-full md:flex md:items-center md:justify-center md:px-10 lg:px-16">
        <div className="grid w-full max-w-[1240px] gap-10 md:grid-cols-12 md:items-center lg:gap-14">
          {/* Copy column */}
          <div className="md:col-span-5">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
                <span
                  className="size-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
                />
                <span className="text-[12px] font-medium text-ink-muted">
                  What we ship
                </span>
              </div>
            </FadeUp>
            <RevealLines
              as="h2"
              className="mt-4 font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(1.8rem,3.4vw,2.6rem)]"
            >
              Five surfaces. <span className="italic">One studio.</span>
            </RevealLines>

            {/* Active beat copy */}
            <div className="mt-7" key={`copy-${active}`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                {beat.eyebrow}
              </p>
              <h3
                key={`title-${active}`}
                className="mt-3 font-display text-[clamp(1.25rem,2.2vw,1.65rem)] font-extrabold leading-tight tracking-[-0.015em] text-ink"
              >
                {beat.title}
              </h3>
              <p
                key={`body-${active}`}
                className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-muted"
              >
                {beat.body}
              </p>
              <ul className="mt-4 space-y-1.5">
                {beat.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[13px] text-ink"
                  >
                    <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {beat.cta && (
                <Link
                  href={beat.cta.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-transform duration-300 hover:translate-x-0.5"
                >
                  {beat.cta.label}
                  <ArrowRight className="size-3.5" />
                </Link>
              )}
            </div>

            {/* Step list */}
            <div className="mt-8 flex gap-5">
              <div className="relative w-[2px] shrink-0 overflow-hidden rounded-full bg-rule">
                <div
                  ref={progressRailRef}
                  className="absolute inset-0 origin-top bg-accent"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
              <ol className="flex-1 space-y-1">
                {serviceBeats.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => handleStepClick(i)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors duration-300",
                        i === active
                          ? "text-ink"
                          : "text-ink-muted hover:text-ink",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex size-5 shrink-0 items-center justify-center rounded-md font-mono text-[9px] font-semibold transition-colors",
                          i === active
                            ? "bg-accent text-on-accent"
                            : "bg-bg-elevated ring-1 ring-rule",
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1 truncate text-[13.5px] font-semibold">
                        {s.eyebrow.replace(/^~ \d+ \/ /, "")}
                      </span>
                      {i === active && (
                        <span
                          aria-hidden
                          className="inline-block size-1.5 shrink-0 rounded-full bg-accent"
                          style={{
                            boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)",
                          }}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Scroll to step through ↓
            </p>
          </div>

          {/* Device stage */}
          <div className="md:col-span-7">
            <div ref={stageRef} className="relative mx-auto">
              {beat.device === "laptop" ? (
                <LaptopVisual variant={beat.visual} />
              ) : (
                <PhoneVisual variant={beat.visual} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile non-pinned stack */}
      <div className="block md:hidden">
        <div className="px-4 pt-4 pb-2 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
            <span
              className="size-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
            />
            <span className="text-[12px] font-medium text-ink-muted">
              What we ship
            </span>
          </div>
          <h2 className="mt-4 font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(1.6rem,5vw,2.2rem)]">
            Five surfaces. <span className="italic">One studio.</span>
          </h2>
        </div>

        <div className="space-y-8 px-4 py-6 sm:px-6">
          {serviceBeats.map((b) => (
            <article
              key={b.id}
              className="rounded-2xl border border-rule bg-bg-elevated p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                {b.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-[20px] font-extrabold leading-tight tracking-[-0.015em] text-ink">
                {b.title}
              </h3>
              <div className="mt-4">
                {b.device === "laptop" ? (
                  <LaptopVisual variant={b.visual} />
                ) : (
                  <PhoneVisual variant={b.visual} />
                )}
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-ink-muted">
                {b.body}
              </p>
              <ul className="mt-3 space-y-1.5">
                {b.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-[13px] text-ink"
                  >
                    <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {b.cta && (
                <Link
                  href={b.cta.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent"
                >
                  {b.cta.label}
                  <ArrowRight className="size-3.5" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export type { ServiceBeat };
