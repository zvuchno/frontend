import { Suspense } from "react";

import { type Metadata } from "next";

import { ForArtists } from "@/screens/forArtists";

import { Loader } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Стать артистом на ЗВУЧНО",
  description:
    "Зарегистрируйся в качестве артиста и начни продавать свою музыку и мерч уже сейчас, а ЗВУЧНО тебе в этом поможет",

  alternates: {
    canonical: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}for-artists`,
  },
  openGraph: {
    title: "Стать артистом на ЗВУЧНО | Присоединиться к ЗВУЧНО",
    description:
      "Зарегистрируйся и начни продавать свою музыку и мерч уже сейчас, а ЗВУЧНО тебе в этом поможет",

    type: "website",
    url: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}for-artists`,
  },
};

export default function ForArtistsLanding() {
  return (
    <Suspense fallback={<Loader />}>
      <ForArtists />
    </Suspense>
  );
}
