import * as React from "react";

type Props = {
  /** URL string shown in the address bar (e.g. "plainskin.in") */
  url?: string;
  children: React.ReactNode;
  /** Pass via ref to allow the orchestrator to animate URL crossfades */
  urlRef?: React.Ref<HTMLDivElement>;
};

/**
 * Minimal browser chrome — traffic dots + address bar + content body.
 * Lives inside the MacBook frame's screen area; designed to fill it.
 */
export function BrowserShell({ url = "tilde.studio", children, urlRef }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      {/* Chrome bar */}
      <div className="relative z-10 flex shrink-0 items-center gap-1.5 border-b border-black/[0.06] bg-[#f6f6f6] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />

        <div className="ml-3 flex flex-1 items-center">
          <div
            className="flex h-6 w-full max-w-[420px] mx-auto items-center justify-center rounded-md border border-black/[0.06] bg-white px-2"
            style={{ boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)" }}
          >
            <span className="mr-1 text-[10px] text-black/40">🔒</span>
            <div ref={urlRef} className="font-mono text-[11px] text-black/60">
              {url}
            </div>
          </div>
        </div>

        {/* Right side spacer to balance the left dots */}
        <span className="w-[60px]" />
      </div>

      {/* Content area */}
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
