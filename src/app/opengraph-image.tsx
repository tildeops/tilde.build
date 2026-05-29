import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Sitewide Open Graph / Twitter card image. Statically generated at build
// time. The backdrop is the hero's liquid band (captured to a static PNG so
// it survives Satori, which can't run WebGL); text is composited on top with
// a dark scrim for legibility. Pure inline styles, no external font load.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const bg = await readFile(join(process.cwd(), "src/assets/og-bg.png"));
  const bgUri = `data:image/png;base64,${bg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          color: "#ffffff",
        }}
      >
        {/* Liquid backdrop */}
        <img
          src={bgUri}
          width={size.width}
          height={size.height}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        {/* Scrim — deepens the blue toward the bottom-left so white text reads
            cleanly over the brighter parts of the liquid. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(115deg, rgba(7,22,68,0.62) 0%, rgba(7,22,68,0.30) 45%, rgba(7,22,68,0.12) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 90px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 210,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-0.045em",
            }}
          >
            tilde
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 58,
              fontWeight: 500,
              color: "rgba(255,255,255,0.94)",
              letterSpacing: "-0.015em",
            }}
          >
            {site.tagline}
          </div>

          {/* Bottom row pinned to the lower edge */}
          <div
            style={{
              position: "absolute",
              left: 90,
              right: 90,
              bottom: 64,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 27,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            <div style={{ display: "flex", fontWeight: 600 }}>tilde.build</div>
            <div
              style={{
                display: "flex",
                fontFamily: "monospace",
                fontSize: 23,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Web · Shopify · Apps · Bots
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
