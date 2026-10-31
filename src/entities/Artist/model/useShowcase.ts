import toast from "react-hot-toast";

import { getGenresKinds } from "@/api/catalog/genresKindApi/getGenresKinds";
import { getMerchKinds } from "@/api/catalog/merchKindsApi/getMerchKinds";
import { ApiError } from "@/api/errors/apiError";
import type { PaginatedStoreResponse } from "@/api/store/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addImage,
  changeBonusesOrder,
  changeTracksOrder,
  createAlbum,
  createMerch,
  createPromocode,
  deleteAlbum,
  deleteBonus,
  deleteImage,
  deleteMerch,
  deletePromocode,
  deleteTrack,
  getDetailAlbum,
  getDetailMerch,
  getDetailPromocode,
  getShowcaseAlbumsList,
  getShowcaseBonusesList,
  getShowcaseMerchList,
  getShowcasePromocodes,
  getShowcaseTracksList,
  updateAlbum,
  updateImage,
  updateMerch,
  updatePromocode,
} from "../api/showcaseApi";
import type {
  PromoTypeFilter,
  TAddImagePayload,
  TAddImageResponse,
  TBonusItem,
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
  TUpdateAlbumPayload,
  TUpdateImagePayload,
  TUpdateMerchPayload,
  TUpdatePromocodePayload,
} from "./types";

const showErrorMessage = (error: unknown) => {
  if (error instanceof ApiError || error instanceof Error) {
    let messageToShow = error.message;
    if (messageToShow.includes("Введите правильное число")) {
      messageToShow = "Укажите количество товара";
    }
    toast.error(messageToShow, {
      duration: 8000,
    });
    return;
  }
  return;
};

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
    //staleTime: 10 * 10 * 1000,
  });
};

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
};

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
};

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
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

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
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

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
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

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
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

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
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

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
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

//-------создание товара/промокода-------//
export function useCreateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateAlbumRequest) => createAlbum(payload),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "albums"] });
      const successMessage = data.is_published ? "Релиз создан" : "Релиз добавлен в черновик";
      toast.success(successMessage);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

export function useCreateMerch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateMerchRequest) => createMerch(payload),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
      const successMessage = data.is_published ? "Мерч создан" : "Мерч добавлен в черновик";
      toast.success(successMessage);
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

export function useCreatePromocode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreatePromocodeRequest) => createPromocode(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "promo"] });
      toast.success("Промокод создан");
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

//-------получение детальной информации об альбоме(сингле) или мерче (для формы редактирования)-------//
export function useDetailInfo(type: string, id?: number) {
  return useQuery({
    queryKey: ["showcase", "detail", type, id],
    queryFn: async () => {
      return type === "merch" ? getDetailMerch({ id }) : getDetailAlbum({ id });
    },
    enabled: !!id,
    staleTime: 0,
  });
};

//-------получение детальной информации о промокоде-------//
export function useDetailPromocode(id?: number) {
  return useQuery({
    queryKey: ["showcase", "detail", "promo", id],
    queryFn: async () => getDetailPromocode({ id }),
    enabled: !!id,
  });
};

//-------получение cписка жанров-------//
export function useGenresList() {
  return useQuery({
    queryKey: ["genres", "list"],
    queryFn: () => getGenresKinds(),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

//-------получение cписка видов мерча-------//
export function useMerchKindsList() {
  return useQuery({
    queryKey: ["merchKind", "list"],
    queryFn: () => getMerchKinds(),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

//-------загрузка изображения для мерча-------//
export function useAddImage() {
  const queryClient = useQueryClient();

  return useMutation<TAddImageResponse, Error, { id: number; payload: TAddImagePayload }>({
    mutationFn: ({ id, payload }) => addImage({ id, payload }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
      toast.success("Изображение добавлено");
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

//-------обновление изображения для мерча-------//
export function useUpdateImage() {
  const queryClient = useQueryClient();

  return useMutation<TAddImageResponse, Error, { id: number; payload: TUpdateImagePayload }>({
    mutationFn: ({ id, payload }) => updateImage({ id, payload }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

//-------удаление изображения для мерча-------//
export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, TDeleteImageRequest>({
    mutationFn: (data) => deleteImage(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["artist", "showcase", "merch"] });
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

//-------треки-------//
export function useTracksInfiniteQuery(type: string, album?: number | null) {
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
    enabled: !!album && type !== "merch",
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

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
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

export function useChangeTracksOrder(albumId?: number | null) {
  const queryClient = useQueryClient();

  return useMutation<TShowcaseTrack[], Error, { album: number; track_ids: number[] }>({
    mutationFn: async (data: { album: number; track_ids: number[] }) => {
      return changeTracksOrder(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "tracks", albumId] });
      toast.success("Порядок треков обновлён");
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

//------бонусы------//
export function useBonusInfiniteQuery(type: string, album?: number | null) {
  return useInfiniteQuery<
    PaginatedStoreResponse<TBonusItem>,
    Error,
    InfiniteData<PaginatedStoreResponse<TBonusItem>>
  >({
    queryKey: ["showcase", "bonuses", album],
    queryFn: async ({ pageParam }) => {
      const url = pageParam as string | undefined;
      if (url)
        return getShowcaseBonusesList({
          album,
          url,
        });
      return getShowcaseBonusesList({
        album,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!album && type !== "merch",
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export function useDeleteBonus(album?: number) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      return deleteBonus({ id });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "bonuses", album] });
      toast.success("Бонус удалён");
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};

export function useChangeBonusesOrder(albumId?: number | null) {
  const queryClient = useQueryClient();

  return useMutation<TShowcaseTrack[], Error, { album: number; bonus_ids: number[] }>({
    mutationFn: async (data: { album: number; bonus_ids: number[] }) => {
      return changeBonusesOrder(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["showcase", "bonuses", albumId] });
      toast.success("Порядок бонусов обновлён");
    },
    onError: (error) => {
      showErrorMessage(error);
    },
  });
};