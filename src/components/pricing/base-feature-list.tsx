import { Check } from "lucide-react";

/**
 * Read-only list of features included at a service's base price. No prices,
 * no interaction — just confirmation of what ships. Mirrors the check-row
 * styling used on the original /pricing breakdown.
 */
export function BaseFeatureList({ features }: { features: string[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 md:gap-x-10 md:gap-y-6">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent ring-1 ring-accent/20">
            <Check className="size-3" />
          </span>
          <p className="text-[15px] font-medium leading-snug tracking-[-0.005em] text-ink">
            {f}
          </p>
        </li>
      ))}
    </ul>
  );
}
