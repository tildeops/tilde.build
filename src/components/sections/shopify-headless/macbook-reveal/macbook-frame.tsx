import * as React from "react";

type Props = {
  /** Children render inside the MacBook screen area (with breathing-room padding). */
  children: React.ReactNode;
};

/**
 * MacBook Pro-style frame. Pure HTML/CSS — no images.
 * Layers:
 *   - Laptop body: outer aluminum shell with padding (bezel)
 *   - Notch: small rounded pill flush at the top of the bezel
 *   - Screen surface: inset dark area that hosts the browser tab (children)
 *   - Hinge bar: thin metallic strip at the bottom
 */
export function MacbookFrame({ children }: Props) {
  return (
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: "min(92vw, 1100px)" }}
    >
      {/* Laptop body */}
      <div
        className="relative rounded-[26px]"
        style={{
          padding: "20px 20px 26px",
          background:
            "linear-gradient(180deg, #1c1c1f 0%, #0e0e10 50%, #18181b 100%)",
          boxShadow:
            "0 50px 100px -40px rgba(8,30,90,0.40), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.10) inset",
        }}
      >
        {/* Notch — flush at top of bezel */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-20 h-[12px] w-[120px] -translate-x-1/2 rounded-b-[12px]"
          style={{
            background:
              "linear-gradient(to bottom, #050507 0%, #0e0e10 60%, #1a1a1e 100%)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 size-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "#0a0a0c",
              boxShadow:
                "inset 0 0 0 1px rgba(180,200,255,0.18), 0 0 4px rgba(120,160,255,0.25)",
            }}
          />
        </div>

        {/* Screen surface */}
        <div
          className="relative overflow-hidden rounded-[12px]"
          style={{
            aspectRatio: "16 / 10",
            background:
              "radial-gradient(ellipse at top, #0e0f12 0%, #050507 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 2px 12px rgba(0,0,0,0.7)",
          }}
        >
          {/* Browser inset with padding — children render inside this */}
          <div
            className="absolute overflow-hidden rounded-[10px] bg-white"
            style={{
              top: "16px",
              left: "16px",
              right: "16px",
              bottom: "16px",
              boxShadow:
                "0 30px 60px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.04)",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Hinge */}
      <div
        aria-hidden
        className="relative mx-auto h-2 w-[104%] -translate-x-[2%] rounded-b-[12px]"
        style={{
          background:
            "linear-gradient(180deg, #2a2a2c 0%, #14141a 60%, #06060a 100%)",
          boxShadow:
            "0 14px 30px -10px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset",
        }}
      />
      <div
        aria-hidden
        className="relative mx-auto h-[3px] w-[8%] rounded-b-full"
        style={{
          background: "linear-gradient(180deg, #1a1a1c, #0a0a0c)",
        }}
      />
    </div>
  );
}
