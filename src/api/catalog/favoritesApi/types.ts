export type TAddToFavoriteRequest = {
  id: number;
  product_variant: number;
};

export type TAddToFavoriteResponse = {
  product_variant: number;
};

export type TDeleteFavoriteRequest = {
  id: number;
};