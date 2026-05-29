import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Sitewide Open Graph / Twitter card image. Statically generated at build
// time. Pure inline styles (no external font load) keeps the build robust.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0a2f8a 0%, #155DFC 100%)",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top: studio label */}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "monospace",
          }}
        >
          ~ tilde studio
        </div>

        {/* Middle: wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 200,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            tilde
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 56,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "-0.01em",
            }}
          >
            {site.tagline}
          </div>
        </div>

        {/* Bottom: domain + services */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <div style={{ display: "flex" }}>tilde.build</div>
          <div style={{ display: "flex", fontFamily: "monospace", fontSize: 22 }}>
            Web · Shopify · Apps · Bots
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
