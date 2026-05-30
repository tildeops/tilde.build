import { postsBySlug, posts } from "@/content/blog";
import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "tilde — blog post";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postsBySlug[slug];
  return ogImageResponse({
    eyebrow: post?.topics[0] ?? "Blog",
    title: post?.title ?? "tilde",
    variant: post?.variant,
  });
}
