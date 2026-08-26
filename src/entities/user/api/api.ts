import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import { getErrorMessage } from "@/api/errors/getErrorMessage";

import {
  type TFetchProps,
  type TResetPasswordConfirmRequest,
  type TResetPasswordRequest,
  type TResetPasswordVerifyRequest,
  type TVerifyEmailRequest,
} from "../model/types";

const BASE_URL = "/api/backend";

export const createFetchFunction = async <T>(props: TFetchProps): Promise<T> => {
  const endPoint = BASE_URL + "/v1" + props.url;
  const res = await fetch(endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props.fetchData),
  });

  const contentType = res.headers.get("content-type") ?? "";

  const data: unknown = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    throw new Error(getErrorMessage(data, `HTTP ${res.status} ${res.statusText}`));
  }

  return data as T;
};

// export const registerNewArtist = async (regData: TNewArtistRequest): Promise<TNewUserResponse> => {
//   return await createFetchFunction<TNewUserResponse>({
//     url: "/auth/register/artist/",
//     fetchData: regData,
//     defaultMessage: "Регистрация не удалась. Попробуйте снова",
//   });
// };

// не используется после перехода на HTTP-Only cookie
/*export const logInUser = async (
  userData: TLoginData,
  sessionId?: string
): Promise<TAuthResponse> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(sessionId ? { Cookie: `sessionid=${sessionId}` } : {}),
  };

  const response = await fetch(`${BASE_URL}/v1/auth/token/create/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.detail || data.password || data.email || "Неверная почта или пароль"
    );
  }

  return data as Promise<TAuthResponse>;
};*/

// не используется после перехода на HTTP-Only cookie
// Получение информации о токене
/*export const getTokenExp = (token: string | null): { exp: number; isValid: boolean } | null => {
  if (!token) return null;

  try {
    const parts = token.split(".");
    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp * 1000;
    const isValid = Date.now() > exp;

    return {
      exp,
      isValid,
    };
  } catch {
    return null;
  }
};*/

// не используется после перехода на HTTP-Only cookie
/*
// обновление токена
export const refreshAccessToken = async (refreshToken: string): Promise<{ access: string }> => {
  const res = await fetch(`${BASE_URL}/v1/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.detail);

  return data; // { accessToken }
};*/

// не используется после перехода на HTTP-Only cookie
/*
export const logOutUser = async (userData: TLogoutdata): Promise<void> => {
  const endPoint = BASE_URL + "/v1" + "/auth/token/logout/";
  const res = await fetch(endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (res.status === 400) {
    throw new Error(res.statusText || "Ошибка при выходе из системы");
  }
};*/

export const verifyEmail = async (data: TVerifyEmailRequest): Promise<void> => {
  return await createFetchFunction<void>({
    url: "/auth/account/verify-email/",
    fetchData: data,
    defaultMessage: "Ошибка подтверждения почты.",
  });
};

// Верификация почты по коду из письма
// export const verifyEmailCode = async (code: string): Promise<{ detail: string }> => {
//   return await createFetchFunction<{ detail: string }>({
//     url: "/auth/account/me/verify-email-code/",
//     fetchData: code,
//     defaultMessage: "Ошибка подтверждения почты.",
//   });
// };

export const resendEmailForVerify = async (): Promise<void> => {
  await authFetchClient<void>("/api/backend/v1/auth/account/me/resend-email/", {
    method: "POST",
  });
};

export const resetPassword = async (data: TResetPasswordRequest): Promise<void> => {
  return await createFetchFunction<void>({
    url: "/auth/account/reset-password/",
    fetchData: data,
    defaultMessage: "Ошибка запроса смены пароля.",
  });
};

export const resetPasswordVerify = async (data: TResetPasswordVerifyRequest): Promise<void> => {
  return await createFetchFunction<void>({
    url: "/auth/account/reset-password-verify/",
    fetchData: data,
    defaultMessage: "Ссылка для смены пароля не действительна.",
  });
};

export const resetPasswordConfirm = async (data: TResetPasswordConfirmRequest): Promise<void> => {
  return await createFetchFunction<void>({
    url: "/auth/account/reset-password-confirm/",
    fetchData: data,
    defaultMessage: "Ошибка восстановления пароля.",
  });
};

// не используется после перехода на HTTP-Only cookie
/*
export const socialAuth = async (data: TSocialAuthRequest): Promise<TSocialAuthResponse> => {
  return await createFetchFunction<TSocialAuthResponse>({
    url: `/auth/social/${data.provider}/`,
    fetchData: data,
    defaultMessage: `Ошибка авторизации через ${data.provider}`,
  });
};*/

export async function fanBecomeArtist(
  name: string,
  profile_type: "artist" | "label"
): Promise<{ name: string; profile_type: "artist" | "label" }> {
  const response = await authFetchClient<{ name: string; profile_type: "artist" | "label" }>(
    "/api/backend/v1/auth/account/me/become_artist/",
    {
      method: "POST",
      body: JSON.stringify({ name, profile_type }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response) {
    throw new Error(`Попытка стать артистом не удалась `);
  }

  return response;
}
