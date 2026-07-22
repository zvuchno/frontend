import { 
  useMutation, 
  useQuery, 
  useQueryClient 
} from "@tanstack/react-query";

import { useSession } from "next-auth/react";

import { 
  getCurrentArtist, 
  updateCurrentArtist, 
  updateCurrentArtistCover 
} from "../api/currentArtistApi";

import type { 
  UpdateCurrentArtistCoverPayload, 
  UpdateCurrentArtistPayload 
} from "./types";

// 1. Хук для получения данных артиста (загрузка профиля)
export function useCurrentArtist() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useQuery({
    queryKey: ['currentArtist', 'profile'],
    queryFn: () => getCurrentArtist(token),
    enabled: !!token,
  });
};

// 2. Хук для обновления своего пофиля артиста
export function useUpdateArtist() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation({
    mutationFn: (payload: UpdateCurrentArtistPayload) =>
      updateCurrentArtist(payload, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['currentArtist', 'profile'] });
    },
  });
};

// 3. Хук для обновления обложки своего пофиля артиста
export function useUpdateArtistCover() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation({
    mutationFn: (payload: UpdateCurrentArtistCoverPayload) =>
      updateCurrentArtistCover(payload, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['currentArtist', 'profile'] });
    },
  });
}