"use client";
import { useForm, FormProvider } from "react-hook-form";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { FieldValues } from "@/features/profile/ui/profileForm/types";
import { ProfileFormListenerUI } from "@/features/profile/ui/profileForm/profileFormListener";
import { useState } from "react";

export function ProfilePageClient() {
  const methods = useForm<FieldValues>({
    defaultValues: {
      name: "user",
      email: "user@example.com",
      phone: "71111111111",
      password: "password",
    },
  });

  const isDirty = methods.formState.isDirty;
  const reset = methods.reset;

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSubmitForm = (data: FieldValues) => {
    reset(data);
    setIsEditMode(false);
  }

  return (
    <FormProvider {...methods}>
      <ProfileFormUI
        title="Профиль"
        isChecked={isDirty}
        isOnChange={isEditMode}
        onEdit={handleEdit}
        onSubmit={handleSubmitForm}
      >
        <ProfileFormListenerUI
          fieldsDisabled={!isEditMode}
          disabledFields={["email"]}
        />
      </ProfileFormUI>
    </FormProvider>
  );
}
