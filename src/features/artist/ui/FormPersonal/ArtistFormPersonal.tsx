"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";

import { useUpdateArtistLegalData } from "@/entities/Artist";
import { useArtistLegalDataStore } from "@/entities/Artist/store/useArtistLegalDataStore";

import { ButtonUI } from "@/shared/ui";

//import { parseDateFromApi } from "@/shared/utils/formatDate";

import styles from "./artistFormPersonal.module.scss";
import { LegalEntityFieldset } from "./components/LegalEntityFieldset/LegalEntityFieldset";
import { PassportFieldset } from "./components/PassportFieldset/PassportFieldset";
import { PaymentFieldset } from "./components/PaymentFieldset/PaymentFieldset";
import { PersonalFieldset } from "./components/PersonalFieldset/PersonalFieldset";
import type { FieldValues, TArtistFormPersonalProps } from "./utils/types";

const formatPhoneForApi = (phone: string | undefined): string => (phone ? `+${phone}` : "");

const isLegalEntity = (
  ...values: Array<FieldValues["legal_profile"]["recipient_type"] | undefined>
): boolean => values.includes("legal_entity");

const getEditButtonLabel = (isEditing: boolean): string =>
  isEditing ? "Отменить (без сохранения)" : "Изменить";

export const ArtistFormPersonal = ({ values }: TArtistFormPersonalProps) => {
  const { mutate } = useUpdateArtistLegalData();

  const [isOnChange, setIsOnChange] = useState(false);

  const artistTypeFromServer = values?.legal_profile?.recipient_type;
  const artistTypeFromStore = useArtistLegalDataStore((state) => state.artistLegalData)
    ?.legal_profile?.recipient_type;

  const isCompany = isLegalEntity(artistTypeFromServer, artistTypeFromStore);

  const methods = useFormContext<FieldValues>();

  const {
    trigger,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    if (values && values !== null) {
      void trigger();
    }
  }, [values, trigger]);

  const recipientType = watch("legal_profile.recipient_type");

  useEffect(() => {
    void trigger("legal_profile.recipient_type");
  }, [recipientType, trigger]);

  const handleStartEditing = () => {
    setIsOnChange(true);
    void trigger();
  };

  const onHandleSubmit = (data: FieldValues) => {
    const currentRecipientType = methods.getValues("legal_profile.recipient_type") ?? null;
    const formattedData = {
      ...data,
      legal_profile: {
        ...data.legal_profile,
        phone: formatPhoneForApi(data.legal_profile?.phone),
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
          disabled={!isOnChange || !isValid}
          type='submit'
        >
          Сохранить
        </ButtonUI>
        <ButtonUI
          size='standart'
          variant='secondary'
          onClick={
            !isOnChange
              ? handleStartEditing
              : () => {
                  setIsOnChange(false);
                  reset();
                }
          }
          type='button'
        >
          {getEditButtonLabel(isOnChange)}
        </ButtonUI>
      </div>
    </form>
  );
};
