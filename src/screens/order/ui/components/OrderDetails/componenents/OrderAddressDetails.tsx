import { useEffect, useState } from "react";
import { type FieldError, useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { CitySuggestionSelectInput } from "@/features/CdekDelivery";
import { type TCdekCity } from "@/features/CdekDelivery";

import { useGetCheckoutData } from "@/entities/order";

import { CustomInput } from "@/shared/ui";

import styles from "../OrderDetails.module.scss";
import { fieldsConfig, orderAddressFormFields } from "../utils";
import { orderPersonalFormRules } from "../validation";

export const OrderAddressDetails = ({ fieldsDisabled }: { fieldsDisabled: boolean }) => {
  const {
    register,
    formState: { errors },
    setValue,
    unregister,
    trigger,
  } = useFormContext<FieldValues>();

  const { data } = useGetCheckoutData();
  const defaultCity = data?.user_defaults.city || "";

  const [currentCity, setCurrentCity] = useState<TCdekCity | string>(defaultCity);

  useEffect(() => {
    register("city", fieldsConfig.city);
    register("cdek_city_code", fieldsConfig.cdek_city_code);

    return () => {
      unregister(["city", "cdek_city_code"]);
    };
  }, [register, unregister]);

  useEffect(() => {
    const cityValue = currentCity instanceof Object ? currentCity.full_name : currentCity;
    const cityCodeValue = currentCity instanceof Object ? String(currentCity.code) : undefined;

    setValue("city", cityValue, { shouldValidate: true });
    setValue("cdek_city_code", cityCodeValue, { shouldValidate: true });

    if (cityValue) {
      void trigger(["city", "cdek_city_code"]);
    }
  }, [setValue, currentCity, trigger]);

  const onSetCityValue = (value: TCdekCity | string) => setCurrentCity(value);

  return (
    <section className={styles.orderDetailsDeliveryAddress}>
      <h3 className={styles.title}>Адрес доставки</h3>
      <div className={styles.orderDeliveryAddress}>
        {orderAddressFormFields.map((field) => {
          const fieldError = errors[field.name] as FieldError;
          const isFieldDisabled = fieldsDisabled || false;

          return (
            <div className={`cell-${field.row}-${field.column}`} key={field.name}>
              {field.name === "city" ? (
                <CitySuggestionSelectInput
                  onValueConfirm={onSetCityValue}
                  id={`${field.row}.${field.column}`}
                  type={field.type}
                  label={field.title}
                  placeholder={field.placeholder}
                  error={!!fieldError}
                  message={fieldError?.message}
                  disabled={isFieldDisabled}
                  aria-disabled={isFieldDisabled}
                  required={field.required}
                  aria-required={field.required}
                  className={styles.orderFormField}
                  value={currentCity instanceof Object ? currentCity.full_name : currentCity}
                />
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
    </section>
  );
};
