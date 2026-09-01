import { cookies } from "next/headers";

import { devError } from "@/shared/utils/dev-logger";

import { parseBackendSetCookie } from "./parseBackendSetCookie";

// Записывает куки из Set-Cookie заголовков в браузер и возвращает значения токенов для сессии
export async function applyCookiesFromResponse(resHeaders: Headers, rememberMe: boolean): Promise<{
  accessToken: string | undefined;
  refreshToken: string | undefined;
  refreshTokenCookieName: string | undefined;
}> {
  const parsed = resHeaders
    .getSetCookie()
    .map(parseBackendSetCookie)
    .filter((cookie): cookie is NonNullable<typeof cookie> => cookie !== null);

  if (parsed.length === 0) {
    return {
      accessToken: undefined,
      refreshToken: undefined,
      refreshTokenCookieName: undefined,
    };
  }

  let accessToken: string | undefined;
  let refreshToken: string | undefined;
  let refreshTokenCookieName: string | undefined;

  for (const cookie of parsed) {
    if (cookie.name === "zvuchno_access") {
      accessToken = cookie.value;
    }

    if (cookie.name.includes("zvuchno_refresh")) {
      refreshToken = cookie.value;
      refreshTokenCookieName = cookie.name;
    }
  }

  try {
    const cookieStore = await cookies();

    cookieStore.delete("zvuchno_session_type");

    if (!rememberMe) {
      cookieStore.set({
        name: "zvuchno_session_type",
        value: "short",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
    }

    for (const cookie of parsed) {
      const isBackendAuthCookie =
        cookie.name === "zvuchno_access" || cookie.name === refreshTokenCookieName;

      // Если это refresh-кука и «Запомнить меня» НЕ выбрано — убираем время жизни
      if (isBackendAuthCookie && !rememberMe) {
        delete cookie.maxAge;
        delete cookie.expires;
      }

      cookieStore.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        path: cookie.path ?? "/",
        expires: cookie.expires,
        maxAge: cookie.maxAge,
      });
    }
  } catch (e) {
    devError("[ServerCookies] applyCookiesFromResponse: failed to set server cookies", e);
  }

  return { accessToken, refreshToken, refreshTokenCookieName };
}
