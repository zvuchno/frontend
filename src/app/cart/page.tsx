import { type Metadata } from "next";

import { CartPage } from "@/screens/cart";

export const metadata: Metadata = {
  title: "Корзина | ЗВУЧНО",
  openGraph: {
    title: "Корзина | ЗВУЧНО",
  },
};

function Cart() {
  return <CartPage />;
}

export default Cart;
