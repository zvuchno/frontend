"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  getCurrentArtist,
  updateCurrentArtist,
  updateCurrentArtistCover,
  type ArtistApiDataItem,
  type CurrentArtistResponse,
  type UpdateCurrentArtistPayload,
} from "@/api/artist";
import { DefaultHeaderActions } from "@/shared/constants/headerActions";
import { artistsProfileRoutes } from "@/shared/constants/routes";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import { HeaderUI } from "@/widgets/layout/ui/header";
import { Title } from "@/shared/ui/Typography/Typography";
import NavBar from "@/features/profile/ui/NavBar/NavBar";
import {
  ArtistDataSection,
  type TArtistDataItem,
} from "./components/ArtistDataSection";
import s from "./layout.module.scss";

const artistProfilePathnames = ["/artist/profile"];

const getArtistDataItemKey = (item: TArtistDataItem) =>
  item.id !== undefined ? String(item.id) : `${item.label}::${item.value}`;

const toApiDataItem = (item: TArtistDataItem): ArtistApiDataItem => ({
  ...(typeof item.id === "number" ? { id: item.id } : {}),
  label: item.label,
  value: item.value,
});

const buildArtistUpdatePayload = (
  artist: CurrentArtistResponse,
  overrides: Partial<Pick<CurrentArtistResponse, "contacts" | "socials">>,
): UpdateCurrentArtistPayload => ({
  name: artist.name,
  description: artist.description ?? "",
  city: artist.city ?? "",
  url: artist.url ?? "",
  contacts: overrides.contacts ?? artist.contacts,
  socials: overrides.socials ?? artist.socials,
});

const getRequestErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { status } = useSession();
  const shouldShowArtistInfo = artistProfilePathnames.includes(pathname);
  const [artist, setArtist] = useState<CurrentArtistResponse | null>(null);
  const [artistDataError, setArtistDataError] = useState<string | null>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [deletingContactKey, setDeletingContactKey] = useState<string | null>(
    null,
  );
  const [deletingSocialKey, setDeletingSocialKey] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!shouldShowArtistInfo || status === "loading") {
      return;
    }

    let isMounted = true;

    const loadCurrentArtist = async () => {
      if (status === "unauthenticated") {
        setArtist(null);
        return;
      }

      try {
        const response = await getCurrentArtist();

        if (isMounted) {
          setArtist(response);
          setArtistDataError(null);
        }
      } catch {
        if (isMounted) {
          setArtist(null);
        }
      }
    };

    void loadCurrentArtist();

    return () => {
      isMounted = false;
    };
  }, [shouldShowArtistInfo, status]);

  const requireLoadedArtist = () => {
    if (artist) {
      return artist;
    }

    const error = new Error("Данные артиста еще не загружены");
    setArtistDataError(error.message);
    throw error;
  };

  const saveArtistData = async (
    overrides: Partial<Pick<CurrentArtistResponse, "contacts" | "socials">>,
  ) => {
    const currentArtist = requireLoadedArtist();
    const nextArtist = await updateCurrentArtist(
      buildArtistUpdatePayload(currentArtist, overrides),
    );

    setArtist(nextArtist);
    setArtistDataError(null);

    return nextArtist;
  };

  const handleCoverChange = async (file: File) => {
    try {
      requireLoadedArtist();
      setIsUploadingCover(true);
      setArtistDataError(null);

      const response = await updateCurrentArtistCover({ cover: file });
      setArtist((currentArtist) =>
        currentArtist
          ? {
              ...currentArtist,
              cover: response.cover,
            }
          : currentArtist,
      );
    } catch (error) {
      setArtistDataError(
        getRequestErrorMessage(error, "Не удалось загрузить обложку"),
      );
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleAddContact = async (item: TArtistDataItem) => {
    try {
      const currentArtist = requireLoadedArtist();
      setIsAddingContact(true);
      setArtistDataError(null);

      await saveArtistData({
        contacts: [...currentArtist.contacts, toApiDataItem(item)],
      });
    } catch (error) {
      setArtistDataError(
        getRequestErrorMessage(error, "Не удалось добавить контакт"),
      );
      throw error;
    } finally {
      setIsAddingContact(false);
    }
  };

  const handleAddSocial = async (item: TArtistDataItem) => {
    try {
      const currentArtist = requireLoadedArtist();
      setIsAddingSocial(true);
      setArtistDataError(null);

      await saveArtistData({
        socials: [...currentArtist.socials, toApiDataItem(item)],
      });
    } catch (error) {
      setArtistDataError(
        getRequestErrorMessage(error, "Не удалось добавить соцсеть"),
      );
      throw error;
    } finally {
      setIsAddingSocial(false);
    }
  };

  const handleDeleteContact = async (item: TArtistDataItem) => {
    const itemKey = getArtistDataItemKey(item);

    try {
      const currentArtist = requireLoadedArtist();
      setDeletingContactKey(itemKey);
      setArtistDataError(null);

      await saveArtistData({
        contacts: currentArtist.contacts.filter(
          (contact) => getArtistDataItemKey(contact) !== itemKey,
        ),
      });
    } catch (error) {
      setArtistDataError(
        getRequestErrorMessage(error, "Не удалось удалить контакт"),
      );
    } finally {
      setDeletingContactKey(null);
    }
  };

  const handleDeleteSocial = async (item: TArtistDataItem) => {
    const itemKey = getArtistDataItemKey(item);

    try {
      const currentArtist = requireLoadedArtist();
      setDeletingSocialKey(itemKey);
      setArtistDataError(null);

      await saveArtistData({
        socials: currentArtist.socials.filter(
          (social) => getArtistDataItemKey(social) !== itemKey,
        ),
      });
    } catch (error) {
      setArtistDataError(
        getRequestErrorMessage(error, "Не удалось удалить соцсеть"),
      );
    } finally {
      setDeletingSocialKey(null);
    }
  };

  return (
    <div className={s.page}>
      <AccentContainer className={s.container}>
        <HeaderUI actions={DefaultHeaderActions} />

        <div className={s.body}>
          <Title Tag="h2" className={s.title}>
            Личный кабинет
          </Title>
          <section className={s.section}>
            <NavBar links={artistsProfileRoutes} />
            <div className={s.section__content}>{children}</div>
          </section>
        </div>
      </AccentContainer>

      {shouldShowArtistInfo ? (
        <div className={s.profileInfo}>
          <ArtistDataSection
            coverSrc={artist?.cover ?? ""}
            description={artist?.description ?? ""}
            contacts={artist?.contacts ?? []}
            socials={artist?.socials ?? []}
            isAddingContact={isAddingContact}
            isAddingSocial={isAddingSocial}
            isUploadingCover={isUploadingCover}
            deletingContactKey={deletingContactKey}
            deletingSocialKey={deletingSocialKey}
            errorMessage={artistDataError}
            onCoverChange={handleCoverChange}
            onAddContactClick={handleAddContact}
            onAddSocialClick={handleAddSocial}
            onDeleteContactClick={handleDeleteContact}
            onDeleteSocialClick={handleDeleteSocial}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ArtistLayout;
