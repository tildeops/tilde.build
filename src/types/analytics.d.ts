// Global typings for the third-party analytics / scheduling globals that the
// loader scripts attach to `window` (see components/analytics/analytics.tsx
// and the Cal.com embeds). Keeps call sites free of `any` casts.

export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    clarity?: (method: string, ...args: unknown[]) => void;
    Cal?: ((...args: unknown[]) => void) & {
      ns?: Record<string, (...args: unknown[]) => void>;
    };
  }
}
