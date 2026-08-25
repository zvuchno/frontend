import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import {
  type UpdateCurrentArtistCoverPayload,
  type UpdateCurrentArtistCoverResponse,
  type UpdateCurrentArtistPayload,
} from "@/entities/profile";

import type {
  TManagedProfile,
  TManagedProfileDetails,
  TManagedProfileResponse,
} from "../model/types";

const baseURL = "/api/backend";
const LABEL_MANAGED_ARTISTS_PATH = `${baseURL}/v1/artists/me/managed-profiles`;

export async function getManagedProfiles(): Promise<TManagedProfileResponse> {
  const response = await authFetchClient<TManagedProfileResponse>(LABEL_MANAGED_ARTISTS_PATH, {
    method: "GET",
  });

  if (!response) {
    throw new Error("Не удалось получить профили артистов");
  }

  return response;
}

export async function createManagedProfile(newProfile: TManagedProfile): Promise<TManagedProfile> {
  const response = await authFetchClient<TManagedProfile>(LABEL_MANAGED_ARTISTS_PATH, {
    method: "POST",
    body: JSON.stringify(newProfile),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response) {
    throw new Error("Не удалось создать артиста для лейбла");
  }

  return response;
}

export async function getManagedProfileDetails(id: string): Promise<TManagedProfileDetails> {
  const response = await authFetchClient<TManagedProfileDetails>(
    `${LABEL_MANAGED_ARTISTS_PATH}/${id}`,
    {
      method: "GET",
    }
  );

  if (!response) {
    throw new Error("Не удалось получить профили артистов");
  }

  return response;
}

export async function changeManagedProfileDetails(
  id: string,
  profileDetails: UpdateCurrentArtistPayload
): Promise<TManagedProfileDetails> {
  const response = await authFetchClient<TManagedProfileDetails>(
    `${LABEL_MANAGED_ARTISTS_PATH}/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(profileDetails),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response) {
    throw new Error("Не удалось обновить профиль артиста");
  }

  return response;
}

export async function changeManagedProfileCover(
  id: string,
  coverUrl: UpdateCurrentArtistCoverPayload
): Promise<UpdateCurrentArtistCoverResponse> {
  const formData = new FormData();
  formData.set("cover", coverUrl.cover);

  const response = await authFetchClient<UpdateCurrentArtistCoverResponse>(
    `${LABEL_MANAGED_ARTISTS_PATH}/${id}/cover`,
    {
      method: "PATCH",
      body: formData,
    }
  );

  if (!response) {
    throw new Error("Не удалось обновить обложку профиля артиста");
  }

  return response;
}
