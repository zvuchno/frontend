"use client";

import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUserStore } from "../../user";
import {
  addCartItem,
  applyCartPromoCode,
  getCart,
  removeCartItem,
  removeCartPromoCode,
  updateCart,
} from "../api/cart.api";
import type { TCart, TCartItem } from "./types";

export const cartQueryKeys = {
  all: ["cart"] as const,
  current: () => [...cartQueryKeys.all, "current"] as const,
  promocode: ["promo"] as const,
};

type UseCartOptions = {
  enabled?: boolean;
};

export function useCart(options?: UseCartOptions) {
  const accessToken = useUserStore((state) => state.user?.accessToken);

  return useQuery<TCart>({
    queryKey: [...cartQueryKeys.current(), { isAuth: !!accessToken }],
    queryFn: () => getCart(accessToken),
    enabled: (options?.enabled ?? true) && !!accessToken,
  });
}

export function useAddCartItem() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation<TCart, Error, TCartItem>({
    mutationFn: (item: TCartItem) => addCartItem(item, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

export function useUpdateCart() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation<TCart, Error, Partial<TCartItem>>({
    mutationFn: (item) => updateCart({ items: [item] }, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

export function useRemoveCartItem() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variantId: number) => removeCartItem(variantId, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
      toast.success("Товар удален из корзины");
    },
  });
}

export function useApplyCartPromoCode() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => applyCartPromoCode(code, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
      toast.success("Промокод успешно применен");
    },
    onError: (error) => {
      toast.error(error.message || "Не удалось применить промокод");
    },
  });
}

export function useRemoveCartPromoCode() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeCartPromoCode(accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
      toast.success("Промокод удален");
    },
  });
}
