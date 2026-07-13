import { useEffect, useRef, useState } from "react";

import { type TCdekDeliveryTariff, useSelectPickpoint } from "@/entities/order";

import { createDeliveryPriceViewer } from "../lib/createDeliveryPriceViewer";
import type { TCdekOfficeAddress, TCdekTariffDetails } from "../model/types";
import { useCdekCalculate } from "../model/useCdekDeliveryCalculate";
import styles from "../ui/CdekDelivery.module.scss";

interface CDEKWidgetOptions {
  from?:
    | string
    | {
        country_code?: string;
        city?: string;
        postal_code?: number;
        code?: number;
        address?: string;
      };
  root?: string;
  apiKey?: string;
  canChoose?: boolean;
  servicePath?: string;
  hideFilters?: {
    have_cashless?: boolean;
    have_cash?: boolean;
    is_dressing_room?: boolean;
    type?: boolean;
  };
  hideDeliveryOptions?: { office?: boolean; door?: boolean };
  debug?: boolean;
  defaultLocation?: [number, number] | string;
  lang?: string;
  currency?: string;
  fixBounds?: "country" | "province" | "locality";
  onChoose?: (
    deliveryType?: TCdekDeliveryTariff,
    tariff?: TCdekTariffDetails,
    address?: TCdekOfficeAddress
  ) => void;
  [key: string]: unknown;
}

interface ICDEKWidgetInstance {
  [key: string]: unknown;
}

interface ICDEKWidget {
  new (options: CDEKWidgetOptions): ICDEKWidgetInstance;
}

declare global {
  interface Window {
    CDEKWidget?: ICDEKWidget;
  }
}

export const WidgetCdek = ({ cityName }: { cityName: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const yandexKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

  const { mutate } = useCdekCalculate();
  const widgetRef = useRef<ICDEKWidgetInstance | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const { setDeliverySelected } = useSelectPickpoint();

  const setDeliveryDetailsRef = useRef(setDeliverySelected);

  useEffect(() => {
    setDeliveryDetailsRef.current = setDeliverySelected;
  }, [setDeliverySelected]);

  const uniqueContainerId = "cdek-map";
  const scriptId = `cdek-script-node`;

  useEffect(() => {
    if (window.CDEKWidget) window.CDEKWidget = undefined;
    const oldScript = document.getElementById(scriptId);
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@cdek-it/widget@3";
    script.id = scriptId;
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.body.appendChild(script);

    return () => {
      script.remove();

      if (window.CDEKWidget) {
        window.CDEKWidget = undefined;
      }
    };
  }, [cityName, scriptId]);

  useEffect(() => {
    if (!scriptReady) return;

    const WidgetConstructor = window.CDEKWidget;
    if (!WidgetConstructor) return;

    const container = document.getElementById(uniqueContainerId);
    if (container) container.innerHTML = "";

    const currentServicePath = `${baseUrl}/v1/store/cdek/widget?city=${cityName}`;

    try {
      widgetRef.current = new WidgetConstructor({
        from: "Москва",
        root: uniqueContainerId,
        apiKey: yandexKey,
        canChoose: true,
        servicePath: currentServicePath,
        hideDeliveryOptions: { office: false, door: true },
        hideFilters: { is_dressing_room: true, have_cash: true, have_cashless: true, type: false },
        debug: false,
        defaultLocation: cityName,
        lang: "rus",
        currency: "RUB",
        fixBounds: "locality",
        onChoose(deliveryType, tariff, address) {
          if (address && address.city_code) {
            const checkCdekTariff = (type: string) => {
              return type === "PVZ" ? "office" : "pickup";
            };
            mutate(
              { city_code: address.city_code, tariffs: checkCdekTariff(address.type) },
              {
                onSuccess: (data) => {
                  createDeliveryPriceViewer(data, address, (selection) => {
                    setDeliverySelected(selection);
                  });
                },
              }
            );
          }
        },
      });
    } catch (e) {
      console.error("Ошибка при создании виджета СДЭК:", e);
    }

    return () => {
      widgetRef.current = null;
      if (container) container.innerHTML = "";
      setDeliveryDetailsRef.current(null);
    };
  }, [scriptReady, cityName, setDeliverySelected, baseUrl, yandexKey, uniqueContainerId, mutate]);

  return <div className={styles.cdekPickPointsWidget} id={uniqueContainerId} />;
};
