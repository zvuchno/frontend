import { Toaster } from "react-hot-toast";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Footer } from "@/widgets/layout/Footer";
import { AppHeader } from "@/widgets/layout/Header";

import { GlobalAudio, PlayerUI } from "@/features/player";

import { SessionProviders } from "@/entities/user/providers/providers";

import "./globals.scss";
import { QueryProvider } from "./providers/QueryClientProvider";

export const viewport: Viewport = {
  colorScheme: "light",
};

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
  fallback: ["monospace"], // системный фоллбек
  adjustFontFallback: "Arial", // автоматически подгоняет размеры системного шрифта, чтобы геометрия не прыгала
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
  display: "block",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000"),
  title: "ЗВУЧНО - маркетплейс независимой музыки, мерча и винила",
  description:
    "Маркетплейс цифровой музыки для СНГ артистов. Покупайте цифровые релизы, эксклюзивный мерч, виниловые пластинки и CD напрямую у любимых авторов.",
  keywords: [
    "звучно платформа",
    "маркетплейс локальной музыки",
    "музыкальный маркетплейс",
    "независимые артисты",
    "купить винил",
    "музыкальный мерч",
    "поддержка музыкантов",
    "инди",
    "музыка рф",
    "купить цифровой релиз",
    "звучно маркетплейс",
    "локальная сцена",
    "zvuchno",
    "zvuchno marketplace",
    "zvuchno platform",
    "музыкальный merch",
    "купить cd",
    "продать свою музыку",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000"),
  },
  openGraph: {
    title: "Цифровые релизы и эксклюзивный мерч от любимых авторов",
    description:
      "Первый в России маркетплейс, предназначенный для продажи музыкального контента и сопутствующих товаров напрямую от авторов",
    siteName: "ЗВУЧНО",
    images: [
      {
        url: "/images/main-banner.png",
        width: 1200,
        alt: "ЗВУЧНО — Маркетплейс цифровой музыки для СНГ артистов. Изображение винилового проигрывателя",
      },
    ],
    locale: "ru_RU",
    type: "website",
    url: new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000"),
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={`${featureMono.variable} ${betterVcr.variable}`}>
        <SessionProviders>
          <QueryProvider>
            <GlobalAudio />
            <div className='global-noise' />

            <div className='app-shell'>
              <div className='app-container app-header-container'>
                <AppHeader />
              </div>
              <main className='app-main'>
                <div className='app-container'>{children}</div>
              </main>
              <Footer />
              <PlayerUI className='player-fixed' />
              {modal}
            </div>
          </QueryProvider>
        </SessionProviders>

        {/* вывод сообшений об ошибках от сервера либо кастомных в попап уведомлении для пользователя */}
        <Toaster
          position='bottom-right'
          toastOptions={{
            style: { fontFamily: "FeatureMono", border: "1px solid currentColor" },
          }}
          containerStyle={{ zIndex: 10000 }}
        />
      </body>
    </html>
  );
}
