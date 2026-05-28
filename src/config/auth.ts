import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";
import YandexProvider from "next-auth/providers/yandex";

import { getCurrentUser, isTokenValid, logInUser, logOutUser, refreshToken } from "@/entities/user/api";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID as string,
      clientSecret: process.env.YANDEX_SECRET as string,
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID as string,
      clientSecret: process.env.VK_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password || !credentials.identifier) {
          return null;
        }

        try {
          const loginData = {
            email: credentials.identifier.trim(),
            password: credentials.password,
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
            refreshToken: tokens.refresh
          } as User;
        } catch (error: unknown) {
          console.log('Ошибка аутентификации', error)
          throw new Error(
            error instanceof Error ? error.message : "Ошибка аутентификации",
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
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
        token.refreshToken = user.refreshToken
      }

      if (token.accessToken && !(await isTokenValid(token.accessToken))) {
        console.log('Token expired, refreshing...');

        try {
          const refreshed = await refreshToken(token.refreshToken as string);

          token.accessToken = refreshed.access;
          token.refreshToken = refreshed.refresh;

          console.log('Token successfully updated');

        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);

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
      return session
    },
  },

  events: {
    async signOut({ token }) {
      if (token.refreshToken) {
        await logOutUser({refresh: token.refreshToken});
      }
    },
  },

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: "/signin",
  },
};
