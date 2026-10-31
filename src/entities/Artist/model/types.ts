// showcase types
export type TShowcaseItem = "merch" | "promo" | "release";
export type TReleaseType = "single" | "ep" | "album";

// для списка товаров/промокодов в витрине
export type TShowcaseAlbum = {
  id: number;
  sku: string | null;
  name: string;
  artist_name: string;
  price: string;
  cover_image: string | null;
  is_published: boolean;
  release_type: TReleaseType;
  upc: string | null;
};

export type TShowcaseMerch = {
  id: number;
  sku: string | null;
  name: string;
  artist_name: string;
  description: string;
  price: string;
  stock: number;
  main_image: string | null;
  is_published: boolean;
};

export type TShowcasePromocode = {
  id: number;
  artist: number;
  code: string;
  artist_name: string;
  discount_value: string;
  discount_type: "PERCENT" | "FIXED";
  start_at: string | null;
  end_at: string | null;
  usage_limit: number | null; // Макс. количество использований. Пусто = неограничено
  used_count: number; // Использовано раз
  is_enabled: boolean;
};

// Для предзаполнения формы редактирования/создания товара/промокода
export type TShowcaseAlbumDetail = {
  id: number;
  sku: string | null;
  name: string;
  price: string;
  cover_image: string | null;
  artist_id: number;
  release_type: TReleaseType;
  upc?: string | null;
  genre: string;
  genre_id: number;
  description: string;
  release_date: string | null;
  allow_overpay: boolean;
  is_published: boolean;
  visibility: "public" | "link_only" | "hidden";
};

type TMerchImage = {
  id: number;
  image: string;
  is_main: boolean;
};

type TMerchVariantDetail = {
  id?: number;
  sku?: string;
  stock?: number;
  value: string;
};

export type TShowcaseMerchDetail = {
  id: number;
  sku: string | null;
  name: string;
  description: string;
  price: string;
  stock: number;
  main_image: string | null;
  allow_overpay: boolean;
  images_merch: TMerchImage[];
  kind: string;
  kind_id: number;
  album: string;
  album_id: number;
  artist_id: number;
  property_name: string;
  is_published: boolean;
  variants: TMerchVariantDetail[];
  visibility: "public" | "link_only" | "hidden";
};

export type TShowcasePromocodeDetail = TShowcasePromocode & {
  description: string;
};

export type TShowcaseListRequest = {
  //token: string | undefined;
  artist: string | null;
  url?: string;
  artist_id?: string;
  itemType?: TShowcaseItem;
};

export type PromoTypeFilter = "PERCENT" | "FIXED" | "ALL";

export type TShowcasePromocodesRequest = Omit<TShowcaseListRequest, "artist"> & {
  discount_type?: PromoTypeFilter;
  is_available?: boolean | null;
};

export type TShowcaseMerchRequest = TShowcaseListRequest & {
  in_stock?: boolean | null;
};

export type StockFilter = true | false | null;

export type TCreateAlbumRequest = {
  name: string;
  artist?: number;
  release_type?: TReleaseType;
  upc?: string | null;
  release_date?: string | null;
  genre?: number | null;
  price: string;
  description?: string;
  cover_image?: File | Blob | null;
  allow_overpay?: boolean;
  is_published?: boolean;
  visibility?: "public" | "link_only" | "hidden";
};

export type TCreateMerchRequest = {
  name: string;
  kind?: number | null;
  price: string;
  album?: number | null;
  artist?: number;
  description?: string;
  allow_overpay?: boolean;
  visibility?: "public" | "link_only" | "hidden";
  is_published?: boolean;
  property_name?: string;
  stock?: number;
  variants?: TMerchVariantDetail[];
};

export type TCreatePromocodeRequest = {
  artist?: number;
  code: string;
  discount_value: string;
  discount_type: "PERCENT" | "FIXED";
  start_at: string | null;
  end_at: string | null;
  usage_limit: number | null; // Макс. количество использований. Пусто = неограничено
  is_enabled: boolean;
  description: string;
};

type TUpdateRequest = {
  id: number;
};

export type TUpdateAlbumPayload = Partial<TCreateAlbumRequest>;

export type TUpdatePromocodePayload = {
  description?: string;
  usage_limit?: number | null;
  discount_type?: "PERCENT" | "FIXED";
  discount_value?: string;
  start_at?: string | null;
  end_at?: string | null;
  is_enabled?: boolean;
};

export type TUpdateMerchPayload = Partial<TCreateMerchRequest>;

export type TUpdateAlbumRequest = TUpdateRequest & {
  payload: TUpdateAlbumPayload;
};

export type TUpdateMerchRequest = TUpdateRequest & {
  payload: TUpdateMerchPayload;
};

export type TUpdatePromocodeRequest = TUpdateRequest & {
  payload: TUpdatePromocodePayload;
};


// ----------мерч-изображения----------//
export type TAddImagePayload = {
  image: File | Blob;
  is_main: boolean;
};

export type TAddImageRequest = TUpdateRequest & {
  payload: TAddImagePayload;
};

export type TAddImageResponse = {
  id: number;
  image: string;
  is_main: boolean;
};

export type TUpdateImagePayload = {
  image_id: string;
  image: File | Blob;
  is_main: boolean;
};

export type TUpdateImageRequest = TUpdateRequest & {
  payload: TUpdateImagePayload;
};

export type TDeleteImageRequest = {
  id: number;
  image_id: number;
};


// ----------треки----------//
export type TShowcaseTrack = {
  id: number;
  artist_name: string | null;
  name: string;
  album: number;
  duration: number | null;
  position: number | null;
  price: string;
  allow_overpay: boolean;
  image: string | null;
  is_favorite: boolean;
};


// ----------бонусы----------//
export type TBonusItem = {
  id: number;
  name: string;
};