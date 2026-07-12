import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import {
  type TAuthResponse,
  type TCurrentUserResponse,
  type TFetchProps,
  type TLoginData,
  type TLogoutdata,
  type TNewArtistRequest,
  type TNewListenerRequest,
  type TNewUserResponse,
  type TResetPasswordConfirmRequest,
  type TResetPasswordRequest,
  type TResetPasswordVerifyRequest,
  type TSocialAuthRequest,
  type TSocialAuthResponse,
  type TVerifyEmailRequest,
} from "../model/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const createFetchFunction = async <T>(props: TFetchProps): Promise<T> => {
  const endPoint = BASE_URL + "/v1" + props.url;
  const res = await fetch(endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props.fetchData),
  });

  const data = await res.json();
  if (!res.ok) {
    // console.error("Server error:", res.statusText);
    // console.error("Server message:", data.message || data.detail);
    throw new Error(
      data.message ||
        data.detail ||
        data.phone ||
        data.email ||
        data.token ||
        data.uid ||
        props.defaultMessage
    );
  }
  return data as T;
};

export const registerNewArtist = async (regData: TNewArtistRequest): Promise<TNewUserResponse> => {
  return await createFetchFunction<TNewUserResponse>({
    url: "/auth/register/artist/",
    fetchData: regData,
    defaultMessage: "Регистрация не удалась. Попробуйте снова",
  });
};

export const registerNewListener = async (
  regData: TNewListenerRequest
): Promise<TNewUserResponse> => {
  return await createFetchFunction<TNewUserResponse>({
    url: "/auth/register/listener/",
    fetchData: regData,
    defaultMessage: "Регистрация не удалась. Попробуйте снова",
  });
};

export const logInUser = async (
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

  if (!response.ok) {
    throw new Error(`Ошибка логина: статус ${response.status}`);
  }

  return response.json() as Promise<TAuthResponse>;
};

// Получение информации о токене
export const getTokenExp = (token: string | null): { exp: number; isValid: boolean } | null => {
  if (!token) return null;

  try {
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp * 1000;
    const isValid = Date.now() > exp;

    return {
      exp,
      isValid,
    }
  } catch {
    return null;
  }
};

// обновление токена 
export const refreshAccessToken = async (refreshToken: string): Promise<{ access: string }> => {
  const res = await fetch(`${BASE_URL}/v1/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await  res.json();

  if (!res.ok) throw new Error(data.detail);

  return data; // { accessToken }
};

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
};

export const getCurrentUser = async (token: string): Promise<TCurrentUserResponse> => {
  const res = await fetch(`${BASE_URL}/v1/auth/account/me/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = (await res.json()) as Error;
    throw new Error(errorData.message);
  }
  return (await res.json()) as TCurrentUserResponse;
};

export const verifyEmail = async (data: TVerifyEmailRequest): Promise<void> => {
  return await createFetchFunction<void>({
    url: "/auth/account/verify-email/",
    fetchData: data,
    defaultMessage: "Ошибка подтверждения почты.",
  });
};

export const resendEmailForVerify = async (): Promise<void> => {
  await authFetchClient<void>('/v1/auth/account/me/resend-email', {
    method: 'POST',
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

export const socialAuth = async (data: TSocialAuthRequest): Promise<TSocialAuthResponse> => {
  return await createFetchFunction<TSocialAuthResponse>({
    url: `/auth/social/${data.provider}/`,
    fetchData: data,
    defaultMessage: `Ошибка авторизации через ${data.provider}`,
  });
};
