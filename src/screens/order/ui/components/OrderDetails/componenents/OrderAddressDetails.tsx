import { useEffect, useState } from "react";
import { type FieldError, useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { CitySuggestionSelectInput, useCdekCalculate } from "@/features/CdekDelivery";
import { type TCdekCity } from "@/features/CdekDelivery";

import { useGetCheckoutData, useSelectDeliveryTariff } from "@/entities/order";

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
  const defaultCityCode = data?.user_defaults.city_code || 0;

  const { mutate } = useCdekCalculate();

  const [currentCity, setCurrentCity] = useState<TCdekCity | string>(defaultCity);

  const { setDeliverySelected } = useSelectDeliveryTariff();

  useEffect(() => {
    register("city", fieldsConfig.city);
    register("cdek_city_code", fieldsConfig.cdek_city_code);
    register("tariffs");
    const cityValue = currentCity instanceof Object ? currentCity.full_name : currentCity;
    const cityCodeValue =
      currentCity instanceof Object ? String(currentCity.code) : String(defaultCityCode);

    setValue("city", cityValue, { shouldValidate: true });
    setValue("cdek_city_code", cityCodeValue, { shouldValidate: true });

    if (cityValue) {
      void trigger(["city", "cdek_city_code"]);
    }

    if (cityCodeValue) {
      mutate(
        { city_code: Number(cityCodeValue), tariffs: "door" },
        {
          onSuccess: (data) => {
            setDeliverySelected({ price: data.delivery_sum });
          },
        }
      );
    }

    return () => {
      unregister(["city", "cdek_city_code", "tariffs"]);
      setDeliverySelected({ price: 0 });
    };
  }, [
    setValue,
    currentCity,
    trigger,
    defaultCityCode,
    mutate,
    setDeliverySelected,
    register,
    unregister,
  ]);

  const onSetCityValue = (value: TCdekCity) => {
    setCurrentCity(value);
    mutate(
      { city_code: value.code, tariffs: "door" },
      {
        onSuccess: (data) => {
          setDeliverySelected({ price: data.delivery_sum });
        },
      }
    );
  };

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
