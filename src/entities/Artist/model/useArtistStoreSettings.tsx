import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { manageStoreSettings, receiveStoreSettings } from "../api/artistSettings.api";
import { type TStoreSettings } from "./artistSettings.types";

export function useGetArtistStoreSettings() {
  return useQuery<TStoreSettings>({
    queryKey: ["artist-store-settings"],
    queryFn: () => receiveStoreSettings(),
    refetchOnWindowFocus: false,
  });
}

export function useManageArtistStoreSettings() {
  const queryClient = useQueryClient();

  return useMutation<TStoreSettings, Error, TStoreSettings>({
    mutationFn: (settings: TStoreSettings) => manageStoreSettings(settings),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["artist-store-settings"] }),
  });
}
