import { useMutation, useQuery } from "@tanstack/react-query";

import { manageSupportData, receiveSupportData } from "../api/artistSettings.api";
import { type TSupportSettings } from "./artistSettings.types";

export function useGetArtistSupportContacts() {
  return useQuery<TSupportSettings>({
    queryKey: ["artist-support-contacts"],
    queryFn: () => receiveSupportData(),
    refetchOnWindowFocus: false,
  });
}

export function useManageArtistSupportContacts() {
  return useMutation<TSupportSettings, Error, TSupportSettings>({
    mutationFn: (contacts: TSupportSettings) => manageSupportData(contacts),
  });
}
