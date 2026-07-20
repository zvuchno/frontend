import { type UserDataProps, useUserStore } from "@/entities/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCurrentListener, updateAccountPhone, updateListener } from "../api/currentListenerApi";
import { getCurrentAccount } from "../api/currentAccountApi";
import type { TListenerProfile, CurrentAccountResponse } from "./types";
import type { Session } from "next-auth";

function toUserStoreData(account: CurrentAccountResponse, accessToken?: string): UserDataProps {
  return {
    id: account.id,
    userName: account.username,
    email: account.email,
    phone: account.phone,
    isPhoneVerified: account.is_phone_verified,
    isEmailVerified: account.is_email_verified,
    isListener: account.is_listener,
    isArtist: account.is_artist,
    accessToken,
  };
};

function shouldSyncSessionAccount(
  sessionUser: Session["user"] | undefined,
  account: CurrentAccountResponse
) {
  if (!sessionUser) {
    return false;
  }

  return (
    sessionUser.userName !== account.username ||
    sessionUser.email !== account.email ||
    sessionUser.phone !== account.phone ||
    sessionUser.isPhoneVerified !== account.is_phone_verified ||
    sessionUser.isEmailVerified !== account.is_email_verified ||
    sessionUser.isListener !== account.is_listener ||
    sessionUser.isArtist !== account.is_artist
  );
};

function getSessionAccountPatch(account: CurrentAccountResponse) {
  return {
    userName: account.username,
    email: account.email,
    phone: account.phone,
    isPhoneVerified: account.is_phone_verified,
    isEmailVerified: account.is_email_verified,
    isListener: account.is_listener,
    isArtist: account.is_artist,
  };
};

// 1. Хук для получения данных (загрузка профиля)
export function useListenerProfile() {
  const { data: session, update: updateSession } = useSession();
  const token = session?.user.accessToken;
  const setUser = useUserStore((state) => state.setUser);
  const sessionUser = session?.user;

  return useQuery({
    queryKey: ['listenerProfile', sessionUser?.id],
    queryFn: async () => {
      const [listener, accountResponse] = await Promise.all([
        getCurrentListener(token),
        getCurrentAccount(token),
      ]);

      // Обновляем стейт пользователя
      setUser(toUserStoreData(accountResponse, sessionUser?.accessToken));

      // Пытаемся обновить сессию (если нужно)
      if (shouldSyncSessionAccount(sessionUser, accountResponse)) {
        try {
          await updateSession(getSessionAccountPatch(accountResponse));
        } catch (e) {
          console.error('Failed to update session', e);
        }
      }

      return {
        listener,
        account: accountResponse,
      };
    },
    enabled: !!sessionUser, // Загружаем только если пользователь авторизован
  });
};

// 2. Хук для обновления имени
export function useUpdateListenerName() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation({
    mutationFn: async (fullName: string) => {
      return await updateListener({ full_name: fullName }, token);
    },
    onSuccess: (listener) => {
      // Оптимистичное обновление кэша
      queryClient.setQueryData<TListenerProfile>(['listenerProfile'], (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, listener: { ...oldData.listener, full_name: listener.full_name } };
      });
    },
  });
};

// 3. Хук для обновления телефона
export function useUpdateAccountPhone() {
  const queryClient = useQueryClient();
  const { update: updateSession, data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation({
    mutationFn: async (phone: string) => {
      return await updateAccountPhone({ phone }, token);
    },
    onSuccess: (phoneResponse) => {
      queryClient.setQueryData<TListenerProfile>(['listenerProfile'], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          account: {
            ...oldData.account,
            phone: phoneResponse.phone,
            is_phone_verified: false,
          },
        };
      });
      
      try {
        updateSession({
          phone: phoneResponse.phone,
          isPhoneVerified: false,
        });
      } catch (e) {
        console.error('Failed to update session phone', e);
      }
    },
  });
};