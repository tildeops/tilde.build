import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tilde — approximate to precise",
  description:
    "Tilde is a three-person software studio. We design and build headless Shopify storefronts, custom ecommerce, bots, and SaaS — fast, because we're small.",
  keywords: [
    "Tilde",
    "software studio",
    "headless Shopify",
    "custom ecommerce",
    "WhatsApp bot",
    "Telegram bot",
    "SaaS development",
    "Next.js",
    "design engineering",
  ],
  openGraph: {
    title: "Tilde — approximate to precise",
    description:
      "A three-person studio that designs and ships software. Headless Shopify, custom ecommerce, bots, SaaS.",
    url: "https://tilde.build",
    siteName: "Tilde",
    images: [
      {
        url: "https://tilde.build/meta/tildeCard.png",
        width: 1200,
        height: 630,
        alt: "Tilde",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TildeStudio",
    creator: "@TildeStudio",
    title: "Tilde — approximate to precise",
    description:
      "A three-person studio. Design and engineering, in the same conversation.",
    images: ["https://tilde.build/meta/tildeCard.png"],
  },
};

export const viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`}
    >
      <body className="font-sans bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
