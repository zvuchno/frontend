import { devError } from "@/shared/utils/dev-logger";

export async function clearAllCookies() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    for (const cookie of allCookies) {
      const options: { expires: Date; path: string; secure?: boolean } = {
        expires: new Date(0),
        path: "/",
      };
      if (cookie.name.startsWith("__Secure-") || cookie.name.startsWith("__Host-")) {
        options.secure = true;
      }
      cookieStore.set(cookie.name, "", options);
    }
  } catch (error) {
    devError("[ServerCookies] Error clearing cookies:", error);
  }
}
