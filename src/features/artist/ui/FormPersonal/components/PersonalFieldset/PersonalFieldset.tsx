import { type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { createFormField } from "../../FormFieldsCreator/FormFieldsCreator";
import styles from "../../artistFormPersonal.module.scss";
import { artistPersonalFields } from "../../utils/constants";
import { type FieldValues } from "../../utils/types";

export const PersonalFieldset = ({
  methods,
}: {
  methods: UseFormReturn<FieldValues, undefined, FieldValues>;
}) => (
  <fieldset className={clsx(styles.formContent, styles.personalContent)}>
    <legend className={styles.visuallyHidden}>Персональная информация</legend>
    {artistPersonalFields.map((field, index) => createFormField(field, index, methods))}
  </fieldset>
);
