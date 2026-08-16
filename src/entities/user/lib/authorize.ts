import { type User } from "next-auth";

import { getCurrentUserServer, logInUserServerCookie } from "../api/api.serverCookie";
import { type TLoginData } from "../model/types";
import { type AuthResponse } from "../model/types.serverCookie";
import { applyCookiesFromResponse } from "./applyCookiesFromResponse";

export const authorize = async (dataReq: TLoginData): Promise<User | null> => {
  try {
    const res = await logInUserServerCookie(dataReq);

    if (!res || !res.ok) {
      return null;
    }

    const [body, cookiesData] = await Promise.all([
      res.json() as Promise<AuthResponse>,
      applyCookiesFromResponse(res.headers),
    ]);

    const { accessToken } = cookiesData;
    const finalAccessToken = accessToken ?? body.access_token;

    const userFromServer = await getCurrentUserServer(finalAccessToken);

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
    console.error("Критическая ошибка в authorize:", error);
    return null;
  }
};
