import * as React from "react";
import type { ChatTile } from "@/lib/shopify-headless/chat-content";

type Props = { tile: ChatTile };

export function TelegramTile({ tile }: Props) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(at 20% 20%, #93B7DC 0%, transparent 55%), radial-gradient(at 80% 75%, #B5C8DA 0%, transparent 55%), linear-gradient(180deg, #A8C4DD 0%, #C7D6E3 100%)",
      }}
    >
      <div className="relative flex flex-col gap-1.5 px-3 py-3">
        {tile.thread.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.from === "me" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-3 py-1.5 text-[12px] leading-snug shadow-[0_1px_2px_rgba(0,0,0,0.08)] ${
                m.from === "me"
                  ? "rounded-br-md bg-[#E7F3FA] text-[#0c0c0c]"
                  : "rounded-bl-md bg-white text-[#0c0c0c]"
              }`}
            >
              {m.text}
              {m.time && (
                <span className="ml-1.5 text-[9px] text-black/35">{m.time}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
