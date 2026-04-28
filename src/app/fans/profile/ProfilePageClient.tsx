"use client";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { updateAccountPassword, updateAccountPhone } from "@/api/account";
import { getListener, updateListener } from "@/api/listener";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { FieldValues } from "@/features/profile/ui/profileForm/types";
import { ProfileFormListenerUI } from "@/features/profile/ui/profileForm/profileFormListener";

function normalizePhone(value?: string | null): string {
  return value?.replace(/\D/g, "") ?? "";
}

export function ProfilePageClient() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const accessToken = user?.accessToken;
  const email = user?.email ?? "";
  const phone = user?.phone ?? "";

  const methods = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const isDirty = methods.formState.isDirty;
  const dirtyFields = methods.formState.dirtyFields;
  const reset = methods.reset;

  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const isProfileBusy = isProfileLoading || isProfileSaving;

  useEffect(() => {
    let isCurrentRequest = true;

    const loadProfile = async () => {
      if (!accessToken) {
        setIsProfileLoading(false);
        setProfileError(null);
        return;
      }

      setIsProfileLoading(true);
      setProfileError(null);

      try {
        const listener = await getListener(accessToken);

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
  }, [accessToken, email, phone, reset]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSubmitForm = async (data: FieldValues) => {
    if (!accessToken) {
      setProfileError("Не удалось сохранить профиль");
      return;
    }

    setIsProfileSaving(true);
    setProfileError(null);

    try {
      const nextPhone = normalizePhone(data.phone);
      const shouldUpdatePhone = nextPhone !== normalizePhone(phone);
      const nextPassword = data.password ?? "";
      let savedName = data.name ?? "";

      let savedPhone = phone;
      let nextUser = user;

      if (dirtyFields.name) {
        const listener = await updateListener(accessToken, {
          full_name: savedName,
        });

        savedName = listener.full_name;
      }

      if (shouldUpdatePhone) {
        const phoneResponse = await updateAccountPhone(
          {
            phone: nextPhone,
          },
          accessToken,
        );

        savedPhone = phoneResponse.phone ?? "";

        if (user) {
          nextUser = {
            ...user,
            phone: phoneResponse.phone,
            isPhoneVerified: false,
          };
        }
      }

      if (nextPassword) {
        await updateAccountPassword(
          {
            password: nextPassword,
          },
          accessToken,
        );
      }

      reset({
        name: savedName,
        email,
        phone: normalizePhone(savedPhone),
        password: "",
      });
      setIsEditMode(false);

      if (nextUser && nextUser !== user) {
        setUser(nextUser);
      }
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
        title="Профиль"
        isChecked={isDirty && !isProfileBusy}
        isOnChange={isEditMode || isProfileBusy}
        onEdit={handleEdit}
        onSubmit={handleSubmitForm}
      >
        {profileError && <p role="alert">{profileError}</p>}
        <ProfileFormListenerUI
          fieldsDisabled={!isEditMode || isProfileBusy}
          disabledFields={["email"]}
        />
      </ProfileFormUI>
    </FormProvider>
  );
}
