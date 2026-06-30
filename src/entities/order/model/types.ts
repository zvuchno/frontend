export type TDeliveryOption = {
  id: number;
  name: string;
  delivery_type: string;
};

type TDeliveryOptions = "courier" | "pickpoint" | "pickup";

export type TCheckoutData = {
  user_defaults: {
    full_name: string;
    email: string;
    phone: string;
    city: string;
  };
  subtotal: string;
  deliveries: [
    {
      id: number;
      name: string;
      delivery_type: TDeliveryOptions;
    },
  ];
  pickup_points: [
    {
      id: 0;
      address: string;
      date: string;
    },
  ];
};

export type TOrder = {
  full_name: string;
  email: string;
  phone: string;
  personal_data_consent: true;
  city: string;
  street: string;
  house: string;
  apartment: string;
  delivery: number;
};

type OrderStatus = "created" | "confirmed" | "paid" | "shipped" | "completed" | "canceled";

export type TOrderResponse = {
  id: number;
  order_number: string;
  created_at: Date;
  status: OrderStatus;
  items_count: number;
  total: string;
};
