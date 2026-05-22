import * as React from "react";
import type { ChatTile } from "@/lib/shopify-headless/chat-content";

type Props = { tile: ChatTile };

export function InstagramTile({ tile }: Props) {
  return (
    <div
      className="relative h-full w-full overflow-hidden text-[#0f0f0f] dark:text-white"
      style={{
        background: "linear-gradient(180deg, #FAFAFA 0%, #F2F2F2 100%)",
      }}
    >
      {/* Subtle grain — gives Instagram tiles their own texture signature */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative flex flex-col gap-1.5 px-3 py-3">
        {tile.thread.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.from === "me" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[82%] rounded-[18px] px-3 py-1.5 text-[12px] leading-snug ${
                m.from === "me"
                  ? "bg-[#3797F0] text-white"
                  : "bg-white text-[#0f0f0f] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              }`}
            >
              {m.text}
            </div>
            {m.time && (
              <span className="mt-0.5 px-2 text-[9px] text-black/40">
                {m.time}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
