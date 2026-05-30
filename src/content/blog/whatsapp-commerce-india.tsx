import type { BlogPost } from "@/content/blog/types";

function Body() {
  return (
    <>
      <p>
        A <strong>WhatsApp ordering bot</strong> lets customers browse your
        catalogue, place an order, pay, and get support without leaving the
        chat. In India — where WhatsApp is the default way people message
        businesses — it can carry a real share of both sales and support. But it
        works inside Meta&apos;s rules, so it is worth knowing what it can and
        cannot do before you build one.
      </p>

      <h2>What a WhatsApp bot can do</h2>
      <ul>
        <li>
          <strong>Catalogue browse and in-chat ordering</strong> — customers
          pick products and place orders inside the thread.
        </li>
        <li>
          <strong>Automated order-status updates</strong> — confirmation,
          shipping, and delivery messages sent automatically.
        </li>
        <li>
          <strong>In-chat payments</strong> — Razorpay or UPI payment links
          generated inside the conversation.
        </li>
        <li>
          <strong>Abandoned-cart recovery</strong> — nudges that bring shoppers
          back to checkout.
        </li>
        <li>
          <strong>Two-tier support</strong> — the bot handles the common
          questions and hands off cleanly to a human for the rest.
        </li>
        <li>
          <strong>Inventory in sync</strong> — connected to your store admin so
          the bot never sells what you do not have.
        </li>
      </ul>
      <p>
        Built correctly, this is not a toy. One personal-care brand we worked
        with had a WhatsApp bot handling roughly sixty percent of its support
        load within weeks of launch.
      </p>

      <h2>What it can&apos;t do (the rules)</h2>
      <p>
        WhatsApp is not an open broadcast channel. The official Business API has
        guardrails you have to design around:
      </p>
      <ul>
        <li>
          <strong>No unsolicited messaging.</strong> You can only message
          customers who opted in, and promotional sends use pre-approved message
          templates.
        </li>
        <li>
          <strong>A 24-hour service window.</strong> Outside the 24 hours after
          a customer&apos;s last message, you can only reply with approved
          templates, not free-form text.
        </li>
        <li>
          <strong>Per-message pricing.</strong> Business-initiated conversations
          are billed by Meta, so broadcasts have a real cost — spraying messages
          is both against the rules and expensive.
        </li>
      </ul>
      <p>
        Use the official WhatsApp Business API rather than unofficial
        automation — unofficial bots get numbers banned, and you lose the
        channel you built on.
      </p>

      <h2>WhatsApp vs a chatbot widget on your site</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>WhatsApp bot</th>
            <th>On-site chat widget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Where customers are</td>
            <td>Already in WhatsApp</td>
            <td>Only while on your site</td>
          </tr>
          <tr>
            <td>Re-engagement</td>
            <td>Opt-in templates, order updates</td>
            <td>Limited once they leave</td>
          </tr>
          <tr>
            <td>Best for</td>
            <td>Ordering + support in India</td>
            <td>Pre-sale questions on desktop</td>
          </tr>
        </tbody>
      </table>

      <h3>What it costs</h3>
      <p>
        At tilde a WhatsApp bot starts from ₹25,000 (about $500) and takes 2–3
        weeks, with add-ons like abandoned-cart recovery, broadcasts, in-chat
        payments, and AI-assisted replies priced on top. Meta&apos;s
        per-conversation fees are billed separately by Meta.
      </p>
    </>
  );
}

export const post: BlogPost = {
  slug: "whatsapp-commerce-india",
  title: "WhatsApp commerce in India: what an ordering bot can and can't do",
  description:
    "A practical guide to WhatsApp ordering bots for Indian ecommerce — what they handle, the Business API rules to design around, and what one costs.",
  summary:
    "A WhatsApp bot on the official Business API can handle catalogue browsing, in-chat ordering and payments, order updates, abandoned-cart recovery, and a large share of support. It cannot send unsolicited messages — promotional sends need opt-in and approved templates, and there is a 24-hour service window plus per-conversation pricing. Builds start from ₹25,000 (~$500).",
  datePublished: "2026-05-26",
  dateModified: "2026-05-26",
  topics: ["WhatsApp", "Bots", "India", "Ecommerce"],
  readingTime: "5 min read",
  variant: 1,
  Body,
};
