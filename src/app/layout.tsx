import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/widgets/layout/Footer";
import { AppHeader } from "@/widgets/layout/Header";

import { SessionProviders } from "@/entities/user/providers/providers";

import "./globals.scss";
import { QueryProvider } from "./providers/QueryClientProvider";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000"),
  title: "Звучно",
  description: "Маркетплейс цифровой музыки для СНГ артисов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={`${featureMono.variable} ${betterVcr.variable}`}>
        <SessionProviders>
          <QueryProvider>
            <div className='global-noise' />
            <div className='app-shell'>
              <div className='app-container app-header-container'>
                <AppHeader />
              </div>
              <main className='app-main'>
                <div className='app-container'>{children}</div>
              </main>
              <Footer />
            </div>
          </QueryProvider>
        </SessionProviders>

        {/* вывод сообшений об ошибках от сервера либо кастомных в попап уведомлении для пользователя */}
        <Toaster
          position='bottom-right'
          toastOptions={{ style: { fontFamily: "FeatureMono", border: "1px solid currentColor" } }}
        />
      </body>
    </html>
  );
}
