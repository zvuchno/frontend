export type TMerchImage = {
  id: number;
  image: string;
  is_main: boolean;
};

export type TMerchVariant = {
   variant_id: number;
   sku: string; // артикул
   stock: number | null;
   property_value: string; // значение размера: S, L, XL, или цвета
};

export type TDetailMerch = {
  id: number;
  name: string;
  description: string;
  artist_name: string;
  artist_image: string;
  price: number;
  allow_overpay: boolean;
  kind: string; // 'Футболка' , 'Кассета', 'CD', 'Винил LP'
  //album: string | null; // Альбом, с которым связан мерч
  property_name: string; // 'Размер' , 'Цвет
  stock: number; // кол-во
  variants: TMerchVariant[];
  images: TMerchImage[];
};

export interface MerchDescriptionProps {
  product: TDetailMerch;
};