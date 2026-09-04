"use client";

import { useEffect, useRef } from "react";

import { logoutFromBackend } from "@/api/lib/handlers/logoutFromBackend";
import { SessionProvider } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";

import { useUserStore } from "../store/useUserStore";

const SessionWatcher = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const clearStore = useUserStore((state) => state.clearStore);
  const checkedBackendSessionForUser = useRef<string | null>(null);

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

      const userId = String(session.user.id);

      if (checkedBackendSessionForUser.current !== userId) {
        checkedBackendSessionForUser.current = userId;

        void fetch("/api/backend/v1/auth/account/me", {
          credentials: "same-origin",
          cache: "no-store",
        })
          .then(async (response) => {
            if (response.status !== 401) return;

            clearStore();
            await logoutFromBackend();
            await signOut({
              redirect: true,
              callbackUrl: "/signin",
            });
          })
          .catch((error: unknown) => {
            console.error("Backend session check failed", error);
          });
      }
    } else if (status === "unauthenticated" || !session?.user) {
      checkedBackendSessionForUser.current = null;
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
