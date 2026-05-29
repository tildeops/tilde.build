"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "tilde-cookie-consent";

/**
 * Informational cookie notice. Analytics load unconditionally (see
 * `Analytics`); this banner discloses that and links to the privacy policy.
 * Dismissal is remembered in localStorage so it shows at most once.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private mode / SSR) — stay hidden.
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — banner still dismisses for this session
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 sm:px-6"
    >
      <div className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-rule bg-bg-elevated p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <p className="flex-1 text-[13px] leading-relaxed text-ink-muted">
          We use cookies and analytics (Google Analytics &amp; Microsoft
          Clarity) to understand how the site is used and improve it. See our{" "}
          <Link
            href="/privacy"
            className="text-accent underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <Button
          type="button"
          size="sm"
          variant="primary"
          onClick={dismiss}
          className="shrink-0 self-start sm:self-auto"
        >
          Got it
        </Button>
      </div>
    </div>
  );
}
