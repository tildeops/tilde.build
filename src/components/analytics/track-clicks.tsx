"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

/**
 * One capture-phase click listener that handles two things for any element
 * (or ancestor) carrying the relevant data attributes:
 *
 * 1. **Analytics** — `data-evt` fires a `trackEvent`. The event name is
 *    `data-evt`; every other `data-evt-*` becomes a param
 *    (`data-evt-location` → `{ location }`, `data-evt-cta` → `{ cta }`).
 *
 * 2. **Cal.com popup** — `data-cal-link` opens the scheduling modal in place.
 *    Running in the capture phase and calling `preventDefault` +
 *    `stopPropagation` lets us beat Next's `<Link>` client navigation (which
 *    would otherwise win the click) and avoids Cal's own delegated handler
 *    double-firing. Plain/modified clicks (cmd/ctrl/middle) and the case where
 *    Cal isn't ready fall through to the element's `href` (e.g. `/contact`).
 */
export function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("[data-evt], [data-cal-link]");
      if (!el) return;

      if (el.dataset.evt) {
        const params: Record<string, string> = {};
        for (const [key, value] of Object.entries(el.dataset)) {
          if (key === "evt" || !key.startsWith("evt") || value == null) continue;
          const paramKey = key.slice(3, 4).toLowerCase() + key.slice(4);
          params[paramKey] = value;
        }
        trackEvent(el.dataset.evt, params);
      }

      const calLink = el.dataset.calLink;
      const plainClick =
        e.button === 0 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey;
      if (calLink && plainClick) {
        const ns = el.dataset.calNamespace ?? site.cal.namespace;
        const cal = window.Cal;
        if (cal?.ns?.[ns]) {
          e.preventDefault();
          e.stopPropagation();
          cal.ns[ns]("modal", { calLink });
        }
        // Cal not ready → let the click proceed to the href fallback.
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
