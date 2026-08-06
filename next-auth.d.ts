import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    userName: string;
    email: string;
    phone: string | null;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    isListener: boolean;
    isArtist: boolean;
    profileType?: "artist" | "label";
    artistName?: string;
    accessToken?: string;
    refreshToken?: string;
    sessionExpires: number | null;
    sessionError?: string;
    accessTokenExpires: number | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string;
    email: string;
    phone: string | null;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    isListener: boolean;
    isArtist: boolean;
    profileType?: "artist" | "label";
    artistName?: string;
    accessToken?: string;
    refreshToken?: string;
    sessionExpires: number | null;
    sessionError?: string;
    accessTokenExpires: number | null;
  }
}
