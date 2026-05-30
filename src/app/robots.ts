import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Crawlers that power AI answer engines. Listing them explicitly (rather than
// relying on the `*` group) makes their access intentional and survives future
// edits to the wildcard rule — a bot that matches its own group ignores `*`,
// so each group repeats the same disallows.
//   OAI-SearchBot / ChatGPT-User / GPTBot → ChatGPT (search + browsing + index)
//   PerplexityBot                         → Perplexity
//   Google-Extended                       → Gemini grounding
//   ClaudeBot / Claude-SearchBot          → Claude
const AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
];

const DISALLOW = ["/api/", "/dev/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
