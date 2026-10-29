import { type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { createFormField } from "../../FormFieldsCreator/FormFieldsCreator";
import styles from "../../artistFormPersonal.module.scss";
import { artistPersonalFields } from "../../utils/constants";
import { type FieldValues } from "../../utils/types";
import s from "./PersonalFieldset.module.scss";

export const PersonalFieldset = ({
  methods,
  disabled,
  isCompany,
}: {
  disabled?: boolean;
  methods: UseFormReturn<FieldValues, undefined, FieldValues>;
  isCompany: boolean;
}) => (
  <fieldset className={clsx(s.personalContentWrapper)}>
    <legend className={styles.legend}>{isCompany ? "Данные руководителя" : "Общие данные"}</legend>
    <div className={clsx(s.personalContent, s.nameFields)}>
      {artistPersonalFields
        .filter(
          (item) =>
            item.name === "identity_data.first_name" ||
            item.name === "identity_data.last_name" ||
            item.name === "identity_data.middle_name"
        )
        .map((field, index) => createFormField(field, index, methods, index, disabled))}
    </div>
    <div className={clsx(s.personalContent, s.personalDataFields)}>
      {artistPersonalFields
        .filter(
          (item) =>
            item.name !== "identity_data.first_name" &&
            item.name !== "identity_data.last_name" &&
            item.name !== "identity_data.middle_name"
        )
        .map((field, index) => createFormField(field, index, methods, index, disabled))}
    </div>
  </fieldset>
);
