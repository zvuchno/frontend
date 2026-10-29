import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBonus, getBonusList, getDetailBonus, updateBonus } from "../api/bonuses.api";
import type { TCreateBonusPayload, TCreateBonusResponse, TUpdateBonusPayload } from "./types";
import toast from "react-hot-toast";

export function useBonuslist(albumId: number) {
  return useQuery({
    queryKey: ["showcase", "bonuses", albumId],
    queryFn: () => getBonusList(),
    refetchOnWindowFocus: false,
  });
};

export function useDetailBonus(id?: number) {
  return useQuery({
    queryKey: ["showcase", "detail", "bonus", id],
    queryFn: async () => getDetailBonus({ id }),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export function useCreateBonus() {
  const queryClient = useQueryClient();

  return useMutation<TCreateBonusResponse, Error, { payload: TCreateBonusPayload }>({
    mutationFn: ({ payload }) => createBonus(payload),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "bonuses", data.album] });
      toast.success("Бонус создан");
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 5000,
      })
    },
  });
};

export function useUpdateBonus() {
  const queryClient = useQueryClient();

  return useMutation<TCreateBonusResponse, Error, { bonusId: number, payload: TUpdateBonusPayload }>({
    mutationFn: ({ bonusId, payload }) => updateBonus(payload, bonusId),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "bonuses", data.album] });
      toast.success("Бонус обновлён");
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 5000,
      })
    },
  });
};