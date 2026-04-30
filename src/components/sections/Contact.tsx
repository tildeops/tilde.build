"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Pill } from "@/components/ui/Pill";
import { site } from "@/content/site";
import { Mail } from "lucide-react";

export function Contact() {
  const c = site.contactSection;
  const link = site.contact.calcomLink;
  const email = site.contact.email;
  const wa = site.contact.whatsapp;

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#3b82f6" } },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Pill className="mb-5">{c.eyebrow}</Pill>
            <h2 className="font-display text-[44px] leading-[1.05] tracking-[-0.01em] sm:text-[60px]">
              Book <em className="font-normal italic text-fg/70">20 minutes</em> with us.
            </h2>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-muted">
              {c.body}
            </p>

            <div className="mt-10 flex flex-col gap-3">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-3 text-[15px] text-fg/90 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 text-muted group-hover:text-accent" aria-hidden />
                <span className="font-mono">{email}</span>
              </a>
              {wa && (
                <a
                  href={`https://wa.me/${wa.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[15px] text-fg/90 transition-colors hover:text-accent"
                >
                  <span className="font-mono text-muted group-hover:text-accent">
                    wa
                  </span>
                  <span className="font-mono">{wa}</span>
                </a>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-bg">
            <Cal
              namespace="intro-call"
              calLink={link}
              style={{ width: "100%", height: "100%", minHeight: 640 }}
              config={{ layout: "month_view", theme: "dark" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
