import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import YandexProvider from "next-auth/providers/yandex";
import VkProvider from "next-auth/providers/vk";

import { authorize, OAuthorize } from "@/entities/user/server";

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
    VkProvider({
      clientId: process.env.VK_CLIENT_ID as string,
      clientSecret: process.env.VK_SECRET as string,
      authorization: {
        url: "https://id.vk.com/authorize",
        params: {
          scope: "email",
          response_type: 'code',
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
        provider: { type: 'text' },
        code: { type: 'text' },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        // Логика для обычного логина (email/password)
        if (credentials.identifier && credentials.password) {
          return await authorize({
            email: credentials.identifier.trim(),
            password: credentials.password,
            rememberme: credentials.rememberme === "true",
          });
        }

        //Логика для OAuth
        // if (credentials.provider === 'yandex') {
          
        //   if (credentials.code) {
        //     return await OAuthorize({ code: credentials.code });
        //   }
        // }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },

  pages: { signIn: "/signin" },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "vk" || account?.provider === "yandex") {
        const userResponse = await OAuthorize({
          provider: account.provider,
          token: account.access_token ?? "",
        });

        if (userResponse) {
          user.id = userResponse.id;
          user.userName = userResponse.userName;
          user.email = userResponse.email;
          user.phone = userResponse.phone;
          user.isPhoneVerified = userResponse.isPhoneVerified;
          user.isEmailVerified = userResponse.isEmailVerified;
          user.isArtist = userResponse.isArtist;
          user.isListener = userResponse.isListener;
          user.profileType = userResponse.profileType;
          user.artistName = userResponse.artistName;
          return true;
        }

        return false;
      }
      return true;
    },
    jwt({ token, user }) {
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
