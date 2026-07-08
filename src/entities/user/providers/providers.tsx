"use client";

import { useEffect } from "react";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

import { useUserStore } from "../store/useUserStore";

const SessionWatcher = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const clearStore = useUserStore((state) => state.clearStore);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      console.log('записываю новый токен:', session.user.accessToken)
      const userData = session.user;
      setUser({
        id: Number(userData.id),
        userName: userData.userName,
        email: userData.email,
        phone: userData.phone,
        isPhoneVerified: userData.isPhoneVerified,
        isEmailVerified: userData.isEmailVerified,
        isListener: userData.isListener,
        isArtist: userData.isArtist,
        accessToken: userData.accessToken,
        artistName: userData.artistName,
      });
    } else if (status === "unauthenticated") {
      clearStore();
    }
  }, [session, status, setUser, clearStore]);

  return <>{children}</>;
};

export const SessionProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SessionWatcher>{children}</SessionWatcher>
    </SessionProvider>
  );
};
