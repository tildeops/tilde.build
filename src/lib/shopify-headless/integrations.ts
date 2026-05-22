// Integration tiles for the IntegrationsGrid section.
// Each tile renders the brand name + an inline SVG mark on a brand-tinted card.
// `logo` is a small SVG path/markup string rendered inside a 56x56 viewBox.

export type Integration = {
  id: string;
  name: string;
  category: "Attribution" | "Payments" | "Email" | "Analytics" | "Support";
  /** Solid background hex for the tile */
  bg: string;
  /** Foreground hex (logo + label) — usually white on dark bg */
  fg: string;
  /** SVG markup — child of a 64x64 viewBox <svg>. Use currentColor for foreground. */
  logo: string;
  status?: "live" | "coming-soon";
};

export const integrations: Integration[] = [
  {
    id: "meta-pixel",
    name: "Meta Pixel + CAPI",
    category: "Attribution",
    bg: "#1877F2",
    fg: "#ffffff",
    logo: `<path fill="currentColor" d="M32 6C17.6 6 6 17.6 6 32c0 13 9.5 23.8 22 25.7V39.5h-6.6V32H28v-5.7c0-6.5 3.9-10.1 9.8-10.1 2.8 0 5.8.5 5.8.5v6.4h-3.3c-3.2 0-4.2 2-4.2 4.1V32h7.2l-1.1 7.5H36v18.2c12.5-1.9 22-12.7 22-25.7C58 17.6 46.4 6 32 6Z"/>`,
  },
  {
    id: "ga4",
    name: "GA4 + Measurement",
    category: "Analytics",
    bg: "#F9AB00",
    fg: "#1a1a1a",
    logo: `<rect x="11" y="40" width="10" height="16" rx="3" fill="currentColor"/><rect x="27" y="28" width="10" height="28" rx="3" fill="currentColor"/><rect x="43" y="14" width="10" height="42" rx="5" fill="currentColor"/>`,
  },
  {
    id: "clarity",
    name: "MS Clarity",
    category: "Analytics",
    bg: "#0078D4",
    fg: "#ffffff",
    logo: `<circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="3.5" fill="none"/><circle cx="32" cy="32" r="7" fill="currentColor"/><path d="M44 44 L52 52" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>`,
  },
  {
    id: "razorpay",
    name: "Razorpay",
    category: "Payments",
    bg: "#0C2451",
    fg: "#3395FF",
    logo: `<path fill="currentColor" d="M42 8 22 56h7l13-32-8 32h7l13-48z"/><path fill="currentColor" opacity="0.55" d="M18 26 12 56h22l6-16z"/>`,
  },
  {
    id: "stripe",
    name: "Stripe (Global)",
    category: "Payments",
    bg: "#635BFF",
    fg: "#ffffff",
    logo: `<path fill="currentColor" d="M37.4 26.1c0-2.4 2-3.3 5.2-3.3 4.7 0 10.6 1.4 15.3 3.9V12.3c-5.1-2-10.2-2.8-15.3-2.8C30.1 9.5 22 16 22 26.8c0 16.9 23.3 14.2 23.3 21.5 0 2.9-2.5 3.8-5.8 3.8-5.1 0-11.7-2.1-16.9-4.9v14.7c5.8 2.5 11.6 3.5 16.9 3.5 12.8 0 21.5-6.3 21.5-17.2-.1-18.3-23.6-15-23.6-22.1Z"/>`,
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    category: "Email",
    bg: "#1A1A1A",
    fg: "#ffffff",
    logo: `<path fill="currentColor" d="M11 16 C20 14 32 14 53 16 C44 24 36 32 32 42 C28 32 20 24 11 16 Z"/><circle cx="32" cy="48" r="5" fill="currentColor"/>`,
  },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business",
    category: "Support",
    bg: "#25D366",
    fg: "#ffffff",
    logo: `<path fill="currentColor" d="M32 8C18.8 8 8 18.6 8 31.7c0 4.4 1.2 8.6 3.3 12.3L8 56l12.4-3.2c3.5 1.9 7.5 2.9 11.6 2.9 13.2 0 24-10.6 24-23.7C56 18.6 45.2 8 32 8Zm14 33.7c-.6 1.7-3.5 3.3-4.8 3.4-1.3.1-1.4 1-8.8-2-7.4-3-12-10.7-12.4-11.2-.4-.5-3-3.9-3-7.4 0-3.5 1.8-5.3 2.5-6 .7-.7 1.4-.9 1.9-.9.5 0 1.1.1 1.5 0 .5 0 1.2-.2 1.8 1.4.7 1.6 2.2 5.5 2.4 5.9.2.4.3.8.1 1.3-.2.5-.4.8-.7 1.2-.4.4-.7.9-1.1 1.3-.4.4-.7.8-.3 1.5.4.7 1.7 2.9 3.7 4.7 2.6 2.3 4.7 3 5.3 3.3.7.3 1.1.2 1.5-.1.4-.4 1.7-2 2.2-2.7.4-.7.9-.6 1.5-.4.6.2 3.7 1.8 4.4 2.1.6.3 1.1.4 1.2.7.2.3.2 1.7-.4 3.4Z"/>`,
  },
  {
    id: "telegram",
    name: "Telegram Bot",
    category: "Support",
    bg: "#26A5E4",
    fg: "#ffffff",
    logo: `<path fill="currentColor" d="M52 14 8 30c-2 .7-2 2.2.4 2.8l11.2 3.5 4.3 13.5c.6 1.7 1 2.3 2.3 2.3 1 0 1.4-.5 2-1l5.5-5.4 11.4 8.4c2.1 1.2 3.6.6 4.1-1.9L57 17.6c.7-3.1-1-4.5-3-3.6 z M22.4 35.6 47 20.5l-19.7 18 -1 8.7-3.9-11.6Z"/>`,
  },
];
