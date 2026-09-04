import "server-only";

import type {
  TCurrentUserResponse,
  TLoginData,
  TNewArtistRequest,
  TNewListenerRequest,
} from "../model/types";

const BASE_URL = process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;

if (!BASE_URL) {
  throw new Error("BACKEND_API_URL is not configured");
}

export const logInUserServerCookie = async (
  userData: TLoginData,
  sessionId?: string
): Promise<Response> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(sessionId ? { Cookie: `sessionid=${sessionId}` } : {}),
  };

  const response = await fetch(`${BASE_URL}/v1/auth/cookie/login/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Неверная почта или пароль");
  }

  return response;
};

export async function getCurrentUserServer(accessToken: string): Promise<TCurrentUserResponse> {
  const response = await fetch(`${BASE_URL}/v1/auth/account/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load current user");
  }

  return (await response.json()) as TCurrentUserResponse;
}

export const logOutUserServerCookie = async (): Promise<void> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${BASE_URL}/v1/auth/cookie/logout/`, {
    method: "POST",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Ошибка выхода из системы");
  }
};

export const refreshUserServerCookie = async (
  cookieName: string,
  cookieValue: string
): Promise<Response> => {
  const headers: Record<string, string> = {
    Cookie: `${cookieName}=${cookieValue}`,
  };

  const response = await fetch(`${BASE_URL}/v1/auth/cookie/refresh/`, {
    method: "POST",
    headers: headers,
    cache: "no-store",
  });

  /*if (!response.ok) {
    devWarn("[ServerCookies] Refresh failed, destroying session:", response.status);
  }

  devLog(`[ServerCookies] Status: ${response.status}`);*/
  return response;
};

export const registerNewListenerServerCookie = async (
  regData: TNewListenerRequest,
  sessionId?: string
): Promise<Response> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(sessionId ? { Cookie: `sessionid=${sessionId}` } : {}),
  };

  const response = await fetch(`${BASE_URL}/v1/auth/register/listener/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(regData),
  });

  if (!response.ok) {
    const res = (await response.json()) as unknown;
    throw new Error(
      res.phone ||
        res.email ||
        res.username ||
        res.password ||
        res.name ||
        res.consents ||
        "Регистрация не удалась"
    );
  }

  return response;
};

export const registerNewArtistServerCookie = async (
  regData: TNewArtistRequest,
  sessionId?: string
): Promise<Response> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(sessionId ? { Cookie: `sessionid=${sessionId}` } : {}),
  };

  const response = await fetch(`${BASE_URL}/v1/auth/register/artist/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(regData),
  });

  if (!response.ok) {
    const res = (await response.json()) as unknown;
    throw new Error(
      res.phone ||
        res.email ||
        res.username ||
        res.password ||
        res.name ||
        res.consents ||
        "Регистрация не удалась"
    );
  }

  return response;
};
