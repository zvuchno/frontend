import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import YandexProvider from "next-auth/providers/yandex";
import { cookies } from "next/headers";

import {
  OAuthorize,
  authAfterRegister,
  authorize,
  generateState,
  getCurrentUserServer,
  saveOAuthState,
} from "@/entities/user/server";

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
        if (!credentials) return null;

        if (credentials.identifier && credentials.password) {
          const cookieStore = await cookies();
          const sessionId = cookieStore.get("sessionid")?.value;

          return await authorize(
            {
              email: credentials.identifier.trim(),
              password: credentials.password,
              rememberme: credentials.rememberme === "true",
            },
            sessionId
          );
        }

        return null;
      },
    }),
    {
      id: "reg-auth",
      name: "reg-auth",
      type: "credentials",
      credentials: {
        username: { type: "text " },
        email: { type: "text" },
        phone: { type: "text" },
        password: { type: "text" },
        name: { type: "text" },
        profile_type: { type: "text" },
        regType: { type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const bodyConsents = req.body?.consents;
        const consents = bodyConsents.split(',');

        const regData = {
          username: credentials.username,
          email: credentials.email,
          phone: credentials.phone,
          password: credentials.password,
          name: credentials.name,
          profile_type: credentials.profile_type,
          consents
        };

        const cookieStore = await cookies();
        const sessionId = cookieStore.get("sessionid")?.value;

        return await authAfterRegister({
          regData,
          regType: credentials.regType,
          sessionId,
        });
      },
    },
  ],
  session: { strategy: "jwt" },

  pages: { signIn: "/signin" },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "yandex") {
        const result = await OAuthorize({
          provider: account.provider,
          token: account.access_token ?? "",
        });

        if (result.status === "ok") {
          user.id = result.user.id;
          user.userName = result.user.userName;
          user.email = result.user.email;
          user.phone = result.user.phone;
          user.isPhoneVerified = result.user.isPhoneVerified;
          user.isEmailVerified = result.user.isEmailVerified;
          user.isArtist = result.user.isArtist;
          user.isListener = result.user.isListener;
          user.profileType = result.user.profileType;
          user.artistName = result.user.artistName;
          return true;
        }

        if (result.status === 'registration_required') {
          // Пользователя нет — сохраняем токен от провайдера, редиректим на страницу согласий
          const state = generateState();
          saveOAuthState(state, {
            provider: account.provider,
            accessToken: account.access_token ?? '',
          });
          return `/OAuthConsents?state=${state}`;
        }

        // Любая другая ошибка — не пускаем
        return false;
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.userName = user.userName;
        token.email = user.email;
        token.phone = user.phone;
        token.isEmailVerified = user.isEmailVerified;
        token.isPhoneVerified = user.isPhoneVerified;
        token.isListener = user.isListener;
        token.isArtist = user.isArtist;
        token.profileType = user.profileType;
        token.artistName = user.artistName;
      }

      if (trigger === "update") {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("zvuchno_access")?.value;

        if (accessToken) {
          const currentUser = await getCurrentUserServer(accessToken);

          if (currentUser) {
            token.isArtist = currentUser.is_artist;
            token.profileType = currentUser.profile_type;
            token.artistName = currentUser.artist_name;
          }
        }
      }

      return token;
    },

    session({ session, token }) {
      if (token.error) {
        return {
          ...session,
          user: undefined,
          error: token.error,
        };
      }
      if (!token.id) {
        return {
          ...session,
          user: undefined,
        };
      }
      session.user = {
        ...session.user,
        id: token.id,
        userName: token.userName,
        email: token.email,
        phone: token.phone,
        isEmailVerified: token.isEmailVerified,
        isPhoneVerified: token.isPhoneVerified,
        isListener: token.isListener,
        isArtist: token.isArtist,
        profileType: token.profileType,
        artistName: token.artistName,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
