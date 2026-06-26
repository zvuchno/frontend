import { ArtistSignup } from "@/screens/auth";
import { Suspense } from "react";

export default function ArtistSignupPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ArtistSignup />
    </Suspense>
  )
}
