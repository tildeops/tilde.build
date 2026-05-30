import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CURRENCY_COOKIE } from "@/lib/pricing/currency";

/**
 * Resolve display currency from the visitor's region at the edge, once. Vercel
 * sets `x-vercel-ip-country`; India → INR, everywhere else → USD. We only set
 * the cookie when it's absent, so a manual ₹/$ toggle (which overwrites the
 * cookie client-side) is never clobbered. Pages stay statically rendered — they
 * read this cookie on the client, not via headers()/cookies().
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has(CURRENCY_COOKIE)) {
    const country = request.headers.get("x-vercel-ip-country");
    const currency = country === "IN" ? "INR" : "USD";
    response.cookies.set(CURRENCY_COOKIE, currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/", "/pricing/:path*", "/shopify-headless"],
};
