import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getManagedProfiles } from "../api/getManagedProfiles";

export function useManagedProfiles(profileType: "artist" | "label" | undefined) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useQuery({
    queryKey: ['label', 'managedProfiles'],
    queryFn: () => getManagedProfiles(token),
    enabled: !!token && profileType === 'label',
    staleTime: 30 * 60 * 1000
  });
};