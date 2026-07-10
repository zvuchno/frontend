export type TDeliveryType = "courier" | "pickpoint" | "artist_pickup" | "digital";

export type TDeliveryOption = {
  id: number;
  name: string;
  delivery_type: TDeliveryType;
};

type TPickupPoint = {
  id: number;
  address: string;
  date: string;
};

export type TCheckoutData = {
  user_defaults: {
    full_name: string;
    email: string;
    phone: string;
    city: string;
  };
  subtotal: string;
  deliveries: TDeliveryOption[];
  pickup_points: TPickupPoint[];
};

export type TOrder = {
  full_name: string;
  email: string;
  phone: string;
  personal_data_consent: boolean | undefined;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  cdek_delivery_mode?: string;
  delivery_point?: string;
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

export type TDeliveryPickpointSelection = {
  isChosen: boolean;
  code: string;
  price: number;
  daysMin: number;
  daysMax: number;
  address: string;
  city: string;
} | null;

export interface SelectDeliveryContextType {
  deliverySelected: TDeliveryPickpointSelection | null;
  setDeliverySelected: React.Dispatch<React.SetStateAction<TDeliveryPickpointSelection | null>>;
}