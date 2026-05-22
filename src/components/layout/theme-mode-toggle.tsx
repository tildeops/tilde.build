"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeMode } from "@/components/providers/theme-mode-provider";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Visual variant — "over-accent" (light icon on translucent dark) vs "chrome" (themed). */
  variant?: "over-accent" | "chrome";
};

export function ThemeModeToggle({ className, variant = "over-accent" }: Props) {
  const { mode, toggle } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const label = mode === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border transition-colors",
        variant === "over-accent"
          ? "border-white/15 bg-black/30 text-on-accent backdrop-blur-[2px] hover:bg-black/40 hover:border-white/25"
          : "border-rule text-ink hover:bg-bg-elevated",
        className
      )}
    >
      {/* Render both, swap with opacity to avoid hydration flash */}
      <Sun
        className={cn(
          "size-[18px] transition-all duration-300",
          mounted && mode === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute size-[18px] transition-all duration-300",
          mounted && mode === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        aria-hidden
      />
    </button>
  );
}
