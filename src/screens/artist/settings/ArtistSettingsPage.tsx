"use client";

import { useSession } from "next-auth/react";

import { useGetArtistPickupPoints, useGetArtistStoreSettings } from "@/entities/Artist";
import { useGetArtistPvzOffice } from "@/entities/Artist";

import { Loader } from "@/shared/ui";

import { ArtistSettingsForm } from "./ui/ArtistSettingsForm";

export const ArtistSettingsPage = () => {
  const { data: session, status: sessionStatus } = useSession();

  const { data: cdek, status: cdekStatus } = useGetArtistPvzOffice();
  const { data: settings, status: contactsStatus } = useGetArtistStoreSettings();
  const { data: pickupPoints, status: pickupPointsStatus } = useGetArtistPickupPoints();

  if (
    sessionStatus === "loading" ||
    pickupPointsStatus === "pending" ||
    cdekStatus === "pending" ||
    contactsStatus === "pending"
  )
    return <Loader />;

  return (
    <ArtistSettingsForm
      initialCdek={cdek}
      initialPickup={pickupPoints}
      initialEmail={session?.user.email}
      initialSettings={settings}
    />
  );
};
