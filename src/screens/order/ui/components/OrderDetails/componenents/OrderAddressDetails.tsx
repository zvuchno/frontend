import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { useCdekCalculate } from "@/features/CdekDelivery";
import { type TCdekCity } from "@/features/CdekDelivery";

import { useGetCheckoutData, useSelectDeliveryTariff } from "@/entities/order";
import { useCourierDeliveryAddressStore } from "@/entities/order/store/useCourierDeliveryAddress";

import { getFiasIdByCityName } from "@/shared/api/getDadataLocation";

import styles from "../OrderDetails.module.scss";
import { fieldsConfig } from "../utils";
import { FormFieldSet } from "./FormFieldSet";

export const OrderAddressDetails = () => {
  const { register, setValue, unregister } = useFormContext<FieldValues>();

  const { mutate } = useCdekCalculate();

  const { data } = useGetCheckoutData();

  const setCourierAddress = useCourierDeliveryAddressStore((state) => state.setAddress);

  const userDefault = data?.user_defaults;

  useEffect(() => {
    if (userDefault) {
      setCourierAddress("city", userDefault.city);
      setCourierAddress("cityCode", userDefault.city_code.toString());
    }
  }, [userDefault, setCourierAddress]);

  const address = useCourierDeliveryAddressStore((state) => state.address);
  const setCurrentAddress = useCourierDeliveryAddressStore((state) => state.setAddress);
  const clearCurrentAddress = useCourierDeliveryAddressStore((state) => state.clearAddress);

  const { setDeliverySelected } = useSelectDeliveryTariff();

  const showDeliveryPrice = useCallback(
    (value: number | string) => {
      const valueToNumber = typeof value === "number" ? value : Number(value);
      mutate(
        { city_code: valueToNumber, tariffs: "door" },
        {
          onSuccess: (data) => {
            setDeliverySelected({ price: data.delivery_sum });
          },
        }
      );
    },
    [mutate, setDeliverySelected]
  );

  const cityValue = address.city;
  const cityCodeValue = address.cityCode;

  useEffect(() => {
    register("city", fieldsConfig.city);
    register("street", fieldsConfig.street);
    register("house", fieldsConfig.house);
    register("cdek_city_code", fieldsConfig.cdek_city_code);
    register("tariffs", fieldsConfig.tariffs);
    setValue("tariffs", "door", {
      shouldDirty: true,
      shouldValidate: true,
    });

    return () => {
      unregister(["city", "cdek_city_code", "tariffs", "street", "house", "apartment"]);
      setDeliverySelected({ price: 0 });
      clearCurrentAddress();
    };
  }, [clearCurrentAddress, register, setDeliverySelected, setValue, unregister]);

  useEffect(() => {
    setValue("city", cityValue, { shouldValidate: true });
    setValue("cdek_city_code", cityCodeValue, { shouldValidate: true });

    if (cityCodeValue) {
      showDeliveryPrice(cityCodeValue);
    }

    if (cityValue) {
      const fetchCityFiasId = async () => {
        try {
          const res = await getFiasIdByCityName(cityValue);
          const suggestions = res?.suggestions;

          if (suggestions && suggestions.length > 0) {
            const data = suggestions[0].data;
            const realFiasId = data.city_fias_id || data.fias_id || data.region_fias_id;
            setCurrentAddress("cityId", realFiasId || "");
          } else {
            setCurrentAddress("cityId", cityValue);
          }
        } catch (error) {
          console.error("Ошибка при резолве FIAS в useEffect:", error);
        }
      };

      void fetchCityFiasId();
    }
  }, [setValue, showDeliveryPrice, cityValue, cityCodeValue, setCurrentAddress]);

  const onSetCityValue = (value: TCdekCity) => {
    setCurrentAddress("city", value.full_name);
    setCurrentAddress("cityCode", value.code.toString());

    setCurrentAddress("street", "");
    setCurrentAddress("streetId", "");
    setCurrentAddress("house", "");
    setCurrentAddress("houseId", "");
    setCurrentAddress("apartment", "");

    showDeliveryPrice(value.code);
  };

  const handleCityConfirm = (value: TCdekCity) => {
    void onSetCityValue(value);
  };

  return (
    <section className={styles.orderDetailsDeliveryAddress}>
      <h3 className={styles.title}>Адрес доставки</h3>
      <FormFieldSet onCityConfirm={handleCityConfirm} />
    </section>
  );
};
