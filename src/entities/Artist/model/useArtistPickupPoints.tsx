import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { managePickupPointMe, receivePickupPointsMe } from "../api/artistSettings.api";
import { type TPickupSettings } from "./artistSettings.types";

export function useGetArtistPickupPoints() {
  return useQuery<Partial<TPickupSettings>>({
    queryKey: ["artist-pickup-points"],
    queryFn: () => receivePickupPointsMe(),
    refetchOnWindowFocus: false,
  });
}

export function useManageArtistPickupPoint() {
  const queryClient = useQueryClient();
  return useMutation<Partial<TPickupSettings>, Error, Partial<TPickupSettings>>({
    mutationFn: (pickupSettings: Partial<TPickupSettings>) => managePickupPointMe(pickupSettings),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["artist-pickup-points"] }),
  });
}
