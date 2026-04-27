"use client";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { getListener } from "@/api/listener";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { FieldValues } from "@/features/profile/ui/profileForm/types";
import { ProfileFormListenerUI } from "@/features/profile/ui/profileForm/profileFormListener";

export function ProfilePageClient() {
  const user = useUserStore((state) => state.user);
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
  const reset = methods.reset;

  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

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
          phone,
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

  const handleSubmitForm = (data: FieldValues) => {
    reset(data);
    setIsEditMode(false);
  };

  return (
    <FormProvider {...methods}>
      <ProfileFormUI
        title="Профиль"
        isChecked={isDirty && !isProfileLoading}
        isOnChange={isEditMode || isProfileLoading}
        onEdit={handleEdit}
        onSubmit={handleSubmitForm}
      >
        {profileError && <p role="alert">{profileError}</p>}
        <ProfileFormListenerUI
          fieldsDisabled={!isEditMode || isProfileLoading}
          disabledFields={["email"]}
        />
      </ProfileFormUI>
    </FormProvider>
  );
}
