// для теста верстки и логики оформления заказа (пока нет ф-ла добавления товара в корзину)

export const mockData = {
  items: [
    {
      product_variant: 159,
      artist_name: "Лунный Подвал",
      name: "Лунный Подвал Longsleeve (L)",
      kind: "Футболка",
      line_total: "2190.00",
      quantity: 1,
      stock: 8,
      is_artist_subscription: false,
      image:
        "https://zvuchno-dev.duckdns.org/media/photos_merch/merch-43_lhEltCE.png",
      target: {
        type: "merch",
        url: "/api/v1/store/catalog/merch/43/",
        selected_variant_id: 159,
      },
    },
    {
      product_variant: 158,
      artist_name: "Лунный Подвал",
      name: "Лунный Подвал Longsleeve (M)",
      kind: "Футболка",
      line_total: "2550.00",
      quantity: 1,
      stock: 18,
      is_artist_subscription: false,
      image:
        "https://zvuchno-dev.duckdns.org/media/photos_merch/merch-43_lhEltCE.png",
      target: {
        type: "merch",
        url: "/api/v1/store/catalog/merch/43/",
        selected_variant_id: 158,
      },
    },
  ],
  subtotal: "4740.00",
  discount_promocode: "0.00",
  total: "4740.00",
};
