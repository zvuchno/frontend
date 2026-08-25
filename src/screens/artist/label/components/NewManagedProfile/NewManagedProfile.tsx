"use client";

import React, { useState } from "react";

import { BaseForm } from "@/widgets/auth/BaseForm";
import { BecomeArtistFormContent } from "@/widgets/auth/BecomeArtistForm/components/BecomeArtistFormContent";

import { type TManagedProfile, useCreateManagedProfile } from "@/entities/Label";

import { LoadingButton } from "@/shared/ui";

import s from "./NewManagedProfile.module.scss";

export const NewManagedProfile = ({ onClose }: { onClose: () => void }) => {
  const { mutate: createNewArtist } = useCreateManagedProfile();

  const [formData, setFormData] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === "string" ? e : e.target.value;

    setFormData(value);
  };

  const handleSubmit = () => {
    if (formData.trim().length === 0) return;

    setIsLoading(true);

    const newManagedProfile: TManagedProfile = {
      name: formData,
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
          name={formData}
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
