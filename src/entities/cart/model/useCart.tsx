"use client";

import toast from "react-hot-toast";



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



import { addCartItem, applyCartPromoCode, getCart, removeCartItem, removeCartPromoCode, updateCart } from "../api/cart.api";
import type { TCart, TCartItem } from "./types";



























export type UseCartOptions = {
  enabled?: boolean;
};

export const cartQueryKeys = {
  all: ["cart"] as const,
  current: (token?: string) => [...cartQueryKeys.all, "current", token] as const,
  promocode: ["promo"] as const,
};

export function useCart(token?: string, options?: UseCartOptions) {
  return useQuery<TCart>({
    queryKey: cartQueryKeys.current(token),
    queryFn: () => getCart(token),
    ...options,
    retry: false, // временно, убрать когда ошибка  CORS не будет падать
    refetchOnWindowFocus: false, // временно, убрать когда ошибка  CORS не будет падать
    refetchOnMount: false, // временно, убрать когда ошибка  CORS не будет падать
  });
}

export function useAddCartItem(token?: string) {
  const queryClient = useQueryClient();

  return useMutation<TCart, Error, TCartItem>({
    mutationFn: (item: TCartItem) => addCartItem(item, token),
    onSuccess: (newCart) => {
      queryClient.setQueryData(cartQueryKeys.current(token), newCart);
      toast.success("Товар добавлен в корзину");
    },
    onError: (error) => {
      toast.success(`Ошибка добавления товара в корзину: ${error.message}`);
    },
  });
}

export function useUpdateCart(token?: string) {
  const queryClient = useQueryClient();

  return useMutation<TCart, Error, Partial<TCartItem>>({
    mutationFn: (item) => updateCart({ items: [item] }, token),
    onSuccess: (newCart) => {
      queryClient.setQueryData(cartQueryKeys.current(token), newCart);

      toast.success("Количество товара в корзине изменено");
    },
  });
}

export function useRemoveCartItem(token?: string) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (variantId: number) => removeCartItem(variantId, token),
    onSuccess: (_, variantId) => {
      const previousCart = queryClient.getQueryData<TCart>(cartQueryKeys.current(token));

     if (previousCart) {
       const updatedItems = previousCart.items.filter(
         (item) => item.product_variant !== variantId
       );
       queryClient.setQueryData<TCart>(cartQueryKeys.current(token), {
         ...previousCart,
         items: updatedItems,
       });
     }
      toast.success("Товар удален из корзины");
    },
  });
}

export function useApplyCartPromoCode(token?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => applyCartPromoCode(code, token),
    onSuccess: (newCart) => {
      queryClient.setQueryData(cartQueryKeys.current(token), newCart);
      toast.success("Промокод успешно применен");
    },
    onError: (error) => {
      toast.error(error.message || "Не удалось применить промокод");
    },
  });
}

export function useRemoveCartPromoCode(token?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeCartPromoCode(token),
    onSuccess: (newCart) => {
      queryClient.setQueryData(cartQueryKeys.current(token), newCart);
      toast.success("Промокод удален");
    },
  });
}
