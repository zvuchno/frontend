"use client";

import s from "./UploadPage.module.scss";
import { ButtonUI, Loader, SelectUI, Text } from "@/shared/ui";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useShowcaseArtistId } from "@/entities/Artist/store/useShowcaseStore";
import { AddPropertises } from "./components/addProperties/AddProperties";
import { 
  deleteMerchImages,
  mapApiToForm, 
  mapDirtyFieldsToPayload, 
  UploadForm, 
  uploadMerchImages, 
  type UploadFormValues 

} from "@/features/showcaseUpload";
import { 
  useAddImage, 
  useCreateAlbum, 
  useCreateMerch, 
  useDeleteImage, 
  useDetailInfo, 
  useUpdateAlbum, 
  useUpdateMerch 
} from "@/entities/Artist";
import { UploadTrackModal } from "./components/uploadTrackModal/UploadTrackModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { 
  TCreateAlbumRequest, 
  TCreateMerchRequest, 
  TShowcaseAlbumDetail, 
  TShowcaseMerchDetail, 
  TUpdateAlbumPayload, 
  TUpdateMerchPayload 
} from "@/entities/Artist/model/types";

const normalizePrice = (val: number): string => {
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
};

interface UploadPageProps {
  type: 'album' | 'single' | 'merch';
  id: string | undefined;
};

const initialFormValues: UploadFormValues = {
  name: '',
  releaseDate: '',
  kind: '',
  genre: '7',
  price: 0,
  privacy: 'public',
  allowHigherPrice: false,
  mainImage: null,
  additionalImages: [],
  quantity: 0,
  album: '',
};

// Страница формы создания/редактирования товара
export const UploadPage = ({ type, id }: UploadPageProps) => {
  // тип товара на форме
  const [productType, setProductType] = useState<'album' | 'single' | 'merch'>(type);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);

  const router = useRouter();

  // id созданного как черновик товра перед загрузкой трека/изображений
  const [newAlbumId, setNewAlbumId] = useState<number | null>(null);

  // id текущего артиста
  const currentArtistId = useShowcaseArtistId();
  // id товара, который необходимо отредактировать
  const currentProductId = id ? Number(id) : undefined;
  const isEditForm = !!currentProductId;

  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  // данные товра, получаемые, если перешли на эту страницу для редактирования
  const { 
    data, 
    isLoading, 
    error 
  } = useDetailInfo(type, currentProductId);

  const createAlbumMutation = useCreateAlbum();
  const updateAlbumMutation = useUpdateAlbum();

  const createMerchMutation = useCreateMerch();
  const updateMerchMutation = useUpdateMerch();

  const addImageMutation = useAddImage();
  const deleteImageMutation = useDeleteImage();

  const initialValues = useMemo(() => {
    if (!id || !data) {
      return initialFormValues;
    }
    return mapApiToForm(data);
  }, [id, data]);

  const mainImagePreview = useMemo(() => {
    if (!id || !data) {
      return null;
    }
    if (type === 'merch') {
      const main = (data as TShowcaseMerchDetail).images_merch
        .find((i) => i.is_main);
      if (!main) return null;
      return {
        image: main.image,
        id: main.id,
        is_main: true,
      };
    }

    const coverUrl = (data as TShowcaseAlbumDetail).cover_image;
    if (!coverUrl) return null;

    return {
      image: coverUrl,
      is_main: true,
    };

  }, [id, type, data]);

  const additionalImagesPreviews = useMemo(() => {
    if (!id || !data) {
      return undefined;
    }
    return type === 'merch'
      ? (data as TShowcaseMerchDetail).images_merch
        .filter((img) => !img.is_main)
      : undefined;

  }, [id, type, data]);

  const methods = useForm<UploadFormValues>({
    mode: "onChange",
    defaultValues: initialValues
  });

  const { 
    reset, 
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, dirtyFields, isDirty } 
  } = methods;

  const hasProperty = watch('hasProperty');

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleChangeProductType = (value: string) => {
    setProductType(value as 'album' | 'single' | 'merch');
    // Сброс полей, специфичных для другого типа, чтобы не было мусора
    if (value === 'merch') {
      setValue('releaseDate', '');
      setValue('genre', '');
    } else {
      setValue('kind', '');
      setValue('quantity', undefined);
      setValue('album', '');
      setValue('propertyName', '');
      setValue('variants', []);
      setValue('hasProperty', false);
    }
  };

  const onSubmit = async (data: UploadFormValues, action: 'uploadTrack' | 'publish' | 'draft' | 'save' | 'cancel') => {
    if (isSubmitting) return;
    const priceStr = normalizePrice(data.price);
    const hasImagesToUpload = data.mainImage || (data.additionalImages && data.additionalImages?.length > 0);

    // при сохранении мерча: сначала создавать сам мерч, а потом изображения

    let payload: TUpdateAlbumPayload | TUpdateMerchPayload = {};

    if (productType === 'album' || productType === 'single') {
      payload = {
        name: data.name,
        artist: currentArtistId!,
        is_single: false,
        release_date: data.releaseDate,
        genre: data.genre ? Number(data.genre) : null,
        price: priceStr,
        description: data.description ?? '',
        cover_image: data.mainImage ?? null,
        allow_overpay: data.allowHigherPrice,
        is_published: action === 'publish',
        visibility: data.privacy,
      }
    }

    if (productType === 'merch') {
      payload = {
        name: data.name,
        kind: data.kind ? Number(data.kind) : null,
        price: priceStr,
        album: data.album ? Number(data.album) : null,
        artist: currentArtistId!,
        description: data.description ?? '',
        allow_overpay: data.allowHigherPrice,
        visibility: data.privacy,
        is_published: action === 'publish',
        property_name: data.propertyName ?? '',
        variants: data.variants ?? [],
      }
    }

    try {
      switch (action) {
        case 'uploadTrack':
          if (isEditForm) {
            setIsTrackModalOpen(true);
          } else {
            const albumResponse = await createAlbumMutation.mutateAsync(payload as TCreateAlbumRequest);
            if (albumResponse) {
              setNewAlbumId(albumResponse.id);
              setIsTrackModalOpen(true);
            }
          }
          break;
        case 'publish':
          if (productType === 'merch') {
            const createdMerch = await createMerchMutation.mutateAsync(payload as TCreateMerchRequest);
            if (hasImagesToUpload && createdMerch.id) {
              await uploadMerchImages(createdMerch.id, addImageMutation.mutateAsync, data.mainImage, data.additionalImages);
            }
          } else {
            newAlbumId
              ? await updateAlbumMutation.mutateAsync({ id: newAlbumId, payload: payload })
              : await createAlbumMutation.mutateAsync(payload as TCreateAlbumRequest)
          }
          router.replace('/artist/showcase')
          break;
        case 'draft':
          if (productType === 'merch') {
            const createdMerch = await createMerchMutation.mutateAsync(payload as TCreateMerchRequest);
            if (hasImagesToUpload && createdMerch.id) {
              await uploadMerchImages(createdMerch.id, addImageMutation.mutateAsync, data.mainImage, data.additionalImages);
            }
          } else {
            newAlbumId
              ? await updateAlbumMutation.mutateAsync({ id: newAlbumId, payload: payload })
              : await createAlbumMutation.mutateAsync(payload as TCreateAlbumRequest)
          }
          router.replace('/artist/showcase')
          break;
        case 'save':
            if (deletedImageIds.length > 0) {
              await deleteMerchImages(currentProductId!, deletedImageIds, deleteImageMutation.mutateAsync)
              console.log('1: удалил изображения')
            }

            if (data.mainImage || data.additionalImages) {
              await uploadMerchImages(currentProductId!, addImageMutation.mutateAsync, data.mainImage, data.additionalImages);
              console.log('2: добавил новые картинки')
            }

            console.log('isDirty:', isDirty)
            if (!isDirty) {
              router.replace('/artist/showcase')
              break;
            }
            const newData = mapDirtyFieldsToPayload(dirtyFields, data);
            
            console.log('data:', data)
            console.log('dirtyFields:', dirtyFields)
            console.log('newData:', newData)
            if (productType === 'merch') {
              await updateMerchMutation.mutateAsync({id: currentProductId!, payload: newData})
              console.log('2: обновил весь мерч')
              
            } else {
              await updateAlbumMutation.mutateAsync({ id: currentProductId!, payload: newData })
            }
            
            router.replace('/artist/showcase')
          break;
        case 'cancel':
          router.replace('/artist/showcase')
          break;
      }
    } catch (e) {
      console.error(e);
      toast.error(`Произошла ошибка: ${error?.message}`)
    }
  };

  if (isLoading) return <Loader />
  if (error) return <div>{`Не удалось загрузить данные: ${error.message}`}</div>

  return (
    <>
      <FormProvider {...methods}>
        <form 
          className={s.form}
          onSubmit={handleSubmit((data) => onSubmit(data, isEditForm ? 'save' : 'publish'))}
        >
          <SelectUI 
            value={productType}
            onChange={handleChangeProductType}
            options={[
              { value: "single", label: "Сингл" },
              { value: "album", label: "Альбом" },
              { value: "merch", label: "Мерч" },
            ]}
            label="Категория"
            placeholder='тип товара'
            containerClassName={s.typeSelect}
            selectClassName={s.typeSelect__select}
            labelClassName={s.label}
            disabled={!!data}
          />

          <UploadForm 
            productType={productType} 
            mainPreview={mainImagePreview} 
            additionalPreviews={additionalImagesPreviews} 
            onDeleteImage={(imageId) => setDeletedImageIds(imageId)}
          />
          
          <div className={s.buttonsContainer}>
            {productType !== 'merch' ? (
              <div className={s.uploadContainer}>
                <ButtonUI 
                  variant="primary"
                  type="button"
                  onClick={() => handleSubmit((d) => onSubmit(d, 'uploadTrack'))()}
                  disabled={isSubmitting}
                  className={s.uploadContainer__uploadButton}
                >
                  Загрузить трек
                </ButtonUI>
                <Text className={s.uploadContainer__hint}>
                  Загрузите трек с вашего устройства (максимальный размер 500 MB; MP3, WAV, FLAC)
                </Text>
              </div>
            ) : (
              <>
                {!hasProperty ? (
                  <div className={s.uploadContainer}>
                    <ButtonUI 
                      variant="primary" 
                      type="button" 
                      onClick={() => setValue('hasProperty', true)}
                      className={s.uploadContainer__addButton}
                    >
                      + Добавить свойство
                    </ButtonUI>
                    <Text className={s.buttonContainer__hint}>размер, цвет или что-то другое</Text>
                  </div>
                ) : (
                  <AddPropertises />
                )}
              </>
            )}

            <ButtonUI 
              variant="primary"
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Загрузка...' : isEditForm ? 'Сохранить' : 'Опубликовать'}
            </ButtonUI>
            <ButtonUI 
              variant='secondary'
              type='button'
              onClick={() => handleSubmit((d) => onSubmit(d, isEditForm ? 'cancel' : 'draft'))()}
              disabled={isSubmitting}
            >
              {isEditForm ? 'Отмена' :'В черновик'}
            </ButtonUI>
          </div>
        </form>
      </FormProvider>
      <UploadTrackModal 
        isOpen={isTrackModalOpen} 
        onClose={() => setIsTrackModalOpen(false)}
        onUploadTrack={() => {}}
      />
    </>
  )
}