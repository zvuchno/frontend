import { type TDataForModal } from "@/features/addToCartModal";

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
   is_available_for_purchase: boolean;
};

export type TDetailRelease = {
  id: number;
  artist_name: string;
  artist_image: string | null;
  artist_slug: string;
  release_type: "album" | "ep" | "single";
  variants: TReleaseVariant[];
};

export interface ReleaseDescriptionProps {
  release: TDetailRelease;
  selected_variant_id?: string;
  onClick: (data: TDataForModal) => void;
};