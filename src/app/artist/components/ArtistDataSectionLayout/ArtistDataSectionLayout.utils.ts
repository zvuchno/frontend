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

export const handleDeleteContact = async (
  item: TArtistDataItem,
  setDeletingContactKey: Dispatch<SetStateAction<string | null>>,
  onArtistUpdate: (payload: UpdateCurrentArtistPayload) => Promise<void>,
  artist?: TEditableArtistProfile | null
) => {
  if (!artist) return;
  const key = getArtistDataItemKey(item);
  setDeletingContactKey(key);
  try {
    const payload = buildArtistUpdatePayload(artist, {
      contacts: artist.contacts.filter((c) => getArtistDataItemKey(c) !== key),
    });
    await onArtistUpdate(payload);
    toast.success("Контакт удалён");
  } catch (err) {
    console.error(err);
    toast.error("Не удалось удалить контакт");
  } finally {
    setDeletingContactKey(null);
  }
};

export const handleDeleteSocial = async (
  item: TArtistDataItem,
  setDeletingSocialKey: Dispatch<SetStateAction<string | null>>,
  onArtistUpdate: (payload: UpdateCurrentArtistPayload) => Promise<void>,
  artist?: TEditableArtistProfile | null
) => {
  if (!artist) return;
  const key = getArtistDataItemKey(item);
  setDeletingSocialKey(key);
  try {
    const payload = buildArtistUpdatePayload(artist, {
      socials: artist.socials.filter((s) => getArtistDataItemKey(s) !== key),
    });
    await onArtistUpdate(payload);
    toast.success("Соцсеть удалена");
  } catch (err) {
    console.error(err);
    toast.error("Не удалось удалить соцсеть");
  } finally {
    setDeletingSocialKey(null);
  }
};

export const handleCoverChange = async (
  file: File,
  setIsUploadingCover: Dispatch<SetStateAction<boolean>>,
  onCoverUpdate: (file: File) => Promise<void>
) => {
  setIsUploadingCover(true);
  try {
    await onCoverUpdate(file);
    toast.success("Обложка успешно обновлена");
  } catch (err) {
    console.error(err);
    toast.error("Не удалось обновить обложку");
  } finally {
    setIsUploadingCover(false);
  }
};

export const handleDescriptionChange = async (
  value: string,
  onArtistUpdate: (payload: UpdateCurrentArtistPayload) => Promise<void>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  artist?: TEditableArtistProfile | null
) => {
  try {
    await onArtistUpdate({ description: value });
    toast.success(`Данные артиста ${artist?.name} успешно изменены`);
    setIsEdit(false);
  } catch (error) {
    console.error(error);
    toast.error(`Не удалось обновить данные артиста ${artist?.name}`);
  }
};

export const getArtistSectionData = (artist?: TEditableArtistProfile | null) => ({
  coverSrc: artist?.cover ?? "",
  description: artist?.description ?? "",
  contacts: artist?.contacts ?? [],
  socials: artist?.socials ?? [],
});
