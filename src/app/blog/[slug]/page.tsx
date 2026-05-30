import { notFound } from "next/navigation";
import Link from "next/link";
import { ContactCTA } from "@/components/layout/contact-cta";
import { Prose } from "@/components/layout/prose";
import { BreadcrumbLd, BlogPostingLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo";
import { BLOG_INDEXABLE } from "@/lib/site";
import { posts, postsBySlug, imageForSlug, categoryForSlug } from "@/content/blog";

// Pre-render one static page per post; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = postsBySlug[slug];
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    generatedOgImage: true,
    noindex: !BLOG_INDEXABLE,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = postsBySlug[slug];
  if (!post) notFound();

  const { Body } = post;
  // Same cover as the index card, at higher resolution for the wide hero.
  const cover = imageForSlug[post.slug]?.replace("w=900", "w=1600");
  const category = categoryForSlug[post.slug] ?? post.topics[0] ?? "Blog";

  return (
    <div data-page-theme="bridge">
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <BlogPostingLd post={post} />

      {/* Cover photo as the hero, with the title overlaid on a dark scrim. */}
      <section className="relative w-full px-4 pt-3 sm:px-6 sm:pt-5 lg:px-10 md:pt-6">
        <div className="mx-auto max-w-[1240px]">
          <div className="relative isolate flex min-h-[clamp(420px,60vh,600px)] flex-col justify-end overflow-hidden rounded-[28px] sm:rounded-[32px] md:rounded-[40px]">
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
            )}
            {/* Scrim — darker at the bottom for the title, a touch at the top
                so the floating nav stays legible. */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />
            <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-black/40 to-transparent" />

            <div className="mx-auto flex w-full max-w-3xl flex-col px-6 pb-12 pt-40 text-on-accent sm:px-10 md:pb-16">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
                ~ {category}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white text-balance">
                {post.title}
              </h1>
              <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.18em] text-white/75">
                {formatDate(post.datePublished)} · {post.readingTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article — small top padding so the TL;DR sits right under the hero,
          generous bottom before the CTA. Plain section (not SectionFrame) to
          avoid its fixed py overriding the top gap. */}
      <section className="relative w-full px-4 pb-20 sm:px-6 md:pb-28 lg:px-10">
        <div className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-8 md:px-12 md:pt-16">
          <article className="mx-auto max-w-3xl">
          {/* Answer-first TL;DR — gives AI answer engines a self-contained
              summary to lift, and readers the gist up front. */}
          <div className="mb-10 rounded-2xl border border-accent/15 bg-accent-soft/50 p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              TL;DR
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink md:text-[16px]">
              {post.summary}
            </p>
          </div>

          <Prose>
            <Body />
          </Prose>

          {/* Article footer — topics + back link */}
          <div className="mt-14 border-t border-rule pt-6">
            <div className="flex flex-wrap gap-2">
              {post.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-rule px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted"
                >
                  {topic}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                Published {formatDate(post.datePublished)} · the tilde team
              </p>
              <Link
                href="/blog"
                className="text-[13px] font-medium text-accent hover:underline"
              >
                ← All posts
              </Link>
            </div>
          </div>
        </article>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
