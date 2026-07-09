import { type FieldError, useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { InputPhone } from "@/features/profile";

import { CheckboxUI, CustomInput } from "@/shared/ui";

import styles from "../OrderDetails.module.scss";
import { fieldsConfig, orderPersonalFormFields } from "../utils";
import { orderPersonalFormRules } from "../validation";

export const OrderDetailsPersonal = ({ fieldsDisabled }: { fieldsDisabled: boolean }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FieldValues>();

  const isConsentChecked = watch("personal_data_consent");

  return (
    <section className={styles.orderDetailsPersonal}>
      <h3 className={styles.title}>Покупатель</h3>
      <div className={styles.orderPersonal}>
        {orderPersonalFormFields.map((field) => {
          const fieldError = errors[field.name] as FieldError;
          const isFieldDisabled = fieldsDisabled || false;
          return (
            <div className={`cell-${field.row}-${field.column}`} key={field.name}>
              {field.type === "tel" ? (
                <InputPhone field={field} disabled={false} className={styles.orderFormField} />
              ) : (
                <CustomInput
                  {...register(field.name, orderPersonalFormRules(field))}
                  id={`${field.row}.${field.column}`}
                  type={field.type}
                  label={field.title}
                  placeholder={field.placeholder}
                  style={{
                    height: "40px",
                  }}
                  error={!!fieldError}
                  message={fieldError?.message}
                  disabled={isFieldDisabled}
                  aria-disabled={isFieldDisabled}
                  required={field.required}
                  aria-required={field.required}
                  className={styles.orderFormField}
                />
              )}
            </div>
          );
        })}
      </div>
      <div>
        <CheckboxUI
          type='checkbox'
          isChecked={!!isConsentChecked}
          {...register("personal_data_consent", fieldsConfig.personal_data_consent)}
          className={styles.confirmationMessagge}
        >
          Дать согласие на обработку персональных данных в соответствии с политикой обработки{" "}
        </CheckboxUI>
      </div>
    </section>
  );
};
