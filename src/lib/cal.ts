import { site } from "@/lib/site";

/**
 * Spread onto any link or button to (a) open the Cal.com scheduling popup on
 * click (handled by the embed initialized in `CalProvider`) and (b) record a
 * `cta_click` analytics event via the delegated `TrackClicks` listener.
 * Keep an `href` on the element as a no-JS fallback (e.g. `/contact`).
 *
 *   <Link href="/contact" {...calTrigger("hero")}>Book a call</Link>
 */
export function calTrigger(location: string) {
  return {
    "data-cal-namespace": site.cal.namespace,
    "data-cal-link": site.cal.link,
    "data-evt": "cta_click",
    "data-evt-location": location,
    "data-evt-cta": "book_call",
  } as const;
}
