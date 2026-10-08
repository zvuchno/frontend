"use client";

import { useGetArtistPickupPoints } from "@/entities/Artist";
import { useGetArtistPvzOffice } from "@/entities/Artist";

import { Loader } from "@/shared/ui";

import { ArtistSettingsForm } from "./ui/ArtistSettingsForm";

export const ArtistSettingsPage = () => {
  const {
    data: cdekSettings,
    isPending: isCdekPending,
    error: cdekError,
  } = useGetArtistPvzOffice();
  const {
    data: pickupSettings,
    isPending: isPickupPending,
    error: pickupError,
  } = useGetArtistPickupPoints();

  if (isCdekPending || isPickupPending) return <Loader />;
  if (cdekError) throw cdekError;
  if (pickupError) throw pickupError;
  if (!pickupSettings) throw new Error("Не удалось загрузить настройки самовывоза");

  return (
    <ArtistSettingsForm
      initialCdek={cdekSettings ?? { enabled: false, point: null }}
      initialPickup={pickupSettings}
    />
  );
};
