import { getApiAccessToken } from "@/api/authToken";
import { ListenerMe, UpdateListenerPayload } from "./types";

const LISTENER_ME_PATH = "/api/listener/me";

function getListenerApiErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const responseData = data as {
    detail?: unknown;
    message?: unknown;
    non_field_errors?: unknown;
  };

  if (typeof responseData.detail === "string" && responseData.detail) {
    return responseData.detail;
  }

  if (typeof responseData.message === "string" && responseData.message) {
    return responseData.message;
  }

  if (
    Array.isArray(responseData.non_field_errors) &&
    typeof responseData.non_field_errors[0] === "string"
  ) {
    return responseData.non_field_errors[0];
  }

  return null;
}

async function throwListenerApiError(response: Response): Promise<never> {
  let message = `Listener API request failed with status ${response.status}`;
  const responseBody = await response.text();

  if (responseBody) {
    try {
      message =
        getListenerApiErrorMessage(JSON.parse(responseBody)) ?? responseBody;
    } catch {
      message = responseBody;
    }
  }

  throw new Error(message);
}

export async function getCurrentListener(): Promise<ListenerMe> {
  const accessToken = await getApiAccessToken();
  const response = await fetch(LISTENER_ME_PATH, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return throwListenerApiError(response);
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
    return throwListenerApiError(response);
  }

  return response.json();
}

export const getListener = getCurrentListener;
