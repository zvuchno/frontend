"use client";

import { ButtonUI, CustomInput, Text, Title } from "@/shared/ui";
import s from "./AddBonusForm.module.scss";
import { useFormContext } from "react-hook-form";
import type { TBonusFormValues } from "../../model/types";
import { ChangeEvent, useRef } from "react";
import clsx from "clsx";

type TAddBonusFormProps = {
  isEditForm: boolean;
  file: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement, Element>) => Promise<void>;
  onSubmit: (data: TBonusFormValues, action: "create" | "save") => Promise<void>;
};

export const AddBunusForm = ({ isEditForm, file, handleFileChange, onSubmit }: TAddBonusFormProps) => {

  const bonusInputRef = useRef<HTMLInputElement | null>(null);

  const {
    setValue,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext<TBonusFormValues>();

  const handleAddBonusClick = () => {
    bonusInputRef.current?.click();
  };

  return (
    <form
      className={s.form}
      onSubmit={(event) => {
        void handleSubmit((data) => onSubmit(data, isEditForm ? "save" : "create"))(event);
      }}
    >

      <Title className={clsx(s.text, s.title)}>
        {isEditForm ? "Редактирование бонуса" : "Добавление бонуса"}
      </Title>

      {!file ? (
        <div className={s.uploadContainer}>
          <ButtonUI
            type="button"
            variant='primary'
            size='standart'
            onClick={handleAddBonusClick}
            disabled={isSubmitting}
            className={s.uploadContainer__mediaButton}
            data-testid="add-bonus-button"
          >
            {isEditForm ? "Заменить файл" : "Выбрать файл"}
          </ButtonUI>

          <input
            ref={bonusInputRef}
            className={s.uploadContainer__fileInput}
            type='file'
            accept="application/pdf,.pdf,image/jpeg,.jpg,.jpeg,image/png,.png,video/mp4,.mp4,text/plain,.txt,application/zip,.zip"
            onChange={(e) => {
              handleFileChange(e).catch(console.error)
            }}
            data-testid="add-bonus-input"
          />

          <Text className={s.uploadContainer__hint}>
            PDF, JPG, PNG, MP4, TXT, ZIP - до 500 МБ
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
              setValue("bonus_file", null);
            }}
            className={s.selectedFileBlock__removeBtn}
            data-testid="add-bonus-delete-button"
          >
            Удалить
          </ButtonUI>
        </div>
      )}

      <CustomInput
        id="name"
        label="Название"
        error={!!errors.name}
        message={errors.name?.message}
        {...register("name", { required: "Название обязательно" })}
        labelClassName={s.label}
        inputClassName={s.input}
        maxLength={255}
        data-testid="add-bonus-input-name"
      />

      <CustomInput 
        id="description"
        label="Описание (необязательно)" 
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
        placeholder="24 страницы, тексты и фото со съемок"
        data-testid="add-bonus-input-description"
      />

      <ButtonUI variant="primary" type="submit" disabled={isSubmitting} data-testid="upload-track-submit-button">
        {isSubmitting ? "Загрузка..." : isEditForm ? "Сохранить" : "Добавить"}
      </ButtonUI>

    </form>
  )
};