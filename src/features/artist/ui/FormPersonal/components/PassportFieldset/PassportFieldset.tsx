import { type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { createFormField } from "../../FormFieldsCreator/FormFieldsCreator";
import styles from "../../artistFormPersonal.module.scss";
import { artistPasportFields } from "../../utils/constants";
import { type FieldValues } from "../../utils/types";

export const PassportFieldset = ({
  methods,
}: {
  methods: UseFormReturn<FieldValues, undefined, FieldValues>;
}) => (
  <fieldset className={clsx(styles.formContent, styles.passportlContent)}>
    <legend className={styles.visuallyHidden}>Паспортные данные</legend>
    {artistPasportFields.map((field, index) => createFormField(field, index, methods))}
  </fieldset>
);
