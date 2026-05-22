import * as React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  /** Skip the default outer rounded-2xl + padding; useful when the consumer
   *  controls the surface chrome (e.g. grid cells). */
  bare?: boolean;
};

/**
 * Deep bridge-blue surface with a subtle film-grain overlay. Used across the
 * attribution dashboard cards so the analytics read as a single product
 * rather than a stack of plain white panels.
 */
export function DarkSurface({
  className = "",
  style,
  bare = false,
  children,
  ...rest
}: Props) {
  const base = bare
    ? `relative overflow-hidden ${className}`
    : `relative overflow-hidden rounded-2xl border border-white/[0.06] ${className}`;
  return (
    <div
      className={base}
      style={{
        background:
          "linear-gradient(180deg, #0a1126 0%, #050a1c 60%, #08102a 100%)",
        boxShadow: bare
          ? undefined
          : "0 30px 80px -30px rgba(8,30,90,0.55), 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.4) inset",
        ...style,
      }}
      {...rest}
    >
      {/* Film-grain overlay — same SVG pattern used in hero-bento */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
