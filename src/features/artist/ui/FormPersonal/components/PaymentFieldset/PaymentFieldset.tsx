import { type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { createFormField } from "../../FormFieldsCreator/FormFieldsCreator";
import styles from "../../artistFormPersonal.module.scss";
import { artistIndividualPaymentFields } from "../../utils/constants";
import { type FieldValues } from "../../utils/types";

export const PaymentFieldset = ({
  disabled,
  methods,
}: {
  disabled: boolean;
  methods: UseFormReturn<FieldValues, undefined, FieldValues>;
}) => {
  return (
    <fieldset className={clsx(styles.formContent, styles.paymentlContent)}>
      <legend className={styles.visuallyHidden}>Платежная информация</legend>
      {artistIndividualPaymentFields.map((field, index) =>
        createFormField(field, index, methods, disabled)
      )}
    </fieldset>
  );
};
