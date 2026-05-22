"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealLines } from "@/components/motion/reveal-lines";
import { faq } from "@/lib/content";

export function FAQ({
  items = faq,
  id = "faq",
}: {
  items?: typeof faq | readonly { q: string; a: string }[];
  id?: string;
}) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-faq-item]"));
      if (!rows.length) return;
      gsap.set(rows, { opacity: 0, y: 18 });
      const st = ScrollTrigger.create({
        trigger: list,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "editorial",
            stagger: 0.07,
          });
        },
      });
      return () => st.kill();
    },
    { scope: listRef as React.RefObject<HTMLElement>, dependencies: [items] }
  );

  return (
    <SectionFrame id={id}>
      <div className="grid gap-12 md:grid-cols-12 md:gap-16 items-start">
        <div className="md:col-span-4 md:sticky md:top-24">
          <Eyebrow shimmer>~ FAQ</Eyebrow>
          <RevealLines
            as="h2"
            className="mt-5 font-display font-medium leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.6vw,3.25rem)]"
          >
            Questions,{" "}
            <span className="italic text-ink-muted">answered.</span>
          </RevealLines>
        </div>

        <div ref={listRef} className="md:col-span-8">
          <Accordion type="single" collapsible className="w-full border-t border-rule">
            {items.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                data-faq-item
              >
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionFrame>
  );
}
