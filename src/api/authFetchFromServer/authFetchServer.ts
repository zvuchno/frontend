import { RateLimitError } from '../authFetchFromClient/authFetchClient';

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

export const authFetchServer = async <T>(
  input: RequestInfo,
  init?: RequestInit,
  token?: string,
): Promise<T | null> => {

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(input, { ...init, headers });

  //Обработка 401
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  // Обработка 429 — с учётом Retry-After 
  if (res.status === 429) {
    const retryAfterMs = parseRetryAfter(res.headers.get('retry-after'));

    // использовать для перезапроса
    // или информирования пользователя о том, что слишком много запросов
    throw new RateLimitError(retryAfterMs);
  }

  if (res.status === 204 || res.status === 205) {
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
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

  return data as T;
};