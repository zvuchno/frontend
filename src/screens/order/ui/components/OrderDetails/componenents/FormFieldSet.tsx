import { useEffect } from "react";
import { type FieldError, useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { CitySuggestionSelectInput, type TCdekCity } from "@/features/CdekDelivery";
import { SuggestionsSelectInput } from "@/features/SuggestionsSelectInpup";

import {
  type TDeliveryAddress,
  useCourierDeliveryAddressStore,
} from "@/entities/order/store/useCourierDeliveryAddress";

import { type TDadataResponse } from "@/shared/types/daData.types";
import { CustomInput } from "@/shared/ui";

import styles from "../OrderDetails.module.scss";
import { orderAddressFormFields } from "../utils";
import { orderPersonalFormRules } from "../validation";

export const FormFieldSet = ({ onCityConfirm }: { onCityConfirm: (city: TCdekCity) => void }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<FieldValues>();

  const address = useCourierDeliveryAddressStore((state) => state.address);

  const fiasId = {
    street: address.cityId,
    house: address.streetId,
    apartment: address.houseId,
  };

  const setCurrentAddress = useCourierDeliveryAddressStore((state) => state.setAddress);

  const handleSelectSuggestion = (
    fieldName: keyof TDeliveryAddress,
    suggestion: TDadataResponse
  ) => {
    setCurrentAddress(fieldName, suggestion.value);
    if (fieldName === "street") {
      setCurrentAddress("streetId", suggestion.data.fias_id || "");
    } else if (fieldName === "house") {
      setCurrentAddress("houseId", suggestion.data.fias_id || "");
    }
  };

  useEffect(() => {
    setValue("street", address.street, { shouldValidate: true });
    setValue("house", address.house, { shouldValidate: true });
    setValue("apartment", address.apartment || "", { shouldValidate: true });
  }, [address.street, address.house, address.apartment, setValue]);

  return (
    <div className={styles.orderDeliveryAddress}>
      {orderAddressFormFields.map((field) => {
        const fieldError = errors[field.name] as FieldError;

        return (
          <div className={`cell-${field.row}-${field.column}`} key={field.name}>
            {field.name === "city" ? (
              <CitySuggestionSelectInput
                onValueConfirm={onCityConfirm}
                id={`${field.row}.${field.column}`}
                type={field.type}
                label={field.title}
                placeholder={field.placeholder}
                error={!!fieldError}
                message={fieldError?.message}
                required={field.required}
                aria-required={field.required}
                className={styles.orderFormField}
                value={address.city}
              />
            ) : field.name === "street" || field.name === "house" || field.name === "apartment" ? (
              <SuggestionsSelectInput
                {...register(field.name as keyof FieldValues, orderPersonalFormRules(field))}
                defaultSuggestionValue={address[field.name]}
                fiasId={fiasId[field.name] ?? ""}
                boundType={field.name === "apartment" ? "flat" : field.name}
                onValueConfirm={(suggestion) =>
                  handleSelectSuggestion(field.name as keyof TDeliveryAddress, suggestion)
                }
                id={`${field.row}.${field.column}`}
                type={field.type}
                label={field.title}
                placeholder={field.placeholder}
                error={!!fieldError}
                message={fieldError?.message}
                required={field.required}
                aria-required={field.required}
                className={styles.orderFormField}
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
                required={field.required}
                aria-required={field.required}
                className={styles.orderFormField}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
