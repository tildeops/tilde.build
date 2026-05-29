/**
 * Fire a custom analytics event to both Google Analytics 4 and Microsoft
 * Clarity. SSR-safe (no-op on the server) and resilient if gtag hasn't loaded
 * yet (falls back to pushing onto the GA dataLayer).
 *
 * Keep params PII-free — names, emails, and message bodies must never be sent.
 */
export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params ?? {});
  } else {
    (window.dataLayer ??= []).push(["event", name, params ?? {}]);
  }

  // Clarity custom event — becomes a filter/segment in the dashboard.
  window.clarity?.("event", name);
}
