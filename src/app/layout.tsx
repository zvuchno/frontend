import type { Metadata } from "next";
import localFont from "next/font/local";

import { SessionProviders } from "@/entities/user/providers/providers";
import { Footer } from "@/widgets/layout/Footer";
import { AppHeader } from "@/widgets/layout/Header";
import "./globals.scss";

const featureMono = localFont({
  src: [
    {
      path: "../shared/assets/fonts/FeatureMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../shared/assets/fonts/FeatureMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../shared/assets/fonts/FeatureMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-feature-mono",
  display: "swap",
  preload: false,
});

const betterVcr = localFont({
  src: [
    {
      path: "../shared/assets/fonts/BetterVCR.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-better-vcr",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Звучно",
  description: "Маркетплейс цифровой музыки для СНГ артисов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${featureMono.variable} ${betterVcr.variable}`}
      >
        <SessionProviders>
          <div className="global-noise" />
          <div className="app-shell">
            <div className="app-container app-header-container">
              <AppHeader />
            </div>
            <main className="app-main">
              <div className="app-container">{children}</div>
            </main>
            <Footer />
          </div>
        </SessionProviders>
      </body>
    </html>
  );
}
