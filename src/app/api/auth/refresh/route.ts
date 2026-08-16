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

    const response = NextResponse.json({ ok: true });

    for (const setCookie of backendResponse.headers.getSetCookie()) {
      response.headers.append("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("Backend refresh request failed", error);

    // если backend недоступен - backend-cookies могут остаться валидными,
    // но frontend больше не будет использовать их.
    return clearAuthCookies(503, "Unable to refresh session");
  }
}
