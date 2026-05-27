"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#ffffff" },
          dark: { "cal-brand": "#ffffff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div
      // data-lenis-prevent: Lenis stops intercepting wheel events when the
      // cursor is inside this element, so the iframe handles scroll natively
      // instead of stuttering against Lenis's smooth-scroll loop.
      data-lenis-prevent
      className="overflow-hidden rounded-2xl border border-rule bg-bg"
      style={{ height: 680, minHeight: 640 }}
    >
      <Cal
        namespace="30min"
        calLink="tildeops/30min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
      />
    </div>
  );
}
