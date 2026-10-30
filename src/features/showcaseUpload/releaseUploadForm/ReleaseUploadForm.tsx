import { Text } from "@/shared/ui"
import { ChoiceGroup, type TChoiseItem } from "@/shared/ui/ChoiceGroup"
import { Controller, useFormContext } from "react-hook-form"
import { AddImageBlock } from "../components/addImageBlock/AddImageBlock";
import s from "./ReleaseUploadForm.module.scss";
import type { TReleaseUplodFormProps, UploadReleaseFormValues } from "../model/types";
import { useGetManagedProfiles } from "@/entities/Label";
import { useMemo } from "react";
import { ReleaseFormFields } from "../components/releaseFormFields/ReleaseFormFields";
import { useGenresList } from "@/entities/Artist";
import { MicrophoneIcon } from "@/shared/ui/Icons/microphoneIcon";
import { MusicIcon } from "@/shared/ui/Icons/musicIcon";
import { NoteIcon } from "@/shared/ui/Icons/noteIcon";

export const ReleaseUploadForm = ({
  profileType,
  isEditForm,
  onDeleteImage,
  mainPreview
}: TReleaseUplodFormProps) => {
  const {
    setValue,
    watch,
    control,
  } = useFormContext<UploadReleaseFormValues>();

  // Список артистов (для селекта)
  const managedProfilesQuery = useGetManagedProfiles(profileType);

  const artistsOptions = useMemo(() => {
    if (!managedProfilesQuery.data) return [];
    return managedProfilesQuery.data.map((artist) => ({
      value: String(artist.id),
      label: artist.name,
    }));
  }, [managedProfilesQuery.data]);

  const isLoadingArtists = managedProfilesQuery.isFetching || managedProfilesQuery.isPending;

  // Список жанров (для селекта)
  const genresQuery = useGenresList();

  const genresOptions = useMemo(() => {
    if (!genresQuery.data) return [];
    return genresQuery.data.map((genre) => ({
      value: String(genre.id),
      label: genre.name,
    }));
  }, [genresQuery.data]);

  const isLoadingGenres = genresQuery.isFetching || genresQuery.isPending;

  const releseTypeControlItems: TChoiseItem[] = [
    { label: "Сингл", value: "single", icon: MicrophoneIcon },
    { label: "EP", value: "ep", icon: MusicIcon },
    { label: "Альбом", value: "album", icon: NoteIcon },
  ];

  return (
    <div className={s.container}>

      <div className={s.releaseTypeContainer}>
        <Text className={s.releaseTypeContainer__label}>Тип релиза</Text>
        <Controller
          name="releaseType"
          control={control}
          render={({ field }) => (
            <ChoiceGroup 
              value={field.value ?? "single"}
              onChange={field.onChange}
              items={releseTypeControlItems}
              containerClassName={s.releaseTypeContainer__control}
              disabled={isEditForm}
            />
          )}
        />
      </div>

      <AddImageBlock
        severalImages={false}
        setValue={setValue}
        initialMainPreview={mainPreview}
        onDelete={onDeleteImage}
      />

      <ReleaseFormFields 
        artistsOptions={artistsOptions}
        isLoadingArtists={isLoadingArtists}
        genresOptions={genresOptions}
        isLoadingGenres={isLoadingGenres}
        isEditForm={isEditForm}
        profileType={profileType}
      />
       
    </div>
  )
};