import type { BlogPost } from "@/content/blog/types";

function Body() {
  return (
    <>
      <p>
        Hiring a software development agency comes down to a few questions that
        predict whether a project ships well: who writes the code, how scope and
        price are set, who owns the result, and what happens after launch. Use
        the checklist below before you sign anything.
      </p>

      <h2>The founder&apos;s checklist</h2>
      <ol>
        <li>
          <strong>Who actually writes the code?</strong> Ask whether the people
          on your calls are the people building the product, or whether work is
          handed off to an offshore team you never speak to. Direct access to
          the engineers is the single biggest quality signal.
        </li>
        <li>
          <strong>How is scope and price set?</strong> A defined deliverable, a
          fixed price, and a written timeline protect you from scope creep.
          Open-ended hourly arrangements with no cap are where budgets quietly
          double.
        </li>
        <li>
          <strong>Who owns the code?</strong> You should own the repository from
          day one — no per-seat licence, no recurring platform fee, no lock-in.
          Confirm the handover terms in writing.
        </li>
        <li>
          <strong>What does the stack look like?</strong> Modern, well-supported
          tools (for example Next.js, TypeScript, Postgres) mean you can hire
          for it later. A bespoke or obscure stack makes you dependent on the
          agency forever.
        </li>
        <li>
          <strong>How do they handle changes mid-project?</strong> Requirements
          shift. A good agency re-quotes the delta and you approve it — rather
          than silently absorbing changes into a slipping timeline.
        </li>
        <li>
          <strong>What happens after launch?</strong> Ask about post-launch
          support, documentation, and whether you can take the project in-house.
          A documented codebase and a support window are the difference between
          an asset and a liability.
        </li>
      </ol>

      <h2>Red flags</h2>
      <ul>
        <li>No fixed scope or written quote before work starts.</li>
        <li>You never talk to the people writing the code.</li>
        <li>The agency keeps the repository or charges to release it.</li>
        <li>Vague answers on timeline, ownership, or what is excluded.</li>
        <li>A proprietary platform you cannot leave without a rebuild.</li>
      </ul>

      <h2>Green flags</h2>
      <ul>
        <li>A short scoping call that ends in a written, fixed quote.</li>
        <li>Direct, ongoing contact with the engineers and designer.</li>
        <li>A daily or weekly preview URL so you see progress, not promises.</li>
        <li>Full code ownership and a documented handover.</li>
        <li>A clear post-launch support window and an optional retainer.</li>
      </ul>

      <h2>Fixed-scope, retainer, or hourly?</h2>
      <p>
        Pick <strong>fixed-scope</strong> when the deliverable is clear — a
        storefront, a bot, a landing page. Pick a <strong>retainer</strong> when
        you need an embedded team shipping against a rolling backlog. Use{" "}
        <strong>hourly</strong> for audits, performance work, or unsticking your
        in-house team. The right agency will recommend the shape that fits your
        problem rather than the one that bills the most.
      </p>

      <h3>The short version</h3>
      <p>
        Favour agencies where you talk directly to the builders, scope and price
        are written down, and you own the code at the end. Those three things
        predict most good outcomes.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "hiring-a-software-agency-checklist",
  title: "How to hire a software development agency: a founder's checklist",
  description:
    "The questions that actually predict a good outcome when hiring a software development agency — code ownership, scope, stack, and post-launch support.",
  summary:
    "Before hiring a software development agency, confirm four things: who writes the code, how scope and price are fixed in writing, who owns the repository (you should, from day one), and what post-launch support looks like. Direct access to the engineers and a written fixed quote are the strongest quality signals.",
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  topics: ["Hiring", "Software development", "Agencies"],
  readingTime: "6 min read",
  variant: 4,
  Body,
};
