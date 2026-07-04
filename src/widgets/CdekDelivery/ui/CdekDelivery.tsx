import { useState } from "react";

import Script from "next/script";

import { useGetCheckoutData, useGetDeliveryOptions } from "@/entities/order";

import { CustomInput } from "@/shared/ui";

import styles from "./CdekDelivery.module.scss";

export const CdekDelivery = () => {
  const { data } = useGetCheckoutData();
  const city = data?.user_defaults.city;

  const [currentCity, setCurrentCity] = useState(city);

  const yandexKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
  const cdekServicePath = process.env.NEXT_PUBLIC_DADATA_API_KEY;

  console.log(city);
  const handleScriptLoad = () => {
    if (window.CDEKWidget) {
      new window.CDEKWidget({
        from: "Москва",
        root: "cdek-map",
        apiKey: yandexKey,
        canChoose: true,
        servicePath: cdekServicePath,
        hideDeliveryOptions: {
          office: false,
          door: true,
        },
        hideFilters: {
          is_dressing_room: true,
        },
        defaultLocation: currentCity,
        lang: "rus",
        currency: "RUB",
        fixBounds: "country",
        /*onCalculate() {
          alert("Расчет стоимости доставки произведен");
        },
        onChoose() {
          alert("Доставка выбрана");
        },*/
      });
    }
  };

  return (
    <section className={styles.cdek}>
      <h3 className={styles.title}>Выбор ПВЗ</h3>
      {/**<div className={styles.cdekPickPickPointPicker}>
        <CustomInput
          label={"Город"}
          required
          id={""}
          className={styles.cdekCity}
          placeholder='Выберите город'
        />
        <CustomInput
          label={"Пункт получения"}
          required
          id={""}
          className={styles.cdekPickPoint}
          placeholder='Выберите пункт получения'
        />
      </div>
*/}
      <div className={styles.cdekPickPointsWidget} id='cdek-map' />
      <Script
        src='https://cdn.jsdelivr.net/npm/@cdek-it/widget@3'
        strategy='afterInteractive'
        onLoad={handleScriptLoad}
      />
    </section>
  );
};
