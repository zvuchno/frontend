"use client";

import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  type CurrentArtistResponse,
  updateCurrentArtist,
  updateCurrentArtistCover,
} from "@/api/artist";
import {
  ArtistDataSection,
  type TArtistDataItem,
} from "@/widgets/profile/ui/ArtistDataSection";

import {
  buildArtistCoverState,
  buildArtistDataUpdatePayload,
  getArtistDataItemKey,
} from "./data.utils";
import {
  mapArtistToArtistDataSectionProps,
  removeArtistDataItem,
} from "./utils";
import styles from "./page.module.scss";

type ArtistProfileDataSectionProps = {
  artist: CurrentArtistResponse | null;
  accessToken?: string;
  isLoading: boolean;
  error: string | null;
  onArtistChange: Dispatch<SetStateAction<CurrentArtistResponse | null>>;
};

export default function ArtistProfileDataSection({
  artist,
  accessToken,
  isLoading,
  error,
  onArtistChange,
}: ArtistProfileDataSectionProps) {
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [deletingContactKey, setDeletingContactKey] = useState<string | null>(
    null,
  );
  const [deletingSocialKey, setDeletingSocialKey] = useState<string | null>(
    null,
  );
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setUpdateError(null);
      setCoverUploadError(null);
      setIsAddingContact(false);
      setIsAddingSocial(false);
      setIsUploadingCover(false);
      setDeletingContactKey(null);
      setDeletingSocialKey(null);
    }
  }, [accessToken]);

  const artistDataSectionProps = artist
    ? mapArtistToArtistDataSectionProps(artist)
    : null;
  const sectionError = coverUploadError ?? updateError ?? error;

  const handleEditCoverClick = () => {
    if (isUploadingCover) {
      return;
    }

    coverInputRef.current?.click();
  };

  const handleCoverChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];

    if (!file || !accessToken || !artist) {
      input.value = "";
      return;
    }

    try {
      setIsUploadingCover(true);
      setUpdateError(null);
      setCoverUploadError(null);

      const response = await updateCurrentArtistCover(
        { cover: file },
        accessToken,
      );

      onArtistChange((prevArtist) =>
        buildArtistCoverState(prevArtist, response.cover),
      );
    } catch (requestError) {
      setCoverUploadError(
        requestError instanceof Error
          ? requestError.message
          : "Не удалось обновить обложку артиста",
      );
    } finally {
      setIsUploadingCover(false);
      input.value = "";
    }
  };

  const handleArtistDataUpdate = async ({
    nextContacts = artist?.contacts,
    nextSocials = artist?.socials,
  }: {
    nextContacts?: TArtistDataItem[];
    nextSocials?: TArtistDataItem[];
  }): Promise<boolean> => {
    if (!artist || !accessToken) {
      return false;
    }

    try {
      setUpdateError(null);
      setCoverUploadError(null);

      const response = await updateCurrentArtist(
        buildArtistDataUpdatePayload(artist, {
          contacts: nextContacts,
          socials: nextSocials,
        }),
        accessToken,
      );

      onArtistChange(response);
      return true;
    } catch (requestError) {
      setUpdateError(
        requestError instanceof Error
          ? requestError.message
          : "Не удалось обновить данные артиста",
      );
      return false;
    }
  };

  const handleAddContact = async (item: TArtistDataItem) => {
    if (!artist) {
      return;
    }

    try {
      setIsAddingContact(true);

      const wasUpdated = await handleArtistDataUpdate({
        nextContacts: [...artist.contacts, item],
      });

      if (!wasUpdated) {
        throw new Error("Artist data update failed");
      }
    } finally {
      setIsAddingContact(false);
    }
  };

  const handleAddSocial = async (item: TArtistDataItem) => {
    if (!artist) {
      return;
    }

    try {
      setIsAddingSocial(true);

      const wasUpdated = await handleArtistDataUpdate({
        nextSocials: [...artist.socials, item],
      });

      if (!wasUpdated) {
        throw new Error("Artist data update failed");
      }
    } finally {
      setIsAddingSocial(false);
    }
  };

  const handleDeleteContact = (item: TArtistDataItem) => {
    if (!artist) {
      return;
    }

    const itemKey = getArtistDataItemKey(item);

    void (async () => {
      try {
        setDeletingContactKey(itemKey);

        await handleArtistDataUpdate({
          nextContacts: removeArtistDataItem(artist.contacts, item),
        });
      } finally {
        setDeletingContactKey((currentKey) =>
          currentKey === itemKey ? null : currentKey,
        );
      }
    })();
  };

  const handleDeleteSocial = (item: TArtistDataItem) => {
    if (!artist) {
      return;
    }

    const itemKey = getArtistDataItemKey(item);

    void (async () => {
      try {
        setDeletingSocialKey(itemKey);

        await handleArtistDataUpdate({
          nextSocials: removeArtistDataItem(artist.socials, item),
        });
      } finally {
        setDeletingSocialKey((currentKey) =>
          currentKey === itemKey ? null : currentKey,
        );
      }
    })();
  };

  return (
    <section id="artist-data" className={styles.dataSection}>
      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleCoverChange}
      />

      {isLoading && (
        <p className={styles.stateMessage}>Загрузка данных артиста...</p>
      )}

      {!isLoading && sectionError && (
        <p className={styles.stateMessage}>{sectionError}</p>
      )}

      {!isLoading && artistDataSectionProps && (
        <ArtistDataSection
          {...artistDataSectionProps}
          isAddingContact={isAddingContact}
          isAddingSocial={isAddingSocial}
          isUploadingCover={isUploadingCover}
          deletingContactKey={deletingContactKey}
          deletingSocialKey={deletingSocialKey}
          onEditCoverClick={handleEditCoverClick}
          onAddContactClick={handleAddContact}
          onAddSocialClick={handleAddSocial}
          onDeleteContactClick={handleDeleteContact}
          onDeleteSocialClick={handleDeleteSocial}
        />
      )}
    </section>
  );
}
