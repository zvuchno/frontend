"use client";

import React, { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { type TConsent, useBecomeArtist } from "@/entities/user";

import { LoadingButton } from "@/shared/ui";

import { BaseForm } from "../BaseForm";
import s from "./BecomeArtistForm.module.scss";
import { BecomeArtistFormContent } from "./components/BecomeArtistFormContent";
import { type TBecomeArtistFormData, type TBecomeArtistProps, type TBecomeArtistRequest } from "./model/types";
import { validateForm } from "../config/validateForm";

const initialFormState: TBecomeArtistFormData = {
  name: "",
  artist_offer: false,
  artist_personal_data: false,
  artist_distribution: false,
  artist_newsletter: false,
}

export const BecomeArtistForm = ({ profileType, currentUserType }: TBecomeArtistProps) => {
  const { mutateAsync: changeProfileType } = useBecomeArtist();
  const { update: updateSession } = useSession();

  const [formData, setFormData] = useState<TBecomeArtistFormData>(initialFormState);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const router = useRouter();

  const handleChange = 
    (field: keyof TBecomeArtistFormData) => (e: React.ChangeEvent<HTMLInputElement> | string) => {

    let value: string | boolean;
    if (typeof e === "string") {
      value = e;
    } else {
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      } else {
        value = e.target.value;
      }
    }

      setFormData((prev) => ({ ...prev, [field]: value }));

      if (formError) setFormError(undefined);
  };

  const handleSubmit = async () => {
    if (formData.name.trim().length === 0) return;

    setIsLoading(true);
    setFormError(undefined);

    const agreedTerms: TConsent[] = [];

    if (currentUserType === "listener") {
      const validation = validateForm<TBecomeArtistFormData>(formData);
    
      if (!validation.isValid) {
        setFormError(validation.errorMessage);
        setIsLoading(false);
        return;
      }
      
      if (formData.artist_offer) agreedTerms.push("artist_offer");
      if (formData.artist_personal_data) agreedTerms.push("artist_personal_data");
      if (formData.artist_distribution) agreedTerms.push("artist_distribution");
      if (formData.artist_newsletter) agreedTerms.push("artist_newsletter");
    }

    const newArtist: TBecomeArtistRequest = {
      name: formData.name,
      profile_type: profileType,
      ...(agreedTerms.length > 0 && { consents: agreedTerms }),
    };

    try {
      await changeProfileType(newArtist);
      await updateSession();
      setFormData(initialFormState);
      router.push("/artist/profile/");
    } catch (error) {
      console.log(error);
      setFormError(error instanceof Error ? error.message : "Проверьте корректность введённых данных");
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
          data={formData}
          disabled={isLoading}
          handleFieldChange={handleChange}
          registerError={formError}
          currentUserType={currentUserType}
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
