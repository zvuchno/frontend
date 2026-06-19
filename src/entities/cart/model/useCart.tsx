"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCart,
  applyCartPromoCode,
  removeCartPromoCode,
} from "../api/cart.api";
import type { TCart, TCartItem } from "./types";
import { useUserStore } from "@/entities/user/store/useUserStore";

export const cartQueryKeys = {
  all: ["cart"] as const,
  current: () => [...cartQueryKeys.all, "current"] as const,
};

type UseCartOptions = {
  enabled?: boolean;
};

export function useCart(options?: UseCartOptions) {
  const accessToken = useUserStore((state) => state.user?.accessToken);

  return useQuery<TCart>({
    queryKey: [...cartQueryKeys.current(), accessToken],
    queryFn: () => getCart(accessToken),
    enabled: options?.enabled ?? true,
  });
}

export function useAddCartItem() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation<TCart, Error, TCartItem>({
    mutationFn: (item: TCartItem) => addCartItem(item, accessToken),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartQueryKeys.current(), cart);
    },
  });
}

export function useUpdateCart() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation<TCart, Error, Partial<TCartItem>>({
    mutationFn: (item: Partial<TCartItem>) => updateCart(item, accessToken),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartQueryKeys.current(), cart);
    },
  });
}

export function useRemoveCartItem() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variantId: number) => removeCartItem(variantId, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

export function useApplyCartPromoCode() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => applyCartPromoCode(code, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

export function useRemoveCartPromoCode() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeCartPromoCode(accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}
