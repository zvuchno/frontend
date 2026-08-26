import { TProfileType } from "@/entities/user";
import { ArtistSignup } from "@/screens/auth";
import { Suspense } from "react";

export default async function ArtistSignupPage({ 
  searchParams 
}: {
  searchParams: Promise<{profileType: TProfileType}>
}) {
  const { profileType } = await searchParams;
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ArtistSignup profileType={profileType}/>
    </Suspense>
  )
}
