"use client";

import { useEffect, useMemo, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { useArtistLegalDataStore } from "@/entities/Artist/store/useArtistLegalDataStore";

import { ButtonUI } from "@/shared/ui";

import { ArtistDataField } from "./ArtistDataField";
import { artistDataFieldGroups, defaultArtistData } from "./artistDataForm.config";
import { toArtistDataFormValues, toArtistLegalDataPayload } from "./artistDataForm.mapper";
import type { ArtistDataFormValues } from "./artistDataForm.types";
import s from "./page.module.scss";

export function ArtistDataForm() {
  const { artistLegalData, error, fetchArtistLegalData, isLoading, updateArtistLegalData } =
    useArtistLegalDataStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const formValues = useMemo(() => toArtistDataFormValues(artistLegalData), [artistLegalData]);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<ArtistDataFormValues>({
    defaultValues: defaultArtistData,
    mode: "onChange",
    values: formValues,
  });

  useEffect(() => {
    void fetchArtistLegalData();
  }, [fetchArtistLegalData]);

  const handleEdit = () => {
    reset(formValues);
    setIsEditMode(true);
  };

  const handleArtistDataSubmit: SubmitHandler<ArtistDataFormValues> = (values) => {
    void (async () => {
      try {
        await updateArtistLegalData(toArtistLegalDataPayload(values));

        reset(values);
        setIsEditMode(false);
      } catch {
        // The store exposes the backend error message in `error`.
      }
    })();
  };

  const areFieldsDisabled = !isEditMode || isLoading;

  return (
    <form className={s.form} onSubmit={() => handleSubmit(handleArtistDataSubmit)}>
      {isLoading && !artistLegalData ? <p className={s.status}>Загрузка данных...</p> : null}

      {error ? <p className={s.errorMessage}>{error}</p> : null}

      <div className={s.fieldGroups}>
        {artistDataFieldGroups.map((group) => (
          <div className={s.grid} key={group.id}>
            {group.fields.map((field) => (
              <ArtistDataField
                error={errors[field.name]}
                field={field}
                isDisabled={areFieldsDisabled}
                key={field.name}
                register={register}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={s.actions}>
        <ButtonUI
          className={s.submitButton}
          disabled={!isEditMode || !isValid || isLoading}
          size='standart'
          type='submit'
          variant='primary'
        >
          Сохранить
        </ButtonUI>
        <ButtonUI
          className={s.editButton}
          disabled={isEditMode || isLoading}
          onClick={handleEdit}
          size='standart'
          type='button'
          variant='secondary'
        >
          Изменить
        </ButtonUI>
      </div>
    </form>
  );
}
