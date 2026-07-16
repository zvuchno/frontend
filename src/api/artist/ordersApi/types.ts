export type TArtistOrder = {
  id: number;
  order_number: string;
  created_at: string;
  status: string;
  items_count: number;
  total: string;
  images: string[]
};

type TTarget = {
  type: string;
  id: number | null;
  url: string;
  selected_variant_id: number | null;
}

type TOrderItem = {
  sku: string;
  kind: string;
  name: string;
  property_name: string;
  property_value: string;
  price_at_purchase: string;
  quantity: number;
  donation: string;
  promocode_discount: string;
  line_total: string;
  comment?: string;
  image: string;
  target: TTarget;
}

export type TArtistOrderDetails = {
  id: number;
  order_number: string;
  created_at: string;
  status: string;
  full_name: string;
  email: string;
  phone: string;
  delivery: string;
  full_address: string;
  items: TOrderItem[];
  total: string;
};

