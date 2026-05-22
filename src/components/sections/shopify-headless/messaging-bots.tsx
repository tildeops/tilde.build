"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { botScripts, type BotScript } from "@/lib/shopify-headless/messaging-scripts";

export function MessagingBots() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneScreenRef = useRef<HTMLDivElement | null>(null);
  const progressRailRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

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
      style={{ height: `${(botScripts.length + 1) * 100}vh` }}
    >
      {/* Sticky stage — whole section stays in viewport while user scrolls through capabilities */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-6 md:px-10 lg:px-16">
        <div className="grid w-full max-w-[1240px] gap-10 md:grid-cols-12 md:items-center md:gap-12">
          {/* Left: copy + capability switcher */}
          <div className="md:col-span-7 md:pr-6">
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
              className="mt-4 font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(1.6rem,3.6vw,2.4rem)]"
            >
              Meet customers on WhatsApp. And Telegram.
            </RevealLines>
            <FadeUp delay={0.2}>
              <p className="mt-4 max-w-xl text-[14px] text-ink-muted leading-relaxed md:text-[15px]">
                Browse the catalog, place an order, get support, track delivery —
                the whole journey lives inside one chat. Built on the official
                Business APIs, no flaky third-party bots.
              </p>
            </FadeUp>

            <div className="mt-7 flex gap-6">
              {/* Vertical progress rail */}
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

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Scroll to step through ↓
            </p>
          </div>

          {/* Right: phone frame (no longer sticky — the whole section is pinned) */}
          <div className="md:col-span-5">
            <div className="mx-auto" style={{ maxWidth: 300 }}>
              <PhoneFrame>
                <div ref={phoneScreenRef} key={active} className="h-full">
                  <BotConversation script={script} />
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto rounded-[44px] p-2.5 shadow-[0_40px_90px_-40px_rgba(8,30,90,0.55)]"
      style={{
        background:
          "linear-gradient(180deg, #1a1a1c 0%, #0e0e10 55%, #1a1a1c 100%)",
        aspectRatio: "9/19",
      }}
    >
      {/* Side button hints */}
      <span
        className="absolute -left-[3px] top-[110px] h-10 w-1 rounded-l-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />
      <span
        className="absolute -left-[3px] top-[170px] h-16 w-1 rounded-l-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />
      <span
        className="absolute -right-[3px] top-[140px] h-20 w-1 rounded-r-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />

      {/* Screen */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[34px] bg-white"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 8px rgba(0,0,0,0.6)",
        }}
      >
        {/* Notch */}
        <div
          aria-hidden
          className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full"
          style={{ background: "#0a0a0a" }}
        />
        {/* Content sits below the notch (pt-9 = 36px clears the 32px notch box) */}
        <div className="absolute inset-0 pt-9">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ */

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
