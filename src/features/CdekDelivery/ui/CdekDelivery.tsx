import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";
import { fieldsConfig } from "@/screens/order/ui/components/OrderDetails/utils";

import { useGetCheckoutData, useSelectPickpoint } from "@/entities/order";

import { type TCdekCity } from "../api/cdek.api";
import { WidgetCdek } from "../components/WidgetCdek";
import styles from "./CdekDelivery.module.scss";
import { CitySuggestionSelectInput } from "./CitySuggestionSelectInput";

export const CdekDelivery = () => {
  const { data } = useGetCheckoutData();
  const defaultCity = data?.user_defaults.city || "";

  const [currentCity, setCurrentCity] = useState<TCdekCity | string>(defaultCity);

  const currentCityName = currentCity instanceof Object ? currentCity.full_name : currentCity;

  const { register, setValue, unregister } = useFormContext<FieldValues>();
  const { deliverySelected } = useSelectPickpoint();

  useEffect(() => {
    register("delivery_point", fieldsConfig.delivery_point);
    register("cdek_city_code", fieldsConfig.cdek_city_code);

    return () => {
      unregister(["delivery_point", "cdek_city_code"]);
    };
  }, [register, unregister]);

  useEffect(() => {
    if (!deliverySelected) {
      setValue("delivery_point", "", { shouldValidate: true });
      setValue("city", "", { shouldValidate: true });
      setValue("cdek_city_code", "", { shouldValidate: true });
    }

    setValue("delivery_point", deliverySelected?.code, { shouldValidate: true });
    setValue("city", deliverySelected?.city, { shouldValidate: true });
    setValue("cdek_city_code", deliverySelected?.cdek_city_code, { shouldValidate: true });
  }, [deliverySelected, setValue]);

  return (
    <section className={styles.cdek}>
      <h3 className={styles.title}>Выбор ПВЗ</h3>

      <CitySuggestionSelectInput
        onValueConfirm={setCurrentCity}
        id={"cdek-city-input"}
        placeholder='Выберите город'
      />

      {currentCityName && currentCityName.trim() !== "" && (
        <WidgetCdek key={currentCityName} cityName={currentCityName} />
      )}
    </section>
  );
};
