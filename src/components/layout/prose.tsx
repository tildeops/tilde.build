import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Long-form article typography. The project does not include the Tailwind
 * Typography plugin (and Tailwind's reset strips list markers + block margins),
 * so every element is styled explicitly here. Tuned for comfortable reading:
 * ~17px body, 1.75 line-height, a clear heading rhythm, real list markers, and
 * bordered tables with a tinted header. Keep article markup semantic (real
 * <h2>, <ul>, <table>) so crawlers and AI answer engines can parse structure.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-[1.0625rem] leading-[1.75] text-ink/85 [&>*:first-child]:mt-0",
        // Paragraphs
        "[&_p]:my-5 [&_p]:text-pretty",
        // Lead paragraph — the article opener, set a touch larger
        "[&>p:first-of-type]:text-[1.175rem] [&>p:first-of-type]:leading-[1.7] [&>p:first-of-type]:text-ink/90",
        // Headings
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-[1.6rem] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_h2]:text-balance [&_h2]:text-ink",
        "[&_h3]:mt-9 [&_h3]:mb-3 [&_h3]:text-[1.2rem] [&_h3]:font-semibold [&_h3]:tracking-[-0.01em] [&_h3]:text-balance [&_h3]:text-ink",
        // Lists with real markers
        "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_li]:my-2 [&_li]:pl-1.5 [&_li]:leading-[1.7] [&_li]:marker:text-accent [&_ol_li]:marker:font-medium [&_ol_li]:marker:text-ink-muted",
        "[&_li_p]:my-0",
        // Inline emphasis + links
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/30 [&_a]:underline-offset-[3px] hover:[&_a]:decoration-accent",
        // Blockquote
        "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-ink-muted",
        // Divider
        "[&_hr]:my-10 [&_hr]:border-rule",
        // Tables — full width, tinted header, row borders
        "[&_table]:my-7 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[14.5px]",
        "[&_thead]:border-b [&_thead]:border-ink/15 [&_thead]:bg-accent-soft/60",
        "[&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-ink",
        "[&_tbody_tr]:border-t [&_tbody_tr]:border-rule [&_tbody_tr:nth-child(even)]:bg-bg-elevated/40",
        "[&_td]:px-4 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-ink/80",
        className,
      )}
    >
      {children}
    </div>
  );
}
