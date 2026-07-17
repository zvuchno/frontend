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
  const { data: session, status } = useSession();
  const token = session?.user.accessToken;
  const isSessionLoading = status === "loading";
  const isAuthorized = !!token;

  return useQuery<TCart>({
    queryKey: [...cartQueryKeys.current(), isAuthorized],
    queryFn: getCart.bind(null, token),
    ...options,
    enabled: options?.enabled !== false && !isSessionLoading,
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const isAuthorized = !!token;

  return useMutation<TCart, Error, TCartItem>({
    mutationFn: (item: TCartItem) => addCartItem(item, token),
    onSuccess: (newCart) => {
      queryClient.setQueryData([...cartQueryKeys.current(), isAuthorized], newCart);
      toast.success("Товар добавлен в корзину");
    },
    onError: (error) => {
      toast.success(`Ошибка добавления товара в корзину: ${error.message}`);
    },
  });
}

export function useUpdateCart() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const isAuthorized = !!token;

  return useMutation<TCart, Error, Partial<TCartItem>>({
    mutationFn: (item) => updateCart({ items: [item] }, token),
    onSuccess: (newCart) => {
      queryClient.setQueryData([...cartQueryKeys.current(), isAuthorized], newCart);
      toast.success("Количество товара в корзине изменено");
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const isAuthorized = !!token;

  return useMutation<void, Error, number, { previousCart: TCart | undefined }>({
    mutationFn: (variantId: number) => removeCartItem(variantId, token),
    onMutate: async (variantId) => {
      await queryClient.cancelQueries({ queryKey: [...cartQueryKeys.current(), isAuthorized] });

      const previousCart = queryClient.getQueryData<TCart>([
        ...cartQueryKeys.current(),
        isAuthorized,
      ]);

      if (previousCart) {
        const updatedItems = previousCart.items.filter(
          (item) => item.product_variant !== variantId
        );

        queryClient.setQueryData<TCart>([...cartQueryKeys.current(), isAuthorized], {
          ...previousCart,
          items: updatedItems,
        });
      }
      return { previousCart };
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...cartQueryKeys.current(), isAuthorized] });
      toast.success("Товар удален из корзины");
    },
    onError: (err, variantId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData([...cartQueryKeys.current(), isAuthorized], context.previousCart);
      }
      toast.error("Не удалось удалить товар");
    },
  });
}

export function useApplyCartPromoCode() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const isAuthorized = !!token;

  return useMutation({
    mutationFn: (code: string) => applyCartPromoCode(code, token),
    onSuccess: (newCart) => {
      queryClient.setQueryData([...cartQueryKeys.current(), isAuthorized], newCart);

      toast.success("Промокод успешно применен");
    },
    onError: (error) => {
      toast.error(error.message || "Не удалось применить промокод");
    },
  });
}

export function useRemoveCartPromoCode() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const isAuthorized = !!token;

  return useMutation({
    mutationFn: () => removeCartPromoCode(token),
    onSuccess: (newCart) => {
      queryClient.setQueryData([...cartQueryKeys.current(), isAuthorized], newCart);

      toast.success("Промокод удален");
    },
  });
}
