import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { 
  UpdateAccountPasswordPayload, 
  UpdateAccountPasswordResponse, 
  UpdateAccountPhonePayload, 
  UpdateAccountPhoneResponse, 
  UpdateAccountUsernamePayload, 
  UpdateAccountUsernameResponse, 
  ListenerMe, 
  UpdateListenerPayload 
} from "../model/types";

const LISTENER_ME_PATH = "/v1/listener/me";
const CURRENT_ACCOUNT_CHANGE_PASSWORD_PATH = "/v1/auth/account/me/change-password";
const CURRENT_ACCOUNT_CHANGE_PHONE_PATH = "/v1/auth/account/me/change-phone";
const CURRENT_ACCOUNT_CHANGE_USERNAME_PATH = "/v1/auth/account/me/change-username";
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

export async function updateAccountPassword(
  payload: UpdateAccountPasswordPayload,
  token?: string
): Promise<UpdateAccountPasswordResponse | null> {

  const response = await authFetchClient<void>(
    `${baseURL}${CURRENT_ACCOUNT_CHANGE_PASSWORD_PATH}`, 
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );

  return response;
};

export async function updateAccountPhone(
  payload: UpdateAccountPhonePayload,
  token?: string
): Promise<UpdateAccountPhoneResponse> {

  const response = await authFetchClient<UpdateAccountPhoneResponse>(
    `${baseURL}${CURRENT_ACCOUNT_CHANGE_PHONE_PATH}`, 
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    token
  );

  if (!response) {
    throw new Error('Не удалось обновить телефон')
  }

  return response;
};

export async function updateAccountUsername(
  payload: UpdateAccountUsernamePayload,
  token?: string
): Promise<UpdateAccountUsernameResponse> {

  const response = await authFetchClient<UpdateAccountUsernameResponse>(
      `${baseURL}${CURRENT_ACCOUNT_CHANGE_USERNAME_PATH}`, 
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      token
    );
  
    if (!response) {
      throw new Error('Не удалось обновить имя пользователя')
    }
  
    return response;
};