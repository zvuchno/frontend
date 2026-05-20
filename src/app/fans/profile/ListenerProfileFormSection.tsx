"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

import { updateAccountPhone } from "@/api/account";
import { getCurrentListener, updateListener } from "@/api/listener";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { FieldValues } from "@/features/profile/ui/profileForm/types";
import { ProfileFormListenerUI } from "@/features/profile/ui/profileForm/profileFormListener";
import styles from "./ListenerProfileFormSection.module.scss";

function normalizePhone(value?: string | null): string {
  return value?.replace(/\D/g, "") ?? "";
}

export function ListenerProfileFormSection() {
  const { status, update: updateSession } = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const email = user?.email ?? "";
  const phone = user?.phone ?? "";

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

  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const hasProfileUser = status !== "unauthenticated" && Boolean(user);
  const isProfileBusy = hasProfileUser && (isProfileLoading || isProfileSaving);
  const visibleProfileError = hasProfileUser ? profileError : null;

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated" || !user) {
      reset({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      router.push(`/signin?next=${encodeURIComponent(pathname)}`);
      return;
    }

    let isCurrentRequest = true;

    const loadProfile = async () => {
      setIsProfileLoading(true);
      setProfileError(null);

      try {
        const listener = await getCurrentListener();

        if (!isCurrentRequest) {
          return;
        }

        reset({
          name: listener.full_name,
          email,
          phone: normalizePhone(phone),
          password: "",
        });
      } catch {
        if (isCurrentRequest) {
          setProfileError("Не удалось загрузить профиль");
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
  }, [email, pathname, phone, reset, router, status, user]);

  const handleEdit = () => {
    void methods.trigger();
    setProfileError(null);
    setIsEditMode(true);
  };

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    if (!user) {
      setProfileError("Не удалось сохранить профиль");
      return;
    }

    setIsProfileSaving(true);
    setProfileError(null);

    try {
      const nextPhone = normalizePhone(data.phone);
      const shouldUpdatePhone = nextPhone !== normalizePhone(phone);
      let savedName = data.name ?? "";

      let savedPhone = phone;
      let nextUser = user;

      if (dirtyFields.name) {
        const listener = await updateListener({
          full_name: savedName,
        });

        savedName = listener.full_name;
      }

      if (shouldUpdatePhone) {
        const phoneResponse = await updateAccountPhone({
          phone: nextPhone,
        });

        savedPhone = phoneResponse.phone ?? "";

        nextUser = {
          ...nextUser,
          phone: phoneResponse.phone,
          isPhoneVerified: false,
        };
        await updateSession({
          phone: nextUser.phone,
          isPhoneVerified: nextUser.isPhoneVerified,
        });
        setUser(nextUser);
      }

      reset({
        name: savedName,
        email,
        phone: normalizePhone(savedPhone),
        password: "",
      });
      setIsEditMode(false);
    } catch (requestError) {
      setProfileError(
        requestError instanceof Error
          ? requestError.message
          : "Не удалось сохранить профиль",
      );
    } finally {
      setIsProfileSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <ProfileFormUI
        className={styles.profileForm}
        title="Профиль"
        isChecked={isEditMode && isDirty && isValid && !isProfileBusy}
        isOnChange={isEditMode || isProfileBusy}
        isSubmitting={isProfileSaving}
        errorMessage={visibleProfileError}
        onEdit={handleEdit}
        onSubmit={handleSubmitForm}
      >
        <ProfileFormListenerUI
          fieldsDisabled={!isEditMode || isProfileBusy}
          disabledFields={["email", "password"]}
        />
      </ProfileFormUI>
    </FormProvider>
  );
}
