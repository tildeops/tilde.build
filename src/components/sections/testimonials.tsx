"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionFrame } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

const ROTATE_MS = 8000;

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];

  const ringRef = useRef<SVGCircleElement | null>(null);
  const ringTween = useRef<gsap.core.Tween | null>(null);
  const captionRef = useRef<HTMLElement | null>(null);

  const next = () => setI((x) => (x + 1) % testimonials.length);
  const prev = () =>
    setI((x) => (x - 1 + testimonials.length) % testimonials.length);

  // Autoplay
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (paused || reduced) return;
    const id = setInterval(
      () => setI((x) => (x + 1) % testimonials.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [paused, i]);

  // Caption swap animation
  useGSAP(
    () => {
      const cap = captionRef.current;
      if (!cap) return;
      gsap.fromTo(
        cap,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "editorial" }
      );
    },
    { dependencies: [i] }
  );

  // Active-dot countdown ring
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    ringTween.current?.kill();
    gsap.set(ring, { strokeDashoffset: 56 });
    if (paused || reduced) return;
    ringTween.current = gsap.to(ring, {
      strokeDashoffset: 0,
      duration: ROTATE_MS / 1000,
      ease: "none",
    });
    return () => {
      ringTween.current?.kill();
    };
  }, [i, paused]);

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
              What people say
            </span>
          </div>
        </FadeUp>
      </div>

      <figure
        className="mx-auto mt-10 max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <RevealLines
          key={i}
          as="blockquote"
          duration={0.9}
          stagger={0.08}
          start="top 95%"
          className="font-display text-2xl md:text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-center text-ink"
        >
          <span className="text-accent" aria-hidden>
            &ldquo;
          </span>
          {t.quote}
          <span className="text-accent" aria-hidden>
            &rdquo;
          </span>
        </RevealLines>
        <figcaption
          key={`cap-${i}`}
          ref={captionRef as React.RefObject<HTMLElement>}
          className="mt-8 text-center"
        >
          <p className="font-medium text-ink">{t.name}</p>
          <p className="text-sm text-ink-muted">
            {t.role}
            {t.company && t.company !== "—" ? ` · ${t.company}` : ""}
          </p>
        </figcaption>
      </figure>

      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          className="inline-flex size-10 items-center justify-center rounded-full border border-rule text-ink hover:border-accent hover:text-accent transition-colors"
          aria-label="Previous testimonial"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={cn(
                "relative inline-flex items-center justify-center transition-all duration-500",
                idx === i
                  ? "size-5"
                  : "h-1.5 w-1.5 rounded-full bg-rule hover:bg-ink-muted"
              )}
            >
              {idx === i && (
                <>
                  <span className="absolute inset-1 rounded-full bg-accent" />
                  <svg
                    viewBox="0 0 22 22"
                    className="absolute inset-0 size-full -rotate-90"
                    aria-hidden
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="9"
                      fill="none"
                      stroke="rgb(var(--accent-rgb) / 0.18)"
                      strokeWidth="1.5"
                    />
                    <circle
                      ref={ringRef}
                      cx="11"
                      cy="11"
                      r="9"
                      fill="none"
                      stroke="rgb(var(--accent-rgb))"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="56"
                      strokeDashoffset="56"
                    />
                  </svg>
                </>
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="inline-flex size-10 items-center justify-center rounded-full border border-rule text-ink hover:border-accent hover:text-accent transition-colors"
          aria-label="Next testimonial"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </SectionFrame>
  );
}
