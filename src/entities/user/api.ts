import { TAuthResponse, TCurrentUserResponse, TLoginData, TLogoutdata, TNewArtistRequest, TNewListenerRequest, TNewUserResponse } from "./types";

const BASE_URL=process.env.NEXT_PUBLIC_BASE_API_URL;


export const registerNewArtist = async (regData: TNewArtistRequest): Promise<TNewUserResponse> => {
  const res = await fetch (`${BASE_URL}/v1/auth/register/artist/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(regData),
    })
  
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.detail || 'Регистрация не удалась') 
  }

  return data as TNewUserResponse
}

export const registerNewListener = async (regData: TNewListenerRequest): Promise<TNewUserResponse> => {
  const res = await fetch (`${BASE_URL}/v1/auth/register/listener/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(regData),
    })
  
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.detail || 'Регистрация не удалась') 
  }

  return data as TNewUserResponse
}

export const logInUser = async (userData: TLoginData): Promise<TAuthResponse> => {
  const res = await fetch (`${BASE_URL}/v1/auth/token/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.message || 'Ошибка авторизации');
  }

  return data as TAuthResponse;
}

export const logOutUser = async (userData: TLogoutdata) => {
  const res = await fetch (`${BASE_URL}/v1/auth/token/logout/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.message || 'Ошибка авторизации');
  }
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

