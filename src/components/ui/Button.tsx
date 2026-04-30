import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "ghost";

type Props = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
  external?: boolean;
};

const base =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/90",
  ghost:
    "border border-white/[0.08] bg-white/[0.02] text-fg/90 hover:bg-white/[0.06] hover:border-white/[0.18]",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  arrow = false,
  external = false,
}: Props) {
  const content = (
    <>
      {children}
      {arrow && <ArrowUpRight className="h-4 w-4" aria-hidden />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(base, variants[variant], className)}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)}>
      {content}
    </button>
  );
}
