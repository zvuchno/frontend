"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";

import { useArtistLegalDataStore } from "@/entities/Artist/store/useArtistLegalDataStore";

import { ButtonUI } from "@/shared/ui";
import { formatDateToApi } from "@/shared/utils/formatDate";

import styles from "./artistFormPersonal.module.scss";
import { LegalEntityFieldset } from "./components/LegalEntityFieldset/LegalEntityFieldset";
import { PassportFieldset } from "./components/PassportFieldset/PassportFieldset";
import { PaymentFieldset } from "./components/PaymentFieldset/PaymentFieldset";
import { PersonalFieldset } from "./components/PersonalFieldset/PersonalFieldset";
import type { FieldValues, TArtistFormPersonalProps } from "./utils/types";

export const ArtistFormPersonal = ({ values, onSubmit, onError }: TArtistFormPersonalProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOnChange, setIsOnChange] = useState(true);
  const artistType = useArtistLegalDataStore((state) => state.artistLegalData)?.legal_profile
    ?.recipient_type;
  const isCompany = artistType === "legal_entity";

  const methods = useFormContext<FieldValues>();

  const {
    setValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (values && values !== null) {
      void (async () => {
        setValues(values);
        await trigger();
        if (isOnChange === true) await trigger();
      })();
    }
  }, [values, isOnChange, setValues, trigger]);

  const onHandleSubmit = (data: FieldValues) => {
    const formattedData = {
      ...data,
      identity_data: {
        ...data.identity_data,
        birth_date: formatDateToApi(data.identity_data?.birth_date),
        passport_issue_date: formatDateToApi(data.identity_data?.passport_issue_date),
      },
      legal_profile: {
        ...data.legal_profile,
        phone: `+${data.legal_profile?.phone}`,
      },
    };
    onSubmit(formattedData);
  };

  return (
    <form className={styles.form} onSubmit={() => handleSubmit(onHandleSubmit, onError)}>
      <div className={styles.formContentWrapper}>
        <h3 className={styles.formTitle}>
          {isCompany ? "Данные юридического лица" : "Личные данные"}
        </h3>

        {isCompany && (
          <>
            <LegalEntityFieldset methods={methods} />
            <h4 className={clsx(styles.formTitle, styles.subtittle)}>Данные руководителя</h4>
          </>
        )}

        <PersonalFieldset methods={methods} />

        <PassportFieldset methods={methods} />

        {!isCompany && <PaymentFieldset methods={methods} />}
      </div>

      <div className={styles.formButtons}>
        <ButtonUI
          size='standart'
          variant='primary'
          disabled={!isChecked || (errors && Object.keys(errors).length > 0)}
          type='submit'
        >
          Сохранить
        </ButtonUI>
        <ButtonUI
          size='standart'
          variant='secondary'
          onClick={() => setIsOnChange(true)}
          disabled={isOnChange}
          type='button'
        >
          Изменить
        </ButtonUI>
      </div>
    </form>
  );
};
