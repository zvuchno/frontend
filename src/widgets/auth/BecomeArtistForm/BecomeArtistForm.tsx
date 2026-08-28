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
  const { mutateAsync: changeProfileType } = useBecomeArtist();
  const { update: updateSession } = useSession();

  const [formData, setFormData] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === "string" ? e : e.target.value;

    setFormData(value);
  };

  const handleSubmit = async () => {
    if (formData.trim().length === 0) return;

    setIsLoading(true);

    const newArtist: TBecomeArtistRequest = {
      name: formData,
      profile_type: profileType,
    };

    try {
      await changeProfileType(newArtist);
      await updateSession();
      router.push("/artist/profile/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseForm
      title={`Зарегистрировать ${profileType === "artist" ? "артиста" : "лейбл"}`}
      onSubmit={() => void handleSubmit()}
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
