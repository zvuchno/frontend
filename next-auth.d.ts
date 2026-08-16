import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    userName?: string;
    email?: string;
    phone?: string;
    isPhoneVerified?: boolean;
    isEmailVerified?: boolean;
    isListener?: boolean;
    isArtist?: boolean;
    profileType?: "artist" | "label";
    artistName?: string;
    sessionExpires?: number | null;
  }

  interface Session {
    user: User;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userName?: string;
    email?: string;
    phone?: string;
    isPhoneVerified?: boolean;
    isEmailVerified?: boolean;
    isListener?: boolean;
    isArtist?: boolean;
    profileType?: "artist" | "label";
    artistName?: string;
    sessionExpires?: number | null;

    error?: "RefreshAccessTokenError" | "AccessTokenExpired";
  }
}
