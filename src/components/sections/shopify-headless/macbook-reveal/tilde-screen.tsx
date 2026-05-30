"use client";

import * as React from "react";
import type { StorefrontMockup } from "@/lib/storefronts";
import { SafeImg } from "./safe-img";

type Props = { brand: StorefrontMockup };

/**
 * Editorial Tilde-built storefront, modelled on the PARFS reference: a centered
 * serif wordmark, a split hero (powder-blue type panel + full-bleed model
 * photograph), a giant statement line with images woven between the words, and
 * a photographic, unhurried product grid. Long-form by design so the
 * scroll-through mechanic has runway. Real Unsplash imagery, Cormorant serif.
 *
 * NOTE: this page runs under data-page-theme="bridge", which remaps the
 * --font-display token to Inter. To keep the serif intent we reference
 * --font-cormorant directly via SERIF below rather than the font-display class.
 */

/* PARFS-reference palette (intentionally independent of brand.bgHex). */
const PANEL = "#cfe0ea"; // powder-blue hero panel
const BG = "#fbfaf7"; // warm white page
const INK = "#14110f"; // near-black
const INK_SOFT = "#57524c";
const INK_MUTED = "#928b81";
const RULE = "#e9e3d9";
const SERIF =
  "var(--font-cormorant), 'Iowan Old Style', Baskerville, Georgia, serif";

export function TildeScreen({ brand }: Props) {
  const headline = brand.heroHeadlineLines ?? ["Ritual", "becomes", "skin"];
  const heroLink = brand.heroLink ?? "All products";
  const lookbook = brand.lookbookImages ?? [];

  return (
    // zoom 0.8 scales the whole storefront down for more breathing room. With
    // width:100%, the visual width still equals the container (zoom also scales
    // the % basis), while the internal layout canvas grows to container/0.8 —
    // i.e. ~25% more room, so the hero reads airier. Mac-frame scrollHeight
    // (measured post-zoom) stays correct.
    <div style={{ backgroundColor: BG, color: INK, zoom: 0.8, width: "100%" }}>
      {/* ─── Nav ───────────────────────────────────────────────── */}
      <header
        className="grid grid-cols-3 items-center px-7 py-4"
        style={{ borderBottom: `1px solid ${RULE}`, backgroundColor: BG }}
      >
        <div className="flex items-center gap-5">
          <span className="flex flex-col gap-[3px]" aria-hidden>
            <span
              className="block h-[1.5px] w-[18px]"
              style={{ background: INK }}
            />
            <span
              className="block h-[1.5px] w-[18px]"
              style={{ background: INK }}
            />
            <span
              className="block h-[1.5px] w-[12px]"
              style={{ background: INK }}
            />
          </span>
          <span
            className="font-sans text-[11px] tracking-[0.04em]"
            style={{ color: INK_SOFT }}
          >
            Search
          </span>
        </div>

        <div
          className="text-center"
          style={{
            fontFamily: SERIF,
            fontSize: "23px",
            fontWeight: 500,
            letterSpacing: "0.42em",
            textIndent: "0.42em",
            lineHeight: 1,
          }}
        >
          {brand.brand}
        </div>

        <div className="flex items-center justify-end gap-4" aria-hidden>
          {/* bag */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke={INK}
            strokeWidth="1.4"
          >
            <path d="M6 8h12l-1 12H7L6 8Z" />
            <path d="M9 8a3 3 0 0 1 6 0" />
          </svg>
          {/* account */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke={INK}
            strokeWidth="1.4"
          >
            <circle cx="12" cy="8" r="3.4" />
            <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
          </svg>
        </div>
      </header>

      {/* ─── Hero — one continuous powder-blue field ───────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: PANEL, minHeight: "560px" }}
      >
        {/* Model layer — a transparent PNG cutout, oversized and anchored to the
            top so the lower body bleeds off the bottom edge (crops near the
            shoulders). */}
        <div
          className="pointer-events-none absolute"
          style={{ right: "-1%", top: "0px", height: "780px" }}
        >
          <SafeImg
            src={brand.heroImage}
            alt={`${brand.brand} editorial`}
            tint="transparent"
            loading="eager"
            className="block h-full w-auto object-contain object-top"
          />
        </div>

        {/* Text layer */}
        <div
          className="relative z-10 flex flex-col justify-between px-14 pt-12 pb-11"
          style={{ minHeight: "560px", maxWidth: "58%" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="block h-px w-9"
              style={{ background: "rgba(20,17,15,0.4)" }}
            />
            <span
              className="font-sans text-[10px] uppercase tracking-[0.36em]"
              style={{ color: "rgba(20,17,15,0.62)" }}
            >
              Edition I — {brand.category}
            </span>
          </div>

          <div>
            <h1
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                fontSize: "88px",
                lineHeight: 0.88,
                letterSpacing: "-0.024em",
                textTransform: "uppercase",
                color: INK,
              }}
            >
              {headline[0]}
              <br />
              {headline[1]}
              <br />
              {headline[2]}
            </h1>

            <div className="mt-9 flex items-end justify-between">
              <a
                className="font-sans text-[11px] uppercase tracking-[0.28em]"
                style={{
                  color: INK,
                  borderBottom: `1px solid ${INK}`,
                  paddingBottom: "5px",
                }}
              >
                {heroLink}
              </a>
              <span className="flex items-center gap-2" aria-hidden>
                <span
                  className="block h-[2px] w-3"
                  style={{ background: "rgba(20,17,15,0.3)" }}
                />
                <span
                  className="block h-[2px] w-7"
                  style={{ background: INK }}
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Statement line ────────────────────────────────────── */}
      {brand.statement ? <StatementBand statement={brand.statement} /> : null}

      {/* ─── The collection ────────────────────────────────────── */}
      <section className="px-12 pt-16 pb-6">
        <SectionLabel
          left="The collection"
          right={`${brand.products.length} pieces · Edition I`}
        />
        <div className="mt-8 grid grid-cols-2 gap-x-7 gap-y-12">
          {brand.products.map((p, i) => (
            <ProductCard
              key={p.name}
              index={i + 1}
              name={p.name}
              note={p.note}
              price={p.price}
              tag={p.tag}
              image={p.image}
            />
          ))}
        </div>
      </section>

      {/* ─── Ritual — three movements ──────────────────────────── */}
      <section className="px-12 pt-12 pb-14">
        <SectionLabel left="The ritual" right="Morning + night" />
        <div className="mt-9 grid grid-cols-3 gap-9">
          {[
            {
              num: "01",
              name: brand.products[2].name,
              line: "Cool water, two pumps. No squeak, no strip.",
            },
            {
              num: "02",
              name: brand.products[0].name,
              line: "Press three drops into still-damp skin. Wait.",
            },
            {
              num: "03",
              name: brand.products[1].name,
              line: "A pea of balm, sealing only where it pulls.",
            },
          ].map((s) => (
            <div key={s.num}>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: "40px",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: INK_MUTED,
                }}
              >
                {s.num}
              </p>
              <p
                className="mt-4"
                style={{
                  fontFamily: SERIF,
                  fontSize: "21px",
                  letterSpacing: "-0.01em",
                  color: INK,
                }}
              >
                {s.name}
              </p>
              <p
                className="mt-2 text-[12.5px] leading-relaxed"
                style={{ color: INK_SOFT }}
              >
                {s.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Lookbook ──────────────────────────────────────────── */}
      {lookbook.length > 0 ? (
        <section className="px-12 pt-2 pb-16">
          <SectionLabel
            left="Lookbook"
            right={`Studied · ${lookbook.length} frames`}
          />
          <div className="mt-7 grid grid-cols-3 gap-5">
            {lookbook.map((src, i) => (
              <figure key={src} className="flex flex-col">
                <SafeImg
                  src={src}
                  alt={`${brand.brand} lookbook ${i + 1}`}
                  tint="#e3ddd2"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4 / 5" }}
                />
                <figcaption
                  className="mt-3 font-sans text-[10px] uppercase tracking-[0.24em]"
                  style={{ color: INK_MUTED }}
                >
                  No. 0{i + 1} — {["Texture", "Slip", "Light"][i] ?? "Frame"}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ─── Pull quote / founder note ─────────────────────────── */}
      <section
        className="px-16 py-16 text-center"
        style={{ background: PANEL, borderTop: `1px solid ${RULE}` }}
      >
        <p
          className="font-sans text-[10px] uppercase tracking-[0.32em]"
          style={{ color: "rgba(20,17,15,0.5)" }}
        >
          A note
        </p>
        <p
          className="mx-auto mt-5 max-w-[46ch] italic"
          style={{
            fontFamily: SERIF,
            fontSize: "27px",
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: INK,
          }}
        >
          “We built {brand.brand} the way we wanted to use it —{" "}
          {brand.tildeBullets[0].toLowerCase()},{" "}
          {brand.tildeBullets[1].toLowerCase()}. Slow on purpose.”
        </p>
        <p
          className="mt-6 font-sans text-[10px] uppercase tracking-[0.26em]"
          style={{ color: INK_SOFT }}
        >
          Founder · {brand.brand}
        </p>
      </section>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <footer
        className="flex items-center justify-between px-12 py-7"
        style={{ borderTop: `1px solid ${RULE}`, backgroundColor: BG }}
      >
        <div className="flex items-baseline gap-3">
          <span
            style={{
              fontFamily: SERIF,
              fontSize: "16px",
              letterSpacing: "0.34em",
              textIndent: "0.34em",
            }}
          >
            {brand.brand}
          </span>
          <span
            className="font-sans text-[9px] uppercase tracking-[0.24em]"
            style={{ color: INK_MUTED }}
          >
            © Edition I
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[9px] uppercase tracking-[0.18em]"
          style={{ backgroundColor: INK, color: BG }}
        >
          <span
            className="font-mono"
            style={{ color: "var(--color-accent, #155DFC)" }}
          >
            ~
          </span>{" "}
          Built by Tilde ↗
        </span>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Statement band — giant serif sentence with inline images        */
/* ────────────────────────────────────────────────────────────── */

function StatementBand({
  statement,
}: {
  statement: NonNullable<StorefrontMockup["statement"]>;
}) {
  const { segments, images, playIndex } = statement;
  // Inline image shapes alternate for a hand-set, editorial feel.
  const radii = ["50%", "46% 54% 52% 48% / 54% 48% 52% 46%", "50%"];
  const widths = [150, 132, 150];

  return (
    <section
      className="px-10 py-24"
      style={{
        borderTop: `1px solid ${RULE}`,
        borderBottom: `1px solid ${RULE}`,
      }}
    >
      <p
        className="mx-auto text-center"
        style={{
          fontFamily: SERIF,
          fontWeight: 500,
          fontSize: "70px",
          lineHeight: 1.08,
          letterSpacing: "-0.022em",
          textTransform: "uppercase",
          color: INK,
          maxWidth: "1180px",
          // allow inline-block images to sit on the text baseline mid-sentence
          wordSpacing: "0.04em",
        }}
      >
        {segments.map((seg, i) => (
          <React.Fragment key={i}>
            <span>{seg}</span>
            {i < images.length ? (
              <>
                {" "}
                <span
                  className="relative inline-block overflow-hidden align-middle"
                  style={{
                    width: `${widths[i % widths.length]}px`,
                    height: "72px",
                    borderRadius: radii[i % radii.length],
                    margin: "0 16px",
                    transform: "translateY(-8px)",
                    boxShadow: "0 10px 28px -12px rgba(20,17,15,0.55)",
                  }}
                >
                  <SafeImg
                    src={images[i]}
                    alt=""
                    tint="#cdbfae"
                    className="h-full w-full object-cover"
                  />
                  {playIndex === i ? (
                    <span
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "rgba(20,17,15,0.18)" }}
                      aria-hidden
                    >
                      <span
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: "34px",
                          height: "34px",
                          background: "rgba(251,250,247,0.92)",
                        }}
                      >
                        <svg
                          width="11"
                          height="13"
                          viewBox="0 0 9 11"
                          fill={INK}
                          aria-hidden
                        >
                          <path d="M0 0l9 5.5L0 11z" />
                        </svg>
                      </span>
                    </span>
                  ) : null}
                </span>{" "}
              </>
            ) : null}
          </React.Fragment>
        ))}
      </p>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Section label                                                    */
/* ────────────────────────────────────────────────────────────── */

function SectionLabel({ left, right }: { left: string; right: string }) {
  return (
    <div
      className="flex items-end justify-between pb-3"
      style={{ borderBottom: `1px solid ${RULE}` }}
    >
      <p
        className="font-sans text-[10px] uppercase tracking-[0.28em]"
        style={{ color: INK }}
      >
        {left}
      </p>
      <p
        className="font-sans text-[10px] uppercase tracking-[0.22em]"
        style={{ color: INK_MUTED }}
      >
        {right}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Product card                                                     */
/* ────────────────────────────────────────────────────────────── */

function ProductCard({
  index,
  name,
  note,
  price,
  tag,
  image,
}: {
  index: number;
  name: string;
  note?: string;
  price: string;
  tag?: string;
  image?: string;
}) {
  return (
    <article className="flex flex-col">
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4 / 5" }}
      >
        <SafeImg
          src={image}
          alt={name}
          tint="#e6ded2"
          className="h-full w-full object-cover"
        />
        <span
          className="absolute left-4 top-4 font-sans text-[9px] uppercase tracking-[0.24em]"
          style={{
            color: "rgba(251,250,247,0.92)",
            mixBlendMode: "difference",
          }}
        >
          0{index}
        </span>
        {tag ? (
          <span
            className="absolute right-4 top-4 rounded-full px-2.5 py-1 font-sans text-[8px] uppercase tracking-[0.18em]"
            style={{ background: BG, color: INK }}
          >
            {tag}
          </span>
        ) : null}
      </div>
      <div
        className="mt-4 flex items-start justify-between pt-3"
        style={{ borderTop: `1px solid ${RULE}` }}
      >
        <div>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: "22px",
              letterSpacing: "-0.012em",
              color: INK,
              lineHeight: 1.05,
            }}
          >
            {name}
          </p>
          {note ? (
            <p
              className="mt-1.5 font-sans text-[10px] uppercase tracking-[0.2em]"
              style={{ color: INK_MUTED }}
            >
              {note}
            </p>
          ) : null}
        </div>
        <p
          className="font-sans text-[13px]"
          style={{ color: INK_SOFT, whiteSpace: "nowrap" }}
        >
          {price}
        </p>
      </div>
    </article>
  );
}
