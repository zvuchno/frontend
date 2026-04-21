"use client";

import { useEffect, useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import {
  getCurrentArtist,
  type CurrentArtistResponse,
  updateCurrentArtist,
} from "@/api/artist";
import { useUserStore } from "@/entities/user/store/useUserStore";
import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { ProfileFormArtistUI } from "@/features/profile/ui/profileForm/profileFormArtist";
import { DefaultHeaderActions } from "@/shared/constants/headerActions";
import type { FieldValues } from "@/features/profile/ui/profileForm/types";
import type { LinkItem } from "@/shared/ui/Link/Link.types";
import { Title } from "@/shared/ui/Typography/Typography";
import {
  ArtistDataSection,
  type TArtistDataItem,
} from "@/widgets/profile/ui/ArtistDataSection";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import { HeaderUI } from "@/widgets/layout/ui/header";

import styles from "./page.module.scss";
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

const DEFAULT_FORM_VALUES: FieldValues = {
  name: "Summer Stage",
  email: "booking@gmail.com",
  phone: "79991234567",
  password: "password123",
  city: "Москва",
  url: "zvuchno.space",
};

export default function ArtistProfilePage() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const [artist, setArtist] = useState<CurrentArtistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const isFormValid = methods.formState.isValid;

  const handleEdit = () => {
    void methods.trigger();
    setIsEditMode(true);
  };

  const handleSubmit: SubmitHandler<FieldValues> = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    if (!accessToken) {
      setArtist(null);
      setError(null);
      setIsLoading(false);
      setUpdateError(null);
      setIsUpdatingData(false);
      return;
    }

    let isMounted = true;

    const loadCurrentArtist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setUpdateError(null);

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
  const profileFormArtistProps = shouldShowPublishHint
    ? {
        fieldsDisabled: !isEditMode,
        personalDataHref: "#artist-data" as const,
      }
    : {
        fieldsDisabled: !isEditMode,
        showPublishHint: false as const,
      };
  const artistDataSectionProps = artist
    ? mapArtistToArtistDataSectionProps(artist)
    : null;
  const sectionError = updateError ?? error;

  const handleArtistDataUpdate = async ({
    nextContacts = artist?.contacts,
    nextSocials = artist?.socials,
  }: {
    nextContacts?: TArtistDataItem[];
    nextSocials?: TArtistDataItem[];
  }) => {
    if (!artist || !accessToken) {
      return;
    }

    try {
      setIsUpdatingData(true);
      setUpdateError(null);

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
    } catch (requestError) {
      setUpdateError(
        requestError instanceof Error
          ? requestError.message
          : "Не удалось обновить данные артиста",
      );
    } finally {
      setIsUpdatingData(false);
    }
  };

  const handleAddContact = async (item: TArtistDataItem) => {
    if (!artist) {
      return;
    }

    await handleArtistDataUpdate({
      nextContacts: [...artist.contacts, item],
    });
  };

  const handleAddSocial = async (item: TArtistDataItem) => {
    if (!artist) {
      return;
    }

    await handleArtistDataUpdate({
      nextSocials: [...artist.socials, item],
    });
  };

  const handleDeleteContact = async (item: TArtistDataItem) => {
    if (!artist) {
      return;
    }

    await handleArtistDataUpdate({
      nextContacts: removeArtistDataItem(artist.contacts, item),
    });
  };

  const handleDeleteSocial = async (item: TArtistDataItem) => {
    if (!artist) {
      return;
    }

    await handleArtistDataUpdate({
      nextSocials: removeArtistDataItem(artist.socials, item),
    });
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
              <FormProvider {...methods}>
                <ProfileFormUI
                  title="Профиль"
                  isChecked={isEditMode && isFormValid}
                  isOnChange={isEditMode}
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                >
                  <ProfileFormArtistUI {...profileFormArtistProps} />
                </ProfileFormUI>
              </FormProvider>
            </div>
          </section>
        </div>
      </AccentContainer>

      <section id="artist-data" className={styles.dataSection}>
        {isLoading && (
          <p className={styles.stateMessage}>Загрузка данных артиста...</p>
        )}

        {!isLoading && sectionError && (
          <p className={styles.stateMessage}>{sectionError}</p>
        )}

        {!isLoading && !sectionError && isUpdatingData && (
          <p className={styles.stateMessage}>Обновление данных артиста...</p>
        )}

        {!isLoading && artistDataSectionProps && (
          <ArtistDataSection
            {...artistDataSectionProps}
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
