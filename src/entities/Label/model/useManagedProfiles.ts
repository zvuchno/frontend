import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  type UpdateCurrentArtistCoverPayload,
  type UpdateCurrentArtistCoverResponse,
  type UpdateCurrentArtistPayload,
} from "@/entities/profile/index.js";

import {
  changeManagedProfileCover,
  changeManagedProfileDetails,
  createManagedProfile,
  getManagedProfileDetails,
  getManagedProfiles,
} from "../api/managed-profiles.api.ts";
import { type TManagedProfile, type TManagedProfileDetails } from "./types.js";

export function useGetManagedProfiles(profileType?: "artist" | "label") {
  return useQuery({
    queryKey: ["label", "managedProfiles"],
    queryFn: () => getManagedProfiles(),
    enabled: profileType === "label",
    staleTime: 30 * 60 * 1000,
  });
}

export function useGetManagedProfileDetails(id: string) {
  return useQuery({
    queryKey: ["managed-artist-profile", id],
    queryFn: () => getManagedProfileDetails(id),
    enabled: !!id,
  });
}

export function useCreateManagedProfile() {
  const queryClient = useQueryClient();

  return useMutation<TManagedProfile, Error, TManagedProfile>({
    mutationFn: (profile: TManagedProfile) => createManagedProfile(profile),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["label", "managedProfiles"],
      });
    },
  });
}

type TManagedProfileChange = {
  id: string;
  profile: UpdateCurrentArtistPayload;
};

export function useChangeManagedProfile() {
  const queryClient = useQueryClient();

  return useMutation<TManagedProfileDetails, Error, TManagedProfileChange>({
    mutationFn: ({ id, profile }: TManagedProfileChange) =>
      changeManagedProfileDetails(id, profile),
    onSuccess: (data, variables) => {
      const detailQueryKey = ["managed-artist-profile", variables.id];

      queryClient.setQueryData<TManagedProfileDetails>(detailQueryKey, (currentProfile) =>
        currentProfile ? { ...currentProfile, ...data } : data
      );
      void queryClient.invalidateQueries({ queryKey: detailQueryKey });
      void queryClient.invalidateQueries({
        queryKey: ["label", "managedProfiles"],
      });
      toast.success(`Данные артиста ${data.name} успешно изменены`);
    },
  });
}

type TManagedProfileCoverChange = {
  id: string;
  payload: UpdateCurrentArtistCoverPayload;
};

export function useChangeManagedProfileCover() {
  const queryClient = useQueryClient();

  return useMutation<UpdateCurrentArtistCoverResponse, Error, TManagedProfileCoverChange>({
    mutationFn: ({ id, payload }: TManagedProfileCoverChange) =>
      changeManagedProfileCover(id, payload),
    onSuccess: (data, variables) => {
      const detailQueryKey = ["managed-artist-profile", variables.id];

      queryClient.setQueryData<TManagedProfileDetails>(detailQueryKey, (currentProfile) =>
        currentProfile ? { ...currentProfile, ...data } : currentProfile
      );
      void queryClient.invalidateQueries({ queryKey: detailQueryKey });
      void queryClient.invalidateQueries({
        queryKey: ["label", "managedProfiles"],
      });
    },
  });
}
