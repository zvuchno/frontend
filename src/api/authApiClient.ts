import { getSession, signOut } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Специальный тип для ошибки о частых запросах
class RateLimitError extends Error {
  retryAfterMs: number;
  constructor(retryAfterMs: number) {
    super('Rate limit exceeded');
    this.retryAfterMs = retryAfterMs;
    this.name = 'RateLimitError';
  }
};

// Получение информации о токене (для отладки)
export const getTokenInfo = (token: string | null): { exp: number; isValid: boolean } | null => {
  if (!token) return null;

  try {
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp * 1000;

    return {
      exp,
      isValid: exp > Date.now()
    }
  } catch {
    return null;
  }
};

// Проверка валидности токена
const isTokenValid = (token: string | undefined): boolean => {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const payload = JSON.parse(atob(parts[1]));
    const exp = payload.exp * 1000;
    return exp * 1000 > Date.now();

  } catch {
    return false;
  }
};

// обновление токена 
const refreshToken = async (refreshToken: string) => {
  const res = await fetch(`${baseURL}/v1/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) throw new Error('Refresh failed');

  return res.json(); // { accessToken, refreshToken }
};

// Парсинг Retry-After: число (секунды) или HTTP-дата
const parseRetryAfter = (header: string | null): number => {
  if (!header) return 3000; // fallback 3 сек
  const num = Number(header);
  if (!Number.isNaN(num)) return num * 1000;
  // HTTP-date: "Mon, 29 Mar 2021 04:58:00 GMT"
  const date = Date.parse(header);
  if (!Number.isNaN(date)) {
    const now = Date.now();
    const diff = date - now;
    return Math.max(0, diff);
  }
  return 3000;
};

export const authApiFetch = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {

  const session = await getSession();

  // Если токен истёк — пробуем обновить ДО запроса
  if (session?.user.accessToken && !isTokenValid(session?.user.accessToken)) {

    try {
      const data = await refreshToken(session.user.refreshToken!)
      session.user.accessToken = data.accessToken;
      session.user.refreshToken = data.refreshToken;

    } catch {
      // Не удалось обновить — разлогиниваем
      await signOut();
      throw new Error('Session expired');
    }
    
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  };

  if (session?.user.accessToken) {
    headers['Authorization'] = `Bearer ${session.user.accessToken}`;
  }

  const res = await fetch(input, { ...init, headers });

  //Обработка 401 — с одной попыткой retry после refresh
  if (res.status === 401) {
    if (session?.user.refreshToken) {
      try {
        const data = await refreshToken(session.user.refreshToken);
        session.user.accessToken = data.accessToken;
        session.user.refreshToken = data.refreshToken;

        // Повторяем запрос с новым токеном
        const retryRes = await fetch(input, {
          ...init,
          headers: {
            ...headers,
            'Authorization': `Bearer ${data.accessToken}`,
          }
        });

        if (retryRes.ok) {
          return retryRes.json() as Promise<T>;
        }
        // Если повтор не помог — разлогиниваем
        await signOut();
        throw new Error('Session invalid after refresh');

      } catch {
        await signOut();
        throw new Error('Unauthorized');
      }
    } else {
      await signOut();
      throw new Error('Unauthorized');
    }
  }

  // Обработка 429 — с учётом Retry-After 
  if (res.status === 429) {
    const retryAfterMs = parseRetryAfter(res.headers.get('retry-after'));

    // использовать для перезапроса
    // или информирования пользователя о том, что слишком много запросов
    throw new RateLimitError(retryAfterMs);
  }

  if (!res.ok) {
    const data = await res.json();
    throw new Error(
      data.message ||
        data.detail ||
        data.phone ||
        data.email ||
        data.token ||
        data.uid ||
        `HTTP ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
};
