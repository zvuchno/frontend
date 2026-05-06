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
import { useArtistPersonalDataStore } from "@/entities/Artist/store/useArtistPersonalDataStore";
import { LegalFormSelector } from "./LegalFormSelector/LegalFormSelector";
import { createFormField } from "./FormFieldsCreator/FormFieldsCreator";

export const ArtistFormPersonal: FC<TArtistFormPersonalProps> = ({
  isChecked = false,
  isOnChange = true,
  onSubmit,
  onError,
  onEdit,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const personalFields = artistPersonalFields;
  const passportFields = artistPasportFields;
  const paymentFields = artistIndividualPaymentFields;
  const legalEntityFields = artistEntityPaymentFields;

  const artistType = useArtistPersonalDataStore(
    (state) => state.artistPersonalData?.artistType,
  );

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles.formContentWrapper}>
          <h3 className={styles.formTitle}>
            {!artistType
              ? "Данные профиля"
              : artistType === "individual"
                ? "Личные данные"
                : "Данные юридического лица"}
          </h3>

          {artistType === "legalEntity" && (
            <fieldset
              className={clsx(styles.formContent, styles.legalEntityContent)}
            >
              <legend className={styles.visuallyHidden}>
                Информация о юридическом лице
              </legend>
              {legalEntityFields.map(createFormField)}
            </fieldset>
          )}

          {!artistType ? (
            <LegalFormSelector />
          ) : (
            <>
              {artistType === "legalEntity" && (
                <h4 className={clsx(styles.formTitle, styles.subtittle)}>Данные руководителя</h4>
              )}

              <fieldset
                className={clsx(styles.formContent, styles.personalContent)}
              >
                <legend className={styles.visuallyHidden}>
                  Персональная информация
                </legend>
                {personalFields.map(createFormField)}
              </fieldset>

              <fieldset
                className={clsx(styles.formContent, styles.passportlContent)}
              >
                <legend className={styles.visuallyHidden}>
                  Паспортные данные
                </legend>
                {passportFields.map(createFormField)}
              </fieldset>

              {artistType === "individual" && (
                <fieldset
                  className={clsx(styles.formContent, styles.paymentlContent)}
                >
                  <legend className={styles.visuallyHidden}>
                    Платежная информация
                  </legend>
                  {paymentFields.map(createFormField)}
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
