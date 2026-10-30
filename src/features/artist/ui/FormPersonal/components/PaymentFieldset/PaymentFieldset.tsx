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
    <fieldset className={s.paymentContentWrapper}>
      <legend className={styles.legend}>Банковские данные</legend>
      <div className={isCompany ? s.paymentContent : s.individualPaymentContent}>
        {fields.map((field, index) => createFormField(field, index, methods, index, disabled))}
      </div>
    </fieldset>
  );
};
