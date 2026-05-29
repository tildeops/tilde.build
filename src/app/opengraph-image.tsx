import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Sitewide Open Graph / Twitter card. Statically generated at build time.
// Mirrors the landing hero: tilde logo in the corner, then the pitch. Rendered
// at 2× (2400×1260) so it stays crisp on high-DPI feeds. The backdrop is the
// hero's liquid band (captured to a static PNG, since Satori can't run WebGL);
// fonts + bg are read from the repo (no build-time network).
const S = 2;
export const size = { width: 1200 * S, height: 630 * S };
export const alt = `${site.name} — ${site.tagline}`;
export const contentType = "image/png";

const asset = (p: string) => readFile(join(process.cwd(), "src/assets", p));

// Hero copy (mirrors src/components/sections/hero.tsx).
const HEADLINE_LEAD = "We build whatever your business actually needs";
const HEADLINE_EMPH = "actually needs.";

export default async function OpengraphImage() {
  const [bg, inter500, inter700, interItalic700] = await Promise.all([
    asset("og-bg.png"),
    asset("fonts/inter-500.woff"),
    asset("fonts/inter-700.woff"),
    asset("fonts/inter-italic-700.woff"),
  ]);
  const bgUri = `data:image/png;base64,${bg.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        fontFamily: "Inter",
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
      {/* Depth scrim — deep navy on the left fading to reveal the liquid. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(4,14,52,0.88) 0%, rgba(6,24,82,0.66) 40%, rgba(10,47,138,0.22) 74%, rgba(21,93,252,0) 100%)",
        }}
      />
      {/* Corner vignette for richness */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(135% 135% at 26% 46%, rgba(0,0,0,0) 40%, rgba(3,10,38,0.55) 100%)",
        }}
      />

      {/* Hairline inset frame */}
      <div
        style={{
          position: "absolute",
          inset: 30 * S,
          border: `${S}px solid rgba(255,255,255,0.16)`,
        }}
      />

      {/* Logo — top-left corner, like the nav */}
      <div
        style={{
          position: "absolute",
          top: 58 * S,
          left: 76 * S,
          display: "flex",
          fontSize: 40 * S,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#ffffff",
        }}
      >
        tilde
      </div>

      {/* Pitch block — big wrapping headline, vertically centered */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `0 ${76 * S}px`,
        }}
      >
        {/* Headline — wraps; emphasis sits in a glass chip */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            maxWidth: 990 * S,
            fontSize: 92 * S,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            textShadow: `0 ${2 * S}px ${16 * S}px rgba(4,14,52,0.45)`,
          }}
        >
          {HEADLINE_LEAD.trim()
            .split(" ")
            .map((w, i) => (
              <span key={`l${i}`} style={{ whiteSpace: "pre" }}>{`${w} `}</span>
            ))}
          {/* Glass chip — translucent sheen + hairline + inset top highlight
              (Satori can't backdrop-blur, so this fakes frosted glass). */}
        </div>
      </div>

      {/* Pill — bottom-left */}
      <div
        style={{
          position: "absolute",
          left: 76 * S,
          bottom: 58 * S,
          display: "flex",
          alignItems: "center",
          gap: 12 * S,
          padding: `${10 * S}px ${20 * S}px`,
          borderRadius: 999,
          border: `${S}px solid rgba(255,255,255,0.22)`,
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: 10 * S,
            height: 10 * S,
            borderRadius: 999,
            background: "#ffffff",
            boxShadow: `0 0 ${12 * S}px ${1 * S}px rgba(191,219,255,0.95)`,
          }}
        />
        <div
          style={{
            fontSize: 24 * S,
            fontWeight: 500,
            letterSpacing: "-0.005em",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          One studio. Whole stack.
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter500, weight: 500, style: "normal" },
        { name: "Inter", data: inter700, weight: 700, style: "normal" },
        { name: "Inter", data: interItalic700, weight: 700, style: "italic" },
      ],
    },
  );
}
