import type { PaginatedStoreResponse } from "@/api/store/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { 
  PromoTypeFilter, 
  TAddImagePayload, 
  TAddImageResponse, 
  TCreateAlbumRequest, 
  TCreateMerchRequest, 
  TCreatePromocodeRequest, 
  TDeleteImageRequest, 
  TShowcaseAlbum, 
  TShowcaseAlbumDetail, 
  TShowcaseMerch, 
  TShowcaseMerchDetail, 
  TShowcasePromocode, 
  TShowcasePromocodeDetail,
  TUpdateAlbumPayload,
  TUpdateImagePayload,
  TUpdateMerchPayload,
  TUpdatePromocodePayload,
} from "./types";
import { 
  addImage,
  createAlbum,
  createMerch,
  createPromocode,
  deleteAlbum,
  deleteImage,
  deleteMerch,
  deletePromocode,
  getDetailAlbum,
  getDetailMerch,
  getDetailPromocode,
  getShowcaseAlbumsList, 
  getShowcaseMerchList, 
  getShowcasePromocodes,
  updateAlbum,
  updateImage,
  updateMerch,
  updatePromocode,
} from "../api/showcaseApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { getGenresKinds } from "@/api/catalog/genresKindApi/getGenresKinds";
import { getMerchKinds } from "@/api/catalog/merchKindsApi/getMerchKinds";

//-------получение списка для витрины-------//
export function useAlbumsInfiniteQuery({
  artistSlug,
}: {
  artistSlug: string | null;
}) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcaseAlbum>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcaseAlbum>>
  >({
    queryKey: ['artist', 'showcase', 'albums', artistSlug],
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
  artistSlug: string | null;
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

//-------обновление товара/промокода-------//
export function useUpdateAlbum() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<TShowcaseAlbumDetail, Error, { id: number; payload: TUpdateAlbumPayload }>({
    mutationFn: async ({ id, payload }) => {
      return updateAlbum({ token, id, payload });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'albums'] });
      toast.success("Альбом обновлён")
    },
    onError: () => {
      toast.error('Ошибка обновления альбома')
    }
  })
};

export function useUpdateMerch() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<TShowcaseMerchDetail, Error, { id: number; payload: TUpdateMerchPayload }>({
    mutationFn: async ({ id, payload }) => {
      return updateMerch({ token, id, payload });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'merch'] });
      toast.success("Мерч обновлён")
    },
    onError: () => {
      toast.error('Ошибка обновления мерча')
    }
  })
};

export function useUpdatePromocode() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<TShowcasePromocodeDetail, Error, { id: number; payload: TUpdatePromocodePayload }>({
    mutationFn: async ({ id, payload }) => {
      return updatePromocode({ token, id, payload });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "promo"] });
      toast.success("Промокод обновлён")
    },
    onError: () => {
      toast.error('Ошибка обновления промокода')
    }
  })
};

//-------удаление товара/промокода-------//
export function useDeleteAlbum() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deleteAlbum({ token, id });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'albums'] });
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
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'merch'] });
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
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "promo"] });
      toast.success("Промокод удалён")
    },
    onError: () => {
      toast.error('Не удалось удалить промокод')
    }
  })
};

//-------создание товара/промокода-------//
export function useCreateAlbum() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation({
    mutationFn: (payload: TCreateAlbumRequest) =>
      createAlbum(token, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'albums'] });
      toast.success("Альбом создан создан")
    },
    onError: () => {
      toast.error('Не удалось создать альбом')
    }
  });
};

export function useCreateMerch() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation({
    mutationFn: (payload: TCreateMerchRequest) =>
      createMerch(token, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'merch'] });
      toast.success("Мерч создан")
    },
    onError: () => {
      toast.error('Не удалось создать мерч')
    }
  });
};

export function useCreatePromocode() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation({
    mutationFn: (payload: TCreatePromocodeRequest) =>
      createPromocode(token, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "promo"] });
      toast.success("Промокод создан")
    },
    onError: () => {
      toast.error('Не удалось создать промокод')
    }
  });
};

//-------получение детальной информации об альбоме(сингле) или мерче (для формы редактирования)-------//
export function useDetailInfo(type: string, id?: number) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useQuery({
    queryKey: ['showcase', 'detail', type,  id],
    queryFn: async () => {
      return type === 'merch'
      ? getDetailMerch({ token, id })
      : getDetailAlbum({ token, id });
    },
    enabled: !!token && !!id
  });
};

//-------получение детальной информации о промокоде-------//
export function useDetailPromocode(id?: number) {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useQuery({
    queryKey: ['showcase', 'detail', 'promo', id],
    queryFn: async () => getDetailPromocode({ token, id}),
    enabled: !!token && !!id
  });
};

//-------получение cписка жанров-------//
export function useGenresList() {

  return useQuery({
    queryKey: ['genres', 'list'],
    queryFn: () => getGenresKinds(),
    staleTime: 30 * 60 * 1000
  });
};

//-------получение cписка видов мерча-------//
export function useMerchKindsList() {
  return useQuery({
    queryKey: ['merchKind', 'list'],
    queryFn: () => getMerchKinds(),
    staleTime: 30 * 60 * 1000
  });
};

//-------загрузка изображения для мерча-------//
export function useAddImage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation<TAddImageResponse, Error, { id: number; payload: TAddImagePayload }>({
    mutationFn: ({ id, payload }) =>
      addImage({ token, id, payload }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'merch'] });
      //toast.success("Изображение добавлено")
    },
    onError: () => {
      //toast.error('Не удалось добавить изображение')
    }
  });
};

//-------обновление изображения для мерча-------//
export function useUpdateImage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation<TAddImageResponse, Error, { id: number; payload: TUpdateImagePayload }>({
    mutationFn: ({ id, payload }) =>
      updateImage({ token, id, payload }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'merch'] });
    },
  });
};

//-------удаление изображения для мерча-------//
export function useDeleteImage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation<void, Error, TDeleteImageRequest>({
    mutationFn: (data) =>
      deleteImage(token, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['artist', 'showcase', 'merch'] });
    },
  });
};