// Dual-currency pricing. Visitors in India see INR; everyone else sees USD.
// The region is resolved at the edge (see proxy.ts) into the `tilde-currency`
// cookie, read client-side by the CurrencyProvider. Prices are deliberate
// price points per currency, not FX conversions, so each amount carries both.

export type Currency = "INR" | "USD";

/** A price point expressed in both currencies. */
export type Money = { inr: number; usd: number };

export const CURRENCY_COOKIE = "tilde-currency";

const SYMBOL: Record<Currency, string> = { INR: "₹", USD: "$" };
const LOCALE: Record<Currency, string> = { INR: "en-IN", USD: "en-US" };

/** Raw numeric amount for a currency (e.g. for CountUp animations). */
export function amountFor(m: Money, c: Currency): number {
  return c === "USD" ? m.usd : m.inr;
}

/** Currency symbol only, e.g. "₹" / "$". */
export function currencySymbol(c: Currency): string {
  return SYMBOL[c];
}

/** Formatted price with symbol + locale grouping, e.g. "₹40,000" / "$1,000". */
export function formatMoney(m: Money, c: Currency): string {
  return `${SYMBOL[c]}${amountFor(m, c).toLocaleString(LOCALE[c])}`;
}

/** Normalise an arbitrary cookie/header value to a Currency (default INR). */
export function toCurrency(value: string | null | undefined): Currency {
  return value === "USD" ? "USD" : "INR";
}
