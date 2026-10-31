"use client";

import { 
  type TShowcaseAlbumDetail, 
  useChangeBonusesOrder, 
  useChangeTracksOrder, 
  useCreateAlbum, 
  useDeleteBonus, 
  useDeleteTrack,
  useUpdateAlbum,
} from "@/entities/Artist"

import { 
  createReleaseProductPayload, 
  mapApiToForm, 
  mapReleaseDirtyFieldsToPayload, 
  ReleaseUploadForm, 
  type UploadReleaseFormValues,
} from "@/features/showcaseUpload";

import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TracksSection } from "../tracksSection/TracksSection";
import s from "./UploadRelease.module.scss";
import { ButtonUI } from "@/shared/ui";
import { UploadTrackModal } from "@/features/uploadTrackModal";
import { AddBonuseModal } from "@/features/addBonusModal/ui/AddBonusModal";
import { BonusesSection } from "../bonusesSection/BonusesSection";

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
  bonusesOrder: null,
};

export const UploadReleaseContent = ({ currentArtistId, product, profileType }: TUploadReleaseContentProps) => {

  const router = useRouter();
  // id созданного как черновик релиза перед загрузкой трека
  const [newAlbumId, setNewAlbumId] = useState<number | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState<boolean>(false);
  const [trackId, setTrackId] = useState<number | undefined>(undefined);
  const [bonusId, setBonusId] = useState<number | undefined>(undefined);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  const createAlbumMutation = useCreateAlbum();
  const updateAlbumMutation = useUpdateAlbum();

  const currentProductId = product?.id;
  const isEditForm = !!currentProductId;
  const releaseIdForUpload = currentProductId ?? newAlbumId;

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
  const deleteBonusMutation = useDeleteBonus(currentProductId);
  const changeTracksOrder = useChangeTracksOrder(currentProductId);
  const changeBonusesOrder = useChangeBonusesOrder(currentProductId);

  const handleUploadTrack = () => {
    handleSubmit((d) => onSubmit(d, "uploadTrack"))();
  };

  const handleUploadBonus = () => {
    handleSubmit((d) => onSubmit(d, "uploadBonus"))();
  };

  const handleDeleteTrack = async (id: number) => {
    await deleteTrackMutation.mutateAsync({ id });
  };

  const handleDeleteBonus = async (id: number) => {
    await deleteBonusMutation.mutateAsync({ id });
  };

  const handleEditTrack = (id: number) => {
    setIsTrackModalOpen(true);
    setTrackId(id);
  };

  const handleEditBonus = (id: number) => {
    setIsBonusModalOpen(true);
    setBonusId(id);
  };

  const handleChangeTracksOrder = (ids: number[]) => {
    setValue("tracksOrder", ids);
  };

  const handleChangeBonusesOrder = (ids: number[]) => {
    setValue("bonusesOrder", ids);
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

  const onSubmit = async (
    data: UploadReleaseFormValues,
    action: "uploadTrack" | "publish" | "draft" | "save" | "cancel" | "uploadBonus"
  ) => {
    if (isSubmitting) return;

    const payload = createReleaseProductPayload(
      data, 
      profileType, 
      currentArtistId, 
      action, 
    );

    const hasNewMainImage =
      deletedImageIds.length > 0 || (!initialValues.mainImage && data.mainImage);

    const currentTracksOrder = data.tracksOrder;
    const currentBonusesOrder = data.bonusesOrder;

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
        case "uploadBonus":
          if (isEditForm) {
            setIsBonusModalOpen(true);
          } else {
            if (newAlbumId) {
              setIsBonusModalOpen(true);
              break;
            }
            const albumResponse = await createAlbumMutation.mutateAsync(payload);
            if (albumResponse) {
              setNewAlbumId(albumResponse.id);
              setIsBonusModalOpen(true);
            }
          }
          break;
        case "publish":
        case "draft":
          if (currentTracksOrder && releaseIdForUpload) {
            await changeTracksOrder.mutateAsync({
              album: releaseIdForUpload,
              track_ids: currentTracksOrder
            });
          }
          if (currentBonusesOrder && releaseIdForUpload) {
            await changeBonusesOrder.mutateAsync({
              album: releaseIdForUpload,
              bonus_ids: currentBonusesOrder
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
          if (currentTracksOrder && releaseIdForUpload) {
            await changeTracksOrder.mutateAsync({
              album: releaseIdForUpload,
              track_ids: currentTracksOrder
            });
          }

          if (currentBonusesOrder && releaseIdForUpload) {
            await changeBonusesOrder.mutateAsync({
              album: releaseIdForUpload,
              bonus_ids: currentBonusesOrder
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
            releaseId={releaseIdForUpload}
            isSubmitting={isSubmitting}
            onUploadTrack={handleUploadTrack}
            onEditTrack={handleEditTrack}
            onChangeTracksOrder={handleChangeTracksOrder}
            onDeleteTrack={handleDeleteTrack}
            releaseType={product?.release_type}
          />

          <BonusesSection 
            releaseId={releaseIdForUpload}
            isSubmitting={isSubmitting}
            onUploadBonus={handleUploadBonus}
            onEditBonus={handleEditBonus}
            onDeleteBonus={handleDeleteBonus}
            onChangeBonusesOrder={handleChangeBonusesOrder}
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

      {isBonusModalOpen && (
        <AddBonuseModal 
          isOpen={isBonusModalOpen}
          albumId={newAlbumId ? newAlbumId : currentProductId!}
          bonusId={bonusId}
          onClose={() => {
            setIsBonusModalOpen(false);
            setBonusId(undefined);
          }}
        />
      )}
    </>
  )
};