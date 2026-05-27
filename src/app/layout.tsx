import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://tilde.dev"),
  title: {
    default: "tilde — One studio. Whole stack.",
    template: "%s · tilde",
  },
  description:
    "Custom web, mobile apps, Shopify storefronts, and WhatsApp/Telegram bots. Built by a small team of senior engineers — no project managers, no handoffs.",
  openGraph: {
    title: "tilde — One studio. Whole stack.",
    description:
      "Custom web, mobile apps, Shopify storefronts, and WhatsApp/Telegram bots. Built by a small team of senior engineers.",
    type: "website",
    url: "https://tilde.dev",
    siteName: "tilde",
  },
  twitter: {
    card: "summary_large_image",
    title: "tilde — One studio. Whole stack.",
    description:
      "Custom web, mobile apps, Shopify storefronts, and WhatsApp/Telegram bots.",
  },
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
      </body>
    </html>
  );
}
