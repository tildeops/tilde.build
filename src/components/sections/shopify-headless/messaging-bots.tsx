"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { PhoneFrame, PHONE_FRAME_WIDTH } from "@/components/ui/phone-frame";
import { botScripts, type BotScript } from "@/lib/shopify-headless/messaging-scripts";

export function MessagingBots() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneScreenRef = useRef<HTMLDivElement | null>(null);
  const progressRailRef = useRef<HTMLDivElement | null>(null);
  const mobileProgressRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  // Pin runway length is responsive: a desktop user reads the side list as
  // independent clicks (5x100vh), but a touch user expects each step to
  // arrive in roughly one swipe (4x75vh).
  const [sectionHeightVh, setSectionHeightVh] = useState(
    (botScripts.length + 1) * 100,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const apply = () => {
      setSectionHeightVh(
        mq.matches ? botScripts.length * 75 : (botScripts.length + 1) * 100,
      );
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Sticky-pinned section: outer wrapper is N*100vh tall, inner sticks at top.
  // Native scroll listener drives active step + progress rail.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const N = botScripts.length;

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
  }, []);

  // Crossfade the phone screen when active script changes
  useGSAP(
    () => {
      const el = phoneScreenRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    },
    { dependencies: [active] }
  );

  // Clicking a step jumps to that step's slice of the pin runway
  const handleStepClick = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const N = botScripts.length;
    const sectionTopAbs = section.getBoundingClientRect().top + window.scrollY;
    const total = section.offsetHeight - window.innerHeight;
    const target = sectionTopAbs + ((i + 0.5) / N) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const script = botScripts[active];

  return (
    <section
      ref={sectionRef}
      id="messaging-bots"
      className="relative w-full"
      style={{ height: `${sectionHeightVh}svh` }}
    >
      {/* Sticky stage — whole section stays in viewport while user scrolls through capabilities */}
      <div className="sticky top-0 flex h-[100svh] w-full items-start justify-center overflow-hidden px-4 pt-6 pb-6 sm:px-6 md:items-center md:overflow-visible md:px-10 md:pt-0 md:pb-0 lg:px-16">
        <div className="grid w-full max-w-[1240px] gap-3 md:grid-cols-12 md:items-center md:gap-12">
          {/* Copy column. Order-1 on mobile (above phone), col-span-7 on
              desktop. On mobile we show only the active step's name + blurb;
              on desktop, the full 4-step clickable list. */}
          <div className="order-1 md:order-1 md:col-span-7 md:pr-6">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
                <span
                  className="size-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
                />
                <span className="text-[12px] font-medium text-ink-muted">
                  Conversations that close
                </span>
              </div>
            </FadeUp>
            <RevealLines
              as="h2"
              className="mt-3 font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(1.5rem,5.5vw,2.4rem)] md:mt-4"
            >
              Meet customers on WhatsApp. And Telegram.
            </RevealLines>
            <FadeUp delay={0.2}>
              <p className="mt-3 hidden max-w-xl text-[14px] text-ink-muted leading-relaxed md:mt-4 md:block md:text-[15px]">
                Browse the catalog, place an order, get support, track delivery —
                the whole journey lives inside one chat. Built on the official
                Business APIs, no flaky third-party bots.
              </p>
            </FadeUp>

            {/* Mobile-only: single active step + dot indicator */}
            <div className="mt-4 md:hidden">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                <span className="text-accent">
                  0{active + 1}
                </span>
                <span>/ 0{botScripts.length}</span>
              </div>
              <p
                key={`label-${active}`}
                className="mt-2 font-display text-[20px] font-extrabold leading-tight tracking-[-0.01em] text-ink"
              >
                {script.label}
              </p>
              {/* Thin horizontal progress bar — shows how far the user has
                  scrolled through the steps. Replaces the 4-dot indicator.
                  The step blurb is desktop-only — on mobile the label + bar
                  carry it, which keeps the sticky stage short enough for the
                  phone to size up consistently with the other sections. */}
              <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-rule">
                <div
                  ref={mobileProgressRef}
                  className="h-full origin-left bg-accent"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>

            {/* Desktop-only: full step list with progress rail */}
            <div className="mt-7 hidden gap-6 md:flex">
              <div className="relative w-[2px] shrink-0 overflow-hidden rounded-full bg-rule">
                <div
                  ref={progressRailRef}
                  className="absolute inset-0 origin-top bg-accent"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>

              <ul className="flex-1 space-y-2.5">
                {botScripts.map((s, i) => (
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

            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted md:mt-6">
              Scroll to step through ↓
            </p>
          </div>

          {/* Phone column. Order-2 on mobile (below copy), col-span-5 on desktop. */}
          <div className="order-2 md:order-2 md:col-span-5">
            <PhoneFrame className={PHONE_FRAME_WIDTH} contentClassName="pt-9">
              <div ref={phoneScreenRef} key={active} className="h-full">
                <ScaledConversation>
                  <BotConversation script={script} />
                </ScaledConversation>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */

/**
 * Width the chat UI is laid out at before being scaled down to the phone.
 * Wider than the frame's inner screen so `scale = width / CHAT_DESIGN_WIDTH`
 * comes out < 1 — the whole conversation renders smaller, so more bubbles fit
 * and the thread stops bleeding past the compose bar. Mirrors `ScaledEmail`
 * and `ScaledStorefront`.
 */
const CHAT_DESIGN_WIDTH = 340;

function ScaledConversation({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // 0.82 ≈ a 280px frame / 340 — a sane first paint before measurement.
  const [scale, setScale] = useState(0.82);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / CHAT_DESIGN_WIDTH);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: `${CHAT_DESIGN_WIDTH}px`,
          height: `${100 / scale}%`,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function BotConversation({ script }: { script: BotScript }) {
  const isWhatsapp = script.platform === "whatsapp";
  return (
    <div className="flex h-full flex-col">
      {/* Status bar */}
      <div className="flex shrink-0 items-center justify-between px-5 pb-1 text-[10px] text-black/70">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span>•••</span>
          <span>⌬</span>
          <span>▮▮▯</span>
        </span>
      </div>

      {/* App header */}
      <div
        className={`flex shrink-0 items-center gap-2.5 px-4 py-2.5 text-white ${
          isWhatsapp ? "bg-[#075E54]" : "bg-[#517DA2]"
        }`}
      >
        <span className="text-[16px]">‹</span>
        <span
          className="flex size-7 items-center justify-center rounded-full text-[10px] font-semibold"
          style={{ backgroundColor: "rgba(255,255,255,0.16)" }}
        >
          {script.contact
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-medium leading-tight">
            {script.contact}
          </p>
          <p className="truncate text-[9px] text-white/70">
            {isWhatsapp ? "business · online" : "bot · @aurum_bot"}
          </p>
        </div>
        <span className="text-[12px] opacity-80">⋯</span>
      </div>

      {/* Thread */}
      <div
        className="relative flex-1 overflow-hidden"
        style={
          isWhatsapp
            ? { backgroundColor: "#ECE5DD" }
            : {
                backgroundImage:
                  "linear-gradient(180deg, #A8C4DD 0%, #C7D6E3 100%)",
              }
        }
      >
        {isWhatsapp && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><g fill='%23000'><circle cx='15' cy='25' r='1.5'/><circle cx='40' cy='60' r='1'/><circle cx='90' cy='30' r='1.5'/><circle cx='130' cy='80' r='1'/><circle cx='60' cy='110' r='1.5'/><circle cx='140' cy='140' r='1'/></g></svg>\")",
              backgroundSize: "180px 180px",
            }}
          />
        )}
        <div className="relative flex flex-col gap-1.5 px-3 py-3">
          {script.thread.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.from === "customer" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-[18px] px-2.5 py-1.5 text-[11px] leading-snug ${
                  m.from === "customer"
                    ? isWhatsapp
                      ? "rounded-tr-sm bg-[#DCF8C6] text-[#0c0c0c]"
                      : "rounded-br-md bg-[#EEFFDE] text-[#0c0c0c]"
                    : isWhatsapp
                      ? "rounded-tl-sm bg-white text-[#0c0c0c]"
                      : "rounded-bl-md bg-white text-[#0c0c0c]"
                }`}
              >
                {m.text}
                {m.time && (
                  <span className="ml-1.5 text-[9px] text-black/40">{m.time}</span>
                )}
              </div>
              {m.buttons && (
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {m.buttons.map((b) => (
                    <button
                      key={b}
                      type="button"
                      className="rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium text-[#0c4a6e]"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom fade — a clipped final bubble dissolves into the chat
            background instead of slamming into the compose bar. Matches the
            thread bg so it reads as "more messages above". */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          style={{
            background: `linear-gradient(to top, ${
              isWhatsapp ? "#ECE5DD" : "#C7D6E3"
            } 18%, transparent)`,
          }}
        />
      </div>

      {/* Compose bar */}
      <div className="flex shrink-0 items-center gap-2 bg-white px-3 py-2 border-t border-black/[0.06]">
        <span className="text-[14px] text-black/40">＋</span>
        <div className="flex-1 rounded-full bg-[#f1f1f1] px-3 py-1.5 text-[10px] text-black/40">
          Message…
        </div>
        <span className="text-[14px] text-black/40">⋯</span>
      </div>
    </div>
  );
}
