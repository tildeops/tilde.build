"use client";

import * as React from "react";
import { storefronts } from "@/lib/storefronts";
import { DefaultScreen } from "./default-screen";
import { TildeScreen } from "./tilde-screen";

const PICK_SLUG = "plain-skin";

/**
 * Mobile-only (and reduced-motion) before/after viewer.
 *
 * On mobile we mirror the desktop pin-and-reveal mechanic in a simpler shape:
 * the section pins, scroll progress drives a horizontal wipe between the
 * Default Shopify storefront and the Tilde build inside an iPhone frame, and
 * the "Default Shopify" / "Tilde build" label pair switches emphasis as the
 * wipe crosses the midpoint. Implementation uses native CSS `sticky` + a
 * scroll listener (same pattern as `email-swap.tsx`) — no GSAP pin, so iOS
 * Safari's momentum scroll isn't disturbed.
 */
export function MobileStack() {
  const brand = storefronts.find((s) => s.slug === PICK_SLUG)!;

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const tildeClipRef = React.useRef<HTMLDivElement | null>(null);
  const separatorRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const p = scrolled / total;
      setProgress(p);

      const pct = p * 100;
      if (tildeClipRef.current) {
        // Default stays on the LEFT, Tilde reveals from the RIGHT side as
        // the separator sweeps right→left. Inset clips Tilde from the left
        // by (100-pct)% so only the right portion (to the right of the
        // separator) shows the Tilde version.
        tildeClipRef.current.style.clipPath = `inset(0 0 0 ${100 - pct}%)`;
      }
      if (separatorRef.current) {
        const edgeFade = p < 0.02 || p > 0.98 ? 0 : 1;
        separatorRef.current.style.left = `${100 - pct}%`;
        separatorRef.current.style.opacity = String(edgeFade);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const defaultActive = progress < 0.5;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative mt-20 w-full md:mt-28 lg:mt-32"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center px-4 pt-20 pb-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-[480px] flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg-elevated px-3 py-1.5">
            <span
              className="size-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px rgb(var(--accent-rgb) / 0.6)" }}
            />
            <span className="text-[12px] font-medium text-ink-muted">
              The before &amp; after
            </span>
          </div>
          <h2 className="mt-4 text-center font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-ink text-[clamp(1.5rem,6vw,2.4rem)]">
            Same Shopify backend.
            <br />
            <span className="text-ink-muted">A different universe up front.</span>
          </h2>

          {/* Label pair — Default on the left (where it stays during scroll),
              Tilde on the right (the side it reveals from). Emphasis switches
              at the wipe midpoint. */}
          <div className="mt-5 flex w-full items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
            <span
              className={`flex items-center gap-1.5 transition-colors duration-300 ${
                defaultActive ? "text-ink" : "text-ink-muted/50"
              }`}
            >
              <span
                className={`inline-block size-2 rounded-sm transition-colors duration-300 ${
                  defaultActive ? "bg-[#0c5132]" : "bg-ink-muted/30"
                }`}
                aria-hidden
              />
              Default Shopify
            </span>
            <span
              className={`flex items-center gap-1.5 transition-colors duration-300 ${
                !defaultActive ? "text-accent" : "text-ink-muted/50"
              }`}
            >
              Tilde build
              <span
                className={`inline-block size-2 rounded-sm transition-colors duration-300 ${
                  !defaultActive ? "bg-accent" : "bg-ink-muted/30"
                }`}
                style={
                  !defaultActive
                    ? { boxShadow: "0 0 8px rgb(var(--accent-rgb) / 0.5)" }
                    : undefined
                }
                aria-hidden
              />
            </span>
          </div>

          {/* iPhone frame with the wipe inside */}
          <div className="mt-4 w-full max-w-[260px]">
            <IPhoneFrame>
              <div className="relative h-full w-full">
                {/* Base layer — Default storefront */}
                <div className="absolute inset-0 overflow-hidden bg-white">
                  <ScaledStorefront>
                    <DefaultScreen brand={brand} />
                  </ScaledStorefront>
                </div>

                {/* Reveal layer — Tilde storefront. Starts fully clipped from
                    the left (Tilde hidden, Default visible everywhere) and
                    the clip recedes rightward as the user scrolls. Separator
                    sweeps right→left exposing more Tilde on the right side. */}
                <div
                  ref={tildeClipRef}
                  className="absolute inset-0 overflow-hidden bg-white"
                  style={{
                    clipPath: "inset(0 0 0 100%)",
                    WebkitClipPath: "inset(0 0 0 100%)",
                    willChange: "clip-path",
                  }}
                >
                  <ScaledStorefront>
                    <TildeScreen brand={brand} />
                  </ScaledStorefront>
                </div>

                {/* Vertical wipe line + small handle indicator */}
                <div
                  ref={separatorRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 z-20"
                  style={{
                    left: "0%",
                    width: "2px",
                    backgroundColor: "var(--color-accent)",
                    transform: "translateX(-1px)",
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.2), 0 0 24px rgb(var(--accent-rgb) / 0.45)",
                    opacity: 0,
                    willChange: "left, opacity",
                  }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-on-accent"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.25), 0 8px 24px -8px rgba(0,0,0,0.5)",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path d="M5 4 L1 8 L5 12 M11 4 L15 8 L11 12 M1 8 H15" />
                    </svg>
                  </div>
                </div>
              </div>
            </IPhoneFrame>
          </div>

          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Scroll to compare ↓
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Renders a (wide-by-design) storefront screen at a downscaled width that
 * fits an iPhone viewport. The natural design width is preserved (760px)
 * and a CSS transform shrinks it so the layout reads cleanly instead of
 * squishing.
 */
function ScaledStorefront({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: "760px",
          transform: "scale(0.36)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto w-full rounded-[44px] p-2.5"
      style={{
        aspectRatio: "9 / 19",
        background:
          "linear-gradient(180deg, #1c1c1f 0%, #0e0e10 55%, #18181b 100%)",
        boxShadow:
          "0 50px 100px -40px rgba(8,30,90,0.40), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.10) inset",
      }}
    >
      {/* Side button hints */}
      <span
        className="absolute -left-[3px] top-[18%] h-10 w-1 rounded-l-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />
      <span
        className="absolute -left-[3px] top-[28%] h-16 w-1 rounded-l-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />
      <span
        className="absolute -right-[3px] top-[24%] h-20 w-1 rounded-r-full"
        style={{ background: "#1a1a1c" }}
        aria-hidden
      />

      <div
        className="relative h-full w-full overflow-hidden rounded-[36px] bg-white"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 8px rgba(0,0,0,0.6)",
        }}
      >
        {children}

        {/* Notch — overlays the content */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-2 z-30 h-6 w-24 -translate-x-1/2 rounded-full"
          style={{ background: "#0a0a0a" }}
        />
      </div>
    </div>
  );
}
