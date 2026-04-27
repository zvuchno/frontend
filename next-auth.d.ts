import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string;
    userName: string;
    email: string;
    phone: string;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    isListener: boolean;
    isArtist: boolean;
    artistName?: string;
    accessToken?: string;
  }

  // кастомный User для сессии Next-auth
  interface Session {
    user: User; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string;
    email: string;
    phone: string;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    isListener: boolean;
    isArtist: boolean;
    artistName?: string;
    accessToken?: string;
  }
}