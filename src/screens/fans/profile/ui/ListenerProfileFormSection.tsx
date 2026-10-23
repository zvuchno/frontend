"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { useAccountActions } from "@/features/AccountActions/context/useAccountActions";
import { ProfileFormUI } from "@/features/profile";
import { ProfileFormListenerUI } from "@/features/profile";
import { type FieldValues } from "@/features/profile";
import { listenerFormFields } from "@/features/profile/utils/constants";
import { UpdatePasswordModal } from "@/features/updatePasswordModal";

import {
  type CurrentAccountResponse,
  useListenerProfile,
  useUpdateAccountPhone,
  useUpdateListenerName,
} from "@/entities/profile";
import {
  useSetAccountPassword,
  useUpdateAccountPassword,
  useUpdateAccountUsername,
} from "@/entities/profile";
import { type UserDataProps, useUserStore } from "@/entities/user";

import { Loader } from "@/shared/ui";
import { setServerErrors } from "@/shared/utils/serverErrorsHandler";

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

export function ListenerProfileFormSection() {
  const { status, update: updateSession } = useSession();
  const setUser = useUserStore((state) => state.setUser);

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
  const updateName = updateNameMutation.mutateAsync;
  const updatePhone = updatePhoneMutation.mutateAsync;
  const updateUserName = updateUserNameMutation.mutateAsync;
  const updatePassword = updatePasswordMutation.mutateAsync;
  const setPassword = setPasswordMutation.mutateAsync;

  const account = profileData?.account ?? null;
  const listener = profileData?.listener;

  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      oldPassword: "",
    },
  });

  const {
    reset,
    formState: { isDirty, isValid, dirtyFields, errors },
    setError,
    handleSubmit: handleFormSubmit,
  } = methods;

  const hasFormErrors = Object.keys(errors).length > 0;
  const isNameDirty = Boolean(dirtyFields.name);
  const isPhoneDirty = Boolean(dirtyFields.phone);
  const isUserNameDirty = Boolean(dirtyFields.username);
  const isPasswordDirty = Boolean(dirtyFields.password);

  // Сброс формы при загрузке данных
  useEffect(() => {
    if (profileData && listener) {
      reset({
        full_name: listener.full_name,
        username: account?.username,
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
      reset({ full_name: "", username: "", email: "", phone: "", password: "", oldPassword: "" });
      // router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
      return;
    }
  }, [status, reset, pathname]);

  const hasProfileUser = status === "authenticated";
  const isProfileBusy = isProfileLoading || isProfileSaving;
  const visibleProfileError = hasProfileUser ? profileError : null;

  const handleSubmit = useCallback<SubmitHandler<FieldValues>>(
    async (data: FieldValues) => {
      if (!account) {
        setFormError("Не удалось подготовить данные профиля к сохранению");
        return;
      }

      setIsProfileSaving(true);
      setFormError(null);

      try {
        const nextPhone = normalizePhone(data.phone);
        const shouldUpdatePhone = nextPhone !== normalizePhone(account.phone);

        const nextUserName = data.username?.trim() ?? "";
        const shouldUpdateUserName = nextUserName !== account.username;

        let nextAccount = account;
        let savedName = data.name?.trim() ?? "";

        // 1. Обновление имени
        if (isNameDirty && savedName) {
          const listener = await updateName(savedName);
          savedName = listener.full_name;
        }

        // 2. Обновление телефона
        if (isPhoneDirty && shouldUpdatePhone) {
          const phoneResponse = await updatePhone(nextPhone);
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
        if (isUserNameDirty && shouldUpdateUserName) {
          const userNameResponse = await updateUserName({
            username: nextUserName,
          });
          nextAccount = {
            ...nextAccount,
            username: userNameResponse.username,
          };

          void updateSession({
            userName: nextAccount.username,
          }).catch(() => undefined);
        }

        // 4. Обновление или установление пароля
        if (isPasswordDirty && data.password) {
          if (account.has_usable_password) {
            // меняем существующий пароль
            if (!data.oldPassword) {
              setFormError("Для смены пароля требуется ввести текущий пароль");
              return;
            }

            await updatePassword({
              old_password: data.oldPassword,
              new_password: data.password,
              retype_new_password: data.password,
            });
          } else {
            // устанавливаем пароль впервые
            await setPassword({
              new_password: data.password,
              retype_new_password: data.password,
            });
          }
        }

        toast.success("Профиль успешно обновлён");

        // Обновляем локальный стейт и сбрасываем форму
        setUser({ ...useUserStore.getState(), ...toUserStoreData(nextAccount) });

        reset({
          name: savedName,
          email: nextAccount.email,
          phone: normalizePhone(nextAccount.phone),
          password: "",
          oldPassword: "",
        });
      } catch (requestError) {
        if (requestError instanceof Error) {
          setServerErrors(listenerFormFields, requestError, setError, setFormError);
        }
        setFormError(
          requestError instanceof Error ? requestError.message : "Не удалось сохранить профиль"
        );
        toast.error("Не удалось сохранить профиль. Проверьте данные.");
      } finally {
        setIsProfileSaving(false);
      }
    },
    [
      account,
      isNameDirty,
      isPasswordDirty,
      isPhoneDirty,
      isUserNameDirty,
      reset,
      setError,
      setFormError,
      setIsProfileSaving,
      setPassword,
      setUser,
      updateName,
      updatePassword,
      updatePhone,
      updateSession,
      updateUserName,
    ]
  );

  const onSubmit = useCallback(() => {
    void handleFormSubmit(handleSubmit)();
  }, [handleFormSubmit, handleSubmit]);

  //установка кнопки сохранить в шапку страницы через общий контекст для лэйаута ЛК//
  const { setAccountActions } = useAccountActions();

  useLayoutEffect(() => {
    setAccountActions({
      onClickPrimaryBtn: onSubmit,
      primaryButtonTitle: "Сохранить",
      primaryDisabled: !(isDirty && isValid && !isProfileBusy) || isProfileSaving || hasFormErrors,
    });
    return () => setAccountActions(null);
  }, [
    setAccountActions,
    onSubmit,
    isDirty,
    isValid,
    isProfileBusy,
    isProfileSaving,
    hasFormErrors,
  ]);
  //-------------------//

  if (isProfileLoading || status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <FormProvider {...methods}>
        <ProfileFormUI
          className={styles.profileForm}
          errorMessage={formError ?? visibleProfileError?.message ?? null}
          has_usable_password={account?.has_usable_password}
          onSubmit={handleSubmit}
          onUpdatePassword={() => setIsModalOpen(true)}
        >
          <ProfileFormListenerUI
            fieldsDisabled={isProfileBusy || !account}
            disabledFields={["email"]}
            has_usable_password={account?.has_usable_password || false}
          />
        </ProfileFormUI>
      </FormProvider>
      {isModalOpen && (
        <UpdatePasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          has_usable_password={account?.has_usable_password}
        />
      )}
    </>
  );
}
