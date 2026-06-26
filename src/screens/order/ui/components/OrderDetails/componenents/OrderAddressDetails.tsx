import { type FieldError, useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { CustomInput } from "@/shared/ui";

import styles from "../OrderDetails.module.scss";
import { orderAddressFormFields } from "../utils";
import { orderPersonalFormRules } from "../validation";

export const OrderAddressDetails = ({ fieldsDisabled }: { fieldsDisabled: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <section className={styles.orderDetailsDeliveryAddress}>
      <h3 className={styles.title}>Адрес доставки</h3>
      <div className={styles.orderDeliveryAddress}>
        {orderAddressFormFields.map((field) => {
          const fieldError = errors[field.name] as FieldError;
          const isFieldDisabled = fieldsDisabled || false;
          return (
            <div className={`cell-${field.row}-${field.column}`} key={field.name}>
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
            </div>
          );
        })}
      </div>
    </section>
  );
};
