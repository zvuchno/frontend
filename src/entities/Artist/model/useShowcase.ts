import type { PaginatedStoreResponse } from "@/api/store/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  PromoTypeFilter, 
  TShowcaseAlbum, 
  TShowcaseAlbumDetail, 
  TShowcaseMerch, 
  TShowcaseMerchDetail, 
  TShowcasePromocode, 
  TShowcasePromocodeDetail
} from "./types";
import { 
  deleteAlbum,
  deleteMerch,
  deletePromocode,
  getShowcaseAlbumsList, 
  getShowcaseMerchList, 
  getShowcasePromocodes, 
  toggleEnabledPromocode, 
  togglePublishedAlbum, 
  togglePublishedMerch
} from "../api/showcaseApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function useAlbumsInfiniteQuery({
  artistSlug,
}: {
  artistSlug: string;
}) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcaseAlbum>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcaseAlbum>>
  >({
    queryKey: ['artist', 'showcase', 'albums'],
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
    enabled: !!token && !!artistSlug
  });
};

export function useMerchInfiniteQuery({
  artistSlug,
  in_stock,
}: {
  artistSlug: string;
  in_stock?: boolean | null;
}) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcaseMerch>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcaseMerch>>
  >({
    queryKey: ['artist', 'showcase', 'merch'],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getShowcaseMerchList({
        token,
        artist: artistSlug,
        url,
      });
      return getShowcaseMerchList({
        token,
        artist: artistSlug,
        in_stock
      });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!token && !!artistSlug
  });
};

export function usePromocodesInfiniteQuery({
  discount_type,
  is_available,
}: {
  discount_type?: PromoTypeFilter,
  is_available?: boolean | null;
}) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcasePromocode>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcasePromocode>>
  >({
    queryKey: ["artist", "showcase", "promo"],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getShowcasePromocodes({
        token,
        url
      });
      return getShowcasePromocodes({
        token,
        discount_type,
        is_available
      });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!token,
  })
};

export function useToggleAlbumVisibility() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<TShowcaseAlbumDetail, Error, { id: number; is_published: boolean }>({
    mutationFn: async ({ id, is_published }) => {
      return togglePublishedAlbum({ token, id, is_published });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'albums'] });
      toast.success("Видимость альбома обнолвена")
    },
    onError: () => {
      toast.error('Ошибка обновления видимости альбома')
    }
  })
};

export function useToggleMerchVisibility() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<TShowcaseMerchDetail, Error, { id: number; is_published: boolean }>({
    mutationFn: async ({ id, is_published }) => {
      return togglePublishedMerch({ token, id, is_published });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'merch'] });
      toast.success("Видимость мерча обнолвена")
    },
    onError: () => {
      toast.error('Ошибка обновления видимости мерча')
    }
  })
};

export function useToggPromocodeVisibility() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<TShowcasePromocodeDetail, Error, { id: number; is_enabled: boolean }>({
    mutationFn: async ({ id, is_enabled }) => {
      return toggleEnabledPromocode({ token, id, is_enabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "promo"] });
      toast.success("Видимость промокода обнолвена")
    },
    onError: () => {
      toast.error('Ошибка обновления видимости промокода')
    }
  })
};

export function useDeleteAlbum() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deleteAlbum({ token, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'albums'] });
      toast.success("Альбом удалён")
    },
    onError: () => {
      toast.error('Не удалось удалить альбом')
    }
  })
};

export function useDeleteMerch() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deleteMerch({ token, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'merch'] });
      toast.success("Мерч удалён")
    },
    onError: () => {
      toast.error('Не удалось удалить мерч')
    }
  })
};

export function useDeletePromocode() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deletePromocode({ token, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'promo'] });
      toast.success("Промокод удалён")
    },
    onError: () => {
      toast.error('Не удалось удалить промокод')
    }
  })
};