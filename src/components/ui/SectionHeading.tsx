import { Pill } from "./Pill";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Pill className="mb-5">{eyebrow}</Pill>
      <h2 className="font-display text-[40px] leading-[1.05] tracking-[-0.01em] sm:text-[56px]">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          {sub}
        </p>
      )}
    </div>
  );
}
