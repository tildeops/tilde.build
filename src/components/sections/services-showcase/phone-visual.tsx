import { type ServiceBeat } from "@/lib/content";
import { cn } from "@/lib/utils";

type Variant = ServiceBeat["visual"];

/**
 * Phone-shaped device frame with variant-specific screen content. Used for
 * the two "phone" service beats (mobile app, WhatsApp/Telegram bot).
 */
export function PhoneVisual({ variant }: { variant: Variant }) {
  return (
    <div className="relative mx-auto" style={{ width: 280 }}>
      <div
        className="relative rounded-[44px] p-2.5 shadow-[0_40px_90px_-40px_rgba(8,30,90,0.55)]"
        style={{
          background:
            "linear-gradient(180deg, #1a1a1c 0%, #0e0e10 55%, #1a1a1c 100%)",
          aspectRatio: "9/19",
        }}
      >
        {/* Side buttons */}
        <span
          className="absolute -left-[3px] top-[18%] h-10 w-1 rounded-l-full"
          style={{ background: "#1a1a1c" }}
          aria-hidden
        />
        <span
          className="absolute -left-[3px] top-[28%] h-16 w-1 rounded-l-full"
          style={{ background: "#1a1a1c" }}
          aria-hidden
        />
        <span
          className="absolute -right-[3px] top-[24%] h-20 w-1 rounded-r-full"
          style={{ background: "#1a1a1c" }}
          aria-hidden
        />

        <div
          className="relative h-full w-full overflow-hidden rounded-[34px] bg-white"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 8px rgba(0,0,0,0.6)",
          }}
        >
          {/* Notch */}
          <div
            aria-hidden
            className="absolute left-1/2 top-2 z-30 h-6 w-24 -translate-x-1/2 rounded-full"
            style={{ background: "#0a0a0a" }}
          />
          <div className="absolute inset-0 pt-9">
            {variant === "mobile-app" && <MobileAppScreen />}
            {variant === "chat-bot" && <ChatBotScreen />}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex shrink-0 items-center justify-between px-5 pb-1 text-[10px] text-black/70">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span>•••</span>
        <span>⌬</span>
        <span>▮▮▯</span>
      </span>
    </div>
  );
}

function MobileAppScreen() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex shrink-0 items-center justify-between px-4 pt-2 pb-3">
        <p className="font-display text-[18px] font-extrabold leading-none text-black">
          Today
        </p>
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent/15 font-mono text-[10px] font-bold text-accent">
          K
        </span>
      </div>

      <div className="px-4">
        <div
          className="relative overflow-hidden rounded-2xl p-3 text-white"
          style={{
            background:
              "linear-gradient(135deg, rgb(var(--accent-rgb)) 0%, rgb(var(--accent-rgb) / 0.7) 100%)",
            boxShadow: "0 12px 28px -12px rgb(var(--accent-rgb) / 0.55)",
          }}
        >
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/80">
            Spring drop
          </p>
          <p className="mt-1 font-display text-[15px] font-extrabold leading-tight">
            Atelier ’26 — live now
          </p>
          <p className="mt-1 text-[10px] text-white/85">
            Members get first dibs · 24h early
          </p>
        </div>
      </div>

      <div className="mt-3 flex-1 overflow-hidden px-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/45">
          For you
        </p>
        <ul className="mt-1.5 space-y-1.5">
          {[
            { l: "Silk camisole · M", r: "₹2,475" },
            { l: "Linen trouser · 30", r: "₹3,200" },
            { l: "Cotton tee · S", r: "₹1,100" },
            { l: "Free ship over ₹2K", r: "" },
          ].map((row, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-2 rounded-xl border border-black/[0.05] bg-[#fafafa] px-2.5 py-2"
            >
              <span className="text-[11px] font-medium text-black">
                {row.l}
              </span>
              <span className="font-mono text-[10px] text-black/55">
                {row.r}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab bar */}
      <div className="border-t border-black/[0.06] bg-white px-3 pb-3 pt-2">
        <div className="flex items-center justify-around">
          {[
            { l: "Home", active: true },
            { l: "Shop", active: false },
            { l: "Bag", active: false },
            { l: "Me", active: false },
          ].map((t) => (
            <span
              key={t.l}
              className={cn(
                "font-mono text-[9px] uppercase tracking-wide",
                t.active ? "text-accent font-semibold" : "text-black/45",
              )}
            >
              {t.l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBotScreen() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div
        className="flex shrink-0 items-center gap-2 px-3 py-2 text-white"
        style={{ backgroundColor: "#075E54" }}
      >
        <span className="text-[14px]">‹</span>
        <span
          className="flex size-6 items-center justify-center rounded-full text-[8px] font-semibold"
          style={{ backgroundColor: "rgba(255,255,255,0.16)" }}
        >
          AB
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium leading-tight">
            Atelier Bloom
          </p>
          <p className="truncate text-[8px] text-white/70">
            business · online
          </p>
        </div>
        <span className="text-[12px] opacity-80">⋯</span>
      </div>

      <div
        className="relative flex-1 overflow-hidden"
        style={{ backgroundColor: "#ECE5DD" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><g fill='%23000'><circle cx='15' cy='25' r='1.5'/><circle cx='40' cy='60' r='1'/><circle cx='90' cy='30' r='1.5'/><circle cx='130' cy='80' r='1'/><circle cx='60' cy='110' r='1.5'/><circle cx='140' cy='140' r='1'/></g></svg>\")",
            backgroundSize: "180px 180px",
          }}
        />
        <div className="relative flex flex-col gap-1.5 px-3 py-3">
          <Bubble side="incoming">
            Hey! Is the camisole back in stock?
          </Bubble>
          <Bubble side="outgoing">Last 2 in M. Pay here ↓</Bubble>
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-white p-2 shadow-sm">
            <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-black/50">
              Order · #AB-2841
            </p>
            <p className="mt-0.5 font-display text-[10px] font-semibold leading-tight text-black">
              Silk camisole — Ivory · M
            </p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="font-mono text-[9px] text-black">₹2,475</span>
              <span
                className="rounded-full px-1.5 py-0.5 font-mono text-[7px] font-semibold"
                style={{ backgroundColor: "#dcf8c6", color: "#075E54" }}
              >
                Pay
              </span>
            </div>
          </div>
          <Bubble side="incoming">Paid ✓ when will it ship?</Bubble>
          <Bubble side="outgoing">
            Out by 5pm. Tracking dropping in chat ↑
          </Bubble>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 border-t border-black/[0.06] bg-white px-3 py-2">
        <span className="text-[12px] text-black/40">＋</span>
        <div className="flex-1 rounded-full bg-[#f1f1f1] px-3 py-1 text-[9px] text-black/40">
          Message…
        </div>
        <span className="text-[12px] text-black/40">⋯</span>
      </div>
    </div>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "incoming" | "outgoing";
  children: React.ReactNode;
}) {
  const incoming = side === "incoming";
  return (
    <div
      className={cn(
        "max-w-[78%] rounded-2xl px-2 py-1 text-[10px] leading-snug shadow-sm",
        incoming
          ? "w-fit rounded-bl-sm bg-white text-[#0c0c0c]"
          : "ml-auto w-fit rounded-br-sm",
      )}
      style={
        incoming
          ? undefined
          : { backgroundColor: "#DCF8C6", color: "#0c0c0c" }
      }
    >
      {children}
    </div>
  );
}
