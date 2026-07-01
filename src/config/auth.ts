import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import VkProvider from "next-auth/providers/vk";
import YandexProvider from "next-auth/providers/yandex";
import { cookies } from "next/headers";



import { getCurrentUser, isTokenValid, logInUser, logOutUser, refreshToken, socialAuth } from "@/entities/user";

export const authConfig: AuthOptions = {
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID as string,
      clientSecret: process.env.YANDEX_SECRET as string,
      authorization: {
        url: 'https://oauth.yandex.ru/authorize',
        params: {
          scope: 'login:email',
          response_type: 'code',
          access_type: 'offline',
          prompt: 'select_account',
        },
      }
    },
  ),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID as string,
      clientSecret: process.env.VK_SECRET as string,
      authorization: {
        url: 'https://id.vk.com/authorize',
        params: {
          scope: 'email offline',
          response_type: 'code',
          v: '5.131',
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
        sessionId: { type: "text" },
      },
      async authorize(credentials, req) {
        const reqWithHeaders = req as { headers?: { cookie?: string } };
        const cookieHeader = reqWithHeaders?.headers?.cookie || "";
        const match = cookieHeader.match(/sessionid=([^;]+)/);
        const sessionId = match ? match[1] : null;

        console.log("=== ID ГОСТЯ НА СЕРВЕРЕ ===", sessionId);

        if (!credentials?.password || !credentials.identifier) {
          return null;
        }

        try {
          const loginData = {
            email: credentials.identifier.trim(),
            password: credentials.password,
            sessionId: sessionId,
          };
          const tokens = await logInUser(loginData);

          if (!tokens.access) {
            return null;
          }

          const user = await getCurrentUser(tokens.access);

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
          };
        } catch (error: unknown) {
          console.log("Ошибка аутентификации", error);
          throw new Error(error instanceof Error ? error.message : "Ошибка аутентификации");
        }
      },
    }),
  ],

  callbacks: {
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
      }

      if (account && (account?.provider === 'vk' || account?.provider === 'yandex' )) {
        
        try {
          const res = await socialAuth({
            provider: account.provider,
            access_token: account.access_token ?? "",
          });

          if (res.access) {
            token.accessToken = res.access;
            token.refreshToken = res.refresh;

            const userFromServer = await getCurrentUser(token.accessToken);

            if (userFromServer) {
              //перезаписать данные о пользователе в token
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
          
        } catch (error) {
          token.accessToken = undefined;
          token.refreshToken = undefined;
          console.log('Ошибка проверки на бэкенде:', error)
        }
      }

      if (token.accessToken && !(await isTokenValid(token.accessToken))) {
        console.log("Token expired, refreshing...");

        try {
          const refreshed = await refreshToken(token.refreshToken as string);

          token.accessToken = refreshed.access;
          token.refreshToken = refreshed.refresh;

          console.log("Token successfully updated");
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);

          token.accessToken = undefined;
          token.refreshToken = undefined;
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
          console.error('Failed to revoke refresh token on backend:', error);
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
