import { type User } from "next-auth";
import { TServerAuthResponse } from "../model/types.serverCookie";
import { applyCookiesFromResponse } from "./applyCookiesFromResponse";
import { getCurrentUserServer } from "../api/api.serverCookie";
import { TConsent } from "../model/types";

const BASE_URL = process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;

export type OAuthResult =
  | { status: "ok"; user: User }
  | { status: "registration_required" }
  | { status: "error" };

export const OAuthorize = async ({ 
  token,
  provider,
  create_account = false,
  consents
 }: {
  token: string,
  provider: "vk" | "yandex",
  create_account?: boolean,
  consents?: TConsent[]
 }
): Promise<OAuthResult> => {
  try {
    const payload = {
      access_token: token,
      create_account,
      ...(consents && { consents }),
    };
    
    const res = await fetch(`${BASE_URL}/v1/auth/social/${provider}/`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.error_code === "registration_required") {
        return { status: "registration_required" };
      }
      return { status: "error" };
    }

    // const [body, cookiesData] = await Promise.all([
    //   res.json() as Promise<TServerAuthResponse>,
    //   applyCookiesFromResponse(res.headers, true),
    // ]);

    const body = await res.json() as TServerAuthResponse;

    if (!body.authenticated) {
      return { status: "error" };
    }

    const cookiesData = await applyCookiesFromResponse(res.headers, true);

    const { accessToken } = cookiesData;

    if (!accessToken) {
      return { status: "error" };
    }

    const userFromServer = await getCurrentUserServer(accessToken);

    if (!userFromServer) {
      return { status: "error" };
    }

    return {
      status: "ok",
      user: {
        id: String(userFromServer.id),
        userName: userFromServer.username,
        email: userFromServer.email,
        phone: userFromServer.phone,
        isPhoneVerified: userFromServer.is_phone_verified,
        isEmailVerified: userFromServer.is_email_verified,
        isArtist: userFromServer.is_artist,
        isListener: userFromServer.is_listener,
        profileType: userFromServer.profile_type,
        artistName: userFromServer.artist_name,
      },
    };
  } catch (error) {
    console.error("Критическая ошибка в OAuthorize:", error);
    return { status: "error" };
  }
};