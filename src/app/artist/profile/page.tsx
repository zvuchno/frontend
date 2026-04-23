"use client";

import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import {
  getCurrentArtist,
  type CurrentArtistResponse,
  updateCurrentArtist,
  updateCurrentArtistCover,
} from "@/api/artist";
import { updateAccountPhone } from "@/api/account";
import { useUserStore } from "@/entities/user/store/useUserStore";
import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { ProfileFormArtistUI } from "@/features/profile/ui/profileForm/profileFormArtist";
import type { FieldValues } from "@/features/profile/ui/profileForm/types";
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

const EMPTY_PROFILE_FORM_VALUES: FieldValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  city: "",
  url: "",
};

const getArtistProfileFormValues = ({
  name,
  email,
  phone,
  city,
  url,
}: {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  url?: string | null;
}): FieldValues => ({
  name: name ?? "",
  email: email ?? "",
  phone: phone?.replace(/\D/g, "") ?? "",
  password: "",
  city: city ?? "",
  url: url ?? "",
});

export default function ArtistProfilePage() {
  const { update: updateSession } = useSession();
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
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileFormError, setProfileFormError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: EMPTY_PROFILE_FORM_VALUES,
  });

  const isFormValid = methods.formState.isValid;
  const isFormDirty = methods.formState.isDirty;
  const artistName = artist?.name ?? "";
  const artistCity = artist?.city ?? "";
  const artistUrl = artist?.url ?? "";
  const userEmail = user?.email ?? "";
  const userPhone = user?.phone ?? "";

  const handleEdit = () => {
    void methods.trigger();
    setProfileFormError(null);
    setIsEditMode(true);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!artist || !accessToken || !user) {
      setProfileFormError("Не удалось подготовить данные профиля к сохранению");
      return;
    }

    const nextName = formData.name ?? "";
    const nextCity = formData.city ?? "";
    const nextUrl = formData.url ?? "";
    const nextPhone = (formData.phone ?? "").replace(/\D/g, "");
    const currentPhone = (user.phone ?? "").replace(/\D/g, "");
    const hasArtistProfileChanges =
      nextName !== (artist.name ?? "") ||
      nextCity !== (artist.city ?? "") ||
      nextUrl !== (artist.url ?? "");
    const hasPhoneChange = nextPhone !== currentPhone;

    try {
      setIsSavingProfile(true);
      setProfileFormError(null);

      let nextArtist = artist;
      let nextUser = user;

      if (hasArtistProfileChanges) {
        nextArtist = await updateCurrentArtist(
          {
            name: nextName,
            description: artist.description ?? "",
            city: nextCity,
            url: nextUrl,
            contacts: artist.contacts,
            socials: artist.socials,
          },
          accessToken,
        );

        setArtist(nextArtist);
      }

      if (hasPhoneChange) {
        const phoneResponse = await updateAccountPhone(
          {
            phone: nextPhone,
          },
          accessToken,
        );

        nextUser = {
          ...user,
          phone: phoneResponse.phone,
          isPhoneVerified: false,
        };
        await updateSession({
          phone: nextUser.phone,
          isPhoneVerified: nextUser.isPhoneVerified,
        });
        setUser(nextUser);
      }

      methods.reset(
        getArtistProfileFormValues({
          name: nextArtist.name,
          email: nextUser.email,
          phone: nextUser.phone,
          city: nextArtist.city,
          url: nextArtist.url,
        }),
      );
      setProfileFormError(null);
      setIsEditMode(false);
    } catch (requestError) {
      setProfileFormError(
        requestError instanceof Error
          ? requestError.message
          : "Не удалось сохранить изменения профиля",
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      setArtist(null);
      setError(null);
      setIsLoading(false);
      setUpdateError(null);
      setCoverUploadError(null);
      setProfileFormError(null);
      setIsAddingContact(false);
      setIsAddingSocial(false);
      setIsUploadingCover(false);
      setIsSavingProfile(false);
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

  useEffect(() => {
    if (!accessToken) {
      methods.reset(EMPTY_PROFILE_FORM_VALUES);
      setIsEditMode(false);
      return;
    }

    if (isEditMode || isFormDirty) {
      return;
    }

    methods.reset(
      getArtistProfileFormValues({
        name: artistName,
        email: userEmail,
        phone: userPhone,
        city: artistCity,
        url: artistUrl,
      }),
    );
  }, [
    accessToken,
    artistCity,
    artistName,
    artistUrl,
    isEditMode,
    isFormDirty,
    methods,
    userEmail,
    userPhone,
  ]);

  const isPersonalDataComplete = isArtistPersonalDataComplete(artist);
  const shouldShowPublishHint =
    !isLoading && artist !== null && !isPersonalDataComplete;
  const profileFormArtistProps = shouldShowPublishHint
    ? {
        fieldsDisabled: !isEditMode,
        disabledFields: ["email", "password"] as const,
        personalDataHref: "#artist-data" as const,
      }
    : {
        fieldsDisabled: !isEditMode,
        disabledFields: ["email", "password"] as const,
        showPublishHint: false as const,
      };
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
              <FormProvider {...methods}>
                <ProfileFormUI
                  title="Профиль"
                  isChecked={isEditMode && isFormValid}
                  isOnChange={isEditMode}
                  isSubmitting={isSavingProfile}
                  errorMessage={profileFormError}
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
