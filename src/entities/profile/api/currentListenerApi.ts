import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import type { ListenerMe, UpdateListenerPayload } from "../model/types";

const LISTENER_ME_PATH = "/v1/listener/me";
const baseURL = "/api/backend";

export async function getCurrentListener(): Promise<ListenerMe> {
  const url = `${baseURL}${LISTENER_ME_PATH}`;

  const response = await authFetchClient<ListenerMe>(url, {
    method: "GET",
  });

  if (!response) {
    throw new Error("Не удалось получить профиль слушателя");
  }

  return response;
}

export async function updateListener(data: UpdateListenerPayload): Promise<ListenerMe> {
  const url = `${baseURL}${LISTENER_ME_PATH}`;

  const response = await authFetchClient<ListenerMe>(url, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response) {
    throw new Error("Не удалось обновить профиль слушателя");
  }

  return response;
}
