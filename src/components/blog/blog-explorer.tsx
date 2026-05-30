"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Serializable card data — the page passes this (not the full BlogPost, whose
 *  `Body` component can't cross the server→client boundary). */
export type BlogCardData = {
  slug: string;
  title: string;
  description: string;
  dateLabel: string;
  readingTime: string;
  category: string;
  image: string;
};

/**
 * Blog index with a left category-filter sidebar. Each card has a cover image
 * shown as a blue duotone that resolves to full colour on hover. Selecting a
 * category filters the grid; "All" clears it. Every card is the same height
 * (`auto-rows-fr` + `h-full`) and every cover is a fixed height, so the grid
 * stays even regardless of title or description length.
 */
export function BlogExplorer({
  posts,
  categories,
}: {
  posts: BlogCardData[];
  categories: string[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const filtered = useMemo(
    () => (active ? posts.filter((p) => p.category === active) : posts),
    [active, posts],
  );

  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12">
      {/* Category filter sidebar */}
      <aside className="lg:w-52 lg:shrink-0">
        <div className="lg:sticky lg:top-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            Categories
          </p>
          <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
            <FilterButton
              label="All"
              active={active === null}
              onClick={() => setActive(null)}
            />
            {categories.map((cat) => (
              <FilterButton
                key={cat}
                label={cat}
                active={active === cat}
                onClick={() => setActive(active === cat ? null : cat)}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Card grid */}
      <ul className="grid flex-1 auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <li key={post.slug} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-bg shadow-[0_14px_40px_-26px_rgba(8,30,90,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_52px_-26px_rgba(8,30,90,0.55)]"
            >
              {/* Full-colour cover with a gentle zoom on hover */}
              <div className="relative h-40 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-bg/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur">
                  {post.category}
                </span>
              </div>

              {/* White card body — title + details */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="flex items-start gap-2 font-display text-lg font-bold leading-snug tracking-[-0.01em] text-ink">
                  <span className="line-clamp-2 transition-colors group-hover:text-accent">
                    {post.title}
                  </span>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </h2>
                <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-muted">
                  {post.dateLabel} · {post.readingTime}
                </p>
                <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-ink-muted">
                  {post.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-left text-[13px] transition-colors lg:w-full",
        active
          ? "border-accent bg-accent text-on-accent"
          : "border-rule text-ink-muted hover:border-accent/40 hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
