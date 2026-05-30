import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "About tilde";

export default function Image() {
  return ogImageResponse({
    eyebrow: "About",
    title: "One studio. Whole stack.",
  });
}
