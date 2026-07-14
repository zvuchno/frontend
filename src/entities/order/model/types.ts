// основыне варианты доставки "сдек-курьер" | "сдек-пвз" | "забрать у артиста"
export type TDeliveryType = "courier" | "pickpoint" | "pickup";

// ddeliveries в запросе данных checkout
export type TDeliveryOption = {
  id: number;
  name: string;
  delivery_type: TDeliveryType;
};

// адрес вывоза у артиста
type TPickupPoint = {
  id: number;
  address: string;
  date: string;
};

// данные response checkout
export type TCheckoutData = {
  user_defaults: {
    full_name: string;
    email: string;
    phone: string;
    city: string;
    city_code: number;
  };
  subtotal: string;
  deliveries: TDeliveryOption[];
  pickup_points: TPickupPoint[];
};

//варианты доставки СДЕК - "курьер" | "ПВЗ" | "постамат"
export type TCdekDeliveryTariff = "door" | "office" | "pickup" | "";

// payload оформление заказа
export type TOrder = {
  full_name: string;
  email: string;
  phone: string;
  personal_data_consent: boolean | undefined;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  cdek_city_code?: string;
  tariffs?: TCdekDeliveryTariff;
  delivery_point?: string;
  pickup_point?: number;
  delivery?: number;
};

export type OrderStatus = "created" | "confirmed" | "paid" | "shipped" | "completed" | "canceled";

export type TOrderResponse = {
  id: number;
  order_number: string;
  created_at: Date;
  status: OrderStatus;
  items_count: number;
  total: string;
};

export type TDeliveryTariffSelection = {
  isChosen?: boolean;
  code?: string;
  price: number;
  daysMin?: number;
  daysMax?: number;
  address?: string;
  city?: string;
  cdek_city_code?: string;
  type?: TCdekDeliveryTariff;
} | null;

export interface SelectDeliveryContextType {
  deliverySelected: Partial<TDeliveryTariffSelection> | null;
  setDeliverySelected: React.Dispatch<
    React.SetStateAction<Partial<TDeliveryTariffSelection> | null>
  >;
}
