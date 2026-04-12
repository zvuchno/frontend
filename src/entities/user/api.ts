import { TAuthResponse, TCurrentUserResponse, TFetchProps, TLoginData, TLogoutdata, TNewArtistRequest, TNewListenerRequest, TNewUserResponse } from "./types";

const BASE_URL=process.env.NEXT_PUBLIC_BASE_API_URL;

export const createFetchFunction = async <T>(props: TFetchProps): Promise<T> => {
  const endPoint = BASE_URL + '/v1' + props.url;
  const res = await fetch (endPoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(props.fetchData)
  })

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.detail || props.defaultMessage) 
  }
  return data as T
}

export const registerNewArtist = async (regData: TNewArtistRequest): Promise<TNewUserResponse> => {
  return await createFetchFunction<TNewUserResponse>(
    { url: '/auth/register/artist/', 
      fetchData: regData,
      defaultMessage: 'Регистрация не удалась'
    }
  )
}

export const registerNewListener = async (regData: TNewListenerRequest): Promise<TNewUserResponse> => {
  return await createFetchFunction<TNewUserResponse>(
    { url: '/auth/register/listener/', 
      fetchData: regData,
      defaultMessage: 'Регистрация не удалась'
    }
  )
}

export const logInUser = async (userData: TLoginData): Promise<TAuthResponse> => {
  return await createFetchFunction<TAuthResponse>(
    { url: '/auth/token/create/', 
      fetchData: userData,
      defaultMessage: 'Ошибка авторизации'
    }
  )
}

export const refreshToken = async (token: string): Promise<TAuthResponse> => {
  return await createFetchFunction<TAuthResponse>(
    { url: '/auth/token/refresh/', 
      fetchData: {
        refresh: token,
      },
      defaultMessage: 'Ошибка при обновлении сессии'
    }
  )
}

export const verifyToken = async (token: string): Promise<void> => {
  return await createFetchFunction<void>(
    { url: '/auth/token/verify/', 
      fetchData: {
        token: token,
      },
      defaultMessage: 'Ошибка верификации токена'
    }
  )
}

export const logOutUser = async (userData: TLogoutdata): Promise<void> => {
  return await createFetchFunction<void>(
    { url: '/auth/token/logout/', 
      fetchData: userData,
      defaultMessage: 'Ошибка при выходе из системы'
    }
  )
}

export const getCurrentUser = async (token: string): Promise<TCurrentUserResponse>  => {
  const res = await fetch (`${BASE_URL}/v1/auth/account/me/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error (data.message || data.detail || 'Не удалось получить данные пользователя')
  }
  return data as TCurrentUserResponse
}

