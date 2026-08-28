import { useState } from "react";

import { useArtistProfileEditMode } from "@/entities/profile";

import { ButtonUI, Loader } from "@/shared/ui";

import ArtistDataSection from "../ArtistDataSection/ArtistDataSection";
import { type TArtistDataItem } from "../ArtistDataSection/ArtistDataSection.types";
import s from "./ArtistDataSectionLayout.module.scss";
import { type TArtistDataSectionLayoutProps } from "./ArtistDataSectionLayout.types";
import {
  getArtistSectionData,
  handleAddContact,
  handleAddSocial,
  handleCoverChange,
  handleDeleteContact,
  handleDeleteSocial,
  handleDescriptionChange,
} from "./ArtistDataSectionLayout.utils";

export const ArtistDataSectionLayout = ({
  isLoading,
  error,
  artist,
  withButton,
  onArtistUpdate,
  onCoverUpdate,
}: TArtistDataSectionLayoutProps) => {
  const { isEditMode: isProfileEditMode } = useArtistProfileEditMode();
  const artistSectionData = getArtistSectionData(artist);

  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [deletingContactKey, setDeletingContactKey] = useState<string | null>(null);
  const [deletingSocialKey, setDeletingSocialKey] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [tempDescription, setTempDescription] = useState(artistSectionData.description);

  const addSocial = (item: TArtistDataItem) =>
    handleAddSocial(item, onArtistUpdate, setIsAddingSocial, artist);

  const addContact = (item: TArtistDataItem) =>
    handleAddContact(item, onArtistUpdate, setIsAddingContact, artist);

  const deleteContact = (item: TArtistDataItem) =>
    handleDeleteContact(item, setDeletingContactKey, onArtistUpdate, artist);

  const deleteSocial = (item: TArtistDataItem) =>
    handleDeleteSocial(item, setDeletingSocialKey, onArtistUpdate, artist);

  const changeCover = (file: File) => handleCoverChange(file, setIsUploadingCover, onCoverUpdate);

  const changeDescription = (value: string) =>
    handleDescriptionChange(value, onArtistUpdate, setIsEdit, artist);

  if (isLoading || !artist) return <Loader />;

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
        onCoverChange={changeCover}
        onAddContactClick={addContact}
        onAddSocialClick={addSocial}
        onDeleteContactClick={(item) => void deleteContact(item)}
        onDeleteSocialClick={(item) => void deleteSocial(item)}
        className={s.profileInfoCoverFrame}
        onEditDescription={setIsEdit}
        isEdit={Boolean(withButton || isProfileEditMode)}
        description={tempDescription}
        descriptionChanged={(value) => setTempDescription(value)}
      />

      {withButton && (
        <ButtonUI
          variant='primary'
          className={s.profileInfoButton}
          disabled={!isEdit}
          onClick={() => void changeDescription(tempDescription)}
        >
          Сохранить
        </ButtonUI>
      )}
    </div>
  );
};
