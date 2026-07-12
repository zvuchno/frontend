export type TAddToFavoriteRequest = {
  product_variant: number;
};

export type TDeleteFavoriteRequest = {
  product_variant: number;
};

export type TAddToFavoriteResponse = {
  id: number;
  product_variant: number;
};