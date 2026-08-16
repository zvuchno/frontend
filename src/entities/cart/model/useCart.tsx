"use client";

import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import {
  addCartItem,
  applyCartPromoCode,
  getCart,
  removeCartItem,
  removeCartPromoCode,
  updateCart,
} from "../api/cart.api";
import type { TCart, TCartItem } from "./types";

export type UseCartOptions = {
  enabled?: boolean;
};

export const cartQueryKeys = {
  all: ["cart"] as const,
  current: () => [...cartQueryKeys.all, "current"] as const,
  promocode: ["promo"] as const,
};

export function useCart(options?: UseCartOptions) {
  const { status } = useSession();
  const isSessionLoading = status === "loading";

  return useQuery<TCart>({
    queryKey: [...cartQueryKeys.current()],
    queryFn: getCart.bind(null),
    ...options,
    enabled: options?.enabled !== false && !isSessionLoading,
    refetchOnWindowFocus: false,
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation<TCart, Error, TCartItem>({
    mutationFn: (item: TCartItem) => addCartItem(item),
    onSuccess: (newCart) => {
      queryClient.setQueryData([...cartQueryKeys.current()], newCart);
      toast.success("Товар добавлен в корзину");
    },
    onError: (error) => {
      toast.success(`Ошибка добавления товара в корзину: ${error.message}`);
    },
  });
}

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return useMutation<TCart, Error, Partial<TCartItem>>({
    mutationFn: (item) => updateCart({ items: [item] }),
    onSuccess: (newCart) => {
      queryClient.setQueryData([...cartQueryKeys.current()], newCart);
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, { previousCart: TCart | undefined }>({
    mutationFn: (variantId: number) => removeCartItem(variantId),
    onMutate: async (variantId) => {
      await queryClient.cancelQueries({ queryKey: [...cartQueryKeys.current()] });

      const previousCart = queryClient.getQueryData<TCart>([...cartQueryKeys.current()]);

      if (previousCart) {
        const updatedItems = previousCart.items.filter(
          (item) => item.product_variant !== variantId
        );

        const activeItemsForCalc = updatedItems.filter((item) => item.stock !== 0);

        const updatedSubtotal = activeItemsForCalc.reduce((acc, item) => {
          return acc + Number(item.base_line_total);
        }, 0);

        const updatedTotal = activeItemsForCalc.reduce((acc, item) => {
          return acc + Number(item.discount_line_total);
        }, 0);

        queryClient.setQueryData<TCart>([...cartQueryKeys.current()], {
          ...previousCart,
          items: updatedItems,
          total: updatedTotal.toString(),
          subtotal: updatedSubtotal.toString(),
        });
      }
      return { previousCart };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...cartQueryKeys.current()] });
      toast.success("Товар удален из корзины");
    },
    onError: (err, variantId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData([...cartQueryKeys.current()], context.previousCart);
      }
      toast.error("Не удалось удалить товар");
    },
  });
}

export function useApplyCartPromoCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => applyCartPromoCode(code),
    onSuccess: (newCart) => {
      queryClient.setQueryData([...cartQueryKeys.current()], newCart);

      toast.success("Промокод успешно применен");
    },
    onError: (error) => {
      toast.error(error.message || "Не удалось применить промокод");
    },
  });
}

export function useRemoveCartPromoCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeCartPromoCode(),
    onSuccess: (newCart) => {
      queryClient.setQueryData([...cartQueryKeys.current()], newCart);

      toast.success("Промокод удален");
    },
  });
}
