"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { site } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Site-wide Cal.com bootstrap. Initializing the embed API here:
 *  1. enables the delegated click handler so any element with
 *     `data-cal-link` / `data-cal-namespace` opens the scheduling popup, and
 *  2. registers a single `bookingSuccessful` listener (per namespace) that
 *     fires the `book_call` conversion event — covering popups AND the inline
 *     embeds (cal-embed, bridge-final-cta), since they share the namespace.
 *
 * Intentionally does not call `cal("ui", …)` so it doesn't override the
 * per-embed theming the inline embeds set for themselves.
 */
export function CalProvider() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: site.cal.namespace });
      if (cancelled) return;
      cal("on", {
        action: "bookingSuccessful",
        callback: () => trackEvent("book_call", { method: "cal" }),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
