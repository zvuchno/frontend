"use client";

import { parseServerDate } from "@/shared/utils/formatDate";
import s from "./ReleaseFormFields.module.scss";
import { CheckboxUI, CustomInput, SelectUI } from "@/shared/ui";
import { FieldLabel } from "@/shared/ui/FieldLabel/FieldLabel";
import { CalendarField } from "@/shared/ui/CalendarField/CalendarField";
import { Controller, useFormContext } from "react-hook-form";
import type { TReleaseFormFieldsProps, UploadReleaseFormValues } from "../../model/types";

export const ReleaseFormFields = ({ 
  artistsOptions, 
  isLoadingArtists,
  genresOptions, 
  isLoadingGenres,
  isEditForm,  
  profileType,
}: TReleaseFormFieldsProps) => {

  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext<UploadReleaseFormValues>();

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
              data-testid="release-select-artist"
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
          data-testid="release-input-name"
        />

        
        <Controller
          control={control}
          name="releaseDate"
          render={({ field }) => {
            const dateValue = field.name === "releaseDate" ? parseServerDate(field.value) : null;
            return (
              <div className={s.releaseDate}>
                <FieldLabel
                  forField="releaseDate"
                  field={{ title: "Дата релиза" }}
                  className={s.label}
                />
                <CalendarField
                  {...register("releaseDate")}
                  value={dateValue}
                  index={0}
                  id="releaseDate"
                  onBlur={field.onBlur}
                  allowFuture
                  wrapperClassName={s.dateInput}
                  onChange={(selectedDate: Date | null) => {
                    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
                      const year = selectedDate.getFullYear();
                      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
                      const day = String(selectedDate.getDate()).padStart(2, "0");
                      field.onChange(`${year}-${month}-${day}`);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  data-testid="release-input-releaseDate"
                />
              </div>
            );
          }}
        />

        <Controller
          name="genre"
          control={control}
          rules={{ required: "Выберите жанр" }}
          render={({ field, fieldState: { error } }) => (
              <SelectUI
                name="genre"
                label="Жанр"
                options={genresOptions}
                value={field.value ?? ""}
                onChange={field.onChange}
                selectClassName={s.select}
                labelClassName={s.label}
                disabled={isLoadingGenres}
                error={error?.message}
                data-testid="release-select-genre"
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
          data-testid="release-Input-price"
        />
        
        <CheckboxUI
          type="checkbox"
          className={s.spanWide}
          checked={!!watch("allowHigherPrice")}
          {...register("allowHigherPrice")}
          data-testid="release-checkbox-allowHigherPrice"
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
          data-testid="release-input-description"
        />
      </div>

      <div className={s.flexContainer}>
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
              data-testid="release-select-privacy"
            />
          )}
        />

        <CustomInput
          id="upc"
          type="number"
          label="UPC"
          error={!!errors.upc}
          message={errors.upc?.message ?? "Укажите, если код уже выдан дистрибьютором"}
          placeholder="12-13 цифр"
          inputSize="large"
          {...register("upc", {
            minLength: { value: 12, message: "Не менее 12 цифр" },
            maxLength: { value: 13, message: "Не более 13 цифр" },
          })}
          labelClassName={s.label}
          inputClassName={s.input}
          //className={s.spanWide}
          data-testid="release-input-upc"
        />
      </div>
    </div>
  )
}