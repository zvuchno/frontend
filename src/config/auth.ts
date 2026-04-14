import type { AuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import YandexProvider from 'next-auth/providers/yandex';
import VkProvider from 'next-auth/providers/vk';
import Credentials from "next-auth/providers/credentials";
import { getCurrentUser, logInUser} from "@/entities/user/api";


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
    //в env нет ключей для VK
    VkProvider({
      clientId: process.env.VK_CLIENT_ID as string, 
      clientSecret: process.env.VK_SECRET as string
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);

        if (!credentials?.password  || !credentials.identifier) return null;

        try {
          const { identifier, password} = credentials;

          const loginData = {
            email: identifier.trim(),
            password: password
          };
          const tokens = await logInUser(loginData);

          if(!tokens.access) return null;

          const user = await getCurrentUser(tokens.access);

          return {
            id: user.id,
            userName: user.username,
            email: user.email,
            phone: user.phone,
            isPhoneVerified: user.is_phone_verified,
            isEmailVerified: user.is_email_verified,
            isArtist: user.is_artist,
            isListener: user.is_listener,
            accessToken: tokens.access
          } as unknown as User

        } catch (error: any) {
          throw new Error(error.message || 'Ошибка аутентификации');
        }
      }
})
  ],

  // для сохранение в токен и сессию необязательных для next-auth полей (типа isArtist/isListener, accessToken и пр)
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.userName = user.userName;
        token.email = user.email;
        token.phone = user.phone
        token.isEmailVerified = user.isEmailVerified;
        token.isPhoneVerified = user.isPhoneVerified;
        token.isListener = user.isListener;
        token.isArtist = user.isArtist;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({session, token}) {
      if (session.user) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.email = token.email;
        session.user.phone = token.phone
        session.user.isEmailVerified = token.isEmailVerified;
        session.user.isPhoneVerified = token.isPhoneVerified;
        session.user.isListener = token.isListener;
        session.user.isArtist = token.isArtist;
        session.user.accessToken = token.accessToken;
      }
      return session
    },
  }

  }