import { storefronts } from "@/lib/storefronts";
import { TildeScreen } from "@/components/sections/shopify-headless/macbook-reveal/tilde-screen";

export const metadata = {
  title: "SÉRA — working preview",
  robots: { index: false, follow: false },
};

/**
 * Standalone working canvas for the SÉRA editorial storefront.
 *
 * Renders the exact same <TildeScreen> component that the /shopify-headless Mac
 * reveal mounts — single source of truth. Iterate on the branding here, full
 * width and chrome-free; the Mac screen picks up every change automatically.
 *
 * A fixed full-viewport overlay covers the global site nav/footer (injected by
 * the root layout) so this reads as a clean storefront. Not indexed; this is a
 * preview surface, not a public page.
 */
export default function SeraPreviewPage() {
  const brand = storefronts.find((s) => s.slug === "plain-skin")!;

  return (
    <div
      data-page-theme="bridge"
      data-lenis-prevent
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain"
      style={{ background: "#dcd6cc" }}
    >
      {/* Device-agnostic frame: cap to a realistic storefront width and center
          on a neutral mat so the page edges read clearly while designing. */}
      <div className="mx-auto w-full max-w-[1180px] bg-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.45)]">
        <TildeScreen brand={brand} />
      </div>
    </div>
  );
}
