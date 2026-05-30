import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "tilde — blog";

export default function Image() {
  return ogImageResponse({ eyebrow: "Blog", title: "Notes from the studio" });
}
