import { type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { createFormField } from "../../FormFieldsCreator/FormFieldsCreator";
import styles from "../../artistFormPersonal.module.scss";
import { artistEntityPaymentFields } from "../../utils/constants";
import { type FieldValues } from "../../utils/types";

export const LegalEntityFieldset = ({
  disabled,
  methods,
}: {
  disabled: boolean;
  methods: UseFormReturn<FieldValues, undefined, FieldValues>;
}) => (
  <fieldset className={clsx(styles.formContent, styles.legalEntityContent)}>
    <legend className={styles.visuallyHidden}>Информация о юридическом лице</legend>
    {artistEntityPaymentFields.map((field, index) =>
      createFormField(field, index, methods, disabled)
    )}
  </fieldset>
);
