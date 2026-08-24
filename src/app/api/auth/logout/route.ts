import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;

const isBackendAuthCookie = (name: string): boolean =>
  name === "zvuchno_access" || name.startsWith("zvuchno_refresh");

export async function POST(): Promise<NextResponse> {
  const cookieStore = await cookies();

  const authCookies = cookieStore.getAll().filter((cookie) => isBackendAuthCookie(cookie.name));

  const cookieHeader = authCookies.map(({ name, value }) => `${name}=${value}`).join("; ");

  let backendLogoutSucceeded = false;

  try {
    const backendResponse = await fetch(`${BASE_URL}/v1/auth/cookie/logout/`, {
      method: "POST",
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      cache: "no-store",
    });

    backendLogoutSucceeded = backendResponse.ok;
  } catch (error) {
    console.error("Backend logout request failed", error);
  }

  // Всегда разлогиниваем пользователя в frontend (даже если бекенд недоступен / 502)
  const response = NextResponse.json({
    ok: true,
    backendLogoutSucceeded,
  });

  const cookiesToClear = [
    ...authCookies,
    cookieStore.getAll().find((c) => c.name === "zvuchno_session_type"),
  ].filter(Boolean) as { name: string }[];

  for (const cookie of cookiesToClear) {
    response.cookies.set({
      name: cookie.name,
      value: "",
      expires: new Date(0),
      path: "/",
    });
  }

  return response;
}
