import * as React from "react";
import type { ChatTile } from "@/lib/shopify-headless/chat-content";

type Props = { tile: ChatTile };

export function WhatsappTile({ tile }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#ECE5DD]">
      {/* WhatsApp doodle backdrop — bumped opacity + denser pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><g fill='%23000' fill-opacity='0.85'><circle cx='12' cy='18' r='1.5'/><circle cx='36' cy='8' r='1'/><circle cx='62' cy='22' r='1.5'/><circle cx='92' cy='14' r='1'/><circle cx='118' cy='28' r='1.5'/><circle cx='22' cy='48' r='1'/><circle cx='52' cy='58' r='1.5'/><circle cx='80' cy='44' r='1'/><circle cx='108' cy='62' r='1.5'/><circle cx='130' cy='52' r='1'/><circle cx='14' cy='78' r='1.5'/><circle cx='42' cy='90' r='1'/><circle cx='72' cy='82' r='1.5'/><circle cx='100' cy='96' r='1'/><circle cx='124' cy='86' r='1.5'/><circle cx='28' cy='118' r='1'/><circle cx='56' cy='126' r='1.5'/><circle cx='86' cy='114' r='1'/><circle cx='116' cy='128' r='1.5'/></g></svg>\")",
          backgroundSize: "140px 140px",
        }}
      />
      <div className="relative flex flex-col gap-1 px-3 py-3">
        {tile.thread.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.from === "me" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[82%] rounded-lg px-2.5 py-1.5 text-[12px] leading-snug shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${
                m.from === "me"
                  ? "rounded-tr-sm bg-[#DCF8C6] text-[#0c0c0c]"
                  : "rounded-tl-sm bg-white text-[#0c0c0c]"
              }`}
            >
              {m.text}
              {m.time && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 align-bottom text-[9px] text-black/40">
                  {m.time}
                  {m.from === "me" && (
                    <svg viewBox="0 0 16 12" className={`h-2.5 w-3.5 ${m.read ? "text-[#4FC3F7]" : "text-black/30"}`} fill="currentColor" aria-hidden>
                      <path d="M0 7l1-1 3 3 1-1zm5 0 4-4 1 1L5 9zm5 2L15 4l1 1-6 6z" />
                    </svg>
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
