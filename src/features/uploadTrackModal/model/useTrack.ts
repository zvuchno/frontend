import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { directUpdateTrack, directUploadTrack, getDetailTrack, updateTrackInfo } from "../api/track.api";
import { TShowcaseTrackDetail, TShowcaseUpdateTrackInfoPayload, TUpdateTrackPayload, TUploadTrackPayload } from "./types";
import toast from "react-hot-toast";

export function useDetailTrack(id?: number) {
  return useQuery({
    queryKey: ["showcase", "detail", "track", id],
    queryFn: async () => getDetailTrack({ id }),
    enabled: !!id,
    refetchOnWindowFocus: false,
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
      toast.error(error.message, {
        duration: 5000,
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
      toast.error(error.message, {
        duration: 5000,
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
      toast.error(error.message, {
        duration: 5000,
      });
    },
  });
}