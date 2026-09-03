import toast from "react-hot-toast";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import type Error from "next/error";

import { type UserDataProps, useUserStore } from "@/entities/user";

import {
  getCurrentAccount,
  setAccountPassword,
  updateAccountPassword,
  updateAccountPhone,
  updateAccountUsername,
} from "../api/currentAccountApi";
import { getCurrentListener, updateListener } from "../api/currentListenerApi";
import type {
  CurrentAccountResponse,
  SetAccountPasswordPayload,
  TListenerProfile,
  UpdateAccountPasswordPayload,
  UpdateAccountPasswordResponse,
  UpdateAccountUsernamePayload,
} from "./types";

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
}

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
}

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
}

// 1. Хук для получения данных (загрузка профиля)
export function useListenerProfile() {
  const { data: session, update: updateSession } = useSession();

  const setUser = useUserStore((state) => state.setUser);
  const sessionUser = session?.user;

  return useQuery({
    queryKey: ["listenerProfile", sessionUser?.id],
    queryFn: async () => {
      const [listener, accountResponse] = await Promise.all([
        getCurrentListener(),
        getCurrentAccount(),
      ]);

      // Обновляем стейт пользователя
      setUser(toUserStoreData(accountResponse));

      // Пытаемся обновить сессию (если нужно)
      if (shouldSyncSessionAccount(sessionUser, accountResponse)) {
        try {
          await updateSession(getSessionAccountPatch(accountResponse));
        } catch (e) {
          console.error("Failed to update session", e);
        }
      }

      return {
        listener,
        account: accountResponse,
      };
    },
    enabled: !!sessionUser, // Загружаем только если пользователь авторизован
  });
}

// 2. Хук для обновления имени
export function useUpdateListenerName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fullName: string) => {
      return await updateListener({ full_name: fullName });
    },
    onSuccess: (listener) => {
      // Оптимистичное обновление кэша
      queryClient.setQueryData<TListenerProfile>(["listenerProfile"], (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, listener: { ...oldData.listener, full_name: listener.full_name } };
      });
    },
  });
}

// 3. Хук для обновления телефона
export function useUpdateAccountPhone() {
  const queryClient = useQueryClient();
  const { update: updateSession } = useSession();

  return useMutation({
    mutationFn: async (phone: string) => {
      const phoneToApi = `+${phone}`;
      return await updateAccountPhone({ phone: phoneToApi });
    },
    onSuccess: (phoneResponse) => {
      queryClient.setQueryData<TListenerProfile>(["listenerProfile"], (oldData) => {
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

      void updateSession({
        phone: phoneResponse.phone,
        isPhoneVerified: false,
      });
    },
  });
}

// 4. Хук для обновления пароля
export function useUpdateAccountPassword() {
  return useMutation<UpdateAccountPasswordResponse | null, Error, UpdateAccountPasswordPayload>({
    mutationFn: async (
      payload: UpdateAccountPasswordPayload
    ): Promise<UpdateAccountPasswordResponse | null> => {
      return await updateAccountPassword(payload);
    },
    onSuccess: (data) => {
      if (data) toast.success(data.detail);
    },
  });
}

// 5. Хук для обновления имени пользователя
export function useUpdateAccountUsername() {
  const queryClient = useQueryClient();
  const { update: updateSession } = useSession();

  return useMutation({
    mutationFn: async (payload: UpdateAccountUsernamePayload) => {
      return await updateAccountUsername(payload);
    },
    onSuccess: (userNameResponse) => {
      queryClient.setQueryData<TListenerProfile>(["listenerProfile"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          account: {
            ...oldData.account,
            username: userNameResponse.username,
          },
        };
      });

      void updateSession({
        userName: userNameResponse.username,
      });
    },
  });
}

// 6. Хук для установления пароля
export function useSetAccountPassword() {
  return useMutation({
    mutationFn: async (payload: SetAccountPasswordPayload) => {
      return await setAccountPassword(payload);
    },
  });
}
