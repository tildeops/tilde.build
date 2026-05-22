// Hero bento chat threads. A mix of two voices that each indict a
// generic Shopify storefront from a different angle:
//
//   1. Customer → merchant — real DMs a brand receives about broken,
//      slow, or confusing checkout experiences. The "them" is the
//      customer; the "me" is the merchant reading the page.
//   2. Merchant → cofounder / dev / agency — the merchant venting
//      about the limitations they're stuck inside. The "them" is the
//      other person (or in some cases the merchant themselves, with
//      "me" replying).
//
// Headline reframe acknowledges both: "Your customers — and your
// data — are already telling you what's wrong."

export type ChatPlatform = "whatsapp" | "instagram" | "telegram";

export type ChatBubble = {
  from: "me" | "them";
  text: string;
  /** Optional time stamp shown under the bubble */
  time?: string;
  /** Optional read tick state on "me" bubbles in WhatsApp */
  read?: boolean;
};

export type ChatTile = {
  id: string;
  platform: ChatPlatform;
  /** Display name in the chat header */
  name: string;
  /** Subtitle in the chat header — "online", "@handle", "last seen ..." */
  meta: string;
  /** Optional avatar background tint (CSS color). Defaults to a brand-neutral grey. */
  avatarTint?: string;
  /** Initials shown in the circular avatar */
  initials: string;
  /** Bento layout — col/row span (defaults 1/1) */
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  /** Tag rendered above the bubbles to clarify whose voice this is */
  tag?: "customer" | "merchant";
  thread: ChatBubble[];
};

export const chatTiles: ChatTile[] = [
  /* ---------- CUSTOMER → MERCHANT (5 tiles) ---------- */

  {
    id: "site-wont-load",
    platform: "whatsapp",
    name: "Iris · new customer",
    meta: "online",
    initials: "IR",
    avatarTint: "#0f766e",
    colSpan: 2,
    tag: "customer",
    thread: [
      { from: "them", text: "hi! your site has been loading for 90 seconds 😅", time: "12:14" },
      { from: "them", text: "is this normal?", time: "12:14" },
      { from: "me", text: "let me check —", time: "12:18", read: true },
      { from: "them", text: "nvm, ordered from someone else", time: "12:24" },
    ],
  },
  {
    id: "checkout-broke",
    platform: "instagram",
    name: "returning_meera",
    meta: "Active now",
    initials: "MR",
    avatarTint: "#be185d",
    tag: "customer",
    thread: [
      { from: "them", text: "tried checking out 3 times today" },
      { from: "them", text: "address page keeps refreshing" },
      { from: "them", text: "I really wanted the serum 😔" },
    ],
  },
  {
    id: "mobile-broken",
    platform: "telegram",
    name: "@sahilshoots",
    meta: "last seen recently",
    initials: "SH",
    avatarTint: "#1e3a8a",
    tag: "customer",
    thread: [
      { from: "them", text: "product page is broken on iPhone 15" },
      { from: "them", text: "size dropdown won't open" },
      { from: "me", text: "try desktop?", read: true },
      { from: "them", text: "I'm at a wedding lol" },
    ],
  },
  {
    id: "shipping-bait",
    platform: "instagram",
    name: "aanya.k",
    meta: "Active 1m ago",
    initials: "AK",
    avatarTint: "#9333ea",
    tag: "customer",
    thread: [
      { from: "them", text: "your homepage says free shipping" },
      { from: "them", text: "checkout added ₹200" },
      { from: "them", text: "left a review" },
    ],
  },
  {
    id: "ad-bounce",
    platform: "whatsapp",
    name: "Anonymous · IG ad",
    meta: "no profile photo",
    initials: "??",
    avatarTint: "#475569",
    tag: "customer",
    thread: [
      { from: "them", text: "saw your reel" },
      { from: "them", text: "clicked the link" },
      { from: "them", text: "9 seconds to load on 4G" },
      { from: "them", text: "byeeeeee 👋" },
    ],
  },

  /* ---------- MERCHANT → COFOUNDER / DEV / AGENCY (3 tiles) ---------- */

  {
    id: "checkout-dropoff",
    platform: "whatsapp",
    name: "Cofounder · Aditya",
    meta: "typing…",
    initials: "AD",
    avatarTint: "#831843",
    colSpan: 2,
    tag: "merchant",
    thread: [
      { from: "them", text: "ran the funnel for last week" },
      { from: "them", text: "62% drop at checkout" },
      { from: "me", text: "wait what", time: "21:13", read: true },
      { from: "them", text: "checkout's on a different domain", time: "21:13" },
      { from: "them", text: "pixel half-fires too", time: "21:14" },
    ],
  },
  {
    id: "animations-2014",
    platform: "instagram",
    name: "designer_nikhil",
    meta: "Active 5m ago",
    initials: "NK",
    avatarTint: "#0e7490",
    colSpan: 2,
    tag: "merchant",
    thread: [
      { from: "them", text: "the hover state on your store" },
      { from: "them", text: "it just… changes opacity" },
      { from: "them", text: "this is 2014" },
    ],
  },
  {
    id: "attribution-broken",
    platform: "telegram",
    name: "Growth lead · Vikram",
    meta: "last seen 2m ago",
    initials: "VK",
    avatarTint: "#b45309",
    colSpan: 2,
    tag: "merchant",
    thread: [
      { from: "them", text: "Meta says we made ₹12L this week" },
      { from: "them", text: "Shopify says ₹6L" },
      { from: "them", text: "GA4 says ₹8L" },
      { from: "me", text: "so… which one do I trust?", read: true },
      { from: "them", text: "exactly the problem" },
    ],
  },
];
