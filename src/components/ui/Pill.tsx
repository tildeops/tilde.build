import { cn } from "@/lib/utils";

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-divider/10 bg-white/[0.04] px-3 py-1.5 text-[11px] tracking-wide text-fg/80",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden />
      {children}
    </span>
  );
}
