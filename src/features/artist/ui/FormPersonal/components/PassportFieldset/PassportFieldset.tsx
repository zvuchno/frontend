import { type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { createFormField } from "../../FormFieldsCreator/FormFieldsCreator";
import styles from "../../artistFormPersonal.module.scss";
import { artistPasportFields } from "../../utils/constants";
import { type FieldValues } from "../../utils/types";
import s from "./PassportFieldset.module.scss";

export const PassportFieldset = ({
  methods,
  disabled,
  isCompany,
}: {
  disabled?: boolean;
  methods: UseFormReturn<FieldValues, undefined, FieldValues>;
  isCompany: boolean;
}) => (
  <fieldset className={s.passportContentWrapper}>
    <legend className={!isCompany ? styles.legend : s.visuallyHidden}>Паспортные данные</legend>
    <div className={clsx(s.passportContent, { [s.company]: isCompany })}>
      {artistPasportFields.map((field, index) =>
        createFormField(field, index, methods, index, disabled)
      )}
    </div>
  </fieldset>
);
