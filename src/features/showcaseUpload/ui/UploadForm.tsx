"use client"

import { Controller, useFormContext } from "react-hook-form";
import type { UploadFormValues } from "../model/types";
import { AddImageBlock } from "../components/addImageBlock/AddImageBlock";
import s from "./UploadForm.module.scss";
import { CheckboxUI, CustomInput, Loader, SelectUI } from "@/shared/ui";
import clsx from "clsx";
import { useAlbumsInfiniteQuery, useGenresList, useMerchKindsList } from "@/entities/Artist";
import { useShowcaseArtistSlug } from "@/entities/Artist/store/useShowcaseStore";
import { useMemo } from "react";
import { useManagedProfiles } from "@/entities/Label";

type TImage = {
  image: string;
  is_main: boolean;
  id?: number;
}

export const UploadForm = ({ 
  productType,
  profileType,
  isEditForm,
  mainPreview,
  additionalPreviews,
  onDeleteImage
}: { 
  productType: 'album' | 'single' | 'merch';
  profileType: "artist" | "label" | undefined;
  isEditForm: boolean;
  onDeleteImage: (data: number[]) => void;
  mainPreview?: TImage | null;
  additionalPreviews?: TImage[];
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    control
  } = useFormContext<UploadFormValues>();

  const hasProperty = watch('hasProperty');

  const currentArtistSlug = useShowcaseArtistSlug();

  // Список артистов (для селекта)
  const managedProfilesQuery = useManagedProfiles(profileType);
  
  const artistsOptions = useMemo(() => {
    if (!managedProfilesQuery.data) return [];
    return managedProfilesQuery.data
      .map((artist) => ({
        value: String(artist.id),
        label: artist.name,
      }));
  }, [managedProfilesQuery.data]);

  const isLoadingArtists = managedProfilesQuery.isFetching || managedProfilesQuery.isPending;

  // Список альбомов (для селекта)
  const albumsQuery = useAlbumsInfiniteQuery({ artistSlug: currentArtistSlug });

  const albumOptions = useMemo(() => {
    if (!albumsQuery.data) return [];
    return albumsQuery.data.pages
      .flatMap((page) => page.results || [])
      .map((album) => ({
        value: String(album.id),
        label: album.name,
      }));
  }, [albumsQuery.data]);

  const isLoadingAlbums = albumsQuery.isFetching || albumsQuery.isPending;

  // Список жанров (для селекта)
  const genresQuery =  useGenresList();

  const genresOptions = useMemo(() => {
    if (!genresQuery.data) return [];
    return genresQuery.data
      .map((genre) => ({
        value: String(genre.id),
        label: genre.name,
      }));
  }, [genresQuery.data]);

  const isLoadingGenres = genresQuery.isFetching || genresQuery.isPending;
  
  // Список типов мерча (для селекта)
  const merchKindsQuery = useMerchKindsList();

  const merchKindsOptions = useMemo(() => {
    if (!merchKindsQuery.data) return [];
    return merchKindsQuery.data
      .map((genre) => ({
        value: String(genre.id),
        label: genre.name,
      }));
  }, [merchKindsQuery.data]);

  const isLoadingMerchKinds = merchKindsQuery.isFetching || merchKindsQuery.isPending;

  if (!currentArtistSlug) {
    return (
      <Loader />
    );
  }
  
  return (
    <div className={s.container}>
      <AddImageBlock 
        severalImages={productType === 'merch'} 
        setValue={setValue}
        initialMainPreview={mainPreview}
        initialAdditionalPreviews={additionalPreviews}
        onDelete={onDeleteImage}
      />
      {profileType === 'label' && (
        <Controller 
          name="artistId"
          control={control}
          render={({ field }) => (
            <SelectUI 
              name="artistId"
              label="Артист"
              options={artistsOptions}
              value={field.value ?? ''}
              onChange={field.onChange}
              containerClassName={s.select_short}
              selectClassName={s.select}
              labelClassName={s.label}
              disabled={isLoadingArtists || isEditForm}
              placeholder="Выбрать артиста"
            />
          )}
        />
      )}
      <div className={s.fildsContainer}>
          <CustomInput 
            id='name'
            type='text'
            label='Название'
            placeholder="Текст"
            error={!!errors.name}
            message={errors.name?.message}
            inputSize="large"
            {...register('name', { required: "Название обязательно" })}
            labelClassName={s.label}
            inputClassName={s.input}
          />

          {productType !== 'merch' ? (
            <CustomInput 
              id='date'
              type='date'
              label='Дата релиза'
              inputSize="large"
              {...register('releaseDate')}
              labelClassName={s.label}
              inputClassName={s.input}
            />
            
          ) : (
            <Controller 
              name="kind"
              control={control}
              render={({ field }) => (
                <SelectUI 
                  name="kind"
                  label="Тип мерча"
                  options={merchKindsOptions}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  selectClassName={s.select}
                  labelClassName={s.label}
                  disabled={isLoadingMerchKinds}
                />
              )}
            />
          )}

          {productType === 'merch' ? (
            <Controller 
              name="album"
              control={control}
              render={({ field }) => (
                <SelectUI 
                  name="album"
                  label="Альбом"
                  options={albumOptions}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  selectClassName={s.select}
                  labelClassName={s.label}
                  disabled={isLoadingAlbums}
                />
              )}
            />
          ) : (
            <Controller 
              name="genre"
              control={control}
              render={({ field }) => (
                <SelectUI 
                  name="genre"
                  label="Жанр"
                  options={genresOptions}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  selectClassName={s.select}
                  labelClassName={s.label}
                  disabled={isLoadingGenres}
                />
              )}
            />
          )}
          <CustomInput 
            id='price'
            type='number'
            label='Цена'
            error={!!errors.price}
            message={errors.price?.message}
            inputSize="large"
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
            labelClassName={s.label}
            inputClassName={s.input}
          />
          {productType === 'merch' ? (
            <CustomInput 
              id='quantity'
              type='number'
              label='Количество'
              error={!!errors.name}
              message={errors.name?.message}
              inputSize="large"
              {...register('quantity', {
                min: { value: 0, message: 'Количество не может быть отрицательным' },
              })}
              labelClassName={s.label}
              inputClassName={clsx(s.input, s.quantityInput)}
              disabled={hasProperty}
            />
          ) : (
            <CheckboxUI 
              type="checkbox"
              className={s.spanWide}
              checked={!!watch('allowHigherPrice')}
              {...register('allowHigherPrice')}
            >
              Разрешить фанатам платить больше если они хотят
            </CheckboxUI>
          )}

        {productType === 'merch' && (
          <CheckboxUI 
            type="checkbox"
            //onChange={(e) => setValue('allowHigherPrice', e.target.checked)}
            checked={!!watch('allowHigherPrice')}
            className={s.spanWide}
            {...register('allowHigherPrice')}
          >
            Разрешить фанатам платить больше если они хотят
          </CheckboxUI>
        )}

        <CustomInput 
          id='description'
          label='Описание'
          multiline
          rows={5}
          placeholder="Это описание будут видеть ваши слушатели"
          style={{
            resize: 'none'
          }}
          {...register('description')}
          labelClassName={s.label}
          inputClassName={s.textarea}
          className={s.spanFull}
        />

        <Controller 
          name="privacy"
          control={control}
          render={({ field }) => (
            <SelectUI 
              name="privacy"
              label="Приватность"
              options={[
                { value: "public", label: "Для всех" },
                { value: "link_only", label: "Доступно по ссылке" },
                { value: "hidden", label: "Скрыто" },
              ]}
              value={field.value ?? ''}
              onChange={field.onChange}
              selectClassName={s.select}
              labelClassName={s.label}
              containerClassName={s.spanWide}
            />
          )}
        />
      </div>
    </div>
  )
}