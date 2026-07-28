"use client";

import { AddImageBlock } from "@/features/profile/ui/addImageBlock/AddImageBlock";
import s from "./UploadPage.module.scss";
import { ButtonUI, CheckboxUI, CustomInput, SelectUI } from "@/shared/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";

const normalizePrice = (val: number | undefined): string | undefined => {
  if (val === undefined) return undefined;
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
};

type AlbumFormValues = {
  name: string;
  releaseDate: string;
  genre: string;
  price: number;
  allowHigherPrice: boolean;
  description?: string;
  privacy: 'public' | 'link_only' | 'hidden';
  mainImage?: File;
  additionalImages?: Record<string, File>;
};

interface UploadPageProps {
  type: 'album' | 'single' | 'merch';
}

export const UploadPage = ({ type }: UploadPageProps) => {
  const [productType, setProductType] = useState<'album' | 'single' | 'merch'>(type);

  // получать id артиста

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    setValue, 
    watch 
  } = useForm<AlbumFormValues>({
    defaultValues: {
      privacy: 'public',
      allowHigherPrice: false,
      mainImage: undefined,
      additionalImages: undefined,
    },
  });

  const handleChangeProductType = (value: string) => {
    setProductType(value as 'album' | 'single' | 'merch')
  };

  const onSubmit = async (data: AlbumFormValues, action: 'uploadTrack' | 'publish' | 'draft') => {
    if (isSubmitting) return;

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('is_single', String(productType === 'single'));
    formData.append('release_date', data.releaseDate ?? '');
    formData.append('genre', String(data.genre));
    const priceStr = normalizePrice(data.price);
    if (!priceStr) {
      return;
    }
    formData.append('price', priceStr);
    formData.append('description', data.description ?? '');
    formData.append('allow_overpay', String(data.allowHigherPrice));
    formData.append('is_published', String(action === 'publish'));
    formData.append('visibility', data.privacy);

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
    //     case 'upload':
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
  }


  return (
    <form 
      className={s.form}
      onSubmit={handleSubmit((data) => onSubmit(data, 'publish'))}
    >
      <SelectUI 
        value={productType}
        onChange={handleChangeProductType}
        options={[
          { value: "single", label: "Сингл" },
          { value: "merch", label: "Мерч" },
          { value: "album", label: "Альбом" },
        ]}
        placeholder='тип товара'
      />
      <AddImageBlock 
        severalImages={productType === 'merch'} 
        setValue={setValue}
      />
      <div className={s.fildsContainer}>
        <CustomInput 
          id={'name'}
          type='text'
          label={'Название'}
          error={!!errors.name}
          message={errors.name?.message}
          {...register('name', { required: "Название обязательно" })}
        />
        <CustomInput 
          id={'date'}
          type='date'
          label={'Дата релиза'}
          {...register('releaseDate')}
        />
        <SelectUI 
          label="Жанр"
          value={watch('genre')}
          onChange={(val) => setValue('genre', val)}
          options={[
            { value: "rock", label: "Рок" },
            { value: "pop", label: "Поп" },
          ]}
        />
        <CustomInput 
          id={'price'}
          type='number'
          label={'Цена'}
          error={!!errors.price}
          message={errors.price?.message}
          {...register('price', { 
            required: "Цена обязательна",
            valueAsNumber: true,
            min: { value: 0, message: 'Цена не может быть отрицательной' },
            max: 99999999,
            validate: (val) => {
              // Проверяем, что дробная часть не больше 2 знаков
              const str = String(val);
              const parts = str.split('.');
              if (parts.length > 1 && parts[1].length > 2) {
                return 'Допускается не более 2 знаков после запятой';
              }
              return true;
            },
          })}
        />
        <CheckboxUI 
          type="checkbox"
          onChange={(e) => setValue('allowHigherPrice', e.target.checked)}
          checked={!!watch('allowHigherPrice')}
        >
          Разрешить фанатам платить больше если они хотят
        </CheckboxUI>

        <CustomInput 
          id={'description'}
          label={'Описание'}
          multiline
          {...register('description')}
        />

        <SelectUI 
          label="Приватность"
          value={watch('privacy')}
          onChange={(val) => setValue('privacy', val as 'public' | 'link_only' | 'hidden')}
          options={[
            { value: "public", label: "Для всех" },
            { value: "link_only", label: "Доступно по ссылке" },
            { value: "hidden", label: "Скрыто" },
          ]}
        />
      </div>
      <ButtonUI 
        variant="primary"
        type="button"
        onClick={() => handleSubmit((d) => onSubmit(d, 'uploadTrack'))()}
        disabled={isSubmitting}
      >
        Загрузить трек
      </ButtonUI>

      <ButtonUI 
        variant="primary"
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Публикация...' : 'Опубликовать'}
      </ButtonUI>
      <ButtonUI 
        variant="primary"
        type='button'
        onClick={() => handleSubmit((d) => onSubmit(d, 'draft'))()}
        disabled={isSubmitting}
      >
        В черновик
      </ButtonUI>
    </form>
  )
}