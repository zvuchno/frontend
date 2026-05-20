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
    artistName?: string;
    accessToken?: string;
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
    artistName?: string;
    accessToken?: string;
  }
}
