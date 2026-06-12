export type TReleaseImage = {
  id: number;
  image: string;
  is_main: boolean;
};

export type TReleaseVariant = {
   variant_id: number;
   sku: string; // артикул
   stock: number | null;
   property_value: string; // 'Диджитал', 'Кассета', 'Диск', 'Винил'
   name: string;
   description: string;
   price: number;
   allow_overpay: boolean;
   images: TReleaseImage[];
};

export type TDetailRelease = {
  id: number;
  artist_name: string;
  artist_image: string;
  is_single: boolean;
  variants: TReleaseVariant[];
};

export interface ReleaseDescriptionProps {
  release: TDetailRelease;
  selected_variant_id?: number;
};