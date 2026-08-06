"use client";

import React, { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useBecomeArtist } from "@/entities/user";

import { LoadingButton } from "@/shared/ui";

import { BaseForm } from "../BaseForm";
import s from "./BecomeArtistForm.module.scss";
import { BecomeArtistFormContent } from "./components/BecomeArtistFormContent";
import { type TBecomeArtistProps, type TBecomeArtistRequest } from "./model/types";

export const BecomeArtistForm = ({ profileType }: TBecomeArtistProps) => {
  const { mutate } = useBecomeArtist();
  const { update: updateSession } = useSession();

  const [formData, setFormData] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === "string" ? e : e.target.value;

    setFormData(value);
  };

  const handleSubmit = () => {
    if (formData.trim().length === 0) return;

    setIsLoading(true);

    const newArtist: TBecomeArtistRequest = {
      name: formData,
      profile_type: profileType,
    };
    mutate(newArtist, {
      onSuccess: (data) => {
        if (!data) return;
        if (data.profile_type === "artist" || data.profile_type === "label")
          updateSession({ isArtist: true, profileType: data.profile_type })
            .then(() => router.push("/artist/profile/"))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
      },
      onError: (error) => {
        setIsLoading(false);
        console.log(error);
      },
    });
  };

  return (
    <BaseForm
      title={`Зарегистрировать ${profileType === "artist" ? "артиста" : "лейбл"}`}
      onSubmit={() => {
        handleSubmit();
      }}
      //onClose={onClose}
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
          {loading ? (
            <LoadingButton />
          ) : (
            `Стать ${profileType === "artist" ? "артистом" : "лейблом"}`
          )}
        </button>
      )}
    />
  );
};

BecomeArtistForm.displayName = "BecomeArtistForm";
