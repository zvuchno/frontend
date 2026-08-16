import { useQuery } from "@tanstack/react-query";

import { getManagedProfiles } from "../api/getManagedProfiles";

export function useManagedProfiles(profileType: "artist" | "label" | undefined) {
  return useQuery({
    queryKey: ["label", "managedProfiles"],
    queryFn: () => getManagedProfiles(),
    enabled: profileType === "label",
    staleTime: 30 * 60 * 1000,
  });
}
