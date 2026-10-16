import { getFavoriteProducts } from "@/api/store";
import { type PaginatedStoreResponse, type StoreFavorite } from "@/api/store/types";
import { useQuery } from "@tanstack/react-query";

export function useFavorites() {
  return useQuery<PaginatedStoreResponse<StoreFavorite>>({
    queryKey: ["favorites-catalog"],
    queryFn: () => getFavoriteProducts({ hasLimit: false }),
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}
