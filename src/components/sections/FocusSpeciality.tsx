import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export function FocusSpeciality() {
  const f = site.focus;
  return (
    <section
      id="focus"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow={f.eyebrow}
          title={
            <>
              Design and web engineering,<br className="hidden sm:block" />
              in the <em className="font-normal italic text-fg/70">same conversation</em>.
            </>
          }
          sub={f.body}
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-3">
          {f.points.map((point, i) => (
            <div key={i} className="flex flex-col gap-3 bg-bg p-8">
              <span className="font-mono text-[11px] text-muted">
                0{i + 1}
              </span>
              <h3 className="font-display text-[22px] leading-tight">
                {point.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
