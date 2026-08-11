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
  type TCreateAlbumRequest,
  type TCreateMerchRequest,
  type TShowcaseAlbumDetail,
  type TShowcaseMerchDetail,
  type TUpdateAlbumPayload,
  type TUpdateMerchPayload,
  useAddImage, 
  useCreateAlbum, 
  useCreateMerch, 
  useDeleteImage, 
  useDeleteTrack, 
  useDetailInfo, 
  useTracksInfiniteQuery, 
  useUpdateAlbum, 
  useUpdateMerch 
} from "@/entities/Artist";
import { UploadTrackModal } from "./components/uploadTrackModal/UploadTrackModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TrackCard from "@/entities/albums/ui/trackCard/TrackCard";

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
  genre: '',
  price: null,
  privacy: 'public',
  allowHigherPrice: false,
  mainImage: null,
  additionalImages: [],
  quantity: null,
  album: '',
};

// Страница формы создания/редактирования товара
export const UploadPage = ({ type, id }: UploadPageProps) => {
  const { data } = useSession();
  const profileType = data?.user.profileType;
  // тип товара на форме
  const [productType, setProductType] = useState<'album' | 'single' | 'merch'>(type);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);
  const [trackId, setTrackId] = useState<number | undefined>(undefined);

  const router = useRouter();

  // id созданного как черновик товра перед загрузкой трека/изображений
  const [newAlbumId, setNewAlbumId] = useState<number | null>(null);

  // id текущего артиста/лейбла
  const currentArtistId = useShowcaseArtistId();
  // id товара, который необходимо отредактировать
  const currentProductId = id ? Number(id) : undefined;
  const isEditForm = !!currentProductId;

  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  // данные товра, получаемые, если перешли на эту страницу для редактирования
  const { 
    data: productData, 
    isLoading, 
    error 
  } = useDetailInfo(type, currentProductId);

  const createAlbumMutation = useCreateAlbum();
  const updateAlbumMutation = useUpdateAlbum();

  const createMerchMutation = useCreateMerch();
  const updateMerchMutation = useUpdateMerch();

  const addImageMutation = useAddImage();
  const deleteImageMutation = useDeleteImage();

  const { 
    data: tracks, 
    error: tracksError,
    fetchNextPage,
    isLoading: tracksLoading,
    isFetchingNextPage,
    hasNextPage, 
  } = useTracksInfiniteQuery(productType, currentProductId);
  const tracksList = tracks?.pages.flatMap((page) => page.results) ?? [];

  const deleteTrackMutation = useDeleteTrack(currentProductId);

  const handleDeleteTrack = async (id: number) => {
    await deleteTrackMutation.mutateAsync({ id });
  };

  const handleEditTrack = (id: number) => {
    setIsTrackModalOpen(true);
    setTrackId(id);
  };

  const initialValues = useMemo(() => {
    if (!id || !productData) {
      return initialFormValues;
    }
    return mapApiToForm(productData);
  }, [id, productData]);

  const mainImagePreview = useMemo(() => {
    if (!id || !productData) {
      return null;
    }
    if (type === 'merch') {
      const main = (productData as TShowcaseMerchDetail).images_merch
        .find((i) => i.is_main);
      if (!main) return null;
      return {
        image: main.image,
        id: main.id,
        is_main: true,
      };
    }

    const coverUrl = (productData as TShowcaseAlbumDetail).cover_image;
    if (!coverUrl) return null;

    return {
      image: coverUrl,
      is_main: true,
    };

  }, [id, type, productData]);

  const additionalImagesPreviews = useMemo(() => {
    if (!id || !productData) {
      return undefined;
    }
    return type === 'merch'
      ? (productData as TShowcaseMerchDetail).images_merch
        .filter((img) => !img.is_main)
      : undefined;

  }, [id, type, productData]);

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
    const priceStr = data.price ? normalizePrice(data.price) : '';
    const hasImagesToUpload = data.mainImage || (data.additionalImages && data.additionalImages?.length > 0);

    // при сохранении мерча: сначала создавать сам мерч, а потом изображения

    let payload: TUpdateAlbumPayload | TUpdateMerchPayload = {};

    if (productType === 'album' || productType === 'single') {
      payload = {
        name: data.name,
        artist: profileType === 'artist' 
          ? currentArtistId! 
          : data.artistId 
            ? Number(data.artistId) 
            : currentArtistId!,
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
        artist: profileType === 'artist' 
          ? currentArtistId! 
          : data.artistId 
            ? Number(data.artistId) 
            : currentArtistId!,
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
            if (newAlbumId) {
              await updateAlbumMutation.mutateAsync({ id: newAlbumId, payload });
            } else {
              await createAlbumMutation.mutateAsync(payload as TCreateAlbumRequest);
            }
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
            if (newAlbumId) {
              await updateAlbumMutation.mutateAsync({ id: newAlbumId, payload });
            } else {
              await createAlbumMutation.mutateAsync(payload as TCreateAlbumRequest);
            }
          }
          router.replace('/artist/showcase')
          break;
        case 'save':
            if (deletedImageIds.length > 0) {
              await deleteMerchImages(currentProductId!, deletedImageIds, deleteImageMutation.mutateAsync)
            }

            if (data.mainImage || data.additionalImages) {
              await uploadMerchImages(currentProductId!, addImageMutation.mutateAsync, data.mainImage, data.additionalImages);
            }

            if (!isDirty) {
              router.replace('/artist/showcase')
              break;
            }
            const newData = mapDirtyFieldsToPayload(dirtyFields, data);
            if (productType === 'merch') {
              await updateMerchMutation.mutateAsync({id: currentProductId!, payload: newData})
              
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
            disabled={!!productData}
          />

          <UploadForm 
            productType={productType} 
            profileType={profileType}
            isEditForm={isEditForm}
            mainPreview={mainImagePreview} 
            additionalPreviews={additionalImagesPreviews} 
            onDeleteImage={(imageId) => setDeletedImageIds(imageId)}
          />

          {tracksLoading ? (
            <Loader />
          ) : tracksError ? (
            <div>Не удалось загрузить список треков</div>
          ) : tracksList && tracksList.length > 0 ? (
            <div className={s.tracksList}>
              {tracksList.map((track) => (
                <TrackCard 
                  key={track.id}
                  image={track.image} 
                  title={track.artist_name} 
                  description={track.name} 
                  duration={track.duration}
                  onDelete={() => void handleDeleteTrack(track.id)}
                  onEdit={() => handleEditTrack(track.id)}
                />
              ))}
              {hasNextPage && (
                <div className={s.buttonWrapper}>
                  <button
                    type="button"
                    className={s.button}
                    onClick={() => {
                      fetchNextPage().catch(console.error)
                    }}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "загрузка..." : "смотреть ещё"}
                  </button>
                </div>
              )}
            </div>
          ) : null}
          
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
        albumId={newAlbumId ? newAlbumId : currentProductId!}
        onClose={() => {
          setIsTrackModalOpen(false)
          setTrackId(undefined);
        }}
        trackId={trackId}
      />
    </>
  )
}