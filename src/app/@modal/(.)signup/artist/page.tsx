import { Suspense } from "react";

import { ArtistSignup } from "@/screens/auth";

import { type TProfileType } from "@/entities/user";

import { Loader } from "@/shared/ui";

export default async function ArtistSignupModalPage({
  searchParams,
}: {
  searchParams: Promise<{ profileType: TProfileType }>;
}) {
  const { profileType } = await searchParams;

  return (
    <Suspense fallback={<Loader />}>
      <ArtistSignup profileType={profileType} />
    </Suspense>
  );
}
