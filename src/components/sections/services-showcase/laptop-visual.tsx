import { type ServiceBeat } from "@/lib/content";

type Variant = ServiceBeat["visual"];

/**
 * Laptop-shaped device frame with variant-specific screen content. Used for
 * the three "laptop" service beats (custom software, custom ecommerce,
 * Shopify). Pure CSS — no images, no canvas.
 */
export function LaptopVisual({ variant }: { variant: Variant }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 720 }}>
      {/* Laptop body */}
      <div
        className="relative rounded-[18px] p-3"
        style={{
          background:
            "linear-gradient(180deg, #1c1c1f 0%, #0e0e10 50%, #18181b 100%)",
          boxShadow:
            "0 40px 80px -32px rgba(8,30,90,0.35), inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Notch */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-20 h-[8px] w-[80px] -translate-x-1/2 rounded-b-[8px]"
          style={{
            background:
              "linear-gradient(to bottom, #050507 0%, #0e0e10 60%, #1a1a1e 100%)",
          }}
        />

        {/* Screen */}
        <div
          className="relative overflow-hidden rounded-[10px]"
          style={{
            aspectRatio: "16 / 10",
            background:
              "radial-gradient(ellipse at top, #0e0f12 0%, #050507 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 2px 12px rgba(0,0,0,0.7)",
          }}
        >
          <div
            className="absolute overflow-hidden rounded-[8px] bg-white"
            style={{
              top: "10px",
              left: "10px",
              right: "10px",
              bottom: "10px",
            }}
          >
            {variant === "custom-dashboard" && <CustomDashboardScreen />}
            {variant === "ecommerce-sweep" && <EcommerceSweepScreen />}
            {variant === "shopify-store" && <ShopifyStoreScreen />}
          </div>
        </div>
      </div>

      {/* Hinge */}
      <div
        aria-hidden
        className="relative mx-auto h-1.5 w-[104%] -translate-x-[2%] rounded-b-[8px]"
        style={{
          background:
            "linear-gradient(180deg, #2a2a2c 0%, #14141a 60%, #06060a 100%)",
          boxShadow: "0 10px 20px -6px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
}

/* ---------- Screen contents ---------- */

function ChromeBar({ url }: { url: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-b border-black/[0.06] bg-[#f6f6f6] px-2.5 py-1.5">
      <span className="size-2 rounded-full bg-[#ff5f57]" />
      <span className="size-2 rounded-full bg-[#febc2e]" />
      <span className="size-2 rounded-full bg-[#28c840]" />
      <div className="ml-2 flex h-5 flex-1 items-center justify-center rounded border border-black/[0.06] bg-white px-2">
        <span className="font-mono text-[10px] text-black/55">{url}</span>
      </div>
      <span className="w-[40px]" />
    </div>
  );
}

function CustomDashboardScreen() {
  return (
    <div className="flex h-full w-full flex-col">
      <ChromeBar url="admin.acme.internal" />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[18%] shrink-0 border-r border-black/[0.05] bg-[#fafafa] p-2">
          <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-black/40">
            ACME · ops
          </p>
          <ul className="mt-3 space-y-1.5">
            {[
              { l: "Dashboard", active: true },
              { l: "Orders", active: false },
              { l: "Warehouses", active: false },
              { l: "Users", active: false },
              { l: "Reports", active: false },
              { l: "Settings", active: false },
            ].map((r) => (
              <li
                key={r.l}
                className={`rounded px-1.5 py-1 text-[8px] font-medium ${r.active ? "bg-accent text-on-accent" : "text-black/60"}`}
              >
                {r.l}
              </li>
            ))}
          </ul>
        </aside>
        {/* Main */}
        <main className="flex-1 overflow-hidden p-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-[13px] font-extrabold leading-none text-black">
              Today
            </p>
            <span className="rounded-full border border-black/[0.06] bg-white px-2 py-0.5 font-mono text-[7px] text-black/55">
              Live · 9:41
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { l: "Revenue", v: "₹4.2L", d: "+18%" },
              { l: "Orders", v: "127", d: "+6%" },
              { l: "Active SKUs", v: "318", d: "—" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-md border border-black/[0.06] bg-[#fafafa] p-2"
              >
                <p className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-black/45">
                  {s.l}
                </p>
                <p className="mt-0.5 font-display text-[12px] font-extrabold leading-none text-black">
                  {s.v}
                </p>
                <p className="font-mono text-[7px] text-emerald-600">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-md border border-black/[0.06] bg-[#fafafa] p-2">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-black/45">
                Orders · 7 days
              </p>
              <p className="font-mono text-[7px] text-black/45">
                live · ~12s ago
              </p>
            </div>
            <div className="mt-2 flex h-[58px] items-end gap-1">
              {[0.35, 0.5, 0.45, 0.72, 0.6, 0.85, 0.78].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h * 100}%`,
                    background: `rgb(var(--accent-rgb) / ${i === 6 ? 1 : 0.35})`,
                    animation: `bar-pulse 4s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-black/[0.06] bg-[#fafafa] p-2">
              <p className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-black/45">
                Top SKU
              </p>
              <p className="mt-0.5 text-[8.5px] font-semibold text-black">
                Silk camisole — Ivory
              </p>
            </div>
            <div className="rounded-md border border-black/[0.06] bg-[#fafafa] p-2">
              <p className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-black/45">
                Backlog
              </p>
              <p className="mt-0.5 text-[8.5px] font-semibold text-black">
                12 in fulfilment · 0 stuck
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function EcommerceSweepScreen() {
  // Generic theme on the left, custom build on the right — the editorial-sweep
  // mechanic, but static (no scrub) and tilted to "custom ecommerce".
  return (
    <div className="flex h-full w-full flex-col">
      <ChromeBar url="custom.your-brand.com" />
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left — generic theme */}
          <div className="relative overflow-hidden border-r border-black/10 bg-[#f4f4f4] p-2">
            <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-black/40">
              Default theme
            </p>
            <div className="mt-1 grid grid-cols-2 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm bg-black/10"
                />
              ))}
            </div>
            <p className="mt-1.5 text-[7px] text-black/45">Same 12 themes</p>
          </div>
          {/* Right — custom */}
          <div className="relative overflow-hidden bg-white p-2.5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-black/40">
                Built by tilde
              </p>
              <span
                className="size-1 rounded-full bg-accent"
                style={{
                  boxShadow: "0 0 6px rgb(var(--accent-rgb) / 0.6)",
                }}
              />
            </div>
            <p className="mt-1.5 font-display text-[11px] font-extrabold leading-[0.95] text-black">
              Made well.
            </p>
            <p className="font-display text-[11px] italic leading-[0.95] text-black/60">
              Made yours.
            </p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {[0.45, 0.65, 0.3, 0.55].map((s, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] rounded-sm"
                  style={{
                    background: `rgb(var(--accent-rgb) / ${s})`,
                    animation: `tile-fade 4.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            <span
              className="absolute bottom-2 right-2 inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[7px] font-semibold text-on-accent"
              style={{ boxShadow: "0 4px 10px -4px rgb(var(--accent-rgb) / 0.5)" }}
            >
              Shop now →
            </span>
          </div>
        </div>
        {/* Vertical separator with arrow */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 inline-flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-on-accent shadow-[0_4px_12px_-4px_rgb(var(--accent-rgb)/0.6)]"
        >
          →
        </span>
      </div>
    </div>
  );
}

function ShopifyStoreScreen() {
  return (
    <div className="flex h-full w-full flex-col">
      <ChromeBar url="your-brand.com · Shopify" />
      <div className="flex-1 overflow-hidden p-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-black/40">
            Spring &apos;26 · Atelier
          </p>
          <span
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[7px] font-medium text-white"
            style={{ backgroundColor: "#95BF47" }}
          >
            <span>S</span>Shopify
          </span>
        </div>
        <p className="mt-2 font-display text-[18px] font-extrabold leading-none text-black">
          Made well.
        </p>
        <p className="font-display text-[18px] italic leading-none text-black/55">
          Made yours.
        </p>

        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {[0.2, 0.4, 0.55, 0.32, 0.48, 0.6, 0.28, 0.42].map((s, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm border border-black/[0.04]"
              style={{
                background: `rgb(var(--accent-rgb) / ${s})`,
                animation: `tile-fade 4s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span
            className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[8px] font-semibold text-on-accent"
            style={{ boxShadow: "0 4px 10px -4px rgb(var(--accent-rgb) / 0.5)" }}
          >
            Shop the drop →
          </span>
          <span className="font-mono text-[7px] text-black/45">
            Free ship · ₹2K+
          </span>
        </div>
      </div>
    </div>
  );
}
