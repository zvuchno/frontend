type TSize = {
  name: string,
  isAvailable: boolean,
};

type TProduct = {
  id: number;
  name: string;
  images: string[];
  description: string;
  delivery: string;
  refund: string;
  artistImage: string;
  artistName: string;
  itemNumber?: string;
  price?: number;
  sizes?: TSize[];
};

export interface ProductDescriptionProps {
  variant: 'album' | 'merch';
  product: TProduct;
};