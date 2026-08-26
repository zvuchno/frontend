import type { User } from "next-auth";
import { TNewArtistRequest, TNewListenerRequest, TNewListenerResponse, TNewUserResponse } from "../model/types";
import { 
  getCurrentUserServer, 
  registerNewArtistServerCookie, 
  registerNewListenerServerCookie 
} from "../api/api.serverCookie";

import { applyCookiesFromResponse } from "./applyCookiesFromResponse";

type TRegData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  name: string;
  profile_type: string;
}

export const authAfterRegister = async ({
  regData,
  regType,
  sessionId
}: {
  regData: TRegData;
  regType: string;
  sessionId?: string
}): Promise<User | null> => {
  try {
    
    let res: Response;

    if (regType === "listener") {
      const payload: TNewListenerRequest = {
        username: regData.username,
        email: regData.email,
        phone: regData.phone,
        password: regData.password
      }
      res = await registerNewListenerServerCookie(payload, sessionId);

    } else if (regType === "artist") {
      const payload: TNewArtistRequest = {
        username: regData.username,
        email: regData.email,
        phone: regData.phone,
        password: regData.password,
        profile_type: regData.profile_type as "artist" | "label",
        name: regData.name,
      }
      res = await registerNewArtistServerCookie(payload, sessionId);
      
    } else {
      return null;
    }

    const [body, cookiesData] = await Promise.all([
      res.json() as Promise<TNewUserResponse | TNewListenerResponse>,
      applyCookiesFromResponse(res.headers, true),
    ]);

    const { accessToken } = cookiesData;

    if (!accessToken || !body.id) {
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
    throw new Error(error instanceof Error ? error.message : "Критическая ошибка в authAfterRegister");
  }
};