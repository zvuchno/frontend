'use client'

import { SessionProvider } from 'next-auth/react'
import { useSession } from "next-auth/react";
import { useUserStore } from '../store/useUserStore'
import { useEffect } from 'react';
import { User } from 'next-auth';


const SessionWatcher = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser)
  const clearStore = useUserStore((state) => state.clearStore)

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const userData = session.user as User;
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
        artistName: userData.artistName
      });
      console.log(userData)
    } else if (status === 'unauthenticated') {
      clearStore();
    }
  }, [session, status, setUser, clearStore]);
  
  console.log(session);
  
  return <>{children}</>;
};


export const SessionProviders = ({children}: {children: React.ReactNode}) => {
  return <SessionProvider>
    <SessionWatcher>
      {children}
    </SessionWatcher>
  </SessionProvider>
}