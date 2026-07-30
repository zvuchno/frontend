import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";

import { type FieldValues } from "@/screens/order/model/types";
import { fieldsConfig } from "@/screens/order/ui/components/OrderDetails/utils";

import { useGetCheckoutData, useSelectDeliveryTariff } from "@/entities/order";

import { type TCdekCity } from "../api/cdek.api";
import { WidgetCdek } from "../components/WidgetCdek";
import styles from "./CdekDelivery.module.scss";
import { CitySuggestionSelectInput } from "./CitySuggestionSelectInput";

export const CdekDelivery = ({
  isSender,
  className,
  onModalClose,
}: {
  isSender: boolean;
  className?: string;
  onModalClose?: () => void;
}) => {
  const { data } = useGetCheckoutData();
  const defaultCity = data?.user_defaults.city || "";
  const defaultCityCode = data?.user_defaults.city_code || "";

  const [currentCity, setCurrentCity] = useState<TCdekCity | string>(defaultCity);
  const currentCityCode = currentCity instanceof Object ? currentCity.code : defaultCityCode;

  const { register, setValue, unregister } = useFormContext<FieldValues>();
  const { deliverySelected } = useSelectDeliveryTariff();

  useEffect(() => {
    if (!isSender) {
      register("city", fieldsConfig.city);
      register("cdek_city_code", fieldsConfig.cdek_city_code);
      register("delivery_point", fieldsConfig.delivery_point);
      register("tariffs", fieldsConfig.tariffs);
    }

    return () => {
      if (!isSender) {
        unregister(["city", "cdek_city_code", "tariffs", "delivery_point"]);
      }
    };
  }, [register, unregister, isSender]);

  useEffect(() => {
    if (!isSender) {
      if (!deliverySelected) {
        setValue("delivery_point", "", { shouldValidate: true });
        setValue("city", "", { shouldValidate: true });
        setValue("cdek_city_code", "", { shouldValidate: true });
        setValue("tariffs", "", { shouldValidate: true });
        return;
      }

      setValue("delivery_point", deliverySelected.code ?? "", { shouldValidate: true });
      setValue("city", deliverySelected.city ?? "", { shouldValidate: true });
      setValue("cdek_city_code", deliverySelected.cdek_city_code ?? "", { shouldValidate: true });
      setValue("tariffs", deliverySelected.type ?? "", { shouldValidate: true });
    }
  }, [deliverySelected, setValue, isSender]);

  return (
    <section className={clsx(styles.cdek, className)}>
      <h3 className={styles.title}>Выбор ПВЗ</h3>

      <CitySuggestionSelectInput
        onValueConfirm={setCurrentCity}
        id={"cdek-city-input"}
        placeholder='Выберите город'
      />

      {currentCityCode && (
        <WidgetCdek
          key={currentCityCode}
          cityCode={currentCityCode}
          cityName={typeof currentCity === "string" ? currentCity : currentCity.full_name}
          senderMode={isSender}
          onModalClose={isSender ? onModalClose : undefined}
        />
      )}
    </section>
  );
};
