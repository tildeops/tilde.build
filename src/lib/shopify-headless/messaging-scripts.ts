// Bot conversation scripts for the MessagingBots section.
// Each script walks the customer through one step of their journey on chat:
// view catalog → place order → customer support → delivery updates.
// Rendered as an auto-advancing phone mockup.

export type BotMessage = {
  from: "bot" | "customer";
  text: string;
  /** Optional time stamp */
  time?: string;
  /** If set, render as an interactive card/button row inside the bubble */
  buttons?: string[];
};

export type BotScript = {
  id: string;
  /** Section label shown above the conversation, e.g. "View catalog" */
  label: string;
  /** One-line description for the side copy */
  blurb: string;
  /** Which platform skin: "whatsapp" | "telegram" */
  platform: "whatsapp" | "telegram";
  /** Display name in the chat header */
  contact: string;
  thread: BotMessage[];
};

export const botScripts: BotScript[] = [
  {
    id: "view-catalog",
    label: "View catalog",
    blurb: "Customers browse your range without ever opening a tab.",
    platform: "whatsapp",
    contact: "Plain Skin",
    thread: [
      {
        from: "customer",
        text: "hi! something for dry winter skin?",
        time: "10:02",
      },
      {
        from: "bot",
        text: "Three would help. Tap any to see ingredients.",
        time: "10:02",
        buttons: [
          "Hydrating Serum · ₹1,890",
          "Barrier Cream · ₹2,340",
          "SPF 40 Daily · ₹1,650",
        ],
      },
      { from: "customer", text: "Barrier Cream looks good", time: "10:03" },
      {
        from: "bot",
        text: "Comes in 30 ml and 60 ml. Which one?",
        time: "10:03",
        buttons: ["30 ml · ₹2,340", "60 ml · ₹3,990"],
      },
    ],
  },
  {
    id: "place-order",
    label: "Place an order",
    blurb: "From product to UPI-paid in under a minute, all inside chat.",
    platform: "whatsapp",
    contact: "Halftone",
    thread: [
      { from: "customer", text: "i'll take the Field Hoodie in M", time: "16:21" },
      {
        from: "bot",
        text: "Confirmed — Field Hoodie · M · ₹4,800. Ship to your Powai address?",
        time: "16:21",
        buttons: ["Yes, Powai", "Change address"],
      },
      { from: "customer", text: "Yes, Powai", time: "16:22" },
      {
        from: "bot",
        text: "UPI link ready — under 30 seconds to pay.",
        time: "16:22",
        buttons: ["Pay ₹4,800 →"],
      },
      { from: "customer", text: "✅ paid", time: "16:23" },
      { from: "bot", text: "Got it. Packing now — out by tomorrow.", time: "16:23" },
    ],
  },
  {
    id: "customer-support",
    label: "Customer support",
    blurb: "Bot handles the 90% — and hands off cleanly when it needs a human.",
    platform: "telegram",
    contact: "Aurum Atelier",
    thread: [
      { from: "customer", text: "my ring arrived bent 😕" },
      {
        from: "bot",
        text: "Sorry, that shouldn't happen. Share a photo and I'll set up a free replacement.",
        buttons: ["Send photo", "Talk to atelier"],
      },
      { from: "customer", text: "📷 photo sent" },
      {
        from: "bot",
        text: "Got it. Replacement ships today; pickup for the damaged piece tomorrow.",
        buttons: ["Confirm 10am–12pm"],
      },
      { from: "customer", text: "Confirm 10am–12pm" },
      {
        from: "bot",
        text: "Locked. Tracking lands in this chat the moment it leaves.",
      },
    ],
  },
  {
    id: "delivery-updates",
    label: "Delivery updates",
    blurb: "Live shipping pings the customer can act on — not a dead-end SMS.",
    platform: "whatsapp",
    contact: "Plain Skin",
    thread: [
      {
        from: "bot",
        text: "Order #PS-1284 packed. Out for delivery tomorrow, 2–4 PM.",
        time: "18:40",
      },
      { from: "customer", text: "can I switch to Friday?", time: "18:41" },
      {
        from: "bot",
        text: "Done — rescheduled for Friday, 10am–12pm.",
        time: "18:41",
        buttons: ["Track live", "Note for courier"],
      },
      { from: "customer", text: "thanks", time: "18:42" },
      {
        from: "bot",
        text: "Anything else? I'll be here.",
        time: "18:42",
        buttons: ["Re-order serum", "Talk to human"],
      },
    ],
  },
];
