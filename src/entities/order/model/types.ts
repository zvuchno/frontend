export type TDeliveryType = "courier" | "pickpoint" | "pickup" | "digital";

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
  delivery?: number | undefined;
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
