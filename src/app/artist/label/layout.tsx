import { type Metadata } from "next";

import { LabelPage } from "@/screens/artist/label";

export const metadata: Metadata = {
  title: "Артисты - Личный кабинет | ЗВУЧНО",
  openGraph: {
    title: "Артисты - Личный кабинет | ЗВУЧНО",
  },
};

export default function ArtistLabelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabelPage />
      {children}
    </>
  );
}
