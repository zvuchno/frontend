"use client";

import { useCallback, useEffect, useLayoutEffect } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { useAccountActions } from "@/features/AccountActions/context/useAccountActions";
import { type FieldValues, ProfileFormArtistUI, ProfileFormUI } from "@/features/profile";
import { artistFormFields } from "@/features/profile/utils/constants";

import {
  type UpdateCurrentArtistPayload,
  useCurrentArtist,
  useUpdateArtist,
} from "@/entities/profile";

import { Loader } from "@/shared/ui";
import { setServerErrors } from "@/shared/utils/serverErrorsHandler";

//import { EMPTY_PROFILE_FORM_VALUES } from "../form.utils";
import styles from "./ArtistProfileContent.module.scss";
import { ArtistProfileData } from "./ArtistProfileData/ArtistProfileData";

export function ArtistProfileContent() {
  const path = usePathname();

  const { status } = useSession();

  const { data: artist, isLoading, error } = useCurrentArtist();
  const updateArtist = useUpdateArtist();
  const { mutateAsync: updateArtistProfile, status: updateStatus } = updateArtist;
  const isSaving = updateArtist.isPending;

  const isLoadingArtistProfile = status === "loading" || isLoading;

  const {
    reset,
    formState: { errors, isValid, isDirty },
    setError,
    handleSubmit: handleFormSubmit,
  } = useFormContext<FieldValues>();

  const role = artist?.profile_type;
  const currentAccaunt = path.includes("label") ? "labelAccaunt" : "artistAccaunt";
  const successMessage =
    role === "artist" || (role === "label" && currentAccaunt === "labelAccaunt")
      ? "Профиль артиста успешно обновлён"
      : "Профиль лейбла успешно обновлён";

  const handleSubmit = useCallback<SubmitHandler<FieldValues>>(
    async (formData) => {
      if (!artist) {
        return;
      }

      const payload: UpdateCurrentArtistPayload = {
        name: formData.name,
        description: formData.description,
        city: formData.city,
        slug: formData.slug,
      };

      // Отправляем только если есть изменения
      const hasChanges =
        artist.name !== payload.name ||
        artist.description !== payload.description ||
        artist.city !== payload.city ||
        artist.slug !== payload.slug;

      if (!hasChanges) {
        return;
      }

      try {
        await updateArtistProfile(payload);

        toast.success(successMessage);
      } catch (requestError) {
        if (requestError instanceof Error) {
          setServerErrors(artistFormFields, requestError, setError);
        }
        console.error(requestError);
        toast.error("Не удалось сохранить профиль артиста");
      }
    },
    [artist, setError, successMessage, updateArtistProfile]
  );

  const onSubmit = useCallback(() => {
    void handleFormSubmit(handleSubmit)();
  }, [handleFormSubmit, handleSubmit]);

  useEffect(() => {
    if (artist) {
      reset({
        name: artist.name,
        description: artist.description ?? "",
        city: artist.city ?? "",
        slug: artist.slug ?? "",
      });
    }
  }, [artist, reset]);

  // установка кнопки в шапку страницы профиля через контекст общего layout//
  const { setAccountActions } = useAccountActions();
  const hasFormErrors = Object.keys(errors).length > 0;

  useLayoutEffect(() => {
    setAccountActions({
      onClickPrimaryBtn: onSubmit,
      primaryButtonTitle: "Сохранить",
      primaryDisabled: !isDirty || !isValid || isSaving || hasFormErrors,
      isLoading: updateStatus === "pending",
    });
    return () => setAccountActions(null);
  }, [isValid, isDirty, setAccountActions, onSubmit, isSaving, hasFormErrors, updateStatus]);
  //-------------------------------------------------------------------//

  if (isLoadingArtistProfile) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <ProfileFormUI
          className={styles.profileForm}
          errorMessage={updateArtist.error?.message}
          onSubmit={handleSubmit}
        >
          <ProfileFormArtistUI personalDataHref='/artist/data' has_usable_password={false} />
        </ProfileFormUI>

        <ArtistProfileData />
      </div>
    </div>
  );
}
