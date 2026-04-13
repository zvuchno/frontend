import { ListenerMe, UpdateListenerPayload } from "./types";

function getApiBaseUrl(): string {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_API_URL is not configured");
  }

  return apiBaseUrl;
}

export async function getListener(accessToken: string): Promise<ListenerMe> {
  const apiBaseUrl = getApiBaseUrl();

  const response = await fetch(`${apiBaseUrl}/v1/listener/me/`, {
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
  accessToken: string,
  data: UpdateListenerPayload,
): Promise<ListenerMe> {
  const apiBaseUrl = getApiBaseUrl();

  const response = await fetch(`${apiBaseUrl}/v1/listener/me/`, {
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
