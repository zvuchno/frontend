import { getFavoriteProducts } from "@/api/store";
import { type PaginatedStoreResponse, type StoreFavorite } from "@/api/store/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useFavorites() {
  const { status } = useSession();
  const isAuth = status === "authenticated";

  return useQuery<PaginatedStoreResponse<StoreFavorite>>({
    queryKey: ["favorites-catalog"],
    queryFn: () => getFavoriteProducts({ hasLimit: false }),
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: isAuth ? 'always' : false,
    refetchOnWindowFocus: false,
    enabled: isAuth,
  });
};
