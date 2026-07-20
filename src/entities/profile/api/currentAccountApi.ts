import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { CurrentAccountResponse } from "../model/types";

const CURRENT_ACCOUNT_PATH = "/v1/auth/account/me/";
const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

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

