import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { GSAPProvider } from "@/components/providers/gsap-provider";
import {
  ThemeModeProvider,
  themeModeInitScript,
} from "@/components/providers/theme-mode-provider";
import { ACTIVE_THEME } from "@/lib/theme";
import { site } from "@/lib/site";
import { OrganizationLd, WebSiteLd } from "@/components/seo/json-ld";
import { Analytics } from "@/components/analytics/analytics";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { TrackClicks } from "@/components/analytics/track-clicks";
import { CalProvider } from "@/components/providers/cal-provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `tilde — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description:
    "Custom web, mobile apps, Shopify storefronts, and WhatsApp/Telegram bots. Built by a small team of senior engineers — no project managers, no handoffs.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  keywords: [
    "headless Shopify",
    "Shopify Hydrogen",
    "custom ecommerce",
    "WhatsApp bot",
    "Telegram bot",
    "mobile app development",
    "Meta Ads",
    "Next.js development studio",
    "software studio India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: site.description,
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    site: site.twitterHandle,
    creator: site.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={ACTIVE_THEME}
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeModeInitScript }} />
      </head>
      <body
        className="min-h-screen bg-bg text-ink"
        suppressHydrationWarning
      >
        <OrganizationLd />
        <WebSiteLd />
        <ThemeModeProvider>
          <LenisProvider>
            <GSAPProvider>
              <div className="relative flex min-h-screen w-full flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </GSAPProvider>
          </LenisProvider>
        </ThemeModeProvider>
        <CookieConsent />
        <CalProvider />
        <TrackClicks />
        <Analytics />
      </body>
    </html>
  );
}
