import { site } from "@/lib/site";

/**
 * "Build in progress" overlay for the hero band: a frosted status pill at the
 * top-left and a diagonal corner ribbon at the top-right. Both sit inside the
 * band (which is `overflow-hidden`, so the ribbon clips cleanly to the corner)
 * and stay clear of the center-top NotchNav. Rendered only when
 * `site.buildInProgress` is true (toggle via NEXT_PUBLIC_BUILD_IN_PROGRESS).
 */
export function HeroBuildOverlay() {
  if (!site.buildInProgress) return null;

  return (
    <>
      {/* Frosted status pill — top-left, clear of the centered notch nav. */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-md">
          <span className="text-[13px] leading-none" aria-hidden>
            🚧
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
            Build in progress
          </span>
        </div>
      </div>

      {/* Diagonal corner ribbon — top-right, clipped by the band's rounded
          corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-58px] top-[26px] z-20 w-[180px] rotate-45"
      >
        <div className="border-y border-white/25 bg-white/15 py-1 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md">
          Beta
        </div>
      </div>
    </>
  );
}
