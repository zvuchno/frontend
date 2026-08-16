"use client";

import { useEffect } from "react";

import { logoutFromBackend } from "@/api/lib/handlers/logoutFromBackend";
import { SessionProvider } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";

import { useUserStore } from "../store/useUserStore";

const SessionWatcher = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const clearStore = useUserStore((state) => state.clearStore);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      clearStore();

      void (async () => {
        await logoutFromBackend();

        await signOut({
          redirect: true,
          callbackUrl: "/signin",
        });
      })();

      return;
    }

    if (status === "authenticated" && session?.user) {
      setUser({
        id: Number(session.user.id),
        userName: session.user.userName,
        email: session.user.email,
        phone: session.user.phone,
        isPhoneVerified: session.user.isPhoneVerified,
        isEmailVerified: session.user.isEmailVerified,
        isListener: session.user.isListener,
        isArtist: session.user.isArtist,
        artistName: session.user.artistName,
      });
    } else if (status === "unauthenticated" || !session?.user) {
      clearStore();
    }
  }, [session, status, setUser, clearStore]);

  return <>{children}</>;
};

export const SessionProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <SessionWatcher>{children}</SessionWatcher>
    </SessionProvider>
  );
};
