// IndexNow — instantly notify Bing (and thus, downstream, ChatGPT search) when
// content is published or updated, so new pages get indexed in hours instead
// of waiting for a crawl. The key below is a public verification token; it must
// match the filename hosted at `/<key>.txt` in `public/`.
//
// Usage (server-side only — e.g. a deploy hook or a publish action):
//   await pingIndexNow([`${site.url}/articles/my-new-post`]);

import { site } from "@/lib/site";

/** Public IndexNow key. Mirrors the filename in `public/<key>.txt`. */
export const INDEXNOW_KEY = "364ccf0a4f9f2143601243a3da06f507";

const HOST = new URL(site.url).host;

/**
 * Submit one or more URLs to IndexNow. Bing fans the notification out to other
 * participating engines. Returns the HTTP status, or null if the request threw
 * (network failure shouldn't break a publish flow). Safe to call server-side.
 */
export async function pingIndexNow(urls: string[]): Promise<number | null> {
  if (urls.length === 0) return null;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${site.url}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    return res.status;
  } catch {
    return null;
  }
}
