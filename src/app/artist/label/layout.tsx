import { LabelPage } from "@/screens/artist/label";

export default function ArtistLabelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LabelPage />
      {children}
    </>
  );
}
