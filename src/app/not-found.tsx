import Link from "next/link";
import { SectionFrame, Eyebrow } from "@/components/layout/section-frame";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SectionFrame className="pt-6 md:pt-10">
      <div className="mx-auto flex max-w-2xl flex-col items-start">
        <Eyebrow>
          <span className="text-accent">~</span> 404
        </Eyebrow>
        <h1 className="mt-6 font-display leading-[1.05] tracking-[-0.02em] text-[clamp(2.25rem,5vw,3.5rem)]">
          This page wandered off.
        </h1>
        <p className="mt-6 max-w-md text-base text-ink-muted leading-relaxed md:text-lg">
          The link may be broken or the page may have moved. Let&apos;s get you
          back on track.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </SectionFrame>
  );
}
