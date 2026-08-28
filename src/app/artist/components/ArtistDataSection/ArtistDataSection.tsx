"use client";

import { useState } from "react";

import { ArtistDescription } from "@/widgets/ArtistDescription";
import { ModalAddContact } from "@/widgets/profile";
import type { TFieldValues } from "@/widgets/profile";

import { ButtonAddLink } from "@/features/ButtonAddLink";

import { ArtistDataSectionMedia } from "../ArtistDataSectionMedia/ArtistDataSectionMedia";
import s from "./ArtistDataSection.module.scss";
import { type ArtistDataSectionProps, type TArtistDataItem } from "./ArtistDataSection.types";

const ArtistDataSection = ({
  coverSrc,
  description,
  contacts,
  socials,
  isAddingContact = false,
  isAddingSocial = false,
  isUploadingCover = false,
  deletingContactKey = null,
  deletingSocialKey = null,
  errorMessage = null,
  className,
  isEdit,
  onEditDescription,
  descriptionChanged,
  onCoverChange,
  onEditCoverClick,
  onAddContactClick,
  onAddSocialClick,
  onDeleteContactClick,
  onDeleteSocialClick,
}: ArtistDataSectionProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  const toContactItem = (data: TFieldValues): TArtistDataItem => ({
    label: data.name?.trim() || "Контакт",
    value: data.email?.trim() || "",
  });

  const toSocialItem = (data: TFieldValues): TArtistDataItem => ({
    label: data.name?.trim() || "Соцсеть",
    value: data.url?.trim() || "",
  });

  const handleContactSubmit = async (data: TFieldValues) => {
    await onAddContactClick?.(toContactItem(data));
    setIsContactModalOpen(false);
  };

  const handleSocialSubmit = async (data: TFieldValues) => {
    await onAddSocialClick?.(toSocialItem(data));
    setIsSocialModalOpen(false);
  };

  return (
    <section className={s.section}>
      <ArtistDataSectionMedia
        className={className}
        src={coverSrc}
        disabled={isUploadingCover}
        onChange={onCoverChange}
        onEdit={onEditCoverClick}
      />

      <div className={s.description}>
        <ArtistDescription
          variant='profile'
          description={description}
          emptyText='Описание пока не заполнено'
          title='Об исполнителе'
          isEdit={isEdit}
          hasChanges={(value) => descriptionChanged?.(value)}
          onEditMode={() => onEditDescription?.(true)}
        />
      </div>

      <div className={s.details}>
        <ButtonAddLink
          items={contacts}
          addButtonText='Добавить контакт'
          deletingItemKey={deletingContactKey}
          onAddClick={() => setIsContactModalOpen(true)}
          onDeleteClick={onDeleteContactClick}
          className={s.detailsComponent}
        />

        <ButtonAddLink
          items={socials}
          addButtonText='Добавить соцсеть'
          deletingItemKey={deletingSocialKey}
          onAddClick={() => setIsSocialModalOpen(true)}
          onDeleteClick={onDeleteSocialClick}
          className={s.detailsComponent}
        />
      </div>

      {errorMessage ? (
        <p className={s.error} role='alert'>
          {errorMessage}
        </p>
      ) : null}

      <ModalAddContact
        variant='contact'
        isOpen={isContactModalOpen}
        isSubmitting={isAddingContact}
        onClose={() => setIsContactModalOpen(false)}
        onSubmit={handleContactSubmit}
      />

      <ModalAddContact
        variant='link'
        isOpen={isSocialModalOpen}
        isSubmitting={isAddingSocial}
        onClose={() => setIsSocialModalOpen(false)}
        onSubmit={handleSocialSubmit}
      />
    </section>
  );
};

export default ArtistDataSection;
