"use client";

import { useState } from "react";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";
import { ButtonAddLink } from "@/features/ButtonAddLink";
import { ButtonUI } from "@/shared/ui/button";
import ArtistDescription from "@/widgets/artist/ui/ArtistDescription/ArtistDescription";
import ModalAddContact from "@/widgets/profile/ui/ModalAddContact/ModalAddContact";
import type { TFieldValues } from "@/widgets/profile/ui/ModalAddContact/ModalAddContact.type";
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
      <div className={s.media}>
        <div className={s.coverFrame}>
          <CardArtist image={coverSrc} hasButton={false} />
        </div>

        <ButtonUI
          variant="secondary"
          size="standart"
          onClick={onEditCoverClick}
          disabled={isUploadingCover}
          className={s.mediaButton}
        >
          {isUploadingCover ? "Загрузка..." : "Изменить обложку"}
        </ButtonUI>
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
