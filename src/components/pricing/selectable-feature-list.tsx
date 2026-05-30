"use client";

import { Check, Plus } from "lucide-react";
import type { SelectableFeature } from "@/lib/pricing/services";
import { cn } from "@/lib/utils";

/**
 * Add-on features the visitor can pick for a quote. Deliberately price-free:
 * selecting them builds the list we price manually. Each row is a native
 * checkbox wrapped in a <label> so it's keyboard- and screen-reader friendly.
 */
export function SelectableFeatureList({
  features,
  selectedIds,
  onToggle,
}: {
  features: SelectableFeature[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {features.map((f) => {
        const checked = selectedIds.has(f.id);
        return (
          <li key={f.id}>
            <label
              className={cn(
                "group flex h-full cursor-pointer select-none items-start gap-3 rounded-2xl border bg-bg p-4 transition-all duration-200",
                "hover:-translate-y-0.5 active:translate-y-0",
                "focus-within:ring-2 focus-within:ring-accent",
                checked
                  ? "border-accent shadow-[0_14px_34px_-20px_rgb(var(--accent-rgb)/0.6)] ring-1 ring-accent"
                  : "border-rule shadow-[0_1px_2px_rgba(11,12,14,0.04)] hover:border-ink-muted/50 hover:shadow-[0_14px_32px_-20px_rgba(8,30,90,0.4)]",
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => onToggle(f.id)}
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-200",
                  checked
                    ? "border-accent bg-accent text-on-accent"
                    : "border-rule bg-bg text-ink-muted group-hover:border-ink-muted/50",
                )}
              >
                {checked ? (
                  <Check className="size-3.5" strokeWidth={2.5} />
                ) : (
                  <Plus className="size-3.5" strokeWidth={2} />
                )}
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-semibold leading-tight tracking-[-0.005em] text-ink">
                  {f.label}
                </span>
                {f.description && (
                  <span className="mt-1 block text-[13px] text-ink-muted leading-snug">
                    {f.description}
                  </span>
                )}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
