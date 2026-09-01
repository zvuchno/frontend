import toast from "react-hot-toast";

import { getGenresKinds } from "@/api/catalog/genresKindApi/getGenresKinds";
import { getMerchKinds } from "@/api/catalog/merchKindsApi/getMerchKinds";
import type { PaginatedStoreResponse } from "@/api/store/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addImage,
  createAlbum,
  createMerch,
  createPromocode,
  deleteAlbum,
  deleteImage,
  deleteMerch,
  deletePromocode,
  deleteTrack,
  directUpdateTrack,
  directUploadTrack,
  getDetailAlbum,
  getDetailMerch,
  getDetailPromocode,
  getDetailTrack,
  getShowcaseAlbumsList,
  getShowcaseMerchList,
  getShowcasePromocodes,
  getShowcaseTracksList,
  updateAlbum,
  updateImage,
  updateMerch,
  updatePromocode,
  updateTrackInfo,
} from "../api/showcaseApi";
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
  TShowcaseItem,
  TShowcaseMerch,
  TShowcaseMerchDetail,
  TShowcasePromocode,
  TShowcasePromocodeDetail,
  TShowcaseTrack,
  TShowcaseTrackDetail,
  TShowcaseUpdateTrackInfoPayload,
  TUpdateAlbumPayload,
  TUpdateImagePayload,
  TUpdateMerchPayload,
  TUpdatePromocodePayload,
  TUpdateTrackPayload,
  TUploadTrackPayload,
} from "./types";

//-------получение списка для витрины-------//
export function useAlbumsInfiniteQuery({
  artistSlug,
  artist_id,
  itemType,
}: {
  artistSlug: string | null;
  artist_id?: string;
  itemType?: TShowcaseItem;
}) {
  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcaseAlbum>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcaseAlbum>>
  >({
    queryKey: ["artist", "showcase", "albums", artistSlug, artist_id, itemType],
    queryFn: async ({ pageParam }) => {
      const url = pageParam as string | undefined;
      if (url)
        return getShowcaseAlbumsList({
          artist: artistSlug,
          url,
          artist_id,
          itemType,
        });
      return getShowcaseAlbumsList({
        artist: artistSlug,
        artist_id,
        itemType,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!artistSlug,
    staleTime: 10 * 10 * 1000,
  });
}

export function useMerchInfiniteQuery({
  artistSlug,
  in_stock,
  artist_id,
  itemType,
}: {
  artistSlug: string | null;
  in_stock?: boolean | null;
  artist_id?: string;
  itemType?: TShowcaseItem;
}) {
  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcaseMerch>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcaseMerch>>
  >({
    queryKey: ["artist", "showcase", "merch", artistSlug, in_stock, artist_id, itemType],
    queryFn: async ({ pageParam }) => {
      const url = pageParam as string | undefined;
      if (url)
        return getShowcaseMerchList({
          artist: artistSlug,
          url,
          in_stock,
          artist_id,
          itemType,
        });
      return getShowcaseMerchList({
        artist: artistSlug,
        in_stock,
        artist_id,
        itemType,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!artistSlug,
    staleTime: 10 * 10 * 1000,
  });
}

export function usePromocodesInfiniteQuery({
  discount_type,
  is_available,
  artist_id,
  itemType,
}: {
  discount_type?: PromoTypeFilter;
  is_available?: boolean | null;
  artist_id?: string;
  itemType?: TShowcaseItem;
}) {
  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcasePromocode>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcasePromocode>>
  >({
    queryKey: ["artist", "showcase", "promo", discount_type, is_available, artist_id, itemType],
    queryFn: async ({ pageParam }) => {
      const url = pageParam as string | undefined;
      if (url)
        return getShowcasePromocodes({
          url,
          artist_id,
          itemType,
        });
      return getShowcasePromocodes({
        discount_type,
        is_available,
        artist_id,
        itemType,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.next,
    staleTime: 10 * 10 * 1000,
  });
}

//-------обновление товара/промокода-------//
export function useUpdateAlbum() {
  const queryClient = useQueryClient();

  return useMutation<TShowcaseAlbumDetail, Error, { id: number; payload: TUpdateAlbumPayload }>({
    mutationFn: async ({ id, payload }) => {
      return updateAlbum({ id, payload });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "albums"] });
      toast.success("Релиз обновлён");
    },
    onError: () => {
      toast.error("Ошибка обновления релиза");
    },
  });
}

export function useUpdateMerch() {
  const queryClient = useQueryClient();

  return useMutation<TShowcaseMerchDetail, Error, { id: number; payload: TUpdateMerchPayload }>({
    mutationFn: async ({ id, payload }) => {
      return updateMerch({ id, payload });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
      toast.success("Мерч обновлён");
    },
    onError: () => {
      toast.error("Ошибка обновления мерча");
    },
  });
}

export function useUpdatePromocode() {
  const queryClient = useQueryClient();

  return useMutation<
    TShowcasePromocodeDetail,
    Error,
    { id: number; payload: TUpdatePromocodePayload }
  >({
    mutationFn: async ({ id, payload }) => {
      return updatePromocode({ id, payload });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "promo"] });
      toast.success("Промокод обновлён");
    },
    onError: () => {
      toast.error("Ошибка обновления промокода");
    },
  });
}

//-------удаление товара/промокода-------//
export function useDeleteAlbum() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deleteAlbum({ id });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "albums"] });
      toast.success("Релиз удалён");
    },
    onError: () => {
      toast.error("Не удалось удалить релиз");
    },
  });
}

export function useDeleteMerch() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deleteMerch({ id });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
      toast.success("Мерч удалён");
    },
    onError: () => {
      toast.error("Не удалось удалить мерч");
    },
  });
}

export function useDeletePromocode() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deletePromocode({ id });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "promo"] });
      toast.success("Промокод удалён");
    },
    onError: () => {
      toast.error("Не удалось удалить промокод");
    },
  });
}

//-------создание товара/промокода-------//
export function useCreateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateAlbumRequest) => createAlbum(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "albums"] });
      toast.success("Релиз создан");
    },
    onError: () => {
      toast.error("Не удалось создать релиз");
    },
  });
}

export function useCreateMerch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateMerchRequest) => createMerch(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
      toast.success("Мерч создан");
    },
    onError: () => {
      toast.error("Не удалось создать мерч");
    },
  });
}

export function useCreatePromocode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreatePromocodeRequest) => createPromocode(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "promo"] });
      toast.success("Промокод создан");
    },
    onError: () => {
      toast.error("Не удалось создать промокод");
    },
  });
}

//-------получение детальной информации об альбоме(сингле) или мерче (для формы редактирования)-------//
export function useDetailInfo(type: string, id?: number) {
  return useQuery({
    queryKey: ["showcase", "detail", type, id],
    queryFn: async () => {
      return type === "merch" ? getDetailMerch({ id }) : getDetailAlbum({ id });
    },
    enabled: !!id,
  });
}

//-------получение детальной информации о промокоде-------//
export function useDetailPromocode(id?: number) {
  return useQuery({
    queryKey: ["showcase", "detail", "promo", id],
    queryFn: async () => getDetailPromocode({ id }),
    enabled: !!id,
  });
}

//-------получение cписка жанров-------//
export function useGenresList() {
  return useQuery({
    queryKey: ["genres", "list"],
    queryFn: () => getGenresKinds(),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

//-------получение cписка видов мерча-------//
export function useMerchKindsList() {
  return useQuery({
    queryKey: ["merchKind", "list"],
    queryFn: () => getMerchKinds(),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

//-------загрузка изображения для мерча-------//
export function useAddImage() {
  const queryClient = useQueryClient();

  return useMutation<TAddImageResponse, Error, { id: number; payload: TAddImagePayload }>({
    mutationFn: ({ id, payload }) => addImage({ id, payload }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
      toast.success("Изображение добавлено")
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Не удалось добавить изображение';
      toast.error(message)
    },
  });
}

//-------обновление изображения для мерча-------//
export function useUpdateImage() {
  const queryClient = useQueryClient();

  return useMutation<TAddImageResponse, Error, { id: number; payload: TUpdateImagePayload }>({
    mutationFn: ({ id, payload }) => updateImage({ id, payload }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
    },
  });
}

//-------удаление изображения для мерча-------//
export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, TDeleteImageRequest>({
    mutationFn: (data) => deleteImage(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
    },
  });
}

//-------треки-------//
export function useTracksInfiniteQuery(type: string, album?: number) {
  return useInfiniteQuery<
    PaginatedStoreResponse<TShowcaseTrack>,
    Error,
    InfiniteData<PaginatedStoreResponse<TShowcaseTrack>>
  >({
    queryKey: ["showcase", "tracks", album],
    queryFn: async ({ pageParam }) => {
      const url = pageParam as string | undefined;
      if (url)
        return getShowcaseTracksList({
          album,
          url,
        });
      return getShowcaseTracksList({
        album,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!album && type === "album",
    staleTime: 10 * 10 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useDetailTrack(id?: number) {
  return useQuery({
    queryKey: ["showcase", "detail", "track", id],
    queryFn: async () => getDetailTrack({ id }),
    enabled: !!id,
    staleTime: 10 * 10 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useDeleteTrack(album?: number) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deleteTrack({ id });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "tracks", album] });
      toast.success("Трек удалён");
    },
    onError: () => {
      toast.error("Не удалось удалить трек");
    },
  });
}

export function useUpdateTrackInfo(album: number) {
  const queryClient = useQueryClient();

  return useMutation<TShowcaseTrackDetail, Error, TShowcaseUpdateTrackInfoPayload>({
    mutationFn: async (data) => {
      return updateTrackInfo(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "tracks", album] });
      toast.success("Информация о треке обновлена");
    },
    onError: () => {
      toast.error("Ошибка обновления информации о треке");
    },
  });
}

export function useUploadTrack(album: number) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { file: File; data: TUploadTrackPayload }>({
    mutationFn: async ({ file, data }) => {
      return directUploadTrack(file, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "tracks", album] });
      toast.success("Трек загружен");
    },
    onError: (error) => {
      toast.error(`Не удалось загрузить трек: ${error.message}`);
    },
  });
}

export function useUpdateTrack(album: number) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { file: File; data: TUpdateTrackPayload }>({
    mutationFn: async ({ file, data }) => {
      return directUpdateTrack(file, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "tracks", album] });
      toast.success("Файл трека обновлён");
    },
    onError: (error) => {
      toast.error(`Не удалось обновить файл трека: ${error.message}`);
    },
  });
}
