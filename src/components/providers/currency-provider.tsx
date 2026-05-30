"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import {
  CURRENCY_COOKIE,
  toCurrency,
  type Currency,
} from "@/lib/pricing/currency";

type Ctx = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
};

const CurrencyContext = createContext<Ctx | null>(null);

// Module-level subscription so a manual toggle re-renders every consumer.
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function readCookie(): Currency {
  if (typeof document === "undefined") return "INR";
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CURRENCY_COOKIE}=([^;]*)`),
  );
  return toCurrency(match ? decodeURIComponent(match[1]) : null);
}
function getServerSnapshot(): Currency {
  return "INR";
}

/**
 * Shares the active display currency across the site. Server-rendered HTML is
 * always INR (the stable server snapshot); after hydration the `tilde-currency`
 * cookie — set at the edge by proxy.ts from the visitor's country — is read via
 * useSyncExternalStore, so international visitors swap to USD without a
 * hydration mismatch. A manual toggle writes the cookie and notifies listeners.
 */
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(
    subscribe,
    readCookie,
    getServerSnapshot,
  );

  const setCurrency = useCallback((c: Currency) => {
    try {
      document.cookie = `${CURRENCY_COOKIE}=${c}; path=/; max-age=${60 * 60 * 24 * 180}; samesite=lax`;
    } catch {}
    listeners.forEach((l) => l());
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx)
    throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
