import { Suspense } from "react";

import { ArtistSignup } from "@/screens/auth";

import { type TProfileType } from "@/entities/user";

export default async function ArtistSignupPage({
  searchParams,
}: {
  searchParams: Promise<{ profileType: TProfileType }>;
}) {
  const { profileType } = await searchParams;
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ArtistSignup profileType={profileType} />
    </Suspense>
  );
}
