import { useEffect, useMemo, useRef } from "react";

import { createDeliveryPriceViewer } from "../lib/createDeliveryPriceViewer";
import type {
  TCdekDeliveryAddress,
  TCdekDeliveryOption,
  TCdekOfficeAddress,
  TCdekTariffDetails,
  TCdekTariffPlans,
  WidgetCdekProps,
} from "../model/types";
import { useCdekCalculate } from "../model/useCdekDeliveryCalculate";
import styles from "../ui/CdekDelivery.module.scss";

// параметры, которые принимает виджет
interface CDEKWidgetOptions {
  from?: // может быть просто город или полный адрес
    | string
    | {
        country_code?: string; // "RU"
        city?: string; // название города
        postal_code?: number;
        code?: number; // Код населенного пункта CDEK
        address?: string;
      };
  root?: string; // "cdek-map" - ID элемента, куда будет помещен виджет.
  apiKey?: string;
  canChoose?: boolean;
  servicePath?: string;
  hideFilters?: {
    have_cashless?: boolean;
    have_cash?: boolean;
    is_dressing_room?: boolean;
    type?: boolean;
    search: boolean;
  };
  hideDeliveryOptions?: {
    office?: boolean;
    door?: boolean;
  };
  debug?: boolean;
  //Информация о пересылаемых грузах в формате iParcell
  goods?: [
    {
      width?: number; // см
      height?: number; // см
      length?: number; // см
      weight?: number; // гр
    },
  ];
  sender?: boolean; // Переключение виджета в режим "отправитель"
  defaultLocation?: [number, number] | string; // координаты [55.0415, 82.9346] либо название города
  lang?: string; //"rus"
  currency?: string; // "RUB"
  fixBounds?: "country" | "province" | "locality"; //Вид ограничения границ отображения пвз "страна" | "область" | "населенный пункт")
  tariffs?: {
    office?: number[]; // [234, 136, 138];
    door?: number[]; // [233, 137, 139];
    pickup?: number[]; // [233, 137, 139];
  };
  onReady?: () => void; //  срабатывает, когда виджет загрузил все стили, скрипты, карты, а также – информацию о городах и пунктах выдачи заказов. В событии нет никаких передаваемых параметров.
  onCalculate?: (
    tariffs: TCdekTariffPlans,
    address: TCdekDeliveryAddress
  ) => { async(): Promise<TCdekTariffPlans> }; // срабатывает, когда виджет получает данные о стоимости и сроках доставки. Событие передает в функцию-обработчик два параметра: объект с тарифами (типа TCdekTariffs) и объект адреса (типа TCdekDeliveryAddress),
  onChoose?: (
    deliveryType?: TCdekDeliveryOption,
    tariff?: TCdekTariffDetails,
    address?: TCdekOfficeAddress
  ) => void; // срабатывает при нажатии на кнопку "Выбрать" в меню доставки для ПВЗ и для адреса. Событие передает в функцию-обработчик три параметра: выбранный режим доставки (TCdekDeliveryOption), выбранный тариф (TCdekTariffDetails) и выбранный адрес (TCdekOfficeAddress или TCdekDoorAddress). В зависимости от выбранного режима, объект адреса будет отличаться.
  //onChoose?: (deliveryType: string, address: unknown) => void; как ВАРИАНТ
  [key: string]: unknown; // разрешаем другие неизвестные опции
}
interface ICDEKWidgetInstance {
  updateLocation: (location: string | number[]) => void;
}

interface ICDEKWidget {
  new (options: CDEKWidgetOptions): ICDEKWidgetInstance;
}

declare global {
  interface Window {
    CDEKWidget?: ICDEKWidget;
  }
}

export const WidgetCdek = ({ cityName, isDeliveryChosen }: WidgetCdekProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const yandexKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

  console.log(cityName);
  const initialCityRef = useRef(cityName);

  const cdekServicePath = useMemo(() => {
    return `${baseUrl}/v1/store/cdek/widget?city=${cityName}`;
  }, [baseUrl, cityName]);

  const { mutate } = useCdekCalculate();

  const widgetRef = useRef<ICDEKWidgetInstance | null>(null);

  const isDeliveryChosenRef = useRef(isDeliveryChosen);
  useEffect(() => {
    isDeliveryChosenRef.current = isDeliveryChosen;
  }, [isDeliveryChosen]);

  useEffect(() => {
    if (!window.CDEKWidget) return;

    const container = document.getElementById("cdek-map");
    if (container) container.innerHTML = "";

    widgetRef.current = new window.CDEKWidget({
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
        have_cash: true,
        have_cashless: true,
        type: true,
        search: true,
      },
      debug: true,
      defaultLocation: initialCityRef.current,
      lang: "rus",
      currency: "RUB",
      fixBounds: "locality",
      onChoose(
        deliveryType?: TCdekDeliveryOption,
        tariff?: TCdekTariffDetails,
        address?: TCdekOfficeAddress
      ) {
        if (address && address.city_code) {
          mutate(
            { city_code: address.city_code, delivery_type: "offices" },
            {
              onSuccess: (data) => {
                createDeliveryPriceViewer(data, address, isDeliveryChosenRef.current);
              },
            }
          );
        }
      },
    });

    return () => {
      if (container) container.innerHTML = "";
      widgetRef.current = null;
    };
  }, [yandexKey, cdekServicePath, mutate]);

  useEffect(() => {
    if (widgetRef.current && typeof widgetRef.current.updateLocation === "function") {
      console.log(cityName);
      widgetRef.current.updateLocation(cityName);
    }
  }, [cityName]);

  return (
    <>
      <div className={styles.cdekPickPointsWidget} id='cdek-map' />
    </>
  );
};
