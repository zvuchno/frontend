import { TAuthResponse, TCurrentUserResponse, TFetchProps, TLoginData, TLogoutdata, TNewArtistRequest, TNewListenerRequest, TNewUserResponse, TResetPasswordConfirmRequest, TResetPasswordRequest, TResetPasswordVerifyRequest, TVerifyEmailRequest } from "./types";

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
    throw new Error(data.message || data.detail || data.phone || data.email || data.token ||data.uid || props.defaultMessage) 
  }
  return data as T
}

export const registerNewArtist = async (regData: TNewArtistRequest): Promise<TNewUserResponse> => {
  return await createFetchFunction<TNewUserResponse>(
    { url: '/auth/register/artist/', 
      fetchData: regData,
      defaultMessage: 'Регистрация не удалась. Попробуйте снова'
    }
  )
}

export const registerNewListener = async (regData: TNewListenerRequest): Promise<TNewUserResponse> => {
  return await createFetchFunction<TNewUserResponse>(
    { url: '/auth/register/listener/', 
      fetchData: regData,
      defaultMessage: 'Регистрация не удалась. Попробуйте снова'
    }
  )
}

export const logInUser = async (userData: TLoginData): Promise<TAuthResponse> => {
  return await createFetchFunction<TAuthResponse>(
    { url: '/auth/token/create/', 
      fetchData: userData,
      defaultMessage: 'Ошибка авторизации. Проверьте корректность введённых данных.'
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

export const isTokenValid = async (token: string): Promise<boolean> => {

  try {
    await verifyToken(token);
    console.log('Token still valid');
    return true;
    
  } catch (error) {
    console.log('Token expired or invalid:', error);
    return false;
  }
};

export const verifyEmail = async (data: TVerifyEmailRequest): Promise<void> => {
  return await createFetchFunction<void>(
    { url: '/auth/account/verify-email/', 
      fetchData: data,
      defaultMessage: 'Ошибка подтверждения почты.'
    }
  )
};

export const resendEmailForVerify = async (token: string): Promise<void> => {
  const res = await fetch (`${BASE_URL}/v1/auth/account/me/resend-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error (data.message || data.detail || 'Не удалось отправить письмо')
  }
};

export const resetPassword = async (data: TResetPasswordRequest): Promise<void> => {
  return await createFetchFunction<void>(
    { url: '/auth/account/reset-password/', 
      fetchData: data,
      defaultMessage: 'Ошибка запроса смены пароля.'
    }
  )
}; 

export const resetPasswordVerify = async (data: TResetPasswordVerifyRequest): Promise<void> => {
  return await createFetchFunction<void>(
    { url: '/auth/account/reset-password-verify/', 
      fetchData: data,
      defaultMessage: 'Ссылка для смены пароля не действительна.'
    }
  )
}; 

export const resetPasswordConfirm = async (data: TResetPasswordConfirmRequest): Promise<void> => {
  return await createFetchFunction<void>(
    { url: '/auth/account/reset-password-confirm/', 
      fetchData: data,
      defaultMessage: 'Оибка восстановления пароля.'
    }
  )
}; 