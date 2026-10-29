"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { FormProvider, type SubmitHandler, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { DevTool } from "@hookform/devtools";
import { useSession } from "next-auth/react";

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

function formatPhoneForInput(value?: string | null): string {
  let digits = normalizePhone(value);
  if (!digits) return "";

  if (digits.startsWith("7") && digits.length > 10) {
    digits = digits.slice(1);
  }

  const area = digits.slice(0, 3);
  const first = digits.slice(3, 6);
  const second = digits.slice(6, 8);
  const third = digits.slice(8, 10);

  return `+7(${area})${first}-${second}-${third}`;
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
  const { status } = useSession();
  const setUser = useUserStore((state) => state.setUser);

  const { mutateAsync: updateName } = useUpdateListenerName();
  const { mutateAsync: updatePhone } = useUpdateAccountPhone();
  const { mutateAsync: updateUserName } = useUpdateAccountUsername();
  const { mutateAsync: updatePassword } = useUpdateAccountPassword();
  const { mutateAsync: setPassword } = useSetAccountPassword();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useListenerProfile();

  const account = profileData?.account ?? null;
  const listener = profileData?.listener;

  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const hasInitializedForm = useRef(false);

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
    formState: { isValid, dirtyFields, errors },
    setError,
    handleSubmit: handleFormSubmit,
  } = methods;
  const phoneValue = useWatch({ control: methods.control, name: "phone" });

  useLayoutEffect(() => {
    if (!profileData || hasInitializedForm.current) return;

    hasInitializedForm.current = true;
    reset({
      full_name: listener?.full_name ?? "",
      username: account?.username ?? "",
      email: account?.email ?? "",
      phone: formatPhoneForInput(account?.phone),
      password: "",
      oldPassword: "",
    });
  }, [profileData, listener, account, reset]);

  const hasFormErrors = Object.keys(errors).length > 0;
  const isNameChanged = Boolean(dirtyFields.full_name);
  const isPhoneChanged =
    hasInitializedForm.current &&
    Boolean(dirtyFields.phone) &&
    normalizePhone(phoneValue) !== normalizePhone(account?.phone);
  const isUserNameChanged = Boolean(dirtyFields.username);
  const isPasswordChanged = Boolean(dirtyFields.password);

  const isChanged =
    Boolean(dirtyFields.full_name) ||
    isPhoneChanged ||
    Boolean(dirtyFields.username) ||
    Boolean(dirtyFields.password);

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
        let savedName = data.full_name?.trim() ?? "";

        // 1. Обновление имени
        if (isNameChanged && savedName) {
          const listener = await updateName(savedName);
          savedName = listener.full_name;
        }

        // 2. Обновление телефона
        if (isPhoneChanged && shouldUpdatePhone) {
          const phoneResponse = await updatePhone(nextPhone);
          nextAccount = {
            ...nextAccount,
            phone: phoneResponse.phone,
            is_phone_verified: false,
          };
        }

        // 3. Обновление имени пользователя
        if (isUserNameChanged && shouldUpdateUserName) {
          const userNameResponse = await updateUserName({
            username: nextUserName,
          });
          nextAccount = {
            ...nextAccount,
            username: userNameResponse.username,
          };
        }

        // 4. Обновление или установление пароля
        if (isPasswordChanged && data.password) {
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
          full_name: savedName,
          username: nextAccount.username,
          email: nextAccount.email,
          phone: formatPhoneForInput(nextAccount.phone),
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
      isNameChanged,
      isPasswordChanged,
      isPhoneChanged,
      isUserNameChanged,
      reset,
      setError,
      setFormError,
      setIsProfileSaving,
      setPassword,
      setUser,
      updateName,
      updatePassword,
      updatePhone,
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
      primaryDisabled:
        !(isChanged && isValid && !isProfileBusy) || isProfileSaving || hasFormErrors,
    });
    return () => setAccountActions(null);
  }, [
    setAccountActions,
    onSubmit,
    isValid,
    isProfileBusy,
    isProfileSaving,
    hasFormErrors,
    isChanged,
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
        <DevTool control={methods.control} />
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
