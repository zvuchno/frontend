import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authorize, OAuthorize } from "@/entities/user/server";

export const authConfig: AuthOptions = {
  providers: [
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

        // Логика для OAuth
        if (credentials.provider === 'yandex') {
          if (credentials.code) {
            return await OAuthorize(credentials.code);
          }
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },

  pages: { signIn: "/signin" },

  callbacks: {
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
