# tilde

Marketing site for tilde — a software development agency offering headless
Shopify rebuilds, custom e-commerce, and WhatsApp sales channels.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 + shadcn-style primitives
- Framer Motion for the `~` motif animations
- `@calcom/embed-react` for the discovery-call booking
- Resend for the fallback contact form
- Burgundy `#6E1423` + cream `#FAF6F1` palette · Instrument Serif + Inter + JetBrains Mono

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm build && pnpm start
```

## Configuration

Copy `.env.example` to `.env.local` and fill in:

| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact-form fallback emails. Without it, submissions are logged server-side and the UI shows success (dev fallback). |
| `RESEND_FROM` | Verified `From:` address in your Resend account. |
| `RESEND_TO` | Where enquiries are delivered. Defaults to `site.contactEmail`. |

Update site-wide constants (contact email, Cal.com URL, social links, city) in
`src/lib/site.ts`. Update marketing copy (offerings, pricing, FAQ, testimonials,
process, pain points) in `src/lib/content.ts` and
`src/lib/shopify-headless-content.ts`.

## Cal.com setup

The booking widget loads `https://cal.com/{site.calcomUrl}` — set this in
`src/lib/site.ts` once your Cal.com account is created (e.g. `tilde/discovery-call`).

## Structure

```
src/
  app/
    page.tsx                   home (composes sections)
    shopify-headless/page.tsx  flagship deep-dive
    contact/page.tsx           Cal.com booking + fallback form
    privacy, terms             legal
    sitemap.ts, robots.ts      SEO
    api/contact/route.ts       Resend POST handler
  components/
    layout/                    header, footer, SectionFrame
    sections/                  hero, pain-points, offerings, pricing, ...
    brand/                     TildeMark logo, scribble motif
    seo/                       JSON-LD schema
    ui/                        button, accordion
  lib/
    site.ts                    nav, contact, calcom, social
    content.ts                 all home-page copy
    shopify-headless-content.ts deep-dive copy
    utils.ts                   cn() helper
```

All marketing copy lives in typed data files — edits don't touch JSX.

## Verification checklist

- [ ] `pnpm build` succeeds with no TS errors
- [ ] `pnpm lint` clean
- [ ] Home renders at 360 / 768 / 1280 / 1920
- [ ] Anchor nav (Offerings / Pricing / Process / About) scrolls correctly
- [ ] Mobile sheet menu opens, links scroll and close
- [ ] Cal.com embed loads on `/contact` (after Cal.com account is set up)
- [ ] Contact fallback form submits and Resend delivers the email
- [ ] `/sitemap.xml` and `/robots.txt` resolve
- [ ] JSON-LD on home validates ([Rich Results Test](https://search.google.com/test/rich-results))

## Brand tokens (Tailwind v4)

Defined in `src/app/globals.css` `@theme {}`:

| Token | Value |
|---|---|
| `bg` | `#FAF6F1` cream |
| `bg-elevated` | `#F5EFE7` |
| `ink` | `#171413` near-black |
| `ink-muted` | `#6B6360` |
| `accent` | `#6E1423` burgundy |
| `accent-soft` | `#F1DDE0` |
| `accent-hover` | `#5A0F1C` |
| `rule` | `#E3DBD3` hairline |

redeploy 1
