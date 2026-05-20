export type PaginatedStoreResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type StoreFavorite = {
  id: number;
  product_variant: number;
  target_url: string;
};

export type StoreCatalogItem = {
  id: number;
  name: string;
  description?: string;
  price?: string | number | null;
  cover_image?: string | null;
  main_image?: string | null;
  audio_file?: string | null;
};

export type StoreOrder = {
  id: number;
  order_number: string;
  created_at: string;
  status?: string;
  items_count: number;
  total: string;
};

export type StoreOrderItem = {
  sku: string;
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
  target_url: string;
};

export type StoreOrderDetail = StoreOrder & {
  full_name: string;
  email: string;
  phone: string;
  delivery?: string;
  full_address: string;
  items: StoreOrderItem[];
  subtotal: string;
  delivery_price: string;
};

export type FanProductCardData = {
  id: string | number;
  image: string;
  title: string;
  description: string;
  price?: string | number | null;
  favoriteId?: number;
  targetUrl?: string;
  downloadUrl?: string | null;
};
