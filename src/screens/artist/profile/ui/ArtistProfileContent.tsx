"use client";

import { useEffect } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { type FieldValues, ProfileFormArtistUI, ProfileFormUI } from "@/features/profile";
import { artistFormFields } from "@/features/profile/utils/constants";

import {
  type UpdateCurrentArtistPayload,
  useArtistProfileEditMode,
  useCurrentArtist,
  useUpdateArtist,
} from "@/entities/profile";

import { Loader } from "@/shared/ui";
import { setServerErrors } from "@/shared/utils/serverErrorsHandler";

//import { EMPTY_PROFILE_FORM_VALUES } from "../form.utils";
import styles from "./ArtistProfileContent.module.scss";

export function ArtistProfileContent() {
  const path = usePathname();

  const { status } = useSession();

  const { data: artist, isLoading, error } = useCurrentArtist();
  const updateArtist = useUpdateArtist();

  const isLoadingArtistProfile = status === "loading" || isLoading;
  const { isEditMode, setIsEditMode } = useArtistProfileEditMode();

  const { trigger, reset, formState, setError } = useFormContext<FieldValues>();
  /*const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: EMPTY_PROFILE_FORM_VALUES,
  });
*/
  const isFormValid = formState.isValid;

  const role = artist?.profile_type;
  const currentAccaunt = path.includes("label") ? "labelAccaunt" : "artistAccaunt";
  const successMessage =
    role === "artist" || (role === "label" && currentAccaunt === "labelAccaunt")
      ? "Профиль артиста успешно обновлён"
      : "Профиль лейбла успешно обновлён";

  const handleEdit = () => {
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isEditMode) {
      void trigger();
    }
  }, [isEditMode, trigger]);

  const handleSubmit: SubmitHandler<FieldValues> = async (formData) => {
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
      setIsEditMode(false);
      return;
    }

    try {
      await updateArtist.mutateAsync(payload);
      setIsEditMode(false);
      toast.success(successMessage);
    } catch (requestError) {
      if (requestError instanceof Error) {
        setServerErrors(artistFormFields, requestError, setError);
      }
      console.error(requestError);
      toast.error("Не удалось сохранить профиль артиста");
    }
  };

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
          isChecked={isEditMode && isFormValid}
          isOnChange={isEditMode}
          isSubmitting={updateArtist.isPending}
          errorMessage={updateArtist.error?.message}
          onSubmit={handleSubmit}
          onEdit={handleEdit}
        >
          <ProfileFormArtistUI
            fieldsDisabled={!isEditMode}
            personalDataHref='/artist/data'
            has_usable_password={false}
          />
        </ProfileFormUI>
      </div>
    </div>
  );
}
