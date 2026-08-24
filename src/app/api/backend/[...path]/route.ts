import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import {
  createBackendPath,
  getCookiePair,
  getUnauthorizedSessionResponse,
  setBackendCookieHeader,
  setCsrfHeaders,
} from "@/entities/user";
import { refreshUserServerCookie } from "@/entities/user/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const ALLOWED_PREFIXES = [
  "v1/store/",
  "v1/artists/",
  "v1/listener/",
  "v1/invitations/",
  "v1/compliance/",
  "v1/auth/account/",
  "v1/auth/register/",
  "v1/auth/social/",
];

const PROTECTED_PREFIXES = [
  "v1/auth/account/me/",
  "v1/store/me/",
  "v1/store/orders",
  "v1/store/payments/",
  "v1/artists/me/",
  "v1/listener/me/",
  "v1/invitations/",
  "v1/compliance/",
  "v1/store/merch/",
  "v1/store/albums/",
  "v1/store/promocodes/",
];

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  const { path } = await context.params;

  const transformedPath = createBackendPath(path);
  const pathForMatch = transformedPath["pathForMatch"];
  const backendPath = transformedPath["backendPath"];

  const cookieStore = await cookies();

  // проверка что маршрут разрешен для данного proxy
  if (!ALLOWED_PREFIXES.some((prefix) => pathForMatch.startsWith(prefix))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Определяем тип сессии (нажимал ли пользователь "Запомнить меня")
  const sessionTypeCookie = cookieStore
    .getAll()
    .find((c) => c.name === "zvuchno_session_type");
  const isShortSession = sessionTypeCookie?.value === "short";

  //проверем есть ли токен
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // проверка если корзина уже авторизованного ранее пользователя или гостевая (у ранее авторизованного пользователя после истечения access не кэшируется пустая корзина)
  const isFrontendAuthenticated = Boolean(token?.id && !token.error);
  const isCartPath = pathForMatch.startsWith("v1/store/cart/");

  // проверка - это защищенный маршрут?
  const requiresSession = PROTECTED_PREFIXES.some((prefix) => pathForMatch.startsWith(prefix));

  getUnauthorizedSessionResponse(requiresSession, isFrontendAuthenticated);

  // Корзина доступна гостю, но для уже залогиненного пользователя нельзя подменять его корзину гостевой
  const needsBackendAuth = requiresSession || (isCartPath && isFrontendAuthenticated);
  const isForwardedCookie = (name: string): boolean =>
    name === "zvuchno_access" ||
    name === "zvuchno_refresh" ||
    name === "csrftoken" ||
    (isCartPath && name === "sessionid");

  const backendCookies = new Map(
    cookieStore
      .getAll()
      .filter((cookie) => isForwardedCookie(cookie.name))
      .map((cookie) => [cookie.name, cookie.value])
  );

  const refreshSetCookies: string[] = [];
  let didRefreshInBff = false;

  const refreshBackendCookies = async (): Promise<boolean> => {
    const refreshToken = backendCookies.get("zvuchno_refresh");

    if (!refreshToken) return false;

    try {
      const refreshResponse = await refreshUserServerCookie("zvuchno_refresh", refreshToken);

      if (!refreshResponse.ok) return false;

      for (const setCookie of refreshResponse.headers.getSetCookie()) {
        refreshSetCookies.push(setCookie);

        const pair = getCookiePair(setCookie);
        if (pair) backendCookies.set(pair[0], pair[1]);
      }

      didRefreshInBff = true;
      return backendCookies.has("zvuchno_access");
    } catch (error) {
      console.error("BFF refresh failed", error);
      return false;
    }
  };

  if (
    needsBackendAuth &&
    !backendCookies.has("zvuchno_access") &&
    !(await refreshBackendCookies())
  ) {
    return NextResponse.json(
      { error: "Невозможно обновить zvuchno_access токен" },
      { status: 401 }
    );
  }

  // создание заголовков
  const backendHeaders = new Headers();

  setBackendCookieHeader(backendCookies, backendHeaders);

  const contentType = request.headers.get("content-type");

  if (contentType) {
    backendHeaders.set("content-type", contentType);
  }

  const hasBody = !["GET", "HEAD"].includes(request.method);

  const isUnsafeMethod = !["GET", "HEAD", "OPTIONS"].includes(request.method);

  if (isUnsafeMethod) {
    setCsrfHeaders(cookieStore, backendHeaders);
  }

  const body = hasBody ? await request.arrayBuffer() : undefined;

  const sendToBackend = (): Promise<Response> =>
    fetch(`${BASE_URL}/${backendPath}${request.nextUrl.search}`, {
      method: request.method,
      headers: backendHeaders,
      body,
      cache: "no-store",
    });

  let backendResponse = await sendToBackend();

  // access-cookie существует, но JWT внутри уже отклонён backend-ом
  const shouldRefreshAfter401 =
    needsBackendAuth && backendResponse.status === 401 && !didRefreshInBff;

  if (shouldRefreshAfter401) {
    if (await refreshBackendCookies()) {
      setBackendCookieHeader(backendCookies, backendHeaders);

      backendResponse = await sendToBackend();
    }
  }

  const response = new NextResponse(backendResponse.body, {
    status: backendResponse.status,
  });

  const responseContentType = backendResponse.headers.get("content-type");

  if (responseContentType) {
    response.headers.set("content-type", responseContentType);
  }

  // --- нормализация zvuchno_refresh с учетом нажамал ли пользователь "Запомнить меня" ---
  const rawCookies = [
    ...refreshSetCookies,
    ...backendResponse.headers.getSetCookie(),
  ];
  const finalSetCookies: string[] = [];

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
    finalSetCookies.push(setCookie);
  }

  // Подставляем zvuchno_refresh с нужными атрибутами
  if (hasRefreshCookieFromBackend && refreshValue !== undefined) {
    if (isShortSession) {
      // Для short: всегда session cookie (без maxAge/Expires)
      finalSetCookies.push(
        `zvuchno_refresh=${refreshValue}; Path=/; HttpOnly; SameSite=Lax; Secure`
      );
    } else {
      // Ищем оригинальный Set-Cookie и пробрасываем его
      const original = rawCookies.find((c) => c.startsWith("zvuchno_refresh="));
      if (original) {
        finalSetCookies.push(original);
      }
    }
  }

  for (const setCookie of finalSetCookies) {
    response.headers.append("set-cookie", setCookie);
  }
  return response;
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
