import { SectionHeading } from "@/components/ui/SectionHeading";
import { AsciiImage } from "@/components/ui/AsciiImage";
import { site } from "@/content/site";

export function Team() {
  const t = site.team;
  return (
    <section
      id="team"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.headline}{" "}
              <em className="font-normal italic text-fg/70">
                {t.headlineEm}
              </em>
              {t.headlineB}
            </>
          }
          sub={t.body}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.members.map((m, i) => (
            <article
              key={i}
              className="group flex flex-col gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6"
            >
              <AsciiImage
                src={m.image}
                alt={`${m.name}, ${m.role}`}
                density={6}
                interactive
                glowColor="#0b2a6b"
                blur={14}
                className="aspect-[4/5] w-full"
              />
              <div>
                <h3 className="font-display text-2xl leading-tight">
                  {m.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-accent">
                  {m.role}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {m.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
