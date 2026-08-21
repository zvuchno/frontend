"use client";

import { useSession } from "next-auth/react";

import { useGetArtistPickupPoints, useGetArtistSupportContacts } from "@/entities/Artist";
import { useGetArtistPvzOffice } from "@/entities/Artist";

import { Loader } from "@/shared/ui";

import { ArtistSettingsForm } from "./ui/ArtistSettingsForm";

export const ArtistSettingsPage = () => {
  const { data: session, status: sessionStatus } = useSession();

  const { data: cdek, status: cdekStatus } = useGetArtistPvzOffice();
  const { data: contacts, status: contactsStatus } = useGetArtistSupportContacts();
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
      initialContacts={contacts}
      initialEmail={session?.user.email}
    />
  );
};
