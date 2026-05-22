import * as React from "react";
import { cn } from "@/lib/utils";

type SectionFrameProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  innerClassName?: string;
  /** Kept for API compatibility; page-level frame now owns the editorial rails. */
  framed?: boolean;
};

export function SectionFrame({
  id,
  className,
  innerClassName,
  framed = true,
  children,
  ...rest
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className={cn("relative w-full px-4 sm:px-6 lg:px-10", className)}
      {...rest}
    >
      <div className="mx-auto max-w-[1240px]">
        <div
          className={cn(
            "relative py-20 md:py-28 lg:py-32",
            framed && "px-4 sm:px-8 md:px-12",
            innerClassName
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export function BracketCorners({
  size = "size-5 md:size-6",
  stroke = "stroke-rule",
  strokeWidth = 1.25,
}: {
  size?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn(
          "absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2",
          size,
          stroke
        )}
        fill="none"
        strokeWidth={strokeWidth}
      >
        <path d="M2 22 V2 H22" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn(
          "absolute right-0 top-0 translate-x-1/2 -translate-y-1/2",
          size,
          stroke
        )}
        fill="none"
        strokeWidth={strokeWidth}
      >
        <path d="M22 22 V2 H2" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn(
          "absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
          size,
          stroke
        )}
        fill="none"
        strokeWidth={strokeWidth}
      >
        <path d="M2 2 V22 H22" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn(
          "absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2",
          size,
          stroke
        )}
        fill="none"
        strokeWidth={strokeWidth}
      >
        <path d="M22 2 V22 H2" />
      </svg>
    </>
  );
}

export function Eyebrow({
  children,
  className,
  shimmer = false,
}: {
  children: React.ReactNode;
  className?: string;
  shimmer?: boolean;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] tracking-[0.18em] uppercase",
        shimmer ? "shimmer" : "text-ink-muted",
        className
      )}
    >
      {children}
    </p>
  );
}
