"use client";

import {  
  type TShowcaseMerchDetail, 
  useAddImage, 
  useCreateMerch, 
  useDeleteImage, 
  useUpdateMerch 
} from "@/entities/Artist";

import { 
  createMerchPayload,
  deleteMerchImages, 
  mapApiToForm, 
  mapMerchDirtyFieldsToPayload, 
  uploadMerchImages 
} from "@/features/showcaseUpload";

import { MerchUploadForm } from "@/features/showcaseUpload/merchUploadForm/MerchUploadForm";
import type { UploadMerchFormValues } from "@/features/showcaseUpload/model/types";
import { ButtonUI, Text } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AddPropertises } from "../addProperties/AddProperties";
import s from "./UploadMerch.module.scss";

type TUploadMerchContentProps = {
  currentArtistId: number | null;
  product?: TShowcaseMerchDetail;
  profileType?: "artist" | "label",
};

const initialFormValues: UploadMerchFormValues = {
  name: "",
  kind: "",
  price: null,
  privacy: "public",
  allowHigherPrice: false,
  mainImage: null,
  additionalImages: [],
  quantity: undefined,
  album: "",
  variants: [
    {
      value: "",
      sku: "",
      stock: undefined,
    },
  ],
};

export const UploadMerchContent = ({ currentArtistId, product, profileType }: TUploadMerchContentProps) => {

  const router = useRouter();
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  const createMerchMutation = useCreateMerch();
  const updateMerchMutation = useUpdateMerch();

  const addImageMutation = useAddImage();
  const deleteImageMutation = useDeleteImage();
  
  const currentProductId = product?.id;
  const isEditForm = !!currentProductId;

  const initialValues = useMemo(() => {
    if (!product) {
      return initialFormValues;
    }
    return mapApiToForm(product);
  }, [product]);

  const methods = useForm<UploadMerchFormValues>({
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

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const mainImagePreview = useMemo(() => {
    if (!product) return null;
    
    const main = product.images_merch.find((i) => i.is_main);
    if (!main) return null;
    return {
      image: main.image,
      id: main.id,
      is_main: true,
    };

  }, [product]);

  const additionalImagesPreviews = useMemo(() => {
    if (!product) return undefined;

    return product.images_merch.filter((img) => !img.is_main)
  }, [product]);

  const hasProperty = watch("hasProperty");
  const selectedArtist = watch("artistId");

  const onSubmit = async (
      data: UploadMerchFormValues,
      action: "publish" | "draft" | "save" | "cancel"
    ) => {
      if (isSubmitting) return;

      const artist = profileType === "label" && selectedArtist ? Number(selectedArtist) : currentArtistId

      const payload = createMerchPayload(
        data, 
        profileType, 
        artist, 
        action, 
        hasProperty
      );

      const hasImagesToUpload =
        !!data.mainImage ||
        (Array.isArray(data.additionalImages) && data.additionalImages.length > 0);
  
      // при сохранении мерча: сначала создавать сам мерч, а потом изображения
  
      try {
        switch (action) {
          case "publish":
          case "draft":
            const createdMerch = await createMerchMutation.mutateAsync(payload);
            if (hasImagesToUpload && createdMerch.id) {
              await uploadMerchImages(
                createdMerch.id,
                addImageMutation.mutateAsync,
                data.mainImage,
                data.additionalImages
              );
            }
            router.replace("/artist/showcase");
            break;
          case "save":
  
            if (!isDirty && deletedImageIds.length === 0 && !hasImagesToUpload) {
              router.replace("/artist/showcase");
              break;
            }
  
            if (deletedImageIds.length > 0) {
              await deleteMerchImages(
                currentProductId!,
                deletedImageIds,
                deleteImageMutation.mutateAsync
              );
            }
  
            if (data.mainImage || data.additionalImages) {
              await uploadMerchImages(
                currentProductId!,
                addImageMutation.mutateAsync,
                data.mainImage,
                data.additionalImages
              );
            }
  
            const newData = mapMerchDirtyFieldsToPayload(dirtyFields, data, hasProperty);
            if (isDirty) {
              await updateMerchMutation.mutateAsync({ id: currentProductId!, payload: newData });
            } 
  
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
    <FormProvider {...methods}>
      <form
          className={s.form}
          onSubmit={handleSubmit((data) => onSubmit(data, isEditForm ? "save" : "publish"))}
        >
          
          <MerchUploadForm 
            profileType={profileType}
            isEditForm={isEditForm}
            mainPreview={mainImagePreview}
            additionalPreviews={additionalImagesPreviews}
            onDeleteImage={(imageId) => setDeletedImageIds(imageId)}
          />

          <div className={s.buttonsContainer}>

            {!hasProperty ? (
              <div className={s.uploadContainer}>
                <ButtonUI
                  variant='primary'
                  type='button'
                  onClick={() => setValue("hasProperty", true)}
                  className={s.uploadContainer__addButton}
                  data-testid="upload-merch-add-property-button"
                >
                  + Добавить свойство
                </ButtonUI>
                <Text className={s.buttonContainer__hint}>размер, цвет или что-то другое</Text>
              </div>
            ) : (
              <AddPropertises />
            )}

            <ButtonUI 
              variant="primary" 
              type="submit" 
              disabled={isSubmitting} 
              data-testid="upload-merch-submit-button"
            >
              {isSubmitting ? "Загрузка..." : isEditForm ? "Сохранить" : "Опубликовать"}
            </ButtonUI>
            <ButtonUI
              variant='secondary'
              type='button'
              onClick={() => handleSubmit((d) => onSubmit(d, isEditForm ? "cancel" : "draft"))()}
              disabled={isSubmitting}
              data-testid="upload-merch-cansel-button"
            >
              {isEditForm ? "Отмена" : "В черновик"}
            </ButtonUI>

          </div>

        </form>
    </FormProvider>
  )
};