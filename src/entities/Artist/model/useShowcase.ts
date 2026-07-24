import type { PaginatedStoreResponse } from "@/api/store/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { TShowcaseAlbums, TShowcaseMerch, TShowcasePromocodes } from "./types";
import { getShowcaseAlbumsList, getShowcaseMerchList, getShowcasePromocodes } from "../api/showcaseApi";
import { useSession } from "next-auth/react";

export function useAlbumsInfiniteQuery({
  artistSlug,
}: {
  artistSlug: string;
}) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcaseAlbums>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcaseAlbums>>
  >({
    queryKey: ["artist", "showcase", "albums"],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getShowcaseAlbumsList({
        token,
        artist: artistSlug,
        url
      });
      return getShowcaseAlbumsList({
        token,
        artist: artistSlug,
      });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!token
  });
};

export function useMerchInfiniteQuery({
  artistSlug,
}: {
  artistSlug: string;
}) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcaseMerch>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcaseMerch>>
  >({
    queryKey: ["artist", "showcase", "albums"],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getShowcaseMerchList({
        token,
        artist: artistSlug,
        url
      });
      return getShowcaseMerchList({
        token,
        artist: artistSlug,
      });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!token
  });
};

export function usePromocodesInfiniteQuery() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcasePromocodes>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcasePromocodes>>
  >({
    queryKey: ["artist", "showcase", "promo"],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getShowcasePromocodes({
        token,
        url
      });
      return getShowcasePromocodes({
        token
      });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!token,
  })
};