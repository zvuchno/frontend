import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  //ищем токен (если есть)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = Boolean(token?.id && !token.error);

  const isArtist = token?.isArtist;
  const isListener = token?.isListener;

  const { pathname } = request.nextUrl;

  const authAppUrl = "/signin";

  const protectedRouts = ["/artist", "/fans", "/order", "/verify/verify-email"];

  const serviceRoutes = [
    "/forgot-password",
    "/reset-password-confirm",
    "/signin",
    "/signup",
  ];

  const isProtectedRoute = protectedRouts.some((route) => pathname.startsWith(route));

  const isServiceRoute = serviceRoutes.some((route) => pathname.startsWith(route));

  // Авторизованный на маршруте сервиса авторизации → на главную
  if (isAuth && isServiceRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //неавторизованный пользователь пытается зайти по защищенному маршруту -> переадресация на /signin,
  if (isProtectedRoute && !isAuth) {
    const loginUrl = new URL(authAppUrl, request.url);
    //а потом на нужную страницу
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Проверка ролей для защищенных разделов
  if (isAuth && pathname.startsWith("/artist") && !isArtist) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuth && pathname.startsWith("/fans") && !isListener && !isArtist) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|csv|docx|pdf)$).*)",
  ],
};
