// showcase types
export type TShowcaseAlbums = {
  id: number;
  sku: number | null;
  name: string;
  price: string;
  cover_image: string | null;
  is_published: true
};

export type TShowcaseMerch = {
  id: number;
  name: string;
  description: string;
  price: string;
  main_image: string | null;
};

export type TShowcasePromocodes = {
  id: number;
  code: string;
  discount_value: string;
  discount_type: "PERCENT" | "FIXED";
  start_at: string | null;
  end_at: string | null;
  usage_limit: number | null; // Макс. количество использований. Пусто = неограничено
  used_count: number, // Использовано раз
  is_enabled: true
};

export type TShowcaseListRequest = {
  token: string | undefined;
  artist: string;
  url?: string;
};

export type TShowcasePromocodesRequest = Omit<TShowcaseListRequest, 'artist'>;