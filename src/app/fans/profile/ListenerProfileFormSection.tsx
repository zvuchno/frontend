"use client";

import { useEffect, useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import { type CurrentAccountResponse, getCurrentAccount, updateAccountPhone } from "@/api/account";
import { getCurrentListener, updateListener } from "@/api/listener";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { ProfileFormUI } from "@/features/profile";
import { ProfileFormListenerUI } from "@/features/profile";
import { type FieldValues } from "@/features/profile";

import { type UserDataProps, useUserStore } from "@/entities/user";

import styles from "./ListenerProfileFormSection.module.scss";

function normalizePhone(value?: string | null): string {
  return value?.replace(/\D/g, "") ?? "";
}

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

export function ListenerProfileFormSection() {
  const { data: session, status, update: updateSession } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const sessionUser = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const isDirty = methods.formState.isDirty;
  const isValid = methods.formState.isValid;
  const dirtyFields = methods.formState.dirtyFields;
  const reset = methods.reset;

  const [account, setAccount] = useState<CurrentAccountResponse | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const hasProfileUser = status === "authenticated";
  const isProfileBusy = isProfileLoading || isProfileSaving;
  const visibleProfileError = hasProfileUser ? profileError : null;

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      reset({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (sessionUser?.isListener === false) {
      router.replace("/artist/profile");
      return;
    }

    let isCurrentRequest = true;

    const loadProfile = async () => {
      setIsProfileLoading(true);
      setProfileError(null);

      try {
        const [listener, accountResponse] = await Promise.all([
          getCurrentListener(),
          getCurrentAccount(),
        ]);

        if (!isCurrentRequest) {
          return;
        }

        setAccount(accountResponse);
        setUser(toUserStoreData(accountResponse, sessionUser?.accessToken));

        if (shouldSyncSessionAccount(sessionUser, accountResponse)) {
          void updateSession(getSessionAccountPatch(accountResponse)).catch(() => undefined);
        }

        reset({
          name: listener.full_name,
          email: accountResponse.email,
          phone: normalizePhone(accountResponse.phone),
          password: "",
        });
      } catch (requestError) {
        if (isCurrentRequest) {
          setAccount(null);
          setProfileError(
            requestError instanceof Error ? requestError.message : "Не удалось загрузить профиль"
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsProfileLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isCurrentRequest = false;
    };
  }, [pathname, reset, router, sessionUser, setUser, status, updateSession]);

  const handleEdit = () => {
    void methods.trigger();
    setProfileError(null);
    setIsEditMode(true);
  };

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    if (!account) {
      setProfileError("Не удалось подготовить данные профиля к сохранению");
      return;
    }

    setIsProfileSaving(true);
    setProfileError(null);

    try {
      const nextPhone = normalizePhone(data.phone);
      const shouldUpdatePhone = nextPhone !== normalizePhone(account.phone);
      let nextAccount = account;
      let savedName = data.name?.trim() ?? "";

      if (dirtyFields.name && savedName) {
        const listener = await updateListener({
          full_name: savedName,
        });

        savedName = listener.full_name;
      }

      if (shouldUpdatePhone) {
        const phoneResponse = await updateAccountPhone({
          phone: nextPhone,
        });

        nextAccount = {
          ...nextAccount,
          phone: phoneResponse.phone,
          is_phone_verified: false,
        };

        void updateSession({
          phone: nextAccount.phone,
          isPhoneVerified: nextAccount.is_phone_verified,
        }).catch(() => undefined);
      }

      setAccount(nextAccount);
      setUser(toUserStoreData(nextAccount, sessionUser?.accessToken));
      reset({
        name: savedName,
        email: nextAccount.email,
        phone: normalizePhone(nextAccount.phone),
        password: "",
      });
      setIsEditMode(false);
    } catch (requestError) {
      setProfileError(
        requestError instanceof Error ? requestError.message : "Не удалось сохранить профиль"
      );
    } finally {
      setIsProfileSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <ProfileFormUI
        className={styles.profileForm}
        title='Профиль'
        isChecked={isEditMode && isDirty && isValid && !isProfileBusy}
        isOnChange={isEditMode || isProfileBusy}
        isSubmitting={isProfileSaving}
        errorMessage={visibleProfileError}
        onEdit={handleEdit}
        onSubmit={handleSubmitForm}
      >
        <ProfileFormListenerUI
          fieldsDisabled={!isEditMode || isProfileBusy || !account}
          disabledFields={["email", "password"]}
        />
      </ProfileFormUI>
    </FormProvider>
  );
}
