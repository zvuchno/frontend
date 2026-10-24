import { type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { createFormField } from "../../FormFieldsCreator/FormFieldsCreator";
import styles from "../../artistFormPersonal.module.scss";
import { artistLegalEntityFields } from "../../utils/constants";
import { type FieldValues } from "../../utils/types";
import s from "./LegalEntityFieldset.module.scss";

export const LegalEntityFieldset = ({
  methods,
  disabled,
}: {
  disabled?: boolean;
  methods: UseFormReturn<FieldValues, undefined, FieldValues>;
}) => (
  <fieldset className={clsx(styles.formContent, s.legalEntityContent)}>
    <legend className={styles.legend}>Данные организации</legend>
    {artistLegalEntityFields.map((field, index) =>
      createFormField(field, index, methods, index, disabled)
    )}
  </fieldset>
);
