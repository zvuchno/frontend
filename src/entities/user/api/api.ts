import { checkAccessToken } from "@/api/authToken";
import {
  type TResetPasswordConfirmRequest,
  type TResetPasswordRequest,
  type TResetPasswordVerifyRequest,
  type TVerifyEmailRequest,
  type TAuthResponse,
  type TCurrentUserResponse,
  type TFetchProps,
  type TLoginData,
  type TLogoutdata,
  type TNewArtistRequest,
  type TNewListenerRequest,
  type TNewUserResponse,
  type TSocialAuthRequest,
  type TSocialAuthResponse,
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
  };

  if (sessionId) {
    headers["Cookie"] = `sessionid=${sessionId}`;
  }

  process.stdout.write(`\n>>> ПОПЫТКА ЛОГИНА. SessionId: ${sessionId || "ОТСУТСТВУЕТ"}\n`);

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

export const refreshToken = async (token: string): Promise<TAuthResponse> => {
  return await createFetchFunction<TAuthResponse>({
    url: "/auth/token/refresh/",
    fetchData: {
      refresh: token,
    },
    defaultMessage: "Ошибка при обновлении сессии",
  });
};

const verifyToken = async (token: string): Promise<void> => {
  return await createFetchFunction<void>({
    url: "/auth/token/verify/",
    fetchData: {
      token: token,
    },
    defaultMessage: "Ошибка верификации токена",
  });
};

export const logOutUser = async (userData: TLogoutdata): Promise<void> => {
  return await createFetchFunction<void>({
    url: "/auth/token/logout/",
    fetchData: userData,
    defaultMessage: "Ошибка при выходе из системы",
  });
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

export const isTokenValid = async (token: string): Promise<boolean> => {
  try {
    await verifyToken(token);
    console.log("Token still valid");
    return true;
  } catch (error) {
    console.log("Token expired or invalid:", error);
    return false;
  }
};

export const verifyEmail = async (data: TVerifyEmailRequest): Promise<void> => {
  return await createFetchFunction<void>({
    url: "/auth/account/verify-email/",
    fetchData: data,
    defaultMessage: "Ошибка подтверждения почты.",
  });
};

export const resendEmailForVerify = async (): Promise<void> => {
  const token = await checkAccessToken();
  const res = await fetch(`${BASE_URL}/v1/auth/account/me/resend-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.detail || "Не удалось отправить письмо");
  }
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