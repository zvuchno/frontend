// параметры, которые принимает виджет
interface CDEKWidgetOptions {
  from?: // может быть просто город илм полный адрес
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
  currency?: string; //"RUB"
  fixBounds?: "country" | "province" | "locality"; //Вид ограничения границ отображения пвз "страна" | "область" | "населенный пункт")
  tariffs?: {
    office?: number[]; // [234, 136, 138];
    door?: number[]; // [233, 137, 139];
    pickup?: number[]; // [233, 137, 139];
  };
  onReady?: () => void; //  срабатывает, когда виджет загрузил все стили, скрипты, карты, а также – информацию о городах и пунктах выдачи заказов. В событии нет никаких передаваемых параметров.
  onCalculate?: () => void; // срабатывает, когда виджет получает данные о стоимости и сроках доставки. Событие передает в функцию-обработчик два параметра: объект с тарифами (типа TCdekTariffs) и объект адреса (типа TCdekDeliveryAddress),
  onChoose?: () => void; // срабатывает при нажатии на кнопку "Выбрать" в меню доставки для ПВЗ и для адреса. Событие передает в функцию-обработчик три параметра: выбранный режим доставки (TCdekDeliveryOption), выбранный тариф (TCdekTariffDetails) и выбранный адрес (TCdekOfficeAddress или TCdekDoorAddress). В зависимости от выбранного режима, объект адреса будет отличаться.
  //onChoose?: (deliveryType: string, address: unknown) => void; как ВАРИАНТ
  [key: string]: unknown; // разрешаем другие неизвестные опции
}

// класс виджета
interface ICDEKWidget {
  new (options: CDEKWidgetOptions): void;
}

// глобальный объект Window
interface Window {
  CDEKWidget?: ICDEKWidget;
}
