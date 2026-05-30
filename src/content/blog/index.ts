import type { BlogPost } from "@/content/blog/types";
import { post as headlessCost } from "@/content/blog/headless-shopify-cost-2026";
import { post as headlessVsTheme } from "@/content/blog/headless-shopify-vs-theme";
import { post as hiringChecklist } from "@/content/blog/hiring-a-software-agency-checklist";
import { post as whatsappIndia } from "@/content/blog/whatsapp-commerce-india";
import { post as shopifyPlus } from "@/content/blog/do-you-need-shopify-plus";
import { post as payments } from "@/content/blog/razorpay-vs-stripe-vs-shopify-payments";
import { post as lighthouse } from "@/content/blog/shopify-lighthouse-95";
import { post as nativeVsRn } from "@/content/blog/native-vs-react-native-2026";
import { post as attribution } from "@/content/blog/fix-shopify-attribution";
import { post as whatsappVsTelegram } from "@/content/blog/whatsapp-vs-telegram-ecommerce";
import { post as buildVsBuy } from "@/content/blog/build-vs-buy-custom-software";
import { post as migration } from "@/content/blog/headless-shopify-migration-checklist";

export type { BlogPost } from "@/content/blog/types";

// All posts, newest first. To publish a new post: add its module to
// `src/content/blog/<slug>.tsx`, then register it here.
export const posts: BlogPost[] = [
  headlessCost,
  headlessVsTheme,
  hiringChecklist,
  whatsappIndia,
  shopifyPlus,
  payments,
  lighthouse,
  nativeVsRn,
  attribution,
  whatsappVsTelegram,
  buildVsBuy,
  migration,
].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export const postsBySlug: Record<string, BlogPost> = Object.fromEntries(
  posts.map((p) => [p.slug, p]),
);

// Curated top-level categories used for the blog filter. Order here is the
// order shown in the sidebar.
export const CATEGORIES = [
  "Headless Shopify",
  "Bots & Messaging",
  "Payments & Checkout",
  "Custom Software & Mobile",
  "Hiring & Agencies",
] as const;

export type Category = (typeof CATEGORIES)[number];

// Per-post cover image (Unsplash, hotlinked with clean imgix params). Shown as
// a blue duotone on the card and revealed in full colour on hover. All URLs
// verified to resolve. Swap any here to change a post's cover.
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&q=70&auto=format&fit=crop`;

export const imageForSlug: Record<string, string> = {
  "headless-shopify-cost-2026": U("1496181133206-80ce9b88a853"),
  "headless-shopify-vs-theme": U("1525547719571-a2d4ac8945e2"),
  "do-you-need-shopify-plus": U("1542744095-291d1f67b221"),
  "shopify-lighthouse-95": U("1531297484001-80022131f5a1"),
  "fix-shopify-attribution": U("1586880244406-556ebe35f282"),
  "headless-shopify-migration-checklist": U("1603302576837-37561b2e2302"),
  "whatsapp-commerce-india": U("1633354931133-27ac1ee5d853"),
  "whatsapp-vs-telegram-ecommerce": U("1636751364472-12bfad09b451"),
  "razorpay-vs-stripe-vs-shopify-payments": U("1563013544-824ae1b704d3"),
  "build-vs-buy-custom-software": U("1515879218367-8466d910aaa4"),
  "native-vs-react-native-2026": U("1542831371-29b0f74f9713"),
  "hiring-a-software-agency-checklist": U("1675434303097-210c75b61d3f"),
};

/** Each post's single primary category. */
export const categoryForSlug: Record<string, Category> = {
  "headless-shopify-cost-2026": "Headless Shopify",
  "headless-shopify-vs-theme": "Headless Shopify",
  "do-you-need-shopify-plus": "Headless Shopify",
  "shopify-lighthouse-95": "Headless Shopify",
  "fix-shopify-attribution": "Headless Shopify",
  "headless-shopify-migration-checklist": "Headless Shopify",
  "whatsapp-commerce-india": "Bots & Messaging",
  "whatsapp-vs-telegram-ecommerce": "Bots & Messaging",
  "razorpay-vs-stripe-vs-shopify-payments": "Payments & Checkout",
  "build-vs-buy-custom-software": "Custom Software & Mobile",
  "native-vs-react-native-2026": "Custom Software & Mobile",
  "hiring-a-software-agency-checklist": "Hiring & Agencies",
};
