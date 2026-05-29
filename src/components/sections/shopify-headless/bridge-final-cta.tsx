"use client";

import { useEffect } from "react";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealLines } from "@/components/motion/reveal-lines";

const CAL_ELEMENT_ID = "my-cal-inline-30min";

export function BridgeFinalCTA() {
  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params */
    // Cal.com inline embed bootstrap — ported verbatim from the dashboard
    // snippet. Typed loosely because the embed assigns and mutates a global.
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    Cal("init", "30min", { origin: "https://app.cal.com" });
    Cal.ns["30min"]("inline", {
      elementOrSelector: `#${CAL_ELEMENT_ID}`,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "tildeops/30min",
    });
    Cal.ns["30min"]("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#ffffff" },
        dark: { "cal-brand": "#ffffff" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    /* eslint-enable @typescript-eslint/no-explicit-any, prefer-rest-params */
  }, []);

  return (
    <section
      id="final-cta"
      className="relative w-full px-4 pb-20 pt-8 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1240px]">
        <div
          className="relative overflow-hidden rounded-[28px]"
          style={{
            background:
              "radial-gradient(at 20% 0%, var(--color-accent-bright) 0%, var(--color-accent) 55%, var(--color-accent-deep) 100%)",
          }}
        >
          {/* Subtle dot grid overlay for texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Highlight crest */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
            style={{ background: "rgba(255,255,255,0.30)" }}
          />

          {/* Content — stacked so the embed gets full width and renders horizontally */}
          <div className="relative z-10 flex flex-col gap-10 px-6 py-12 md:gap-12 md:px-12 md:py-14">
            {/* Top — copy in a two-column row (text + bullets) */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-7">
                <FadeUp>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-white" />
                    <span className="text-[12px] font-medium text-white/90">
                      3–4 week build · ₹40,000 fixed
                    </span>
                  </div>
                </FadeUp>

                <RevealLines
                  as="h2"
                  className="mt-5 font-display font-extrabold leading-[0.98] tracking-[-0.045em] text-white text-[clamp(1.75rem,4vw,2.8rem)]"
                >
                  Ship the store your brand actually deserves.
                </RevealLines>

                <FadeUp delay={0.2}>
                  <p className="mt-4 max-w-xl text-[14px] text-white/80 leading-relaxed md:text-[15px]">
                    30-minute discovery call. We tell you honestly whether
                    headless is right for you. No deck, no sales pitch.
                  </p>
                </FadeUp>
              </div>

              <div className="md:col-span-5">
                <FadeUp delay={0.35}>
                  <ul className="space-y-1.5">
                    {[
                      "Audit your current Shopify setup",
                      "Walk through real headless examples",
                      "Decide if we're a fit — no obligation",
                    ].map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-2.5 text-[13.5px] text-white/85"
                      >
                        <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-white/80" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </FadeUp>

                <FadeUp delay={0.5}>
                  <p className="mt-5 text-[12px] font-medium text-white/55">
                    Or email{" "}
                    <a
                      href="mailto:hello@tilde.build"
                      className="underline-offset-4 hover:underline"
                    >
                      hello@tilde.build
                    </a>
                    {" "}— we read everything.
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* Bottom — full-width Cal embed; wide enough for horizontal month_view */}
            <FadeUp delay={0.3}>
              <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45),0_2px_4px_-2px_rgba(0,0,0,0.15)]">
                <div className="overflow-hidden rounded-xl" style={{ height: 620 }}>
                  <div
                    id={CAL_ELEMENT_ID}
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
