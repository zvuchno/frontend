import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getCurrentArtist,
  updateCurrentArtist,
  updateCurrentArtistCover,
} from "../api/currentArtistApi";
import type { UpdateCurrentArtistCoverPayload, UpdateCurrentArtistPayload } from "./types";

// 1. Хук для получения данных артиста (загрузка профиля)
export function useCurrentArtist() {
  return useQuery({
    queryKey: ["currentArtist", "profile"],
    queryFn: () => getCurrentArtist(),
    refetchOnWindowFocus: false,
  });
}

// 2. Хук для обновления своего пофиля артиста
export function useUpdateArtist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCurrentArtistPayload) => updateCurrentArtist(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["currentArtist", "profile"] });
    },
  });
}

// 3. Хук для обновления обложки своего пофиля артиста
export function useUpdateArtistCover() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCurrentArtistCoverPayload) => updateCurrentArtistCover(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["currentArtist", "profile"] });
    },
  });
}
