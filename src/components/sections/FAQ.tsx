"use client";

import { useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { Plus } from "lucide-react";

export function FAQ() {
  const f = site.faq;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Left — heading + CTA */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Pill className="mb-6">{f.eyebrow}</Pill>
            <h2 className="font-display text-[44px] leading-[1.02] tracking-[-0.015em] sm:text-[60px]">
              Can&apos;t find your <em className="font-normal italic text-fg/70">answer</em>?
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              {f.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={f.cta.href} variant="primary" arrow>
                {f.cta.label}
              </Button>
              <Button
                href={`mailto:${site.contact.email}`}
                variant="ghost"
              >
                {site.contact.email}
              </Button>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col gap-3">
            {f.items.map((item, i) => {
              const open = openIdx === i;
              return (
                <article
                  key={i}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    open
                      ? "border-white/[0.12] bg-white/[0.03]"
                      : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                  >
                    <span className="font-display text-[20px] leading-snug tracking-[-0.005em] sm:text-[22px]">
                      {item.q}
                    </span>
                    <Plus
                      className={`h-4 w-4 flex-none text-muted transition-transform duration-300 ${
                        open ? "rotate-45 text-accent" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-muted sm:px-8 sm:pb-8">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
