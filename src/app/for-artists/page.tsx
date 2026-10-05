import { ForArtists } from "@/screens/forArtists";
import { Loader } from "@/shared/ui";
import { Suspense } from "react";

export default function ForArtistsLanding() {
  return (
    <Suspense fallback={<Loader />}>
      <ForArtists />
    </Suspense>
);}
