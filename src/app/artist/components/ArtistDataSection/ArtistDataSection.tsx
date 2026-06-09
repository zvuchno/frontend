"use client";

import { type ChangeEvent, useRef, useState } from "react";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";
import { ButtonAddLink } from "@/features/ButtonAddLink";
import { ButtonUI } from "@/shared/ui";
import { ArtistDescription } from "@/widgets/ArtistDescription";
import { ModalAddContact } from "@/widgets/profile";
import type { TFieldValues } from "@/widgets/profile";
import {
  ArtistDataSectionProps,
  TArtistDataItem,
} from "./ArtistDataSection.types";
import s from "./ArtistDataSection.module.scss";

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
  onCoverChange,
  onEditCoverClick,
  onAddContactClick,
  onAddSocialClick,
  onDeleteContactClick,
  onDeleteSocialClick,
}: ArtistDataSectionProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleCoverButtonClick = () => {
    if (onCoverChange) {
      coverInputRef.current?.click();
      return;
    }

    onEditCoverClick?.();
  };

  const handleCoverInputChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    await onCoverChange?.(file);
  };

  return (
    <section className={s.section}>
      <div className={s.media}>
        <div className={s.coverFrame}>
          <CardArtist image={coverSrc} hasButton={false} />
        </div>

        <ButtonUI
          variant="secondary"
          size="standart"
          onClick={handleCoverButtonClick}
          disabled={isUploadingCover}
          className={s.mediaButton}
        >
          {isUploadingCover ? "Загрузка..." : "Изменить обложку"}
        </ButtonUI>

        {onCoverChange ? (
          <input
            ref={coverInputRef}
            className={s.fileInput}
            type="file"
            accept="image/*"
            onChange={handleCoverInputChange}
          />
        ) : null}
      </div>

      <div className={s.content}>
        <ArtistDescription
          variant="profile"
          description={description}
          emptyText="Описание пока не заполнено"
          title="Об исполнителе"
        />

        <div className={s.details}>
          <ButtonAddLink
            items={contacts}
            addButtonText="Добавить контакт"
            deletingItemKey={deletingContactKey}
            onAddClick={() => setIsContactModalOpen(true)}
            onDeleteClick={onDeleteContactClick}
          />

          <ButtonAddLink
            items={socials}
            addButtonText="Добавить соцсеть"
            deletingItemKey={deletingSocialKey}
            onAddClick={() => setIsSocialModalOpen(true)}
            onDeleteClick={onDeleteSocialClick}
          />
        </div>

        {errorMessage ? (
          <p className={s.error} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>

      <ModalAddContact
        variant="contact"
        isOpen={isContactModalOpen}
        isSubmitting={isAddingContact}
        onClose={() => setIsContactModalOpen(false)}
        onSubmit={handleContactSubmit}
      />

      <ModalAddContact
        variant="link"
        isOpen={isSocialModalOpen}
        isSubmitting={isAddingSocial}
        onClose={() => setIsSocialModalOpen(false)}
        onSubmit={handleSocialSubmit}
      />
    </section>
  );
};

export default ArtistDataSection;
