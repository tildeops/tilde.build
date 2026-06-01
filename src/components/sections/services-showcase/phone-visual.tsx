import { type ServiceBeat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { PhoneFrame, PHONE_FRAME_WIDTH } from "@/components/ui/phone-frame";

type Variant = ServiceBeat["visual"];

/**
 * Phone-shaped device frame with variant-specific screen content. Used for
 * the two "phone" service beats (mobile app, WhatsApp/Telegram bot).
 */
export function PhoneVisual({ variant }: { variant: Variant }) {
  return (
    <PhoneFrame className={PHONE_FRAME_WIDTH} contentClassName="pt-9">
      {variant === "mobile-app" && <MobileAppScreen />}
      {variant === "chat-bot" && <ChatBotScreen />}
    </PhoneFrame>
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

function TabIcon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? "rgb(var(--accent-rgb))" : "rgba(0,0,0,0.42)";
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 14 14",
    fill: "none",
    stroke,
    strokeWidth: 1.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "Home")
    return (
      <svg {...common}>
        <path d="M2.5 7 L7 3 L11.5 7 V11.5 H2.5 Z" />
      </svg>
    );
  if (name === "Saved")
    return (
      <svg {...common}>
        <path d="M7 11 C2.2 7.6 3.3 3.6 5.3 3.6 C6.3 3.6 7 4.7 7 4.7 C7 4.7 7.7 3.6 8.7 3.6 C10.7 3.6 11.8 7.6 7 11 Z" />
      </svg>
    );
  if (name === "Bag")
    return (
      <svg {...common}>
        <path d="M3.6 5 H10.4 L9.9 11.5 H4.1 Z" />
        <path d="M5.2 5 V4 a1.8 1.8 0 0 1 3.6 0 V5" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="7" cy="5" r="2" />
      <path d="M3.2 11.5 a3.8 3.8 0 0 1 7.6 0" />
    </svg>
  );
}

function MobileAppScreen() {
  const chips = ["New", "Tops", "Dresses", "Knitwear", "Sale"];
  const products = [
    { name: "Silk camisole", price: "₹2,475", shade: 0.5, tag: "New" },
    { name: "Linen trouser", price: "₹3,200", shade: 0.22 },
    { name: "Wool knit", price: "₹4,100", shade: 0.36 },
  ];
  const tabs = ["Home", "Saved", "Bag", "Me"];
  return (
    <div className="flex h-full flex-col bg-[#fafafa]">
      <StatusBar />

      {/* App bar */}
      <div className="flex shrink-0 items-center justify-between px-4 pt-1 pb-2.5">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/40">
            Discover
          </p>
          <p className="font-display text-[17px] font-extrabold leading-none text-black">
            Atelier
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative inline-flex size-7 items-center justify-center rounded-full bg-white shadow-sm">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="1" strokeLinejoin="round">
              <path d="M3 5.5 a3 3 0 0 1 6 0 V7.5 l1 1.5 H2 L3 7.5 Z" />
              <path d="M5 9.5 a1 1 0 0 0 2 0" strokeLinecap="round" />
            </svg>
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" />
          </span>
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent/15 font-mono text-[10px] font-bold text-accent">
            K
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="shrink-0 px-4">
        <div className="flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 py-1.5 shadow-sm">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1">
            <circle cx="4" cy="4" r="3" />
            <line x1="6.2" y1="6.2" x2="9" y2="9" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] text-black/40">Search the collection</span>
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-2.5 flex shrink-0 gap-1.5 overflow-hidden px-4">
        {chips.map((c, i) => (
          <span
            key={c}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[9px] font-medium",
              i === 0
                ? "bg-accent text-on-accent"
                : "border border-black/[0.08] bg-white text-black/55",
            )}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Featured drop */}
      <div className="mt-2.5 shrink-0 px-4">
        <div
          className="relative overflow-hidden rounded-2xl p-3 text-white"
          style={{
            background:
              "linear-gradient(135deg, rgb(var(--accent-rgb)) 0%, rgb(var(--accent-rgb) / 0.7) 100%)",
            boxShadow: "0 12px 28px -12px rgb(var(--accent-rgb) / 0.55)",
          }}
        >
          <div className="absolute -right-5 -top-5 size-16 rounded-full bg-white/15" />
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/80">
            Spring drop
          </p>
          <p className="mt-1 font-display text-[15px] font-extrabold leading-tight">
            Atelier ’26 — live now
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="rounded-full bg-white px-2.5 py-1 text-[8px] font-bold text-accent">
              Shop now
            </span>
            <span className="text-[8px] text-white/85">24h early for members</span>
          </div>
        </div>
      </div>

      {/* For you — product carousel */}
      <div className="mt-3 flex min-h-0 flex-1 flex-col px-4">
        <div className="flex shrink-0 items-center justify-between">
          <p className="font-display text-[11px] font-bold text-black">For you</p>
          <span className="font-mono text-[8px] text-accent">See all →</span>
        </div>
        <div className="mt-2 flex gap-2.5 overflow-hidden">
          {products.map((p, i) => (
            <div key={p.name} className="w-[44%] shrink-0">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-xl"
                style={{
                  background: `rgb(var(--accent-rgb) / ${p.shade})`,
                  animation: `tile-fade 4.5s ease-in-out ${i * 0.2}s infinite`,
                }}
              >
                <span className="absolute right-1.5 top-1.5 inline-flex size-4 items-center justify-center rounded-full bg-white/85">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="1">
                    <path d="M5 8.2 C1.4 5.6 2.2 2.8 3.7 2.8 C4.4 2.8 5 3.6 5 3.6 C5 3.6 5.6 2.8 6.3 2.8 C7.8 2.8 8.6 5.6 5 8.2 Z" />
                  </svg>
                </span>
                {p.tag && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1 py-0.5 font-mono text-[6.5px] font-semibold uppercase tracking-wide text-white">
                    {p.tag}
                  </span>
                )}
              </div>
              <p className="mt-1 truncate text-[10px] font-semibold leading-none text-black">
                {p.name}
              </p>
              <p className="mt-0.5 font-mono text-[9px] text-black/50">{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="shrink-0 border-t border-black/[0.06] bg-white px-5 pb-3 pt-2">
        <div className="flex items-end justify-between">
          {tabs.map((t, i) => {
            const active = i === 0;
            return (
              <div key={t} className="relative flex flex-col items-center gap-0.5">
                <TabIcon name={t} active={active} />
                <span
                  className={cn(
                    "text-[7px] font-medium",
                    active ? "text-accent" : "text-black/45",
                  )}
                >
                  {t}
                </span>
                {t === "Bag" && (
                  <span className="absolute -right-1 -top-1 grid size-2.5 place-items-center rounded-full bg-accent font-mono text-[5px] font-bold text-on-accent">
                    2
                  </span>
                )}
              </div>
            );
          })}
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
