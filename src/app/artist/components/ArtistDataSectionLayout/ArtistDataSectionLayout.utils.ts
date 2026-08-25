import { type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";

import { type ArtistApiDataItem, type UpdateCurrentArtistPayload } from "@/entities/profile";

import { type TArtistDataItem } from "../ArtistDataSection/ArtistDataSection.types";
import { type TEditableArtistProfile } from "./ArtistDataSectionLayout.types";

export const getArtistDataItemKey = (item: TArtistDataItem) =>
  item.id !== undefined ? String(item.id) : `${item.label}::${item.value}`;

const toApiDataItem = (item: TArtistDataItem): ArtistApiDataItem => ({
  ...(typeof item.id === "number" ? { id: item.id } : {}),
  label: item.label,
  value: item.value,
});
export const buildArtistUpdatePayload = (
  artist: TEditableArtistProfile,
  overrides: Partial<Pick<TEditableArtistProfile, "contacts" | "socials">>
): UpdateCurrentArtistPayload => ({
  name: artist.name,
  description: artist.description ?? "",
  city: artist.city ?? "",
  slug: artist.slug ?? "",
  contacts: overrides.contacts ?? artist.contacts,
  socials: overrides.socials ?? artist.socials,
});

export const handleAddSocial = async (
  item: TArtistDataItem,
  mutationFn: (payload: UpdateCurrentArtistPayload) => Promise<void>,
  statusFn: Dispatch<SetStateAction<boolean>>,
  artist?: TEditableArtistProfile | null
) => {
  if (!artist) return;
  try {
    statusFn(true);
    const payload = buildArtistUpdatePayload(artist, {
      socials: [...artist.socials, toApiDataItem(item)],
    });
    await mutationFn(payload);
    toast.success("Соцсеть успешно добавлена");
  } catch (err) {
    console.error(err);
    toast.error("Не удалось добавить соцсеть");
  } finally {
    statusFn(false);
  }
};

export const handleAddContact = async (
  item: TArtistDataItem,
  mutationFn: (payload: UpdateCurrentArtistPayload) => Promise<void>,
  statusFn: Dispatch<SetStateAction<boolean>>,
  artist?: TEditableArtistProfile | null
) => {
  if (!artist) return;
  try {
    statusFn(true);
    const payload = buildArtistUpdatePayload(artist, {
      contacts: [...artist.contacts, toApiDataItem(item)],
    });
    await mutationFn(payload);
    toast.success("Контакт успешно добавлен");
  } catch (err) {
    console.error(err);
    toast.error("Не удалось добавить контакт");
  } finally {
    statusFn(false);
  }
};

export const getArtistSectionData = (artist?: TEditableArtistProfile | null) => ({
  coverSrc: artist?.cover ?? "",
  description: artist?.description ?? "",
  contacts: artist?.contacts ?? [],
  socials: artist?.socials ?? [],
});
