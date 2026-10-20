import toast from "react-hot-toast";

import { getGenresKinds } from "@/api/catalog/genresKindApi/getGenresKinds";
import { getMerchKinds } from "@/api/catalog/merchKindsApi/getMerchKinds";
import { ApiError } from "@/api/errors/apiError";
import type { PaginatedStoreResponse } from "@/api/store/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addImage,
  changeTracksOrder,
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

const showErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) {
    toast.error(error.message, {
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось обновить релиз"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось обновить мерч"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось обновить промокод"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось удалить релиз"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось удалить мерч"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось удалить промокод"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
    },
  });
}

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

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось создать релиз"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
    },
  });
}

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

      let message = "Не удалось создать мерч";

      if (error.message.includes("Введите правильное число")) {
        message = "Укажите количество товара";
      }

      toast.error(message, {
        duration: 8000,
      });
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось создать промокод"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
    staleTime: 0,
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
      toast.success("Изображение добавлено");
    },
    onError: (error) => {
      showErrorMessage(error);

      const message = error.message ?? "Не удалось добавить изображение";
      toast.error(message);
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Ошибка обновления изображений"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось удалить изображение"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
    },
  });
}

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
}

export function useDetailTrack(id?: number) {
  return useQuery({
    queryKey: ["showcase", "detail", "track", id],
    queryFn: async () => getDetailTrack({ id }),
    enabled: !!id,
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось удалить трек"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
    onError: (error) => {
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось обновить информацию о треке"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
      showErrorMessage(error);

      const errorMessage = error.message.includes("HTTP")
        ? "Не удалось загрузить трек"
        : error.message;
      toast.error(errorMessage, {
        duration: 8000,
      });
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
      showErrorMessage(error);

      toast.error(`Не удалось обновить файл трека: ${error.message}`, {
        duration: 8000,
      });
    },
  });
}

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

      toast.error(`Не удалось обновить порядок треков: ${error.message}`, {
        duration: 8000,
      });
    },
  });
}
