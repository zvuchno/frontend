import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { 
  CurrentAccountResponse, 
  SetAccountPasswordPayload, 
  SetAccountPasswordResponse, 
  UpdateAccountPasswordPayload, 
  UpdateAccountPasswordResponse, 
  UpdateAccountPhonePayload, 
  UpdateAccountPhoneResponse, 
  UpdateAccountUsernamePayload, 
  UpdateAccountUsernameResponse 
} from "../model/types";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
const CURRENT_ACCOUNT_PATH = "/v1/auth/account/me";
const CURRENT_ACCOUNT_CHANGE_PASSWORD_PATH = `${CURRENT_ACCOUNT_PATH}/change-password/`;
const CURRENT_ACCOUNT_CHANGE_PHONE_PATH = `${CURRENT_ACCOUNT_PATH}/change-phone/`;
const CURRENT_ACCOUNT_CHANGE_USERNAME_PATH = `${CURRENT_ACCOUNT_PATH}/change-username/`;
const CURRENT_ACCOUNT_SET_PASSWORD_PATH = `${CURRENT_ACCOUNT_PATH}/set-password/`;


export async function getCurrentAccount(token?: string): Promise<CurrentAccountResponse> {
  const response =  await authFetchClient<CurrentAccountResponse>(`${baseURL}${CURRENT_ACCOUNT_PATH}`, {
    method: "GET"
  },
    token
  );

  if (!response) {
    throw new Error('Не удалось получить профиль пользователя');
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

export async function setAccountPassword(
  payload: SetAccountPasswordPayload,
  token?: string
): Promise<SetAccountPasswordResponse | null> {

  const response = await authFetchClient<void>(
    `${baseURL}${CURRENT_ACCOUNT_SET_PASSWORD_PATH}`, 
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );

  return response;
};