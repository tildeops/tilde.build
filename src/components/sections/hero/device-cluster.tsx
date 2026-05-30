"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

/**
 * Four device tiles arranged in a bento. Each tile is a stylized representation
 * of a surface tilde ships (chat, web, mobile, dashboard). Tiles stagger-enter
 * on scroll; each tile has a small idle animation so the cluster reads as
 * "alive" without being noisy.
 */
export function DeviceCluster() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const tiles = Array.from(
        root.querySelectorAll<HTMLElement>("[data-device-tile]"),
      );
      if (!tiles.length) return;

      gsap.set(tiles, { opacity: 0, y: 28, rotate: 0.5 });

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(tiles, {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.85,
            stagger: { each: 0.08, from: "start" },
            ease: "editorial",
          });
        },
      });

      return () => st.kill();
    },
    { scope: rootRef as React.RefObject<HTMLElement>, dependencies: [] },
  );

  return (
    <div
      ref={rootRef}
      className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5"
    >
      <Tile label="WhatsApp · order" variant="chat">
        <ChatTile />
      </Tile>
      <Tile label="Custom storefront" variant="laptop" featured>
        <LaptopTile />
      </Tile>
      <Tile label="Mobile app" variant="phone">
        <MobileTile />
      </Tile>
      <Tile label="Internal dashboard" variant="dashboard">
        <DashboardTile />
      </Tile>
    </div>
  );
}

function Tile({
  label,
  variant,
  featured = false,
  children,
}: {
  label: string;
  variant: "chat" | "laptop" | "phone" | "dashboard";
  featured?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-device-tile
      data-variant={variant}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-bg-elevated p-4 transition-all duration-500",
        "shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_22px_50px_-24px_rgba(8,30,90,0.18),0_3px_8px_-2px_rgba(8,30,90,0.08)]",
        "hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_34px_70px_-22px_rgba(8,30,90,0.28),0_5px_12px_-2px_rgba(8,30,90,0.14)]",
        featured ? "border-accent/30" : "border-rule",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {label}
        </span>
        <span
          className="size-1.5 rounded-full bg-accent"
          style={{ boxShadow: "0 0 8px rgb(var(--accent-rgb) / 0.5)" }}
          aria-hidden
        />
      </div>
      <div className="mt-3 aspect-[4/3] overflow-hidden rounded-xl bg-bg">
        {children}
      </div>
    </div>
  );
}

/* ---------- Tile contents ---------- */

function ChatTile() {
  // WhatsApp-y green chat with two bubbles. Bubble 1 pulses gently.
  return (
    <div
      className="relative h-full w-full"
      style={{ backgroundColor: "#ECE5DD" }}
    >
      <div
        className="flex items-center gap-1.5 px-2 py-1.5 text-[8px] font-medium text-white"
        style={{ backgroundColor: "#075E54" }}
      >
        <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-white/20 text-[6px]">
          AB
        </span>
        <span className="leading-none">Atelier Bloom</span>
        <span className="ml-auto text-[7px] opacity-70">online</span>
      </div>
      <div className="flex flex-col gap-1 p-2">
        <div className="w-fit max-w-[70%] rounded-2xl rounded-bl-sm bg-white px-2 py-1 text-[8px] text-ink shadow-sm">
          Is the camisole back in stock?
        </div>
        <div className="ml-auto w-fit max-w-[75%] rounded-2xl rounded-br-sm px-2 py-1 text-[8px] text-white shadow-sm idle-pulse"
             style={{ backgroundColor: "#DCF8C6", color: "#0c0c0c" }}>
          Last 2 in M. Pay here ↓
        </div>
        <div className="ml-auto w-fit rounded-md bg-white px-2 py-1.5 text-[7px] shadow-sm">
          <p className="font-mono text-ink-muted/80">Order · #2841</p>
          <p className="font-display text-[8px] text-ink">₹2,475 · Paid</p>
        </div>
      </div>
    </div>
  );
}

function LaptopTile() {
  // MacBook Pro showing a storefront. Aluminium lid + black bezel + notch,
  // hinge, and a wider bottom case. Product tiles shimmer.
  return (
    <div className="flex h-full w-full items-center justify-center bg-bg-elevated p-2">
      <div className="w-[86%]">
        {/* Lid — thin aluminium rim around a black bezel */}
        <div className="relative rounded-[9px] bg-gradient-to-b from-[#46474d] via-[#2b2b2f] to-[#19191c] p-[3px] shadow-[0_8px_18px_-8px_rgba(0,0,0,0.45)]">
          <div className="relative rounded-[7px] bg-[#08080a] p-[3px]">
            {/* notch */}
            <div className="absolute left-1/2 top-[3px] z-20 h-[3px] w-[15%] -translate-x-1/2 rounded-b-[2px] bg-[#08080a]" />
            {/* display */}
            <div
              className="relative overflow-hidden rounded-[3px] bg-white"
              style={{ aspectRatio: "16/10" }}
            >
              <div className="flex items-center gap-1 border-b border-black/[0.05] bg-[#f6f6f6] px-1.5 py-1">
                <span className="size-1 rounded-full bg-[#ff5f57]" />
                <span className="size-1 rounded-full bg-[#febc2e]" />
                <span className="size-1 rounded-full bg-[#28c840]" />
                <span className="ml-1 font-mono text-[6px] text-black/40">
                  your-brand.com
                </span>
              </div>
              <div className="grid h-full grid-cols-3 gap-1 p-1.5">
                <div className="col-span-1 flex flex-col gap-1">
                  <p className="font-display text-[9px] leading-none text-ink">
                    Made well.
                  </p>
                  <p className="font-display text-[9px] italic leading-none text-ink-muted">
                    Made yours.
                  </p>
                  <span
                    className="mt-auto inline-flex w-fit items-center rounded-full bg-accent px-1.5 py-0.5 text-[6px] font-semibold text-on-accent"
                    style={{ boxShadow: "0 2px 6px -2px rgb(var(--accent-rgb) / 0.5)" }}
                  >
                    Shop now →
                  </span>
                </div>
                <div className="col-span-2 grid grid-cols-3 gap-1">
                  {[0.35, 0.6, 0.2, 0.45, 0.3, 0.55].map((shade, i) => (
                    <div
                      key={i}
                      data-shimmer-tile
                      className="rounded-sm"
                      style={{
                        backgroundColor: `rgb(var(--accent-rgb) / ${shade})`,
                        animation: `tile-fade 3.6s ease-in-out ${i * 0.18}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hinge + bottom case (wider than the lid, with an opening notch) */}
        <div className="relative left-1/2 h-[7px] w-[114%] -translate-x-1/2">
          <div className="absolute inset-0 rounded-b-[7px] rounded-t-[1.5px] bg-gradient-to-b from-[#dcdde1] via-[#bcbec4] to-[#95979d]" />
          {/* hinge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
          {/* opening lip notch */}
          <div className="absolute left-1/2 top-0 h-[2.5px] w-[15%] -translate-x-1/2 rounded-b-[3px] bg-[#888a90]" />
          {/* drop shadow under the case */}
          <div className="absolute inset-x-[10%] -bottom-[3px] h-[3px] rounded-full bg-black/20 blur-[2px]" />
        </div>
      </div>
    </div>
  );
}

function MobileTile() {
  // Stylized phone screen with a list of app rows + bottom tab bar.
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-elevated to-bg p-3">
      <div
        className="relative h-full overflow-hidden rounded-xl bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)]"
        style={{ aspectRatio: "9/16", maxHeight: "100%" }}
      >
        <div className="flex items-center justify-between bg-black/[0.02] px-2 py-1 text-[6px] font-medium text-black/60">
          <span>9:41</span>
          <span>•• ▮▮</span>
        </div>
        <div className="px-2 py-1.5">
          <p className="font-display text-[10px] font-extrabold leading-none text-ink">
            Today
          </p>
          <div className="mt-2 space-y-1">
            {[
              { l: "New drop · Spring", r: "₹2,475" },
              { l: "Restock · Beige", r: "12 left" },
              { l: "Free ship over ₹2k", r: "" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-1 rounded-md bg-bg-elevated/80 px-1.5 py-1 text-[7px]"
              >
                <span className="font-medium text-ink">{row.l}</span>
                <span className="font-mono text-ink-muted">{row.r}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-1 bottom-1 flex items-center justify-around rounded-md bg-bg-elevated/90 px-1 py-1 backdrop-blur-sm">
          {["Home", "Shop", "Bag", "Me"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "font-mono text-[6px] uppercase tracking-wide",
                i === 0 ? "text-accent" : "text-ink-muted",
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardTile() {
  // Small admin/analytics tile with two metrics + a sparkline.
  return (
    <div className="flex h-full w-full flex-col gap-2 bg-bg-elevated p-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-rule bg-bg p-2">
          <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-ink-muted">
            MRR
          </p>
          <p className="mt-0.5 font-display text-[11px] font-extrabold leading-none text-ink">
            ₹4.2L
          </p>
          <p className="font-mono text-[7px] text-emerald-600">
            ↑ 18%
          </p>
        </div>
        <div className="rounded-md border border-rule bg-bg p-2">
          <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-ink-muted">
            Orders
          </p>
          <p className="mt-0.5 font-display text-[11px] font-extrabold leading-none text-ink">
            127
          </p>
          <p className="font-mono text-[7px] text-emerald-600">
            ↑ 6%
          </p>
        </div>
      </div>
      <div className="flex-1 rounded-md border border-rule bg-bg p-2">
        <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-ink-muted">
          7-day trend
        </p>
        <div className="mt-1 flex h-[calc(100%-12px)] items-end gap-1">
          {[0.35, 0.5, 0.4, 0.65, 0.55, 0.78, 0.7].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h * 100}%`,
                background:
                  i === 6
                    ? "rgb(var(--accent-rgb))"
                    : `rgb(var(--accent-rgb) / 0.35)`,
                animation: `bar-pulse 3.8s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
