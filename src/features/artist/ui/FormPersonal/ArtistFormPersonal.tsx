"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";

import { useUpdateArtistLegalData } from "@/entities/Artist";
import { useArtistLegalDataStore } from "@/entities/Artist/store/useArtistLegalDataStore";

import { ButtonUI } from "@/shared/ui";
import { parseDateFromApi } from "@/shared/utils/formatDate";

import styles from "./artistFormPersonal.module.scss";
import { LegalEntityFieldset } from "./components/LegalEntityFieldset/LegalEntityFieldset";
import { PassportFieldset } from "./components/PassportFieldset/PassportFieldset";
import { PaymentFieldset } from "./components/PaymentFieldset/PaymentFieldset";
import { PersonalFieldset } from "./components/PersonalFieldset/PersonalFieldset";
import type { FieldValues, TArtistFormPersonalProps } from "./utils/types";

export const ArtistFormPersonal = ({ values }: TArtistFormPersonalProps) => {
  const { mutate } = useUpdateArtistLegalData();

  const [isOnChange, setIsOnChange] = useState(false);

  const artistTypeFromServer = values?.legal_profile?.recipient_type;
  const artistTypeFromStore = useArtistLegalDataStore((state) => state.artistLegalData)
    ?.legal_profile?.recipient_type;

  const isCompany =
    artistTypeFromServer === "legal_entity" || artistTypeFromStore === "legal_entity";

  const methods = useFormContext<FieldValues>();

  const {
    trigger,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    if (values && values !== null) {
      void trigger();
    }
  }, [values, trigger]);

  const birthDay = watch("identity_data.birth_date");
  const pasportIssueDay = watch("identity_data.passport_issue_date");
  const recipienType = watch("legal_profile.recipient_type");

  useEffect(() => {
    if (!recipienType)
      setError("legal_profile.recipient_type", {
        message: "Выберите из списка",
      });
  }, [recipienType, setError, clearErrors]);

  useEffect(() => {
    if (!birthDay || !pasportIssueDay) {
      return;
    }

    const compareDates = parseDateFromApi(pasportIssueDay) >= parseDateFromApi(birthDay);
    if (compareDates === true) {
      clearErrors("identity_data.passport_issue_date");
      clearErrors("identity_data.birth_date");
      return;
    }

    clearErrors("identity_data.birth_date");

    setError("identity_data.passport_issue_date", {
      message: "Дата выдачи паспорта не может быть раньше даты рождения",
    });
  }, [birthDay, pasportIssueDay, setError, clearErrors]);

  const onHandleSubmit = (data: FieldValues) => {
    const currentRecipientType = methods.getValues("legal_profile.recipient_type") ?? null;
    const formattedData = {
      ...data,
      legal_profile: {
        ...data.legal_profile,
        phone: `+${data.legal_profile?.phone}`,
        recipient_type: currentRecipientType,
      },
    };
    mutate(formattedData, { onSuccess: () => setIsOnChange(false) });
  };

  return (
    <form className={styles.form} onSubmit={(e) => void handleSubmit(onHandleSubmit)(e)}>
      <fieldset disabled={!isOnChange} className={styles.fieldsetWrapper}>
        <div className={styles.formContentWrapper}>
          <h3 className={styles.formTitle}>
            {isCompany ? "Данные юридического лица" : "Личные данные"}
          </h3>

          {isCompany && (
            <>
              <LegalEntityFieldset methods={methods} disabled={!isOnChange} />
              <h4 className={clsx(styles.formTitle, styles.subtittle)}>Данные руководителя</h4>
            </>
          )}

          <PersonalFieldset methods={methods} disabled={!isOnChange} />

          <PassportFieldset methods={methods} disabled={!isOnChange} />

          {!isCompany && <PaymentFieldset methods={methods} disabled={!isOnChange} />}
        </div>
      </fieldset>

      <div className={styles.formButtons}>
        <ButtonUI
          size='standart'
          variant='primary'
          disabled={!isValid || !isOnChange || (errors && Object.keys(errors).length > 0)}
          type='submit'
        >
          Сохранить
        </ButtonUI>
        <ButtonUI
          size='standart'
          variant='secondary'
          onClick={
            !isOnChange
              ? () => setIsOnChange(true)
              : () => {
                  setIsOnChange(false);
                  reset();
                }
          }
          type='button'
        >
          {!isOnChange ? "Изменить" : "Отменить (без сохранения)"}
        </ButtonUI>
      </div>
    </form>
  );
};
