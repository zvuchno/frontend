"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { ProfileFormUI } from "@/features/profile";
import { ProfileFormListenerUI } from "@/features/profile";
import { type FieldValues } from "@/features/profile";

import { type UserDataProps, useUserStore } from "@/entities/user";

import styles from "./ListenerProfileFormSection.module.scss";
import { 
  type CurrentAccountResponse, 
  useListenerProfile, 
  useUpdateAccountPhone, 
  useUpdateListenerName 
} from "@/entities/profile";
import { useSetAccountPassword, useUpdateAccountPassword, useUpdateAccountUsername } from "@/entities/profile/model/useListenerProfile";
import toast from "react-hot-toast";

function normalizePhone(value?: string | null): string {
  return value?.replace(/\D/g, "") ?? "";
};

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

export function ListenerProfileFormSection() {
  const { data: session, status, update: updateSession } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const sessionUser = session?.user;

  //const router = useRouter();
  const pathname = usePathname();

  const { 
    data: profileData, 
    isLoading: isProfileLoading, 
    error: profileError,
  } = useListenerProfile();

  const updateNameMutation = useUpdateListenerName();
  const updatePhoneMutation = useUpdateAccountPhone();
  const updateUserNameMutation = useUpdateAccountUsername();
  const updatePasswordMutation = useUpdateAccountPassword();
  const setPasswordMutation = useSetAccountPassword();

  const account = profileData?.account ?? null;
  const listener = profileData?.listener;

  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      phone: "",
      password: "",
      oldPassword: "",
    },
  });

  const { reset, formState: { isDirty, isValid, dirtyFields } } = methods;

  // Сброс формы при загрузке данных
  useEffect(() => {
    if (profileData && listener) {
      reset({
        name: listener.full_name,
        userName: account?.username,
        email: account?.email || "",
        phone: normalizePhone(account?.phone || ""),
        password: "",
        oldPassword: "",
      });
    }
  }, [profileData, listener, account, reset]);

  // Обработка статуса авторизации
  useEffect(() => {
    if (status === "unauthenticated") {
      reset({ name: "", userName: "", email: "", phone: "", password: "", oldPassword: "" });
      // router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
      return;
    }
  }, [status, reset, pathname]);

  const hasProfileUser = status === "authenticated";
  const isProfileBusy = isProfileLoading || isProfileSaving;
  const visibleProfileError = hasProfileUser ? profileError : null;

  const handleEdit = () => {
    void methods.trigger();
    setFormError(null);
    setIsEditMode(true);
  };

  const handleSubmitForm = async (data: FieldValues) => {
    if (!account) {
      setFormError('Не удалось подготовить данные профиля к сохранению');
      return;
    }

    setIsProfileSaving(true);
    setFormError(null);

    try {
      const nextPhone = normalizePhone(data.phone);
      const shouldUpdatePhone = nextPhone !== normalizePhone(account.phone);

      const nextUserName = data.userName?.trim() ?? "";
      const shouldUpdateUserName = nextUserName !== account.username;

      let nextAccount = account;
      let savedName = data.name?.trim() ?? "";

      // 1. Обновление имени
      if (dirtyFields.name && savedName) {
        const listener = await updateNameMutation.mutateAsync(savedName);
        savedName = listener.full_name;
      }

      // 2. Обновление телефона
      if (dirtyFields.phone && shouldUpdatePhone) {
        const phoneResponse = await updatePhoneMutation.mutateAsync(nextPhone);
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

      // 3. Обновление имени пользователя
      if (dirtyFields.userName && shouldUpdateUserName) {
        console.log('я тут')
        const userNameResponse = await updateUserNameMutation.mutateAsync({ username: nextUserName });
        nextAccount = {
          ...nextAccount,
          username: userNameResponse.username,
        };

        void updateSession({
          userName: nextAccount.username,
        }).catch(() => undefined);
      }

      // 4. Обновление или установление пароля
      if (dirtyFields.password && data.password) {
        
        if (account.has_usable_password) {
          // меняем существующий пароль
          if(!data.oldPassword) {
            setFormError('Для смены пароля требуется ввести текущий пароль');
            return;
          }

          await updatePasswordMutation.mutateAsync({
            old_password: data.oldPassword,
            new_password: data.password,
            retype_new_password: data.password,
          })
        } else {
          // устанавливаем пароль впервые
          await setPasswordMutation.mutateAsync({
            new_password: data.password,
            retype_new_password: data.password,
          })
        }
      }

      toast.success('Профиль успешно обновлён');

      // Обновляем локальный стейт и сбрасываем форму
      setUser({ ...useUserStore.getState(), ...toUserStoreData(nextAccount, sessionUser?.accessToken) });

      reset({
        name: savedName,
        email: nextAccount.email,
        phone: normalizePhone(nextAccount.phone),
        password: "",
        oldPassword: "",
      });

      setIsEditMode(false);

    } catch (requestError) {
      setFormError(
        requestError instanceof Error ? requestError.message : "Не удалось сохранить профиль"
      );
      toast.error('Не удалось сохранить профиль. Проверьте данные.');
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
        errorMessage={formError ?? (visibleProfileError?.message ?? null)}
        onEdit={handleEdit}
        onSubmit={handleSubmitForm}
      >
        <ProfileFormListenerUI
          fieldsDisabled={!isEditMode || isProfileBusy || !account}
          disabledFields={["email"]}
          has_usable_password={account?.has_usable_password || false}
        />
      </ProfileFormUI>
    </FormProvider>
  );
}
