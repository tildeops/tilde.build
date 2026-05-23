import * as React from "react";

type Props = { children: React.ReactNode };

/**
 * Tall phone bezel for email mockup. No status bar styling — the email
 * components fill the entire screen area.
 */
export function PhoneFrame({ children }: Props) {
  return (
    <div
      className="relative mx-auto w-[260px] rounded-[44px] p-2.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] sm:w-[280px] md:w-[300px] lg:w-[320px]"
      style={{
        background: "linear-gradient(180deg, #1a1a1c 0%, #0e0e10 55%, #1a1a1c 100%)",
        aspectRatio: "9/19",
      }}
    >
      {/* Side button hints — match the other PhoneFrames so all three iPhone
          mockups read as the same device. */}
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
        {/* Content sits below the notch — pt-10 (40px) clears 32px notch + safe margin */}
        <div className="absolute inset-0 pt-10">{children}</div>
      </div>
    </div>
  );
}
