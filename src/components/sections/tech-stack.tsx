"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGreensock,
  SiSwift,
  SiKotlin,
  SiExpo,
  SiShopify,
  SiStripe,
  SiRazorpay,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiWhatsapp,
  SiTelegram,
  SiOpenai,
  SiAnthropic,
  SiVercel,
  SiCloudflare,
  type IconType,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { SectionFrame } from "@/components/layout/section-frame";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";
import { cn } from "@/lib/utils";

type Tech = { name: string; Icon: IconType; color: string };

const TECH: Tech[] = [
  { name: "Next.js", Icon: SiNextdotjs, color: "#0B0C0E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GSAP", Icon: SiGreensock, color: "#0AE448" },
  { name: "Swift", Icon: SiSwift, color: "#F05138" },
  { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },
  { name: "Expo", Icon: SiExpo, color: "#0B0C0E" },
  { name: "Shopify", Icon: SiShopify, color: "#5A863E" },
  { name: "Stripe", Icon: SiStripe, color: "#635BFF" },
  { name: "Razorpay", Icon: SiRazorpay, color: "#0C2451" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "WhatsApp", Icon: SiWhatsapp, color: "#25D366" },
  { name: "Telegram", Icon: SiTelegram, color: "#26A5E4" },
  { name: "OpenAI", Icon: SiOpenai, color: "#0B0C0E" },
  { name: "Anthropic", Icon: SiAnthropic, color: "#D97757" },
  { name: "Vercel", Icon: SiVercel, color: "#0B0C0E" },
  { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020" },
];

const COL_COUNT = 4;
// Round-robin the tools across the columns so each is well filled.
const COLUMNS: Tech[][] = Array.from({ length: COL_COUNT }, () => []);
TECH.forEach((t, i) => COLUMNS[i % COL_COUNT].push(t));

export function TechStack() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = marqueeRef.current;
      if (!root) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      const tracks = gsap.utils.toArray<HTMLElement>("[data-marquee-track]");
      if (!tracks.length) return;

      // Each track holds the column's tiles twice, so a -50% shift loops
      // seamlessly. Even columns scroll up, odd columns scroll down.
      const tweens = tracks.map((track, i) => {
        const up = i % 2 === 0;
        const duration = 26 + i * 4;
        return gsap.fromTo(
          track,
          { yPercent: up ? 0 : -50 },
          { yPercent: up ? -50 : 0, duration, ease: "none", repeat: -1 },
        );
      });

      // Pause the drift on hover so a logo can be read.
      const slow = () =>
        tweens.forEach((t) => gsap.to(t, { timeScale: 0, duration: 0.5 }));
      const resume = () =>
        tweens.forEach((t) => gsap.to(t, { timeScale: 1, duration: 0.5 }));
      root.addEventListener("pointerenter", slow);
      root.addEventListener("pointerleave", resume);

      return () => {
        root.removeEventListener("pointerenter", slow);
        root.removeEventListener("pointerleave", resume);
      };
    },
    { scope: marqueeRef as React.RefObject<HTMLElement>, dependencies: [] },
  );

  return (
    <SectionFrame>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
              <span
                className="size-1.5 rounded-full bg-accent"
                style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
              />
              <span className="text-[12px] font-medium text-ink-muted">
                The stack we ship on
              </span>
            </div>
          </FadeUp>
          <RevealLines
            as="h2"
            className="mt-5 max-w-xl font-display font-extrabold leading-[1.0] tracking-[-0.035em] text-ink text-[clamp(1.9rem,4vw,3rem)]"
          >
            Built on tools <span className="italic">you already trust.</span>
          </RevealLines>
          <FadeUp delay={0.1}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">
              From the framework down to the database and the model, we build on
              the proven platforms your team already knows — nothing exotic to
              learn or maintain after we hand off.
            </p>
          </FadeUp>
          <FadeUp delay={0.16}>
            <a
              href="#process"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-bg transition-colors hover:bg-ink/90"
            >
              See how we work
              <span aria-hidden>→</span>
            </a>
          </FadeUp>
        </div>

        {/* Marquee */}
        <FadeUp delay={0.1}>
          <div
            ref={marqueeRef}
            className="relative h-[clamp(380px,42vw,520px)] overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
            }}
          >
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {COLUMNS.map((col, i) => (
                <div
                  key={i}
                  data-marquee-col
                  className={cn(i % 2 === 1 && "-mt-10")}
                >
                  <div data-marquee-track className="flex flex-col">
                    {[...col, ...col].map((t, j) => (
                      <TechTile key={`${t.name}-${j}`} tech={t} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </SectionFrame>
  );
}

function TechTile({ tech }: { tech: Tech }) {
  const { name, Icon, color } = tech;
  return (
    <div
      title={name}
      className="mb-3 flex aspect-square items-center justify-center rounded-2xl border border-rule bg-white shadow-[0_2px_10px_-4px_rgba(8,30,90,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_10px_24px_-10px_rgba(8,30,90,0.3)] sm:mb-4"
    >
      <Icon className="size-7 sm:size-8" color={color} aria-hidden />
    </div>
  );
}
