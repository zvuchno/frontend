import { useState } from "react";
import toast from "react-hot-toast";

import { ButtonUI, Loader } from "@/shared/ui";

import ArtistDataSection from "../ArtistDataSection/ArtistDataSection";
import { type TArtistDataItem } from "../ArtistDataSection/ArtistDataSection.types";
import s from "./ArtistDataSectionLayout.module.scss";
import { type TArtistDataSectionLayoutProps } from "./ArtistDataSectionLayout.types";
import {
  buildArtistUpdatePayload,
  getArtistDataItemKey,
  getArtistSectionData,
  handleAddContact,
  handleAddSocial,
} from "./ArtistDataSectionLayout.utils";

export const ArtistDataSectionLayout = ({
  isLoading,
  error,
  artist,
  withButton,
  onArtistUpdate,
  onCoverUpdate,
}: TArtistDataSectionLayoutProps) => {
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [deletingContactKey, setDeletingContactKey] = useState<string | null>(null);
  const [deletingSocialKey, setDeletingSocialKey] = useState<string | null>(null);

  const addSocial = (item: TArtistDataItem) =>
    handleAddSocial(item, onArtistUpdate, setIsAddingSocial, artist);

  const addContact = (item: TArtistDataItem) =>
    handleAddContact(item, onArtistUpdate, setIsAddingContact, artist);

  const handleDeleteContact = async (item: TArtistDataItem) => {
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

  const handleDeleteSocial = async (item: TArtistDataItem) => {
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

  const handleCoverChange = async (file: File) => {
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

  const artistSectionData = getArtistSectionData(artist);

  if (isLoading) return <Loader />;

  return (
    <div className={s.profileInfo}>
      <ArtistDataSection
        {...artistSectionData}
        isAddingContact={isAddingContact}
        isAddingSocial={isAddingSocial}
        isUploadingCover={isUploadingCover}
        deletingContactKey={deletingContactKey}
        deletingSocialKey={deletingSocialKey}
        errorMessage={error?.message}
        onCoverChange={handleCoverChange}
        onAddContactClick={addContact}
        onAddSocialClick={addSocial}
        onDeleteContactClick={(item) => void handleDeleteContact(item)}
        onDeleteSocialClick={(item) => void handleDeleteSocial(item)}
        className={s.profileInfoCoverFrame}
      />

      {withButton && (
        <ButtonUI variant='primary' className={s.profileInfoButton}>
          Сохранить
        </ButtonUI>
      )}
    </div>
  );
};
