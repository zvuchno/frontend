import {
  type TAuthResponse,
  type TCurrentUserResponse,
  type TFetchProps,
  type TLoginData,
  type TLogoutdata,
  type TNewArtistRequest,
  type TNewListenerRequest,
  type TNewUserResponse,
} from "../model/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const createFetchFunction = async <T>(props: TFetchProps): Promise<T> => {
  const endPoint = BASE_URL + "/v1" + props.url;
  const res = await fetch(endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props.fetchData),
  });

  if (!res.ok) {
    const errorData = (await res.json()) as Error;
    throw new Error(errorData.message || props.defaultMessage);
  }
  return (await res.json()) as T;
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

export const logInUser = async (userData: TLoginData): Promise<TAuthResponse> => {
  return await createFetchFunction<TAuthResponse>({
    url: "/auth/token/create/",
    fetchData: userData,
    defaultMessage: "Ошибка авторизации. Проверьте корректность введённых данных.",
  });
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

export const verifyToken = async (token: string): Promise<void> => {
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
