import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import VkProvider from "next-auth/providers/vk";
import YandexProvider from "next-auth/providers/yandex";
import { cookies } from "next/headers";

import {
  getCurrentUser,
  getTokenExp,
  logInUser,
  logOutUser,
  refreshAccessToken,
  socialAuth,
} from "@/entities/user";

export const authConfig: AuthOptions = {
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID as string,
      clientSecret: process.env.YANDEX_SECRET as string,
      authorization: {
        url: "https://oauth.yandex.ru/authorize",
        params: {
          scope: "login:email",
          response_type: "code",
          access_type: "offline",
          prompt: "select_account",
        },
      }
    }),
    // {
    //   id: 'customVk',
    //   name: 'customVk',
    //   type: 'oauth',
    //   checks: ['pkce'],
    //   authorization: {
    //     url: 'https://id.vk.сom/authorize',
    //     params: {
    //       scope: 'email',
    //       response_type: 'code',
    //       redirect_uri: 'https://dev.zvuchno.space/api/auth/callback/customVk',
    //     },
    //   },
    //   token: {
    //     url: 'https://id.vk.com/oauth2/token',
    //     params: {
    //       code: 'code',
    //       client_id: process.env.VK_CLIENT_ID as string,
    //       //device_id: 'device_id', 
    //       client_secret: process.env.VK_SECRET as string,
    //       grant_type: 'authorization_code',
    //     },
    //   },
    //   profile(token) {
    //     const payload = jwtDecode<{
    //       sub: string;
    //       name?: string;
    //       preferred_username?: string;
    //       email?: string;
    //       picture?: string;
    //     }>(token.id_token);

    //     return {
    //       id: payload.sub,
    //       email: payload.email || '',
    //       //image: payload.picture,
    //       userName: payload.name || payload.preferred_username || '', 
    //       phone: null,
    //       isPhoneVerified: false,
    //       isEmailVerified: !!payload.email,
    //       isArtist: false,
    //       isListener: false,
    //     };
    //   },
    // },
    VkProvider({
      clientId: process.env.VK_CLIENT_ID as string,
      clientSecret: process.env.VK_SECRET as string,
      authorization: {
        url: 'https://id.vk.com/authorize',
        params: {
          scope: 'email',
          //response_type: 'code',
          //v: '5.131',
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
        rememberme: { label: "Remember Me", type: "boolean" },
        sessionId: { type: "text" },
      },
      async authorize(credentials) {
        const cookiesStore = await cookies();
        const sessionId = cookiesStore.get("sessionid")?.value || undefined;

        if (!credentials?.password || !credentials.identifier) {
          return null;
        }

        try {
          const loginData = {
            email: credentials.identifier.trim(),
            password: credentials.password,
          };

          const tokens = await logInUser(loginData, sessionId);

          if (!tokens.access) {
            return null;
          }

          const user = await getCurrentUser(tokens.access);
          // Если пользователь не нажал "Запомнить меня"
          // устанавливаем время, через которое разлогиним пользователя (12 ч)
          const sessionExpires = credentials.rememberme ? null : Date.now() + 12 * 60 * 60 * 1000;
          //получаем срок жизни access токена
          const decodedTokenExp = getTokenExp(tokens.access);

          return {
            id: String(user.id),
            userName: user.username,
            email: user.email,
            phone: user.phone,
            isPhoneVerified: user.is_phone_verified,
            isEmailVerified: user.is_email_verified,
            isArtist: user.is_artist,
            isListener: user.is_listener,
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            sessionExpires,
            accessTokenExpires: decodedTokenExp ? decodedTokenExp.exp : null,
          };
        } catch (error: unknown) {
          console.log("Ошибка аутентификации", error);
          throw new Error(error instanceof Error ? error.message : "Ошибка аутентификации");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'vk' || account?.provider === 'yandex') {
        const res = await socialAuth({
          provider: account.provider,
          access_token: account.access_token ?? "",
        });

        if (res.access) {
          const decodedTokenExp = getTokenExp(res.access);
          user.accessToken = res.access;
          user.refreshToken = res.refresh;
          user.sessionExpires = null;
          user.accessTokenExpires = decodedTokenExp ? decodedTokenExp.exp : null;

          return true;
        }

        return false;
      }
      return true;
    },

    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        token.id = user.id;
        token.userName = user.userName;
        token.email = user.email;
        token.phone = user.phone;
        token.isEmailVerified = user.isEmailVerified;
        token.isPhoneVerified = user.isPhoneVerified;
        token.isListener = user.isListener;
        token.isArtist = user.isArtist;
        token.accessToken = user.accessToken;
        token.artistName = user.artistName;
        token.refreshToken = user.refreshToken;
        token.sessionExpires = user.sessionExpires;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      // получение пользоваетля, авторизованного через vk или yandex, от бэкенда  
      if (account && (account.provider === 'vk' || account.provider === 'yandex')) {
         const userFromServer = await getCurrentUser(token.accessToken ?? '');

         if (userFromServer) {
          token.id = String(userFromServer.id);
          token.userName = userFromServer.username;
          token.email = userFromServer.email;
          token.phone = userFromServer.phone;
          token.isPhoneVerified = userFromServer.is_phone_verified;
          token.isEmailVerified = userFromServer.is_email_verified;
          token.isArtist = userFromServer.is_artist;
          token.isListener = userFromServer.is_listener;
         }
      }

      // Проверка жизни сессии, если rememberme: true
      if (token.sessionExpires) {
        if (Date.now() > token.sessionExpires) {
          token.sessionError = 'SessionExpire';
        } else {
          token.sessionError = '';
        }
      } 

      if (trigger === "update" && session) {
        if ("userName" in session) {
          token.userName = session.userName as string;
        }
        if ("email" in session) {
          token.email = session.email as string;
        }
        if ("phone" in session) {
          token.phone = session.phone as string | null;
        }
        if ("isEmailVerified" in session) {
          token.isEmailVerified = session.isEmailVerified as boolean;
        }
        if ("isPhoneVerified" in session) {
          token.isPhoneVerified = session.isPhoneVerified as boolean;
        }
        if ("isListener" in session) {
          token.isListener = session.isListener as boolean;
        }
        if ("isArtist" in session) {
          token.isArtist = session.isArtist as boolean;
        }
        if ("artistName" in session) {
          token.artistName = session.artistName as string | undefined;
        }
      }

      const isExpired = !token.accessTokenExpires ||  Date.now() >= token.accessTokenExpires;
      
      if (isExpired) {
        console.log('***Update Access Token***')
        try {
          if (token.refreshToken) {
            const refreshed = await refreshAccessToken(token.refreshToken);
            const decodedTokenExp = getTokenExp(refreshed.access)?.exp;
            token.accessToken = refreshed.access;
            token.accessTokenExpires = decodedTokenExp ? decodedTokenExp: null;
            token.sessionError = '';
            console.log("***Token successfully updated***");
          } else {
            console.log('No refresh token')
            token.accessToken = undefined;
            token.accessTokenExpires = null;
            token.sessionError = 'RefreshTokenError';
          }
          
        } catch(error) {
          console.error("Token refresh failed:", error);
          token.accessToken = undefined;
          token.accessTokenExpires = null;
          token.sessionError = 'RefreshTokenError';
        }

      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.email = token.email;
        session.user.phone = token.phone;
        session.user.isEmailVerified = token.isEmailVerified;
        session.user.isPhoneVerified = token.isPhoneVerified;
        session.user.isListener = token.isListener;
        session.user.isArtist = token.isArtist;
        session.user.accessToken = token.accessToken;
        session.user.artistName = token.artistName;
        session.user.sessionError = token.sessionError;
      }
      return session;
    },
  },

  events: {
    async signOut({ token }) {
      if (token.refreshToken) {
        try {
          await logOutUser({ refresh: token.refreshToken });
        } catch (error) {
          console.error("Failed to revoke refresh token on backend:", error);
        }
      }
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },
};
