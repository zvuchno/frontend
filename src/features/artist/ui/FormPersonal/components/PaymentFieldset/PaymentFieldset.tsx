import { type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { createFormField } from "../../FormFieldsCreator/FormFieldsCreator";
import styles from "../../artistFormPersonal.module.scss";
import { artistEntityPaymentFields, artistIndividualPaymentFields } from "../../utils/constants";
import { type FieldValues } from "../../utils/types";
import s from "./PaymentFieldset.module.scss";

export const PaymentFieldset = ({
  disabled,
  methods,
  isCompany,
}: {
  disabled?: boolean;
  isCompany: boolean;
  methods: UseFormReturn<FieldValues, undefined, FieldValues>;
}) => {
  const fields = isCompany ? artistEntityPaymentFields : artistIndividualPaymentFields;
  return (
    <fieldset
      className={clsx(
        styles.formContent,
        isCompany ? s.paymentContent : s.individualPaymentContent
      )}
    >
      <legend className={styles.legend}>Банковские данные</legend>
      {fields.map((field, index) => createFormField(field, index, methods, index, disabled))}
    </fieldset>
  );
};
