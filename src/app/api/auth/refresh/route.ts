import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { refreshUserServerCookie } from "@/entities/user/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies();

  const refreshCookie = cookieStore
    .getAll()
    .find((cookie) => cookie.name.includes("zvuchno_refresh"));

  const accessCookie = cookieStore
    .getAll()
    .find((cookie) => cookie.name.includes("zvuchno_access"));

  if (!refreshCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Определяем тип сессии (нажимал ли пользователь "Запомнить меня")
  const sessionTypeCookie = cookieStore
    .getAll()
    .find((c) => c.name === "zvuchno_session_type");
  const isShortSession = sessionTypeCookie?.value === "short";

  const clearAuthCookies = (status: number, error: string): NextResponse => {
    const response = NextResponse.json({ error }, { status });

    response.cookies.set({
      name: refreshCookie.name,
      value: "",
      expires: new Date(0),
      path: "/",
    });

    if (accessCookie) {
      response.cookies.set({
        name: accessCookie.name,
        value: "",
        expires: new Date(0),
        path: "/",
      });
    }

    return response;
  };

  // проверяем NextAuth session до обращения к backend refresh
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.id || token.error) {
    return clearAuthCookies(401, "Session expired");
  }

  try {
    const backendResponse = await refreshUserServerCookie(refreshCookie.name, refreshCookie.value);

    if (!backendResponse.ok) {
      return clearAuthCookies(401, "Session expired");
    }

    // --- нормализация zvuchno_refresh с учетом нажамал ли пользователь "Запомнить меня" ---
    const rawCookies = backendResponse.headers.getSetCookie();
    const finalCookies: string[] = [];

    let refreshValue: string | undefined = undefined;
    let hasRefreshCookieFromBackend = false;

    // Сначала собираем все куки, кроме zvuchno_refresh
    for (const setCookie of rawCookies) {
      if (setCookie.startsWith("zvuchno_refresh=")) {
        const match = setCookie.match(/zvuchno_refresh=([^;]+)/);
        if (match) {
          refreshValue = match[1];
          hasRefreshCookieFromBackend = true;
        }
        continue;
      }
      finalCookies.push(setCookie);
    }

    const response = NextResponse.json({ ok: true });

    for (const setCookie of finalCookies) {
      response.headers.append("set-cookie", setCookie);
    }

    // подставляем zvuchno_refresh с нужными атрибутами
    if (hasRefreshCookieFromBackend && refreshValue !== undefined) {
      if (isShortSession) {
        // Для short: всегда session cookie (без maxAge/Expires)
        response.headers.append(
          "set-cookie",
          `zvuchno_refresh=${refreshValue}; Path=/; HttpOnly; SameSite=Lax; Secure`
        );
      } else {
        // Ищем оригинальный Set-Cookie и пробрасываем его
        const original = rawCookies.find((c) => c.startsWith("zvuchno_refresh="));
        if (original) {
          response.headers.append("set-cookie", original);
        }
      }
    }

    return response;
  } catch (error) {
    console.error("Backend refresh request failed", error);

    // если backend недоступен - backend-cookies могут остаться валидными,
    // но frontend больше не будет использовать их.
    return clearAuthCookies(503, "Unable to refresh session");
  }
}
