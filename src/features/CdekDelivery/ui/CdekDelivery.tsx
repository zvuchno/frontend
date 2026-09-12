import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

import { type FieldValues } from "@/screens/order/model/types";
import { fieldsConfig } from "@/screens/order/ui/components/OrderDetails/utils";

import { type TPVZOfficeMe } from "@/entities/Artist";
import { useGetCheckoutData, useSelectDeliveryTariff } from "@/entities/order";
import { Loader } from "@/shared/ui";

import { type TCdekCity, getCdekCities } from "../api/cdek.api";
import { WidgetCdek } from "../components/WidgetCdek";
import styles from "./CdekDelivery.module.scss";
import { CitySuggestionSelectInput } from "./CitySuggestionSelectInput";

const useDefaultCdekCity = (isSender: boolean) => {
  const { data } = useGetCheckoutData(!isSender);
  const { data: senderDefaults } = useQuery({
    queryKey: ["cdek-sender-city", "Москва"],
    queryFn: async () => {
      const moscowCities = await getCdekCities("Москва");
      return { city: "Москва", city_code: moscowCities[0]?.code };
    },
    enabled: isSender,
  });
  const checkoutDefaults = (isSender ? senderDefaults : data?.user_defaults) ?? { city: "", city_code: "" };
  const defaultCity = isSender ? "Москва" : checkoutDefaults.city || "";
  const defaultCityCode = Number(checkoutDefaults.city_code) || 0;

  return { defaultCity, defaultCityCode };
};

export const CdekDelivery = ({
  isSender,
  className,
  onModalClose,
  onSelectOfficeDraft,
}: {
  isSender: boolean;
  className?: string;
  onModalClose?: () => void;
  onSelectOfficeDraft?: (office: TPVZOfficeMe) => void;
}) => {
  const { defaultCity, defaultCityCode } = useDefaultCdekCity(isSender);

  const [currentCity, setCurrentCity] = useState<TCdekCity | string>(defaultCity);
  const [readyCityCode, setReadyCityCode] = useState<number | null>(null);
  const currentCityCode = currentCity instanceof Object ? currentCity.code : defaultCityCode;
  const isMapLoading = isSender && readyCityCode !== currentCityCode;

  const { register, setValue, unregister } = useFormContext<FieldValues>();
  const { deliverySelected } = useSelectDeliveryTariff();

  useEffect(() => {
    if (!isSender) {
      register("city", fieldsConfig.city);
      register("cdek_city_code", fieldsConfig.cdek_city_code);
      register("delivery_point", fieldsConfig.delivery_point);
      register("tariffs", fieldsConfig.tariffs);
      register("delivery_point_address", fieldsConfig.delivery_point_address);
      //register("house", fieldsConfig.house);
      //register("apartment", fieldsConfig.apartment);
    }

    return () => {
      if (!isSender) {
        unregister([
          "city",
          "cdek_city_code",
          "tariffs",
          "delivery_point",
          "delivery_point_address",
        ]);
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
        setValue("delivery_point_address", "", { shouldValidate: true });
        return;
      }

      setValue("delivery_point", deliverySelected.code ?? "", { shouldValidate: true });
      setValue("city", deliverySelected.city ?? "", { shouldValidate: true });
      setValue("cdek_city_code", deliverySelected.cdek_city_code ?? "", { shouldValidate: true });
      setValue("tariffs", deliverySelected.type ?? "", { shouldValidate: true });
      setValue("delivery_point_address", deliverySelected.address ?? "", { shouldValidate: true });
    }
  }, [deliverySelected, setValue, isSender]);

  return (
    <section className={clsx(styles.cdek, className)}>
      <h3 className={styles.title}>Выбор ПВЗ</h3>

      <CitySuggestionSelectInput
        defaultCity={defaultCity}
        onValueConfirm={setCurrentCity}
        id={"cdek-city-input"}
        placeholder='Выберите город'
      />

      <div className={styles.mapContainer} aria-busy={isMapLoading}>
        {isMapLoading && (
          <div className={styles.mapLoader}>
            <Loader marginBlockStart={0} />
          </div>
        )}
        <div style={{ visibility: isMapLoading ? "hidden" : "visible" }}>
      {currentCityCode > 0 && (
        <WidgetCdek
          key={currentCityCode}
          cityCode={currentCityCode}
          cityName={typeof currentCity === "string" ? defaultCity : currentCity.full_name}
          senderMode={isSender}
          onModalClose={isSender ? onModalClose : undefined}
          onOfficeSelect={onSelectOfficeDraft}
          onReady={setReadyCityCode}
        />
      )}
        </div>
      </div>
    </section>
  );
};
