import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NotchNav } from "@/components/sections/shopify-headless/notch-nav";
import { MaintenanceScreen } from "@/components/sections/maintenance/maintenance-screen";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { GSAPProvider } from "@/components/providers/gsap-provider";
import {
  ThemeModeProvider,
  themeModeInitScript,
} from "@/components/providers/theme-mode-provider";
import { CurrencyProvider } from "@/components/providers/currency-provider";
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

const title = `tilde · ${site.tagline}`;
const description = site.description;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description,
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
    description,
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: site.twitterHandle,
    creator: site.twitterHandle,
    images: ["/og.jpg"],
  },
  // While the site is sealed for maintenance, tell crawlers not to index the
  // takeover screen (paired with the disallow-all in robots.ts).
  robots: site.maintenance
    ? { index: false, follow: false }
    : {
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
        className={`bg-bg text-ink ${
          site.maintenance ? "h-[100svh] overflow-hidden" : "min-h-screen"
        }`}
        suppressHydrationWarning
      >
        <OrganizationLd />
        <WebSiteLd />
        <ThemeModeProvider>
          <CurrencyProvider>
          {site.maintenance ? (
            // Maintenance mode: the page tree is withheld entirely. Every route
            // resolves to the single, sealed-off maintenance screen — no nav,
            // no footer, no smooth-scroll hijack, no GSAP (it's fully static).
            <MaintenanceScreen />
          ) : (
            <LenisProvider>
              <GSAPProvider>
                <div className="relative flex min-h-screen w-full flex-col">
                  <NotchNav />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </GSAPProvider>
            </LenisProvider>
          )}
          </CurrencyProvider>
        </ThemeModeProvider>
        {/* No cookie banner on the maintenance splash — it would be the only
            navigable link left on an otherwise sealed-off screen. */}
        {!site.maintenance && <CookieConsent />}
        <CalProvider />
        <TrackClicks />
        <Analytics />
      </body>
    </html>
  );
}
