import { site } from "@/content/site";

export function Collaboration() {
  const c = site.collaboration;
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {c.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[36px] leading-[1.05] tracking-[-0.01em] sm:text-[44px]">
              Bring a design, <em className="font-normal italic text-fg/70">or don&apos;t</em>.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-3 lg:w-[680px]">
            {c.modes.map((mode, i) => (
              <div key={i} className="bg-bg p-6">
                <span className="font-mono text-[10px] text-muted">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl leading-tight">
                  {mode.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  {mode.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
