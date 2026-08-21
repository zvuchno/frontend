import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addPickupPointMe,
  changePickupPointMe,
  deletePickupPointMe,
  receivePickupPointsMe,
} from "../api/artistSettings.api";
import { type TPickupPointMe } from "./artistSettings.types";

export function useGetArtistPickupPoints() {
  return useQuery<TPickupPointMe[]>({
    queryKey: ["artist-pickup-points"],
    queryFn: () => receivePickupPointsMe(),
    refetchOnWindowFocus: false,
  });
}

export function useAddArtistPickupPoint() {
  const queryClient = useQueryClient();
  return useMutation<TPickupPointMe, Error, TPickupPointMe>({
    mutationFn: (pickupPoint: TPickupPointMe) => addPickupPointMe(pickupPoint),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["artist-pickup-points"] }),
  });
}

export function useChangeArtistPickupPoint() {
  const queryClient = useQueryClient();
  return useMutation<TPickupPointMe, Error, TPickupPointMe>({
    mutationFn: (pickupPoint: TPickupPointMe) => changePickupPointMe(pickupPoint),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["artist-pickup-points"] }),
  });
}

export function useDeleteArtistPickupPoint() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id: number) => deletePickupPointMe(id),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["artist-pickup-points"] }),
  });
}
