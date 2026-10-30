"use client";

import { CheckboxUI, CustomInput, SelectUI } from "@/shared/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { TMerchFormFieldsProps, UploadMerchFormValues } from "../../model/types";
import s from "./MerchFormFields.module.scss";
import clsx from "clsx";

export const MerchFormFields = ({ 
  artistsOptions, 
  isLoadingArtists, 
  isEditForm, 
  merchKindsOptions,
  isLoadingMerchKinds,
  albumOptions,
  isLoadingAlbums,
  profileType,
  hasProperty
}: TMerchFormFieldsProps) => {
  
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext<UploadMerchFormValues>();

  return (
    <div className={s.container}>
      {profileType === "label" && (
        <Controller
          name="artistId"
          control={control}
          render={({ field }) => (
            <SelectUI
              name="artistId"
              label="Артист"
              options={artistsOptions}
              value={field.value ?? ""}
              onChange={field.onChange}
              containerClassName={s.select_short}
              selectClassName={s.select}
              labelClassName={s.label}
              disabled={isLoadingArtists || isEditForm}
              placeholder="Выбрать артиста"
              data-testid="merch-select-artist"
            />
          )}
        />
      )}

      <div className={s.fildsContainer}>
        <CustomInput
          id="name"
          type="text"
          label="Название"
          placeholder="Текст"
          error={!!errors.name}
          message={errors.name?.message}
          inputSize="large"
          {...register("name", { required: "Название обязательно" })}
          labelClassName={s.label}
          inputClassName={s.input}
          data-testid="merch-input-name"
        />
        
        <Controller
          name="kind"
          control={control}
          render={({ field }) => (
            <SelectUI
              name="kind"
              label="Тип товара"
              options={merchKindsOptions}
              value={field.value ?? ""}
              onChange={field.onChange}
              selectClassName={s.select}
              labelClassName={s.label}
              disabled={isLoadingMerchKinds}
              data-testid="merch-select-kind"
            />
          )}
        />
       
        <Controller
          name="album"
          control={control}
          render={({ field }) => (
            <SelectUI
              name="album"
              label="Альбом"
              options={albumOptions}
              value={field.value ?? ""}
              onChange={field.onChange}
              selectClassName={s.select}
              labelClassName={s.label}
              disabled={isLoadingAlbums}
              data-testid="merch-select-album"
            />
          )}
        />
        
        <CustomInput
          id="price"
          type="number"
          label="Цена"
          error={!!errors.price}
          message={errors.price?.message}
          inputSize="large"
          {...register("price", {
            required: "Цена обязательна",
            min: { value: 0, message: "Цена не может быть отрицательной" },
            max: { value: 99999999, message: "Цена не может превышать 99999999" },
            validate: (val) => {
              // Проверяем, что дробная часть не больше 2 знаков
              const str = String(val);
              const parts = str.split(".");
              if (parts.length > 1 && parts[1].length > 2) {
                return "Допускается не более 2 знаков после запятой";
              }
              return true;
            },
          })}
          labelClassName={s.label}
          inputClassName={s.input}
          data-testid="merch-input-price"
        />
        
        <CustomInput
          id="quantity"
          type="number"
          label="Количество"
          error={!!errors.name}
          message={errors.name?.message}
          inputSize="large"
          {...register("quantity", {
            min: { value: 0, message: "Количество не может быть отрицательным" },
          })}
          labelClassName={s.label}
          inputClassName={clsx(s.input, s.quantityInput)}
          disabled={hasProperty}
          data-testid="merch-input-quantity"
        />
        
        <CheckboxUI
          type="checkbox"
          checked={!!watch("allowHigherPrice")}
          className={s.spanWide}
          {...register("allowHigherPrice")}
          data-testid="merch-checkbox-allowHigherPrice"
        >
          Разрешить фанатам платить больше если они хотят
        </CheckboxUI>

        <CustomInput
          id="description"
          label="Описание"
          multiline
          rows={5}
          placeholder="Это описание будут видеть ваши слушатели"
          style={{
            resize: "none",
          }}
          {...register("description")}
          labelClassName={s.label}
          inputClassName={s.textarea}
          className={s.spanFull}
          data-testid="merch-input-description"
        />
      </div>

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
            value={field.value ?? ""}
            onChange={field.onChange}
            selectClassName={s.select}
            labelClassName={s.label}
            data-testid="merch-select-privacy"
          />
        )}
      />
    </div>
  )
}