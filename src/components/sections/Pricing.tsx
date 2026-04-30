import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export function Pricing() {
  const p = site.pricing;
  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow={p.eyebrow}
          title={
            <>
              Priced like <em className="font-normal italic text-fg/70">software</em>,<br className="hidden sm:block" />
              not like consulting.
            </>
          }
          sub={p.sub}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {p.items.map((item) => {
            const isFlex = item.tag.toLowerCase().includes("flex");
            return (
              <article
                key={item.id}
                className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 transition-colors duration-300 hover:border-white/[0.12]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest ${
                      isFlex ? "text-muted" : "text-accent"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[22px] leading-tight">
                  {item.title}
                </h3>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-[42px] leading-none tracking-[-0.02em]">
                    {item.price}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    {item.priceNote}
                  </span>
                </div>
                {item.subline && (
                  <p className="mt-2 text-[12.5px] leading-snug text-muted">
                    {item.subline}
                  </p>
                )}

                <ul className="mt-6 flex flex-col gap-2 border-t border-white/[0.06] pt-6">
                  {item.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[13px] text-fg/80 before:mr-2 before:text-muted before:content-['~']"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[11.5px] leading-relaxed text-muted/80">
                  {item.footnote}
                </p>

                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <Button href={item.cta.href} variant="ghost" arrow className="w-full justify-center">
                    {item.cta.label}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl font-mono text-[11.5px] italic leading-relaxed text-muted/80">
          {p.finePrint}
        </p>
      </div>
    </section>
  );
}
