"use client";

import { useSession } from "next-auth/react";

import styles from "./ArtistProfileContent.module.scss";
import { 
  type UpdateCurrentArtistPayload, 
  useCurrentArtist, 
  useUpdateArtist 
} from "@/entities/profile";
import { Loader } from "@/shared/ui";
import { useEffect, useState } from "react";
import { type FieldValues, ProfileFormArtistUI, ProfileFormUI } from "@/features/profile";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { EMPTY_PROFILE_FORM_VALUES } from "../form.utils";
import toast from "react-hot-toast";

export function ArtistProfileContent() {
  const { status } = useSession();

  const { data: artist, isLoading, error } = useCurrentArtist();
  const updateArtist = useUpdateArtist();

  const isLoadingArtistProfile = status === 'loading' || isLoading;
  const [isEditMode, setIsEditMode] = useState(false);

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: EMPTY_PROFILE_FORM_VALUES,
  });

  const isFormValid = methods.formState.isValid;

  const handleEdit = () => {
    void methods.trigger();
    setIsEditMode(true);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!artist) {
      return;
    }

    const payload: UpdateCurrentArtistPayload = {
      name: formData.name,
      description: formData.description,
      city: formData.city,
      slug: formData.url,
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
      toast.success('Профиль артиста успешно обновлён');
    } catch (requestError) {
      console.error(requestError);
      toast.error('Не удалось сохранить профиль артиста');
    }
  };

  useEffect(() => {
    if (artist) {
      methods.reset({
        name: artist.name,
        description: artist.description ?? '',
        city: artist.city ?? '',
        url: artist.slug ?? '',
      });
    }
  }, [artist, methods]);

  if (isLoadingArtistProfile) {
    return <Loader />
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <FormProvider {...methods}>
          <ProfileFormUI
            className={styles.profileForm}
            title='Профиль'
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
        </FormProvider>
      </div>
    </div>
  );
}
