import { FC } from "react";
import type { TArtistFormPersonalProps, FieldValues } from "./utils/types";
import styles from "./artistFormPersonal.module.scss";
import { ButtonUI } from "@/shared/ui/button";
import { useFormContext } from "react-hook-form";
import {
  artistPersonalFields,
  artistPasportFields,
  artistIndividualPaymentFields,
  artistEntityPaymentFields,
} from "./utils/constants";
import "react-datepicker/dist/react-datepicker.module.css";

import clsx from "clsx";
import { LegalFormSelector } from "./LegalFormSelector/LegalFormSelector";
import { createFormField } from "./FormFieldsCreator/FormFieldsCreator";
import { formatDateToApi } from "./utils/formatDate";

export const ArtistFormPersonal: FC<TArtistFormPersonalProps> = ({
  isChecked = false,
  isOnChange = true,
  onSubmit,
  onError,
  onEdit,
}) => {
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
        passport_issue_date: formatDateToApi(
          data.identity_data?.passport_issue_date,
        ),
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
        onSubmit={handleSubmit(onHandleSubmit, onError)}
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
            <fieldset
              className={clsx(styles.formContent, styles.legalEntityContent)}
            >
              <legend className={styles.visuallyHidden}>
                Информация о юридическом лице
              </legend>
              {legalEntityFields.map((field, index) =>
                createFormField(field, index, methods),
              )}
            </fieldset>
          )}

          {!artistType ? (
            <LegalFormSelector />
          ) : (
            <>
              {artistType === "legal_entity" && (
                <h4 className={clsx(styles.formTitle, styles.subtittle)}>
                  Данные руководителя
                </h4>
              )}

              <fieldset
                className={clsx(styles.formContent, styles.personalContent)}
              >
                <legend className={styles.visuallyHidden}>
                  Персональная информация
                </legend>
                {personalFields.map((field, index) =>
                  createFormField(field, index, methods),
                )}
              </fieldset>

              <fieldset
                className={clsx(styles.formContent, styles.passportlContent)}
              >
                <legend className={styles.visuallyHidden}>
                  Паспортные данные
                </legend>
                {passportFields.map((field, index) =>
                  createFormField(field, index, methods),
                )}
              </fieldset>

              {!isCompany && (
                <fieldset
                  className={clsx(styles.formContent, styles.paymentlContent)}
                >
                  <legend className={styles.visuallyHidden}>
                    Платежная информация
                  </legend>
                  {paymentFields.map((field, index) =>
                    createFormField(field, index, methods),
                  )}
                </fieldset>
              )}
            </>
          )}
        </div>
        {artistType && (
          <div className={styles.formButtons}>
            <ButtonUI
              size="standart"
              variant="primary"
              children={"Сохранить"}
              disabled={
                !isChecked || (errors && Object.keys(errors).length > 0)
              }
              type="submit"
            />
            <ButtonUI
              size="standart"
              variant="secondary"
              children={"Изменить"}
              onClick={onEdit}
              disabled={isOnChange}
              type="button"
            />
          </div>
        )}
      </form>
    </>
  );
};
