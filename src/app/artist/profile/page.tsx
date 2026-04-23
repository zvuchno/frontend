"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";

import {
  getCurrentArtist,
  type CurrentArtistResponse,
  updateCurrentArtist,
  updateCurrentArtistCover,
} from "@/api/artist";
import { useUserStore } from "@/entities/user/store/useUserStore";
import type { UserDataProps } from "@/entities/user/store/useUserStore";
import NavBar from "@/features/profile/ui/NavBar/NavBar";
import type { LinkItem } from "@/shared/ui/Link/Link.types";
import { DefaultHeaderActions } from "@/shared/constants/headerActions";
import { Title } from "@/shared/ui/Typography/Typography";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import { HeaderUI } from "@/widgets/layout/ui/header";
import {
  ArtistDataSection,
  type TArtistDataItem,
} from "@/widgets/profile/ui/ArtistDataSection";

import styles from "./page.module.scss";
import ArtistProfileFormSection from "./ArtistProfileFormSection";
import {
  isArtistPersonalDataComplete,
  mapArtistToArtistDataSectionProps,
  removeArtistDataItem,
} from "./utils";

const ARTIST_PROFILE_NAV_LINKS: LinkItem[] = [
  {
    id: "profile",
    href: "/artist/profile",
    label: "Профиль",
  },
  {
    id: "artist-data",
    href: "/artist/profile#artist-data",
    label: "Данные",
  },
  {
    id: "storefront",
    href: "/artist/profile#storefront",
    label: "Витрина",
  },
  {
    id: "orders",
    href: "/artist/profile#orders",
    label: "Заказы",
  },
  {
    id: "finance",
    href: "/artist/profile#finance",
    label: "Финансы",
  },
  {
    id: "settings",
    href: "/artist/profile#settings",
    label: "Настройки",
  },
];

export default function ArtistProfilePage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const accessToken = user?.accessToken;
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const [artist, setArtist] = useState<CurrentArtistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setArtist(null);
      setError(null);
      setIsLoading(false);
      setUpdateError(null);
      setCoverUploadError(null);
      setIsAddingContact(false);
      setIsAddingSocial(false);
      setIsUploadingCover(false);
      setDeletingContactKey(null);
      setDeletingSocialKey(null);
      return;
    }

    let isMounted = true;

    const loadCurrentArtist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setUpdateError(null);
        setCoverUploadError(null);

        const response = await getCurrentArtist(accessToken);

        if (!isMounted) {
          return;
        }

        setArtist(response);
        setError(null);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setArtist(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Не удалось загрузить данные артиста",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCurrentArtist();

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  const isPersonalDataComplete = isArtistPersonalDataComplete(artist);
  const shouldShowPublishHint =
    !isLoading && artist !== null && !isPersonalDataComplete;
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

    if (!file || !accessToken) {
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

      setArtist((prevArtist) =>
        prevArtist
          ? {
              ...prevArtist,
              cover: response.cover,
            }
          : prevArtist,
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
        {
          name: artist.name,
          description: artist.description ?? "",
          city: artist.city ?? "",
          url: artist.url ?? "",
          contacts: nextContacts ?? artist.contacts,
          socials: nextSocials ?? artist.socials,
        },
        accessToken,
      );

      setArtist(response);
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

    const itemKey =
      item.id !== undefined ? String(item.id) : `${item.label}::${item.value}`;

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

    const itemKey =
      item.id !== undefined ? String(item.id) : `${item.label}::${item.value}`;

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
    <div className={styles.page}>
      <AccentContainer className={styles.container}>
        <HeaderUI actions={DefaultHeaderActions} />

        <div className={styles.containerBody}>
          <Title Tag="h2" className={styles.title}>
            Личный кабинет
          </Title>

          <section className={styles.layout}>
            <aside className={styles.sidebar}>
              <NavBar links={ARTIST_PROFILE_NAV_LINKS} />
            </aside>

            <div className={styles.content}>
              <ArtistProfileFormSection
                artist={artist}
                user={user}
                accessToken={accessToken}
                showPublishHint={shouldShowPublishHint}
                onArtistChange={setArtist}
                onUserChange={(nextUser: UserDataProps) => setUser(nextUser)}
              />
            </div>
          </section>
        </div>
      </AccentContainer>

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
    </div>
  );
}
