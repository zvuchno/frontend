"use client";

import { 
  type TShowcaseAlbumDetail, 
  useChangeTracksOrder, 
  useCreateAlbum, 
  useDeleteTrack,
  useUpdateAlbum,
} from "@/entities/Artist"

import { 
  createReleaseProductPayload, 
  mapApiToForm, 
  mapReleaseDirtyFieldsToPayload, 
  ReleaseUploadForm, 
  UploadReleaseFormValues,
} from "@/features/showcaseUpload";

import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { UploadTrackModal } from "../uploadTrackModal/UploadTrackModal";
import { useRouter } from "next/navigation";
import { TracksSection } from "../tracksSection/TracksSection";
import s from "./UploadRelease.module.scss";
import { ButtonUI } from "@/shared/ui";

type TUploadReleaseContentProps = {
  currentArtistId: number | null;
  product?: TShowcaseAlbumDetail;
  profileType?: "artist" | "label",
};

const initialFormValues: UploadReleaseFormValues = {
  name: "",
  releaseDate: "",
  releaseType: "single",
  upc: null,
  genre: "",
  price: null,
  privacy: "public",
  allowHigherPrice: false,
  mainImage: null,
  tracksOrder: null,
};

export const UploadReleaseContent = ({ currentArtistId, product, profileType }: TUploadReleaseContentProps) => {

  const router = useRouter();
  // id созданного как черновик релиза перед загрузкой трека
  const [newAlbumId, setNewAlbumId] = useState<number | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);
  const [trackId, setTrackId] = useState<number | undefined>(undefined);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  const createAlbumMutation = useCreateAlbum();
  const updateAlbumMutation = useUpdateAlbum();

  const currentProductId = product?.id;
  const isEditForm = !!currentProductId;
  const releaseIdForTracks = currentProductId ?? newAlbumId;

  const initialValues = useMemo(() => {
    if (!product) {
      return initialFormValues;
    }
    return mapApiToForm(product);
  }, [product]);

  const methods = useForm<UploadReleaseFormValues>({
    mode: "onChange",
    defaultValues: initialValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, dirtyFields, isDirty },
  } = methods;

  const releaseType = watch("releaseType");

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const deleteTrackMutation = useDeleteTrack(currentProductId);
  const changeTracksOrder = useChangeTracksOrder(releaseIdForTracks);

  const handleUploadTrack = () => {
    handleSubmit((d) => onSubmit(d, "uploadTrack"))();
  };

  const handleDeleteTrack = async (id: number) => {
    await deleteTrackMutation.mutateAsync({ id });
  };

  const handleEditTrack = (id: number) => {
    setIsTrackModalOpen(true);
    setTrackId(id);
  };

  const handleChangeTracksOrder = (ids: number[]) => {
    setValue("tracksOrder", ids);
  };

  const mainImagePreview = useMemo(() => {
    if (!product) {
      return null;
    }

    const coverUrl = product.cover_image;
    const releaseImageId = product.id;
    if (!coverUrl) return null;

    return {
      image: coverUrl,
      is_main: true,
      id: releaseImageId,
    };
  }, [product]);

  const selectedArtist = watch("artistId");

  const onSubmit = async (
    data: UploadReleaseFormValues,
    action: "uploadTrack" | "publish" | "draft" | "save" | "cancel"
  ) => {
    if (isSubmitting) return;

    const artist = profileType === "label" && selectedArtist ? Number(selectedArtist) : currentArtistId

    const payload = createReleaseProductPayload(
      data, 
      profileType, 
      artist, 
      action, 
    );

    const hasNewMainImage =
      deletedImageIds.length > 0 || (!initialValues.mainImage && data.mainImage);

    const currentTracksOrder = data.tracksOrder;

    try {
      switch (action) {
        case "uploadTrack":
          if (isEditForm) {
            setIsTrackModalOpen(true);
          } else {
            if (newAlbumId) {
              setIsTrackModalOpen(true);
              break;
            }
            const albumResponse = await createAlbumMutation.mutateAsync(payload);
            if (albumResponse) {
              setNewAlbumId(albumResponse.id);
              setIsTrackModalOpen(true);
            }
          }
          break;
        case "publish":
        case "draft":
          if (currentTracksOrder && releaseIdForTracks) {
            await changeTracksOrder.mutateAsync({
              album: releaseIdForTracks,
              track_ids: currentTracksOrder
            });
          }
          if (newAlbumId) {
            await updateAlbumMutation.mutateAsync({ id: newAlbumId, payload });
          } else {
            await createAlbumMutation.mutateAsync(payload);
          }
          router.replace("/artist/showcase");
          break;
        case "save":
          if (currentTracksOrder && releaseIdForTracks) {
            await changeTracksOrder.mutateAsync({
              album: releaseIdForTracks,
              track_ids: currentTracksOrder
            });
          }

          if (!isDirty && !hasNewMainImage) {
            router.replace("/artist/showcase");
            break;
          }

          const newData = mapReleaseDirtyFieldsToPayload(dirtyFields, data);
          await updateAlbumMutation.mutateAsync({
            id: currentProductId!,
            payload: {
              ...newData,
              ...(hasNewMainImage && { cover_image: data.mainImage }),
            },
          });

          router.replace("/artist/showcase");
          break;
        case "cancel":
          router.replace("/artist/showcase");
          break;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={s.form}
          onSubmit={handleSubmit((data) => onSubmit(data, isEditForm ? "save" : "publish"))}
        >

          <ReleaseUploadForm 
            profileType={profileType}
            isEditForm={isEditForm}
            mainPreview={mainImagePreview}
            onDeleteImage={(imageId) => setDeletedImageIds(imageId)}
          />

          <TracksSection 
            releaseId={releaseIdForTracks}
            isSubmitting={isSubmitting}
            onUploadTrack={handleUploadTrack}
            onEditTrack={handleEditTrack}
            onChangeTracksOrder={handleChangeTracksOrder}
            onDeleteTrack={handleDeleteTrack}
            releaseType={product?.release_type}
          />

          <div className={s.buttonsContainer}>
            <ButtonUI
              variant="primary" 
              type="submit" 
              disabled={isSubmitting} 
              data-testid="upload-release-submit-button"
            >
              {isSubmitting ? "Загрузка..." : isEditForm ? "Сохранить" : "Опубликовать"}
            </ButtonUI>
            <ButtonUI
              variant='secondary'
              type='button'
              onClick={() => handleSubmit((d) => onSubmit(d, isEditForm ? "cancel" : "draft"))()}
              disabled={isSubmitting}
              data-testid="upload-release-cansel-button"
            >
              {isEditForm ? "Отмена" : "В черновик"}
            </ButtonUI>
          </div>

        </form>
      </FormProvider>

      {isTrackModalOpen && (
        <UploadTrackModal
          isOpen={isTrackModalOpen}
          albumId={newAlbumId ? newAlbumId : currentProductId!}
          releaseType={releaseType}
          onClose={() => {
            setIsTrackModalOpen(false);
            setTrackId(undefined);
          }}
          trackId={trackId}
        />
      )}
    </>
  )
}