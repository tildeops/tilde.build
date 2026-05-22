import { cn } from "@/lib/utils";

const SIZE_MAP = {
  sm: { h: 20, fontSize: 22 },
  md: { h: 28, fontSize: 30 },
  lg: { h: 44, fontSize: 48 },
} as const;

export function TildeMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { h, fontSize } = SIZE_MAP[size];
  // Viewbox tuned so the `t` stem + tilde-crossbar + ilde fits cleanly
  // Width chosen empirically based on rendered Cormorant text below.
  const w = h * 3.05;

  return (
    <span
      className={cn("inline-flex items-center leading-none select-none", className)}
      style={{ height: h }}
      aria-label="tilde"
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        fill="none"
        aria-hidden
        role="img"
        style={{ display: "block" }}
      >
        {/* Lowercase t — vertical stem */}
        <path
          d={`M ${h * 0.34} ${h * 0.05}
              L ${h * 0.34} ${h * 0.78}
              Q ${h * 0.34} ${h * 0.93}, ${h * 0.5} ${h * 0.95}`}
          stroke="var(--color-ink)"
          strokeWidth={h * 0.085}
          strokeLinecap="round"
          fill="none"
        />
        {/* Tilde curve (replaces the t crossbar) */}
        <path
          d={`M ${h * 0.06} ${h * 0.34}
              C ${h * 0.18} ${h * 0.18}, ${h * 0.3} ${h * 0.5}, ${h * 0.42} ${h * 0.34}
              S ${h * 0.62} ${h * 0.18}, ${h * 0.74} ${h * 0.34}`}
          stroke="var(--color-accent)"
          strokeWidth={h * 0.095}
          strokeLinecap="round"
          fill="none"
        />
        {/* ilde — rendered as Cormorant text so kerning + style match */}
        <text
          x={h * 0.82}
          y={h * 0.95}
          fill="var(--color-ink)"
          fontFamily="var(--font-display)"
          fontSize={fontSize}
          fontWeight={500}
          style={{ letterSpacing: "-0.01em" }}
        >
          ilde
        </text>
      </svg>
    </span>
  );
}
