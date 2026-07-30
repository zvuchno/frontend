"use client";


import s from "./UploadPage.module.scss";
import { ButtonUI, Loader, SelectUI, Text } from "@/shared/ui";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useShowcaseArtistId } from "@/entities/Artist/store/useShowcaseStore";
import { AddPropertises } from "./components/addProperties/AddProperties";
import { mapApiToForm, UploadForm, type UploadFormValues } from "@/features/showcaseUpload";
import { useDetailInfo } from "@/entities/Artist";

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
  price: 0,
  privacy: 'public',
  allowHigherPrice: false,
  mainImage: undefined,
  additionalImages: [],
  quantity: 0,
}

export const UploadPage = ({ type, id }: UploadPageProps) => {
  const [productType, setProductType] = useState<'album' | 'single' | 'merch'>(type);
  const currentArtistId = useShowcaseArtistId();
  const currentId = id ? Number(id) : undefined;

  const { data, isLoading, error } = useDetailInfo(type, currentId);

  const initialValues = useMemo(() => {
    if (!id || !data) {
      return initialFormValues;
    }
    return mapApiToForm(data);
  }, [id, data])

  const methods = useForm<UploadFormValues>({
    mode: "onChange",
    defaultValues: initialValues
  });

  const { 
    reset, 
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty, isValid, dirtyFields, isSubmitting } 
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

  const onSubmit = async (data: UploadFormValues, action: 'uploadTrack' | 'publish' | 'draft') => {
    if (isSubmitting) return;

    const formData = new FormData();

    const priceStr = normalizePrice(data.price);
    
    formData.append('name', data.name);
    formData.append('artist', String(currentArtistId));
    formData.append('is_single', String(productType === 'single'));
    // Поля только для альбома/сингла
    if (productType !== 'merch') {
      formData.append('release_date', data.releaseDate ?? '');
      formData.append('genre', String(data.genre ?? ''));
    }
    // Поля только для мерча
    if (productType === 'merch') {
      if (data.kind) formData.append('kind', data.kind);
      if (data.quantity !== undefined) {
        formData.append('quantity', String(data.quantity));
      }
      if (data.album) formData.append('album', data.album);
    }
    formData.append('price', priceStr);
    formData.append('description', data.description ?? '');
    formData.append('allow_overpay', String(data.allowHigherPrice));
    formData.append('visibility', data.privacy);
    formData.append('is_published', String(action === 'publish'));

    if (data.mainImage) {
      formData.append('cover_image', data.mainImage);
    } 

    // Object.entries(data.additionalImages ?? {}).forEach(([id, file]) => {
    //   if (file) {
    //     // Если бэк ждёт массив или отдельные поля — подстрой ключ под API
    //     formData.append(`additionalImages[${id}]`, file);
    //   }
    // });

    // try {
    //   switch (action) {
    //     case 'uploadTrack':
    //       await uploadTrackMutation.mutateAsync(formData);
    //       break;
    //     case 'publish':
    //       await publishProductMutation.mutateAsync(formData);
    //       break;
    //     case 'draft':
    //       await saveAsDraftMutation.mutateAsync(formData);
    //       break;
    //   }
    // } catch (e) {
    //   console.error(e);
    //   // твой toast-механизм
    // }
    // if (data.productType === 'merch' && data.hasProperty) {
    //   formData.append('property_name', data.propertyName ?? '');
      
    //   // Превращаем массив вариантов в формат, понятный бэкенду
    //   data.variants.forEach((variant, i) => {
    //     formData.append(`variants[${i}].value`, variant.value);
    //     formData.append(`variants[${i}].sku`, variant.sku);
    //     formData.append(`variants[${i}].stock`, String(variant.stock));
    //   });
    // }
  }

  if (isLoading) return <Loader />
  if (error) return <div>{`Не удалось загрузить данные: ${error.message}`}</div>

  return (
    <FormProvider {...methods}>
      <form 
        className={s.form}
        onSubmit={handleSubmit((data) => onSubmit(data, 'publish'))}
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

        <UploadForm productType={productType} />
        
        <div className={s.buttonsContainer}>
          {productType !== 'merch' ? (
            <div className={s.uploadContainer}>
              <ButtonUI 
                variant="primary"
                type="button"
                onClick={() => handleSubmit((d) => onSubmit(d, 'uploadTrack'))()}
                disabled={isSubmitting}
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
            {isSubmitting ? 'Публикация...' : 'Опубликовать'}
          </ButtonUI>
          <ButtonUI 
            variant='secondary'
            type='button'
            onClick={() => handleSubmit((d) => onSubmit(d, 'draft'))()}
            disabled={isSubmitting}
          >
            В черновик
          </ButtonUI>
        </div>
      </form>
    </FormProvider>
  )
}