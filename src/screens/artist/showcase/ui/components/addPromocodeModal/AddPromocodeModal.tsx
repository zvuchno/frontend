"use client";

import { useEffect, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import clsx from "clsx";

import {
  type PromocodeFormValues,
  mapPromoDirtyFieldsToPayload,
  toIsoUtc,
  toLocalDatetimeString,
} from "@/features/showcaseUpload";

import {
  type TCreatePromocodeRequest,
  useCreatePromocode,
  useDetailPromocode,
  useUpdatePromocode,
} from "@/entities/Artist";
import { useShowcaseArtistId } from "@/entities/Artist/store/useShowcaseStore";
import { useGetManagedProfiles } from "@/entities/Label";

import { ButtonUI, CheckboxUI, CustomInput, Loader, ModalUI, SelectUI, Title } from "@/shared/ui";

import s from "./AddPromocodeModal.module.scss";

interface AddPromocodeModalProps {
  isOpen: boolean;
  profileType: "artist" | "label" | undefined;
  onClose: () => void;
  id?: number;
}

const initialFormValues: PromocodeFormValues = {
  code: "",
  discountValue: null,
  description: "",
  limit: null,
  startAt: "",
  endAt: "",
};

export const AddPromocodeModal = ({ isOpen, profileType, id, onClose }: AddPromocodeModalProps) => {
  // id текущего артиста/лейбла
  const currentArtistId = useShowcaseArtistId();

  // данные промокода, получаемые, если перешли для редактирования
  const { data, isLoading, error } = useDetailPromocode(id);

  const isEditForm = !!id;

  const initialValues = useMemo(() => {
    if (!id || !data) {
      return initialFormValues;
    }
    return {
      code: data.code,
      description: data.description ?? "",
      limit: data.usage_limit,
      discountValue: Number(data.discount_value),
      discountType: data.discount_type,
      startAt: toLocalDatetimeString(data.start_at) ?? "",
      endAt: toLocalDatetimeString(data.end_at) ?? "",
      artistId: String(data.artist),
    };
  }, [id, data]);

  const methods = useForm<PromocodeFormValues>({
    mode: "onChange",
    defaultValues: initialValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    register,
    control,
    setValue,
    formState: { isSubmitting, dirtyFields, isDirty, errors },
  } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  // Список артистов (для селекта)
  const managedProfilesQuery = useGetManagedProfiles(profileType);

  const artistsOptions = useMemo(() => {
    if (!managedProfilesQuery.data) return [];
    return managedProfilesQuery.data.map((artist) => ({
      value: String(artist.id),
      label: artist.name,
    }));
  }, [managedProfilesQuery.data]);

  const isLoadingArtists = managedProfilesQuery.isFetching || managedProfilesQuery.isPending;

  const currentDiscountType = watch("discountType");

  const createPromocodeMutation = useCreatePromocode();
  const updatePromocodeMutation = useUpdatePromocode();

  const handleClose = () => {
    reset(initialFormValues);
    onClose();
  };

  const handleCancelClick = () => {
    handleClose();
  };

  const onSubmit = async (data: PromocodeFormValues, action: "create" | "save") => {
    if (isSubmitting) return;

    try {
      switch (action) {
        case "create": {
          const payload: TCreatePromocodeRequest = {
            code: data.code,
            discount_value: data.discountValue ? String(data.discountValue) : "",
            discount_type: data.discountType ?? "FIXED",
            start_at: data.startAt ? toIsoUtc(data.startAt) : null,
            end_at: data.endAt ? toIsoUtc(data.endAt) : null,
            usage_limit: data.limit ? Number(data.limit) : null,
            is_enabled: true,
            description: data.description ?? "",
            artist: data.artistId
              ? Number(data.artistId)
              : currentArtistId
                ? currentArtistId
                : undefined,
          };
          await createPromocodeMutation.mutateAsync(payload);
          handleClose();
          break;
        }
        case "save": {
          if (!isDirty) {
            handleClose();
            break;
          }
          const newData = mapPromoDirtyFieldsToPayload(dirtyFields, data);
          await updatePromocodeMutation.mutateAsync({
            id: id!,
            payload: newData,
          });
          handleClose();
          break;
        }
      }
    } catch (e) {
      console.error(e);
      toast.error(`Произошла ошибка: ${error?.message}`);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>{`Не удалось загрузить данные: ${error.message}`}</div>;

  return (
    <ModalUI isOpen={isOpen} onClose={handleClose} closeButtonStyle='circledX'>
      <FormProvider {...methods}>
        <form
          className={s.form}
          onSubmit={handleSubmit((data) => onSubmit(data, isEditForm ? "save" : "create"))}
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
            <CustomInput
              id='start_at'
              label='Начало действия'
              error={!!errors.startAt}
              message={errors.startAt?.message}
              {...register("startAt", {
                //validate: (v) => !!v && new Date(v).getTime() > 0 || 'Некорректная дата',
              })}
              //type="date"
              type='datetime-local'
              labelClassName={s.label}
              inputClassName={clsx(s.input, s.datetimeInput)}
            />
            <CustomInput
              id='end_at'
              label='Окончание действия'
              error={!!errors.endAt}
              message={errors.endAt?.message}
              {...register("endAt", {
                // validate: (v) => {
                //   if (!v) return false;
                //   const start = new Date(watch('startAt') ?? '');
                //   const end = new Date(v);
                //   return end.getTime() >= start.getTime() || 'Дата окончания должна быть не раньше начала';
                // },
              })}
              //type="date"
              type='datetime-local'
              labelClassName={s.label}
              inputClassName={clsx(s.input, s.datetimeInput)}
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
              <span className={s.checkboxContainer__errorMessage}>
                {errors.discountType?.message}
              </span>
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
                Сохранить
              </ButtonUI>
            </div>
          ) : (
            <ButtonUI variant='primary' type='submit' disabled={isSubmitting}>
              Создать
            </ButtonUI>
          )}
        </form>
      </FormProvider>
    </ModalUI>
  );
};
