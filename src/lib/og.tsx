import { ImageResponse } from "next/og";
import { cardVariant, cardGradient } from "@/lib/blog-card";

// Shared config + renderer for code-generated Open Graph images. Re-export
// `size`/`contentType` from each `opengraph-image` route so Next emits the
// matching <head> tags. When a `variant` is passed, the gradient + accent
// match that post's on-site card (see lib/blog-card.ts) so the share preview
// and the card look like one design. Colours mirror the brand tokens in
// globals.css since ImageResponse can't read CSS variables. No custom font is
// loaded — ImageResponse falls back to a bundled default.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const DEFAULT_BG = "linear-gradient(135deg, #155DFC 0%, #0a2f8a 100%)";
const DEFAULT_GLOW = "#93b5ff";

export function ogImageResponse({
  eyebrow,
  title,
  variant,
}: {
  eyebrow: string;
  title: string;
  variant?: number;
}) {
  const v = variant === undefined ? null : cardVariant(variant);
  const background = v ? cardGradient(v) : DEFAULT_BG;
  const glow = v?.glow ?? DEFAULT_GLOW;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background,
          color: "#faf6f1",
          padding: "84px",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Soft decorative orbs that echo the card motif. */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: glow,
            opacity: 0.16,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -140,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: glow,
            opacity: 0.1,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.78,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 70,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "92%",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", fontSize: 60, letterSpacing: "-0.04em" }}
          >
            tilde
          </div>
          <div style={{ display: "flex", fontSize: 24, opacity: 0.7 }}>
            tilde.build
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
