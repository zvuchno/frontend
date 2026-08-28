"use client";

import React, { useState } from "react";

import { BaseForm } from "@/widgets/auth/BaseForm";
import { BecomeArtistFormContent } from "@/widgets/auth/BecomeArtistForm/components/BecomeArtistFormContent";

import { type TManagedProfile, useCreateManagedProfile } from "@/entities/Label";

import { LoadingButton } from "@/shared/ui";

import s from "./NewManagedProfile.module.scss";
import type { TBecomeArtistFormData } from "@/widgets/auth/BecomeArtistForm/model/types";

export const NewManagedProfile = ({ onClose }: { onClose: () => void }) => {
  const { mutate: createNewArtist } = useCreateManagedProfile();

  const [formData, setFormData] = useState<TBecomeArtistFormData>({
    name: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = 
    (field: keyof TBecomeArtistFormData) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === "string" ? e : e.target.value;

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.name.trim().length === 0) return;

    setIsLoading(true);

    const newManagedProfile: TManagedProfile = {
      name: formData.name,
    };

    createNewArtist(newManagedProfile, {
      onSuccess: () => {
        setIsLoading(false);
        onClose();
      },
      onError: (error) => {
        setIsLoading(false);
        onClose();
        console.log(error);
      },
    });
  };

  return (
    <BaseForm
      title={"Добавить нового артиста"}
      onSubmit={() => {
        handleSubmit();
      }}
      isLoading={isLoading}
      className={s.artistRegisterForm}
      renderFields={() => (
        <BecomeArtistFormContent
          data={formData}
          disabled={isLoading}
          handleFieldChange={handleChange}
        />
      )}
      renderPrimaryButton={(loading) => (
        <button className={s.submitButton} type='submit' disabled={loading}>
          {loading ? <LoadingButton /> : "Добавить"}
        </button>
      )}
    />
  );
};

NewManagedProfile.displayName = "NewManagedProfile";
