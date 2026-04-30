"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import { updateAccountPhone } from "@/api/account";
import { type CurrentArtistResponse, updateCurrentArtist } from "@/api/artist";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { ProfileFormArtistUI } from "@/features/profile/ui/profileForm/profileFormArtist";
import type { FieldValues } from "@/features/profile/ui/profileForm/types";

import {
  buildArtistProfileUpdatePayload,
  EMPTY_PROFILE_FORM_VALUES,
  getArtistProfileFormValues,
  hasArtistProfileChanges,
  hasPhoneChange,
  normalizePhone,
} from "./form.utils";

type ArtistProfileFormSectionProps = {
  artist: CurrentArtistResponse | null;
  showPublishHint: boolean;
  onArtistChange: Dispatch<SetStateAction<CurrentArtistResponse | null>>;
};

export default function ArtistProfileFormSection({
  artist,
  showPublishHint,
  onArtistChange,
}: ArtistProfileFormSectionProps) {
  const { update: updateSession } = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileFormError, setProfileFormError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: EMPTY_PROFILE_FORM_VALUES,
  });

  const isFormValid = methods.formState.isValid;
  const isFormDirty = methods.formState.isDirty;

  const handleEdit = () => {
    void methods.trigger();
    setProfileFormError(null);
    setIsEditMode(true);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!artist || !user) {
      setProfileFormError("Не удалось подготовить данные профиля к сохранению");
      return;
    }

    const nextPhone = normalizePhone(formData.phone);
    const shouldUpdateArtist = hasArtistProfileChanges(artist, formData);
    const shouldUpdatePhone = hasPhoneChange(user, formData);

    try {
      setIsSavingProfile(true);
      setProfileFormError(null);

      let nextArtist = artist;
      let nextUser = user;

      if (shouldUpdateArtist) {
        nextArtist = await updateCurrentArtist(
          buildArtistProfileUpdatePayload(artist, formData),
        );

        onArtistChange(nextArtist);
      }

      if (shouldUpdatePhone) {
        const phoneResponse = await updateAccountPhone({
          phone: nextPhone,
        });

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
    if (!user) {
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
        name: artist?.name,
        email: user.email,
        phone: user.phone,
        city: artist?.city,
        url: artist?.url,
      }),
    );
  }, [
    artist?.city,
    artist?.name,
    artist?.url,
    isEditMode,
    isFormDirty,
    methods,
    user,
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
