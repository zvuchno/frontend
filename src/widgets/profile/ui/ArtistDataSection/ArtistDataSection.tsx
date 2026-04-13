"use client";

import { useState } from "react";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";
import { ButtonUI } from "@/shared/ui/button";
import ArtistDescription from "@/widgets/artist/ui/ArtistDescription/ArtistDescription";
import ModalAddContact from "../ModalAddContact/ModalAddContact";
import {
  ArtistDataSectionProps,
  TArtistDataItem,
} from "./ArtistDataSection.types";
import s from "./ArtistDataSection.module.scss";
import { DeleteIcon } from "@/shared/ui/icons/deleteIcon";
import { PlusIcon } from "@/shared/ui/icons/plusIcon";

type TArtistDataFormValues = {
  name?: string;
  email?: string;
  url?: string;
};

const ArtistDataSection = ({
  coverSrc,
  description,
  contacts,
  socials,
  onEditCoverClick,
  onAddContactClick,
  onAddSocialClick,
  onDeleteContactClick,
  onDeleteSocialClick,
}: ArtistDataSectionProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  const toContactItem = (data: TArtistDataFormValues): TArtistDataItem => ({
    label: data.name?.trim() || "Контакт",
    value: data.email?.trim() || "",
  });

  const toSocialItem = (data: TArtistDataFormValues): TArtistDataItem => ({
    label: data.name?.trim() || "Соцсеть",
    value: data.url?.trim() || "",
  });

  const handleContactSubmit = (data: TArtistDataFormValues) => {
    onAddContactClick?.(toContactItem(data));
    setIsContactModalOpen(false);
  };

  const handleSocialSubmit = (data: TArtistDataFormValues) => {
    onAddSocialClick?.(toSocialItem(data));
    setIsSocialModalOpen(false);
  };

  const renderItem = (item: TArtistDataItem, type: "contact" | "social") => {
    const handleDelete =
      type === "contact" ? onDeleteContactClick : onDeleteSocialClick;

    return (
      <div key={item.id ?? `${item.label}-${item.value}`} className={s.item}>
        <div className={s.itemMain}>
          <span className={s.itemLabel}>{item.label}</span>

          <div className={s.itemField}>
            <span className={s.itemValue}>{item.value}</span>
          </div>
        </div>

        <button
          type="button"
          className={s.deleteButton}
          onClick={() => handleDelete?.(item)}
          aria-label={`Удалить ${item.label}`}
        >
          <DeleteIcon />
        </button>
      </div>
    );
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
          className={s.mediaButton}
        >
          Изменить обложку
        </ButtonUI>
      </div>

      <div className={s.content}>
        <ArtistDescription
          variant="profile"
          description={description}
          title="Об исполнителе"
        />

        <div className={s.details}>
          <div className={s.listSection}>
            {contacts.length > 0 && (
              <div className={s.listItems}>
                {contacts.map((contact) => renderItem(contact, "contact"))}
              </div>
            )}

            <button
              type="button"
              className={s.actionButton}
              onClick={() => setIsContactModalOpen(true)}
            >
              <PlusIcon />
              Добавить контакт
            </button>
          </div>

          <div className={s.listSection}>
            {socials.length > 0 && (
              <div className={s.listItems}>
                {socials.map((social) => renderItem(social, "social"))}
              </div>
            )}

            <button
              type="button"
              className={s.actionButton}
              onClick={() => setIsSocialModalOpen(true)}
            >
              <PlusIcon />
              Добавить соцсеть
            </button>
          </div>
        </div>
      </div>

      <ModalAddContact
        variant="contact"
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSubmit={handleContactSubmit}
      />

      <ModalAddContact
        variant="link"
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        onSubmit={handleSocialSubmit}
      />
    </section>
  );
};

export default ArtistDataSection;
