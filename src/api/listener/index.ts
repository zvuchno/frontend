import { getApiAccessToken } from "@/api/authToken";
import { ListenerMe, UpdateListenerPayload } from "./types";

const LISTENER_ME_PATH = "/api/listener/me";

export async function getCurrentListener(): Promise<ListenerMe> {
  const accessToken = await getApiAccessToken();
  const response = await fetch(LISTENER_ME_PATH, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch listener data");
  }

  return response.json();
}

export async function updateListener(
  data: UpdateListenerPayload,
): Promise<ListenerMe> {
  const accessToken = await getApiAccessToken();
  const response = await fetch(LISTENER_ME_PATH, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update listener data");
  }

  return response.json();
}

export const getListener = getCurrentListener;
