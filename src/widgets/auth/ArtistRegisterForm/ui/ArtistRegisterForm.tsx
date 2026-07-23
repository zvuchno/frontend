"use client";

import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { type TNewArtistRequest } from "@/entities/user";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { FormSocialButtons, LoadingButton } from "@/shared/ui";

import { BaseForm } from "../../BaseForm";
import { validateField } from "../../config/validateField";
import { validateForm } from "../../config/validateForm";
import { ArtistRegisterFormContent } from "../components/ArtistRegisterFormContent/ArtistRegisterFormContent";
import {
  type ArtistRegisterFormData,
  type ArtistRegisterFormProps,
  type FormErrors,
} from "../model/ArtistRegisterForm.types";
import s from "./ArtistRegisterForm.module.scss";

const initialFormState: ArtistRegisterFormData = {
  title: "",
  login: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const ArtistRegisterForm = ({ onClose, onSubmit }: ArtistRegisterFormProps) => {
  const [formData, setFormData] = useState<ArtistRegisterFormData>(initialFormState);

  const [errors, setErrors] = useState<FormErrors>({});
  const [registerError, setRegisterError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const setTempEmail = useUserStore((store) => store.setTempEmail);

  const handleChange =
    (field: keyof ArtistRegisterFormData) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;

      setFormData((prev) => ({ ...prev, [field]: value }));

      const error = validateField<ArtistRegisterFormData>(field, value, formData.password);
      setErrors((prev) => ({ ...prev, [field]: error || undefined }));

      if (registerError) setRegisterError(undefined);
    };

  const handleSubmit = async () => {
    setIsLoading(true);
    setRegisterError(undefined);
    setErrors({});

    const validation = validateForm<ArtistRegisterFormData>(formData);

    if (!validation.isValid) {
      setRegisterError(validation.errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      const userData: TNewArtistRequest = {
        name: formData.title,
        username: formData.login,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const data = await onSubmit?.(userData);

      if (data) {
        setTempEmail(data.email);

        const nextRoute = searchParams.get("next");
        let route: string;
        const verifyRoute = "/verify/verify-email";
        if (nextRoute) {
          const params = new URLSearchParams();
          params.append("next", encodeURIComponent(nextRoute));
          route = `${verifyRoute}?${params.toString()}`;
        } else {
          route = verifyRoute;
        }

        setFormData(initialFormState);
        router.replace(route);
      }
    } catch (error) {
      if (error instanceof Error) setRegisterError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseForm
      title='Регистрация'
      onSubmit={() => {
        handleSubmit().catch(console.error);
      }}
      onClose={onClose}
      isLoading={isLoading}
      className={s.artistRegisterForm}
      renderFields={() => (
        <ArtistRegisterFormContent
          data={formData}
          disabled={isLoading}
          errors={errors}
          registerError={registerError}
          handleFieldChange={handleChange}
        />
      )}
      renderPrimaryButton={(loading) => (
        <button className={s.submitButton} type='submit' disabled={loading}>
          {loading ? <LoadingButton /> : "Зарегистрироваться"}
        </button>
      )}
      renderSocialLogin={() => {
        return <FormSocialButtons disabled={isLoading} />;
      }}
    />
  );
};

ArtistRegisterForm.displayName = "ArtistRegisterForm";
