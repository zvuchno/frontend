"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import { updateAccountPhone } from "@/api/account";
import { type CurrentArtistResponse, updateCurrentArtist } from "@/api/artist";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { ProfileFormArtistUI } from "@/features/profile/ui/profileForm/profileFormArtist";
import type { FieldValues } from "@/features/profile/ui/profileForm/types";
import type { UserDataProps } from "@/entities/user/store/useUserStore";

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

type ArtistProfileFormSectionProps = {
  artist: CurrentArtistResponse | null;
  user: UserDataProps | null;
  accessToken?: string;
  showPublishHint: boolean;
  onArtistChange: (artist: CurrentArtistResponse) => void;
  onUserChange: (user: UserDataProps) => void;
};

export default function ArtistProfileFormSection({
  artist,
  user,
  accessToken,
  showPublishHint,
  onArtistChange,
  onUserChange,
}: ArtistProfileFormSectionProps) {
  const { update: updateSession } = useSession();
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

        onArtistChange(nextArtist);
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
        onUserChange(nextUser);
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
      methods.reset(EMPTY_PROFILE_FORM_VALUES);
      setProfileFormError(null);
      setIsSavingProfile(false);
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

  const profileFormArtistProps = showPublishHint
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

  return (
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
  );
}
