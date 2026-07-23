import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type {
  ListenerMe, 
  UpdateListenerPayload 
} from "../model/types";

const LISTENER_ME_PATH = "/v1/listener/me";
const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getCurrentListener(token?: string): Promise<ListenerMe> {
  const url = `${baseURL}${LISTENER_ME_PATH}`;

  const response = await authFetchClient<ListenerMe>(url, {
    method: "GET"
  },
    token
  )

  if (!response) {
    throw new Error('Не удалось получить профиль слушателя');
  }

  return response;
};

export async function updateListener(data: UpdateListenerPayload, token?: string): Promise<ListenerMe> {

  const url = `${baseURL}${LISTENER_ME_PATH}`;

  const response = await authFetchClient<ListenerMe>(url, {
    method: "PATCH",
    body: JSON.stringify(data)
  },
    token
  )

  if (!response) {
    throw new Error('Не удалось обновить профиль слушателя');
  }

  return response;
};