"use client";

import { useGetArtistPickupPoints } from "@/entities/Artist";
import { useGetArtistPvzOffice } from "@/entities/Artist";

import { Loader } from "@/shared/ui";

import { ArtistSettingsForm } from "./ui/ArtistSettingsForm";

export const ArtistSettingsPage = () => {
  const { data: cdekSettings, status: cdekStatus } = useGetArtistPvzOffice();
  const { data: pickupSettings, status: pickupPointsStatus } = useGetArtistPickupPoints();

  if (pickupPointsStatus === "pending" || cdekStatus === "pending") return <Loader />;

  return (
    <ArtistSettingsForm
      initialCdek={cdekSettings ?? undefined}
      initialPickup={pickupSettings ?? undefined}
    />
  );
};
