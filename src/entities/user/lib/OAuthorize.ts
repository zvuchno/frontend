import { type User } from "next-auth";
import { TServerAuthResponse } from "../model/types.serverCookie";
import { applyCookiesFromResponse } from "./applyCookiesFromResponse";
import { getCurrentUserServer } from "../api/api.serverCookie";

const BASE_URL = process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;

export const OAuthorize = async (code: string): Promise<User | null> => {
  try {
    const res = await fetch(`${BASE_URL}/v1/auth/social/yandex/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!res || !res.ok) {
      return null;
    }

    const [body, cookiesData] = await Promise.all([
      res.json() as Promise<TServerAuthResponse>,
      applyCookiesFromResponse(res.headers),
    ]);

    if (!body.authenticated) {
      return null;
    }

    const { accessToken } = cookiesData;

    console.log('accessToken:', accessToken)
    console.log('body:', body)

    if (!accessToken) {
      return null;
    }

    const userFromServer = await getCurrentUserServer(accessToken);

    if (!userFromServer) {
      return null;
    }

    return {
      id: String(userFromServer.id),
      userName: userFromServer?.username,
      email: userFromServer?.email,
      phone: userFromServer?.phone,
      isPhoneVerified: userFromServer?.is_phone_verified,
      isEmailVerified: userFromServer?.is_email_verified,
      isArtist: userFromServer?.is_artist,
      isListener: userFromServer?.is_listener,
      profileType: userFromServer?.profile_type,
      artistName: userFromServer?.artist_name,
    };
  } catch (error) {
    console.error("Критическая ошибка в OAuthorize:", error);
    return null;
  }
};