import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { site } from "@/content/site";
import { HeroBackgroundClient } from "@/components/HeroBackgroundClient";

export function Hero() {
  const h = site.hero;
  return (
    <section className="relative bg-bg p-2 sm:p-3 lg:p-4">
      <div className="relative h-[calc(100svh-1rem)] w-full overflow-hidden rounded-[24px] ring-1 ring-white/[0.06] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.04)] sm:h-[calc(100svh-1.5rem)] lg:h-[calc(100svh-2rem)] lg:rounded-[28px]">
        {/* WebGL bg */}
        <div className="absolute inset-0 z-0">
          <HeroBackgroundClient />
        </div>

        {/* Grain — tactile texture on the shader */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-overlay opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/></svg>\")",
          }}
        />

        {/* Thin glass overlay — softens the shader and gives a frosted premium feel */}
        {/* <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] backdrop-blur-[2px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.18) 100%)",
          }}
        /> */}

        {/* Top edge wash — gives the navbar legibility & separation from the card edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-32"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.10) 60%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Inner edge highlight — specular rim for premium feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] rounded-[24px] lg:rounded-[28px]"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.50)",
          }}
        />

        {/* Content — vertically centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          {/* Frosted glass content panel — holds the editorial group */}
          <div className="relative flex flex-col items-center rounded-[28px] px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            {/* Glass surface behind the content group */}
            {/* <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] bg-white/[0.03] backdrop-blur-md ring-1 ring-white/[0.08]"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 80px -40px rgba(0,0,0,0.6)",
              }}
            /> */}

            <Pill className="animate-fade-up bg-black/30 text-fg/90 backdrop-blur-md ring-1 ring-white/10 [animation-delay:60ms]">
              {h.eyebrow}
            </Pill>

            <h1 className="mt-7 font-display text-[44px] font-normal leading-[0.96] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.55)] sm:text-[68px] lg:text-[92px]">
              <span className="block animate-fade-up [animation-delay:160ms]">
                Your product is <em className="italic font-bold">close</em>.
              </span>
              <span className="block animate-fade-up [animation-delay:260ms]">
                We close the <em className="italic font-bold">gap</em>.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-white/80 animate-fade-up [animation-delay:360ms] sm:text-[17px]">
              {h.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up [animation-delay:460ms]">
              <Button href={h.primaryCta.href} variant="primary" arrow>
                {h.primaryCta.label}
              </Button>
              <Button href={h.secondaryCta.href} variant="ghost">
                {h.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
