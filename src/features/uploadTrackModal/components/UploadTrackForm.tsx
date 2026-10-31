"use client";

import { useFormContext } from "react-hook-form";
import type { TrackFormValues } from "../model/types";
import clsx from "clsx";
import { ButtonUI, CheckboxUI, CustomInput, Text, Title } from "@/shared/ui";
import s from "./UploadTrackForm.module.scss";
import { ChangeEvent, useRef } from "react";
import { TReleaseType } from "@/entities/Artist";

type TUploadTrackFormProps = {
  isEditForm: boolean;
  file: File | null;
  releaseType?: TReleaseType;
  handleFileChange: (event: ChangeEvent<HTMLInputElement, Element>) => Promise<void>;
  onSubmit: (data: TrackFormValues, action: "add" | "save") => Promise<void>;
};

export const UploadTrackForm = ({ 
  isEditForm, 
  file, 
  releaseType, 
  handleFileChange, 
  onSubmit 
}: TUploadTrackFormProps) => {

  const trackInputRef = useRef<HTMLInputElement | null>(null);

  const {
    setValue,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useFormContext<TrackFormValues>();

  const handleTrackButtonClick = () => {
    trackInputRef.current?.click();
  };

  return (
    <form 
      className={s.form} 
      onSubmit={handleSubmit((data) => onSubmit(data, isEditForm ? "save" : "add"))}
    >
      <Title className={clsx(s.text, s.title)}>
        {isEditForm ? "Редактирование трека" : "Добавление трека"}
      </Title>

      {!file ? (
        <div className={s.uploadContainer}>
          <ButtonUI
            type="button"
            variant="primary"
            size="standart"
            onClick={handleTrackButtonClick}
            disabled={isSubmitting}
            className={s.uploadContainer__mediaButton}
            data-testid="upload-track-upload-button"
          >
            {isEditForm ? "Заменить трек" : "Выбрать трек"}
          </ButtonUI>

          <input
            ref={trackInputRef}
            className={s.uploadContainer__fileInput}
            type="file"
            accept="audio/mpeg,audio/wav,audio/vnd.wave,audio/x-wav,audio/flac,audio/*"
            onChange={(e) => {
              handleFileChange(e).catch(console.error)
            }}
            data-testid="upload-track-input"
          />

          <Text className={s.uploadContainer__hint}>
            Загрузите трек с вашего устройства (максимальный размер 500 MB; MP3, WAV, FLAC)
          </Text>
        </div>
      ) : (
        <div className={s.selectedFileBlock}>
          <div className={s.selectedFileBlock__info}>
            <span className={s.selectedFileBlock__name}>{file?.name}</span>
            <span className={s.selectedFileBlock__size}>
              {(file?.size / 1024 / 1024).toFixed(1)} МБ
            </span>
          </div>

          <ButtonUI
            type="button"
            variant="secondary"
            size="small"
            disabled={isSubmitting}
            onClick={() => {
              setValue('track', null);
            }}
            className={s.selectedFileBlock__removeBtn}
            data-testid="upload-track-delete-button"
          >
            Удалить
          </ButtonUI>
        </div>
      )}

      <CustomInput
        id="name"
        label="Название трека"
        error={!!errors.name}
        message={errors.name?.message}
        {...register('name', { required: "Название обязательно" })}
        labelClassName={s.label}
        inputClassName={s.input}
        maxLength={255}
        data-testid="upload-track-input-name"
      />
      {releaseType && releaseType !== "single" && (
        <div className={s.container}>
          <CustomInput 
            id={"price"}
            type="number"
            label="Индивидуальная цена"
            error={!!errors.price}
            message={errors.price?.message}
            {...register("price", { 
              required: false,
              min: { value: 0, message: "Цена не может быть отрицательной" },
              max: { value: 99999999, message: "Цена не может быть больше 99999999" },
              validate: (val) => {
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
            hintText="если не выставить индивидуальную цену, то приобрести трек отдельно от всего альбома будет нельзя"
            data-testid="upload-track-input-price"
          />

          <CheckboxUI 
            type="checkbox"
            checked={!!watch("allowHigherPrice")}
            {...register("allowHigherPrice")}
            className={s.checkbox}
          >
            Разрешить фанатам платить больше, если они хотят
          </CheckboxUI>
        </div>
      )}

      <CustomInput 
        id="description"
        label="Текст трека" 
        multiline
        rows={7}
        style={{
          resize: "none"
        }}
        {...register("description", {
          required: false,
        })}
        labelClassName={s.label}
        inputClassName={s.textarea}
        placeholder="Этот текст будут видеть ваши слушатели"
        data-testid="upload-track-input-description"
      />

      <ButtonUI variant="primary" type="submit" disabled={isSubmitting} data-testid="upload-track-submit-button">
        {isSubmitting ? "Загрузка..." : isEditForm ? "Сохранить" : "Добавить"}
      </ButtonUI>
    </form>
  )
};