import { Controller, useFormContext } from "react-hook-form";

import clsx from "clsx";

import {
  ButtonUI,
  CheckboxUI,
  CustomInput,
  Loader,
  LoadingButton,
  SelectUI,
  Text,
  Title,
} from "@/shared/ui";
import { HintBlock } from "@/shared/ui/HintBlock";

import type { AddPromocodeFormProps, PromocodeFormValues } from "../model/types";
import s from "./addPromocodeForm.module.scss";
import { PromocodeDateField } from "./promocodeDateField";

export const AddPromocodeForm = ({
  isEditForm,
  profileType,
  artistsOptions,
  isLoadingArtists,
  formError,
  isLoadingEditData,
  errorEditData,
  onSubmit,
  handleCancelClick,
  setFormError,
}: AddPromocodeFormProps) => {
  const {
    control,
    setValue,
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext<PromocodeFormValues>();

  const currentDiscountType = watch("discountType");

  if (isLoadingEditData)
    return (
      <div className={s.form}>
        <Loader />
      </div>
    );

  if (errorEditData)
    return <div className={s.form}>{`Не удалось загрузить данные: ${errorEditData.message}`}</div>;

  return (
    <form
      className={s.form}
      onSubmit={(event) => {
        void handleSubmit((data) => onSubmit(data, isEditForm ? "save" : "create"))(event);
      }}
      autoComplete='nope'
    >
      <Title className={clsx(s.text, s.title)}>Создание промокода</Title>

      <CustomInput
        id='code'
        label='Код промокода'
        error={!!errors.code}
        message={errors.code?.message}
        {...register("code", {
          pattern: {
            value: /^[A-Z0-9_-]+$/,
            message: "Допустимы только заглавные буквы, цифры, подчёркивание и дефис",
          },
          minLength: {
            value: 8,
            message: "Минимум 8 символов",
          },
          maxLength: {
            value: 20,
            message: "Максимум 20 символов",
          },
          required: "Укажите код промокода",
        })}
        onChange={(e) => {
          const target = e.target;
          setValue("code", target.value.toUpperCase());
        }}
        labelClassName={s.label}
        inputClassName={s.input}
        disabled={isEditForm}
      />

      <CustomInput
        id='description'
        label='Описание'
        error={!!errors.description}
        message={errors.description?.message}
        {...register("description")}
        labelClassName={s.label}
        inputClassName={s.input}
      />

      <div className={s.fieldsContainer}>
        <Controller
          control={control}
          shouldUnregister={false}
          name='startAt'
          render={({ field: { value, onChange }, fieldState }) => (
            <PromocodeDateField
              fieldState={fieldState}
              value={value}
              setFormError={setFormError}
              label='Начало действия'
              forInput={"startAt"}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          shouldUnregister={false}
          name='endAt'
          render={({ field: { value, onChange }, fieldState }) => (
            <>
              <PromocodeDateField
                fieldState={fieldState}
                value={value}
                setFormError={setFormError}
                label='Окончание действия'
                forInput={"endAt"}
                onChange={onChange}
                className={s.dateWithHint}
              >
                <HintBlock text='укажите дату, до которой действует промокод, или оставьте поле пустым для неограниченного использования' />
              </PromocodeDateField>
            </>
          )}
        />

        <CustomInput
          id='discountValue'
          type='number'
          label='Размер скидки'
          error={!!errors.discountValue}
          message={errors.discountValue?.message}
          {...register("discountValue", { required: "Укажите размер скидки" })}
          labelClassName={s.label}
          inputClassName={s.input}
        />
        <div className={s.checkboxContainer}>
          <CheckboxUI
            type='radio'
            value='PERCENT'
            isChecked={currentDiscountType === "PERCENT"}
            {...register("discountType", { required: "Выберите тип скидки" })}
            className={s.checkboxContainer__radioButton}
          >
            скидка в процентах
          </CheckboxUI>
          <CheckboxUI
            type='radio'
            value='FIXED'
            isChecked={currentDiscountType === "FIXED"}
            {...register("discountType", { required: "Выберите тип скидки" })}
            className={s.checkboxContainer__radioButton}
          >
            скидка в рублях
          </CheckboxUI>
          <span className={s.checkboxContainer__errorMessage}>{errors.discountType?.message}</span>
        </div>
        <CustomInput
          id='limit'
          type='number'
          label='Количество использований'
          error={!!errors.limit}
          message={errors.limit?.message}
          {...register("limit")}
          labelClassName={s.label}
          inputClassName={s.input}
        />
        {profileType === "label" && (
          <Controller
            name='artistId'
            control={control}
            render={({ field }) => (
              <SelectUI
                name='artistId'
                label='Артист'
                options={artistsOptions}
                value={field.value ?? ""}
                onChange={field.onChange}
                selectClassName={s.select}
                labelClassName={s.label}
                disabled={isLoadingArtists || isEditForm}
                placeholder='Выбрать артиста'
              />
            )}
          />
        )}
      </div>

      {formError && (
        <Text variant='normal' className={s.error}>
          {formError}
        </Text>
      )}

      {isEditForm ? (
        <div className={s.buttonsContainer}>
          <ButtonUI
            variant='secondary'
            type='button'
            disabled={isSubmitting}
            onClick={handleCancelClick}
          >
            Отменить
          </ButtonUI>
          <ButtonUI variant='primary' type='submit' disabled={isSubmitting}>
            {isSubmitting ? <LoadingButton /> : "Сохранить"}
          </ButtonUI>
        </div>
      ) : (
        <ButtonUI variant='primary' type='submit' disabled={isSubmitting}>
          {isSubmitting ? <LoadingButton /> : "Создать"}
        </ButtonUI>
      )}
    </form>
  );
};
