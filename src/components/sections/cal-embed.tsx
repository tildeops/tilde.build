"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { site } from "@/lib/site";

export function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: site.cal.namespace });
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
    >
      {/* No fixed height / inner scroll — the embed auto-resizes its iframe to
          the content so the whole calendar is visible instead of scrolling
          within a clipped 680px box. */}
      <Cal
        namespace={site.cal.namespace}
        calLink={site.cal.link}
        style={{ width: "100%" }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
      />
    </div>
  );
}
