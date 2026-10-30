"use client";

import { useFormContext } from "react-hook-form";
import { AddImageBlock } from "../components/addImageBlock/AddImageBlock";
import { MerchFormFields } from "../components/merchFormFields/MerchFormFields";
import type { TMerchUploadFormProps, UploadMerchFormValues } from "../model/types";
import { useShowcaseArtistSlug } from "@/entities/Artist/store/useShowcaseStore";
import { useGetManagedProfiles } from "@/entities/Label";
import { useMemo } from "react";
import { useAlbumsInfiniteQuery, useMerchKindsList } from "@/entities/Artist";
import { Loader } from "@/shared/ui";
import type { Option, SelectOptionItem } from "@/shared/ui/Select/Select.types";
import s from "./MerchUploadForm.module.scss";

export const MerchUploadForm = ({
  profileType,
  isEditForm,
  onDeleteImage,
  mainPreview,
  additionalPreviews
}: TMerchUploadFormProps) => {

  const {
    setValue,
    watch,
  } = useFormContext<UploadMerchFormValues>();
  
  const currentArtistSlug = useShowcaseArtistSlug();

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

  const selectedArtist = watch("artistId");

  // Список альбомов (для селекта)
  const albumsQuery = useAlbumsInfiniteQuery({
    artistSlug:
      profileType === "label" ? (selectedArtist ? null : currentArtistSlug) : currentArtistSlug,
    artist_id: selectedArtist,
  });

  const albumOptions = useMemo(() => {
    if (!albumsQuery.data) return [];

    const baseOptions = albumsQuery.data.pages
      .flatMap((page) => page.results || [])
      .map((album) => ({
        value: String(album.id),
        label: album.name,
      }));

    return [...baseOptions, { value: "null", label: "—" }];
  }, [albumsQuery.data]);

  const isLoadingAlbums = albumsQuery.isFetching || albumsQuery.isPending;

  // Список типов мерча (для селекта)
  const merchKindsQuery = useMerchKindsList();

  const merchKindsOptions = useMemo(() => {
    if (!merchKindsQuery.data) return [];
    const merchItems: Option[] = [];
    const carrierItems: Option[] = [];

    merchKindsQuery.data.forEach((merch) => {
      const option = {
        value: String(merch.id),
        label: merch.name,
      };

      if (merch.is_carrier) {
        carrierItems.push(option);
      } else {
        merchItems.push(option);
      }
    });

    // Формируем массив с группами
    const result: SelectOptionItem[] = [];

    if (merchItems.length > 0) {
      result.push({
        label: "Мерч",
        options: merchItems,
      });
    }

    if (carrierItems.length > 0) {
      result.push({
        label: "Носители",
        options: carrierItems,
      });
    }

    return result;
  }, [merchKindsQuery.data]);

  const isLoadingMerchKinds = merchKindsQuery.isFetching || merchKindsQuery.isPending;

  if (!currentArtistSlug) {
    return <Loader />;
  }

  return (
    <div className={s.container}>
      <AddImageBlock
        severalImages={true}
        setValue={setValue}
        initialMainPreview={mainPreview}
        initialAdditionalPreviews={additionalPreviews}
        onDelete={onDeleteImage}
      />

      <MerchFormFields 
        artistsOptions={artistsOptions}
        isLoadingArtists={isLoadingArtists}
        albumOptions={albumOptions}
        isLoadingAlbums={isLoadingAlbums}
        merchKindsOptions={merchKindsOptions}
        isLoadingMerchKinds={isLoadingMerchKinds}
        isEditForm={isEditForm}
        profileType={profileType}
      />
    </div>
  )
};