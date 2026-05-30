"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type ServiceBeat } from "@/lib/content";

type Variant = ServiceBeat["visual"];

/**
 * Laptop-shaped device frame with variant-specific screen content. Used for
 * the three "laptop" service beats (custom software, custom ecommerce,
 * Shopify). Pure CSS — no images, no canvas.
 */
export function LaptopVisual({ variant }: { variant: Variant }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 720 }}>
      {/* Lid — thin aluminium edge wrapping a black bezel */}
      <div
        className="relative rounded-[16px] p-[5px]"
        style={{
          background:
            "linear-gradient(158deg, #5b5c62 0%, #303034 42%, #161619 100%)",
          boxShadow:
            "0 44px 84px -34px rgba(8,30,90,0.42), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.16)",
        }}
      >
        {/* Notch — camera housing */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-20 h-[7px] w-[74px] -translate-x-1/2 rounded-b-[7px]"
          style={{
            background:
              "linear-gradient(to bottom, #050507 0%, #0e0e10 60%, #1a1a1e 100%)",
          }}
        />

        {/* Black bezel */}
        <div className="rounded-[11px] bg-[#050506] p-[8px]">
          {/* Screen */}
          <div
            className="relative overflow-hidden rounded-[5px] bg-white"
            style={{
              aspectRatio: "16 / 10",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {variant === "custom-dashboard" && <CustomDashboardScreen />}
            {variant === "ecommerce-sweep" && <EcommerceSweepScreen />}
            {variant === "shopify-store" && <ShopifyStoreScreen />}
          </div>
        </div>
      </div>

      {/* Hinge + bottom case — slightly wider aluminium deck with an
          opening-lip notch, the cue that reads it as a MacBook (not a slab). */}
      <div className="relative left-1/2 w-[106%] -translate-x-1/2">
        {/* hinge recess (spans the lid width) */}
        <div
          aria-hidden
          className="mx-auto h-[5px] w-[94%] rounded-b-[3px]"
          style={{
            background: "linear-gradient(180deg, #27272c 0%, #0b0b0e 100%)",
          }}
        />
        {/* aluminium deck */}
        <div
          aria-hidden
          className="relative h-[15px] rounded-b-[14px] rounded-t-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #e9eaee 0%, #c7c9cf 44%, #999ba2 100%)",
            boxShadow:
              "0 26px 42px -18px rgba(8,30,90,0.45), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {/* opening lip */}
          <div
            className="absolute left-1/2 top-0 h-[6px] w-[12%] -translate-x-1/2 rounded-b-[7px]"
            style={{
              background: "linear-gradient(180deg, #8d8f96 0%, #bcbec4 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Screen contents ---------- */

function ChromeBar({ url }: { url: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-black/[0.06] bg-[#f6f6f6] px-2.5 py-1.5">
      <span className="size-2 rounded-full bg-[#ff5f57]" />
      <span className="size-2 rounded-full bg-[#febc2e]" />
      <span className="size-2 rounded-full bg-[#28c840]" />
      <div className="ml-2 flex h-5 flex-1 items-center justify-center rounded border border-black/[0.06] bg-white px-2">
        <span className="font-mono text-[10px] text-black/55">{url}</span>
      </div>
      <span className="w-[40px]" />
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const w = 36;
  const h = 13;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const coord = (p: number, i: number) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - 1 - ((p - min) / span) * (h - 2);
    return [x, y] as const;
  };
  const line = points
    .map((p, i) => {
      const [x, y] = coord(p, i);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const [lx, ly] = coord(points[points.length - 1], points.length - 1);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <path
        d={`${line} L${w},${h} L0,${h} Z`}
        fill="rgb(var(--accent-rgb) / 0.1)"
        stroke="none"
      />
      <path
        data-spark-line
        d={line}
        fill="none"
        stroke="rgb(var(--accent-rgb))"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lx} cy={ly} r="1.1" fill="rgb(var(--accent-rgb))" />
    </svg>
  );
}

const DASH_ORDERS = [
  { id: "#2841", who: "Aarav Rao", status: "Paid", total: "₹2,475", solid: true },
  { id: "#2840", who: "Mira Khan", status: "Packed", total: "₹1,290" },
  { id: "#2839", who: "Sana Iyer", status: "Shipped", total: "₹4,010" },
  { id: "#2838", who: "Rohan Das", status: "Refund", total: "₹620" },
  { id: "#2837", who: "Tara Nair", status: "Paid", total: "₹3,150", solid: true },
  { id: "#2836", who: "Dev Menon", status: "Shipped", total: "₹1,870" },
];
const DASH_INVENTORY = [
  { sku: "Silk camisole — Ivory", stock: "42", pct: 0.7 },
  { sku: "Linen co-ord — Sand", stock: "8", pct: 0.16, low: true },
  { sku: "Cotton tee — White", stock: "120", pct: 0.95 },
  { sku: "Wool scarf — Slate", stock: "23", pct: 0.42 },
  { sku: "Denim jacket — Indigo", stock: "5", pct: 0.1, low: true },
];
const DASH_CUSTOMERS = [
  { init: "AR", name: "Aarav Rao", orders: "12 orders", spend: "₹48,200" },
  { init: "SI", name: "Sana Iyer", orders: "21 orders", spend: "₹92,100" },
  { init: "TN", name: "Tara Nair", orders: "15 orders", spend: "₹61,400" },
  { init: "MK", name: "Mira Khan", orders: "8 orders", spend: "₹31,050" },
  { init: "RD", name: "Rohan Das", orders: "3 orders", spend: "₹9,300" },
];
const DASH_ACTIVITY = [
  { t: "Order #2841 marked paid", time: "2m" },
  { t: "Low stock · Linen co-ord", time: "14m" },
  { t: "New customer · Tara Nair", time: "31m" },
  { t: "Payout settled · ₹1.2L", time: "1h" },
];

function PanelHead({ title, sub, chip }: { title: string; sub: string; chip: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between">
      <div>
        <p className="font-display text-[12px] font-extrabold leading-none text-black">
          {title}
        </p>
        <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.16em] text-black/40">
          {sub}
        </p>
      </div>
      <span className="rounded border border-black/[0.08] bg-white px-1.5 py-[3px] font-mono text-[6.5px] text-black/45">
        {chip}
      </span>
    </div>
  );
}

function CustomDashboardScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const nav = ["Overview", "Orders", "Inventory", "Customers", "Reports", "Settings"];

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const cursor = root.querySelector<HTMLElement>("[data-cursor]");
      const navHl = root.querySelector<HTMLElement>("[data-nav-hl]");
      const items = gsap.utils.toArray<HTMLElement>("[data-nav]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      const rowHl = root.querySelector<HTMLElement>("[data-row-hl]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const sparks = gsap.utils.toArray<SVGPathElement>("[data-spark-line]");
      if (!cursor || !navHl || !items.length || !panels.length) return;

      // Position of an element relative to `root` in local (unscaled) px, so
      // the cursor tracks correctly no matter how the laptop is scaled.
      const local = (el: HTMLElement) => {
        let x = 0;
        let y = 0;
        let n: HTMLElement | null = el;
        while (n && n !== root) {
          x += n.offsetLeft;
          y += n.offsetTop;
          n = n.offsetParent as HTMLElement | null;
        }
        return { x, y, w: el.offsetWidth, h: el.offsetHeight };
      };
      const W = root.offsetWidth;
      const H = root.offsetHeight;

      const setActive = (idx: number) =>
        items.forEach((it, i) =>
          gsap.to(it, {
            color: i === idx ? "#ffffff" : "rgba(0,0,0,0.55)",
            duration: 0.2,
          }),
        );

      // Initial state
      const i0 = items[0];
      gsap.set(navHl, {
        x: i0.offsetLeft,
        y: i0.offsetTop,
        width: i0.offsetWidth,
        height: i0.offsetHeight,
      });
      setActive(0);
      gsap.set(panels, { opacity: 0 });
      gsap.set(panels[0], { opacity: 1, y: 0 });
      gsap.set(cursor, { x: W * 0.66, y: H * 0.92, opacity: 0, scale: 1 });
      gsap.set(rowHl, { opacity: 0 });
      const sparkLens = sparks.map((s) => s.getTotalLength());
      sparks.forEach((s, i) =>
        gsap.set(s, { strokeDasharray: sparkLens[i], strokeDashoffset: sparkLens[i] }),
      );

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power3.inOut" } });

      // Reset at the start of EVERY loop so a panel is always filled (the
      // Overview never shows blank between cycles) and the run replays cleanly.
      tl.set(panels, { opacity: 0, y: 8 });
      tl.set(panels[0], { opacity: 1, y: 0 });
      tl.add(() => setActive(0));
      tl.set(navHl, { x: i0.offsetLeft, y: i0.offsetTop, width: i0.offsetWidth });
      tl.set(rowHl, { opacity: 0 });
      tl.set(cursor, { x: W * 0.66, y: H * 0.92, opacity: 0, scale: 1 });
      tl.set(sparks, { strokeDashoffset: (i: number) => sparkLens[i] });

      // Intro — cursor glides in, sparklines draw, then dwell on the filled
      // Overview so it reads before the tour starts.
      tl.to(cursor, { opacity: 1, duration: 0.3, ease: "power2.out" });
      tl.to(sparks, { strokeDashoffset: 0, duration: 0.7, stagger: 0.12 }, "<");
      tl.to({}, { duration: 0.9 });

      const moveTo = (el: HTMLElement, dur = 0.55) => {
        const p = local(el);
        tl.to(cursor, { x: p.x + p.w * 0.5, y: p.y + p.h * 0.5, duration: dur });
      };
      const click = () => {
        tl.to(cursor, { scale: 0.82, duration: 0.08, ease: "power2.out" }).to(
          cursor,
          { scale: 1, duration: 0.14, ease: "back.out(2.2)" },
        );
      };

      // Panels are pre-reset to (opacity 0, y 8), so a plain .to crossfade is
      // enough — no fromTo (whose immediateRender blanks panels across loops).
      let cur = 0;
      const showPanel = (idx: number) => {
        if (idx === cur) return;
        tl.to(panels[cur], { opacity: 0, y: -6, duration: 0.22, ease: "power2.in" }, ">-0.05");
        tl.to(panels[idx], { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, "<0.06");
        cur = idx;
      };
      const visitNav = (idx: number) => {
        moveTo(items[idx]);
        click();
        tl.to(
          navHl,
          {
            x: items[idx].offsetLeft,
            y: items[idx].offsetTop,
            width: items[idx].offsetWidth,
            duration: 0.4,
            ease: "power3.out",
          },
          "<-0.04",
        );
        tl.add(() => setActive(idx), "<");
        showPanel(idx);
        tl.to({}, { duration: 0.45 });
      };

      // → Orders, then scan the table row by row
      visitNav(1);
      tl.set(rowHl, { opacity: 1 }, ">");
      rows.forEach((r) => {
        const p = local(r);
        tl.to(rowHl, { y: r.offsetTop, height: r.offsetHeight, duration: 0.24 });
        tl.to(cursor, { x: p.x + p.w * 0.3, y: p.y + p.h * 0.5, duration: 0.24 }, "<");
        tl.to({}, { duration: 0.16 });
      });
      tl.to(rowHl, { opacity: 0, duration: 0.2 });

      // → Inventory, → Customers, → back to Overview
      visitNav(2);
      tl.to({}, { duration: 0.5 });
      visitNav(3);
      tl.to({}, { duration: 0.5 });
      visitNav(0);

      // dwell on the filled Overview, then the cursor drifts out and loops
      tl.to({}, { duration: 0.7 });
      tl.to(cursor, {
        opacity: 0,
        x: W * 0.66,
        y: H * 0.92,
        duration: 0.6,
        ease: "power2.in",
      });
      tl.to({}, { duration: 0.4 });
    },
    { scope: ref as React.RefObject<HTMLElement> },
  );

  const card =
    "flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-black/[0.06] bg-white";
  const cardHead =
    "flex shrink-0 items-center justify-between border-b border-black/[0.06] px-2 py-1.5 font-mono text-[6.5px] uppercase tracking-[0.16em] text-black/45";

  return (
    <div ref={ref} className="relative flex h-full w-full flex-col">
      <ChromeBar url="admin.acme.internal" />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-[20%] shrink-0 flex-col border-r border-black/[0.06] bg-[#fafafa] p-2">
          <div className="flex items-center gap-1.5">
            <span className="grid size-3.5 place-items-center rounded-[3px] bg-accent text-[7px] font-bold text-on-accent">
              A
            </span>
            <span className="font-display text-[8.5px] font-bold leading-none text-black">
              Acme Ops
            </span>
          </div>
          <ul className="relative mt-3 space-y-[3px]">
            <span
              data-nav-hl
              aria-hidden
              className="absolute left-0 top-0 z-0 rounded bg-accent"
            />
            {nav.map((l) => (
              <li
                key={l}
                data-nav
                className="relative z-10 rounded px-1.5 py-[3px] text-[7.5px] font-medium"
                style={{ color: "rgba(0,0,0,0.55)" }}
              >
                {l}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center gap-1.5 border-t border-black/[0.06] pt-2">
            <span className="size-3.5 rounded-full bg-black/10" />
            <div className="leading-none">
              <p className="text-[7px] font-semibold text-black">Priya N.</p>
              <p className="mt-0.5 font-mono text-[6px] text-black/40">Admin</p>
            </div>
          </div>
        </aside>

        {/* Main — one panel per section, crossfaded by the cursor */}
        <main className="relative flex-1 overflow-hidden">
          {/* Overview */}
          <div data-panel className="absolute inset-0 flex flex-col p-2.5">
            <PanelHead title="Overview" sub="Mon, 8 Jun · live" chip="Last 30 days ▾" />
            <div className="mt-2.5 grid shrink-0 grid-cols-3 gap-2">
              {[
                { l: "Revenue", v: "₹4.2L", d: "+18%", spark: [4, 6, 5, 8, 7, 9, 8] },
                { l: "Orders", v: "127", d: "+6%", spark: [5, 5, 6, 6, 7, 7, 8] },
                { l: "Avg. order", v: "₹3,310", d: "+3%", spark: [6, 5, 7, 6, 7, 8, 8] },
              ].map((k) => (
                <div
                  key={k.l}
                  className="rounded-md border border-black/[0.06] bg-[#fafafa] p-1.5"
                >
                  <p className="font-mono text-[6px] uppercase tracking-[0.16em] text-black/40">
                    {k.l}
                  </p>
                  <div className="mt-1 flex items-end justify-between gap-1">
                    <p className="font-display text-[11px] font-extrabold leading-none text-black">
                      {k.v}
                    </p>
                    <Sparkline points={k.spark} />
                  </div>
                  <p className="mt-1 font-mono text-[6px] text-black/35">
                    {k.d} vs prev
                  </p>
                </div>
              ))}
            </div>
            <div className={`mt-2.5 ${card}`}>
              <div className={cardHead}>Activity</div>
              <div className="flex flex-1 flex-col">
                {DASH_ACTIVITY.map((a) => (
                  <div
                    key={a.t}
                    className="flex flex-1 items-center gap-2 border-t border-black/[0.04] px-2 text-[7.5px]"
                  >
                    <span className="size-1 rounded-full bg-accent" />
                    <span className="flex-1 text-black">{a.t}</span>
                    <span className="font-mono text-[6.5px] text-black/35">
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders */}
          <div data-panel className="absolute inset-0 flex flex-col p-2.5 opacity-0">
            <PanelHead title="Orders" sub="1,284 total" chip="Filter ▾" />
            <div className={`mt-2.5 ${card}`}>
              <div className="grid shrink-0 grid-cols-[0.8fr_1.5fr_1fr_0.8fr] border-b border-black/[0.06] px-2 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-black/35">
                <span>Order</span>
                <span>Customer</span>
                <span>Status</span>
                <span className="text-right">Total</span>
              </div>
              <div className="relative flex flex-1 flex-col">
                <span
                  data-row-hl
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-0 bg-accent/[0.06]"
                />
                {DASH_ORDERS.map((o) => (
                  <div
                    key={o.id}
                    data-row
                    className="relative z-10 grid flex-1 grid-cols-[0.8fr_1.5fr_1fr_0.8fr] items-center border-t border-black/[0.04] px-2 text-[7.5px]"
                  >
                    <span className="font-mono text-black/55">{o.id}</span>
                    <span className="font-medium text-black">{o.who}</span>
                    <span>
                      <span
                        className={`inline-flex rounded-full px-1.5 py-[1px] font-mono text-[6px] ${o.solid ? "bg-black text-white" : "border border-black/15 text-black/55"}`}
                      >
                        {o.status}
                      </span>
                    </span>
                    <span className="text-right font-mono font-semibold text-black">
                      {o.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div data-panel className="absolute inset-0 flex flex-col p-2.5 opacity-0">
            <PanelHead title="Inventory" sub="318 SKUs" chip="Low · 2" />
            <div className={`mt-2.5 ${card}`}>
              <div className={cardHead}>
                <span>SKU</span>
                <span>In stock</span>
              </div>
              <div className="flex flex-1 flex-col">
                {DASH_INVENTORY.map((s) => (
                  <div
                    key={s.sku}
                    className="flex flex-1 items-center gap-2 border-t border-black/[0.04] px-2 text-[7.5px]"
                  >
                    <span className="flex-1 truncate font-medium text-black">
                      {s.sku}
                    </span>
                    <span className="h-1 w-10 overflow-hidden rounded-full bg-black/10">
                      <span
                        className={`block h-full rounded-full ${s.low ? "bg-black/40" : "bg-accent"}`}
                        style={{ width: `${s.pct * 100}%` }}
                      />
                    </span>
                    <span className="w-5 text-right font-mono text-black/60">
                      {s.stock}
                    </span>
                    {s.low ? (
                      <span className="rounded-full bg-black px-1.5 py-[1px] font-mono text-[6px] text-white">
                        Low
                      </span>
                    ) : (
                      <span className="w-[18px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customers */}
          <div data-panel className="absolute inset-0 flex flex-col p-2.5 opacity-0">
            <PanelHead title="Customers" sub="2,140 total" chip="↑ 4.5%" />
            <div className={`mt-2.5 ${card}`}>
              <div className={cardHead}>
                <span>Customer</span>
                <span>Lifetime</span>
              </div>
              <div className="flex flex-1 flex-col">
                {DASH_CUSTOMERS.map((c) => (
                  <div
                    key={c.name}
                    className="flex flex-1 items-center gap-2 border-t border-black/[0.04] px-2 text-[7.5px]"
                  >
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-black/[0.07] font-mono text-[6px] font-bold text-black/55">
                      {c.init}
                    </span>
                    <div className="flex-1 leading-none">
                      <p className="font-semibold text-black">{c.name}</p>
                      <p className="mt-0.5 font-mono text-[6px] text-black/40">
                        {c.orders}
                      </p>
                    </div>
                    <span className="font-mono font-semibold text-black">
                      {c.spend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Animated cursor */}
      <svg
        data-cursor
        aria-hidden
        width="11"
        height="15"
        viewBox="0 0 11 15"
        className="pointer-events-none absolute left-0 top-0 z-50"
        style={{ filter: "drop-shadow(0 1px 1.5px rgba(0,0,0,0.35))" }}
      >
        <path
          d="M1 1 L1 12 L4 9.2 L6 13 L7.8 12.2 L5.8 8.4 L9.5 8.2 Z"
          fill="white"
          stroke="#0b0c0e"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function EcommerceSweepScreen() {
  // Generic template on the left vs a built-from-scratch storefront on the
  // right — both fleshed out so the contrast reads as "quality", not empty
  // boxes. Left stays fully grayscale; accent only appears on the custom side.
  return (
    <div className="flex h-full w-full flex-col">
      <ChromeBar url="custom.your-brand.com" />
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left — generic template (grayscale) */}
          <div className="relative flex flex-col overflow-hidden border-r border-black/10 bg-[#f3f3f4] p-2.5">
            {/* nav */}
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-7 rounded-[2px] bg-black/20" />
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1 w-3.5 rounded-[1px] bg-black/12" />
                ))}
              </div>
              <span className="size-2 rounded-full bg-black/15" />
            </div>
            {/* hero */}
            <div className="mt-2 grid place-items-center rounded-[3px] bg-black/[0.06] py-2.5">
              <span className="h-1.5 w-16 rounded bg-black/20" />
              <span className="mt-1 h-1 w-10 rounded bg-black/12" />
              <span className="mt-1.5 h-3 w-12 rounded-[3px] bg-black/25" />
            </div>
            {/* product grid */}
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {[0, 1].map((i) => (
                <div key={i}>
                  <div className="aspect-[5/4] rounded-[2px] bg-black/10" />
                  <span className="mt-1 block h-1 w-9 rounded bg-black/12" />
                  <span className="mt-0.5 block h-1 w-5 rounded bg-black/10" />
                </div>
              ))}
            </div>
            <p className="mt-auto font-mono text-[6.5px] text-black/35">
              1 of 12 stock themes
            </p>
          </div>

          {/* Right — built by tilde (accent + neutrals) */}
          <div className="relative flex flex-col overflow-hidden bg-white p-2.5">
            {/* nav */}
            <div className="flex items-center justify-between">
              <span className="font-display text-[8px] font-bold tracking-[0.12em] text-black">
                ATELIER
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[6px] text-black/45">
                <span>New</span>
                <span>Shop</span>
                <span>About</span>
              </div>
              <span className="size-2 rounded-full border border-black/25" />
            </div>
            {/* editorial hero */}
            <p className="mt-2 font-display text-[12px] font-extrabold leading-[0.92] text-black">
              Made well.
            </p>
            <p className="font-display text-[12px] italic leading-[0.92] text-black/55">
              Made yours.
            </p>
            {/* product cards with names + prices */}
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {[
                { name: "Silk camisole", price: "₹2,475", shade: 0.5 },
                { name: "Linen co-ord", price: "₹3,900", shade: 0.16 },
              ].map((p, i) => (
                <div key={p.name}>
                  <div
                    className="aspect-[5/4] rounded-[3px]"
                    style={{
                      background: `rgb(var(--accent-rgb) / ${p.shade})`,
                      animation: `tile-fade 4.4s ease-in-out ${i * 0.25}s infinite`,
                    }}
                  />
                  <p className="mt-1 text-[7px] font-semibold leading-none text-black">
                    {p.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[6.5px] text-black/45">
                    {p.price}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between">
              <span className="font-mono text-[6px] text-black/40">
                Free ship · ₹2K+
              </span>
              <span
                className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[7px] font-semibold text-on-accent"
                style={{ boxShadow: "0 4px 10px -4px rgb(var(--accent-rgb) / 0.5)" }}
              >
                Shop the edit →
              </span>
            </div>
          </div>
        </div>
        {/* Separator arrow */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 inline-flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-on-accent shadow-[0_4px_12px_-4px_rgb(var(--accent-rgb)/0.6)]"
        >
          →
        </span>
      </div>
    </div>
  );
}

function ShopifyStoreScreen() {
  const products = [
    { name: "Silk camisole", price: "₹2,475", shade: 0.5 },
    { name: "Linen co-ord", price: "₹3,900", shade: 0.22 },
    { name: "Wool scarf", price: "₹1,650", shade: 0.38 },
    { name: "Cotton tee", price: "₹990", shade: 0.16 },
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <ChromeBar url="your-brand.com · Shopify" />
      <div className="flex flex-1 flex-col overflow-hidden bg-white">
        {/* Site header */}
        <header className="flex shrink-0 items-center justify-between border-b border-black/[0.06] px-3 py-1.5">
          <div className="flex items-center gap-2 font-mono text-[6px] uppercase tracking-[0.14em] text-black/50">
            <span>New</span>
            <span>Shop</span>
            <span>Editorial</span>
          </div>
          <span className="font-display text-[10px] font-bold tracking-[0.2em] text-black">
            ATELIER
          </span>
          <div className="flex items-center gap-1.5">
            <svg width="7" height="7" viewBox="0 0 8 8" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1">
              <circle cx="3.3" cy="3.3" r="2.4" />
              <line x1="5.1" y1="5.1" x2="7" y2="7" strokeLinecap="round" />
            </svg>
            <svg width="7" height="8" viewBox="0 0 8 9" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1">
              <path d="M1 3 H7 L6.4 8 H1.6 Z" strokeLinejoin="round" />
              <path d="M2.6 3 V2 a1.4 1.4 0 0 1 2.8 0 V3" strokeLinecap="round" />
            </svg>
            <span
              className="inline-flex items-center gap-0.5 rounded-[2px] px-1 py-0.5 font-mono text-[5.5px] font-semibold text-white"
              style={{ backgroundColor: "#95BF47" }}
            >
              <span className="font-bold">S</span>Shopify
            </span>
          </div>
        </header>

        {/* Editorial hero */}
        <div className="flex min-h-0 flex-1">
          <div className="flex flex-1 flex-col justify-center px-3">
            <p className="font-mono text-[6px] uppercase tracking-[0.2em] text-black/40">
              Spring &apos;26 · New season
            </p>
            <p className="mt-1.5 font-display text-[19px] font-extrabold leading-[0.9] text-black">
              Made well.
            </p>
            <p className="font-display text-[19px] italic leading-[0.9] text-black/55">
              Made yours.
            </p>
            <p className="mt-2 max-w-[85%] text-[7px] leading-relaxed text-black/45">
              A custom Next.js storefront on your Shopify backend — fast,
              editorial, unmistakably yours.
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <span
                className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[8px] font-semibold text-on-accent"
                style={{ boxShadow: "0 4px 10px -4px rgb(var(--accent-rgb) / 0.5)" }}
              >
                Shop the drop →
              </span>
              <span className="font-mono text-[6.5px] text-black/40">
                Free ship · ₹2K+
              </span>
            </div>
          </div>
          {/* hero image */}
          <div
            className="relative w-[42%] overflow-hidden"
            style={{
              background:
                "linear-gradient(150deg, rgb(var(--accent-rgb) / 0.55), rgb(var(--accent-rgb) / 0.16))",
            }}
          >
            <div className="absolute -left-3 top-1 size-14 rounded-full bg-white/20 blur-md" />
            <span className="absolute left-2 top-2 rounded-[2px] bg-black/70 px-1 py-0.5 font-mono text-[5.5px] font-semibold uppercase tracking-wider text-white">
              SS &apos;26 · Lookbook
            </span>
            <div className="absolute bottom-2 left-2 flex items-center gap-0.5">
              <span className="h-0.5 w-2.5 rounded-full bg-white/80" />
              <span className="h-0.5 w-1 rounded-full bg-white/40" />
              <span className="h-0.5 w-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        {/* New in */}
        <div className="shrink-0 border-t border-black/[0.06] px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[6px] uppercase tracking-[0.18em] text-black/45">
              New in
            </p>
            <span className="font-mono text-[6px] text-accent">View all →</span>
          </div>
          <div className="mt-1.5 grid grid-cols-4 gap-2">
            {products.map((p, i) => (
              <div key={p.name}>
                <div
                  className="aspect-[4/3] rounded-[3px]"
                  style={{
                    background: `rgb(var(--accent-rgb) / ${p.shade})`,
                    animation: `tile-fade 4s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
                <p className="mt-1 truncate text-[6.5px] font-semibold leading-none text-black">
                  {p.name}
                </p>
                <p className="mt-0.5 font-mono text-[6px] text-black/45">
                  {p.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
