import { Controller, useFormContext } from "react-hook-form";
import type{ AddPromocodeFormProps, PromocodeFormValues } from "../model/types";
import s from "./addPromocodeForm.module.scss";
import { ButtonUI, CheckboxUI, CustomInput, Loader, LoadingButton, SelectUI, Text, Title } from "@/shared/ui";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { HintBlock } from "@/shared/ui/HintBlock";

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
  setFormError
}: AddPromocodeFormProps) => {

  const { 
    control, 
    setValue, 
    register, 
    watch,
    formState: { errors, isSubmitting }, handleSubmit 
  } = useFormContext<PromocodeFormValues>();

  const currentDiscountType = watch("discountType");
  const hasStartValue = watch("startAt");
  const hasEndValue = watch("endAt");

  if (isLoadingEditData) return (
    <div className={s.form}>
      <Loader />
    </div>
  )

  if (errorEditData) return <div className={s.form}>{`Не удалось загрузить данные: ${errorEditData.message}`}</div>;

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit((data) => onSubmit(data, isEditForm ? "save" : "create"))}
      autoComplete="nope"
    >
      <Title className={clsx(s.text, s.title)}>Создание промокода</Title>

      <CustomInput
        id="code"
        label="Код промокода"
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
        id="description"
        label="Описание"
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
          name="startAt"
          render={({ field: { value }, fieldState }) => (
            <div className={s.inputWrapper}>
              <label className={s.label}>Начало действия</label>
              <div
                className={clsx(
                  s.datePicker,
                  fieldState.error && s.dateError
                )}
              >
                <DatePicker
                  selected={value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? parseISO(value) : null}
                  onChange={(date: Date | null) => {
                    setValue("startAt", date ? format(date, "yyyy-MM-dd") : "", {
                      shouldDirty: true,
                    });
                    setFormError(null);
                  }}
                  id="startAt"
                  className={clsx("input_pickup_date input_size_small")}
                  popperClassName={s.DatePopper}
                  wrapperClassName={s.datePickerWrapper}
                  dateFormat="dd.MM.yyyy"
                  locale={ru}
                  placeholderText="дд.мм.гггг"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  showPopperArrow={false}
                  minDate={isEditForm ? undefined : new Date()}
                  autoComplete="nope"
                  onKeyDown={(event) => event.preventDefault()}
                />

                {hasStartValue && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue("startAt", "", {
                        shouldDirty: true,
                      });
                      setFormError(null);
                    }}
                    className={s.clearIconBtn}
                    aria-label="Очистить дату начала"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
        />

        <Controller
          control={control}
          shouldUnregister={false}
          name="endAt"
          render={({ field: { value }, fieldState }) => (
            <div className={s.inputWrapper}>
              <div className={s.labelWrapper}>
                <label className={s.label}>Окончание действия</label>
                <HintBlock text="укажите дату, до которой действует промокод, или оставьте поле пустым для неограниченного использования"/>
              </div>
              <div
                className={clsx(
                  s.datePicker,
                  fieldState.error && s.dateError
                )}
              >
                <DatePicker
                  selected={value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? parseISO(value) : null}
                  onChange={(date: Date | null) => {
                    setValue("endAt", date ? format(date, "yyyy-MM-dd") : "", {
                      shouldDirty: true,
                    });
                    setFormError(null);
                  }}
                  id="endAt"
                  className={clsx("input_pickup_date input_size_small")}
                  popperClassName={s.DatePopper}
                  wrapperClassName={s.datePickerWrapper}
                  dateFormat="dd.MM.yyyy"
                  locale={ru}
                  placeholderText="дд.мм.гггг"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  showPopperArrow={false}
                  minDate={isEditForm ? undefined : new Date()}
                  autoComplete="nope"
                  onKeyDown={(event) => event.preventDefault()}
                />

                {hasEndValue && (
                  <button
                    type="button"
                    onClick={() => {
                      setValue("endAt", "", {
                        shouldDirty: true,
                      });
                      setFormError(null);
                    }}
                    className={s.clearIconBtn}
                    aria-label="Очистить дату окончания"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
        />
        
        <CustomInput
          id="discountValue"
          type="number"
          label="Размер скидки"
          error={!!errors.discountValue}
          message={errors.discountValue?.message}
          {...register("discountValue", { required: "Укажите размер скидки" })}
          labelClassName={s.label}
          inputClassName={s.input}
        />
        <div className={s.checkboxContainer}>
          <CheckboxUI
            type="radio"
            value="PERCENT"
            isChecked={currentDiscountType === "PERCENT"}
            {...register("discountType", { required: "Выберите тип скидки" })}
            className={s.checkboxContainer__radioButton}
          >
            скидка в процентах
          </CheckboxUI>
          <CheckboxUI
            type="radio"
            value="FIXED"
            isChecked={currentDiscountType === "FIXED"}
            {...register("discountType", { required: "Выберите тип скидки" })}
            className={s.checkboxContainer__radioButton}
          >
            скидка в рублях
          </CheckboxUI>
          <span className={s.checkboxContainer__errorMessage}>
            {errors.discountType?.message}
          </span>
        </div>
        <CustomInput
          id="limit"
          type="number"
          label="Количество использований"
          error={!!errors.limit}
          message={errors.limit?.message}
          {...register("limit")}
          labelClassName={s.label}
          inputClassName={s.input}
        />
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
                selectClassName={s.select}
                labelClassName={s.label}
                disabled={isLoadingArtists || isEditForm}
                placeholder="Выбрать артиста"
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
            variant="secondary"
            type="button"
            disabled={isSubmitting}
            onClick={handleCancelClick}
          >
            Отменить
          </ButtonUI>
          <ButtonUI variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoadingButton /> : "Сохранить"}
          </ButtonUI>
        </div>
      ) : (
        <ButtonUI variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoadingButton /> : "Создать"}
        </ButtonUI>
      )}
    </form>
  )
}