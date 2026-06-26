import "react-datepicker/dist/react-datepicker.module.css";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";

import { ButtonUI } from "@/shared/ui";
import { formatDateToApi } from "@/shared/utils/formatDate";

import { createFormField } from "./FormFieldsCreator/FormFieldsCreator";
import { LegalFormSelector } from "./LegalFormSelector/LegalFormSelector";
import styles from "./artistFormPersonal.module.scss";
import {
  artistEntityPaymentFields,
  artistIndividualPaymentFields,
  artistPasportFields,
  artistPersonalFields,
} from "./utils/constants";
import type { FieldValues, TArtistFormPersonalProps } from "./utils/types";

export const ArtistFormPersonal = ({
  isChecked = false,
  isOnChange = true,
  onSubmit,
  onError,
  onEdit,
}: TArtistFormPersonalProps) => {
  const methods = useFormContext<FieldValues>();
  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;
  const personalFields = artistPersonalFields;
  const passportFields = artistPasportFields;
  const paymentFields = artistIndividualPaymentFields;
  const legalEntityFields = artistEntityPaymentFields;

  const artistType = watch("legal_profile.recipient_type");
  const isCompany = artistType === "legal_entity";

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
    <>
      <form
        className={styles.form}
        onSubmit={() => {
          handleSubmit(onHandleSubmit, onError);
        }}
      >
        <div className={styles.formContentWrapper}>
          <h3 className={styles.formTitle}>
            {!artistType
              ? "Данные профиля"
              : !isCompany
                ? "Личные данные"
                : "Данные юридического лица"}
          </h3>

          {artistType === "legal_entity" && (
            <fieldset className={clsx(styles.formContent, styles.legalEntityContent)}>
              <legend className={styles.visuallyHidden}>Информация о юридическом лице</legend>
              {legalEntityFields.map((field, index) => createFormField(field, index, methods))}
            </fieldset>
          )}

          {!artistType ? (
            <LegalFormSelector />
          ) : (
            <>
              {artistType === "legal_entity" && (
                <h4 className={clsx(styles.formTitle, styles.subtittle)}>Данные руководителя</h4>
              )}

              <fieldset className={clsx(styles.formContent, styles.personalContent)}>
                <legend className={styles.visuallyHidden}>Персональная информация</legend>
                {personalFields.map((field, index) => createFormField(field, index, methods))}
              </fieldset>

              <fieldset className={clsx(styles.formContent, styles.passportlContent)}>
                <legend className={styles.visuallyHidden}>Паспортные данные</legend>
                {passportFields.map((field, index) => createFormField(field, index, methods))}
              </fieldset>

              {!isCompany && (
                <fieldset className={clsx(styles.formContent, styles.paymentlContent)}>
                  <legend className={styles.visuallyHidden}>Платежная информация</legend>
                  {paymentFields.map((field, index) => createFormField(field, index, methods))}
                </fieldset>
              )}
            </>
          )}
        </div>
        {artistType && (
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
              onClick={onEdit}
              disabled={isOnChange}
              type='button'
            >
              Изменить
            </ButtonUI>
          </div>
        )}
      </form>
    </>
  );
};
