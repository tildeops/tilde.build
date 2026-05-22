"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  ArrowRight,
  Plus,
  Mic,
  Search,
  SquarePen,
  Smile,
} from "lucide-react";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { RevealLines } from "@/components/motion/reveal-lines";
import { FadeUp } from "@/components/motion/fade-up";
import { CountUp } from "@/components/motion/count-up";
import { offerings } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Offerings() {
  return (
    <SectionFrame id="offerings">
      <div className="text-center">
        <Eyebrow shimmer>~ What we ship</Eyebrow>
        <RevealLines
          as="h2"
          className="mx-auto mt-5 max-w-3xl font-display font-medium leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.6vw,3.5rem)]"
        >
          Three offerings.{" "}
          <span className="italic text-ink-muted">One job: better commerce.</span>
        </RevealLines>
      </div>

      <div className="mt-14 space-y-6">
        {offerings.map((o, i) => (
          <OfferingCard key={o.title} offering={o} variant={i} />
        ))}
      </div>
    </SectionFrame>
  );
}

function OfferingCard({
  offering: o,
  variant,
}: {
  offering: (typeof offerings)[number];
  variant: number;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const visualWrapRef = useRef<HTMLDivElement | null>(null);

  // Parallax: visual translates slower than the text column while card is in viewport
  useGSAP(
    () => {
      const card = cardRef.current;
      const visual = visualWrapRef.current;
      if (!card || !visual) return;

      const st = ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          // -24px at start, +24px at end (subtle)
          const y = (self.progress - 0.5) * -48;
          gsap.set(visual, { y });
        },
      });
      return () => st.kill();
    },
    { scope: cardRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <article
      ref={cardRef as React.RefObject<HTMLElement>}
      className={cn(
        "group relative flex flex-col gap-10 rounded-2xl border bg-bg p-6 md:p-10 transition-shadow duration-500 overflow-hidden",
        variant === 0
          ? "border-accent/40 shadow-[0_30px_80px_-50px_rgb(var(--accent-rgb)/0.4)] hover:shadow-[0_40px_100px_-40px_rgb(var(--accent-rgb)/0.55)]"
          : "border-rule hover:shadow-[0_30px_80px_-50px_rgb(var(--accent-rgb)/0.3)]"
      )}
    >
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7 flex flex-col">
          <Eyebrow>{o.eyebrow}</Eyebrow>
          <RevealLines
            as="h3"
            className="mt-3 font-display text-3xl md:text-4xl leading-tight"
          >
            {o.title}
          </RevealLines>
          <FadeUp
            as="p"
            delay={0.05}
            className="mt-4 text-base md:text-lg text-ink-muted leading-relaxed max-w-prose"
          >
            {o.blurb}
          </FadeUp>
        </div>
        <FadeUp className="md:col-span-5 flex flex-col md:items-end" delay={0.12} y={18}>
          <ul className="grid w-fit gap-2 sm:grid-cols-2 md:grid-cols-1">
            {o.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-sm text-ink"
              >
                <Check className="mt-0.5 size-4 text-accent shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Link
            href={o.href}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-all"
          >
            {o.cta} <ArrowRight className="size-4" />
          </Link>
        </FadeUp>
      </div>

      <div ref={visualWrapRef} className="w-full">
        <OfferingVisual variant={variant} />
      </div>
    </article>
  );
}

function OfferingVisual({ variant }: { variant: number }) {
  if (variant === 0) return <ShopifyVisual />;
  if (variant === 1) return <CustomVisual />;
  return <WhatsappVisual />;
}

function BrowserShell({
  url,
  badge,
  children,
}: {
  url: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-rule bg-bg shadow-[0_20px_60px_-40px_rgb(var(--accent-rgb)/0.35)]">
      <div className="flex items-center gap-1.5 border-b border-rule bg-bg-elevated/60 px-3 py-2">
        <span className="size-1.5 rounded-full bg-rule" />
        <span className="size-1.5 rounded-full bg-rule" />
        <span className="size-1.5 rounded-full bg-rule" />
        <div className="ml-2 flex h-5 flex-1 items-center rounded bg-bg/70 px-2 font-mono text-[9px] text-ink-muted">
          {url}
        </div>
        {badge}
      </div>
      <div className="relative h-[calc(100%-30px)]">{children}</div>
    </div>
  );
}

function ShopifyBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] font-medium text-white"
      style={{ backgroundColor: "#95BF47" }}
      aria-label="Shopify"
    >
      <span className="font-display italic text-[11px] leading-none">S</span>
      Shopify
    </span>
  );
}

function ShopifyVisual() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const tiles = Array.from(root.querySelectorAll<HTMLElement>("[data-product-tile]"));
      const leftBlocks = Array.from(root.querySelectorAll<HTMLElement>("[data-left]"));

      gsap.set(leftBlocks, { opacity: 0, x: -16 });
      gsap.set(tiles, { opacity: 0, y: 16, scale: 0.95 });

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(leftBlocks, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "editorial",
          });
          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "editorial",
            stagger: { grid: "auto", from: "start", amount: 0.5 },
            delay: 0.2,
          });
        },
      });
      return () => st.kill();
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <div ref={ref}>
      <BrowserShell url="your-brand.com" badge={<ShopifyBadge />}>
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-5 p-5 md:p-8 flex flex-col justify-between bg-gradient-to-br from-accent-soft/40 via-bg to-bg border-r border-rule">
            <div>
              <p data-left className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                Spring &apos;26 · Atelier
              </p>
              <p data-left className="mt-3 font-display text-2xl md:text-3xl leading-[1.05] text-ink">
                Made well.
              </p>
              <p data-left className="font-display italic text-2xl md:text-3xl leading-[1.05] text-ink-muted">
                Made yours.
              </p>
              <p data-left className="mt-3 text-[10px] md:text-xs text-ink-muted max-w-[24ch] leading-snug">
                Slow-crafted essentials, shipped from our studio in Bandra.
              </p>
            </div>
            <div data-left className="flex items-center gap-2">
              <span className="rounded-full bg-accent text-on-accent px-3 py-1.5 text-[10px] font-medium gloss-inset shadow-[0_4px_12px_-6px_rgb(var(--accent-rgb)/0.5)] transition-transform duration-300 group-hover:translate-x-1">
                Shop now →
              </span>
              <span className="text-[9px] font-mono text-ink-muted">
                Free ship · ₹2K+
              </span>
            </div>
          </div>
          <div className="col-span-7 p-3 md:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted">
                Bestsellers
              </p>
              <div className="flex gap-1 [&>span]:transition-colors [&>span]:duration-300">
                <span className="size-1.5 rounded-full bg-accent group-hover:bg-rule" />
                <span className="size-1.5 rounded-full bg-rule group-hover:bg-accent" />
                <span className="size-1.5 rounded-full bg-rule" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 flex-1">
              {[10, 20, 15, 25, 18, 12, 22, 16].map((shade, idx) => (
                <div
                  key={idx}
                  data-product-tile
                  className="rounded-md border border-rule overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.03] hover:border-accent/40"
                  style={{ backgroundColor: `rgb(var(--accent-rgb) / ${shade / 100})` }}
                >
                  <div className="flex-1" />
                  <div className="bg-bg/90 px-1.5 py-1 border-t border-rule">
                    <p className="font-mono text-[7px] text-ink-muted">
                      ₹{(shade * 99).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserShell>
    </div>
  );
}

function CustomBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded bg-accent px-1.5 py-0.5 font-mono text-[9px] font-medium text-on-accent gloss-inset"
      aria-label="Custom Next.js build"
    >
      <span className="font-display italic text-[11px] leading-none">~</span>
      Custom · Next.js
    </span>
  );
}

function CustomVisual() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const tiles = Array.from(root.querySelectorAll<HTMLElement>("[data-product-tile]"));
      const leftBlocks = Array.from(root.querySelectorAll<HTMLElement>("[data-left]"));
      const chips = Array.from(root.querySelectorAll<HTMLElement>("[data-chip]"));
      const statChip = root.querySelector<HTMLElement>("[data-stat-chip]");

      gsap.set(leftBlocks, { opacity: 0, x: -16 });
      gsap.set(chips, { opacity: 0, y: 8 });
      gsap.set(tiles, { opacity: 0, y: 16, scale: 0.95 });
      if (statChip) gsap.set(statChip, { opacity: 0, y: 12 });

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(leftBlocks, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "editorial",
          });
          gsap.to(chips, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "editorial",
            delay: 0.3,
          });
          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "editorial",
            stagger: { grid: "auto", from: "start", amount: 0.5 },
            delay: 0.2,
          });
          if (statChip) {
            gsap.to(statChip, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "editorial",
              delay: 0.7,
            });
          }
        },
      });
      return () => st.kill();
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <div ref={ref}>
      <BrowserShell url="built.your-brand.com" badge={<CustomBadge />}>
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-5 p-5 md:p-8 flex flex-col justify-between bg-gradient-to-br from-accent-soft/50 via-bg to-bg border-r border-rule">
            <div>
              <p data-left className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                Bespoke · Atelier
              </p>
              <p data-left className="mt-3 font-display text-2xl md:text-3xl leading-[1.05] text-ink">
                Yours, end to end.
              </p>
              <p data-left className="font-display italic text-2xl md:text-3xl leading-[1.05] text-ink-muted">
                Built from scratch.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Subscriptions", "B2B portal", "Multi-store"].map((label) => (
                  <span
                    key={label}
                    data-chip
                    className="rounded-full border border-rule bg-bg/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-ink-muted"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div data-left className="flex items-center gap-2">
              <span className="rounded-full bg-accent text-on-accent px-3 py-1.5 text-[10px] font-medium gloss-inset shadow-[0_4px_12px_-6px_rgb(var(--accent-rgb)/0.5)]">
                Open store →
              </span>
              <span className="text-[9px] font-mono text-ink-muted">
                Custom backend · Next.js
              </span>
            </div>
          </div>

          <div className="col-span-7 relative p-3 md:p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted">
                Collection · SS&apos;26
              </p>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-bg border border-rule px-2 py-0.5 gloss-inset shadow-sm">
                <span className="relative inline-flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[8px] text-ink">
                  <CountUp to={127} duration={1.6} /> shopping now
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 flex-1">
              {[
                { shade: 30, dark: true },
                { shade: 18, dark: false },
                { shade: 45, dark: true },
                { shade: 22, dark: false },
                { shade: 16, dark: false },
                { shade: 38, dark: true },
                { shade: 20, dark: false },
                { shade: 28, dark: false },
              ].map((tile, idx) => (
                <div
                  key={idx}
                  data-product-tile
                  className="relative rounded-md border border-rule overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: tile.dark
                      ? `rgba(23, 20, 19, ${tile.shade / 100 + 0.45})`
                      : `rgb(var(--accent-rgb) / ${tile.shade / 100})`,
                  }}
                >
                  <div className="flex-1" />
                  <div className="bg-bg/90 px-1.5 py-1 border-t border-rule">
                    <p className="font-mono text-[7px] text-ink-muted">
                      ₹{(tile.shade * 99).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              data-stat-chip
              className="absolute bottom-3 right-3 rounded-md border border-rule bg-bg/95 px-2 py-1.5 shadow-sm gloss-inset transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40 cursor-default"
            >
              <p className="font-mono text-[7px] uppercase tracking-wider text-ink-muted">
                MRR · This month
              </p>
              <p className="font-display text-sm leading-tight text-ink">
                ₹4.2L{" "}
                <span className="font-mono text-[8px] text-emerald-700">
                  ↑ <CountUp to={18} duration={1.2} />%
                </span>
              </p>
            </div>
          </div>
        </div>
      </BrowserShell>
    </div>
  );
}

function WhatsAppDoodlePattern() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 size-full"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="wa-doodle"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 14 18 c -3 -3 -7 0 -4 4 l 4 5 l 4 -5 c 3 -4 -1 -7 -4 -4 z" />
            <path d="M 48 14 h 16 q 4 0 4 4 v 6 q 0 4 -4 4 h -10 l -4 4 v -4 h -2 q -4 0 -4 -4 v -6 q 0 -4 4 -4 z" />
            <rect x="14" y="44" width="10" height="18" rx="2" />
            <circle cx="19" cy="58" r="1" />
            <path d="M 50 50 l 18 -4 l -8 16 l -3 -7 l -7 -5 z" />
            <path d="M 53 55 l 12 -5" />
            <circle cx="68" cy="70" r="5" />
            <circle cx="66" cy="68.5" r="0.6" fill="rgba(255,255,255,0.07)" />
            <circle cx="70" cy="68.5" r="0.6" fill="rgba(255,255,255,0.07)" />
            <path d="M 65.5 71 q 2.5 2 5 0" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wa-doodle)" />
    </svg>
  );
}

const CHAT_LIST = [
  {
    initials: "AB",
    name: "Atelier Bloom",
    preview: "Out by 5pm today. Tracking incoming →",
    time: "now",
    active: true,
    color: "#0a5a44",
  },
  {
    initials: "ST",
    name: "Service Team",
    preview: "JY: @all Please finalize the…",
    time: "12:40",
    color: "#2a4d7a",
    badge: 1,
  },
  {
    initials: "RS",
    name: "Ragul · SRM",
    preview: "I'm using KOSH to spend…",
    time: "12:39",
    color: "#6b3a8a",
  },
  {
    initials: "JJ",
    name: "JY Juliet Janish",
    preview: "Ya.. noted.. thank you da…",
    time: "12:37",
    color: "#a14a2a",
    badge: 1,
  },
  {
    initials: "C26",
    name: "CAT 2026 Batch",
    preview: "~deepanshu: Daily Article…",
    time: "11:38",
    color: "#7a5a2a",
  },
  {
    initials: "TM",
    name: "Tarun Merkle",
    preview: "Also need to invite 5 users…",
    time: "10:26",
    color: "#3a6a4a",
  },
];

function WhatsappVisual() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const chatRows = Array.from(root.querySelectorAll<HTMLElement>("[data-chat-row]"));
      const messages = Array.from(root.querySelectorAll<HTMLElement>("[data-msg]"));

      gsap.set(chatRows, { opacity: 0, x: -10 });
      gsap.set(messages, { opacity: 0, y: 14, scale: 0.95 });

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(chatRows, {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "editorial",
          });
          gsap.to(messages, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.18,
            ease: "editorial",
            delay: 0.4,
          });
        },
      });
      return () => st.kill();
    },
    { scope: ref as React.RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <div
      ref={ref}
      className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-[0_20px_60px_-40px_rgb(var(--accent-rgb)/0.35)] grid grid-cols-12"
      style={{ backgroundColor: "#0c382f" }}
    >
      <aside className="col-span-3 relative flex flex-col bg-[#082b25] border-r border-white/5">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
          <span className="font-display text-sm text-white/90 leading-none">
            Chats
          </span>
          <SquarePen className="size-3 text-white/50" />
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1">
            <Search className="size-2.5 text-white/40" />
            <span className="font-mono text-[8px] text-white/40">Search</span>
          </div>
        </div>
        <ul className="flex-1 overflow-hidden">
          {CHAT_LIST.map((chat, idx) => (
            <li
              key={chat.name}
              data-chat-row
              className={cn(
                "flex items-center gap-2 px-3 py-2 border-b border-white/[0.03] transition-colors",
                chat.active
                  ? "bg-white/[0.06]"
                  : "hover:bg-white/[0.03]"
              )}
            >
              <span
                className="inline-flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[8px] font-medium text-white/90"
                style={{ backgroundColor: chat.color }}
              >
                {chat.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  {chat.active ? (
                    <span className="truncate font-sans text-[10px] font-medium text-white/90">
                      {chat.name}
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="block h-2 w-[55%] rounded-sm bg-white/15 animate-pulse [animation-duration:2.4s]"
                      style={{ animationDelay: `${idx * 0.18}s` }}
                    />
                  )}
                  <span className="font-mono text-[7px] text-white/40 shrink-0">
                    {chat.time}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-1">
                  {chat.active ? (
                    <span className="truncate font-sans text-[9px] text-white/50">
                      {chat.preview}
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="block h-1.5 w-[80%] rounded-sm bg-white/10 animate-pulse [animation-duration:2.4s]"
                      style={{ animationDelay: `${idx * 0.18 + 0.1}s` }}
                    />
                  )}
                  {chat.badge ? (
                    <span className="inline-flex size-3 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-mono text-[7px] font-semibold text-[#082b25]">
                      {chat.badge}
                    </span>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <section className="col-span-9 relative flex flex-col">
        <WhatsAppDoodlePattern />

        <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#0c382f]/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-emerald-700/60 font-mono text-[8px] text-white">
              AB
            </span>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] font-medium text-white/90 leading-tight">
                Atelier Bloom
              </span>
              <span className="font-mono text-[8px] text-emerald-300/80">
                online · typing…
              </span>
            </div>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/40">
            WhatsApp Business
          </span>
        </div>

        <div className="relative z-10 flex-1 px-4 py-3 flex flex-col gap-1.5 overflow-hidden">
          <div data-msg className="w-fit max-w-[260px] rounded-2xl rounded-bl-sm bg-white/95 px-3 py-1.5 text-[11px] text-ink shadow">
            Hey! Is the ivory camisole in stock?
          </div>

          <div data-msg className="ml-auto w-fit max-w-[260px] rounded-2xl rounded-br-sm bg-[#075e54] text-white px-3 py-1.5 text-[11px] shadow">
            Yes — last 2 in M. Pay here ↓
          </div>

          <div data-msg className="w-fit max-w-[280px] rounded-2xl rounded-bl-sm bg-white/95 p-2.5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-default">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted">
              Order · #AB-2841
            </p>
            <p className="mt-0.5 font-display text-[12px] text-ink leading-tight">
              Silk camisole — Ivory · M
            </p>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] text-ink">₹2,475</span>
              <span className="rounded-full bg-emerald-600/15 px-1.5 py-0.5 font-mono text-[8px] text-emerald-700">
                Paid
              </span>
            </div>
          </div>

          <div data-msg className="ml-auto w-fit max-w-[260px] rounded-2xl rounded-br-sm bg-[#075e54] text-white px-3 py-1.5 text-[11px] shadow">
            Paid ✓ — when will it ship?
          </div>

          <div data-msg className="w-fit max-w-[280px] rounded-2xl rounded-bl-sm bg-white/95 p-2.5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-default">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-muted">
                Tracking
              </p>
              <p className="font-mono text-[8px] text-ink-muted">DTDC</p>
            </div>
            <p className="mt-0.5 font-mono text-[10px] text-ink">BD-9921</p>
            <div className="mt-1.5 flex items-center gap-1">
              <span className="h-1 flex-1 rounded-full bg-accent" />
              <span className="h-1 flex-1 rounded-full bg-accent" />
              <span className="h-1 flex-1 rounded-full bg-rule" />
              <span className="h-1 flex-1 rounded-full bg-rule" />
            </div>
            <p className="mt-1 font-mono text-[8px] text-ink-muted">
              Picked up · in transit
            </p>
          </div>

          <div data-msg className="ml-auto w-fit max-w-[260px] rounded-2xl rounded-br-sm bg-[#075e54] text-white px-3 py-1.5 text-[11px] shadow">
            Out by 5pm today. Tracking sent ↑
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 px-3 py-2 border-t border-white/5 bg-[#082b25]">
          <Plus className="size-3.5 text-white/60 shrink-0" />
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
            <Smile className="size-3 text-white/40" />
            <span className="flex-1 font-sans text-[10px] text-white/30">
              Type a message
            </span>
            <span className="block h-3 w-px animate-pulse bg-white/40" />
          </div>
          <Mic className="size-3.5 text-white/60 shrink-0" />
        </div>
      </section>
    </div>
  );
}
