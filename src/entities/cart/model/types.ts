export type TCartItem = {
  product_variant: number;
  quantity: number;
  price_with_donation: string | null;
  comment: string;
  is_artist_subscription: boolean;
};

export interface UpdateCartPayload {
  items: Partial<TCartItem>[]
}

export interface CartItemRespond extends Omit<TCartItem, "comment" | "price_with_donation"> {
  artist_name: string;
  name: string;
  kind: string;
  base_line_total: string;
  discount_line_total: string;
  stock: number;
  image: string;
  target: {
    type: string;
    url: string;
    selected_variant_id: number;
  };
}

export type TCart = {
  items: CartItemRespond[];
  subtotal: string;
  discount_promocode?: string;
  total: string;
};
