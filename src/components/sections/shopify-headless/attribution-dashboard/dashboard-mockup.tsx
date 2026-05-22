"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CountUp } from "@/components/motion/count-up";

/* Channel data — used for grouped ROAS bars + donut + funnel */
const CHANNELS = [
  { name: "Meta", roas: 4.2, share: 38, color: "#1877F2" },
  { name: "Google", roas: 3.6, share: 24, color: "#F9AB00" },
  { name: "Organic", roas: 9.1, share: 18, color: "#10B981" },
  { name: "Direct", roas: 6.8, share: 12, color: "#6366F1" },
  { name: "Email", roas: 11.4, share: 8, color: "#EC4899" },
];

/* 7-day revenue trend */
const TREND = [42, 48, 55, 51, 64, 72, 81];

/* Conversion funnel — w is the width percentage */
const FUNNEL = [
  { stage: "Sessions", value: 24800, w: 100 },
  { stage: "Product views", value: 12400, w: 70 },
  { stage: "Add to cart", value: 3800, w: 38 },
  { stage: "Checkout", value: 2100, w: 22 },
  { stage: "Purchase", value: 1450, w: 14 },
];

/* KPI sparklines — small 5-pt trails above each KPI */
const KPI_SPARKS: number[][] = [
  [4, 5, 4, 6, 7, 9],
  [3, 4, 5, 4, 6, 7],
  [5, 4, 6, 7, 8, 9],
];

export function DashboardMockup() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const funnelRefs = useRef<(SVGPolygonElement | null)[]>([]);
  const sparkRef = useRef<SVGPathElement | null>(null);
  const sparkFillRef = useRef<SVGPathElement | null>(null);
  const kpiSparkRefs = useRef<(SVGPathElement | null)[]>([]);
  const donutRefs = useRef<(SVGCircleElement | null)[]>([]);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      gsap.set(barRefs.current.filter(Boolean), { width: "0%" });
      gsap.set(funnelRefs.current.filter(Boolean), { scaleX: 0, transformOrigin: "left center" });

      const spark = sparkRef.current;
      if (spark) {
        const len = spark.getTotalLength();
        gsap.set(spark, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(sparkFillRef.current, { opacity: 0 });
      }

      kpiSparkRefs.current.forEach((p) => {
        if (!p) return;
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      // FIX: donut animation. Previous code overwrote each segment's
      // strokeDashoffset with segLen — that collapsed rotation positioning.
      // Correct approach: animate strokeDasharray from "0 <full>" → "<segLen> <gap>"
      // while keeping strokeDashoffset fixed at -offset (rotation).
      const donuts = donutRefs.current.filter(Boolean) as SVGCircleElement[];
      donuts.forEach((c) => {
        const target = c.getAttribute("data-target") ?? "";
        const full = c.getAttribute("data-full") ?? "";
        gsap.set(c, { attr: { "stroke-dasharray": `0 ${full}` } });
        // strokeDashoffset is preserved from JSX inline (rotation positioning).
        void target;
      });

      const t = ScrollTrigger.create({
        trigger: wrap,
        start: "top 78%",
        once: true,
        onEnter: () => {
          const max = Math.max(...CHANNELS.map((c) => c.roas));

          gsap.to(barRefs.current.filter(Boolean), {
            width: (i) => `${(CHANNELS[i].roas / max) * 100}%`,
            duration: 1.0,
            ease: "power2.out",
            stagger: 0.07,
          });

          gsap.to(funnelRefs.current.filter(Boolean), {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.07,
          });

          if (spark) {
            gsap.to(spark, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.inOut",
            });
            gsap.to(sparkFillRef.current, {
              opacity: 1,
              duration: 0.9,
              delay: 0.5,
              ease: "power2.out",
            });
          }

          gsap.to(kpiSparkRefs.current.filter(Boolean) as SVGPathElement[], {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
            stagger: 0.12,
          });

          donuts.forEach((c) => {
            const target = c.getAttribute("data-target") ?? "";
            gsap.to(c, {
              attr: { "stroke-dasharray": target },
              duration: 1.4,
              ease: "power2.out",
            });
          });
        },
      });

      return () => t.kill();
    },
    { scope: wrapRef as React.RefObject<HTMLElement>, dependencies: [] }
  );

  const sparkPath = buildSparkPath(TREND, 280, 60, 8);
  const sparkAreaPath = buildSparkArea(TREND, 280, 60, 8);

  // Donut segments
  const total = CHANNELS.reduce((acc, c) => acc + c.share, 0);
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;
  const donutSegments = CHANNELS.map((c) => {
    const frac = c.share / total;
    const segLen = frac * circumference;
    const offset = (cumulative / total) * circumference;
    cumulative += c.share;
    return { segLen, gap: circumference - segLen, offset, color: c.color };
  });

  const kpis = [
    {
      label: "Revenue",
      delta: "+22.4%",
      sub: "vs last 7d",
      deltaTone: "up" as const,
      content: (
        <CountUp to={1842000} prefix="₹" format={(n) => fmtINR(n)} />
      ),
    },
    {
      label: "Blended ROAS",
      delta: "+0.8×",
      sub: "vs last 7d",
      deltaTone: "up" as const,
      content: <CountUp to={5.4} decimals={1} suffix="×" />,
    },
    {
      label: "Orders",
      delta: `AOV ₹${Math.round(1842000 / 1450).toLocaleString("en-IN")}`,
      sub: "",
      deltaTone: "neutral" as const,
      content: <CountUp to={1450} format={(n) => n.toLocaleString("en-IN")} />,
    },
  ];

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_40px_80px_-30px_rgba(8,30,90,0.30),0_2px_4px_-2px_rgba(8,30,90,0.10)]"
    >
      {/* APP CHROME — top bar */}
      <div className="flex items-center justify-between border-b border-rule bg-bg-elevated/60 px-5 py-3">
        <div className="flex items-center gap-3">
          {/* Sidebar collapse hint */}
          <span className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-rule/50">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4 H14 M2 8 H14 M2 12 H14" />
            </svg>
          </span>
          {/* Breadcrumb */}
          <p className="text-[12px] font-medium text-ink-muted">
            <span className="text-ink">Tilde</span>
            <span className="mx-1.5 opacity-40">/</span>
            <span className="text-ink">Attribution</span>
          </p>
        </div>

        {/* Search ghost */}
        <div className="hidden flex-1 max-w-[260px] mx-6 items-center gap-2 rounded-md border border-rule bg-bg px-2.5 py-1 text-[11px] text-ink-muted/80 md:flex">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 L13 13" strokeLinecap="round" />
          </svg>
          <span>Search reports…</span>
          <span className="ml-auto font-mono text-[9px] text-ink-muted">⌘K</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted sm:inline">
            Last 7 days
          </span>
          <span
            className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-[10px] font-bold text-white"
            aria-hidden
          >
            T
          </span>
        </div>
      </div>

      {/* Sub-toolbar — live status */}
      <div className="flex items-center justify-between border-b border-rule px-5 md:px-7 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className="size-1.5 rounded-full bg-emerald-500"
            style={{ boxShadow: "0 0 8px rgba(16,185,129,0.6)" }}
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Live · synced 2s ago
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          All channels
        </p>
      </div>

      <div className="p-5 md:p-7">
        {/* KPI row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {kpis.map((kpi, i) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-rule bg-bg-elevated/40 p-4"
            >
              <div className="flex items-start justify-between">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  {kpi.label}
                </p>
                {/* KPI mini sparkline */}
                <svg viewBox="0 0 50 16" className="h-4 w-[50px]" aria-hidden>
                  <path
                    ref={(el) => {
                      kpiSparkRefs.current[i] = el;
                    }}
                    d={buildSparkPath(KPI_SPARKS[i], 50, 16, 2)}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-2 font-display font-bold text-[clamp(1.6rem,3.2vw,2.2rem)] leading-[1.05] tracking-[-0.04em] text-ink tabular-nums">
                {kpi.content}
              </p>
              <p
                className={`mt-1 text-[11px] font-medium ${
                  kpi.deltaTone === "up"
                    ? "text-emerald-600"
                    : "text-ink-muted"
                }`}
              >
                {kpi.deltaTone === "up" && (
                  <span className="mr-1 inline-block">▲</span>
                )}
                {kpi.delta} {kpi.sub && <span className="text-ink-muted">{kpi.sub}</span>}
              </p>
            </div>
          ))}
        </div>

        {/* Charts row 1 — ROAS bars + donut */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12">
          <ChartCard
            title="ROAS by channel"
            pill="7d avg"
            className="md:col-span-7"
          >
            <div className="mt-1 space-y-2">
              {CHANNELS.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="w-16 text-[11px] font-medium text-ink-muted">
                    {c.name}
                  </span>
                  <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-rule/30">
                    <div
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${c.color} 0%, ${c.color}aa 100%)`,
                        width: "0%",
                        willChange: "width",
                      }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-[11px] tabular-nums text-ink">
                    {c.roas.toFixed(1)}×
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard
            title="Revenue mix"
            pill="attributed"
            className="md:col-span-5"
          >
            <div className="mt-2 flex items-center gap-5">
              <svg viewBox="-50 -50 100 100" className="size-28 -rotate-90">
                <circle
                  cx="0"
                  cy="0"
                  r={radius}
                  fill="none"
                  stroke="rgba(0,0,0,0.05)"
                  strokeWidth="10"
                />
                {donutSegments.map((seg, i) => (
                  <circle
                    key={i}
                    ref={(el) => {
                      donutRefs.current[i] = el;
                    }}
                    cx="0"
                    cy="0"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="10"
                    strokeDasharray={`${seg.segLen} ${seg.gap}`}
                    strokeDashoffset={-seg.offset}
                    data-target={`${seg.segLen} ${seg.gap}`}
                    data-full={circumference}
                  />
                ))}
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  dy="0.35em"
                  className="rotate-90"
                  style={{ transform: "rotate(90deg)", transformOrigin: "center", fontSize: 10, fontWeight: 700, fill: "var(--color-ink)" }}
                >
                  5
                </text>
              </svg>
              <ul className="flex-1 space-y-1.5">
                {CHANNELS.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <span className="flex items-center gap-2 text-ink-muted">
                      <span
                        className="size-2 rounded-sm"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.name}
                    </span>
                    <span className="font-mono font-semibold tabular-nums text-ink">
                      {c.share}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ChartCard>
        </div>

        {/* Charts row 2 — Funnel + Sparkline */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12">
          <ChartCard
            title="Conversion funnel"
            pill="session → purchase"
            className="md:col-span-7"
          >
            <div className="mt-1">
              <svg viewBox="0 0 320 160" className="h-[160px] w-full" preserveAspectRatio="none">
                {FUNNEL.map((f, i) => {
                  const yTop = (i / FUNNEL.length) * 160 + 4;
                  const yBottom = ((i + 1) / FUNNEL.length) * 160 - 4;
                  const wTop = (f.w / 100) * 320;
                  const wBottom =
                    i < FUNNEL.length - 1
                      ? (FUNNEL[i + 1].w / 100) * 320
                      : wTop * 0.85;
                  const cx = 160;
                  const x1 = cx - wTop / 2;
                  const x2 = cx + wTop / 2;
                  const x3 = cx + wBottom / 2;
                  const x4 = cx - wBottom / 2;
                  return (
                    <polygon
                      key={f.stage}
                      ref={(el) => {
                        funnelRefs.current[i] = el;
                      }}
                      points={`${x1},${yTop} ${x2},${yTop} ${x3},${yBottom} ${x4},${yBottom}`}
                      fill={`url(#funnel-grad-${i})`}
                      style={{ willChange: "transform" }}
                    />
                  );
                })}
                <defs>
                  {FUNNEL.map((_, i) => (
                    <linearGradient
                      key={i}
                      id={`funnel-grad-${i}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={1 - i * 0.14} />
                      <stop offset="100%" stopColor="var(--color-accent-bright)" stopOpacity={1 - i * 0.14} />
                    </linearGradient>
                  ))}
                </defs>
              </svg>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {FUNNEL.map((f) => (
                  <div key={f.stage} className="text-center">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                      {f.stage}
                    </p>
                    <p className="mt-1 font-mono text-[11px] font-semibold tabular-nums text-ink">
                      {f.value.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard
            title="7-day trend"
            pill="▲ 92.8%"
            pillTone="positive"
            className="md:col-span-5"
          >
            <div className="mt-1">
              <svg viewBox="0 0 280 60" className="h-20 w-full">
                <defs>
                  <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  ref={sparkFillRef}
                  d={sparkAreaPath}
                  fill="url(#spark-fill)"
                />
                <path
                  ref={sparkRef}
                  d={sparkPath}
                  stroke="var(--color-accent)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="mt-1 flex justify-between font-mono text-[9px] text-ink-muted">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ */

function ChartCard({
  title,
  pill,
  pillTone = "default",
  className = "",
  children,
}: {
  title: string;
  pill: string;
  pillTone?: "default" | "positive";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border border-rule bg-bg-elevated/40 p-5 ${className}`}>
      <div className="flex items-baseline justify-between">
        <p className="text-[14px] font-semibold tracking-[-0.005em] text-ink">
          {title}
        </p>
        <span
          className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] ${
            pillTone === "positive"
              ? "bg-emerald-500/12 text-emerald-700"
              : "bg-bg text-ink-muted ring-1 ring-rule"
          }`}
        >
          {pill}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ */

function buildSparkPath(values: number[], width: number, height: number, pad: number) {
  const n = values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = (width - pad * 2) / (n - 1);

  return values
    .map((v, i) => {
      const x = pad + i * step;
      const y = pad + (1 - (v - min) / range) * (height - pad * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function buildSparkArea(values: number[], width: number, height: number, pad: number) {
  const line = buildSparkPath(values, width, height, pad);
  return `${line} L ${width - pad} ${height} L ${pad} ${height} Z`;
}

function fmtINR(n: number) {
  return Math.round(n).toLocaleString("en-IN");
}
